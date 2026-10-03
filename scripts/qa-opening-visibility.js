/* Use the installed Playwright CLI's CDP attachment to an isolated headed Chrome.
 * Its noDefaults connection preserves native visibility; ordinary Playwright launch
 * forces focus and cannot validate this suite. Do not mock document visibility.
 */
async page => {
 const base='http://127.0.0.1:4322/personal-website/';
 const checks=[],errors=[];
 const check=(name,pass,evidence)=>checks.push({name,pass,evidence});
 const sample=async p=>p.evaluate(()=>({visibility:document.visibilityState,scroll:scrollY,
  opening:{display:getComputedStyle(document.querySelector('.prologue')).display,hidden:document.querySelector('.prologue').hidden,bottom:document.querySelector('.prologue').getBoundingClientRect().bottom,background:getComputedStyle(document.querySelector('.prologue')).backgroundColor},
  lines:[...document.querySelectorAll('.prologue-statement > span')].map(el=>({opacity:+getComputedStyle(el).opacity,transform:getComputedStyle(el).transform,animations:el.getAnimations().map(a=>({state:a.playState,time:a.currentTime,delay:a.effect.getTiming().delay,duration:a.effect.getTiming().duration}))})),
  identity:{opacity:getComputedStyle(document.querySelector('h1')).opacity,animations:document.querySelector('h1').getAnimations().length},
  bodyBackground:getComputedStyle(document.body).backgroundColor,
  headerTop:document.querySelector('#site-header').getBoundingClientRect().top,
  ctaBottom:document.querySelector('.hero-introduction .editorial-link').getBoundingClientRect().bottom,
  height:innerHeight,overflow:document.documentElement.scrollWidth-innerWidth
 }));
 const settled=s=>s.lines.every(l=>l.animations.length===0 && l.opacity===1 && l.transform==='none');
 const running=s=>s.lines.every(l=>l.animations.some(a=>a.state==='running'));
 const fresh=async(prefix='')=>{await page.goto(base+'about/');await page.evaluate(()=>sessionStorage.removeItem('chi-an-chen-opening-seen'));await page.goto(base+prefix)};
 const started=async p=>p.waitForFunction(()=>document.querySelector('.prologue-statement > span').getAnimations().length>0);
 try {
 await page.setViewportSize({width:1280,height:800});await page.emulateMedia({reducedMotion:'no-preference'});
 page.on('pageerror',e=>errors.push(e.message));
 for(const prefix of ['', 'zh/']) {
  const name=prefix?'zh':'en';await page.bringToFront();await fresh(prefix);await started(page);
  const first=await sample(page);await page.waitForTimeout(1000);const middle=await sample(page);await page.waitForTimeout(1550);const last=await sample(page);
  check(name+' foreground three-phrase sequence',running(first) && middle.lines[0].opacity>first.lines[0].opacity && middle.lines[0].opacity>middle.lines[1].opacity && middle.lines[1].opacity>middle.lines[2].opacity && settled(last),{first,middle,last});
  check(name+' black opening waits for input',last.opening.background==='rgb(0, 0, 0)' && last.scroll===0 && last.headerTop>=800 && last.overflow<=1,last);
  await page.screenshot({path:`output/playwright/opening-${name}-desktop.png`});
  // A real unselected tab: no mocked visibilityState or synthetic visibilitychange.
  const bg=await page.context().newPage();bg.on('pageerror',e=>errors.push(e.message));await page.bringToFront();await bg.goto(base+prefix);await page.waitForTimeout(2700);
  const hidden=await sample(bg);
  check(name+' background open waits',hidden.visibility==='hidden' && hidden.opening.display!=='none' && settled(hidden),hidden);
  await bg.bringToFront();await started(bg);await bg.waitForTimeout(650);const activated=await sample(bg);
  check(name+' activation starts unspent sequence',activated.visibility==='visible' && running(activated) && activated.lines[0].animations[0].time<1200,activated);
  await page.bringToFront();await page.waitForTimeout(100);const paused1=await sample(bg);await page.waitForTimeout(2400);const paused2=await sample(bg);
  check(name+' tab switch pauses elapsed time',paused1.visibility==='hidden' && paused2.lines.every((l,i)=>l.animations[0]?.state==='paused' && Math.abs(l.animations[0].time-paused1.lines[i].animations[0].time)<20),{paused1,paused2});
  await bg.bringToFront();await bg.waitForTimeout(180);const resumed=await sample(bg);
  check(name+' return resumes without restart',running(resumed) && resumed.lines[0].animations[0].time>=paused2.lines[0].animations[0].time,resumed);
  await bg.waitForTimeout(1900);const finished=await sample(bg);await page.bringToFront();await bg.bringToFront();await bg.waitForTimeout(100);
  check(name+' completed animation never replays on tab return',settled(finished) && settled(await sample(bg)),finished);
  // Pause after phrase one has finished: completed phrases must not restart.
  await bg.goto(base+'about/');await bg.evaluate(()=>sessionStorage.removeItem('chi-an-chen-opening-seen'));await bg.goto(base+prefix);await started(bg);await bg.waitForTimeout(1550);const lateBefore=await sample(bg);
  await page.bringToFront();await page.waitForTimeout(350);await bg.bringToFront();await bg.waitForTimeout(180);const lateAfter=await sample(bg);
  check(name+' completed phrases stay complete after late tab switch',lateBefore.lines[0].opacity===1 && lateBefore.lines[0].animations.length===0 && lateAfter.lines[0].opacity===1 && lateAfter.lines[0].animations.length===0,{lateBefore,lateAfter});
  await bg.waitForTimeout(1000);
  await bg.reload();await bg.waitForTimeout(100);const reloaded=await sample(bg);check(name+' reload starts at light introduction',reloaded.opening.display==='none' && reloaded.headerTop===0 && settled(reloaded),reloaded);
  await bg.close();await page.bringToFront();
  // The link is actionable during the sequence. Removal must preserve the destination.
  await fresh(prefix);await started(page);const beforeSkip=await sample(page);await page.locator('.prologue-next').click();
  await page.waitForFunction(()=>document.querySelector('.prologue').hidden);const entered=await sample(page);
  check(name+' Scroll down immediately usable',running(beforeSkip) && entered.headerTop===0 && entered.bodyBackground==='rgb(245, 244, 239)' && entered.identity.opacity==='1' && entered.ctaBottom<800 && settled(entered),entered);
  await page.keyboard.press('Home');await page.waitForTimeout(200);const top=await sample(page);
  check(name+' reverse scroll cannot restore opening',top.opening.hidden && top.headerTop===0,top);
  await page.screenshot({path:`output/playwright/light-hero-${name}-desktop.png`});
  await page.locator('.desktop-navigation a').nth(1).click();await page.locator('.desktop-navigation a').nth(2).click({timeout:1000});
  check(name+' repeated navigation stays interruptible',page.url()===base+prefix+'experience/',{url:page.url()});
  await page.goBack({waitUntil:'commit'});await page.goBack({waitUntil:'commit'});await page.waitForURL(base+prefix+'#site-header',{waitUntil:'commit'});await page.waitForTimeout(100);const history=await sample(page);
  check(name+' history stays at biography',history.opening.display==='none' && settled(history),history);
  await page.locator('.desktop-navigation a').nth(1).click();await page.locator('.desktop-navigation a').nth(0).click();await page.waitForTimeout(100);const repeat=await sample(page);
  check(name+' internal Home visit skips opening',page.url()===base+prefix+'#site-header' && repeat.opening.display==='none' && settled(repeat),repeat);
  await fresh(prefix);await started(page);await page.mouse.move(600,420);await page.mouse.wheel(0,600);await page.waitForTimeout(90);await page.mouse.wheel(0,-900);await page.waitForTimeout(250);
  const reverse=await sample(page);await page.mouse.wheel(0,1600);await page.waitForFunction(()=>document.querySelector('.prologue').hidden);await page.keyboard.press('Home');await page.waitForFunction(()=>scrollY===0);
  check(name+' rapid reverse scroll stays responsive',reverse.scroll>=0 && settled(reverse) && (await sample(page)).opening.hidden,reverse);
  await fresh(prefix);await started(page);await page.keyboard.press('Tab');const focus=await page.locator('.skip-link').evaluate(el=>({focused:el===document.activeElement,outline:getComputedStyle(el).outlineWidth}));
  check(name+' keyboard focus settles text',focus.focused && parseFloat(focus.outline)>=2 && settled(await sample(page)),focus);
  await page.keyboard.press('Enter');await page.waitForFunction(()=>document.querySelector('.prologue').hidden);
  check(name+' keyboard skip reaches main',await page.locator('#main').evaluate(el=>el===document.activeElement));
  await fresh(prefix);await started(page);await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(80);check(name+' reduced motion mid-entry settles',settled(await sample(page)));
  await fresh(prefix);const reduced=await sample(page);check(name+' reduced motion starts complete',settled(reduced) && reduced.opening.display!=='none',reduced);
  await page.locator('.prologue-next').click();await page.waitForFunction(()=>document.querySelector('.prologue').hidden);check(name+' reduced motion native skip',(await sample(page)).headerTop===0);
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.setViewportSize({width:390,height:844});await fresh(prefix);await started(page);await page.waitForTimeout(2600);const mobile=await sample(page);
  check(name+' mobile opening fits',mobile.overflow<=1 && mobile.opening.bottom>=844 && mobile.scroll===0,mobile);
  await page.screenshot({path:`output/playwright/opening-${name}-mobile.png`});
  await page.locator('.prologue-next').click();await page.waitForFunction(()=>document.querySelector('.prologue').hidden);const mobileHero=await sample(page);
  check(name+' mobile light introduction works',mobileHero.ctaBottom<844 && mobileHero.overflow<=1 && mobileHero.bodyBackground==='rgb(245, 244, 239)',mobileHero);
  await page.screenshot({path:`output/playwright/light-hero-${name}-mobile.png`});
  for(const width of [390,1280]) {
   await page.setViewportSize({width,height:width===1280?800:844});await page.goto(base+prefix+'research/#publications-title');
   const links=await page.locator('[data-publication-id]').evaluateAll(rows=>rows.map(row=>({id:row.dataset.publicationId,title:row.querySelector('h3').textContent,official:[...row.querySelectorAll('a[href*="ieeexplore"]')].map(a=>({href:a.href,label:a.getAttribute('aria-label'),text:a.textContent.trim()}))})));
   const expected={'fahu-mamba':'11326816','ssiu-net':'11326852','lvit-cb':'11130997'};
   check(name+' publication association '+width,links.length===6 && links.every(row=>expected[row.id] ? row.official.length===1 && row.official[0].href===`https://ieeexplore.ieee.org/document/${expected[row.id]}/` && row.official[0].label.includes(row.title) && (prefix ? row.official[0].text.includes('閱讀') : row.official[0].text.includes('View on')) : row.official.length===0),links);
   const link=page.locator('[data-publication-id="fahu-mamba"] a[href*="ieeexplore"]');await link.focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');
   const outline=await link.evaluate(el=>({focused:el===document.activeElement,outline:getComputedStyle(el).outlineWidth,overflow:document.documentElement.scrollWidth-innerWidth}));
   check(name+' publication keyboard/layout '+width,outline.focused && parseFloat(outline.outline)>=2 && outline.overflow<=1,outline);
   await page.screenshot({path:`output/playwright/publications-${name}-${width}.png`});
  }
 }
 const nojs=await page.context().browser().newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const p=await nojs.newPage();
 for(const prefix of ['', 'zh/']) {await p.goto(base+prefix);const s=await sample(p);check((prefix||'en')+' no JS complete statement',settled(s) && s.opening.background==='rgb(0, 0, 0)',s);await p.locator('.prologue-next').click();await p.waitForTimeout(1000);const after=await sample(p);check((prefix||'en')+' no JS native entry',p.url().endsWith('#site-header') && Math.abs(after.headerTop)<2 && after.ctaBottom<844,after);}
 await nojs.close();check('no runtime errors',errors.length===0,errors);
 } catch(error) { check('suite completed',false,{error:String(error),url:page.url()}); }
 return {passed:checks.filter(c=>c.pass).length,total:checks.length,failures:checks.filter(c=>!c.pass),checks};
}
