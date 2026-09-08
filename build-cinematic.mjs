import fs from 'node:fs/promises';
import path from 'node:path';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
const root=process.cwd();
let html=await fs.readFile(path.join(root,'index.html'),'utf8');
const css=await postcss([tailwind({base:root})]).process('@import "tailwindcss"; @source "./index.html";', {from:path.join(root,'cinematic.css')});
html=html.replace('/* TAILWIND_OUTPUT */',()=>css.css);
let fonts='';
for(const [family,file,weight] of [['Space Grotesk','space-grotesk.woff2','300 700'],['JetBrains Mono','jetbrains-mono.woff2','100 800']]){try{const data=await fs.readFile(path.join(root,'assets',file));fonts+=`@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:swap;src:url(data:font/woff2;base64,${data.toString('base64')}) format('woff2');}`}catch{}}
html=html.replace('/* FONT_OUTPUT */',()=>fonts);
for(const [token,file] of [['MONOLITH','revenue-monolith.png'],['INTAKE','intake-pulse.png'],['COLLISION','conduit-collision.png']]){let uri='';try{const data=await fs.readFile(path.join(root,'assets',file));uri='data:image/png;base64,'+data.toString('base64');}catch{if(!process.argv.includes('--preview'))throw new Error(`Required campaign asset missing: ${file}`)}html=html.split('@@'+token+'@@').join(uri)}
if(html.includes('@@'))throw new Error('Unresolved asset token');
await fs.mkdir('dist',{recursive:true});
await fs.writeFile('dist/index.html',html);
for(const f of ['sitemap.xml','robots.txt','llms.txt']){try{const c=await fs.readFile(path.join(root,f));await fs.writeFile(path.join(root,'dist',f),c);}catch{}}
try{await fs.mkdir(path.join(root,'dist','campaign'),{recursive:true});for(const img of ['revenue-monolith.png','intake-pulse.png','conduit-collision.png']){const d=await fs.readFile(path.join(root,'assets',img));await fs.writeFile(path.join(root,'dist','campaign',img),d);}const fav=await fs.readFile(path.join(root,'public','favicon.svg'));await fs.writeFile(path.join(root,'dist','favicon.svg'),fav);}catch{}
console.log(`Single-file interface ready: ${Math.round(Buffer.byteLength(html)/1024)} KB`);
