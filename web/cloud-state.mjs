export const clone=x=>JSON.parse(JSON.stringify(x));
export function validState(s){return s&&s.version===1&&['pantry','favorites','avoid','shopping','dismissed','liked','known'].every(k=>Array.isArray(s[k]))&&s.profile&&Array.isArray(s.profile.equip)&&s.cooking&&typeof s.skills==='object'&&JSON.stringify(s).length<200000;}
export function stage(cache,data,token){if(!validState(data))throw Error('invalid-state');return {...cache,data:clone(data),pending:true,token};}
export function acknowledge(cache,token,revision){return {...cache,revision,pending:cache.token!==token};}
export function receive(cache,remote){if(!validState(remote.data)||!Number.isInteger(remote.revision))throw Error('invalid-remote');if(cache.pending)return {cache,conflict:remote.revision!==cache.revision};return {cache:{...cache,data:clone(remote.data),revision:remote.revision},conflict:false};}
export function requireRevision(expected,actual){if(expected!==actual)throw Error('sync-conflict');}
