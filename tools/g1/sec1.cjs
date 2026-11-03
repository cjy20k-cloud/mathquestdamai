/* G1 (Normal Technical) Sec 1 generators for the gyms that did not have a bank yet: Ch2 Four Operations (multiply, divide,
   order of operations), Ch3 Ratio, Ch4 Percentage, Ch5 Algebra and Number Sequences, Ch6 Angles, Ch7 Statistics, Ch8 Symmetry,
   Ch9 Area and Perimeter, Ch10 Surface Area and Volume.
   Sec 1 banks are 20 multiple choice with 5 word problems. The scope follows the TLG G1 Book 1A/1B chapters and the G1 worksheets
   in the Shinglee folder; the numbers are kept small. Every answer is computed from the question's own numbers. */
'use strict';
module.exports = function(H){
  const {N, mcq, gcd, sp, sg} = H;
  const U = s => v => H.numText(v) + ' ' + s;
  const dol = v => '\\$' + (Number.isInteger(+v) ? sp(+v) : (+v).toFixed(2));
  const deg = v => v + '°', cm = U('cm'), cm2 = U('cm²'), cm3 = U('cm³'), m2 = U('m²');
  const gyms = [];

  /* ---- Multiplying and dividing whole numbers ---- */
  gyms.push({id: 'G1.1.four-operations.2', plain: [
    r => { const a = r.int(12, 49), b = r.int(3, 9); return N(`Find ${a} × ${b}.`, a * b, `${a} × ${b} = ${a * b}.`, {wr: [a * b + 10, a * b - 10, a + b, a * b + b]}); },
    r => { const q = r.int(12, 49), d = r.int(3, 9); return N(`Find ${sp(q * d)} ÷ ${d}.`, q, `${q * d} ÷ ${d} = ${q}.`, {wr: [q + 1, q - 1, q + 10, q * 2]}); },
    r => { const k = r.int(3, 9), m = r.int(6, 12); return N(`Find the missing number: ? × ${k} = ${k * m}.`, m, `${k * m} ÷ ${k} = ${m}.`, {wr: [k * m - k, m + 1, k + m, m - 1]}); },
    r => { const d = r.int(3, 9), q = r.int(8, 20), rem = r.int(1, d - 1); return N(`What is the remainder when ${q * d + rem} is divided by ${d}?`, rem, `${q * d + rem} = ${d} × ${q} + ${rem}, so the remainder is ${rem}.`, {wr: [rem + 1, q, d - rem, 0]}); },
    r => { const a = r.int(12, 99), k = r.pick([10, 100]); return N(`Find ${a} × ${k}.`, a * k, `Multiplying by ${k} adds ${k === 10 ? 'one zero' : 'two zeros'}: ${a * k}.`, {wr: [a * k / 10, a * k * 10, a + k, a * k + a]}); },
    r => { const d = r.int(4, 9), q = r.int(5, 12); return N(`How many ${d}s are there in ${d * q}?`, q, `${d * q} ÷ ${d} = ${q}.`, {wr: [q + 1, q - 1, d, d * q - d]}); },
    r => { const a = r.int(100, 300), b = r.int(2, 5); return N(`Find ${a} × ${b}.`, a * b, `${a} × ${b} = ${a * b}.`, {wr: [a * b + 100, a * b - 100, a + b, a * b + b * 10]}); },
    r => { const a = r.int(11, 30), b = r.int(11, 25); return N(`Find ${a} × ${b}.`, a * b, `${a} × ${b} = ${a * b}.`, {wr: [a * b + 10, a * b - 10, a * b + a, a + b]}); }
  ], word: [
    r => { const p = r.int(4, 9), n = r.int(6, 15); return N(`A box holds ${p} pens. How many pens are in ${n} boxes?`, p * n, `${p} × ${n} = ${p * n}.`, {wr: [p + n, p * n + p, p * n - p, p * n + 10]}); },
    r => { const p = r.int(4, 8), n = r.int(5, 15); return N(`${sp(p * n)} sweets are shared equally among ${p} children. How many sweets does each child get?`, n, `${p * n} ÷ ${p} = ${n}.`, {wr: [n + 1, n - 1, p, n + p]}); },
    r => { const c = r.int(3, 9), n = r.int(8, 20); return N(`A packet of rice costs \\$${c}. How much do ${n} packets cost, in dollars?`, c * n, `${c} × ${n} = ${c * n}.`, {wr: [c + n, c * n + c, c * n - c, c * n + 10], f: dol}); },
    r => { const s = r.int(5, 9), rows = r.int(8, 15); return N(`A hall has ${rows} rows of chairs with ${s * 2} chairs in each row. How many chairs are there altogether?`, rows * s * 2, `${rows} × ${s * 2} = ${rows * s * 2}.`, {wr: [rows * s, rows + s * 2, rows * s * 2 + s, rows * s * 2 - 10]}); }
  ]});

  /* ---- Order of operations ---- */
  gyms.push({id: 'G1.1.four-operations.3', plain: [
    r => { const a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 9); return N(`Find ${a} + ${b} × ${c}.`, a + b * c, `Multiply first: ${b} × ${c} = ${b * c}. Then ${a} + ${b * c} = ${a + b * c}.`, {wr: [(a + b) * c, a + b + c, a * b + c, a + b * c + a]}); },
    r => { const a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 9); return N(`Find (${a} + ${b}) × ${c}.`, (a + b) * c, `Brackets first: ${a} + ${b} = ${a + b}. Then ${a + b} × ${c} = ${(a + b) * c}.`, {wr: [a + b * c, a + b + c, (a + b) * c + c, (a + b) * c - a]}); },
    r => { const q = r.int(2, 9), d = r.int(2, 5), a = r.int(20, 40); return N(`Find ${a} − ${q * d} ÷ ${d}.`, a - q, `Divide first: ${q * d} ÷ ${d} = ${q}. Then ${a} − ${q} = ${a - q}.`, {wr: [(a - q * d) / d, a - q * d, a - q + d, a + q]}); },
    r => { const a = r.int(2, 6), b = r.int(2, 6), c = r.int(1, 9); return N(`Find ${a} × (${b} + ${c}) − ${a}.`, a * (b + c) - a, `Brackets: ${b} + ${c} = ${b + c}. ${a} × ${b + c} = ${a * (b + c)}. Then − ${a} = ${a * (b + c) - a}.`, {wr: [a * b + c - a, a * (b + c), a * (b + c) + a, a * b + a * c + a]}); },
    r => { const a = r.int(2, 6), b = r.int(2, 6), c = r.int(2, 6), d = r.int(2, 6); return N(`Find ${a} × ${b} + ${c} × ${d}.`, a * b + c * d, `${a} × ${b} = ${a * b} and ${c} × ${d} = ${c * d}. The sum is ${a * b + c * d}.`, {wr: [a * (b + c) * d, a + b + c + d, a * b * c * d, a * b + c * d + 2]}); },
    r => { const a = r.int(24, 40), b = r.int(2, 5), c = r.int(2, 6); return N(`Find ${a} − (${b} + ${c}) × 2.`, a - (b + c) * 2, `Brackets: ${b + c}. ${b + c} × 2 = ${(b + c) * 2}. ${a} − ${(b + c) * 2} = ${a - (b + c) * 2}.`, {wr: [(a - b - c) * 2, a - b - c * 2, a - (b + c), a - (b + c) * 2 + 2]}); },
    r => { const d = r.int(2, 5), q = r.int(2, 8), a = r.int(2, 9); return N(`Find ${d * q} ÷ ${d} + ${a} × 3.`, q + a * 3, `${d * q} ÷ ${d} = ${q} and ${a} × 3 = ${a * 3}. The sum is ${q + a * 3}.`, {wr: [(q + a) * 3, d * q / (d + a) * 3, q + a + 3, q + a * 3 + 1]}); },
    r => { const a = r.int(2, 5), b = r.int(2, 5); return N(`Find ${a} + ${b} × ${a} − ${b}.`, a + b * a - b, `Multiply first: ${b} × ${a} = ${b * a}. Then ${a} + ${b * a} − ${b} = ${a + b * a - b}.`, {wr: [(a + b) * a - b, a + b * (a - b), a + b * a + b, a * b]}); }
  ], word: [
    r => { const p = r.int(2, 6), n = r.int(3, 6), b = r.int(4, 9); return N(`Mei buys ${n} pens at \\$${p} each and a book for \\$${b}. How much does she spend altogether, in dollars?`, p * n + b, `${n} × ${p} + ${b} = ${p * n + b}.`, {wr: [(p + b) * n, p * n * b, p + n + b, p * n + b + p], f: dol}); },
    r => { const c = r.int(3, 7), n = r.int(4, 8), pay = c * n + r.int(2, 9) * 5 - 0; return N(`Ali buys ${n} cakes at \\$${c} each. He pays with a \\$${Math.ceil(c * n / 10) * 10 + 10} note. How much change does he get, in dollars?`, Math.ceil(c * n / 10) * 10 + 10 - c * n, `Cost = ${n} × ${c} = ${c * n}. Change = ${Math.ceil(c * n / 10) * 10 + 10} − ${c * n} = ${Math.ceil(c * n / 10) * 10 + 10 - c * n}.`, {wr: [c * n, Math.ceil(c * n / 10) * 10 + 10 + c * n, Math.ceil(c * n / 10) * 10 + 10 - c, Math.ceil(c * n / 10) * 10 - c * n], f: dol}); },
    r => { const a = r.int(2, 5), b = r.int(3, 8), c = r.int(2, 6); return N(`A shop sells ${a} boxes of eggs with ${b * 2} eggs in each box. Then ${c} eggs break. How many good eggs are left?`, a * b * 2 - c, `${a} × ${b * 2} − ${c} = ${a * b * 2 - c}.`, {wr: [a * b * 2 + c, (a * b * 2 - c) * 2, a * (b * 2 - c), a * b * 2 - c + a]}); }
  ]});

  /* ---- Equivalent ratios ---- */
  gyms.push({id: 'G1.1.ratio.2', plain: [
    r => { const a = r.int(1, 6), b = r.int(a + 1, 9), k = r.int(2, 9); return N(`Find the missing number: ${a} : ${b} = ${a * k} : ?`, b * k, `Multiply both numbers by ${k}: ${b} × ${k} = ${b * k}.`, {wr: [b + k, b * k + k, a * k + b, b * k - 1]}); },
    r => { const a = r.int(1, 6), b = r.int(a + 1, 9), k = r.int(2, 9); return N(`Find the missing number: ${a} : ${b} = ? : ${b * k}.`, a * k, `Multiply both numbers by ${k}: ${a} × ${k} = ${a * k}.`, {wr: [a + k, a * k + k, a * k - 1, b * k - a]}); },
    r => { let p = r.int(1, 6), q = r.int(2, 8); while (p === q || gcd(p, q) !== 1){ p = r.int(1, 6); q = r.int(2, 8); } const k = r.int(2, 6); return mcq(r, `Which ratio is equal to ${p} : ${q}?`, `${p * k} : ${q * k}`, [`${p * k} : ${q * k + 1}`, `${p + k} : ${q}`, `${p + k} : ${q + k}`, `${q * k} : ${p * k}`], `Multiply both numbers by ${k}: ${p * k} : ${q * k}.`); },
    r => { let g, p, q; do { g = r.int(2, 9); p = r.int(1, 7); q = r.int(2, 8); } while (p === q || gcd(p, q) !== 1); return mcq(r, `Express ${g * p} : ${g * q} in its simplest form.`, `${p} : ${q}`, [`${q} : ${p}`, `${p} : ${q + 1}`, `${g * p} : ${q}`, `${p + 1} : ${q}`], `Divide both numbers by ${g}: ${p} : ${q}.`); },
    r => { const p = r.int(2, 5), q = r.int(p + 1, 8), k = r.int(3, 9); if (gcd(p, q) !== 1) return null; return N(`The ratio of red beads to blue beads is ${p} : ${q}. There are ${q * k} blue beads. How many red beads are there?`, p * k, `${q} parts = ${q * k}, so 1 part = ${k}. Red beads = ${p} × ${k} = ${p * k}.`, {wr: [q * k - p, p * k + k, q * k, p + k]}); },
    r => { const p = r.int(2, 5), q = r.int(p + 1, 8), k = r.int(3, 9); if (gcd(p, q) !== 1) return null; return N(`The ratio of boys to girls is ${p} : ${q}. There are ${p * k} boys. How many girls are there?`, q * k, `${p} parts = ${p * k}, so 1 part = ${k}. Girls = ${q} × ${k} = ${q * k}.`, {wr: [q * k - k, q + k, p * k + q, q * k + k]}); },
    r => { const a = r.pick([20, 30, 40, 50]), b = r.pick([1, 2]); return mcq(r, `Express ${a} cm : ${b} m in its simplest form.`, `${a / gcd(a, b * 100)} : ${b * 100 / gcd(a, b * 100)}`, [`${a} : ${b}`, `${a * 100} : ${b}`, `${a / gcd(a, b * 10)} : ${b * 10 / gcd(a, b * 10)}`, `${b * 100} : ${a}`], `Change to the same unit: ${b} m = ${b * 100} cm. Then simplify ${a} : ${b * 100}.`); },
    r => { const a = r.int(2, 6), b = r.int(a + 1, 9), k = r.int(2, 6); return N(`Find the missing number: ${a * k} : ${b * k} = ? : ${b}.`, a, `Divide both numbers by ${k}: ${a * k} ÷ ${k} = ${a}.`, {wr: [a + k, a * k, b, a + 1]}); }
  ], word: [
    r => { const f = r.int(2, 4), m = r.int(3, 6), k = r.int(2, 4); return N(`A recipe uses ${f} cups of flour for ${m} muffins. How many cups of flour are needed for ${m * k} muffins?`, f * k, `${m * k} muffins is ${k} times as many, so flour = ${f} × ${k} = ${f * k} cups.`, {wr: [f + k, f * k + f, f * m, f * k - 1]}); },
    r => { const a = r.int(2, 4), b = r.int(3, 6), k = r.int(3, 8); if (gcd(a, b) !== 1) return null; return N(`Paint is made by mixing blue and white in the ratio ${a} : ${b}. How many litres of white paint are mixed with ${a * k} litres of blue paint?`, b * k, `${a} parts = ${a * k} litres, so 1 part = ${k}. White = ${b} × ${k} = ${b * k} litres.`, {wr: [b * k - a, a * k + b, b + k, b * k + k]}); },
    r => { const a = r.int(2, 5), b = r.int(a + 1, 8), k = r.int(2, 9); if (gcd(a, b) !== 1) return null; return N(`The ratio of Ali's age to his father's age is ${a} : ${b}. Ali is ${a * k} years old. How old is his father?`, b * k, `${a} parts = ${a * k}, so 1 part = ${k}. Father = ${b} × ${k} = ${b * k} years.`, {wr: [b * k - k, a * k + b, b + k, b * k + k]}); }
  ]});

  /* ---- Sharing in a ratio ---- */
  gyms.push({id: 'G1.1.ratio.3', plain: [
    r => { const p = r.int(1, 5), q = r.int(2, 7), k = r.int(2, 9); if (p === q) return null; return N(`Share \\$${(p + q) * k} in the ratio ${p} : ${q}. How much is the smaller share, in dollars?`, Math.min(p, q) * k, `Total parts = ${p + q}. 1 part = ${(p + q) * k} ÷ ${p + q} = ${k}. Smaller share = ${Math.min(p, q)} × ${k} = ${Math.min(p, q) * k}.`, {wr: [Math.max(p, q) * k, (p + q) * k / 2, Math.min(p, q) * k + k, k], f: dol}); },
    r => { const p = r.int(1, 5), q = r.int(2, 7), k = r.int(2, 9); if (p === q) return null; return N(`Share \\$${(p + q) * k} in the ratio ${p} : ${q}. How much is the larger share, in dollars?`, Math.max(p, q) * k, `Total parts = ${p + q}. 1 part = ${k}. Larger share = ${Math.max(p, q)} × ${k} = ${Math.max(p, q) * k}.`, {wr: [Math.min(p, q) * k, (p + q) * k / 2, Math.max(p, q) * k + k, k], f: dol}); },
    r => { const p = r.int(1, 4), q = r.int(2, 5), s = r.int(2, 6), k = r.int(2, 6); if (p === q || q === s) return null; return N(`Share ${(p + q + s) * k} sweets in the ratio ${p} : ${q} : ${s}. How many sweets does the person with the biggest share get?`, Math.max(p, q, s) * k, `Total parts = ${p + q + s}. 1 part = ${k}. Biggest share = ${Math.max(p, q, s)} × ${k} = ${Math.max(p, q, s) * k}.`, {wr: [Math.min(p, q, s) * k, (p + q + s) * k / 3, Math.max(p, q, s) * k + k, k]}); },
    r => { const p = r.int(1, 5), q = r.int(2, 7), k = r.int(2, 9); if (p === q) return null; return N(`The ratio of A to B is ${p} : ${q}. A gets ${p * k}. How much is shared in total?`, (p + q) * k, `1 part = ${p * k} ÷ ${p} = ${k}. Total = ${p + q} × ${k} = ${(p + q) * k}.`, {wr: [q * k, p * k + q, (p + q) * k + k, (p + q) + k]}); },
    r => { const p = r.int(1, 5), q = r.int(p + 1, 8), k = r.int(2, 9); return N(`The ratio of A to B is ${p} : ${q}. The difference between their shares is ${(q - p) * k}. How much does B get?`, q * k, `The difference is ${q - p} parts = ${(q - p) * k}, so 1 part = ${k}. B gets ${q} × ${k} = ${q * k}.`, {wr: [p * k, (q - p) * k + k, q * k + k, (p + q) * k]}); },
    r => { const k = r.int(3, 9); return N(`Two numbers are in the ratio 1 : 2. Their sum is ${3 * k}. Find the larger number.`, 2 * k, `3 parts = ${3 * k}, so 1 part = ${k}. Larger = 2 × ${k} = ${2 * k}.`, {wr: [k, 3 * k, 2 * k + 1, 2 * k - 1]}); },
    r => { const p = r.int(2, 5), q = r.int(3, 7), k = r.int(2, 8); if (p === q) return null; return N(`Share ${(p + q) * k} minutes in the ratio ${p} : ${q}. Find the first part, in minutes.`, p * k, `1 part = ${k} minutes. First part = ${p} × ${k} = ${p * k} minutes.`, {wr: [q * k, p * k + k, (p + q) * k / 2, k]}); },
    r => { const k = r.int(2, 9), p = r.pick([3, 4, 5]); return N(`Divide ${(p + 1) * k} into two parts in the ratio ${p} : 1. Find the smaller part.`, k, `${p + 1} parts = ${(p + 1) * k}, so 1 part = ${k}.`, {wr: [p * k, (p + 1) * k / 2, k + 1, k - 1]}); }
  ], word: [
    r => { const p = r.int(2, 5), q = r.int(3, 7), k = r.int(3, 9); if (p === q) return null; return N(`Ali and Ben share \\$${(p + q) * k} in the ratio ${p} : ${q}. How much does Ben get, in dollars?`, q * k, `1 part = ${(p + q) * k} ÷ ${p + q} = ${k}. Ben gets ${q} × ${k} = ${q * k}.`, {wr: [p * k, (p + q) * k / 2, q * k + k, k], f: dol}); },
    r => { const a = r.int(2, 4), b = r.int(3, 6), k = r.int(3, 8); if (a === b) return null; return N(`A farm has ${(a + b) * k} animals. The ratio of chickens to ducks is ${a} : ${b}. How many ducks are there?`, b * k, `1 part = ${k}. Ducks = ${b} × ${k} = ${b * k}.`, {wr: [a * k, (a + b) * k / 2, b * k + k, k]}); },
    r => { const a = r.int(1, 3), b = r.int(2, 4), c = r.int(3, 5), k = r.int(2, 6); if (a === b || b === c) return null; return N(`Three friends share \\$${(a + b + c) * k} in the ratio ${a} : ${b} : ${c}. How much does the friend with the smallest share get, in dollars?`, a * k, `1 part = ${k}. Smallest share = ${a} × ${k} = ${a * k}.`, {wr: [c * k, (a + b + c) * k / 3, a * k + k, k], f: dol}); }
  ]});

  /* ---- Percentage ---- */
  gyms.push({id: 'G1.1.percentage.1', plain: [
    r => { const p = r.pick([10, 20, 25, 50, 75]), v = r.int(2, 10) * 20; return N(`Find ${p}% of ${v}.`, p * v / 100, `${p}% of ${v} = ${p}/100 × ${v} = ${p * v / 100}.`, {wr: [p * v / 10, v - p * v / 100, p + v, p * v / 1000]}); },
    r => { const b = r.pick([20, 25, 40, 50, 100, 200]), p = r.pick([10, 20, 25, 30, 40, 50]); const a = b * p / 100; return N(`Express ${a} as a percentage of ${b}.`, p, `${a}/${b} × 100% = ${p}%.`, {wr: [a, 100 - p, p * 2, p + 10], f: v => v + '%'}); },
    r => { const p = r.pick([5, 8, 12, 15, 24, 35]); const d = {5: '0.05', 8: '0.08', 12: '0.12', 15: '0.15', 24: '0.24', 35: '0.35'}[p]; return mcq(r, `Write ${p}% as a decimal.`, d, [String(p / 10), String(p), String(p / 1000)], `${p}% = ${p}/100 = ${d}.`); },
    r => mcq(r, 'Which fraction is equal to 50%?', '$\\dfrac{1}{2}$', ['$\\dfrac{1}{5}$', '$\\dfrac{1}{4}$', '$\\dfrac{5}{100}$'], '50% = 50/100 = 1/2.'),
    r => { const v = r.int(2, 9) * 20, p = r.pick([10, 20, 25]); return N(`Increase ${v} by ${p}%.`, v + p * v / 100, `${p}% of ${v} = ${p * v / 100}. ${v} + ${p * v / 100} = ${v + p * v / 100}.`, {wr: [p * v / 100, v - p * v / 100, v + p, v + p * v / 10]}); },
    r => { const v = r.int(2, 9) * 20, p = r.pick([10, 20, 25]); return N(`Decrease ${v} by ${p}%.`, v - p * v / 100, `${p}% of ${v} = ${p * v / 100}. ${v} − ${p * v / 100} = ${v - p * v / 100}.`, {wr: [p * v / 100, v + p * v / 100, v - p, v - p * v / 10]}); },
    r => { const n = r.int(2, 9), d = r.pick([4, 5, 10, 20]); if (n >= d) return null; return N(`Write $\\dfrac{${n}}{${d}}$ as a percentage.`, n / d * 100, `${n} ÷ ${d} × 100 = ${n / d * 100}%.`, {wr: [n / d * 10, n, d * n, n / d * 100 + 10], f: v => v + '%'}); },
    r => { const p = r.pick([10, 20, 25, 50]), part = r.int(2, 9) * 5; return N(`${p}% of a number is ${part}. Find the number.`, part * 100 / p, `${part} ÷ ${p} × 100 = ${part * 100 / p}.`, {wr: [part * p / 100, part + p, part * 10, part * 100 / p + 10]}); }
  ], word: [
    r => { const t = r.pick([20, 25, 40, 50]), m = r.int(2, 9) * t / 10; return N(`Wei scored ${m} out of ${t} in a test. What is his score as a percentage?`, m * 100 / t, `${m}/${t} × 100% = ${m * 100 / t}%.`, {wr: [m, 100 - m * 100 / t, m * 100 / t + 10, t], f: v => v + '%'}); },
    r => { const o = r.pick([20, 40, 50, 80, 100, 200]), p = r.pick([10, 20, 25, 50]); return N(`A bag costs \\$${o}. It is sold at a ${p}% discount. What is the sale price, in dollars?`, o - o * p / 100, `Discount = ${p}% of ${o} = ${o * p / 100}. Sale price = ${o} − ${o * p / 100} = ${o - o * p / 100}.`, {wr: [o * p / 100, o + o * p / 100, o - p, o - o * p / 10], f: dol}); },
    r => { const n = r.pick([100, 200, 400, 500]), p = r.pick([10, 20, 25, 40]); return N(`A school has ${n} students. ${p}% of them walk to school. How many students walk to school?`, n * p / 100, `${p}% of ${n} = ${n * p / 100}.`, {wr: [n - n * p / 100, p, n * p / 10, n + p]}); },
    r => { const v = r.int(2, 9) * 100, g = 9; return N(`GST is ${g}%. Find the GST on an item priced \\$${v} before GST, in dollars.`, v * g / 100, `${g}% of ${v} = ${v * g / 100}.`, {wr: [v * g / 10, v + g, v * g / 1000, v * g], f: dol}); }
  ]});

  /* ---- Algebra and number sequences ---- */
  gyms.push({id: 'G1.1.algebra.1', plain: [
    r => { const a = r.int(2, 9), b = r.int(1, 9), x = r.int(2, 8); return N(`Find the value of $${a}x + ${b}$ when $x = ${x}$.`, a * x + b, `${a} × ${x} + ${b} = ${a * x + b}.`, {wr: [a + x + b, a * (x + b), a * x - b, a * x + b + a]}); },
    r => { const a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 9); return mcq(r, `Simplify $${a}x + ${b}x + ${c}x$.`, `$${a + b + c}x$`, [`$${a * b * c}x$`, `$${a + b + c}x^3$`, `$${a + b + c}$`, `$${a + b}x + ${c}$`], `Add the numbers in front of x: ${a} + ${b} + ${c} = ${a + b + c}.`); },
    r => { const a = r.int(3, 9), b = r.int(1, 8), c = r.int(1, 8), d = r.int(1, 8); return mcq(r, `Simplify $${a}x + ${b} + ${c}x + ${d}$.`, `$${a + c}x + ${b + d}$`, [`$${a + c}x + ${b * d}$`, `$${a + c + b + d}x$`, `$${a * c}x + ${b + d}$`, `$${a + c}x - ${b + d}$`], 'Add the x terms together and the numbers together.'); },
    r => { const a = r.int(2, 9), k = r.int(2, 9), n = r.int(4, 8); return N(`The $n$th term of a sequence is $${k}n + ${a}$. Find the ${n}th term.`, k * n + a, `${k} × ${n} + ${a} = ${k * n + a}.`, {wr: [k + n + a, k * n - a, k * (n + a), k * n + a + k]}); },
    r => { const a = r.int(1, 15), d = r.int(2, 9); return N(`Find the next term of the sequence ${a}, ${a + d}, ${a + 2 * d}, ${a + 3 * d}, …`, a + 4 * d, `The common difference is ${d}, so the next term is ${a + 3 * d} + ${d} = ${a + 4 * d}.`, {wr: [a + 4 * d + 1, a + 5 * d, a + 4 * d - 1, a + 3 * d + 2]}); },
    r => { const a = r.int(2, 9), b = r.int(2, 9); return mcq(r, `Which expression means "${a} more than $n$ multiplied by ${b}"?`, `$${b}n + ${a}$`, [`$${b}(n + ${a})$`, `$${a}n + ${b}$`, `$${a + b}n$`, `$n + ${a + b}$`], `${b} multiplied by n is ${b}n, and ${a} more than that is ${b}n + ${a}.`); },
    r => { const a = r.int(2, 6), p = r.int(1, 6), q = r.int(1, 6); return N(`Find the value of $${a}p - q$ when $p = ${p + 3}$ and $q = ${q}$.`, a * (p + 3) - q, `${a} × ${p + 3} − ${q} = ${a * (p + 3) - q}.`, {wr: [a * (p + 3) + q, a + p + 3 - q, a * (p + 3 - q), a * (p + 3)]}); },
    r => { const a = r.int(50, 90), d = r.int(3, 8); return N(`Find the next term of the sequence ${a}, ${a - d}, ${a - 2 * d}, ${a - 3 * d}, …`, a - 4 * d, `The common difference is −${d}, so the next term is ${a - 3 * d} − ${d} = ${a - 4 * d}.`, {wr: [a - 4 * d + 1, a - 5 * d, a - 4 * d - 1, a - 3 * d + d]}); }
  ], word: [
    r => { const p = r.int(2, 7), n = r.int(3, 9), b = r.int(2, 8); return N(`A pen costs \\$${p} and a ruler costs \\$${b}. Find the cost of ${n} pens and 2 rulers, in dollars.`, p * n + 2 * b, `${p} × ${n} + 2 × ${b} = ${p * n + 2 * b}.`, {wr: [(p + b) * n, p * n + b, p + n + 2 * b, p * n + 2 * b + p], f: dol}); },
    r => { const k = r.int(2, 5), n = r.int(5, 9); return N(`Matchsticks are used to make a row of squares. The number of matchsticks for $n$ squares is $${3}n + 1$. How many matchsticks are needed for ${n} squares?`, 3 * n + 1, `3 × ${n} + 1 = ${3 * n + 1}.`, {wr: [3 * n, 4 * n, 3 * n + 2, 3 * n - 1]}); },
    r => { const s = r.int(20, 50), w = r.int(5, 12), n = r.int(4, 9); return N(`Mei has \\$${s} and saves \\$${w} each week. How much money does she have after ${n} weeks, in dollars?`, s + w * n, `${s} + ${w} × ${n} = ${s + w * n}.`, {wr: [w * n, s + w + n, s + w * (n + 1), s + w * (n - 1)], f: dol}); },
    r => { const a = r.int(2, 5), n = r.int(6, 12); return N(`Ali is $x$ years old. His mother is $(${a}x + 5)$ years old. Find his mother's age when $x = ${n}$.`, a * n + 5, `${a} × ${n} + 5 = ${a * n + 5}.`, {wr: [a + n + 5, a * (n + 5), a * n - 5, a * n + 5 + a]}); }
  ]});

  /* ---- Angles ---- */
  gyms.push({id: 'G1.1.angles.1', plain: [
    r => { const a = r.int(20, 80); return N(`Two angles add up to 90°. One of them is ${a}°. Find the other angle, in degrees.`, 90 - a, `90 − ${a} = ${90 - a}.`, {wr: [180 - a, a, 90 + a, 360 - a], f: deg}); },
    r => { const a = r.int(30, 150); return N(`Two angles on a straight line are ${a}° and $x$°. Find $x$.`, 180 - a, `Angles on a straight line add up to 180°: 180 − ${a} = ${180 - a}.`, {wr: [360 - a, 90 - a < 0 ? a - 90 : 90 - a, a, 180 + a], f: deg}); },
    r => { const a = r.int(60, 120), b = r.int(60, 140); return N(`Angles at a point are ${a}°, ${b}° and $x$°. Find $x$.`, 360 - a - b, `Angles at a point add up to 360°: 360 − ${a} − ${b} = ${360 - a - b}.`, {wr: [180 - a - b > 0 ? 180 - a - b : a + b - 180, a + b, 360 - a, 360 - b], f: deg}); },
    r => { const a = r.int(30, 80), b = r.int(40, 90); return N(`Two angles of a triangle are ${a}° and ${b}°. Find the third angle, in degrees.`, 180 - a - b, `Angles in a triangle add up to 180°: 180 − ${a} − ${b} = ${180 - a - b}.`, {wr: [360 - a - b, a + b, 180 - a, 90], f: deg}); },
    r => { const a = r.int(30, 150); return N(`Two straight lines cross. One angle is ${a}°. Find the angle vertically opposite to it, in degrees.`, a, 'Vertically opposite angles are equal.', {wr: [180 - a, 360 - a, 90, a + 10], f: deg}); },
    r => { const a = r.int(40, 140); return N(`AB is parallel to CD. A pair of corresponding angles are ${a}° and $x$°. Find $x$.`, a, 'Corresponding angles between parallel lines are equal.', {wr: [180 - a, 360 - a, 90, a + 10], f: deg}); },
    r => { const a = r.int(40, 140); return N(`Two co-interior angles lie between parallel lines. One of them is ${a}°. Find the other, in degrees.`, 180 - a, `Co-interior angles add up to 180°: 180 − ${a} = ${180 - a}.`, {wr: [a, 360 - a, 90, 180 + a - 90], f: deg}); },
    r => { const a = r.int(35, 80); return N(`In an isosceles triangle the two equal angles are each ${a}°. Find the third angle, in degrees.`, 180 - 2 * a, `180 − ${a} − ${a} = ${180 - 2 * a}.`, {wr: [180 - a, 2 * a, 360 - 2 * a, 90 - a], f: deg}); }
  ], word: [
    r => { const a = r.int(30, 80); return N(`A ladder leans against a vertical wall and makes an angle of ${a}° with the ground. Find the angle between the ladder and the wall, in degrees.`, 90 - a, `The wall meets the ground at 90°. 180 − 90 − ${a} = ${90 - a}.`, {wr: [180 - a, a, 90 + a, 360 - a], f: deg}); },
    r => { const a = r.int(60, 100); return N(`A triangular sign is an isosceles triangle with a top angle of ${a}°. Find one of the equal bottom angles, in degrees.`, (180 - a) / 2, `(180 − ${a}) ÷ 2 = ${(180 - a) / 2}.`, {wr: [180 - a, a / 2, (360 - a) / 2, 90 - a], f: deg}); },
    r => { const a = r.int(50, 85), b = r.int(40, 75); return N(`A triangular garden has two corners of ${a}° and ${b}°. Find the third corner, in degrees.`, 180 - a - b, `180 − ${a} − ${b} = ${180 - a - b}.`, {wr: [a + b, 360 - a - b, 180 - a, 90], f: deg}); }
  ]});

  /* ---- Statistics ---- */
  const sums = (r, n, lo, hi) => { for (let t = 0; t < 200; t++){ const a = []; for (let i = 0; i < n - 1; i++) a.push(r.int(lo, hi)); const s = a.reduce((x, y) => x + y, 0); for (let l = lo; l <= hi; l++) if ((s + l) % n === 0){ a.push(l); return r.shuffle(a); } } return null; };
  const med = a => { const b = a.slice().sort((x, y) => x - y), n = b.length; return n % 2 ? b[(n - 1) / 2] : (b[n / 2 - 1] + b[n / 2]) / 2; };
  gyms.push({id: 'G1.1.statistics.1', plain: [
    r => { const n = r.int(4, 6), d = sums(r, n, 3, 15); if (!d) return null; const s = d.reduce((a, b) => a + b, 0); return N(`Find the mean of ${d.join(', ')}.`, s / n, `Mean = ${s} ÷ ${n} = ${s / n}.`, {wr: [s, s / n + 1, s / n - 1, Math.max(...d)]}); },
    r => { const d = Array.from({length: 7}, () => r.int(3, 40)); return N(`Find the median of ${d.join(', ')}.`, med(d), `In order: ${d.slice().sort((a, b) => a - b).join(', ')}. The middle value is ${med(d)}.`, {wr: [d[3], Math.max(...d), Math.min(...d), med(d) + 1]}); },
    r => { for (let t = 0; t < 50; t++){ const d = Array.from({length: 9}, () => r.int(2, 8)), c = {}; d.forEach(v => c[v] = (c[v] || 0) + 1); const m = Math.max(...Object.values(c)), ks = Object.keys(c).filter(k => c[k] === m); if (ks.length === 1 && m >= 2) return N(`Find the mode of ${d.join(', ')}.`, +ks[0], `${ks[0]} appears ${m} times, the most.`, {wr: [m, +ks[0] + 1, Math.max(...d), +ks[0] - 1]}); } return null; },
    r => { const d = Array.from({length: 8}, () => r.int(10, 60)); return N(`Find the range of ${d.join(', ')}.`, Math.max(...d) - Math.min(...d), `Range = ${Math.max(...d)} − ${Math.min(...d)} = ${Math.max(...d) - Math.min(...d)}.`, {wr: [Math.max(...d), Math.min(...d), Math.max(...d) - Math.min(...d) + 2, Math.max(...d) + Math.min(...d)]}); },
    r => { const g = r.int(2, 6), s = r.int(1, 4); return N(`In a tally chart, a category has ${g} groups of five and ${s} extra marks. What is the frequency?`, g * 5 + s, `${g} × 5 + ${s} = ${g * 5 + s}.`, {wr: [g + s, g * 4 + s, g * 5, g * 5 + s + 1]}); },
    r => { const T = r.pick([20, 30, 40, 60, 90]), k = r.int(2, 6); return N(`In a pie chart, ${k * T / 20} out of ${T} students chose football. Find the angle of the football sector, in degrees.`, k * T / 20 * 360 / T, `Angle = ${k * T / 20}/${T} × 360° = ${k * T / 20 * 360 / T}°.`, {wr: [k * T / 20, 360 - k * T / 20 * 360 / T, k * 18 / 2, k * T / 20 * 180 / T], f: deg}); },
    r => { const a = r.int(8, 25), b = r.int(8, 25), c = r.int(8, 25), d = r.int(8, 25); return N(`A table shows the numbers of students in four clubs: ${a}, ${b}, ${c} and ${d}. How many students are there in total?`, a + b + c + d, `${a} + ${b} + ${c} + ${d} = ${a + b + c + d}.`, {wr: [a + b + c + d + 1, a + b + c + d - 2, Math.max(a, b, c, d), a + b + c]}); },
    r => { const n = r.int(4, 9), m = r.int(8, 30); return N(`The mean of ${n} numbers is ${m}. Find the sum of the numbers.`, n * m, `Sum = mean × number of values = ${m} × ${n} = ${n * m}.`, {wr: [n + m, n * m - n, m, n * m + m]}); }
  ], word: [
    r => { const n = r.int(4, 6), d = sums(r, n, 40, 90); if (!d) return null; const s = d.reduce((a, b) => a + b, 0); return N(`A student scored ${d.join(', ')} in ${n} tests. Find her mean score.`, s / n, `Mean = ${s} ÷ ${n} = ${s / n}.`, {wr: [s, s / n + 1, s / n - 1, Math.max(...d)]}); },
    r => { const d = Array.from({length: 5}, () => r.int(150, 180)); return N(`The heights, in cm, of five students are ${d.join(', ')}. Find the median height, in cm.`, med(d), `In order: ${d.slice().sort((a, b) => a - b).join(', ')}. The median is ${med(d)}.`, {wr: [d[2], Math.max(...d), Math.min(...d), med(d) + 1]}); },
    r => { for (let t = 0; t < 50; t++){ const d = Array.from({length: 11}, () => r.int(5, 9)), c = {}; d.forEach(v => c[v] = (c[v] || 0) + 1); const m = Math.max(...Object.values(c)), ks = Object.keys(c).filter(k => c[k] === m); if (ks.length === 1 && m >= 3) return N(`The shoe sizes of 11 students are ${d.join(', ')}. Which shoe size is the mode?`, +ks[0], `${ks[0]} appears ${m} times, the most.`, {wr: [m, +ks[0] + 1, Math.max(...d), +ks[0] - 1]}); } return null; },
    r => { const a = r.int(20, 80), b = r.int(20, 80), c = r.int(20, 80); return N(`A shop sold ${a}, ${b} and ${c} ice creams on three days. How many ice creams were sold altogether?`, a + b + c, `${a} + ${b} + ${c} = ${a + b + c}.`, {wr: [a + b + c + 1, a + b + c - 2, Math.max(a, b, c), a + b]}); }
  ]});

  /* ---- Symmetry ---- */
  const SHAPES = [['square', 4, 4], ['rectangle', 2, 2], ['equilateral triangle', 3, 3], ['regular pentagon', 5, 5], ['regular hexagon', 6, 6], ['rhombus', 2, 2], ['isosceles triangle', 1, 1], ['kite', 1, 1], ['parallelogram', 0, 2], ['regular octagon', 8, 8]];
  gyms.push({id: 'G1.1.symmetry.1', plain: [
    r => { const s = r.pick(SHAPES); return N(`How many lines of symmetry does a ${s[0]} have?`, s[1], `A ${s[0]} has ${s[1]} line${s[1] === 1 ? '' : 's'} of symmetry.`, {wr: [s[1] + 1, s[1] + 2, Math.max(0, s[1] - 1), 4]}); },
    r => { const s = r.pick(SHAPES); return N(`What is the order of rotational symmetry of a ${s[0]}?`, s[2], `A ${s[0]} fits onto itself ${s[2]} time${s[2] === 1 ? '' : 's'} in a full turn.`, {wr: [s[2] + 1, s[2] + 2, Math.max(1, s[2] - 1), 4]}); },
    r => mcq(r, 'Which of these shapes has no line of symmetry?', 'parallelogram', ['rectangle', 'square', 'isosceles triangle'], 'A parallelogram that is not a rhombus or rectangle has no line of symmetry.'),
    r => mcq(r, 'Which letter has a vertical line of symmetry?', r.pick(['A', 'M', 'T', 'H']), r.shuffle(['F', 'G', 'R', 'S', 'P']).slice(0, 3), 'The left half of the letter is a mirror image of the right half.'),
    r => { const n = r.pick([3, 4, 5, 6, 8]); return N(`A regular polygon has ${n} sides. How many lines of symmetry does it have?`, n, `A regular polygon has as many lines of symmetry as sides: ${n}.`, {wr: [n + 1, n - 1, 2 * n, n + 2]}); },
    r => { const n = r.pick([3, 4, 5, 6, 8]); return N(`A regular polygon has ${n} sides. What is its order of rotational symmetry?`, n, `A regular polygon with ${n} sides has rotational symmetry of order ${n}.`, {wr: [n + 1, n - 1, 2 * n, 1]}); },
    r => { const n = r.pick([3, 4, 5, 6, 8, 10]); return N(`A regular polygon has ${n} sides. A turn of what angle brings it onto itself for the first time, in degrees?`, 360 / n, `360° ÷ ${n} = ${360 / n}°.`, {wr: [180 / n, 360, 360 - 360 / n, 360 / n + 10], f: deg}); },
    r => mcq(r, 'A shape has 2 lines of symmetry and rotational symmetry of order 2. Which shape could it be?', 'rectangle', ['kite', 'equilateral triangle', 'isosceles triangle'], 'A rectangle has 2 lines of symmetry and rotational symmetry of order 2.'),
    r => { const t = r.pick([['H', 2], ['O', 2], ['A', 1], ['T', 1], ['X', 2], ['E', 1], ['I', 2], ['B', 1], ['M', 1], ['D', 1]]); return N(`How many lines of symmetry does the capital letter ${t[0]} have (in a plain, block style)?`, t[1], `The letter ${t[0]} has ${t[1]} line${t[1] === 1 ? '' : 's'} of symmetry.`, {wr: [t[1] + 1, t[1] + 2, 0, 4]}); },
    r => { const n = r.pick([3, 4, 5, 6, 8]); return N(`A regular polygon has ${n} lines of symmetry. How many sides does it have?`, n, `A regular polygon has as many sides as lines of symmetry: ${n}.`, {wr: [n + 1, n - 1, 2 * n, n + 2]}); },
    r => { const n = r.pick([3, 4, 5, 6, 8, 9, 10]); return N(`A regular polygon fits exactly onto itself when turned through ${360 / n}°. How many sides does it have?`, n, `360 ÷ ${360 / n} = ${n}.`, {wr: [n + 1, n - 1, 2 * n, 360 / n]}); }
  ], word: [
    r => { const s = r.pick(SHAPES.slice(0, 5)); return N(`A tile is the shape of a ${s[0]}. How many lines of symmetry does the tile have?`, s[1], `A ${s[0]} has ${s[1]} lines of symmetry.`, {wr: [s[1] + 1, s[1] - 1, s[1] + 2, 8]}); },
    r => { const s = r.pick(SHAPES.slice(0, 5)); return N(`A signboard is a ${s[0]}. What is its order of rotational symmetry?`, s[2], `The signboard fits onto itself ${s[2]} times in a full turn.`, {wr: [s[2] + 1, s[2] - 1, s[2] + 2, 1]}); },
    r => { const n = r.pick([4, 5, 6, 8]); return N(`A coaster is a regular polygon with ${n} sides. Through what angle must it be turned to look the same again, in degrees?`, 360 / n, `360 ÷ ${n} = ${360 / n}°.`, {wr: [180 / n, 360, 360 - 360 / n, 360 / n + 10], f: deg}); }
  ]});

  /* ---- Area and perimeter ---- */
  gyms.push({id: 'G1.1.area-and-perimeter.1', plain: [
    r => { const l = r.int(5, 20), w = r.int(3, 12); return N(`A rectangle is ${l} cm long and ${w} cm wide. Find its area, in cm².`, l * w, `Area = ${l} × ${w} = ${l * w} cm².`, {wr: [2 * (l + w), l + w, l * w + l, l * w - w], f: cm2}); },
    r => { const l = r.int(5, 20), w = r.int(3, 12); return N(`A rectangle is ${l} cm long and ${w} cm wide. Find its perimeter, in cm.`, 2 * (l + w), `Perimeter = 2 × (${l} + ${w}) = ${2 * (l + w)} cm.`, {wr: [l * w, l + w, 2 * l * w, l + 2 * w], f: cm}); },
    r => { const s = r.int(4, 15); return N(`Find the area of a square of side ${s} cm, in cm².`, s * s, `Area = ${s} × ${s} = ${s * s} cm².`, {wr: [4 * s, 2 * s, s * s + s, s * s - s], f: cm2}); },
    r => { const s = r.int(4, 15); return N(`Find the perimeter of a square of side ${s} cm, in cm.`, 4 * s, `Perimeter = 4 × ${s} = ${4 * s} cm.`, {wr: [s * s, 2 * s, 4 * s + 4, 3 * s], f: cm}); },
    r => { const b = r.int(4, 14) * 2, h = r.int(3, 12); return N(`Find the area of a triangle with base ${b} cm and height ${h} cm, in cm².`, b * h / 2, `Area = ½ × ${b} × ${h} = ${b * h / 2} cm².`, {wr: [b * h, b + h, b * h / 4, b * h / 2 + b], f: cm2}); },
    r => { const b = r.int(5, 15), h = r.int(3, 10); return N(`A parallelogram has a base of ${b} cm and a height of ${h} cm. Find its area, in cm².`, b * h, `Area = ${b} × ${h} = ${b * h} cm².`, {wr: [b + h, b * h / 2, 2 * (b + h), b * h + b], f: cm2}); },
    r => { const a = r.int(4, 10), b = a + r.int(2, 6), h = r.int(2, 6) * 2; return N(`A trapezium has parallel sides of ${a} cm and ${b} cm and a height of ${h} cm. Find its area, in cm².`, (a + b) * h / 2, `Area = ½ × (${a} + ${b}) × ${h} = ${(a + b) * h / 2} cm².`, {wr: [(a + b) * h, a * b * h / 2 | 0, a + b + h, (a + b) * h / 2 + a], f: cm2}); },
    r => { const l = r.int(8, 16), w = r.int(5, 9), a = r.int(2, 4), b = r.int(2, 4); return N(`A rectangle ${l} cm by ${w} cm has a ${a} cm by ${b} cm rectangle cut out of one corner. Find the area that is left, in cm².`, l * w - a * b, `${l} × ${w} − ${a} × ${b} = ${l * w - a * b} cm².`, {wr: [l * w + a * b, l * w, 2 * (l + w), l * w - a - b], f: cm2}); }
  ], word: [
    r => { const l = r.int(6, 15), w = r.int(4, 10); return N(`A rectangular garden is ${l} m long and ${w} m wide. A fence goes all the way round it. Find the length of the fence, in m.`, 2 * (l + w), `Perimeter = 2 × (${l} + ${w}) = ${2 * (l + w)} m.`, {wr: [l * w, l + w, 2 * l * w, l + 2 * w], f: U('m')}); },
    r => { const l = r.int(5, 12), w = r.int(3, 8), c = r.int(2, 5); return N(`A rectangular floor is ${l} m by ${w} m. Tiles cost \\$${c} per m². Find the cost of tiling the floor, in dollars.`, l * w * c, `Area = ${l} × ${w} = ${l * w} m². Cost = ${l * w} × ${c} = ${l * w * c} dollars.`, {wr: [l * w, (l + w) * c, l * w + c, 2 * (l + w) * c], f: dol}); },
    r => { const s = r.int(5, 12); return N(`A square tablecloth has sides of ${s} dm. Find its area, in dm².`, s * s, `Area = ${s} × ${s} = ${s * s} dm².`, {wr: [4 * s, 2 * s, s * s + s, s * s - s], f: U('dm²')}); },
    r => { const b = r.int(5, 12) * 2, h = r.int(4, 10); return N(`A triangular flag has a base of ${b} cm and a height of ${h} cm. Find its area, in cm².`, b * h / 2, `Area = ½ × ${b} × ${h} = ${b * h / 2} cm².`, {wr: [b * h, b + h, b * h / 4, b * h / 2 + b], f: cm2}); }
  ]});

  /* ---- Volume and surface area ---- */
  gyms.push({id: 'G1.1.surface-area-and-volume.1', plain: [
    r => { const l = r.int(3, 10), w = r.int(2, 8), h = r.int(2, 7); return N(`A cuboid is ${l} cm long, ${w} cm wide and ${h} cm high. Find its volume, in cm³.`, l * w * h, `Volume = ${l} × ${w} × ${h} = ${l * w * h} cm³.`, {wr: [l + w + h, l * w + h, 2 * (l * w + w * h + l * h), l * w * h + l], f: cm3}); },
    r => { const s = r.int(2, 9); return N(`Find the volume of a cube of edge ${s} cm, in cm³.`, s ** 3, `Volume = ${s} × ${s} × ${s} = ${s ** 3} cm³.`, {wr: [s * s, 3 * s, 6 * s * s, s ** 3 + s], f: cm3}); },
    r => { const s = r.int(2, 9); return N(`Find the total surface area of a cube of edge ${s} cm, in cm².`, 6 * s * s, `A cube has 6 faces, each ${s} × ${s} = ${s * s} cm². Total = ${6 * s * s} cm².`, {wr: [s ** 3, 4 * s * s, 6 * s, s * s], f: cm2}); },
    r => { const l = r.int(3, 9), w = r.int(2, 7), h = r.int(2, 6); return N(`Find the total surface area of a cuboid ${l} cm by ${w} cm by ${h} cm, in cm².`, 2 * (l * w + w * h + l * h), `2 × (${l * w} + ${w * h} + ${l * h}) = ${2 * (l * w + w * h + l * h)} cm².`, {wr: [l * w * h, l * w + w * h + l * h, 2 * (l + w + h), 2 * l * w], f: cm2}); },
    r => { const k = r.int(2, 9); return N(`Convert ${k} litres to cm³.`, k * 1000, `1 litre = 1000 cm³, so ${k} litres = ${k * 1000} cm³.`, {wr: [k * 100, k * 10, k / 1000, k * 10000], f: cm3}); },
    r => { const b = r.int(3, 9) * 2, hh = r.int(3, 8), l = r.int(4, 10); return N(`A triangular prism has a right-angled triangle cross-section with base ${b} cm and height ${hh} cm. It is ${l} cm long. Find its volume, in cm³.`, b * hh / 2 * l, `Cross-section = ½ × ${b} × ${hh} = ${b * hh / 2} cm². Volume = ${b * hh / 2} × ${l} = ${b * hh / 2 * l} cm³.`, {wr: [b * hh * l, b * hh / 2 + l, b * hh * l / 4, b * hh / 2 * l + b], f: cm3}); },
    r => { const a = r.int(3, 8), b = r.int(2, 6), V = a * b * r.int(2, 8); return N(`A cuboid has a base ${a} cm by ${b} cm and a volume of ${V} cm³. Find its height, in cm.`, V / (a * b), `Height = ${V} ÷ ${a * b} = ${V / (a * b)} cm.`, {wr: [V / a, V / b, V / (a * b) + 1, a * b], f: cm}); },
    r => { const a = r.int(2, 6), n = r.int(2, 5); return N(`${n} cubes of edge ${a} cm are put in a row to make a cuboid. Find the volume of the cuboid, in cm³.`, n * a ** 3, `One cube has volume ${a ** 3} cm³. ${n} cubes: ${n * a ** 3} cm³.`, {wr: [a ** 3, n * a * a, (n * a) ** 3, n + a ** 3], f: cm3}); }
  ], word: [
    r => { const l = r.pick([20, 25, 30, 40]), w = r.pick([20, 25, 30]), h = r.pick([10, 20, 25, 30]); return N(`A fish tank is ${l} cm long, ${w} cm wide and ${h} cm high. How many litres of water does it hold when full? (1 litre = 1000 cm³)`, l * w * h / 1000, `Volume = ${l} × ${w} × ${h} = ${l * w * h} cm³ = ${l * w * h / 1000} litres.`, {wr: [l * w * h, l * w * h / 100, l * w * h / 10000, l + w + h], f: U('litres')}); },
    r => { const l = r.int(8, 20), w = r.int(5, 12), h = r.int(3, 8); return N(`A gift box is ${l} cm by ${w} cm by ${h} cm. Find the area of wrapping paper needed to cover it completely, in cm².`, 2 * (l * w + w * h + l * h), `2 × (${l * w} + ${w * h} + ${l * h}) = ${2 * (l * w + w * h + l * h)} cm².`, {wr: [l * w * h, l * w + w * h + l * h, 2 * l * w, 2 * (l + w + h)], f: cm2}); },
    r => { const a = r.int(10, 30), b = r.int(8, 20), h = r.int(2, 5); return N(`A swimming pool is ${a} m long, ${b} m wide and ${h} m deep. Find the volume of water in the pool when it is full, in m³.`, a * b * h, `${a} × ${b} × ${h} = ${a * b * h} m³.`, {wr: [a + b + h, a * b + h, 2 * (a * b + b * h + a * h), a * b * h + a], f: U('m³')}); }
  ]});

  return gyms;
};
