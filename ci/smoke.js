const { chromium } = require('playwright');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const assert = require('assert');
(async () => {
  const out = '/tmp/pixpdfkit-e2e';
  fs.mkdirSync(out,{recursive:true});
  const a=await PDFDocument.create();
  for(let i=0;i<3;i++){let p=a.addPage([400,560]);p.drawText('PixPDFKit sample page '+(i+1),{x:50,y:420})}
  fs.writeFileSync(path.join(out,'sample.pdf'),await a.save());
  const b=await PDFDocument.create();b.addPage([400,560]).drawText('Second document',{x:40,y:400});
  fs.writeFileSync(path.join(out,'second.pdf'),await b.save());
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const page=await browser.newPage({acceptDownloads:true});
  const messages=[];
  page.on('pageerror',e=>messages.push(e.message));
  const base='http://127.0.0.1:8765/';
  try {
    await page.goto(base+'en/',{waitUntil:'domcontentloaded'});
    const png=await page.evaluate(()=>{
      const c=document.createElement('canvas');c.width=90;c.height=70;
      const ctx=c.getContext('2d');ctx.fillStyle='#1369da';ctx.fillRect(0,0,90,70);
      ctx.fillStyle='white';ctx.fillRect(8,8,40,40);
      return c.toDataURL('image/png').split(',')[1];
    });
    fs.writeFileSync(path.join(out,'sample.png'),Buffer.from(png,'base64'));
    const tools=['merge','split','extract','delete-pages','organize','rotate','page-numbers','metadata','watermark','jpg-to-pdf','pdf-to-jpg','pdf-to-png','compress'];
    for (const tool of tools) {
      await page.goto(base+'en/tools/'+tool+'.html',{waitUntil:'domcontentloaded'});
      await page.waitForFunction(()=>typeof window.PDFLib!=='undefined',null,{timeout:45000});
      const inputs=tool==='merge'?[path.join(out,'sample.pdf'),path.join(out,'second.pdf')]:[path.join(out,tool==='jpg-to-pdf'?'sample.png':'sample.pdf')];
      await page.locator('#files').setInputFiles(inputs);
      const ranges={'split':'1-2','extract':'1-2','delete-pages':'2','organize':'3,1,2'};
      if(ranges[tool])await page.locator('#pages').fill(ranges[tool]);
      if(tool==='watermark')await page.locator('#mark').fill('TEST');
      await page.locator('#run').click();
      try {
        await page.waitForFunction(()=>{
          const r=document.getElementById('result'),s=document.getElementById('status');
          return r?.classList.contains('ready')||s?.classList.contains('err');
        },null,{timeout:90000});
      } catch(e){throw new Error(tool+': timeout, status='+await page.locator('#status').innerText())}
      const result=await page.locator('#result').getAttribute('class');
      const status=await page.locator('#status').innerText();
      if(!result.includes('ready'))throw new Error(tool+': '+status);
      const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#download').click()]);
      const name=download.suggestedFilename();
      const target=path.join(out,tool+'-'+name);
      await download.saveAs(target);
      const bytes=fs.readFileSync(target);
      assert(bytes.length>100,tool+' empty');
      assert(name.endsWith('.zip')?bytes.slice(0,2).toString()==='PK':bytes.slice(0,4).toString()==='%PDF',tool+' invalid output header');
      console.log('PASS '+tool+': '+name+', '+bytes.length+' bytes');
    }
    await page.goto(base+'ar/tools/merge.html');
    assert((await page.title()).includes('دمج'), 'Arabic tool page title');
    console.log('PASS Arabic tool route');
    console.log('All '+tools.length+' browser conversion tests passed');
  } catch (e) {
    console.error('FAILED: '+e.stack);
    console.error('Browser page errors: '+messages.slice(-10).join(' | '));
    process.exitCode=1;
  } finally {await browser.close()}
})();
