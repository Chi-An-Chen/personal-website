/** Run with the installed playwright-cli: run-code --filename=scripts/qa-portfolio.js.
 * Production preview must be running at 127.0.0.1:4322. No test dependency enters the site.
 */
async (page) => {
  const base = 'http://127.0.0.1:4322/personal-website/';
  const results = [], failures = [], errors = [], screenshots = [];
  const check = (name, pass, evidence) => { results.push({name, pass, evidence}); if (!pass) failures.push(name); };
  const goto = async path => { await page.goto(base + (path === '' || path === 'zh/' ? path + '#site-header' : path)); await page.evaluate(() => document.fonts.ready); };
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if(m.type()==='error') errors.push(m.text()); });
  await page.emulateMedia({reducedMotion:'no-preference'});
  for(const width of [1280,390,320]) {
    await page.setViewportSize({width,height:width===1280?800:844});
    for(const prefix of ['', 'zh/']) for(const route of ['', 'research/', 'experience/', 'about/']) {
      await goto(prefix+route);
      const state = await page.evaluate(() => ({
        width:innerWidth, overflow:document.documentElement.scrollWidth-innerWidth,
        h1:document.querySelectorAll('h1').length, lang:document.documentElement.lang,
        fonts:[...document.fonts].map(f=>({family:f.family,status:f.status})),
        brokenImages:[...document.images].filter(i=>!i.complete || !i.naturalWidth).length,
        current:document.querySelectorAll('.desktop-navigation [aria-current="page"]').length,
        opening:!!document.querySelector('.prologue')?.getClientRects().length,
        cta:document.querySelector('.hero-introduction .editorial-link')?.getBoundingClientRect().bottom,
        title:document.querySelector('h1')?.getBoundingClientRect().bottom,
      }));
      check(`layout ${width} ${prefix+route || 'home'}`, state.overflow<=1 && state.h1===1 && state.current===1 && !state.opening && state.brokenImages===0 && state.lang===(prefix?'zh-Hant':'en'),state);
      if(!route) {
        check(`useful biography viewport ${width} ${prefix||'en'}`,state.title<844 && state.cta< (width===1280?800:844),state.cta);
        for(const kind of ['vlm','reasoning','retrieval']) {
          const demo=page.locator(`.work-demo--${kind}`);
          const heights=[];
          for(const value of ['0','1','2','0']) {
            await demo.locator(`input[value="${value}"]`).check();
            const reading=await demo.evaluate(el=>({height:el.getBoundingClientRect().height,notes:[...el.querySelectorAll('.demo-note')].filter(n=>getComputedStyle(n).display!=='none').map(n=>n.id),checked:el.querySelector('input:checked').value}));
            heights.push(reading.height);
            check(`demo ${width} ${prefix||'en'} ${kind} ${value}`,reading.checked===value && reading.notes.length===1 && reading.notes[0]===`${kind}-note-${value}`,reading);
          }
          check(`stable demo height ${width} ${prefix||'en'} ${kind}`,Math.max(...heights)-Math.min(...heights)<1,heights);
        }
        await page.evaluate(()=>scrollTo(0,0));
        const file=`output/playwright/home-${prefix?'zh':'en'}-${width}.png`;
        await page.screenshot({path:file,fullPage:true});screenshots.push(file);
      }
    }
  }
  // Actual keyboard operations: skip link, native radio navigation, visible focus.
  await page.setViewportSize({width:1280,height:800}); await goto('about/'); await page.goto(base); await page.evaluate(()=>document.fonts.ready);
  await page.keyboard.press('Tab');
  check('keyboard skip link first',await page.locator('.skip-link').evaluate(el=>el===document.activeElement));
  await page.keyboard.press('Enter');
  check('skip focuses main',await page.locator('#main').evaluate(el=>el===document.activeElement));
  const first=page.locator('.work-demo--vlm input[value="0"]');
  await first.focus(); await page.keyboard.press('ArrowRight');
  const focus=await page.evaluate(()=>({checked:document.querySelector('.work-demo--vlm input:checked').value,focused:document.activeElement?.getAttribute('value'),outline:getComputedStyle(document.activeElement.nextElementSibling).outlineWidth}));
  check('radio ArrowRight and visible focus',focus.checked==='1' && focus.focused==='1' && parseFloat(focus.outline)>=2,focus);
  await page.keyboard.press('ArrowLeft');
  check('radio reverse keyboard selection',await first.isChecked());
  // Read real intermediate animation frames, not just settled screenshots.
  await page.waitForTimeout(300);
  await page.locator('.work-demo--vlm input[value="1"]').check();
  const motion = await page.evaluate(async()=>{
    const target=document.querySelector('.tag-reason');const samples=[];
    for(const delay of [0,70,240]) { if(delay) await new Promise(r=>setTimeout(r,delay)); const s=getComputedStyle(target); samples.push({opacity:Number(s.opacity),transform:s.transform,animations:target.getAnimations().map(a=>({state:a.playState,time:a.currentTime}))}); }
    return samples;
  });
  check('motion has intermediate frames and settles',motion[0].opacity<1 && motion[1].opacity>motion[0].opacity && motion[2].opacity===1,motion);
  for(const value of ['2','0','1','0','2','2']) await page.locator(`.work-demo--vlm input[value="${value}"]`).click({delay:5});
  await page.waitForTimeout(300);
  const reversed=await page.evaluate(()=>({selected:document.querySelector('.work-demo--vlm input:checked').value,label:Number(getComputedStyle(document.querySelector('.tag-label')).opacity),reason:Number(getComputedStyle(document.querySelector('.tag-reason')).opacity),running:document.querySelector('.work-demo--vlm').getAnimations({subtree:true}).length}));
  check('rapid repeated and reverse clicks settle',reversed.selected==='2' && reversed.label===1 && reversed.reason===0 && reversed.running===0,reversed);
  await page.locator('.work-demo--vlm input[value="1"]').check();
  const inFlight=await page.locator('.work-demo--vlm').evaluate(el=>el.getAnimations({subtree:true}).length);
  await page.locator('#selected-agricultural-vlm .editorial-link').click();
  check('navigate during demo motion',inFlight>0 && page.url().endsWith('research/#agricultural-vlm'),{inFlight,url:page.url()});
  await page.evaluate(()=>document.fonts.ready); await page.waitForTimeout(250);
  const anchor=await page.evaluate(()=>({top:document.querySelector('#agricultural-vlm').getBoundingClientRect().top,index:document.querySelector('[data-section-index]').getBoundingClientRect().bottom}));
  check('research deep link not obscured',anchor.top>=anchor.index-2,anchor);
  await page.goBack({waitUntil:'commit'});
  check('history returns with opening hidden',await page.locator('.portfolio-hero').count()===1 && !(await page.locator('.prologue').isVisible()));
  await page.reload(); await page.evaluate(()=>document.fonts.ready);
  check('reload with opening hidden',!(await page.locator('.prologue').isVisible()));
  // Native scrolling must remain free in either direction.
  await page.evaluate(()=>{document.activeElement?.blur();scrollTo(0,0)});
  await page.mouse.move(600,420); await page.mouse.wheel(0,1100); await page.waitForTimeout(70); await page.mouse.wheel(0,-700); await page.waitForTimeout(200);
  const reverseScroll=await page.evaluate(()=>scrollY);
  await page.keyboard.press('End'); await page.waitForTimeout(150); const bottom=await page.evaluate(()=>scrollY);
  await page.keyboard.press('Home'); await page.waitForFunction(()=>scrollY===0,{},{timeout:2000}); const top=await page.evaluate(()=>({y:scrollY,header:document.querySelector('#site-header').getBoundingClientRect().top,overflow:getComputedStyle(document.documentElement).overflowY}));
  check('rapid reverse wheel and keyboard scrolling',reverseScroll>=0 && bottom>1000 && top.y===0 && top.overflow!=='hidden',{reverseScroll,bottom,top});
  // Shared route navigation, then the two-way locale switch.
  for(const route of ['research','experience','about','home','research','home']) {
    await page.locator('.desktop-navigation a').filter({hasText:route==='home'?'Home':route[0].toUpperCase()+route.slice(1)}).click();
    check(`native navigation ${route}`,await page.locator('.desktop-navigation [aria-current="page"]').innerText()===(route==='home'?'Home':route[0].toUpperCase()+route.slice(1)));
  }
  await page.getByRole('link',{name:'切換至繁體中文',exact:true}).click();
  check('switch to zh',await page.locator('html').getAttribute('lang')==='zh-Hant');
  await page.getByRole('link',{name:'Switch to English',exact:true}).click();
  check('switch to en',await page.locator('html').getAttribute('lang')==='en');
  // Reduced motion applies immediately to the artwork and shared runtime.
  await page.emulateMedia({reducedMotion:'reduce'}); await goto('about/'); await goto('');
  await page.locator('.work-demo--vlm input[value="1"]').check();
  const reduced=await page.evaluate(()=>({animations:document.getAnimations().length,duration:getComputedStyle(document.querySelector('.tag-reason')).transitionDuration,opacity:getComputedStyle(document.querySelector('.tag-reason')).opacity}));
  check('reduced motion is immediate',reduced.animations===0 && reduced.duration==='0s' && reduced.opacity==='1',reduced);
  // Text magnification and short-height layouts.
  for(const prefix of ['', 'zh/']) {
    await page.setViewportSize({width:390,height:600});await goto(prefix);
    await page.evaluate(()=>document.documentElement.style.fontSize='200%');
    check(`200% text ${prefix||'en'}`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    const artFit=await page.locator('.demo-art').evaluateAll(arts=>arts.map(art=>({height:art.clientHeight,scrollHeight:art.scrollHeight,width:art.clientWidth,scrollWidth:art.scrollWidth})));
    check(`200% artwork fit ${prefix||'en'}`,artFit.every(a=>a.scrollHeight<=a.height+1 && a.scrollWidth<=a.width+1),artFit);
    await page.screenshot({path:`output/playwright/text200-${prefix?'zh':'en'}.png`,fullPage:true});
  }
  // Native interactions remain functional with JS disabled.
  const nojs=await page.context().browser().newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const np=await nojs.newPage();
  for(const prefix of ['', 'zh/']) {
    await np.goto(base+prefix);
    await np.locator('.work-demo--retrieval input[value="2"]').check();
    check(`no-JS demo ${prefix||'en'}`,await np.locator('#retrieval-note-2').isVisible() && !(await np.locator('#retrieval-note-0').isVisible()));
    await np.locator('#selected-agricultural-vlm .editorial-link').click();
    await np.locator('.research-detail summary').press('Enter');
    check(`no-JS details ${prefix||'en'}`,await np.locator('.research-detail').getAttribute('open')!==null);
  }
  await nojs.close();
  check('no browser errors',errors.length===0,errors);
  await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:1280,height:800});await goto('');
  return {passed:results.filter(r=>r.pass).length,total:results.length,failures,results,screenshots};
}
