/* Sends quiz results to the class-progress server (the main app's teacher-dashboard.gs) so that the teacher
   dashboard and the student's My Progress page can show badges, scores and missed questions.
   Needs the student's class code (profile.classCode). Failed sends wait in a small outbox and are retried. */
(function(){
'use strict';
var CFG = window.GQ_CONFIG = Object.assign({CLASS_ENDPOINT: '', CLASS_KEY: ''}, window.GQ_CONFIG || {});
var BOX = 'gq.outbox.v1', MAX_BOX = 80;
function enabled(){ return !!(CFG.CLASS_ENDPOINT && CFG.CLASS_KEY); }
function load(){ try{ var v = JSON.parse(localStorage.getItem(BOX)); return Array.isArray(v) ? v : []; }catch(e){ return []; } }
function save(list){ try{ localStorage.setItem(BOX, JSON.stringify(list.slice(-MAX_BOX))); }catch(e){} }
function cleanCode(c){ return String(c || '').trim().toUpperCase().slice(0, 40); }   // same rule as the main app: trim + upper case
function validCode(c){ return /^[^<>"&]{2,40}$/.test(cleanCode(c)); }
function withTimeout(p, ms){ return Promise.race([p, new Promise(function(_, rej){ setTimeout(function(){ rej(new Error('timeout')); }, ms || 12000); })]); }

/* one POST; resolves 'ok', 'unknown class' or another server word, rejects on a network problem */
function post(payload){
  return withTimeout(fetch(CFG.CLASS_ENDPOINT, {method: 'POST', headers: {'Content-Type': 'text/plain;charset=utf-8'}, body: JSON.stringify(Object.assign({key: CFG.CLASS_KEY}, payload))})
    .then(function(r){ return r.text(); })).then(function(t){ return String(t || '').trim(); });
}

var flushing = false, status = 'idle';   // idle | ok | unknown class | offline
function flush(){
  if (!enabled() || flushing) return Promise.resolve(status);
  var list = load(); if (!list.length) return Promise.resolve(status);
  flushing = true;
  function step(){
    if (!list.length){ flushing = false; save(list); return status; }
    return post(list[0]).then(function(word){
      if (word === 'ok' || word === 'unknown class' || word === 'bad gq'){ status = word === 'ok' ? 'ok' : (word === 'bad gq' ? status : word); list.shift(); save(list); return step(); }   // final answers
      status = 'offline'; flushing = false; save(list); return status;                                  // 'busy', 'err' or anything else: keep it and retry later
    }, function(){ status = 'offline'; flushing = false; save(list); return status; });
  }
  return step();
}
/* queue a payload and try to send everything waiting */
function send(payload){
  if (!enabled() || !validCode(payload.classCode)) return Promise.resolve('no class');
  payload.classCode = cleanCode(payload.classCode);
  var list = load(); list.push(payload); save(list);
  return flush();
}

window.GQClass = {
  enabled: enabled, validCode: validCode, cleanCode: cleanCode, flush: flush,
  status: function(){ return status; },
  /* one finished quiz: {classCode, name, stream, level, gym, gymName, town, lv, ord, score, total, passed, gymsTotal, wrong:[{id,q,a,g}], right:[id]} */
  result: function(p){ p.action = 'gqput'; p.aid = Math.random().toString(36).slice(2, 10); p.at = Date.now(); return send(p); },
  /* everything the student already has (best score, attempts, badge per gym), sent when the class code is set */
  sync: function(p){ p.action = 'gqsync'; p.at = Date.now(); return send(p); }
};
window.addEventListener('online', function(){ flush(); });
setTimeout(flush, 1500);
})();
