/* Gym Quest character art. Everything is drawn as SVG in code (no image files).
   cfg = {sex:'M'|'F', outfit:0|1|2, hair:0-9, acc:-1|0-9, skin:0-4, hairc:0-6}
   Students can only change the head/face (hair, accessory, skin tone, hair colour) and pick one of 3 outfits. */
(function(){
'use strict';
var SKIN = ['#fde0c8', '#f3c9a0', '#d9a272', '#a8714a', '#6f4529'];
var HAIRC = ['#2b2230', '#5a3a22', '#8a5a2b', '#c8902c', '#b0412e', '#6c6f7a', '#2f6fed'];
var OUTFITS = ['Full school uniform', 'Half school uniform', 'PE uniform'];
var HAIR_NAMES = {
  M: ['Short crop', 'Side part', 'Buzz cut', 'Spiky', 'Curly top', 'Quiff', 'Messy', 'Long fringe', 'Puff', 'Bowl cut'],
  F: ['Ponytail', 'Twin tails', 'Bob', 'Long straight', 'Side braid', 'Top bun', 'Pixie', 'Side ponytail', 'Curly long', 'Half-up knot']
};
var ACC_NAMES = {
  M: ['Round glasses', 'Square glasses', 'Sunglasses', 'Sweatband', 'Baseball cap', 'Beanie', 'Headphones', 'Cheek plaster', 'Freckles', 'Star sticker'],
  F: ['Hair bow', 'Alice band', 'Hair clips', 'Round glasses', 'Cat-eye glasses', 'Flower', 'Headphones', 'Earrings', 'Heart blush', 'Star clip']
};

function shade(hex, amt){ // darken (amt<0) or lighten (amt>0)
  var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  function c(v){ return Math.max(0, Math.min(255, Math.round(v + amt * 255))); }
  return '#' + ((1 << 24) + (c(r) << 16) + (c(g) << 8) + c(b)).toString(16).slice(1);
}
function circ(x, y, r, f, extra){ return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + f + '"' + (extra || '') + '/>'; }
function ell(x, y, rx, ry, f, extra){ return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" fill="' + f + '"' + (extra || '') + '/>'; }
function path(d, f, extra){ return '<path d="' + d + '" fill="' + f + '"' + (extra || '') + '/>'; }
function rect(x, y, w, h, f, rx, extra){ return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx || 0) + '" fill="' + f + '"' + (extra || '') + '/>'; }
function stroke(d, c, w){ return '<path d="' + d + '" fill="none" stroke="' + c + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"/>'; }

/* ---------- hair: returns {back, front} ---------- */
function curls(pts, r, c){ return pts.map(function(p){ return circ(p[0], p[1], r, c); }).join(''); }
function hair(sex, i, c){
  var d = shade(c, -0.12), l = shade(c, 0.14), back = '', front = '';
  var OUT = 'M33 50 C27 0 93 0 87 50';
  var CAP = OUT + ' C84 42 76 36 60 36 C44 36 36 42 33 50Z';
  if (sex === 'M') {
    if (i === 0) front = path(CAP, c) + stroke('M44 24 Q60 18 76 24', l, 2);
    else if (i === 1) front = path(OUT + ' C82 44 70 33 52 33 C42 36 37 42 33 50Z', c) + stroke('M50 20 Q56 28 52 36', d, 1.8);
    else if (i === 2) front = path('M35 46 C31 10 89 10 85 46 C82 40 74 35 60 35 C46 35 38 40 35 46Z', c, ' opacity=".88"');
    else if (i === 3) front = path('M33 50 L33 24 L42 32 L45 12 L54 28 L60 6 L66 28 L75 12 L78 32 L87 24 L87 50 C84 42 76 36 60 36 C44 36 36 42 33 50Z', c);
    else if (i === 4) front = curls([[38, 34], [48, 24], [60, 20], [72, 24], [82, 34], [34, 46], [86, 46]], 10.5, c) + circ(54, 26, 4, l);
    else if (i === 5) front = path('M33 50 C27 20 50 -6 80 6 C96 12 92 34 87 50 C84 42 76 36 60 36 C44 36 36 42 33 50Z', c) + stroke('M52 16 Q68 10 82 18', l, 2.2);
    else if (i === 6) front = path(OUT + ' L82 40 L77 48 L72 38 L66 48 L60 38 L54 48 L48 38 L42 48 L38 40Z', c);
    else if (i === 7) front = path('M32 54 C27 0 93 0 88 54 L86 62 L82 46 C72 44 48 44 38 46 L34 62Z', c);
    else if (i === 8) { back = circ(60, 38, 37, c); front = path('M33 50 C28 8 92 8 87 50 C84 44 76 38 60 38 C44 38 36 44 33 50Z', c); }
    else { back = ell(60, 44, 33, 34, c); front = path('M31 54 C26 0 94 0 89 54 L85 42 C70 34 50 34 35 42Z', c); }
  } else {
    if (i === 0) { back = path('M80 26 C110 22 112 74 94 94 C98 70 90 52 80 44Z', c); front = path(CAP, c) + stroke('M44 24 Q60 18 76 24', l, 2); }
    else if (i === 1) { back = ell(28, 62, 10, 24, c) + ell(92, 62, 10, 24, c); front = path(CAP, c) + stroke('M60 14 L60 36', d, 1.6); }
    else if (i === 2) { back = path('M30 52 C24 6 96 6 90 52 L94 78 C82 86 38 86 26 78Z', c); front = path(OUT + ' C84 44 74 38 60 40 C46 38 36 44 33 50Z', c); }
    else if (i === 3) { back = path('M30 48 C24 4 96 4 90 48 L96 120 L76 110 L44 110 L24 120Z', c); front = path(OUT + ' C82 40 66 32 50 34 C42 38 36 44 33 50Z', c); }
    else if (i === 4) { back = curls([[90, 72], [93, 86], [90, 100], [93, 114]], 7, c) + circ(92, 124, 4.5, '#e8508a'); front = path(CAP, c); }
    else if (i === 5) { back = circ(60, 12, 13, c); front = path('M33 50 C28 8 92 8 87 50 C84 44 76 38 60 38 C44 38 36 44 33 50Z', c); }
    else if (i === 6) front = path(OUT + ' L82 40 L74 48 L68 36 L58 46 L50 36 L42 46 L36 38Z', c);
    else if (i === 7) { back = path('M36 28 C6 28 6 82 26 104 C22 80 28 58 38 46Z', c); front = path(OUT + ' C80 36 62 30 44 36 C38 40 35 44 33 50Z', c); }
    else if (i === 8) { back = curls([[26, 50], [22, 66], [26, 82], [32, 96], [94, 50], [98, 66], [94, 82], [88, 96]], 10, c); front = curls([[38, 32], [48, 22], [60, 18], [72, 22], [82, 32], [34, 44], [86, 44]], 9.5, c); }
    else { back = path('M30 48 C24 4 96 4 90 48 L94 94 L72 86 L48 86 L26 94Z', c) + circ(60, 11, 10, c); front = path(CAP, c) + stroke('M60 14 L60 36', d, 1.6); }
  }
  return {back: back, front: front};
}

/* ---------- accessories ---------- */
function acc(sex, i){
  if (i < 0) return '';
  var ink = '#2b2540';
  if (sex === 'M') {
    if (i === 0) return circ(50, 50, 9, 'rgba(255,255,255,.25)', ' stroke="' + ink + '" stroke-width="2"') + circ(70, 50, 9, 'rgba(255,255,255,.25)', ' stroke="' + ink + '" stroke-width="2"') + stroke('M59 50 L61 50', ink, 2) + stroke('M41 49 L35 46 M79 49 L85 46', ink, 2);
    if (i === 1) return rect(40, 42, 18, 15, 'rgba(255,255,255,.25)', 3, ' stroke="' + ink + '" stroke-width="2"') + rect(62, 42, 18, 15, 'rgba(255,255,255,.25)', 3, ' stroke="' + ink + '" stroke-width="2"') + stroke('M58 49 L62 49', ink, 2) + stroke('M40 47 L35 45 M80 47 L85 45', ink, 2);
    if (i === 2) return rect(39, 43, 20, 13, '#241f33', 5) + rect(61, 43, 20, 13, '#241f33', 5) + stroke('M59 48 L61 48', ink, 2) + stroke('M44 46 L50 46', 'rgba(255,255,255,.55)', 1.6) + stroke('M66 46 L72 46', 'rgba(255,255,255,.55)', 1.6);
    if (i === 3) return rect(34, 31, 52, 8, '#e03131', 4) + stroke('M38 35 L82 35', 'rgba(255,255,255,.5)', 1.2);
    if (i === 4) return path('M32 36 C32 14 88 14 88 36 L88 38 L32 38Z', '#2f6fed') + path('M30 37 L72 37 C86 37 96 40 100 44 C90 40 60 41 30 41Z', '#1f4fb4') + circ(60, 18, 3, '#fff');
    if (i === 5) return path('M32 36 C30 8 90 8 88 36Z', '#e8590c') + rect(31, 30, 58, 8, '#c2410c', 4) + circ(60, 8, 6, '#ffd43b');
    if (i === 6) return stroke('M33 52 C30 8 90 8 87 52', '#333', 4) + rect(26, 44, 11, 18, '#e03131', 5) + rect(83, 44, 11, 18, '#e03131', 5);
    if (i === 7) return rect(70, 58, 12, 7, '#f6d9b0', 2, ' transform="rotate(-20 76 61)" stroke="#d1a574" stroke-width=".8"') + stroke('M74 61 L78 60', '#d1a574', .8);
    if (i === 8) return [[44, 58], [48, 61], [41, 62], [76, 58], [72, 61], [79, 62], [58, 56], [62, 56], [60, 58]].map(function(p){ return circ(p[0], p[1], 1.3, '#b0733c'); }).join('');
    return path('M42 60 L44 66 L50 66 L45.5 70 L47.5 76 L42 72.5 L36.5 76 L38.5 70 L34 66 L40 66Z', '#ffd43b', ' stroke="#e0a800" stroke-width=".8" transform="translate(-4 -6) scale(.9)"');
  }
  if (i === 0) return path('M70 22 L56 14 L56 32Z', '#ff5d8f') + path('M70 22 L84 14 L84 32Z', '#ff5d8f') + circ(70, 22, 5, '#e03578');
  if (i === 1) return stroke('M34 42 C38 18 82 18 86 42', '#ff7ab6', 4.5);
  if (i === 2) return rect(38, 32, 12, 4, '#4dabf7', 2, ' transform="rotate(-25 44 34)"') + rect(40, 38, 12, 4, '#ffd43b', 2, ' transform="rotate(-25 46 40)"');
  if (i === 3) return circ(50, 50, 9, 'rgba(255,255,255,.25)', ' stroke="#e64980" stroke-width="2"') + circ(70, 50, 9, 'rgba(255,255,255,.25)', ' stroke="#e64980" stroke-width="2"') + stroke('M59 50 L61 50', '#e64980', 2) + stroke('M41 49 L35 46 M79 49 L85 46', '#e64980', 2);
  if (i === 4) return path('M39 52 C38 44 48 42 58 46 C58 56 46 58 39 52Z', 'rgba(255,255,255,.25)', ' stroke="#7048e8" stroke-width="2"') + path('M81 52 C82 44 72 42 62 46 C62 56 74 58 81 52Z', 'rgba(255,255,255,.25)', ' stroke="#7048e8" stroke-width="2"') + stroke('M58 46 L62 46', '#7048e8', 2) + stroke('M39 50 L34 46 M81 50 L86 46', '#7048e8', 2);
  if (i === 5) return [0, 72, 144, 216, 288].map(function(a){ var r = a * Math.PI / 180; return circ((82 + Math.cos(r) * 6).toFixed(1), (32 + Math.sin(r) * 6).toFixed(1), 4.4, '#ff8787'); }).join('') + circ(82, 32, 3.4, '#ffd43b');
  if (i === 6) return stroke('M33 52 C30 8 90 8 87 52', '#7048e8', 4) + rect(26, 44, 11, 18, '#ff5d8f', 5) + rect(83, 44, 11, 18, '#ff5d8f', 5);
  if (i === 7) return circ(36, 62, 3.2, '#ffd43b', ' stroke="#e0a800" stroke-width=".8"') + circ(84, 62, 3.2, '#ffd43b', ' stroke="#e0a800" stroke-width=".8"');
  if (i === 8) return heart(44, 62, '#ff6b8f') + heart(76, 62, '#ff6b8f');
  return path('M44 30 L45.6 34 L50 34.2 L46.5 37 L47.8 41 L44 38.6 L40.2 41 L41.5 37 L38 34.2 L42.4 34Z', '#ffd43b', ' stroke="#e0a800" stroke-width=".8"');
}
function heart(x, y, c){ return '<path d="M' + x + ' ' + (y + 4) + ' C' + (x - 7) + ' ' + (y - 2) + ' ' + (x - 3) + ' ' + (y - 6) + ' ' + x + ' ' + (y - 2) + ' C' + (x + 3) + ' ' + (y - 6) + ' ' + (x + 7) + ' ' + (y - 2) + ' ' + x + ' ' + (y + 4) + 'Z" fill="' + c + '" opacity=".85"/>'; }

/* ---------- outfits (body + clothes) ---------- */
var NAVY = '#26306b', WHITE = '#fbfbff', RED = '#e03131';
function body(sex, outfit, skin){
  var s = [], sk = skin, sd = shade(skin, -0.08);
  // legs & shoes
  var long = (sex === 'M' && outfit === 0);
  s.push(rect(46, 116, 12, 40, sk, 5), rect(62, 116, 12, 40, sk, 5));
  if (long) { s.push(rect(44, 116, 16, 42, NAVY, 3), rect(60, 116, 16, 42, NAVY, 3)); }
  if (sex === 'F' && outfit === 0) { s.push(rect(46, 146, 12, 10, WHITE, 3), rect(62, 146, 12, 10, WHITE, 3)); }
  if (outfit > 0 && !(sex === 'F' && outfit === 0)) { s.push(rect(46, 146, 12, 10, WHITE, 3), rect(62, 146, 12, 10, WHITE, 3)); }
  var shoe = outfit === 2 ? '#fff' : '#222';
  s.push(ell(52, 159, 10, 5, shoe, outfit === 2 ? ' stroke="#bbb" stroke-width="1"' : ''), ell(68, 159, 10, 5, shoe, outfit === 2 ? ' stroke="#bbb" stroke-width="1"' : ''));
  // arms (skin) then torso
  s.push(rect(30, 90, 9, 28, sk, 4), rect(81, 90, 9, 28, sk, 4), circ(34.5, 120, 5, sk), circ(85.5, 120, 5, sk));
  // torso + lower garment
  var top = outfit === 2 ? '#e8590c' : WHITE;
  s.push(rect(38, 76, 44, 46, top, 10, ' stroke="' + shade(top, -0.1) + '" stroke-width="1"'));
  s.push(rect(29, 78, 12, 16, top, 5, ' stroke="' + shade(top, -0.1) + '" stroke-width="1"'), rect(79, 78, 12, 16, top, 5, ' stroke="' + shade(top, -0.1) + '" stroke-width="1"'));
  if (outfit === 2) { s.push(rect(29, 88, 12, 3, '#fff', 1), rect(79, 88, 12, 3, '#fff', 1), rect(46, 90, 28, 4, 'rgba(255,255,255,.7)', 2)); }
  // lower garment
  if (outfit === 0 && sex === 'M') { s.push(rect(38, 114, 44, 6, '#111', 2), rect(57, 114, 6, 6, '#d4a017', 1)); }
  else if (outfit === 0 && sex === 'F') { s.push(path('M38 96 L82 96 L90 142 L30 142Z', NAVY), rect(38, 96, 44, 8, NAVY, 3)); }
  else { s.push(rect(40, 112, 40, 28, NAVY, 5), stroke('M60 124 L60 140', 'rgba(255,255,255,.18)', 1.5)); if (outfit === 2) s.push(rect(40, 118, 40, 3, '#fff', 1)); }
  // neckline details
  s.push(rect(54, 70, 12, 12, sk, 4));
  if (outfit < 2) {
    s.push(path('M50 76 L60 90 L54 78Z', '#e9ecf5', ' stroke="#cfd4e4" stroke-width=".8"'), path('M70 76 L60 90 L66 78Z', '#e9ecf5', ' stroke="#cfd4e4" stroke-width=".8"'));
    if (outfit === 0) { if (sex === 'M') s.push(path('M57 84 L63 84 L65 108 L60 113 L55 108Z', NAVY), path('M56 82 L64 82 L63 86 L57 86Z', '#3a4590')); else s.push(path('M54 86 L60 82 L66 86 L60 90Z', RED), circ(60, 86, 2.5, '#b02525')); }
  } else s.push(path('M52 76 C56 84 64 84 68 76 L66 76 C62 80 58 80 54 76Z', '#c2410c'));
  return s.join('');
}

/* ---------- face + whole figure ---------- */
function face(skin){
  var ink = '#2b2540', sd = shade(skin, -0.07);
  return circ(35, 49, 5.5, skin) + circ(85, 49, 5.5, skin) + circ(35, 49, 2.6, sd) + circ(85, 49, 2.6, sd) + ell(60, 47, 25.5, 27.5, skin) +
    ell(50, 50, 3.1, 4.2, ink) + ell(70, 50, 3.1, 4.2, ink) + circ(51, 48.5, 1.1, '#fff') + circ(71, 48.5, 1.1, '#fff') +
    stroke('M45 43 Q50 40.5 55 43 M65 43 Q70 40.5 75 43', shade(skin, -0.32), 1.6) +
    stroke('M53 62 Q60 68 67 62', '#b5483a', 2) + circ(44, 59, 4, '#ff8fa3', ' opacity=".35"') + circ(76, 59, 4, '#ff8fa3', ' opacity=".35"');
}
function svg(cfg, opts){
  opts = opts || {};
  cfg = Object.assign({sex: 'M', outfit: 0, hair: 0, acc: -1, skin: 1, hairc: 0}, cfg || {});
  var sex = cfg.sex === 'F' ? 'F' : 'M', skin = SKIN[cfg.skin % SKIN.length], hc = HAIRC[cfg.hairc % HAIRC.length];
  var h = hair(sex, cfg.hair % 10, hc);
  var vb = opts.bust ? '14 6 92 96' : '0 0 120 168';
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + vb + '" role="img" aria-label="' + (opts.label || 'Character') + '">' +
    h.back + body(sex, cfg.outfit % 3, skin) + face(skin) + h.front + acc(sex, cfg.acc) + '</svg>';
}
function randomCfg(seed){
  var h = 2166136261; String(seed).split('').forEach(function(c){ h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }); h >>>= 0;
  return {sex: h % 2 ? 'F' : 'M', outfit: (h >>> 3) % 3, hair: (h >>> 5) % 10, acc: ((h >>> 9) % 11) - 1, skin: (h >>> 13) % 5, hairc: (h >>> 16) % 7};
}
window.GQAvatar = {SKIN: SKIN, HAIRC: HAIRC, OUTFITS: OUTFITS, HAIR_NAMES: HAIR_NAMES, ACC_NAMES: ACC_NAMES, svg: svg, randomCfg: randomCfg};
})();
