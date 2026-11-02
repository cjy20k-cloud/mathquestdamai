/* Publishes only the app files (not tools/ or apps-script/) into dist/. Run from gym-quest/: node tools/build-site.cjs */
'use strict';
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), out = path.join(root, 'dist');
fs.rmSync(out, {recursive: true, force: true});
function copy(rel){ const s = path.join(root, rel), d = path.join(out, rel); fs.mkdirSync(path.dirname(d), {recursive: true}); fs.cpSync(s, d, {recursive: true}); }
['index.html', 'css', 'js', 'vendor'].forEach(copy);
let n = 0; (function walk(p){ for (const f of fs.readdirSync(p)){ const q = path.join(p, f); fs.statSync(q).isDirectory() ? walk(q) : n++; } })(out);
console.log('Built ' + n + ' files into gym-quest/dist');
