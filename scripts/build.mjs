import fs from 'node:fs';
import path from 'node:path';
const foods=JSON.parse(fs.readFileSync('catalogue/foods.json','utf8'));const recipes=JSON.parse(fs.readFileSync('catalogue/recipes.json','utf8'));fs.writeFileSync('web/data.js','const FOODS='+JSON.stringify(foods)+';\nconst RECIPES='+JSON.stringify(recipes)+';\n');
const assets={};function walk(dir){for(let file of fs.readdirSync(dir)){let p=path.join(dir,file);if(fs.statSync(p).isDirectory())walk(p);else {let ext=path.extname(p),mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg'}[ext]||'application/octet-stream';assets['/'+path.relative('web',p)]={mime,body:fs.readFileSync(p).toString('base64')};}}}walk('web');
fs.rmSync('dist',{recursive:true,force:true});fs.mkdirSync('dist/server',{recursive:true});fs.mkdirSync('dist/.openai',{recursive:true});
fs.writeFileSync('dist/server/index.js','const ASSETS='+JSON.stringify(assets)+';\n'+fs.readFileSync('worker/index.js','utf8'));
if(fs.existsSync('.openai/hosting.json'))fs.copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');console.log('Built '+Object.keys(assets).length+' embedded assets');
