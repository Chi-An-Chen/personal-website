async page=>{
 const base='http://127.0.0.1:4322/personal-website/';const checks=[];const check=(name,pass,evidence)=>checks.push({name,pass,evidence});
 const header=()=>page.locator('#site-header').evaluate(el=>({active:document.activeElement.id,outline:getComputedStyle(el).outlineWidth,style:getComputedStyle(el).outlineStyle,color:getComputedStyle(el).outlineColor,top:el.getBoundingClientRect().top}));
 for(const width of [1280,390]) for(const prefix of ['', 'zh/']) {
  const name=width+' '+(prefix||'en');await page.setViewportSize({width,height:844});await page.goto(base+prefix+'research/');await page.locator('.desktop-navigation a').first().click();await page.waitForTimeout(400);let state=await header();check(name+' mouse Home has no container frame',state.style==='none' && state.top===0,state);
  await page.locator('.desktop-navigation a').nth(2).click();const home=page.locator('.desktop-navigation a').first();await home.focus();await page.keyboard.press('Enter');await page.waitForTimeout(400);state=await header();check(name+' keyboard Home preserves destination focus without frame',state.active==='site-header' && state.style==='none',state);
  await page.keyboard.press('Tab');const next=await page.evaluate(()=>({tag:document.activeElement.tagName,text:document.activeElement.textContent,outline:getComputedStyle(document.activeElement).outlineWidth,color:getComputedStyle(document.activeElement).outlineColor,visible:document.activeElement.matches(':focus-visible')}));
  check(name+' next keyboard link has neutral visible indicator',next.tag==='A' && next.visible && parseFloat(next.outline)>=2 && next.color==='rgb(101, 101, 101)',next);
  await page.getByRole('link',{name:prefix?'Switch to English':'切換至繁體中文',exact:true}).click();await page.waitForTimeout(400);state=await header();check(name+' language switch has no frame',state.style==='none' && state.top===0,state);
  await page.goBack({waitUntil:'commit'});await page.waitForTimeout(400);state=await header();check(name+' history return has no frame',state.style==='none',state);
  await page.screenshot({path:`output/playwright/home-frame-after-${prefix?'zh':'en'}-${width}.png`});
 }
 return{passed:checks.filter(c=>c.pass).length,total:checks.length,failures:checks.filter(c=>!c.pass),checks};
}
