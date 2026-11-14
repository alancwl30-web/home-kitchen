import http from 'node:http';import fs from 'node:fs/promises';
let value=null;
const portIndex=process.argv.indexOf('--port');
const port=Number(process.env.PORT||(portIndex>=0?process.argv[portIndex+1]:3000));
if(!Number.isInteger(port)||port<1||port>65535)throw new Error('Invalid port');
http.createServer(async(req,res)=>{try{let source=await fs.readFile('dist/server/index.js','utf8');let {default:worker}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));let chunks=[];for await(let c of req)chunks.push(c);let body=Buffer.concat(chunks);let request=new Request('http://'+req.headers.host+req.url,{method:req.method,headers:req.headers,...(body.length?{body}: {})});let response=await worker.fetch(request,{BUCKET:{async get(){return value?{async json(){return JSON.parse(value)}}:null},async put(k,v){value=v}}});res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));}catch(e){res.writeHead(500);res.end(e.message)}}).listen(port,'127.0.0.1',()=>console.log(`Home Kitchen preview: http://127.0.0.1:${port}`));
