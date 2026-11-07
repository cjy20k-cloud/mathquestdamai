/* Gym Quest character art. Everything is drawn as SVG in code (no image files).
   Style: glossy cartoon with a dark outline, big shiny eyes and navy-and-gold school uniforms (matches the trailer).
   cfg = {sex:'M'|'F', outfit:0|1|2, hair:0-9, acc:-1|0-9, skin:0-4, hairc:0-6}
   Students can only change the head/face (hair, accessory, skin tone, hair colour) and pick one of 3 outfits. */
(function(){
'use strict';
var SKIN = ['#ffe3cf', '#f6cda4', '#dca775', '#aa7550', '#744a2d'];
var HAIRC = ['#2b2538', '#6a3f24', '#9a622c', '#e0a52e', '#d2482f', '#aeb4c4', '#2f6fed'];
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


var INK = '#241d3b', OL = ' stroke="' + INK + '" stroke-width="1.7" stroke-linejoin="round"';
function ol(extra){
  extra = extra || '';
  if (extra.indexOf('stroke="') >= 0) return extra;   // the shape brings its own stroke
  return extra.indexOf('stroke-width=') >= 0 ? ' stroke="' + INK + '" stroke-linejoin="round"' + extra : OL + extra;
}
function circO(x, y, r, f, extra){ return circ(x, y, r, f, ol(extra)); }
function ellO(x, y, rx, ry, f, extra){ return ell(x, y, rx, ry, f, ol(extra)); }
function pathO(d, f, extra){ return path(d, f, ol(extra)); }
function rectO(x, y, w, h, f, rx, extra){ return rect(x, y, w, h, f, rx, ol(extra)); }
/* curls: outline every blob first, then fill them all, so the dark line only shows round the outside of the clump */
function curls(pts, r, c){
  return pts.map(function(p){ return circ(p[0], p[1], r + 1.1, INK); }).join('') + pts.map(function(p){ return circ(p[0], p[1], r, c); }).join('');
}

/* ---------- hair: returns {back, front} ---------- */
function hair(sex, i, c){
  var d = shade(c, -0.12), l = shade(c, 0.14), back = '', front = '';
  var OUT = 'M33 50 C27 0 93 0 87 50';
  var CAP = OUT + ' C84 42 76 36 60 36 C44 36 36 42 33 50Z';
  if (sex === 'M') {
    if (i === 0) front = pathO(CAP, c) + stroke('M44 24 Q60 18 76 24', l, 2);
    else if (i === 1) front = pathO(OUT + ' C82 44 70 33 52 33 C42 36 37 42 33 50Z', c) + stroke('M50 20 Q56 28 52 36', d, 1.8);
    else if (i === 2) front = pathO('M35 46 C31 10 89 10 85 46 C82 40 74 35 60 35 C46 35 38 40 35 46Z', c, ' opacity=".88"');
    else if (i === 3) front = pathO('M33 50 L33 24 L42 32 L45 12 L54 28 L60 6 L66 28 L75 12 L78 32 L87 24 L87 50 C84 42 76 36 60 36 C44 36 36 42 33 50Z', c);
    else if (i === 4) front = curls([[38, 34], [48, 24], [60, 20], [72, 24], [82, 34], [34, 46], [86, 46]], 10.5, c) + circO(54, 26, 4, l);
    else if (i === 5) front = pathO('M33 50 C27 20 50 -6 80 6 C96 12 92 34 87 50 C84 42 76 36 60 36 C44 36 36 42 33 50Z', c) + stroke('M52 16 Q68 10 82 18', l, 2.2);
    else if (i === 6) front = pathO(OUT + ' L82 40 L77 48 L72 38 L66 48 L60 38 L54 48 L48 38 L42 48 L38 40Z', c);
    else if (i === 7) front = pathO('M32 54 C27 0 93 0 88 54 L86 62 L82 46 C72 44 48 44 38 46 L34 62Z', c);
    else if (i === 8) { back = circO(60, 38, 37, c); front = pathO('M33 50 C28 8 92 8 87 50 C84 44 76 38 60 38 C44 38 36 44 33 50Z', c); }
    else { back = ellO(60, 44, 33, 34, c); front = pathO('M31 54 C26 0 94 0 89 54 L85 42 C70 34 50 34 35 42Z', c); }
  } else {
    if (i === 0) { back = pathO('M80 26 C110 22 112 74 94 94 C98 70 90 52 80 44Z', c); front = pathO(CAP, c) + stroke('M44 24 Q60 18 76 24', l, 2); }
    else if (i === 1) { back = ellO(28, 62, 10, 24, c) + ellO(92, 62, 10, 24, c); front = pathO(CAP, c) + stroke('M60 14 L60 36', d, 1.6); }
    else if (i === 2) { back = pathO('M30 52 C24 6 96 6 90 52 L94 78 C82 86 38 86 26 78Z', c); front = pathO(OUT + ' C84 44 74 38 60 40 C46 38 36 44 33 50Z', c); }
    else if (i === 3) { back = pathO('M30 48 C24 4 96 4 90 48 L96 120 L76 110 L44 110 L24 120Z', c); front = pathO(OUT + ' C82 40 66 32 50 34 C42 38 36 44 33 50Z', c); }
    else if (i === 4) { back = curls([[90, 72], [93, 86], [90, 100], [93, 114]], 7, c) + circO(92, 124, 4.5, '#e8508a'); front = pathO(CAP, c); }
    else if (i === 5) { back = circO(60, 12, 13, c); front = pathO('M33 50 C28 8 92 8 87 50 C84 44 76 38 60 38 C44 38 36 44 33 50Z', c); }
    else if (i === 6) front = pathO(OUT + ' L82 40 L74 48 L68 36 L58 46 L50 36 L42 46 L36 38Z', c);
    else if (i === 7) { back = pathO('M36 28 C6 28 6 82 26 104 C22 80 28 58 38 46Z', c); front = pathO(OUT + ' C80 36 62 30 44 36 C38 40 35 44 33 50Z', c); }
    else if (i === 8) { back = curls([[26, 50], [22, 66], [26, 82], [32, 96], [94, 50], [98, 66], [94, 82], [88, 96]], 10, c); front = curls([[38, 32], [48, 22], [60, 18], [72, 22], [82, 32], [34, 44], [86, 44]], 9.5, c); }
    else { back = pathO('M30 48 C24 4 96 4 90 48 L94 94 L72 86 L48 86 L26 94Z', c) + circO(60, 11, 10, c); front = pathO(CAP, c) + stroke('M60 14 L60 36', d, 1.6); }
  }
  return {back: back, front: front};
}

/* ---------- accessories ---------- */
function acc(sex, i){
  if (i < 0) return '';
  var ink = '#2b2540';
  if (sex === 'M') {
    if (i === 0) return circO(50, 50, 9, 'rgba(255,255,255,.25)', ' stroke="' + ink + '" stroke-width="2"') + circO(70, 50, 9, 'rgba(255,255,255,.25)', ' stroke="' + ink + '" stroke-width="2"') + stroke('M59 50 L61 50', ink, 2) + stroke('M41 49 L35 46 M79 49 L85 46', ink, 2);
    if (i === 1) return rectO(40, 42, 18, 15, 'rgba(255,255,255,.25)', 3, ' stroke="' + ink + '" stroke-width="2"') + rectO(62, 42, 18, 15, 'rgba(255,255,255,.25)', 3, ' stroke="' + ink + '" stroke-width="2"') + stroke('M58 49 L62 49', ink, 2) + stroke('M40 47 L35 45 M80 47 L85 45', ink, 2);
    if (i === 2) return rectO(39, 43, 20, 13, '#241f33', 5) + rectO(61, 43, 20, 13, '#241f33', 5) + stroke('M59 48 L61 48', ink, 2) + stroke('M44 46 L50 46', 'rgba(255,255,255,.55)', 1.6) + stroke('M66 46 L72 46', 'rgba(255,255,255,.55)', 1.6);
    if (i === 3) return rectO(34, 31, 52, 8, '#e03131', 4) + stroke('M38 35 L82 35', 'rgba(255,255,255,.5)', 1.2);
    if (i === 4) return pathO('M32 36 C32 14 88 14 88 36 L88 38 L32 38Z', '#2f6fed') + pathO('M30 37 L72 37 C86 37 96 40 100 44 C90 40 60 41 30 41Z', '#1f4fb4') + circO(60, 18, 3, '#fff');
    if (i === 5) return pathO('M32 36 C30 8 90 8 88 36Z', '#e8590c') + rectO(31, 30, 58, 8, '#c2410c', 4) + circO(60, 8, 6, '#ffd43b');
    if (i === 6) return stroke('M33 52 C30 8 90 8 87 52', '#333', 4) + rectO(26, 44, 11, 18, '#e03131', 5) + rectO(83, 44, 11, 18, '#e03131', 5);
    if (i === 7) return rectO(70, 58, 12, 7, '#f6d9b0', 2, ' transform="rotate(-20 76 61)" stroke="#d1a574" stroke-width=".8"') + stroke('M74 61 L78 60', '#d1a574', .8);
    if (i === 8) return [[44, 58], [48, 61], [41, 62], [76, 58], [72, 61], [79, 62], [58, 56], [62, 56], [60, 58]].map(function(p){ return circ(p[0], p[1], 1.3, '#b0733c'); }).join('');
    return pathO('M42 60 L44 66 L50 66 L45.5 70 L47.5 76 L42 72.5 L36.5 76 L38.5 70 L34 66 L40 66Z', '#ffd43b', ' stroke="#e0a800" stroke-width=".8" transform="translate(-4 -6) scale(.9)"');
  }
  if (i === 0) return pathO('M70 22 L56 14 L56 32Z', '#ff5d8f') + pathO('M70 22 L84 14 L84 32Z', '#ff5d8f') + circO(70, 22, 5, '#e03578');
  if (i === 1) return stroke('M34 42 C38 18 82 18 86 42', '#ff7ab6', 4.5);
  if (i === 2) return rectO(38, 32, 12, 4, '#4dabf7', 2, ' transform="rotate(-25 44 34)"') + rectO(40, 38, 12, 4, '#ffd43b', 2, ' transform="rotate(-25 46 40)"');
  if (i === 3) return circO(50, 50, 9, 'rgba(255,255,255,.25)', ' stroke="#e64980" stroke-width="2"') + circO(70, 50, 9, 'rgba(255,255,255,.25)', ' stroke="#e64980" stroke-width="2"') + stroke('M59 50 L61 50', '#e64980', 2) + stroke('M41 49 L35 46 M79 49 L85 46', '#e64980', 2);
  if (i === 4) return pathO('M39 52 C38 44 48 42 58 46 C58 56 46 58 39 52Z', 'rgba(255,255,255,.25)', ' stroke="#7048e8" stroke-width="2"') + pathO('M81 52 C82 44 72 42 62 46 C62 56 74 58 81 52Z', 'rgba(255,255,255,.25)', ' stroke="#7048e8" stroke-width="2"') + stroke('M58 46 L62 46', '#7048e8', 2) + stroke('M39 50 L34 46 M81 50 L86 46', '#7048e8', 2);
  if (i === 5) return [0, 72, 144, 216, 288].map(function(a){ var r = a * Math.PI / 180; return circO((82 + Math.cos(r) * 6).toFixed(1), (32 + Math.sin(r) * 6).toFixed(1), 4.4, '#ff8787'); }).join('') + circO(82, 32, 3.4, '#ffd43b');
  if (i === 6) return stroke('M33 52 C30 8 90 8 87 52', '#7048e8', 4) + rectO(26, 44, 11, 18, '#ff5d8f', 5) + rectO(83, 44, 11, 18, '#ff5d8f', 5);
  if (i === 7) return circO(36, 62, 3.2, '#ffd43b', ' stroke="#e0a800" stroke-width=".8"') + circO(84, 62, 3.2, '#ffd43b', ' stroke="#e0a800" stroke-width=".8"');
  if (i === 8) return heart(44, 62, '#ff6b8f') + heart(76, 62, '#ff6b8f');
  return pathO('M44 30 L45.6 34 L50 34.2 L46.5 37 L47.8 41 L44 38.6 L40.2 41 L41.5 37 L38 34.2 L42.4 34Z', '#ffd43b', ' stroke="#e0a800" stroke-width=".8"');
}
function heart(x, y, c){ return '<path d="M' + x + ' ' + (y + 4) + ' C' + (x - 7) + ' ' + (y - 2) + ' ' + (x - 3) + ' ' + (y - 6) + ' ' + x + ' ' + (y - 2) + ' C' + (x + 3) + ' ' + (y - 6) + ' ' + (x + 7) + ' ' + (y - 2) + ' ' + x + ' ' + (y + 4) + 'Z" fill="' + c + '" opacity=".85"/>'; }

/* ---------- outfits (body + clothes) ---------- */
var NAVY = '#222d70', NAVY2 = '#34429a', GOLD = '#f4b83a', WHITE = '#fbfbff', RED = '#e0383e', EYEC = ['#3b2a2f', '#5a3a22', '#6b4a1f', '#2d7a8f', '#7a2f26', '#4a5560', '#2f56c9'];
function sneaker(cx, white){
  var top = white ? '#fff' : '#f4f6ff';
  return ellO(cx, 159, 11.5, 5.8, top) + path('M' + (cx - 10) + ' 158 Q' + cx + ' 150 ' + (cx + 10) + ' 158 L' + (cx + 10.5) + ' 160 L' + (cx - 10.5) + ' 160Z', NAVY2, ' opacity=".95"') +
    stroke('M' + (cx - 7) + ' 155 L' + (cx + 5) + ' 155', GOLD, 1.6) + stroke('M' + (cx - 10) + ' 161 L' + (cx + 10) + ' 161', 'rgba(36,29,59,.35)', 1.4);
}
function body(sex, outfit, skin){
  var s = [], sk = skin, sd = shade(skin, -0.1), fem = sex === 'F', blazer = outfit === 0;
  var long = (!fem && blazer), top = outfit === 2 ? '#ff7a1a' : (blazer ? NAVY : WHITE);
  // ground shadow
  s.push(ell(60, 163, 30, 4.5, 'rgba(36,29,59,.22)'));
  // legs, socks, sneakers
  s.push(rectO(46, 116, 12, 40, sk, 5), rectO(62, 116, 12, 40, sk, 5));
  if (long) s.push(rectO(44, 114, 16, 44, NAVY, 3), rectO(60, 114, 16, 44, NAVY, 3), stroke('M52 120 L52 150', 'rgba(255,255,255,.16)', 1.4), stroke('M68 120 L68 150', 'rgba(255,255,255,.16)', 1.4));
  else s.push(rectO(46, 144, 12, 14, '#fff', 4), rectO(62, 144, 12, 14, '#fff', 4), rect(46, 146, 12, 3, NAVY2, 1), rect(62, 146, 12, 3, NAVY2, 1));
  s.push(sneaker(52, outfit === 2), sneaker(68, outfit === 2));
  // arms: long navy sleeves with gold cuffs (blazer) or short sleeves
  if (blazer){
    s.push(rectO(28, 78, 13, 38, NAVY, 6), rectO(79, 78, 13, 38, NAVY, 6), rect(28.5, 107, 12, 3.2, GOLD, 1), rect(79.5, 107, 12, 3.2, GOLD, 1), circO(34.5, 120, 5.4, sk), circO(85.5, 120, 5.4, sk));
  } else {
    s.push(rectO(30, 90, 9, 28, sk, 4), rectO(81, 90, 9, 28, sk, 4), circO(34.5, 120, 5.4, sk), circO(85.5, 120, 5.4, sk), rectO(28, 77, 13, 18, top, 6), rectO(79, 77, 13, 18, top, 6));
    if (outfit === 2) s.push(rect(28.5, 88, 12, 3, '#fff', 1), rect(79.5, 88, 12, 3, '#fff', 1));
    else s.push(rect(28.5, 88, 12, 2.6, NAVY2, 1), rect(79.5, 88, 12, 2.6, NAVY2, 1));
  }
  // lower garment first, then the torso over it
  if (blazer && fem) s.push(pathO('M37 98 L83 98 L93 144 L27 144Z', NAVY), stroke('M47 100 L42 142 M60 100 L60 142 M73 100 L78 142', 'rgba(255,255,255,.2)', 1.4), rect(29, 138, 62, 3.2, GOLD, 1.2), rect(33, 143, 54, 1.6, '#fff', .8));
  else if (!blazer) s.push(rectO(39, 110, 42, 30, NAVY, 6), stroke('M60 122 L60 138', 'rgba(255,255,255,.2)', 1.4), outfit === 2 ? rect(39.8, 118, 40.4, 3.2, '#fff', 1) : rect(39.8, 134, 40.4, 3, GOLD, 1));
  s.push(rectO(38, 76, 44, blazer && fem ? 30 : 42, top, 10));
  s.push(rect(54, 70, 12, 12, sk), stroke('M54 71 L54 80 M66 71 L66 80', INK, 1.5));
  if (blazer){
    // open jacket over a white shirt, gold piping, crest, buttons
    s.push(path('M50 76 L60 101 L70 76Z', WHITE, ' stroke="' + INK + '" stroke-width="1.3" stroke-linejoin="round"'));
    s.push(stroke('M49 76 L60 102 L71 76', GOLD, 1.8));
    if (fem) s.push(path('M60 83 L52 80 L52 90Z M60 83 L68 80 L68 90Z', RED, ' stroke="' + INK + '" stroke-width="1" stroke-linejoin="round"'), circO(60, 84, 2.6, '#b72b30'));
    else s.push(path('M57 80 L63 80 L64.5 100 L60 104 L55.5 100Z', RED, ' stroke="' + INK + '" stroke-width="1" stroke-linejoin="round"'), path('M56 78 L64 78 L63 82 L57 82Z', '#c92f36', ' stroke="' + INK + '" stroke-width=".9"'));
    s.push(pathO('M42 88 L52 88 L52 96 Q47 101 42 96Z', GOLD, ' stroke="' + INK + '" stroke-width="1.2"'), path('M47 90 L48 92.4 L50.5 92.6 L48.6 94.2 L49.2 96.6 L47 95.3 L44.8 96.6 L45.4 94.2 L43.5 92.6 L46 92.4Z', '#fff'));
    s.push(circ(60, 104, 1.8, GOLD), blazer && !fem ? circ(60, 112, 1.8, GOLD) : '');
    if (!fem) s.push(rect(38.8, 117, 42.4, 3.2, GOLD, 1));
  } else if (outfit === 1){
    s.push(path('M50 76 L60 90 L54 78Z', '#eef1fb', ' stroke="' + INK + '" stroke-width="1" stroke-linejoin="round"'), path('M70 76 L60 90 L66 78Z', '#eef1fb', ' stroke="' + INK + '" stroke-width="1" stroke-linejoin="round"'));
    s.push(rect(55, 86, 10, 24, NAVY2, 3), stroke('M60 88 L60 108', GOLD, 1.4));
  } else {
    s.push(path('M52 76 C56 85 64 85 68 76 L66 76 C62 81 58 81 54 76Z', '#c2410c'), rect(46, 96, 28, 3.6, 'rgba(255,255,255,.85)', 1.8), path('M52 105 L56 99 L60 105 L64 99 L68 105', 'none', ' stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity=".9"'));
  }
  return s.join('');
}

/* ---------- face + whole figure ---------- */
function eye(cx, iris){
  return ellO(cx, 50, 5.5, 6.6, '#fff', ' stroke-width="1.2"') + ell(cx, 51.2, 4.1, 5.2, iris) + ell(cx, 51.6, 2.2, 3, '#1b1530') +
    circ(cx - 1.5, 48.6, 1.9, '#fff') + circ(cx + 1.6, 53.4, 1, 'rgba(255,255,255,.9)') + stroke('M' + (cx - 6) + ' 46.6 Q' + cx + ' 42.4 ' + (cx + 6) + ' 46.4', INK, 2.3);
}
function face(skin, hc, hi){
  var sd = shade(skin, -0.07), brow = shade(hc, -0.1);
  return circO(35, 49, 5.5, skin) + circO(85, 49, 5.5, skin) + circ(35, 49, 2.6, sd) + circ(85, 49, 2.6, sd) + ellO(60, 47, 25.5, 27.5, skin) +
    ell(60, 66, 15, 5, shade(skin, -0.05), ' opacity=".5"') +
    eye(50, EYEC[hi % EYEC.length]) + eye(70, EYEC[hi % EYEC.length]) +
    stroke('M44 40.5 Q50 37.5 56 40.6 M64 40.6 Q70 37.5 76 40.5', brow, 2.2) +
    stroke('M59 56.5 Q60 58 61.4 57', shade(skin, -0.22), 1.3) +
    path('M52.5 61.5 Q60 71.5 67.5 61.5 Q60 63.4 52.5 61.5Z', '#7a2432', ' stroke="' + INK + '" stroke-width="1.3" stroke-linejoin="round"') + path('M56 65.4 Q60 68.4 64 65.4 Q60 64.2 56 65.4Z', '#ff8da1') +
    ell(43.5, 60, 4.8, 3.2, '#ff7f9b', ' opacity=".45"') + ell(76.5, 60, 4.8, 3.2, '#ff7f9b', ' opacity=".45"');
}
function svg(cfg, opts){
  opts = opts || {};
  cfg = Object.assign({sex: 'M', outfit: 0, hair: 0, acc: -1, skin: 1, hairc: 0}, cfg || {});
  var sex = cfg.sex === 'F' ? 'F' : 'M', skin = SKIN[cfg.skin % SKIN.length], hc = HAIRC[cfg.hairc % HAIRC.length];
  var h = hair(sex, cfg.hair % 10, hc);
  var vb = opts.bust ? '14 6 92 96' : '0 0 120 168';
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + vb + '" role="img" aria-label="' + (opts.label || 'Character') + '">' +
    h.back + body(sex, cfg.outfit % 3, skin) + face(skin, hc, cfg.hairc) + h.front + acc(sex, cfg.acc) + '</svg>';
}
function randomCfg(seed){
  var h = 2166136261; String(seed).split('').forEach(function(c){ h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }); h >>>= 0;
  return {sex: h % 2 ? 'F' : 'M', outfit: (h >>> 3) % 3, hair: (h >>> 5) % 10, acc: ((h >>> 9) % 11) - 1, skin: (h >>> 13) % 5, hairc: (h >>> 16) % 7};
}
window.GQAvatar = {SKIN: SKIN, HAIRC: HAIRC, OUTFITS: OUTFITS, HAIR_NAMES: HAIR_NAMES, ACC_NAMES: ACC_NAMES, svg: svg, randomCfg: randomCfg};
})();
