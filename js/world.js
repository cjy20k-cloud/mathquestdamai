/* Gym Quest overworld: a walk-around continent drawn on a canvas (no image files).
   Every topic is a town, every sub topic a gym building, and a student expert stands at each door.
   The map is laid out in four level zones (Sec 1 at the top). A gate closes off each zone the student's level cannot enter.
   GQWorld.create(host, opts) returns {destroy, dialog, closeDialog, focusGym, refresh, ...}. */
(function(){
'use strict';

var T = 32, CW = 32, COLS = 5, MX = 5, X0 = 9, RING = 3;
var G_GRASS = 0, G_MOOR = 1, G_SNOW = 3, G_SAND = 4, G_WATER = 5, G_PATH = 6;
var D_NONE = 0, D_TREE = 1, D_PINE = 2, D_ROCK = 3, D_FLOWER = 4, D_BUSH = 5, D_FENCE = 6;
var GCOL = ['#6fd45a', '#a9d85a', '#70d8a2', '#eef6ff', '#f6e6ae', '#2fb2f0', '#ecd49a'];
var GALT = ['#76da61', '#b1de62', '#79dca9', '#f7fbff', '#fbeab6', '#35bcf5', '#f0dba3'];   // the lighter tone of the soft checker
var INK = '#241d3b', GOLDC = '#ffc83a', FXS = ['π', '√', 'x²', 'Σ', '+', '=', '÷', '%', '∞', '²', '∠', '△'];
var THEMES = {
  G1: {base: G_GRASS, ring: 'water', tree: D_TREE, snow: false, rocks: 0.06, blades: '#6cc04c'},
  G2: {base: G_MOOR, ring: 'pine', tree: D_PINE, snow: false, rocks: 0.1, blades: '#a5b05a'},
  G3: {base: G_SNOW, ring: 'pine', tree: D_PINE, snow: true, rocks: 0.1, blades: '#dbe6f1'}
};
var KEYDIR = {ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', w: 'up', s: 'down', a: 'left', d: 'right', W: 'up', S: 'down', A: 'left', D: 'right'};
var DV = {up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0]};
var STEP_MS = 150;

function esc(s){ return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function hh(x, y, s){ var n = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(s, 2246822519)) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); n ^= n >>> 16; return (n >>> 0) / 4294967296; }
function hex(h){ return [parseInt(h.substr(1, 2), 16), parseInt(h.substr(3, 2), 16), parseInt(h.substr(5, 2), 16)]; }
function rr(c, x, y, w, h, r){ c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
function fitText(c, text, maxW){ if (c.measureText(text).width <= maxW) return text; while (text.length > 1 && c.measureText(text + '…').width > maxW) text = text.slice(0, -1); return text + '…'; }
function star(c, x, y, r){ c.beginPath(); for (var i = 0; i < 10; i++){ var a = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? r * 0.45 : r; c.lineTo(x + Math.cos(a) * q, y + Math.sin(a) * q); } c.closePath(); c.fill(); c.strokeStyle = '#b8860b'; c.lineWidth = 1.5; c.stroke(); }

function create(host, o){
  var theme = THEMES[o.stream] || THEMES.G1, cont = o.continent, LV = o.levelNames;
  var W = 0, H = 0, ground, deco, block, reserved;
  var buildings = [], npcs = [], npcAt = {}, townRects = [], bands = [], gates = [], lockY = -1, spawn = {x: MX, y: 4};
  var miniBase = null, imgCache = {}, now = 0, lastTs = 0, raf = 0, dead = false;
  var P = {x: 0, y: 0, tx: 0, ty: 0, t: 0, dir: 'down', moving: false, step: 0};
  var held = [], bumpArmed = true, mode = 'world', lastPlace = '', nearId = '', saveT = 0, bannerT = 0;
  var cv, ctx, vw = 0, vh = 0, dpr = 1, sc = 1, ro = null, reduceMotion = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  function idx(x, y){ return y * W + x; }
  function inb(x, y){ return x >= 0 && y >= 0 && x < W && y < H; }
  function won(g){ return o.won(g); }
  function gateAt(x, y){ for (var i = 0; i < gates.length; i++) if (gates[i].y === y && (x === MX || x === MX + 1)) return gates[i]; return null; }

  /* ---------- build the continent ---------- */
  function build(){
    var byL = {1: [], 2: [], 3: [], 4: []}, rows = [], y = RING + 3, L, i;
    cont.towns.forEach(function(t){ byL[t.level].push(t); });
    for (L = 1; L <= 4; L++){
      var list = byL[L]; if (!list.length) continue;
      var band = {L: L, start: 0, y1: 0};
      if (bands.length){ var gy = y + 1; gates.push({L: L, y: gy, open: L <= o.level}); band.start = gy; if (L > o.level && lockY < 0) lockY = gy; y += 4; }
      for (i = 0; i < list.length; i += COLS){
        var grp = list.slice(i, i + COLS), h = grp.some(function(t){ return t.gyms.length > 5; }) ? 19 : 11;
        rows.push({y0: y, h: h, L: L, group: grp}); y += h;
      }
      band.y1 = y - 1; bands.push(band);
    }
    H = y + RING + 1; W = X0 + COLS * CW + RING + 1;
    ground = new Uint8Array(W * H); deco = new Uint8Array(W * H); block = new Uint8Array(W * H); reserved = new Uint8Array(W * H);
    var x, k;
    ground.fill(theme.base);
    function road(x0, y0, x1, y1){ for (var yy = y0; yy <= y1; yy++) for (var xx = x0; xx <= x1; xx++) if (inb(xx, yy)){ k = idx(xx, yy); ground[k] = G_PATH; block[k] = 0; deco[k] = 0; reserved[k] = 1; } }
    // outer ring: sea around the isles, pine forest on the mountains
    for (y = 0; y < H; y++) for (x = 0; x < W; x++){
      if (x < RING || y < RING || x >= W - RING || y >= H - RING){
        k = idx(x, y); reserved[k] = 1; block[k] = 1;
        if (theme.ring === 'water') ground[k] = G_WATER; else deco[k] = D_PINE;
      }
    }
    if (theme.ring === 'water'){
      for (y = 0; y < H; y++) for (x = 0; x < W; x++){
        if (ground[idx(x, y)] === G_WATER) continue;
        var nearW = false;
        for (var dy = -2; dy <= 2 && !nearW; dy++) for (var dx = -2; dx <= 2; dx++) if (inb(x + dx, y + dy) && ground[idx(x + dx, y + dy)] === G_WATER){ nearW = true; break; }
        if (nearW) ground[idx(x, y)] = G_SAND;
      }
    }
    road(MX, RING + 1, MX + 1, H - RING - 2);
    // level gates: a fence across the whole continent with one gate on the main road
    gates.forEach(function(g){
      for (var fx = RING; fx < W - RING; fx++){ k = idx(fx, g.y); ground[k] = theme.base; deco[k] = D_FENCE; block[k] = 1; reserved[k] = 1; }
      for (var gx = MX; gx <= MX + 1; gx++){ k = idx(gx, g.y); ground[k] = G_PATH; deco[k] = 0; block[k] = g.open ? 0 : 1; reserved[k] = 1; }
    });
    // towns, gyms and their experts
    rows.forEach(function(row){
      row.group.forEach(function(town, col){
        var cx0 = X0 + col * CW, x0 = cx0 + 2, n = town.gyms.length, brows = n > 5 ? 2 : 1, perRow = Math.ceil(n / brows), gi = 0, endX = cx0 + CW - 1;
        townRects.push({town: town, x0: x0, y0: row.y0, cx0: cx0, w: CW, h: row.h, locked: town.level > o.level});
        for (var yy = row.y0; yy < row.y0 + row.h; yy++) for (var xx = x0 - 1; xx <= x0 + 29; xx++) if (inb(xx, yy)) reserved[idx(xx, yy)] = 1;
        for (var br = 0; br < brows; br++){
          var m = Math.min(perRow, n - gi), tw = m * 4 + (m - 1) * 2, sx = x0 + Math.floor((28 - tw) / 2), by = row.y0 + 3 + br * 8;
          for (var b = 0; b < m; b++, gi++){
            var gym = town.gyms[gi], bx = sx + b * 6;
            buildings.push({x: bx, y: by, w: 4, h: 3, gym: gym, label: null, locked: town.level > o.level});
            for (var ay = by; ay < by + 3; ay++) for (var ax = bx; ax < bx + 4; ax++) block[idx(ax, ay)] = 1;
            var npc = {gym: gym, x: bx + 1, y: by + 3, cfg: o.expertFor(gym).cfg}; npcs.push(npc); npcAt[idx(npc.x, npc.y)] = npc;
          }
          road(MX, by + 3, endX, by + 4);
        }
      });
    });
    for (y = RING; y <= RING + 3; y++) for (x = MX + 2; x <= MX + 13; x++) reserved[idx(x, y)] = 1;   // room for the welcome sign
    // scenery
    for (y = RING; y < H - RING; y++) for (x = RING; x < W - RING; x++){
      var j = idx(x, y); if (reserved[j] || ground[j] === G_WATER) continue;
      var p = hh(x, y, 7), d = p < 0.5 ? theme.tree : (p < 0.5 + theme.rocks ? D_ROCK : D_NONE);
      if (ground[j] === G_SAND && (d === D_TREE || d === D_PINE)) d = D_NONE;
      deco[j] = d; if (d === D_TREE || d === D_PINE || d === D_ROCK) block[j] = 1;
    }
    townRects.forEach(function(tr){
      for (var yy = tr.y0; yy < tr.y0 + tr.h; yy++) for (var xx = tr.x0 - 1; xx <= tr.x0 + 29; xx++){
        var q = idx(xx, yy); if (!block[q] && ground[q] !== G_PATH && ground[q] !== G_SAND){ var p2 = hh(xx, yy, 11); deco[q] = p2 < 0.05 ? D_FLOWER : (p2 < 0.06 ? D_BUSH : D_NONE); }
      }
    });
    block[idx(spawn.x, spawn.y)] = 0;
    buildMinimap();
  }

  /* ---------- sprites: the student's own avatar and every expert ---------- */
  function sprite(cfg){
    var key = JSON.stringify(cfg); if (imgCache[key]) return imgCache[key];
    var s = o.svg(cfg, {}).replace('<svg ', '<svg width="240" height="336" ');
    var im = new Image(); im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s); imgCache[key] = im; return im;
  }
  function drawPerson(c, px, py, cfg, step, ring){
    var im = sprite(cfg), h = 50, w = h * 120 / 168, bob = step % 2 ? -2 : 0, cx = px + T / 2, fy = py + T - 3;
    if (ring){
      var pulse = 1 + Math.sin(now / 260) * 0.07;
      c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.ellipse(cx, fy, 14.5 * pulse, 5.8 * pulse, 0, 0, 7); c.stroke();
      c.strokeStyle = '#ffd43b'; c.lineWidth = 3; c.beginPath(); c.ellipse(cx, fy, 14.5 * pulse, 5.8 * pulse, 0, 0, 7); c.stroke();
    }
    c.fillStyle = 'rgba(20,10,60,.28)'; c.beginPath(); c.ellipse(cx, fy, 10, 3.6, 0, 0, 7); c.fill();
    if (im.complete && im.naturalWidth) c.drawImage(im, cx - w / 2, fy - h + bob, w, h);
    else { c.fillStyle = '#6c6f7a'; c.beginPath(); c.arc(cx, fy - 22, 10, 0, 7); c.fill(); }
  }

  /* ---------- minimap ---------- */
  function buildMinimap(){
    var mm = document.createElement('canvas'); mm.width = W; mm.height = H; var m = mm.getContext('2d'), img = m.createImageData(W, H);
    var DCOL = [null, [47, 158, 68], [43, 122, 75], [138, 144, 154], null, null, [124, 86, 48]];
    for (var i = 0; i < W * H; i++){
      var col = hex(GCOL[ground[i]]), d = DCOL[deco[i]]; if (d) col = d; if (ground[i] === G_PATH) col = hex('#d1b074');
      img.data[i * 4] = col[0]; img.data[i * 4 + 1] = col[1]; img.data[i * 4 + 2] = col[2]; img.data[i * 4 + 3] = 255;
    }
    m.putImageData(img, 0, 0); miniBase = mm;
  }
  function paintMini(c2, scale, big){
    var c = c2.getContext('2d'); c.imageSmoothingEnabled = false; c.clearRect(0, 0, c2.width, c2.height);
    c.drawImage(miniBase, 0, 0, W * scale, H * scale);
    buildings.forEach(function(b){ c.fillStyle = won(b.gym) ? '#ffcf33' : (o.hasBank(b.gym) ? 'hsl(' + o.gymHue(b.gym) + ',65%,45%)' : '#9a9db0'); c.fillRect(b.x * scale, b.y * scale, 4 * scale, 3 * scale); });
    if (lockY >= 0){ c.fillStyle = 'rgba(30,30,60,.32)'; c.fillRect(0, lockY * scale, W * scale, (H - lockY) * scale); }
    if (big){
      c.textAlign = 'center'; c.lineWidth = scale * 0.8; c.strokeStyle = '#fff'; c.fillStyle = '#2E2C3F';
      c.font = '900 ' + (scale * 2.6) + 'px Nunito,system-ui,sans-serif';
      bands.forEach(function(b){ var lab = (LV[b.L] + ' zone').toUpperCase() + (b.L > o.level ? ' 🔒' : ''); c.strokeText(lab, (X0 + COLS * CW / 2) * scale, (b.start + 2.3) * scale); c.fillText(lab, (X0 + COLS * CW / 2) * scale, (b.start + 2.3) * scale); });
      c.font = '800 ' + (scale * 1.5) + 'px Nunito,system-ui,sans-serif';
      townRects.forEach(function(tr){ var t = tr.town, d = t.gyms.filter(won).length, nm = t.name.length > 24 ? t.name.slice(0, 23) + '…' : t.name, lab = (tr.locked ? '🔒 ' : '') + nm + ' ' + d + '/' + t.gyms.length; c.strokeText(lab, (tr.x0 + 14) * scale, (tr.y0 + 10) * scale); c.fillText(lab, (tr.x0 + 14) * scale, (tr.y0 + 10) * scale); });
    }
    var px = (P.x + (P.tx - P.x) * P.t + 0.5) * scale, py = (P.y + (P.ty - P.y) * P.t + 0.5) * scale;
    c.fillStyle = '#e03131'; c.strokeStyle = '#fff'; c.lineWidth = Math.max(1, scale * 0.5); c.beginPath(); c.arc(px, py, Math.max(2.4, scale * 1.4), 0, 7); c.fill(); c.stroke();
  }

  /* ---------- drawing ---------- */
  function isPath(x, y){ return inb(x, y) && ground[idx(x, y)] === G_PATH; }
  function isWater(x, y){ return inb(x, y) && ground[idx(x, y)] === G_WATER; }
  function dot(c, x, y, r, fill, line){ c.beginPath(); c.arc(x, y, r, 0, 7); c.fillStyle = fill; c.fill(); if (line){ c.strokeStyle = line; c.lineWidth = 2; c.stroke(); } }
  function blob(c, x, y, rx, ry, fill, line){ c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, 7); c.fillStyle = fill; c.fill(); if (line){ c.strokeStyle = line; c.lineWidth = 2; c.stroke(); } }
  function drawGround(c, x, y){
    var i = idx(x, y), g = ground[i], px = x * T, py = y * T, v = hh(x, y, 3), S = T + 0.7, chk = (x + y) & 1;
    if (g === G_WATER){
      c.fillStyle = chk ? '#2fb2f0' : '#35bcf5'; c.fillRect(px, py, S, S);
      var off = Math.sin((now / 700 + x * 0.7 + y * 0.45) % 6.28) * 3;
      c.fillStyle = 'rgba(255,255,255,.38)'; c.fillRect(px + 4 + off, py + 8, 12, 2); c.fillRect(px + 14 - off, py + 22, 10, 2);
      if (v < 0.14){ c.fillStyle = 'rgba(255,255,255,' + (0.25 + (Math.sin(now / 300 + x * 3 + y) + 1) * 0.25).toFixed(2) + ')'; c.fillRect(px + 20, py + 6, 3, 3); }
      c.fillStyle = 'rgba(255,255,255,.75)';   // foam where the water meets land
      if (inb(x, y - 1) && !isWater(x, y - 1)) c.fillRect(px, py, S, 3);
      if (inb(x, y + 1) && !isWater(x, y + 1)) c.fillRect(px, py + T - 3, S, 3.7);
      if (inb(x - 1, y) && !isWater(x - 1, y)) c.fillRect(px, py, 3, S);
      if (inb(x + 1, y) && !isWater(x + 1, y)) c.fillRect(px + T - 3, py, 3.7, S);
      return;
    }
    if (g === G_PATH){
      c.fillStyle = chk ? '#ecd49a' : '#e6cc8e'; c.fillRect(px, py, S, S);
      c.fillStyle = '#c9a766';
      if (!isPath(x, y - 1)) c.fillRect(px, py, S, 3);
      if (!isPath(x, y + 1)) c.fillRect(px, py + T - 3, S, 3.7);
      if (!isPath(x - 1, y)) c.fillRect(px, py, 3, S);
      if (!isPath(x + 1, y)) c.fillRect(px + T - 3, py, 3.7, S);
      c.fillStyle = '#f8e9c0'; c.fillRect(px + 5 + (v * 16 | 0), py + 6 + ((hh(x, y, 4) * 14) | 0), 4, 3); c.fillRect(px + 8 + ((hh(x, y, 5) * 14) | 0), py + 15 + ((hh(x, y, 6) * 10) | 0), 3, 3);
      c.fillStyle = '#d2b373'; c.fillRect(px + 14 + ((hh(x, y, 13) * 10) | 0), py + 4 + ((hh(x, y, 14) * 20) | 0), 3, 2);
      return;
    }
    c.fillStyle = chk ? GALT[g] : GCOL[g]; c.fillRect(px, py, S, S);
    if (v < 0.5){
      c.fillStyle = g === G_SAND ? '#e6d296' : theme.blades;
      c.fillRect(px + ((hh(x, y, 8) * 24) | 0), py + ((hh(x, y, 9) * 24) | 0), 3, 5);
      c.fillRect(px + ((hh(x, y, 10) * 24) | 0), py + ((hh(x, y, 12) * 24) | 0), 3, 4);
    }
  }
  function drawDeco(c, x, y, d){
    var px = x * T, py = y * T, v = hh(x, y, 21);
    if (d === D_TREE){
      blob(c, px + 16, py + 29, 12, 4.2, 'rgba(20,10,60,.22)');
      c.fillStyle = '#7a4d2b'; c.fillRect(px + 13, py + 18, 6, 11); c.strokeStyle = INK; c.lineWidth = 1.6; c.strokeRect(px + 13, py + 18, 6, 11);
      dot(c, px + 16, py + 12, 14.5, '#2a9a45', '#14502a'); dot(c, px + 13, py + 10, 10.5, '#3fbd5c'); dot(c, px + 10.5, py + 6.5, 4.2, '#8af099');
      if (v < 0.15){ dot(c, px + 21, py + 15, 2.4, '#ff6b6b'); dot(c, px + 11, py + 17, 2.4, '#ff6b6b'); }
    } else if (d === D_PINE){
      blob(c, px + 16, py + 30, 10, 3.4, 'rgba(20,10,60,.22)');
      c.fillStyle = '#6a4326'; c.fillRect(px + 14, py + 24, 4, 7); c.strokeStyle = INK; c.lineWidth = 1.5; c.strokeRect(px + 14, py + 24, 4, 7);
      for (var k = 0; k < 3; k++){
        var tip = py - 6 + k * 8, bw = 12 + k * 1.5;
        c.beginPath(); c.moveTo(px + 16, tip); c.lineTo(px + 16 + bw, py + 12 + k * 6); c.lineTo(px + 16 - bw, py + 12 + k * 6); c.closePath();
        c.fillStyle = k % 2 ? '#2f9a5c' : '#25804c'; c.fill(); c.strokeStyle = '#124a34'; c.lineWidth = 1.8; c.lineJoin = 'round'; c.stroke();
        c.beginPath(); c.moveTo(px + 16, tip + 2); c.lineTo(px + 16 - bw * 0.45, py + 9 + k * 6); c.lineTo(px + 16 - bw * 0.1, py + 9 + k * 6); c.closePath(); c.fillStyle = 'rgba(255,255,255,.2)'; c.fill();
        if (theme.snow){ c.fillStyle = '#fff'; c.beginPath(); c.moveTo(px + 16, tip); c.lineTo(px + 22.5, tip + 9); c.lineTo(px + 9.5, tip + 9); c.closePath(); c.fill(); }
      }
    } else if (d === D_ROCK){
      blob(c, px + 16, py + 27, 13, 4.2, 'rgba(20,10,60,.22)');
      blob(c, px + 16, py + 20, 13.5, 10, '#9aa2b0', '#3d4260'); blob(c, px + 12, py + 16.5, 6.4, 4.2, '#cdd3de');
    } else if (d === D_FLOWER){
      var cols = ['#ff6b9d', '#ffd43b', '#ffffff', '#b197fc'], cc = cols[(v * 4) | 0];
      [[10, 20], [22, 13]].forEach(function(p, n){
        c.fillStyle = '#2f9a3a'; c.fillRect(px + p[0] - 1, py + p[1], 2, 8);
        for (var a = 0; a < 5; a++){ var an = a * 1.2566 + n; dot(c, px + p[0] + Math.cos(an) * 3.3, py + p[1] + Math.sin(an) * 3.3, 2.5, n ? cc : '#fff', 'rgba(36,29,59,.5)'); }
        dot(c, px + p[0], py + p[1], 2.2, '#ffe066');
      });
    } else if (d === D_BUSH){
      blob(c, px + 16, py + 26, 12, 3.6, 'rgba(20,10,60,.2)'); blob(c, px + 16, py + 21, 12.5, 8.5, '#2f9e44', '#14502a'); blob(c, px + 12, py + 18, 6.5, 4.4, '#58d46f');
      dot(c, px + 22, py + 21, 2, '#ff7ab0'); dot(c, px + 10, py + 24, 2, '#ffd43b');
    } else if (d === D_FENCE){
      c.fillStyle = '#b3884f'; c.fillRect(px, py + 12, T, 4.5); c.fillRect(px, py + 21, T, 4.5);
      c.strokeStyle = INK; c.lineWidth = 1.4; c.strokeRect(px, py + 12, T, 4.5); c.strokeRect(px, py + 21, T, 4.5);
      c.fillStyle = '#8a5f2d'; c.fillRect(px + 3, py + 6, 6, 22); c.fillRect(px + T - 9, py + 6, 6, 22); c.strokeRect(px + 3, py + 6, 6, 22); c.strokeRect(px + T - 9, py + 6, 6, 22);
      c.fillStyle = GOLDC; c.fillRect(px + 4.5, py + 7.5, 3, 3); c.fillRect(px + T - 7.5, py + 7.5, 3, 3);
    }
  }
  function drawBuilding(c, b){
    var px = b.x * T, py = b.y * T, w = b.w * T, h = b.h * T, hue = o.gymHue(b.gym), live = o.hasBank(b.gym), done = won(b.gym);
    var sat = live ? 72 : 10, lt = live ? (done ? 40 : 50) : 66, cx = px + w / 2;
    blob(c, cx + 3, py + h - 1, w / 2 + 9, 8, 'rgba(20,10,60,.3)');
    // walls
    c.fillStyle = 'hsl(' + hue + ',' + (live ? 38 : 6) + '%,95%)'; rr(c, px + 2, py + 32, w - 4, h - 32, 5); c.fill(); c.strokeStyle = INK; c.lineWidth = 2.4; c.stroke();
    c.fillStyle = 'hsl(' + hue + ',' + (live ? 30 : 6) + '%,80%)'; c.fillRect(px + 4, py + h - 9, w - 8, 7);
    // roof
    var gr = c.createLinearGradient(0, py - 8, 0, py + 38); gr.addColorStop(0, 'hsl(' + hue + ',' + sat + '%,' + (lt + 14) + '%)'); gr.addColorStop(1, 'hsl(' + hue + ',' + sat + '%,' + (lt - 8) + '%)');
    c.beginPath(); c.moveTo(px - 9, py + 37); c.lineTo(cx, py - 9); c.lineTo(px + w + 9, py + 37); c.closePath(); c.fillStyle = gr; c.fill(); c.strokeStyle = INK; c.lineWidth = 2.6; c.lineJoin = 'round'; c.stroke();
    c.beginPath(); c.moveTo(cx - 3, py - 5); c.lineTo(px + 6, py + 30); c.lineTo(px + 12, py + 28); c.lineTo(cx - 1, py - 1); c.closePath(); c.fillStyle = 'rgba(255,255,255,.22)'; c.fill();
    c.fillStyle = 'hsl(' + hue + ',' + sat + '%,' + (live ? 30 : 48) + '%)'; rr(c, px - 9, py + 34, w + 18, 6, 3); c.fill(); c.strokeStyle = INK; c.lineWidth = 2; c.stroke();
    dot(c, cx, py - 9, 3.6, GOLDC, INK);
    // gym name on the roof
    c.font = '800 9.5px "Baloo 2",Nunito,system-ui,sans-serif'; c.textAlign = 'center';
    if (!b.label) b.label = fitText(c, b.gym.name, w - 26);
    c.lineWidth = 3; c.strokeStyle = 'rgba(36,29,59,.85)'; c.lineJoin = 'round'; c.strokeText(b.label, cx, py + 28); c.fillStyle = '#fff'; c.fillText(b.label, cx, py + 28);
    // windows glow warm when the gym is open
    [px + 9, px + w - 25].forEach(function(wx){
      var wg = c.createLinearGradient(0, py + 46, 0, py + 62); wg.addColorStop(0, live ? '#fff2b0' : '#e3f1fb'); wg.addColorStop(1, live ? '#ffc65a' : '#b7d6ee');
      rr(c, wx, py + 46, 16, 16, 4); c.fillStyle = wg; c.fill(); c.strokeStyle = INK; c.lineWidth = 2; c.stroke();
      c.beginPath(); c.moveTo(wx + 8, py + 46); c.lineTo(wx + 8, py + 62); c.moveTo(wx, py + 54); c.lineTo(wx + 16, py + 54); c.lineWidth = 1.4; c.stroke();
    });
    // arched door with a gold knob
    var dx = px + T + 3, dw = T - 6; c.beginPath(); c.moveTo(dx, py + h); c.lineTo(dx, py + 62); c.arc(dx + dw / 2, py + 62, dw / 2, Math.PI, 0); c.lineTo(dx + dw, py + h); c.closePath(); c.fillStyle = '#85542c'; c.fill(); c.strokeStyle = INK; c.lineWidth = 2.2; c.stroke();
    c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(dx + 3, py + 62, 4, h - 64); dot(c, dx + dw - 5, py + 80, 2.2, GOLDC, INK);
    if (done){
      var glow = c.createRadialGradient(cx, py - 14, 2, cx, py - 14, 24); glow.addColorStop(0, 'rgba(255,214,70,.75)'); glow.addColorStop(1, 'rgba(255,214,70,0)'); c.fillStyle = glow; c.fillRect(cx - 26, py - 40, 52, 52);
      c.fillStyle = GOLDC; star(c, cx, py - 15, 10);
    } else if (!live){ c.font = '15px sans-serif'; c.fillText('🚧', px + w - 14, py + h - 8); }
  }
  function parchment(c, x, y, w, h, r){
    c.fillStyle = 'rgba(20,10,60,.28)'; rr(c, x + 2, y + 5, w, h, r); c.fill();
    var g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#fff8d8'); g.addColorStop(1, '#ffe9a4');
    c.fillStyle = g; rr(c, x, y, w, h, r); c.fill(); c.strokeStyle = INK; c.lineWidth = 3; c.stroke();
    c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 1.5; rr(c, x + 3, y + 3, w - 6, h - 6, r - 2); c.stroke();
    dot(c, x + 7, y + 7, 2, GOLDC, INK); dot(c, x + w - 7, y + 7, 2, GOLDC, INK);
  }
  function drawPlaque(c, tr){
    var t = tr.town, label = (tr.locked ? '🔒 ' : '') + 'Town of ' + t.name, sub = LV[t.level] + ' · Chapter ' + t.chNo + ' · 🏅 ' + t.gyms.filter(won).length + '/' + t.gyms.length;
    c.font = '800 14px "Baloo 2",Nunito,system-ui,sans-serif'; var w = Math.min(28 * T - 8, Math.max(c.measureText(label).width, 150) + 40), x = (tr.x0 + 14) * T - w / 2, y = tr.y0 * T + 2;
    parchment(c, x, y, w, 42, 11);
    c.textAlign = 'center'; c.fillStyle = INK; c.fillText(fitText(c, label, w - 18), x + w / 2, y + 19);
    c.font = '800 10px Nunito,system-ui,sans-serif'; c.fillStyle = '#7a5a1e'; c.fillText(sub, x + w / 2, y + 34);
  }
  function drawSign(c, cx, y, text, sub){
    c.font = '800 10.5px Nunito,system-ui,sans-serif'; var sw = c.measureText(sub).width;
    c.font = '800 15px "Baloo 2",Nunito,system-ui,sans-serif'; var w = Math.max(c.measureText(text).width, sw, 120) + 34, x = cx - w / 2;
    parchment(c, x, y, w, 44, 11);
    c.textAlign = 'center'; c.fillStyle = INK; c.fillText(text, cx, y + 20); c.font = '800 10.5px Nunito,system-ui,sans-serif'; c.fillStyle = '#7a5a1e'; c.fillText(sub, cx, y + 35);
  }
  function drawGate(c, g){
    var px = MX * T, py = g.y * T, w = 2 * T;
    blob(c, px + w / 2, py + 30, w / 2 + 12, 6, 'rgba(20,10,60,.25)');
    [px - 9, px + w - 1].forEach(function(x){ c.fillStyle = '#7a4b2a'; rr(c, x, py - 28, 11, 62, 3); c.fill(); c.strokeStyle = INK; c.lineWidth = 2.2; c.stroke(); dot(c, x + 5.5, py - 30, 5, GOLDC, INK); });
    c.fillStyle = '#9a6836'; rr(c, px - 11, py - 36, w + 22, 11, 4); c.fill(); c.strokeStyle = INK; c.lineWidth = 2.2; c.stroke(); c.fillStyle = GOLDC; c.fillRect(px - 8, py - 33, w + 16, 2.4);
    if (!g.open){
      c.fillStyle = '#b3884f'; for (var k = 0; k < 3; k++){ c.fillRect(px + 2, py - 14 + k * 15, w - 4, 6); c.strokeStyle = INK; c.lineWidth = 1.6; c.strokeRect(px + 2, py - 14 + k * 15, w - 4, 6); }
    }
    var lab = LV[g.L] + ' zone', bw = 98, bx = px + w / 2 - bw / 2, by = py - 66;
    c.fillStyle = 'rgba(20,10,60,.28)'; rr(c, bx + 2, by + 3, bw, 26, 9); c.fill();
    var bg = c.createLinearGradient(0, by, 0, by + 26); if (g.open){ bg.addColorStop(0, '#a6f2a0'); bg.addColorStop(1, '#4cc766'); } else { bg.addColorStop(0, '#ffe08a'); bg.addColorStop(1, '#ffa83a'); }
    c.fillStyle = bg; rr(c, bx, by, bw, 26, 9); c.fill(); c.strokeStyle = INK; c.lineWidth = 2.6; c.stroke();
    c.font = '800 13px "Baloo 2",Nunito,system-ui,sans-serif'; c.textAlign = 'center'; c.fillStyle = INK; c.fillText((g.open ? '' : '🔒 ') + lab, px + w / 2, by + 18);
  }
  /* exclamation mark over an expert you can still challenge, a gold star over one you beat */
  function drawMark(c, n){
    if (n.gym.town.level > o.level || !o.hasBank(n.gym)) return;
    var cx = n.x * T + T / 2, cy = n.y * T - 28 + Math.sin(now / 280 + n.x * 1.7) * 2.6;
    if (won(n.gym)){ c.fillStyle = GOLDC; star(c, cx, cy, 7.5); return; }
    dot(c, cx, cy, 7.4, GOLDC, INK); c.fillStyle = INK; c.font = '800 12px "Baloo 2",Nunito,sans-serif'; c.textAlign = 'center'; c.fillText('!', cx, cy + 4.3);
  }
  /* drifting maths symbols, drawn over the map in screen space */
  function drawFX(){
    var t = now / 1000; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (var i = 0; i < 12; i++){
      var span = vh + 90, prog = ((t * (14 + (i % 5) * 4) + i * span / 12) % span) / span, a = Math.sin(prog * Math.PI) * 0.5;
      var x = ((i * 0.083 + 0.04) * vw) + Math.sin(t * 0.7 + i * 1.9) * 16, y = vh + 40 - prog * span, size = 22 + (i % 4) * 8;
      ctx.font = '800 ' + size + 'px "Baloo 2",Nunito,sans-serif'; ctx.shadowColor = 'rgba(255,214,90,.9)'; ctx.shadowBlur = 10;
      ctx.fillStyle = 'rgba(255,255,255,' + a.toFixed(2) + ')'; ctx.fillText(FXS[(i * 5 + 3) % FXS.length], x, y);
    }
    ctx.shadowBlur = 0; ctx.textBaseline = 'alphabetic'; ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  /* ---------- player + input ---------- */
  function canWalk(x, y){ return inb(x, y) && !block[idx(x, y)] && !npcAt[idx(x, y)]; }
  function facingNpc(){ var v = DV[P.dir]; return npcAt[idx(P.x + v[0], P.y + v[1])] || null; }
  function press(dir){ var i = held.indexOf(dir); if (i >= 0) held.splice(i, 1); held.push(dir); }
  function release(dir){ var i = held.indexOf(dir); if (i >= 0) held.splice(i, 1); }
  function banner(text){ var b = el('.wbanner'); b.textContent = text; b.classList.add('on'); clearTimeout(bannerT); bannerT = setTimeout(function(){ b.classList.remove('on'); }, 2400); }
  function bump(nx, ny){
    var n = npcAt[idx(nx, ny)]; if (n){ if (bumpArmed){ bumpArmed = false; talk(n.gym); } return; }
    var g = gateAt(nx, ny); if (g && !g.open && bumpArmed){ bumpArmed = false; banner('🔒 The ' + LV[g.L] + ' zone opens at ' + LV[g.L]); }
  }
  function talk(gym){ held = []; mode = 'dialog'; o.onTalk(gym); }
  function townAtTile(x, y){ for (var i = 0; i < townRects.length; i++){ var r = townRects[i]; if (x >= r.cx0 && x < r.cx0 + r.w && y >= r.y0 && y < r.y0 + r.h) return r; } return null; }
  function zoneAt(y){ var z = bands[0]; for (var i = 0; i < bands.length; i++) if (bands[i].start <= y) z = bands[i]; return z; }
  function updateLoc(announce){
    var z = zoneAt(P.y), tr = townAtTile(P.x, P.y), key = z.L + '|' + (tr ? tr.town.id : '');
    el('.wloc').innerHTML = '📍 ' + esc(o.name) + '<small>' + esc(LV[z.L]) + ' zone · ' + (tr ? 'Town of ' + esc(tr.town.name) : 'On the road') + '</small>';
    if (key !== lastPlace){
      var was = lastPlace.split('|')[0]; lastPlace = key;
      if (announce) banner(String(z.L) !== was ? '🗺️ ' + LV[z.L] + ' zone' : (tr ? '🏘️ Town of ' + tr.town.name : '🛤️ On the road'));
    }
  }
  function refreshHud(){
    var got = 0, tot = 0; cont.towns.forEach(function(t){ t.gyms.forEach(function(g){ tot++; if (won(g)) got++; }); });
    el('.wbadges').textContent = '🏅 ' + got + ' / ' + tot + ' badges'; updateLoc(false);
  }
  function savePos(){ clearTimeout(saveT); saveT = setTimeout(function(){ if (o.onPos) o.onPos({x: P.x, y: P.y}); }, 400); }
  function update(dt){
    if (P.moving){
      P.t += dt / STEP_MS;
      if (P.t >= 1){ P.x = P.tx; P.y = P.ty; P.t = 0; P.moving = false; savePos(); updateLoc(true); }
    }
    if (!P.moving){
      var dir = held.length ? held[held.length - 1] : null;
      if (!dir) bumpArmed = true;
      else {
        P.dir = dir; var v = DV[dir], nx = P.x + v[0], ny = P.y + v[1];
        if (canWalk(nx, ny)){ P.tx = nx; P.ty = ny; P.t = 0; P.moving = true; P.step++; }
        else bump(nx, ny);
      }
    }
  }

  /* ---------- render ---------- */
  function resize(){
    var r = host.getBoundingClientRect(); if (!r.width) return;
    vw = r.width; vh = r.height; dpr = window.devicePixelRatio || 1;
    cv.width = Math.round(vw * dpr); cv.height = Math.round(vh * dpr);
    var vis = Math.max(10, Math.min(22, Math.round(vw / 46))); sc = vw / (vis * T);
  }
  function drawBubble(c, cx, bottom, text){
    c.font = '800 11px Nunito,system-ui,sans-serif'; c.textAlign = 'center';
    var words = String(text).split(' '), lines = [], cur = '';
    words.forEach(function(w){ var t = cur ? cur + ' ' + w : w; if (c.measureText(t).width > 128 && cur){ lines.push(cur); cur = w; } else cur = t; });
    if (cur) lines.push(cur);
    lines = lines.slice(0, 3);
    var lw = 0; lines.forEach(function(l){ lw = Math.max(lw, c.measureText(l).width); });
    var w = lw + 18, h = lines.length * 13 + 11, x = cx - w / 2, y = bottom - h - 8;
    c.fillStyle = 'rgba(0,0,0,.18)'; rr(c, x + 2, y + 3, w, h, 10); c.fill();
    c.fillStyle = '#fff'; c.strokeStyle = '#2E2C3F'; c.lineWidth = 2; rr(c, x, y, w, h, 10); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(cx - 6, y + h - 1); c.lineTo(cx, bottom); c.lineTo(cx + 6, y + h - 1); c.closePath(); c.fillStyle = '#fff'; c.fill();
    c.beginPath(); c.moveTo(cx - 6, y + h); c.lineTo(cx, bottom); c.lineTo(cx + 6, y + h); c.strokeStyle = '#2E2C3F'; c.stroke();
    c.fillStyle = '#fff'; c.fillRect(cx - 5, y + h - 1.5, 10, 3);
    c.fillStyle = '#2E2C3F'; lines.forEach(function(l, i){ c.fillText(l, cx, y + 15 + i * 13); });
  }
  /* the experts nearest the player (up to two) speak; their line changes every few seconds */
  function chatter(x0, x1, y0, y1){
    if (!o.say) return;
    var near = [];
    npcs.forEach(function(n){
      if (n.gym.town.level > o.level || n.x < x0 || n.x > x1 || n.y < y0 || n.y > y1) return;
      var d = Math.abs(n.x - P.x) + Math.abs(n.y - P.y); if (d <= 6) near.push({n: n, d: d});
    });
    near.sort(function(a, b){ return a.d - b.d; });
    near.slice(0, 2).forEach(function(e){
      var n = e.n, salt = Math.floor((now + n.x * 613 + n.y * 211) / 7000);
      drawBubble(ctx, n.x * T + T / 2, n.y * T - 18, o.say(n.gym, salt));
    });
  }
  function render(){
    if (!vw) return;
    var px = (P.x + (P.tx - P.x) * P.t) * T, py = (P.y + (P.ty - P.y) * P.t) * T;
    var camX = Math.max(0, Math.min(W * T - vw / sc, px + T / 2 - vw / sc / 2)), camY = Math.max(0, Math.min(H * T - vh / sc, py + T / 2 - vh / sc / 2));
    ctx.setTransform(dpr * sc, 0, 0, dpr * sc, -Math.round(camX * sc * dpr), -Math.round(camY * sc * dpr)); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    var x0 = Math.max(0, Math.floor(camX / T) - 1), x1 = Math.min(W - 1, Math.ceil((camX + vw / sc) / T) + 1), y0 = Math.max(0, Math.floor(camY / T) - 3), y1 = Math.min(H - 1, Math.ceil((camY + vh / sc) / T) + 2);
    var x, y;
    for (y = y0; y <= y1; y++) for (x = x0; x <= x1; x++) drawGround(ctx, x, y);
    townRects.forEach(function(tr){ if (tr.x0 + 28 >= x0 && tr.x0 <= x1 && tr.y0 + 2 >= y0 && tr.y0 <= y1) drawPlaque(ctx, tr); });
    if (y0 <= RING + 3) drawSign(ctx, (MX + 7) * T, (RING + 1) * T, 'Welcome to ' + o.name, 'Walk to a gym door and talk to its expert');
    var items = [];
    for (y = y0; y <= y1 + 1; y++) for (x = x0; x <= x1; x++){ if (y < H){ var d = deco[idx(x, y)]; if (d) items.push({k: y + (d === D_FLOWER ? -1 : 0.5), f: drawDeco.bind(null, ctx, x, y, d)}); } }
    buildings.forEach(function(b){ if (b.x + 4 >= x0 && b.x <= x1 && b.y + 3 >= y0 - 2 && b.y <= y1) items.push({k: b.y + 3, f: drawBuilding.bind(null, ctx, b)}); });
    npcs.forEach(function(n){ if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1) items.push({k: n.y + 0.9, f: function(){
      drawPerson(ctx, n.x * T, n.y * T, n.cfg, 0, false); drawMark(ctx, n);
    }}); });
    items.push({k: py / T + 0.9, f: function(){ drawPerson(ctx, px, py, o.char, P.moving ? P.step : 0, true); }});
    items.sort(function(a, b){ return a.k - b.k; }).forEach(function(it){ it.f(); });
    if (lockY >= 0){ ctx.fillStyle = 'rgba(30,30,60,.30)'; ctx.fillRect(0, lockY * T, W * T, (H - lockY) * T); }
    gates.forEach(function(g){ if (g.y + 3 >= y0 && g.y - 3 <= y1) drawGate(ctx, g); });
    if (mode === 'world' || mode === 'overview') chatter(x0, x1, y0, y1);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (!reduceMotion) drawFX();
    var near = null;
    for (var bi = 0; bi < buildings.length; bi++){ var b = buildings[bi]; if (Math.abs(P.x - (b.x + 1)) <= 2 && P.y >= b.y + 3 && P.y <= b.y + 5){ near = b.gym; break; } }
    var nid = near ? near.id + (won(near) ? 'w' : '') : '';
    if (nid !== nearId){
      nearId = nid; var chip = el('.wnear');
      if (near){ var ex = o.expertFor(near); chip.innerHTML = esc(near.name) + '<small>' + esc(ex.name) + (won(near) ? ' · 🏅 badge earned' : (o.hasBank(near) ? ' · student expert' : ' · 🚧 coming soon')) + '</small>'; chip.hidden = false; } else chip.hidden = true;
    }
    paintMini(el('.wmm canvas'), 1, false);
  }
  function frame(ts){
    if (dead) return; raf = requestAnimationFrame(frame);
    now = ts; var dt = Math.min(60, ts - (lastTs || ts)); lastTs = ts;
    if (mode === 'world') update(dt);
    render();
  }

  /* ---------- DOM ---------- */
  function el(sel){ return host.querySelector(sel); }
  function mount(){
    var touch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    host.classList.toggle('touch', touch);
    host.innerHTML = '<canvas class="wcv" aria-label="Map of ' + esc(o.name) + '. Walk with the arrow keys or W A S D."></canvas><div class="wvig"></div><div class="wchip wloc"></div><div class="wchip wbadges"></div>' +
      '<div class="wmm" title="Open the continent map (M)"><canvas width="' + W + '" height="' + H + '"></canvas><small>🗺️ Map (M)</small></div><div class="wbanner" role="status"></div><div class="wchip wnear" hidden></div>' +
      '<div class="whint">Move: arrow keys / WASD · Talk to an expert: walk into them or press Space</div>' +
      '<div class="wpad" aria-hidden="true"><button class="u" data-d="up">▲</button><button class="l" data-d="left">◀</button><button class="r" data-d="right">▶</button><button class="d" data-d="down">▼</button></div><button class="wa" aria-label="Talk">A</button>' +
      '<div class="wov" hidden><canvas></canvas><div class="wovtxt">Tap a town to travel there. Locked towns need a higher level.</div><button class="btn primary" data-act="ovclose">Close map</button></div><div class="wdlg" hidden></div>';
    cv = el('.wcv'); ctx = cv.getContext('2d');
    el('.wmm').addEventListener('click', openOverview);
    el('[data-act=ovclose]').addEventListener('click', closeOverview);
    el('.wov canvas').addEventListener('click', function(e){ travelFromOverview(e); });
    el('.wa').addEventListener('click', function(){ if (mode === 'world'){ var n = facingNpc(); if (n) talk(n.gym); } });
    Array.prototype.forEach.call(host.querySelectorAll('.wpad button'), function(b){
      b.addEventListener('pointerdown', function(e){ e.preventDefault(); press(b.dataset.d); b.classList.add('on'); });
      ['pointerup', 'pointercancel', 'pointerleave'].forEach(function(ev){ b.addEventListener(ev, function(){ release(b.dataset.d); b.classList.remove('on'); }); });
    });
    var w = el('.wmm canvas'); w.width = W; w.height = H;
  }
  function openOverview(){ if (mode !== 'world') return; mode = 'overview'; held = []; var ov = el('.wov'), c = ov.querySelector('canvas'); c.width = W * 5; c.height = H * 5; paintMini(c, 5, true); ov.hidden = false; }
  function closeOverview(){ el('.wov').hidden = true; mode = 'world'; }
  function travelFromOverview(e){
    var c = e.currentTarget, r = c.getBoundingClientRect(), tx = Math.floor((e.clientX - r.left) / r.width * W), ty = Math.floor((e.clientY - r.top) / r.height * H), tr = townAtTile(tx, ty);
    if (!tr) return;
    if (tr.locked){ el('.wovtxt').textContent = '🔒 That town opens at ' + LV[tr.town.level] + '.'; return; }
    toTown(tr); closeOverview();
  }
  function toTown(tr){
    var b = buildings.filter(function(bb){ return bb.gym.town === tr.town; })[0];
    P.x = P.tx = b ? b.x + 1 + 2 : tr.x0 + 14; P.y = P.ty = b ? b.y + 4 : tr.y0 + 6; P.t = 0; P.moving = false; P.dir = 'down'; held = [];
    if (!canWalk(P.x, P.y)){ P.x = P.tx = spawn.x; P.y = P.ty = spawn.y; }
    savePos(); updateLoc(true);
  }
  function onKeyDown(e){
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var tag = (e.target && e.target.tagName) || ''; if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (mode === 'overview'){ if (e.key === 'Escape' || e.key === 'm' || e.key === 'M'){ e.preventDefault(); closeOverview(); } return; }
    if (mode === 'dialog'){ if (e.key === 'Escape') api.closeDialog(); return; }
    var dir = KEYDIR[e.key];
    if (dir){ e.preventDefault(); press(dir); return; }
    if (e.key === ' ' || e.key === 'Enter'){ var n = facingNpc(); if (n){ e.preventDefault(); talk(n.gym); } }
    else if (e.key === 'm' || e.key === 'M') openOverview();
  }
  function onKeyUp(e){ var dir = KEYDIR[e.key]; if (dir) release(dir); }
  function onBlur(){ held = []; }

  /* ---------- api ---------- */
  var api = {
    dialog: function(html){ var d = el('.wdlg'); mode = 'dialog'; held = []; d.innerHTML = html; d.hidden = false; return d; },
    closeDialog: function(){ var d = el('.wdlg'); d.hidden = true; d.innerHTML = ''; mode = 'world'; },
    refresh: function(){ refreshHud(); },
    focusGym: function(id){
      for (var i = 0; i < npcs.length; i++) if (npcs[i].gym.id === id){ P.x = P.tx = npcs[i].x; P.y = P.ty = npcs[i].y + 1; P.dir = 'up'; P.t = 0; P.moving = false; savePos(); updateLoc(false); return true; }
      return false;
    },
    destroy: function(){ dead = true; cancelAnimationFrame(raf); clearTimeout(saveT); clearTimeout(bannerT); document.removeEventListener('keydown', onKeyDown); document.removeEventListener('keyup', onKeyUp); window.removeEventListener('blur', onBlur); window.removeEventListener('resize', resize); if (ro) ro.disconnect(); host.innerHTML = ''; },
    /* test hooks: instant walking, e.g. sim('rrrddd'); state() */
    sim: function(path){ String(path).split('').forEach(function(ch){ var dir = {u: 'up', d: 'down', l: 'left', r: 'right'}[ch]; if (!dir) return; P.dir = dir; var v = DV[dir], nx = P.x + v[0], ny = P.y + v[1]; if (canWalk(nx, ny)){ P.x = P.tx = nx; P.y = P.ty = ny; P.t = 0; P.moving = false; } else { bumpArmed = true; bump(nx, ny); } }); savePos(); updateLoc(true); },
    teleport: function(x, y){ P.x = P.tx = x; P.y = P.ty = y; P.t = 0; P.moving = false; updateLoc(false); },
    state: function(){ return {x: P.x, y: P.y, mode: mode, W: W, H: H, towns: townRects.map(function(t){ return {id: t.town.id, x: t.x0, y: t.y0, locked: t.locked}; }), gates: gates, npcs: npcs.map(function(n){ return {id: n.gym.id, x: n.x, y: n.y}; }), spawn: spawn}; }
  };

  build(); mount();
  var sp = o.pos && canWalk(o.pos.x, o.pos.y) && !(lockY >= 0 && o.pos.y >= lockY) ? o.pos : spawn;
  P.x = P.tx = sp.x; P.y = P.ty = sp.y;
  if (o.focus) api.focusGym(o.focus);
  resize(); refreshHud(); updateLoc(false);
  document.addEventListener('keydown', onKeyDown); document.addEventListener('keyup', onKeyUp); window.addEventListener('blur', onBlur); window.addEventListener('resize', resize);
  if (window.ResizeObserver){ ro = new ResizeObserver(resize); ro.observe(host); }
  raf = requestAnimationFrame(frame);
  return api;
}

window.GQWorld = {create: create};
})();
