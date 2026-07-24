'use strict';

const fs=require('fs');
const http=require('http');
const path=require('path');

const root=path.resolve(__dirname,'..');
const port=Number(process.env.DEPOT_PORT||8766);
const contentTypes={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.svg':'image/svg+xml'};

http.createServer((request,response)=>{
  const pathname=decodeURIComponent(new URL(request.url,'http://127.0.0.1').pathname);
  const requested=pathname==='/'?'index.html':pathname.replace(/^\/+/,'');
  const file=path.resolve(root,requested);
  if(!file.startsWith(root+path.sep)){response.writeHead(403);response.end('Forbidden');return}
  fs.readFile(file,(error,body)=>{
    if(error){response.writeHead(error.code==='ENOENT'?404:500);response.end('Not found');return}
    response.setHeader('Content-Type',contentTypes[path.extname(file).toLowerCase()]||'application/octet-stream');
    response.end(body);
  });
}).listen(port,'127.0.0.1',()=>console.log(`Depot Run available at http://127.0.0.1:${port}`));
