/* Gym Quest - profile, character, continent map, gyms, quiz, leaderboard. */
(function(){
'use strict';
var WORLD = window.GQ_WORLD, BANKS = window.GQ_BANKS || {}, AV = window.GQAvatar, BE = window.GQBackend, PER = window.GQPersona;

/* ---------- helpers ---------- */
function $(s, el){ return (el || document).querySelector(s); }
function $$(s, el){ return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
function esc(s){ return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function hashStr(s){ var h = 2166136261; for (var i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function shuffle(a){ a = a.slice(); for (var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function kx(l){ try{ return window.katex ? katex.renderToString(l, {throwOnError: false}) : '<code>' + esc(l) + '</code>'; }catch(e){ return '<code>' + esc(l) + '</code>'; } }
function rich(raw){   // "$...$" is maths, "\$" is a literal dollar sign
  raw = String(raw); var out = '', buf = '', math = false;
  function flush(){ if (buf){ out += math ? kx(buf) : esc(buf); buf = ''; } }
  for (var i = 0; i < raw.length; i++){
    var ch = raw.charAt(i);
    if (ch === '\\' && raw.charAt(i + 1) === '$'){ buf += math ? '\\$' : '$'; i++; continue; }
    if (ch === '$'){ flush(); math = !math; continue; }
    buf += ch;
  }
  flush(); return out;
}
function load(k, d){ try{ var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }catch(e){ return d; } }
function save(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
var toastT; function toast(msg){ var t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function(){ t.classList.remove('on'); }, 2600); }

/* ---------- constants ---------- */
var K = {profile: 'gq.profile.v1', prog: 'gq.progress.v1'};
var LV = ['', 'Sec 1', 'Sec 2', 'Sec 3', 'Sec 4'];
var CONT = {
  G1: {name: 'Verdant Isles', icon: '🌴', hue: 140, blurb: 'The G1 continent: build strong foundations, one gym at a time.'},
  G2: {name: 'Crestlands', icon: '⛰️', hue: 222, blurb: 'The G2 continent: climb the ridges from Sec 1 to Sec 4.'},
  G3: {name: 'Zenith Summit', icon: '🌋', hue: 22, blurb: 'The G3 continent: the high peaks of Express maths.'}
};
var STREAM_DESC = {G1: 'Foundation pace', G2: 'Standard pace', G3: 'Advanced pace'};
var TOWN_ICONS = ['🏘️', '🏰', '⛩️', '🏯', '🏛️', '🗼', '🏡', '🏫'];
var NAMES = {
  M: ['Ethan', 'Marcus', 'Daniel', 'Aiden', 'Jun Wei', 'Kai', 'Ravi', 'Haziq', 'Zhi Hao', 'Isaac'],
  F: ['Mei Ling', 'Sarah', 'Aisha', 'Priya', 'Chloe', 'Jia Hui', 'Nur', 'Hannah', 'Ruby', 'Kavya']
};

/* ---------- world index ---------- */
var gyms = {}, towns = {};
WORLD.continents.forEach(function(c){ c.towns.forEach(function(t){ t.stream = c.stream; towns[t.id] = t; t.gyms.forEach(function(g){ g.town = t; gyms[g.id] = g; }); }); });
function contOf(stream){ return WORLD.continents.filter(function(c){ return c.stream === stream; })[0]; }
function hasBank(g){ return !!BANKS[g.id]; }
function gymHue(g){ return hashStr(g.id) % 360; }
function expertFor(g){
  var h = hashStr('expert:' + g.id), cfg = AV.randomCfg('expert:' + g.id), nm = NAMES[cfg.sex];
  return {name: nm[(h >>> 4) % nm.length], cfg: cfg, persona: PER.of(g.id)};
}

/* ---------- state ---------- */
var profile = load(K.profile, null);
var prog = load(K.prog, {badges: {}, attempts: {}});
var view = {name: 'home'}, backFn = null, keyFn = null, Q = null, WLD = null;
var mapMode = load('gq.mapmode.v1', 'world');   // 'world' = walk-around map, 'list' = plain list of towns
function firstName(){ return profile ? profile.name.split(' ')[0] : ''; }
function sayFor(g, kind, salt){ return PER.say(g.id, kind, salt, firstName()); }
function badgeCount(){ return Object.keys(prog.badges).length; }
function townBadges(t){ return t.gyms.filter(function(g){ return prog.badges[g.id]; }).length; }
function allowed(t){ return profile && t.stream === profile.stream && t.level <= profile.level; }

/* ---------- chrome ---------- */
function chrome(title, back){
  $('#ttl').textContent = title; backFn = back || null; $('#back').hidden = !back;
  $('#lbBtn').hidden = !profile || !profile.char; $('#meBtn').hidden = !profile || !profile.char; $('#viewBtn').hidden = true;
  if (profile && profile.char) $('#meBtn').innerHTML = AV.svg(profile.char, {bust: true, label: 'My character'});
}
function screen(html){
  if (WLD){ WLD.destroy(); WLD = null; }
  var s = $('#screen'); $('#app').classList.remove('wide'); s.classList.remove('full'); s.innerHTML = html; window.scrollTo(0, 0); keyFn = null; return s;
}
function viewToggle(label, fn){ var b = $('#viewBtn'); b.textContent = label; b.hidden = false; b.onclick = fn; }
function backToGym(g){ if (mapMode === 'world') go('map', {focus: g.id}); else go('town', g.town.id); }
function go(name, arg){ view = {name: name, arg: arg}; ({home: vHome, profile: vProfile, character: vCharacter, map: vMap, town: vTown, gym: vGym, quiz: vQuestion, result: vResult, board: vBoard, me: vMe})[name](arg); }
function boot(){
  $('#back').addEventListener('click', function(){ if (backFn) backFn(); });
  $('#lbBtn').addEventListener('click', function(){ go('board'); });
  $('#meBtn').addEventListener('click', function(){ go('me'); });
  document.addEventListener('keydown', function(e){ if (keyFn && !e.ctrlKey && !e.metaKey && !e.altKey) keyFn(e); });
  if (!profile) go('home'); else if (!profile.char) go('character', {first: true}); else go('map');
}

/* ================= welcome ================= */
function vHome(){
  chrome('Gym Quest', null);
  var cast = [0, 1, 2].map(function(i){ return AV.svg(AV.randomCfg('hero' + i), {}); }).join('');
  var s = screen('<div class="hero"><h1>Gym Quest</h1><div class="hero-cast">' + cast + '</div><p>Create your profile and a character, travel your continent and challenge a student expert in every gym. Answer all 10 questions right to win the badge.</p><button class="btn" id="go" style="background:#fff;color:#1f2340">Create my profile</button></div>' +
    '<div class="card"><h2>How it works</h2><div class="stack" style="margin-top:8px;font-weight:700;line-height:1.5"><div>1. Make a profile: your name, stream and level. <b>It can\'t be changed once confirmed.</b></div><div>2. Design your character: a head, a hairstyle and an accessory.</div><div>3. Explore your continent. Every topic is a town and every sub topic is a gym.</div><div>4. Beat the student expert: 10 questions, all must be right.</div></div></div>');
  $('#go', s).addEventListener('click', function(){ go('profile'); });
}

/* ================= profile ================= */
function vProfile(){
  chrome('Create your profile', function(){ go('home'); });
  var d = {name: '', stream: '', level: 0, ok: false};
  var s = screen('<div class="card"><h2>Your profile</h2><p class="lead">Only your name, stream and level. You get <b>one profile</b> and it can\'t be edited later.</p>' +
    '<label class="lbl" for="nm">Name</label><input class="inp" id="nm" maxlength="30" autocomplete="off" placeholder="e.g. Tan Wei Ming 2A">' +
    '<label class="lbl">Stream</label><div class="seg c3" id="stream">' + ['G1', 'G2', 'G3'].map(function(x){ return '<button class="opt" data-v="' + x + '" aria-pressed="false">' + x + '<small>' + STREAM_DESC[x] + '</small></button>'; }).join('') + '</div>' +
    '<label class="lbl">Level</label><div class="seg c4" id="level">' + [1, 2, 3, 4].map(function(x){ return '<button class="opt" data-v="' + x + '" aria-pressed="false">Sec ' + x + '</button>'; }).join('') + '</div>' +
    '<div class="note">Your stream decides which continent you can travel to. Your level decides which gyms are open: Sec 4 can enter every gym.</div>' +
    '<label class="check"><input type="checkbox" id="ok"><span>I understand that my name, stream and level <b>cannot be changed</b> after I confirm.</span></label>' +
    '<div class="err" id="err" role="alert"></div><button class="btn primary wide" id="confirm" style="margin-top:14px" disabled>Confirm profile</button></div>');
  function refresh(){ $('#confirm', s).disabled = !(d.name.trim().length >= 2 && d.stream && d.level && d.ok); }
  $('#nm', s).addEventListener('input', function(e){ d.name = e.target.value; refresh(); });
  $$('#stream .opt', s).forEach(function(b){ b.addEventListener('click', function(){ d.stream = b.dataset.v; $$('#stream .opt', s).forEach(function(x){ x.setAttribute('aria-pressed', x === b); }); refresh(); }); });
  $$('#level .opt', s).forEach(function(b){ b.addEventListener('click', function(){ d.level = +b.dataset.v; $$('#level .opt', s).forEach(function(x){ x.setAttribute('aria-pressed', x === b); }); refresh(); }); });
  $('#ok', s).addEventListener('change', function(e){ d.ok = e.target.checked; refresh(); });
  $('#confirm', s).addEventListener('click', function(){
    var btn = $('#confirm', s), name = d.name.replace(/\s+/g, ' ').trim();
    btn.disabled = true; btn.innerHTML = '<span class="spin"></span>Registering…'; $('#err', s).textContent = '';
    BE.register({name: name, stream: d.stream, level: d.level}).then(function(r){
      if (r && r.ok === false && r.error === 'exists'){ $('#err', s).textContent = 'That name already has a profile. Add your class to your name, or ask your teacher.'; btn.textContent = 'Confirm profile'; refresh(); return; }
      if (r && r.ok === false){ $('#err', s).textContent = 'Could not register. Please check your details and try again.'; btn.textContent = 'Confirm profile'; refresh(); return; }
      profile = {name: name, stream: d.stream, level: d.level, created: Date.now(), locked: true, char: null}; save(K.profile, profile);
      go('character', {first: true});
    });
  });
}

/* ================= character builder ================= */
function vCharacter(arg){
  var first = arg && arg.first, ch = Object.assign({sex: 'M', outfit: 0, hair: 0, acc: -1, skin: 1, hairc: 0}, profile.char || {});
  chrome(first ? 'Create your character' : 'Edit your character', first ? null : function(){ go('me'); });
  function draw(){
    var sx = ch.sex;
    var s = screen('<div class="builder"><div class="preview">' + AV.svg(ch, {label: 'Your character'}) + '</div><div>' +
      '<label class="lbl" style="margin-top:0">Character</label><div class="seg c2" id="sex"><button class="opt" data-v="M" aria-pressed="' + (sx === 'M') + '">Boy</button><button class="opt" data-v="F" aria-pressed="' + (sx === 'F') + '">Girl</button></div>' +
      '<label class="lbl">Outfit</label><div class="outfits" id="outfit">' + [0, 1, 2].map(function(i){ return '<button class="opt" data-v="' + i + '" aria-pressed="' + (ch.outfit === i) + '">' + AV.svg(Object.assign({}, ch, {outfit: i}), {}) + '<small>' + AV.OUTFITS[i] + '</small></button>'; }).join('') + '</div>' +
      '<label class="lbl">Hairstyle</label><div class="grid-opts" id="hair">' + AV.HAIR_NAMES[sx].map(function(n, i){ return '<button class="mini" title="' + n + '" aria-label="' + n + '" data-v="' + i + '" aria-pressed="' + (ch.hair === i) + '">' + AV.svg(Object.assign({}, ch, {hair: i, acc: -1}), {bust: true}) + '</button>'; }).join('') + '</div>' +
      '<label class="lbl">Accessory</label><div class="grid-opts" id="acc"><button class="mini none" data-v="-1" aria-label="No accessory" aria-pressed="' + (ch.acc === -1) + '">None</button>' + AV.ACC_NAMES[sx].map(function(n, i){ return '<button class="mini" title="' + n + '" aria-label="' + n + '" data-v="' + i + '" aria-pressed="' + (ch.acc === i) + '">' + AV.svg(Object.assign({}, ch, {acc: i}), {bust: true}) + '</button>'; }).join('') + '</div>' +
      '<label class="lbl">Skin tone</label><div class="swatches" id="skin">' + AV.SKIN.map(function(c, i){ return '<button class="sw" style="background:' + c + '" aria-label="Skin tone ' + (i + 1) + '" data-v="' + i + '" aria-pressed="' + (ch.skin === i) + '"></button>'; }).join('') + '</div>' +
      '<label class="lbl">Hair colour</label><div class="swatches" id="hairc">' + AV.HAIRC.map(function(c, i){ return '<button class="sw" style="background:' + c + '" aria-label="Hair colour ' + (i + 1) + '" data-v="' + i + '" aria-pressed="' + (ch.hairc === i) + '"></button>'; }).join('') + '</div>' +
      '<button class="btn primary wide" id="save" style="margin-top:18px">' + (first ? 'Save character and start' : 'Save character') + '</button></div></div>');
    [['sex', 'sex', function(v){ return v; }], ['outfit', 'outfit', Number], ['hair', 'hair', Number], ['acc', 'acc', Number], ['skin', 'skin', Number], ['hairc', 'hairc', Number]].forEach(function(m){
      $$('#' + m[0] + ' button', s).forEach(function(b){ b.addEventListener('click', function(){ var y = window.scrollY; ch[m[1]] = m[2](b.dataset.v); if (m[1] === 'sex'){ ch.hair = 0; ch.acc = -1; } draw(); window.scrollTo(0, y); }); });
    });
    $('#save', s).addEventListener('click', function(){ profile.char = ch; save(K.profile, profile); toast('Character saved'); go(first ? 'map' : 'me'); });
  }
  draw();
}

/* ================= continent map ================= */
function vMap(arg){
  if (mapMode === 'list' || !window.GQWorld) return vMapList();
  var c = contOf(profile.stream), info = CONT[profile.stream]; chrome(info.name, null);
  viewToggle('☰ List', function(){ mapMode = 'list'; save('gq.mapmode.v1', mapMode); go('map'); });
  var s = screen('<div class="wld" id="wld"></div>'); $('#app').classList.add('wide'); s.classList.add('full');
  WLD = GQWorld.create($('#wld', s), {
    stream: profile.stream, continent: c, name: info.name, level: profile.level, levelNames: LV, char: profile.char, svg: AV.svg,
    expertFor: expertFor, won: function(g){ return !!prog.badges[g.id]; }, hasBank: hasBank, gymHue: gymHue,
    say: function(g, salt){ return sayFor(g, !hasBank(g) ? 'soon' : (prog.badges[g.id] ? 'beaten' : 'idle'), salt); },
    pos: prog.pos, focus: arg && arg.focus, onPos: function(p){ prog.pos = p; save(K.prog, prog); }, onTalk: openTalk
  });
}
function openTalk(g){
  var ex = expertFor(g), b = prog.badges[g.id], live = hasBank(g), lvl = g.town.level;
  var line = esc(sayFor(g, !live ? 'soon' : (b ? 'beaten' : 'greet'), 0)) + (live ? '<br><span style="color:var(--muted);font-size:13px">Welcome to the <b>' + esc(g.name) + '</b> gym. Show me you really know this topic.</span>' : '');
  var d = WLD.dialog('<div class="dcard"><div class="dtop"><div class="dport">' + AV.svg(ex.cfg, {bust: true, label: 'Student expert'}) + '</div><div style="flex:1;min-width:0"><div class="dsub">Student expert · ' + esc(ex.persona.tag) + '</div><div class="dname">' + esc(ex.name) + '</div><div class="dsub" style="margin-top:2px">' + LV[lvl] + ' · ' + esc(g.name) + '</div></div>' + (b ? '<span class="medal" style="width:54px;height:54px;flex:none">' + badgeSVG(g) + '</span>' : '') + '</div>' +
    '<div class="dtext">' + line + '</div>' +
    (live ? '<div class="rules">📝 ' + fmtText(lvl) + '<br>🎯 All 10 must be correct to earn the badge.</div>' : '') +
    '<div class="row"><button class="btn ghost" id="dno">' + (live ? 'Not yet' : 'Close') + '</button>' + (live ? '<button class="btn primary" id="dgo">' + (b ? 'Rematch!' : 'Challenge!') + '</button>' : '') + '</div></div>');
  $('#dno', d).addEventListener('click', function(){ WLD.closeDialog(); });
  if (live){ $('#dgo', d).addEventListener('click', function(){ startQuiz(g); }); $('#dgo', d).focus(); } else $('#dno', d).focus();
}
function vMapList(){
  var c = contOf(profile.stream), info = CONT[profile.stream]; chrome(info.name, null);
  viewToggle('🗺️ Map', function(){ mapMode = 'world'; save('gq.mapmode.v1', mapMode); go('map'); });
  var live = 0, total = 0; c.towns.forEach(function(t){ t.gyms.forEach(function(g){ total++; if (hasBank(g)) live++; }); });
  var ex = {name: profile.name};
  var html = '<div class="banner" style="--hue:' + info.hue + '"><div class="ico">' + info.icon + '</div><div><h2>' + info.name + '</h2><p>' + info.blurb + '</p></div></div>' +
    '<div class="me-row"><div class="av">' + AV.svg(profile.char, {bust: true}) + '</div><div class="bubble">Hi ' + esc(profile.name.split(' ')[0]) + '! You are <b>' + LV[profile.level] + '</b> in <b>' + profile.stream + '</b>. You hold <b>' + badgeCount() + '</b> badge' + (badgeCount() === 1 ? '' : 's') + '. ' + (profile.level < 4 ? 'Towns for higher levels are locked for now.' : 'Every town and gym is open to you.') + '</div></div>';
  [1, 2, 3, 4].forEach(function(L){
    var list = c.towns.filter(function(t){ return t.level === L; }); if (!list.length) return;
    var locked = L > profile.level;
    html += '<div class="band"><h3>' + LV[L] + ' towns' + (locked ? '<span class="lockpill">🔒 Unlocks at ' + LV[L] + '</span>' : '') + '</h3></div><div class="towns" style="--hue:' + info.hue + '">' + list.map(function(t, i){
      var done = townBadges(t), all = t.gyms.length;
      return '<button class="town' + (locked ? ' locked' : '') + (done === all && all ? ' done' : '') + '" data-id="' + t.id + '"' + (locked ? ' aria-disabled="true"' : '') + '><span class="tic">' + (locked ? '🔒' : TOWN_ICONS[hashStr(t.id) % TOWN_ICONS.length]) + '</span><span style="flex:1;min-width:0"><b>' + esc(t.name) + '</b><small>' + all + ' gym' + (all === 1 ? '' : 's') + ' · 🏅 ' + done + '/' + all + '</small><div class="prog"><i style="width:' + (all ? Math.round(done / all * 100) : 0) + '%"></i></div></span></button>';
    }).join('') + '</div>';
  });
  html += '<p class="lead" style="margin-top:16px">' + live + ' of ' + total + ' gyms on this continent are open for challengers so far. The rest show <b>Coming soon</b>.</p>';
  var s = screen(html);
  $$('.town', s).forEach(function(b){ b.addEventListener('click', function(){ var t = towns[b.dataset.id]; if (!allowed(t)) return toast('🔒 This town unlocks at ' + LV[t.level] + '.'); go('town', t.id); }); });
}

/* ================= town (gyms) ================= */
function vTown(id){
  var t = towns[id]; if (!t || !allowed(t)) return go('map');
  chrome('Town of ' + t.name, function(){ go('map'); });
  var info = CONT[profile.stream];
  var s = screen('<div class="banner" style="--hue:' + info.hue + '"><div class="ico">' + TOWN_ICONS[hashStr(t.id) % TOWN_ICONS.length] + '</div><div><h2>' + esc(t.name) + '</h2><p>' + LV[t.level] + ' · 🏅 ' + townBadges(t) + ' of ' + t.gyms.length + ' badges</p></div></div><div class="gyms">' + t.gyms.map(function(g){
    var ex = expertFor(g), b = prog.badges[g.id], live = hasBank(g);
    return '<button class="gym' + (live ? '' : ' soon') + '" data-id="' + g.id + '"><span class="av">' + AV.svg(ex.cfg, {bust: true}) + '</span><span><b>' + esc(g.name) + '</b><small>Student expert: ' + esc(ex.name) + '</small></span><span class="st ' + (b ? 'badge' : (live ? 'ready' : 'soon')) + '">' + (b ? '🏅 Badge earned' : (live ? 'Challenge' : 'Coming soon')) + '</span></button>';
  }).join('') + '</div>');
  $$('.gym', s).forEach(function(b){ b.addEventListener('click', function(){ var g = gyms[b.dataset.id]; if (!hasBank(g)) return toast('🚧 This gym\'s questions are still being written.'); go('gym', g.id); }); });
}

/* ================= gym intro ================= */
function fmtText(level){
  return level === 1 ? '10 multiple-choice questions (4 options each)' : (level === 2 ? '10 questions: 5 answer-blank and 5 multiple choice' : '10 answer-blank questions, including 3 word problems');
}
function badgeSVG(g){ var h = gymHue(g); return '<svg viewBox="0 0 60 60" role="img" aria-label="Badge"><circle cx="30" cy="30" r="26" fill="hsl(' + h + ',70%,55%)" stroke="hsl(' + h + ',70%,35%)" stroke-width="3"/><circle cx="30" cy="30" r="19" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="2" stroke-dasharray="3 3"/><path d="M30 14l4.6 9.6 10.4 1.4-7.6 7.3 1.9 10.4L30 37.8l-9.3 4.9 1.9-10.4L15 25l10.4-1.4z" fill="#ffd43b" stroke="#c99700" stroke-width="1.2"/></svg>'; }
function vGym(id){
  var g = gyms[id]; if (!g || !allowed(g.town) || !hasBank(g)) return go('map');
  chrome(g.name, function(){ go('town', g.town.id); });
  var ex = expertFor(g), b = prog.badges[g.id], tries = prog.attempts[g.id] || 0, lvl = g.town.level;
  var s = screen('<div class="card"><div class="expert"><div class="big">' + AV.svg(ex.cfg, {label: 'Student expert'}) + '</div><div class="talk"><div class="tag-line">Student expert</div><h2>' + esc(ex.name) + '</h2><div class="bubble" style="margin-top:8px">' + (b ? 'You already beat me! Want to try again and see if you can still get all 10?' : 'Welcome to the <b>' + esc(g.name) + '</b> gym! Show me you really know this topic.') + '</div></div></div>' +
    '<div class="rulebox">📝 ' + fmtText(lvl) + '<br>🎯 You must answer <b>all 10 correctly</b> to earn the badge.<br>🔁 Each attempt draws a fresh 10 from my bank of 20 questions.</div>' +
    '<div class="row" style="align-items:center;margin-bottom:12px"><div style="flex:0 0 66px"><span class="medal">' + badgeSVG(g) + '</span></div><div style="font-weight:800;font-size:14px;line-height:1.5">' + (b ? '🏅 Badge earned' : 'Badge not earned yet') + '<br><span style="color:var(--muted)">Attempts so far: ' + tries + '</span></div></div>' +
    '<button class="btn primary wide" id="start">' + (b ? 'Challenge again' : 'Start the challenge') + '</button></div>');
  $('#start', s).addEventListener('click', function(){ startQuiz(g); });
}

/* ================= quiz ================= */
function pickQuiz(bank, level){
  if (level === 1) return shuffle(bank).slice(0, 10);
  if (level === 2) return shuffle(shuffle(bank.filter(function(q){ return q.t === 'mcq'; })).slice(0, 5).concat(shuffle(bank.filter(function(q){ return q.t === 'blank'; })).slice(0, 5)));
  return shuffle(shuffle(bank.filter(function(q){ return q.word; })).slice(0, 3).concat(shuffle(bank.filter(function(q){ return !q.word; })).slice(0, 7)));
}
function startQuiz(g){
  var items = pickQuiz(BANKS[g.id], g.town.level);
  Q = {seed: Math.random().toString(36).slice(2), said: {}, gym: g, items: items, i: 0, results: [], checked: false, sel: null, entry: ''};
  go('quiz');
}
function isRight(q, v){
  if (q.t === 'mcq') return v === q.a;
  var n = window.MRAnswerNumber ? window.MRAnswerNumber(v) : Number(v);
  return isFinite(n) && Math.abs(n - q.a) <= 1e-6 * Math.max(1, Math.abs(q.a));
}
function fmtAns(q){ return q.t === 'mcq' ? rich(q.opts[q.a]) : rich('$' + String(+q.a) + '$'); }
function runLen(){ var k = 0; for (var j = Q.i; j >= 0 && Q.results[j] && Q.results[j].ok; j--) k++; return k; }
function coach(kind, i){
  var g = Q.gym, ex = expertFor(g), key = kind + i;
  if (!Q.said[key]) Q.said[key] = PER.say(g.id, kind, Q.seed + ':' + i, firstName());
  return '<div class="coach"><div class="cav">' + AV.svg(ex.cfg, {bust: true, label: ex.name}) + '</div><div class="say"><small>' + esc(ex.name) + ' · ' + esc(ex.persona.tag) + '</small>' + esc(Q.said[key]) + '</div></div>';
}
function vQuestion(){
  var q = Q.items[Q.i], n = Q.items.length, g = Q.gym, ck = Q.checked, last = Q.results[Q.i];
  chrome(g.name, function(){ if (window.confirm('Leave the challenge? You will lose this attempt.')) backToGym(g); });
  var dots = Q.items.map(function(it, i){ var r = Q.results[i]; return '<i class="' + (r ? (r.ok ? 'ok' : 'no') : (i === Q.i ? 'cur' : '')) + '"></i>'; }).join('');
  var body = '';
  if (q.t === 'mcq'){
    body = '<div class="choices">' + q.opts.map(function(o, i){
      var cls = ck ? (i === q.a ? ' right' : (i === last.given ? ' wrong' : '')) : '';
      return '<button class="choice' + cls + '" data-i="' + i + '" aria-pressed="' + (!ck && Q.sel === i) + '"' + (ck ? ' disabled' : '') + '><span class="ltr">' + 'ABCD'[i] + '</span><span>' + rich(o) + '</span></button>';
    }).join('') + '</div>';
  } else if (!ck){
    body = '<div class="entry empty" id="entry" aria-live="polite">' + 'Type your answer…' + '</div><div class="pad" id="pad">' + ['7', '8', '9', '⌫', '4', '5', '6', '−', '1', '2', '3', '/'].map(function(k){ return '<button data-k="' + k + '" class="' + (k === '⌫' ? 'del' : (k === '−' || k === '/' ? 'op' : '')) + '">' + k + '</button>'; }).join('') + '<button data-k="0" class="z">0</button><button data-k="." class="op">.</button><button data-k="C" class="del">C</button></div>';
  } else body = '<div class="entry" style="border-style:solid;border-color:' + (last.ok ? 'var(--good)' : 'var(--bad)') + '">' + esc(last.shown) + '</div>';
  var fb = '';
  if (ck){
    fb = '<div class="fb ' + (last.ok ? 'good' : 'bad') + '"><h3>' + (last.ok ? '✅ Correct!' : '❌ Not quite') + '</h3>' + (last.ok ? '' : '<div class="ans">Correct answer: ' + fmtAns(q) + '</div>') + (q.w ? '<div class="work">' + (last.ok ? '' : '<b>How to solve it:</b> ') + rich(q.w) + '</div>' : '') + '</div>' +
      '<button class="btn primary wide" id="next" style="margin-top:14px">' + (Q.i + 1 < n ? 'Next question' : 'See my results') + '</button>';
  } else fb = '<button class="btn primary wide" id="check" style="margin-top:14px"' + (q.t === 'mcq' && Q.sel === null ? ' disabled' : '') + '>Check answer</button>';
  var kind = ck ? (last.ok ? (runLen() % 3 === 0 ? 'streak' : 'right') : 'wrong') : (Q.i === 0 ? 'start' : (Q.i === n - 1 ? 'last' : 'think'));
  var s = screen('<div class="dots" aria-label="Progress">' + dots + '</div>' + coach(kind, Q.i) + '<div class="card"><div class="qmeta"><span>Question ' + (Q.i + 1) + ' of ' + n + '</span><span class="qtype' + (q.word ? ' word' : '') + '">' + (q.word ? 'Word problem' : (q.t === 'mcq' ? 'Multiple choice' : 'Answer blank')) + '</span></div><div class="qtext">' + rich(q.q) + '</div>' + body + fb + '</div>');
  if (q.t === 'mcq' && !ck) $$('.choice', s).forEach(function(b){ b.addEventListener('click', function(){ Q.sel = +b.dataset.i; vQuestion(); }); });
  if (q.t === 'blank' && !ck) $$('#pad button', s).forEach(function(b){ b.addEventListener('click', function(){ type(b.dataset.k); }); });
  if ($('#check', s)) $('#check', s).addEventListener('click', check);
  if ($('#next', s)) $('#next', s).addEventListener('click', next);
  keyFn = function(e){
    var k = e.key;
    if (ck){ if (k === 'Enter'){ e.preventDefault(); next(); } return; }
    if (q.t === 'mcq'){ var ix = '1234'.indexOf(k); if (ix < 0) ix = 'abcd'.indexOf(k.toLowerCase()); if (ix >= 0 && k.length === 1){ Q.sel = ix; vQuestion(); } else if (k === 'Enter' && Q.sel !== null){ e.preventDefault(); check(); } return; }
    if (/^[0-9.]$/.test(k)) type(k); else if (k === '-') type('−'); else if (k === '/') type('/'); else if (k === 'Backspace') type('⌫'); else if (k === 'Enter') check(); else return;
    e.preventDefault();
  };
}
function type(k){
  if (k === '⌫') Q.entry = Q.entry.slice(0, -1); else if (k === 'C') Q.entry = ''; else if (Q.entry.length < 14) Q.entry += k;
  var el = $('#entry'); if (!el) return; el.className = 'entry' + (Q.entry ? '' : ' empty'); el.textContent = Q.entry || 'Type your answer…';
}
function check(){
  var q = Q.items[Q.i]; if (Q.checked) return;
  var given, ok, shown;
  if (q.t === 'mcq'){ if (Q.sel === null) return; given = Q.sel; ok = isRight(q, given); shown = q.opts[given]; }
  else { if (!Q.entry){ var el = $('#entry'); if (el){ el.classList.add('shake'); setTimeout(function(){ el.classList.remove('shake'); }, 400); } return; } given = Q.entry; ok = isRight(q, given); shown = Q.entry; }
  Q.results[Q.i] = {id: q.id, ok: ok, given: given, shown: shown}; Q.checked = true;
  vQuestion();
}
function next(){
  if (Q.i + 1 < Q.items.length){ Q.i++; Q.checked = false; Q.sel = null; Q.entry = ''; vQuestion(); } else go('result');
}

/* ================= result ================= */
function vResult(){
  var g = Q.gym, n = Q.items.length, score = Q.results.filter(function(r){ return r && r.ok; }).length, passed = score === n, first = passed && !prog.badges[g.id];
  prog.attempts[g.id] = (prog.attempts[g.id] || 0) + 1;
  if (first){ prog.badges[g.id] = {at: Date.now(), score: score}; }
  save(K.prog, prog);
  if (first) BE.score({name: profile.name, stream: profile.stream, level: profile.level, gyms: Object.keys(prog.badges), avatar: profile.char});
  chrome('Results', function(){ backToGym(g); });
  var rev = Q.items.map(function(q, i){ var r = Q.results[i];
    return '<div class="rv' + (r.ok ? '' : ' no') + '"><b>' + (r.ok ? '✅' : '❌') + ' Q' + (i + 1) + '.</b> ' + rich(q.q) + (r.ok ? '' : '<br><b>Correct answer:</b> ' + fmtAns(q) + (q.w ? '<br>' + rich(q.w) : '')) + '</div>'; }).join('');
  var s = screen(coach(passed ? 'win' : 'lose', 'res') + '<div class="card" style="text-align:center">' + (passed ? '<span class="medal" style="width:96px;height:96px">' + badgeSVG(g) + '</span><h2>' + (first ? 'Badge earned!' : 'Perfect again!') + '</h2><p class="lead">You answered all ' + n + ' questions correctly in the ' + esc(g.name) + ' gym.</p>' : '<div class="score">' + score + '/' + n + '</div><h2>So close!</h2><p class="lead">You need all ' + n + ' correct to earn the badge. Study the answers below and try again with a fresh set.</p>') +
    '<div class="row"><button class="btn ghost" id="town">' + (mapMode === 'world' ? 'Back to the map' : 'Back to the town') + '</button><button class="btn primary" id="again">' + (passed ? 'Play again' : 'Try again') + '</button></div></div>' +
    '<div class="card"><h2>Review</h2><div class="review">' + rev + '</div></div>');
  $('#town', s).addEventListener('click', function(){ backToGym(g); });
  $('#again', s).addEventListener('click', function(){ startQuiz(g); });
  if (first) toast('🏅 New badge: ' + g.name);
}

/* ================= leaderboard + profile ================= */
function vBoard(){
  chrome('Leaderboard', function(){ go('map'); });
  var s = screen('<div class="card"><h2>🏆 Leaderboard</h2><p class="lead" id="lbinfo"><span class="spin"></span>Loading…</p><div class="row" id="lbf" style="margin-bottom:10px"><button class="btn ghost" data-f="all" aria-pressed="true">Everyone</button><button class="btn ghost" data-f="mine">My stream (' + profile.stream + ')</button></div><div class="lb" id="lb"></div></div>');
  var mine = {name: profile.name, stream: profile.stream, level: profile.level, badges: badgeCount(), avatar: profile.char, me: true}, rows = [], filter = 'all';
  function paint(){
    var list = rows.filter(function(r){ return filter === 'all' || r.stream === profile.stream; });
    $('#lb', s).innerHTML = list.length ? list.map(function(r, i){ return '<div class="lbrow' + (r.me ? ' me' : '') + '"><div class="rk">' + (i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1) + '</div><div class="av">' + AV.svg(r.avatar || {}, {bust: true}) + '</div><div class="nm"><b>' + esc(r.name) + (r.me ? ' (you)' : '') + '</b><small>' + esc(r.stream) + ' · ' + LV[r.level] + '</small></div><div class="bd">🏅 ' + r.badges + '</div></div>'; }).join('') : '<p class="lead">No one here yet.</p>';
    $$('#lbf button', s).forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.f === filter); });
  }
  $$('#lbf button', s).forEach(function(b){ b.addEventListener('click', function(){ filter = b.dataset.f; paint(); }); });
  BE.leaderboard().then(function(r){
    if (r && r.ok && !r.offline){ rows = (r.rows || []).map(function(x){ x.me = x.name && x.name.toLowerCase() === profile.name.toLowerCase(); return x; }); if (!rows.some(function(x){ return x.me; })) rows.push(mine); rows.sort(function(a, b){ return b.badges - a.badges; }); $('#lbinfo', s).textContent = 'Ranked by gym badges. Every gym badge counts once.'; }
    else { rows = [mine]; $('#lbinfo', s).textContent = r && r.offline ? 'The shared leaderboard is not connected yet, so only your own score shows here.' : 'Could not reach the leaderboard. Showing your own score only.'; }
    paint();
  });
}
function vMe(){
  chrome('My profile', function(){ go('map'); });
  var earned = Object.keys(prog.badges).map(function(id){ return gyms[id]; }).filter(Boolean);
  var s = screen('<div class="card"><div class="expert"><div class="big" style="width:120px">' + AV.svg(profile.char, {}) + '</div><div class="talk"><div class="tag-line">Student</div><h2>' + esc(profile.name) + '</h2><p class="lead" style="margin:4px 0 8px">' + profile.stream + ' · ' + LV[profile.level] + ' · 🔒 locked</p><button class="btn ghost" id="edit">Edit character</button></div></div></div>' +
    '<div class="card"><h2>🏅 My badges (' + earned.length + ')</h2>' + (earned.length ? '<div class="badges" style="margin-top:10px">' + earned.map(function(g){ return '<span class="medal" title="' + esc(g.name) + '">' + badgeSVG(g) + '</span>'; }).join('') + '</div>' : '<p class="lead">No badges yet. Challenge a gym expert to earn your first!</p>') + '</div>');
  $('#edit', s).addEventListener('click', function(){ go('character', {first: false}); });
}

window.__gq = {world: function(){ return WLD; }, go: go, state: function(){ return {profile: profile, prog: prog, view: view, Q: Q}; }, gyms: gyms, towns: towns};
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
