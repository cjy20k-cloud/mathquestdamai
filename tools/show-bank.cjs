/* Print one or more banks as plain text so the questions and answers can be proof-read.
   node gym-quest/tools/show-bank.cjs G3.1.factors-and-multiples.1 [more ids or prefixes]
   Multiple-choice questions list their options with the correct one marked *. */
global.window = {}; require('../js/banks.js');
const ids = process.argv.slice(2), B = window.GQ_BANKS;
Object.keys(B).filter(k => ids.some(i => k === i || k.startsWith(i))).forEach(k => {
  console.log('\n=== ' + k + '  (' + B[k].filter(q => q.word).length + ' word)');
  B[k].forEach((q, i) => {
    const head = (q.word ? 'W' : ' ') + String(i + 1).padStart(2) + '. ' + q.q;
    if (q.t === 'mcq') console.log(head + '\n      ' + q.opts.map((o, j) => (j === q.a ? '*' : ' ') + o).join('  |  '));
    else console.log(head + '  => ' + q.a);
  });
});
