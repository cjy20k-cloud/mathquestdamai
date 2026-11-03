/* Checks every question bank:
   - every "$...$" maths segment in questions, options and worked solutions renders with KaTeX (throwOnError)
   - "$" signs are balanced
   Run from the repo root:  node gym-quest/tools/check-banks.cjs [stream-prefix, default all]  */
'use strict';
const path = require('path');
global.window = {};
const katex = require(path.join(__dirname, '..', 'vendor', 'katex', 'katex.min.js'));
require(path.join(__dirname, '..', 'js', 'banks.js'));
const B = window.GQ_BANKS, prefix = process.argv[2] || '';

function segments(raw){          // "$" opens/closes maths, "\$" is a literal dollar sign (same rule as the app's rich())
  raw = String(raw); const out = []; let buf = '', math = false;
  for (let i = 0; i < raw.length; i++){
    const ch = raw[i];
    if (ch === '\\' && raw[i + 1] === '$'){ buf += math ? '\\$' : '$'; i++; continue; }
    if (ch === '$'){ if (math && buf) out.push(buf); buf = ''; math = !math; continue; }
    buf += ch;
  }
  if (math) out.push('UNCLOSED:' + buf);
  return out;
}
let bad = 0, n = 0, qn = 0;
for (const k in B){
  if (!k.startsWith(prefix)) continue;
  for (const q of B[k]){
    qn++;
    for (const field of [q.q, q.w].concat(q.opts || [])){
      for (const m of segments(field)){
        n++;
        if (m.startsWith('UNCLOSED:')){ bad++; console.log('UNCLOSED $', q.id, m.slice(0, 70)); continue; }
        try { katex.renderToString(m.replace(/[   ]/g, '\\,'), {throwOnError: true}); }   // same space handling as the app
        catch (e){ bad++; console.log('KATEX error', q.id, '|', m.slice(0, 80), '|', e.message.slice(0, 70)); }
      }
    }
  }
}
console.log(qn + ' questions, ' + n + ' maths segments checked, ' + bad + ' problems');
process.exit(bad ? 1 : 0);
