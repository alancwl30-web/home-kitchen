import vm from 'node:vm';
import fs from 'node:fs';
import assert from 'node:assert/strict';
let els=new Map();const el=id=>{if(!els.has(id))els.set(id,{innerHTML:'',textContent:'',value:'2',style:{},checked:false,open:false,addEventListener(){},close(){this.open=false},showModal(){this.open=true}});return els.get(id)};
const context=vm.createContext({structuredClone,Date,console,setTimeout:()=>0,clearTimeout(){},setInterval:()=>0,localStorage:{getItem:()=>null,setItem(){}},document:{getElementById:el,querySelector:()=>({addEventListener(){}})},window:{scrollTo(){}},fetch:async()=>({ok:false})});
vm.runInContext(fs.readFileSync('web/data.js','utf8')+fs.readFileSync('web/photos.js','utf8')+fs.readFileSync('web/app.js','utf8'),context);
function run(s){return vm.runInContext(s,context)}

assert.equal(run('RECIPES.filter(r=>!r.reserve).length'),500);
assert.equal(run('mainRecipes().length'),500);
assert.equal(run('RECIPES.length>500'),true);
assert.equal(run('new Set(RECIPES.map(r=>r.id)).size===RECIPES.length'),true);
assert.equal(run('new Set(RECIPES.map(r=>r.name)).size===RECIPES.length'),true);
assert.equal(run('RECIPES.every(r=>r.ingredients.every(i=>FOODS[i.name]&&i.group&&Number.isFinite(i.g)&&i.g>=0))'),true);
assert.equal(run('RECIPES.every(r=>r.steps.length>=3&&r.tips.length>0&&r.baseServings===2&&r.adaptation)'),true);
assert.equal(run('RECIPES.every(r=>totals(r).every(n=>Number.isFinite(n)&&n>=0))'),true);
assert.equal(run("RECIPES.filter(r=>r.id>=204).every(r=>r.source?.url.startsWith('https://www.christinesrecipes.com/')&&!avoidFor(r).some(a=>a.level==='避開'))"),true);
const retired=[24,38,40,12,13,33,26,14,44,51,1,57,83,32,60,65,61,66,67,77,21,64,22,3,43,59,7,56,17,39,115];
for(const id of retired){assert.equal(run(`RECIPES.some(r=>r.id===${id})`),false);run('currentRecipe=null');run(`openRecipe(${id})`);assert.equal(run('currentRecipe'),null)}
run("state.profile.equip.push('蒸架');mode='平日簡單煮';meal='晚餐';purpose='食＋留聽日帶飯'");
assert.equal(run("eligible().filter(suitable).every(r=>r.box&&!r.weekendOnly&&r.seafood!=='新手可試')"),true);
assert.equal(run('eligible().filter(suitable).some(r=>r.id===41)'),true);
run("mode='週末買餸煮';purpose='即餐食'");assert.equal(run('eligible().filter(suitable).some(r=>r.id===45)'),true);
run("purpose='分份冷凍'");assert.equal(run('eligible().filter(suitable).every(r=>r.freeze)'),true);
run("purpose='即餐食';openRecipe(41)");el('eatNow').value='2';el('lunchBoxes').value='1';el('addRice').checked=false;run('scaleRecipe()');
assert.match(el('ingredients').innerHTML,/480 g/);assert.match(el('totalServings').textContent,/3/);
const base=run('totals(RECIPES.find(r=>r.id===41))[0]');el('addRice').checked=true;run('scaleRecipe()');assert.match(el('nutrition').innerHTML,new RegExp(String(base+216)));assert.match(el('ingredients').innerHTML,/180 g/);
run('state.shopping=[];addShopping()');assert.equal(run('state.shopping.length'),0);assert.equal(run("shoppingDraft.items.find(i=>i.name==='生抽').g"),27);run('confirmShoppingItems()');assert.equal(run("state.shopping.find(i=>i.name==='生抽').g"),27);assert.equal(run("state.shopping.some(i=>i.name==='清水')"),false);
run("state.pantry=['雞髀肉'];state.shopping=[];addShopping()");assert.equal(run("shoppingDraft.items.find(i=>i.name==='雞髀肉').selected"),false);assert.equal(run("shoppingDraft.items.filter(i=>i.name==='生抽').length"),1);
run('cancelShoppingPicker()');assert.equal(run('state.shopping.length'),0);
run("addShopping();selectShoppingItems(false)");assert.equal(el('confirmShopping').disabled,true);
run("toggleShoppingItem(shoppingDraft.items.findIndex(i=>i.name==='生抽'),true);confirmShoppingItems()");assert.equal(run('state.shopping.length'),1);assert.equal(run('state.shopping[0].g'),27);
run("addShopping();selectShoppingItems(false);toggleShoppingItem(shoppingDraft.items.findIndex(i=>i.name==='生抽'),true);confirmShoppingItems()");assert.equal(run('state.shopping[0].g'),54);
// Separate save control, exactly two feedback buttons, no dismissed history.
const card=run('card(RECIPES.find(r=>r.id===41))');assert.ok(card.indexOf('card-save')<card.indexOf('card-body'));assert.match(card,/primary recipe-open/);
const feedback=run('recipeActions(RECIPES.find(r=>r.id===203))');assert.equal((feedback.match(/class="feedback-button/g)||[]).length,2);assert.doesNotMatch(feedback,/favorite\(/);assert.match(feedback,/冇興趣/);assert.match(feedback,/已學識/);
run('favorite(41)');assert.equal(run('state.favorites.includes(41)'),true);run('markKnown(41)');assert.equal(run('eligible().some(r=>r.id===41)'),false);run('renderSaved()');assert.match(el('main').innerHTML,/蒜香生抽雞髀扒/);run('openRecipe(41)');assert.match(el('detailBody').innerHTML,/known-instructions/);run('markKnown(41)');assert.equal(run('eligible().some(r=>r.id===41)'),true);
run('renderPreferences()');assert.doesNotMatch(el('main').innerHTML,/冇興趣嘅食譜|restoreRecipe/);
run("state.pantry=[];meal='晚餐';mode='週末買餸煮';purpose='即餐食';cuisine='全部';query='';maxTime=180;visibleLimit=24;renderHome()");assert.match(el('main').innerHTML,/食譜庫 500 款/);assert.equal((el('main').innerHTML.match(/<article class="card">/g)||[]).length,24);run('showMoreRecipes()');assert.equal((el('main').innerHTML.match(/<article class="card">/g)||[]).length,48);
// All details, including reserve candidates, render with complete data.
for(const id of run('RECIPES.map(r=>r.id)')){run('currentRecipe=null');run(`openRecipe(${id})`);assert.equal(run('currentRecipe'),id);assert.doesNotMatch(el('detailBody').innerHTML,/undefined|NaN/);assert.doesNotMatch(el('ingredients').innerHTML,/undefined|NaN/)}
// Dismissal deletes saved state and replaces one-for-one, including dismissed replacements.
run('state.favorites=[41];state.liked=[41]');const before=run('mainRecipes().map(r=>r.id)');run('dismissRecipe(41)');const after=run('mainRecipes().map(r=>r.id)');assert.equal(after.length,500);assert.equal(after.includes(41),false);assert.equal(run('state.favorites.includes(41)||state.liked.includes(41)'),false);const newIds=after.filter(x=>!before.includes(x));assert.equal(newIds.length,1);assert.equal(run(`RECIPES.find(r=>r.id===${newIds[0]}).reserve`),true);
run(`dismissRecipe(${newIds[0]})`);assert.equal(run('mainRecipes().length'),500);assert.equal(run(`mainRecipes().some(r=>r.id===${newIds[0]})`),false);run('currentRecipe=null;openRecipe(41)');assert.equal(run('currentRecipe'),null);run('favorite(41)');assert.equal(run('state.dismissed.includes(41)'),true);
run("state.dismissed=RECIPES.filter(r=>r.reserve).map(r=>r.id).concat(41)");assert.equal(run('mainRecipes().length'),499);assert.equal(run('reserveRemaining()'),0);run('state.dismissed=[]');
// Cloud accepts expanded IDs, preserves monotonic dismissals and known state from older tabs.
const workerSource=fs.readFileSync('worker/index.js','utf8');const {default:worker}=await import('data:text/javascript;base64,'+Buffer.from('const ASSETS={};'+workerSource).toString('base64'));
let data;const env={BUCKET:{get:async()=>data?{json:async()=>JSON.parse(data)}:null,put:async(k,v)=>{data=v}}};
const payload={preferences:run('state.avoid'),dismissed:[563],liked:[499],known:[501],cooking:run('state.cooking')};
const put=(p,origin='https://test.local')=>worker.fetch(new Request('https://test.local/api/preferences',{method:'PUT',headers:{Origin:origin},body:JSON.stringify(p)}),env);
assert.equal((await put(payload)).status,200);let got=await(await worker.fetch(new Request('https://test.local/api/preferences'),env)).json();assert.deepEqual(got.dismissed,[563]);assert.deepEqual(got.known,[501]);assert.equal((await put(payload,'https://other.local')).status,403);
assert.equal((await put({...payload,dismissed:[633],known:undefined})).status,200);got=await(await worker.fetch(new Request('https://test.local/api/preferences'),env)).json();assert.deepEqual(got.dismissed,[563,633]);assert.deepEqual(got.known,[501]);assert.equal((await put({...payload,known:[1001]})).status,400);
console.log('Verified: 500 active recipes plus reserve, catalogue/source/nutrition integrity, 24-card pagination, separate save and two feedback controls, no dismissed history, one-for-one replacement and exhaustion, portions/shopping, saved/known behavior and cloud compatibility.');
