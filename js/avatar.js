/* Gym Quest character art. Everything is drawn as SVG in code (no image files).
   Style: glossy cartoon with a dark outline, big shiny eyes (matches the trailer). Outfits: all white, PE shirt with long pants, PE shirt with black shorts.
   cfg = {sex:'M'|'F', outfit:0|1|2, hair:0-15, acc:-1|0-9, skin:0-4, hairc:0-6}
   Students can only change the head/face (hair, accessory, skin tone, hair colour) and pick one of 3 outfits. */
(function(){
'use strict';
var SKIN = ['#ffe3cf', '#f6cda4', '#dca775', '#aa7550', '#744a2d'];
var HAIRC = ['#2b2538', '#6a3f24', '#9a622c', '#e0a52e', '#d2482f', '#aeb4c4', '#2f6fed'];
var OUTFITS = ['Full school uniform', 'Half school uniform', 'PE uniform'];
var HAIR_NAMES = {
  M: ['Short crop', 'Side part', 'Buzz cut', 'Spiky', 'Curly top', 'Quiff', 'Messy', 'Long fringe', 'Big afro', 'Bowl cut', 'Mohawk', 'Top knot', 'Long and loose', 'Dreadlocks', 'Pompadour', 'Cornrows'],
  F: ['Ponytail', 'Twin tails', 'Bob', 'Long straight', 'Side braid', 'Top bun', 'Pixie', 'Side ponytail', 'Curly long', 'Half-up knot', 'Space buns', 'Braided pigtails', 'Curly bob', 'Long wavy', 'Side-swept pixie', 'Big afro']
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

/* ---------- hair: returns {back, front}; 16 styles per sex, each with its own silhouette ---------- */
function hair(sex, i, c, hat){
  var d = shade(c, -0.12), l = shade(c, 0.14), back = '', front = '';
  var OUT = 'M33 50 C27 0 93 0 87 50';
  var CAP = OUT + ' C84 42 76 36 60 36 C44 36 36 42 33 50Z';
  var ring = function(n, cx, cy, rx, ry){ var p = [], k, a; for (k = 0; k < n; k++){ a = k * Math.PI * 2 / n; p.push([+(cx + Math.cos(a) * rx).toFixed(1), +(cy + Math.sin(a) * ry).toFixed(1)]); } return p; };
  if (sex === 'M') {
    if (i === 0) front = pathO(CAP, c) + stroke('M44 24 Q60 18 76 24', l, 2);
    else if (i === 1) front = pathO('M32 54 C24 6 98 2 89 52 C87 38 76 30 58 32 C54 40 40 42 33 52Z', c) + stroke('M43 22 C54 12 74 12 84 26', l, 2.2) + stroke('M58 32 C54 22 56 14 62 9', d, 1.6);
    else if (i === 2) front = pathO('M36 45 C32 14 88 14 84 45 C80 38 72 33 60 33 C48 33 40 38 36 45Z', c, ' opacity=".5"');
    else if (i === 3) front = pathO('M33 50 L33 24 L42 32 L45 12 L54 28 L60 6 L66 28 L75 12 L78 32 L87 24 L87 50 C84 42 76 36 60 36 C44 36 36 42 33 50Z', c);
    else if (i === 4) front = curls([[38, 34], [48, 24], [60, 20], [72, 24], [82, 34], [34, 46], [86, 46]], 10.5, c) + circ(54, 26, 4, l);
    else if (i === 5) front = pathO('M33 50 C22 24 36 -4 66 -2 C92 0 104 18 90 36 C89 40 88 45 87 50 C84 42 76 36 60 36 C44 36 36 42 33 50Z', c) + stroke('M44 20 C52 6 74 4 90 16', l, 2.4) + stroke('M46 30 C54 22 66 20 76 24', d, 1.4);
    else if (i === 6) front = pathO('M33 50 C26 24 38 16 50 18 C54 4 74 -2 86 12 C98 20 97 38 87 50 C84 42 76 36 60 36 C44 36 36 42 33 50Z', c) + pathO('M52 35 C47 46 56 50 61 43 C59 41 57 39 57 35Z', c) + stroke('M60 14 C66 21 75 21 82 16 M40 24 C44 22 48 22 50 24', d, 1.4);
    else if (i === 7) front = pathO('M32 54 C27 0 93 0 88 54 L92 76 L82 68 L82 46 C72 44 48 44 38 46 L38 68 L28 76Z', c) + stroke('M42 46 C52 49 68 49 78 46', d, 1.4);
    else if (i === 8) { back = curls(ring(12, 60, 40, 27, 24), 13, c) + circ(60, 40, 30, c); front = pathO('M34 48 C30 22 90 22 86 48 C80 40 72 36 60 36 C48 36 40 40 34 48Z', c); }
    else if (i === 9) { back = ellO(60, 44, 33, 34, c); front = pathO('M31 54 C26 0 94 0 89 54 L85 42 C70 34 50 34 35 42Z', c); }
    else if (i === 10) front = pathO(CAP, c, ' opacity=".4"') + pathO('M49 38 C46 24 47 12 53 5 L60 1 L67 5 C73 12 74 24 71 38 C66 34 54 34 49 38Z', c) + stroke('M54 14 C53 22 53 28 54 33 M60 8 L60 32 M66 14 C67 22 67 28 66 33', d, 1.4);
    else if (i === 11) { back = circO(60, 9, 8.5, c); front = pathO(CAP, c) + stroke('M46 26 Q60 20 74 26', l, 2) + rectO(52, 13.5, 16, 4, '#e03131', 1.8); }
    else if (i === 12) {
      back = pathO('M31 44 C22 8 98 8 89 44 L96 98 C98 108 88 112 80 106 L72 98 L48 98 L40 106 C32 112 22 108 24 98Z', c);
      front = pathO(OUT + ' C80 36 66 33 60 38 C54 33 40 36 33 50Z', c) + pathO('M33 44 C27 62 29 84 35 98 L41 92 C38 76 39 60 41 46Z', c) + pathO('M87 44 C93 62 91 84 85 98 L79 92 C82 76 81 60 79 46Z', c) + stroke('M60 12 L60 37', d, 1.5);
    }
    else if (i === 13) {
      var locks = [[22, 46, 58], [31, 40, 70], [40, 36, 52], [80, 36, 52], [89, 40, 70], [98, 46, 58]];
      back = locks.map(function(p){ return rectO(p[0] - 4.5, p[1], 9, p[2], c, 4.5); }).join('') + locks.map(function(p){ return stroke('M' + (p[0] - 4) + ' ' + (p[1] + 14) + ' h8 M' + (p[0] - 4) + ' ' + (p[1] + 28) + ' h8 M' + (p[0] - 4) + ' ' + (p[1] + 42) + ' h8', d, 1.1); }).join('');
      front = pathO(CAP, c) + stroke('M46 26 Q60 20 74 26', l, 2);
    }
    else if (i === 14) front = pathO('M32 52 C20 20 38 -2 64 4 C92 2 102 30 88 52 C86 42 78 35 62 33 C44 33 36 42 32 52Z', c) + stroke('M42 18 C54 6 76 8 88 22', l, 2.4) + stroke('M48 28 C56 20 70 18 80 26', d, 1.4);
    else front = pathO(CAP, c) + stroke('M42 40 C40 30 44 20 54 14 M50 36 C48 28 50 20 57 13 M60 35 L60 13 M78 40 C80 30 76 20 66 14 M70 36 C72 28 70 20 63 13', d, 1.5);
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
    else if (i === 9) { back = pathO('M30 48 C24 4 96 4 90 48 L94 94 L72 86 L48 86 L26 94Z', c) + circO(60, 11, 10, c); front = pathO(CAP, c) + stroke('M60 14 L60 36', d, 1.6); }
    else if (i === 10) { back = circO(36, 18, 11.5, c) + circO(84, 18, 11.5, c); front = pathO(CAP, c) + stroke('M60 14 L60 36', d, 1.6) + circO(39, 27, 3.2, '#ff5d8f') + circO(81, 27, 3.2, '#ff5d8f'); }
    else if (i === 11) {
      var br = function(x){ var s = '', k; for (k = 0; k < 5; k++) s += ellO(x + (k % 2 ? 1.6 : -1.6), 54 + k * 12, 6, 8, c); return s + circO(x, 116, 3.8, '#ff5d8f'); };
      back = br(25) + br(95); front = pathO(CAP, c) + stroke('M60 14 L60 36', d, 1.6);
    }
    else if (i === 12) { back = curls([[28, 40], [24, 54], [26, 68], [34, 78], [92, 40], [96, 54], [94, 68], [86, 78]], 10, c); front = curls([[38, 30], [48, 21], [60, 18], [72, 21], [82, 30], [35, 42], [85, 42]], 10, c) + circ(54, 25, 4, l); }
    else if (i === 13) {
      back = pathO('M31 46 C18 66 34 78 24 98 C20 108 32 114 40 108 C46 104 52 106 60 106 C68 106 74 104 80 108 C88 114 100 108 96 98 C86 78 102 66 89 46 C96 10 24 10 31 46Z', c);
      front = pathO(OUT + ' C78 40 62 34 46 42 C40 46 36 50 33 52Z', c) + pathO('M35 40 C28 62 36 84 30 100 C42 90 47 70 43 46Z', c) + stroke('M50 22 Q66 14 80 24', l, 2);
    }
    else if (i === 14) { back = pathO('M88 46 C93 56 93 68 86 74 L80 62Z', c); front = pathO('M32 58 C20 6 100 4 89 46 C84 38 70 34 54 38 C46 44 40 52 36 64 L30 70Z', c) + stroke('M46 20 Q64 12 82 22', l, 2); }
    else { back = curls(ring(12, 60, 38, 29, 25), 13, c) + circ(60, 38, 31, c); front = pathO('M35 46 C32 20 88 20 85 46 C80 38 72 34 60 34 C48 34 40 38 35 46Z', c); }
  }
  if (hat){   // under a cap or beanie: only the long, hanging hair and a little at the temples shows
    var keep = {M: [12, 13], F: [0, 1, 2, 3, 4, 7, 8, 11, 12, 13, 14]}[sex].indexOf(i) >= 0;
    return {back: keep ? back : '', front: pathO('M33 53 C31 45 32 40 36 37 L41 38 C38 43 38 48 38 55Z', c) + pathO('M87 53 C89 45 88 40 84 37 L79 38 C82 43 82 48 82 55Z', c)};
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
    // hats cover the whole top of the head; the hair under them is hidden (see hair())
    if (i === 4) return pathO('M29 39 C25 -1 95 -1 91 39Z', '#2f6fed') + path('M60 8 C48 10 38 20 36 36 M60 8 C72 10 82 20 84 36', 'none', ' stroke="#1f4fb4" stroke-width="1.3" stroke-linecap="round"') + pathO('M29 36 L72 36 C86 36 97 39 101 44 C90 41 60 42 29 41Z', '#1f4fb4') + circO(60, 8, 3.2, '#fff');
    if (i === 5) return pathO('M28 40 C24 2 96 2 92 40Z', '#e8590c') + path('M44 8 L45 34 M60 5 L60 34 M76 8 L75 34', 'none', ' stroke="#c2410c" stroke-width="1.4" stroke-linecap="round"') + rectO(27.5, 31, 65, 10, '#c2410c', 5) + circO(60, 4, 6.5, '#ffd43b');
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
/* 0 = full uniform: all white (shirt or blouse with white shorts or skirt); 1 = half uniform: PE shirt with long pants; 2 = PE: PE shirt with black shorts */
var NAVY = '#222d70', NAVY2 = '#34429a', GOLD = '#f4b83a', WHITE = '#fdfdff', RED = '#e0383e', PE = '#ff7a1a', PEDK = '#c2410c', BLACK = '#2a2733', SEAM = 'rgba(140,156,214,.55)', EYEC = ['#3b2a2f', '#5a3a22', '#6b4a1f', '#2d7a8f', '#7a2f26', '#4a5560', '#2f56c9'];
function sneaker(cx, outfit){
  var accent = outfit === 0 ? '#c3cdf0' : NAVY2, lace = outfit === 0 ? '#8ea2e6' : GOLD;
  return ellO(cx, 159, 11.5, 5.8, '#fff') + path('M' + (cx - 10) + ' 158 Q' + cx + ' 150 ' + (cx + 10) + ' 158 L' + (cx + 10.5) + ' 160 L' + (cx - 10.5) + ' 160Z', accent, ' opacity=".95"') +
    stroke('M' + (cx - 7) + ' 155 L' + (cx + 5) + ' 155', lace, 1.6) + stroke('M' + (cx - 10) + ' 161 L' + (cx + 10) + ' 161', 'rgba(36,29,59,.35)', 1.4);
}
function shorts(fill, trim){
  return rectO(40, 108, 21, 32, fill, 6) + rectO(59, 108, 21, 32, fill, 6) + stroke('M60 124 L60 138', trim, 1.4) + rect(40.8, 135.5, 19, 2.2, trim, 1) + rect(59.2, 135.5, 19, 2.2, trim, 1);
}
function body(sex, outfit, skin){
  var s = [], sk = skin, fem = sex === 'F', white = outfit === 0, pants = outfit === 1, top = white ? WHITE : PE;
  s.push(ell(60, 163, 30, 4.5, 'rgba(36,29,59,.22)'));   // ground shadow
  // legs, socks, sneakers
  s.push(rectO(46, 116, 12, 40, sk, 5), rectO(62, 116, 12, 40, sk, 5));
  if (pants) s.push(rectO(44, 112, 16, 47, NAVY, 4), rectO(60, 112, 16, 47, NAVY, 4), stroke('M47.5 120 L47.5 153', '#fff', 1.8), stroke('M72.5 120 L72.5 153', '#fff', 1.8));
  else s.push(rectO(46, 144, 12, 14, '#fff', 4), rectO(62, 144, 12, 14, '#fff', 4), rect(46, 146, 12, 3, white ? '#cdd5f2' : PE, 1), rect(62, 146, 12, 3, white ? '#cdd5f2' : PE, 1));
  s.push(sneaker(52, outfit), sneaker(68, outfit));
  // short sleeves
  s.push(rectO(30, 90, 9, 28, sk, 4), rectO(81, 90, 9, 28, sk, 4), circO(34.5, 120, 5.4, sk), circO(85.5, 120, 5.4, sk), rectO(28, 77, 13, 18, top, 6), rectO(79, 77, 13, 18, top, 6));
  s.push(rect(28.6, 88, 11.8, white ? 2.2 : 3, white ? '#cdd5f2' : '#fff', 1), rect(79.6, 88, 11.8, white ? 2.2 : 3, white ? '#cdd5f2' : '#fff', 1));
  // lower garment first, then the shirt over it
  if (white && fem) s.push(pathO('M37 98 L83 98 L93 144 L27 144Z', WHITE), stroke('M47 100 L42 142 M60 100 L60 142 M73 100 L78 142', SEAM, 1.4), rect(29, 139, 62, 2.6, '#cdd5f2', 1));
  else if (white) s.push(shorts(WHITE, SEAM));
  else if (!pants) s.push(shorts(BLACK, '#5a566d'));
  s.push(rectO(38, 76, 44, white && fem ? 30 : 42, top, 10));
  s.push(rect(54, 70, 12, 12, sk), stroke('M54 71 L54 80 M66 71 L66 80', INK, 1.5));
  if (white){
    // collar, button placket, chest pocket with a small crest, soft shading down one side
    s.push(path('M72 80 Q81 84 80 102 L80 112 L72 112Z', 'rgba(150,165,215,.22)'));
    s.push(path('M49 76 L60 92 L53.5 79Z', '#fff', ' stroke="' + INK + '" stroke-width="1.2" stroke-linejoin="round"'), path('M71 76 L60 92 L66.5 79Z', '#fff', ' stroke="' + INK + '" stroke-width="1.2" stroke-linejoin="round"'));
    s.push(stroke('M60 92 L60 ' + (fem ? 104 : 114), SEAM, 1.5), circ(60, 97, 1.5, '#c3cdf0'), circ(60, 104, 1.5, '#c3cdf0'), fem ? '' : circ(60, 111, 1.5, '#c3cdf0'));
    s.push(path('M43 91 L53 91 L53 100 Q48 104 43 100Z', '#fff', ' stroke="#9fb0e6" stroke-width="1.3" stroke-linejoin="round"'), circ(48, 95.5, 2.1, NAVY2), circ(48, 95.5, .8, GOLD));
  } else {
    // PE shirt: crew neck, stripe across the chest, zig-zag logo
    s.push(path('M52 76 C56 85 64 85 68 76 L66 76 C62 81 58 81 54 76Z', PEDK), rect(46, 96, 28, 3.6, 'rgba(255,255,255,.85)', 1.8), path('M52 105 L56 99 L60 105 L64 99 L68 105', 'none', ' stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity=".9"'));
    s.push(path('M72 80 Q81 84 80 102 L80 114 L72 114Z', 'rgba(120,40,0,.14)'));
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
  var hat = sex === 'M' && (cfg.acc === 4 || cfg.acc === 5), h = hair(sex, cfg.hair % HAIR_NAMES[sex].length, hc, hat);
  var vb = opts.bust ? '14 6 92 96' : '0 0 120 168';
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + vb + '" role="img" aria-label="' + (opts.label || 'Character') + '">' +
    h.back + body(sex, cfg.outfit % 3, skin) + face(skin, hc, cfg.hairc) + h.front + acc(sex, cfg.acc) + '</svg>';
}
function randomCfg(seed){
  var h = 2166136261; String(seed).split('').forEach(function(c){ h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }); h >>>= 0;
  return {sex: h % 2 ? 'F' : 'M', outfit: (h >>> 3) % 3, hair: (h >>> 5) % 16, acc: ((h >>> 9) % 11) - 1, skin: (h >>> 13) % 5, hairc: (h >>> 16) % 7};
}
window.GQAvatar = {SKIN: SKIN, HAIRC: HAIRC, OUTFITS: OUTFITS, HAIR_NAMES: HAIR_NAMES, ACC_NAMES: ACC_NAMES, svg: svg, randomCfg: randomCfg};
})();
