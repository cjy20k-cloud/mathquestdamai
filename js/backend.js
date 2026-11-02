/* Thin client for the Google Apps Script web app (apps-script/Code.gs).
   Until GQ_CONFIG.ENDPOINT (js/config.js) is filled in, everything falls back to this device only. */
(function(){
'use strict';
var CFG = window.GQ_CONFIG = Object.assign({ENDPOINT: '', KEY: 'gq-change-me'}, window.GQ_CONFIG || {});
function enabled(){ return !!CFG.ENDPOINT; }
function withTimeout(p, ms){ return Promise.race([p, new Promise(function(_, rej){ setTimeout(function(){ rej(new Error('timeout')); }, ms || 9000); })]); }
function post(action, payload){
  // text/plain keeps this a "simple" request, so the browser does not need a CORS preflight
  return withTimeout(fetch(CFG.ENDPOINT, {method: 'POST', headers: {'Content-Type': 'text/plain;charset=utf-8'}, body: JSON.stringify(Object.assign({key: CFG.KEY, action: action}, payload || {}))}).then(function(r){ return r.json(); }));
}
function get(action, params){
  var q = new URLSearchParams(Object.assign({key: CFG.KEY, action: action}, params || {}));
  return withTimeout(fetch(CFG.ENDPOINT + (CFG.ENDPOINT.indexOf('?') < 0 ? '?' : '&') + q.toString()).then(function(r){ return r.json(); }));
}
function offline(){ return Promise.resolve({ok: true, offline: true}); }
window.GQBackend = {
  enabled: enabled,
  /* one profile per student: the server refuses a name that is already registered */
  register: function(p){ return enabled() ? post('register', p).catch(function(){ return {ok: true, offline: true}; }) : offline(); },
  /* send the student's full badge list; the server counts them */
  score: function(p){ return enabled() ? post('score', p).catch(function(){ return {ok: false}; }) : offline(); },
  leaderboard: function(){ return enabled() ? get('leaderboard').catch(function(){ return {ok: false}; }) : Promise.resolve({ok: true, offline: true, rows: []}); }
};
})();
