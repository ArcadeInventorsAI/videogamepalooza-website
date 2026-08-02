import { readdirSync, statSync, writeFileSync } from 'fs';
const SITE='https://dreamauthentics.com', DIST='dist';
const urls=[];
function walk(dir, base=''){
  for(const e of readdirSync(dir)){
    const p=`${dir}/${e}`, rel=`${base}/${e}`;
    if(statSync(p).isDirectory()) walk(p, rel);
    else if(e==='index.html'){
      let u=base==''?'/':`${base}/`;
      urls.push(u);
    }
  }
}
walk(DIST);
urls.sort();
const now=new Date().toISOString().slice(0,10);
const body=urls.map(u=>`  <url><loc>${SITE}${u}</loc><lastmod>${now}</lastmod><changefreq>${u==='/'?'weekly':'monthly'}</changefreq><priority>${u==='/'?'1.0':'0.7'}</priority></url>`).join('\n');
const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
writeFileSync(`${DIST}/sitemap.xml`, xml.replace('sitemap.org','sitemaps.org'));
console.log(`  sitemap.xml: ${urls.length} urls`);
