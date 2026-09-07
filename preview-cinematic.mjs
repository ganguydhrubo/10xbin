import http from 'node:http';
import fs from 'node:fs/promises';
const server=http.createServer(async(req,res)=>{if(req.url==='/favicon.ico'){res.writeHead(204);res.end();return}if(req.url!=='/'&&req.url!=='/index.html'){res.writeHead(404);res.end('Not found');return}try{const html=await fs.readFile('dist/index.html');res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(html)}catch{res.writeHead(503);res.end('Preparing interface')}});
server.listen(3000,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:3000'));
