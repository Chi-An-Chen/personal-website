async page => {
 const base=page.url().startsWith('http') ? new URL('/personal-website/',page.url()).href : 'http://127.0.0.1:4322/personal-website/'; const checks=[];
 const check=(name,pass,evidence)=>checks.push({name,pass,evidence});
 await page.setViewportSize({width:1280,height:800});await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto(base+'#site-header');
 const hero=await page.locator('.hero-introduction').evaluate(el=>({opacity:getComputedStyle(el).opacity,animations:el.getAnimations({subtree:true}).length}));
 check('personal introduction remains stable',hero.animations===0 && hero.opacity==='1',hero);
 await page.screenshot({path:'output/playwright/hero-desktop.png'});
 await page.goto(base+'research/#agricultural-vlm');
 await page.locator('.work-demo--vlm input[value="1"]').check();
 const moving=await page.locator('.tag-reason').evaluate(el=>el.getAnimations().length);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 const stop=await page.locator('.tag-reason').evaluate(el=>({animations:el.getAnimations().length,opacity:getComputedStyle(el).opacity}));
 check('reduce motion mid-transition settles',moving>0 && stop.animations===0 && stop.opacity==='1',{moving,stop});
 await page.emulateMedia({reducedMotion:'no-preference'});
 // Repeated navigation clicks during the active native transition overlay.
 await page.goto(base+'#site-header');
 await page.getByRole('navigation',{name:'Main navigation',exact:true}).getByRole('link',{name:'Research',exact:true}).click();
 const nav=await page.evaluate(()=>({root:getComputedStyle(document.documentElement).viewTransitionName,overlay:getComputedStyle(document.documentElement,'::view-transition').pointerEvents,running:document.getAnimations().map(a=>({target:a.effect?.pseudoElement,time:a.currentTime}))}));
 await page.getByRole('navigation',{name:'Main navigation',exact:true}).getByRole('link',{name:'Experience',exact:true}).click({timeout:800});
 check('navigation overlay stays interruptible',nav.root==='none' && nav.overlay==='none' && page.url().endsWith('/experience/'),nav);
 // Simulated touch uses the browser touch input path, not a mouse click.
 const ctx=await page.context().browser().newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,deviceScaleFactor:1});const p=await ctx.newPage();
 for(const prefix of ['', 'zh/']) {
  await p.goto(base+prefix+'#site-header');await p.evaluate(()=>document.fonts.ready);
  await p.locator('#selected-retrieval-applications .editorial-link').tap();
  await p.locator('.work-demo--retrieval input[value="2"]').tap();
  check('mobile touch '+(prefix||'en'),await p.locator('.work-demo--retrieval input[value="2"]').isChecked() && await p.locator('#retrieval-note-2').isVisible());
 }
 await p.goto(base+'zh/#site-header');await p.evaluate(()=>document.fonts.ready);await p.waitForFunction(()=>getComputedStyle(document.querySelector('.portrait-frame')).opacity==='1' && document.querySelector('.portrait-frame').getAnimations().length===0);await p.screenshot({path:'output/playwright/hero-mobile-zh.png'});
 await ctx.close();
 // All conceptual explanations print; no moving overlay or sticky index.
 await page.emulateMedia({media:'print'});
 const print=[];for(const route of ['research/','experience/']) { await page.goto(base+route); print.push(...await page.locator('.demo-note').evaluateAll(notes=>notes.map(n=>getComputedStyle(n).display))); }
 check('print exposes all conceptual explanations',print.length===9 && print.every(x=>x!=='none'),print);
 await page.emulateMedia({media:'screen'});await page.goto(base+'research/');
 await page.screenshot({path:'output/playwright/research-desktop.png'});
 await page.goto(base+'experience/');await page.screenshot({path:'output/playwright/experience-desktop.png'});
 await page.goto(base+'about/');await page.screenshot({path:'output/playwright/about-desktop.png'});
 // Read font responses in development as well as production.
 if(new URL(base).hostname==='127.0.0.1' || new URL(base).hostname==='localhost') {
 const responses=[];const fn=res=>{if(res.url().includes('.woff2'))responses.push({url:res.url(),status:res.status()})};page.on('response',fn);
 await page.goto('http://localhost:4321/personal-website/');await page.evaluate(()=>document.fonts.ready);page.off('response',fn);
 check('development font URLs resolve',responses.length>0 && responses.every(r=>r.status===200),responses);
 }
 return {passed:checks.filter(c=>c.pass).length,total:checks.length,failures:checks.filter(c=>!c.pass),checks};
}
