/* Builds js/banks.js: a fixed 20-question bank for every gym that has generators below.
   Run from the repo root:  node gym-quest/tools/build-banks.cjs
   Every answer is computed from the question's own numbers, so it is right by construction;
   the build also re-checks formats (20 questions, option counts, distinct options, finite answers).

   G3 (Express) gyms use the 'typed' format instead: all 20 answers are typed, 5-6 of them word problems
   (tools/g3/*.cjs, one generator file per level; each gym gives its own plain + word templates).

   G2 (Normal Academic) gyms (tools/g2/*.cjs) follow the school level, every bank with 5 word problems:
     Sec 1 -> 20 multiple choice | Sec 2 -> 10 multiple choice + 10 typed | Sec 3/4 -> 20 typed.
   A G2 template returns N(question, answer, worked, opts) for a numeric answer (typed OR turned into 4 options with
   plausible wrong answers) or mcq(r, ...) for a multiple-choice-only question; each template may be used twice.

   Bank formats (G1, by the gym's school level):
     Sec 1  -> 20 multiple choice (4 options)
     Sec 2  -> 10 answer-blank + 10 multiple choice
     Sec 3/4-> 20 answer-blank, 5 of them word problems
   Question shape:  {id, t:'mcq'|'blank', q, opts?, a, w, word?}
     q / opts / w use "$...$" for maths and "\$" for a literal dollar sign. */
'use strict';
const fs = require('fs'), path = require('path');

/* ---------- seeded random ---------- */
function mulberry(a){ return function(){ a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function hashStr(s){ let h = 2166136261; for (const c of s){ h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
class R {
  constructor(seed){ this.f = mulberry(seed); }
  int(a, b){ return a + Math.floor(this.f() * (b - a + 1)); }
  pick(a){ return a[this.int(0, a.length - 1)]; }
  shuffle(a){ a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = this.int(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; }
}

/* ---------- builders ---------- */
const sp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');          // 4 276 (thin space)
const sg = n => n < 0 ? '−' + (-n) : String(n);                             // proper minus sign
const money = n => '\\$' + sp(n);
function mcq(r, q, correct, wrongs, w){
  const set = [String(correct)];
  for (const x of r.shuffle(wrongs)){ const s = String(x); if (!set.includes(s)) set.push(s); if (set.length === 4) break; }
  if (set.length < 4) throw new Error('not enough distinct options: ' + q);
  const opts = r.shuffle(set);
  return {t: 'mcq', q, opts, a: opts.indexOf(String(correct)), w};
}
function blank(q, a, w){ if (!Number.isFinite(a)) throw new Error('bad answer: ' + q); return {t: 'blank', q, a: +(+a).toFixed(6), w}; }
const gcd = (a, b) => b ? gcd(b, a % b) : a;
const divisors = n => { const d = []; for (let i = 1; i <= n; i++) if (n % i === 0) d.push(i); return d; };
const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
const COMPOSITES = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32, 33, 34, 35, 36, 39, 40, 45, 49, 51, 55, 57, 63, 77, 91];

/* ================= G1 Sec 1 : Numbers ================= */
const placeValue = [
  r => { const digits = r.shuffle([1,2,3,4,5,6,7,8,9]).slice(0, r.int(4, 6)); const n = +digits.join(''); const pos = r.int(0, digits.length - 1), d = digits[pos], pl = digits.length - 1 - pos;
    const wr = []; for (let p = 0; p < digits.length; p++) if (p !== pl) wr.push(sp(d * 10 ** p));
    return mcq(r, `What is the value of the digit ${d} in ${sp(n)}?`, sp(d * 10 ** pl), wr, `The digit ${d} is in the ${['ones','tens','hundreds','thousands','ten thousands','hundred thousands'][pl]} place, so its value is ${sp(d * 10 ** pl)}.`); },
  r => { const len = r.int(4, 5), set = new Set(); while (set.size < 4) set.add(r.int(10 ** (len - 1), 10 ** len - 1)); const a = [...set];
    return mcq(r, 'Which of these numbers is the largest?', sp(Math.max(...a)), a.filter(x => x !== Math.max(...a)).map(sp), 'Compare the digits from the left. The first place where they differ decides.'); },
  r => { const len = r.int(4, 5), set = new Set(); while (set.size < 4) set.add(r.int(10 ** (len - 1), 10 ** len - 1)); const a = [...set];
    return mcq(r, 'Which of these numbers is the smallest?', sp(Math.min(...a)), a.filter(x => x !== Math.min(...a)).map(sp), 'Compare the digits from the left. The first place where they differ decides.'); },
  r => { const d = [r.int(1, 9), r.int(1, 9), r.int(1, 9), r.int(1, 9)], n = d[0] * 1000 + d[1] * 100 + d[2] * 10 + d[3];
    const alt = [d[0] * 1000 + d[2] * 100 + d[1] * 10 + d[3], d[1] * 1000 + d[0] * 100 + d[2] * 10 + d[3], d[0] * 1000 + d[1] * 100 + d[3] * 10 + d[2], d[3] * 1000 + d[2] * 100 + d[1] * 10 + d[0], n + 100, n - 10];
    return mcq(r, `What number is ${d[0]} thousands + ${d[1]} hundreds + ${d[2]} tens + ${d[3]} ones?`, sp(n), alt.filter(x => x !== n && x > 999).map(sp), `${d[0] * 1000} + ${d[1] * 100} + ${d[2] * 10} + ${d[3]} = ${sp(n)}.`); },
  r => { const n2 = r.int(12, 99) * 100; return mcq(r, `How many tens are there in ${sp(n2)}?`, n2 / 10, [n2 / 100, n2, n2 * 10, n2 / 10 + 10], `${sp(n2)} \\div 10 = ${n2 / 10}.`); },
  r => { const k = r.int(2, 9) * 1000, wrongKind = r.pick(['before', 'after']);
    return wrongKind === 'before'
      ? mcq(r, `What is the number just before ${sp(k)}?`, sp(k - 1), [sp(k - 10), sp(k - 100), sp(k + 1), sp(k - 1000)], `The number before ${sp(k)} is ${sp(k)} − 1 = ${sp(k - 1)}.`)
      : mcq(r, `What is the number just after ${sp(k - 1)}?`, sp(k), [sp(k + 1), sp(k - 2), sp(k - 10), sp(k + 10)], `${sp(k - 1)} + 1 = ${sp(k)}.`); },
  r => { const digits = r.shuffle([1,2,3,4,5,6,7,8,9]).slice(0, 5), n = +digits.join('');
    return mcq(r, `Which digit is in the ten thousands place of ${sp(n)}?`, digits[0], digits.slice(1), `Reading from the left, the first digit of a 5-digit number is in the ten thousands place: ${digits[0]}.`); }
];
const factorsMultiples = [
  r => { const N = r.pick([24, 30, 36, 42, 48, 60, 72, 84, 90, 96]), ds = divisors(N).filter(x => x > 1 && x < N), c = r.pick(ds), non = []; for (let i = 5; i < N; i++) if (N % i !== 0) non.push(i);
    return mcq(r, `Which of the following is a factor of ${N}?`, c, r.shuffle(non).slice(0, 3), `${N} \\div ${c} = ${N / c}, with no remainder, so ${c} is a factor of ${N}.`); },
  r => { const k = r.int(3, 9), m = r.int(3, 12), c = k * m, wr = [c + r.int(1, k - 1), c - r.int(1, k - 1), c + 1, c - 1].filter(x => x % k !== 0 && x > 0);
    return mcq(r, `Which of the following is a multiple of ${k}?`, c, wr, `${k} \\times ${m} = ${c}, so ${c} is a multiple of ${k}.`); },
  r => mcq(r, 'Which of the following is a prime number?', r.pick(PRIMES.filter(p => p > 10)), r.shuffle(COMPOSITES.filter(x => x > 10)).slice(0, 3), 'A prime number has exactly two factors: 1 and itself. The others have more factors.'),
  r => { const N = r.pick([12, 18, 20, 24, 28, 30, 36, 40, 42, 45]), ds = divisors(N).filter(x => x > 1 && x < N), non = []; for (let i = 5; i < N; i++) if (N % i !== 0) non.push(i);
    const c = r.pick(non); return mcq(r, `Which of the following is NOT a factor of ${N}?`, c, r.shuffle(ds).slice(0, 3), `${N} \\div ${c} leaves a remainder, so ${c} is not a factor of ${N}.`); },
  r => { const N = r.pick([6, 8, 10, 12, 14, 15, 16, 18, 20, 21, 24, 28, 30, 32, 36, 40, 45, 48]), c = divisors(N).length;
    return mcq(r, `How many factors does ${N} have?`, c, [c - 1, c + 1, c + 2, c - 2].filter(x => x > 0), `The factors of ${N} are ${divisors(N).join(', ')}. That is ${c} factors.`); },
  r => { let g, p, q; do { g = r.int(2, 9); p = r.int(2, 6); q = r.int(2, 7); } while (p >= q || gcd(p, q) !== 1); const a = g * p, b = g * q;
    return mcq(r, `What is the highest common factor (HCF) of ${a} and ${b}?`, g, [g * p * q, p, q, Math.abs(a - b) === g ? g + 1 : Math.abs(a - b), g * 2].filter(x => x !== g), `The largest number that divides both ${a} and ${b} is ${g}.`); },
  r => { let g, p, q; do { g = r.int(2, 5); p = r.int(2, 5); q = r.int(2, 6); } while (p >= q || gcd(p, q) !== 1); const a = g * p, b = g * q, l = g * p * q;
    return mcq(r, `What is the lowest common multiple (LCM) of ${a} and ${b}?`, l, [a * b, g, l + g, l * 2, a + b].filter(x => x !== l), `The smallest number that both ${a} and ${b} divide into is ${l}.`); }
];
const negatives = [
  r => { const s = r.int(1, 9), d = s + r.int(2, 10), res = s - d;
    return mcq(r, `At 6 a.m. the temperature was ${s}°C. By midnight it had fallen by ${d}°C. What was the temperature at midnight?`, sg(res) + '°C', [sg(-res) + '°C', sg(s + d) + '°C', sg(-(s + d)) + '°C', sg(res + 1) + '°C'], `${s} − ${d} = ${sg(res)}.`); },
  r => { const set = new Set(); while (set.size < 4) set.add(r.int(-12, 12)); const a = [...set], m = Math.min(...a);
    return mcq(r, 'Which of these numbers is the smallest?', sg(m), a.filter(x => x !== m).map(sg), 'On a number line, the number furthest to the left is the smallest.'); },
  r => { const a = r.int(2, 12), b = r.int(a + 1, 20), res = b - a;
    return mcq(r, `Calculate (${sg(-a)}) + ${b}.`, sg(res), [sg(-res), sg(a + b), sg(-(a + b)), sg(res + 2)], `Start at ${sg(-a)} and move ${b} to the right: ${sg(-a)} + ${b} = ${res}.`); },
  r => { const a = r.int(2, 12), b = r.int(2, 12), res = a + b;
    return mcq(r, `Calculate ${a} − (${sg(-b)}).`, sg(res), [sg(a - b), sg(-res), sg(b - a), sg(res + 2)].filter(x => x !== sg(res)), `Subtracting a negative is the same as adding: ${a} + ${b} = ${res}.`); },
  r => { const a = r.int(2, 12), b = r.int(2, 12), res = -(a + b);
    return mcq(r, `Calculate ${sg(-a)} − ${b}.`, sg(res), [sg(a + b), sg(a - b), sg(b - a), sg(res - 2)], `Moving ${b} to the left of ${sg(-a)} gives ${sg(res)}.`); },
  r => { const a = r.int(2, 9), b = r.int(2, 9), neg = r.int(0, 1), res = neg ? -(a * b) : a * b, q = neg ? `(${sg(-a)}) × ${b}` : `(${sg(-a)}) × (${sg(-b)})`;
    return mcq(r, `Calculate ${q}.`, sg(res), [sg(-res), sg(a + b), sg(-(a + b)), sg(res + a)].filter(x => x !== sg(res)), neg ? 'Negative × positive = negative.' : 'Negative × negative = positive.'); },
  r => { const set = new Set(); while (set.size < 4) set.add(r.int(-9, 9)); const a = [...set], asc = a.slice().sort((x, y) => x - y), L = l => l.map(sg).join(', ');
    return mcq(r, 'Which list shows the numbers in ascending order (smallest first)?', L(asc), [L(asc.slice().reverse()), L([asc[1], asc[0], asc[2], asc[3]]), L([asc[0], asc[2], asc[1], asc[3]]), L([asc[3], asc[0], asc[1], asc[2]])], 'Ascending means from the smallest (furthest left on the number line) to the largest.'); }
];
const rounding = [
  r => { const n = r.int(1000, 99999), u = r.pick([10, 100, 1000]), c = Math.round(n / u) * u, lab = {10: 'ten', 100: 'hundred', 1000: 'thousand'}[u];
    return mcq(r, `Round ${sp(n)} to the nearest ${lab}.`, sp(c), [sp(Math.floor(n / u) * u === c ? c + u : Math.floor(n / u) * u), sp(c + u), sp(c - u), sp(Math.round(n / (u * 10)) * u * 10)], `Look at the digit to the right of the ${lab}s place. ${n % u >= u / 2 ? 'It is 5 or more, so round up' : 'It is less than 5, so round down'} to ${sp(c)}.`); },
  r => { const xi = r.int(101, 9999), x = xi / 100, c = Math.floor((xi + 5) / 10) / 10, last = xi % 10;
    return mcq(r, `Round ${x.toFixed(2)} to 1 decimal place.`, c.toFixed(1), [(c + 0.1).toFixed(1), (c - 0.1).toFixed(1), x.toFixed(2), Math.round(x).toFixed(1)], `Look at the 2nd decimal place (${last}). ${last >= 5 ? 'Round up' : 'Round down'}: ${c.toFixed(1)}.`); },
  r => { const x = r.int(10, 99) + r.int(0, 9) / 10, c = Math.round(x);
    return mcq(r, `Round ${x.toFixed(1)} to the nearest whole number.`, c, [c + 1, c - 1, Math.floor(x) === c ? c + 2 : Math.floor(x), Math.ceil(x) === c ? c + 2 : Math.ceil(x)], `Look at the first decimal digit (${String(x.toFixed(1)).slice(-1)}) to decide whether to round up or down.`); },
  r => { const a = r.int(2, 9) * 100 + r.int(-40, 40), b = r.int(2, 9) * 100 + r.int(-40, 40), e = Math.round(a / 100) * 100 + Math.round(b / 100) * 100;
    return mcq(r, `Estimate ${a} + ${b} by rounding each number to the nearest hundred.`, sp(e), [sp(a + b), sp(e + 100), sp(e - 100), sp(e + 200)].filter(x => x !== sp(e)), `${a} ≈ ${Math.round(a / 100) * 100} and ${b} ≈ ${Math.round(b / 100) * 100}, so the estimate is ${sp(e)}.`); },
  r => { const t = r.int(20, 95) * 100, n = t + r.pick([-1, 1]) * r.int(1, 49);
    return mcq(r, `Which number becomes ${sp(t)} when rounded to the nearest hundred?`, sp(n), [sp(t + 51 + r.int(0, 20)), sp(t - 51 - r.int(0, 20)), sp(t + 100 + r.int(0, 20)), sp(t - 100)], `${sp(n)} is within 50 of ${sp(t)}, so it rounds to ${sp(t)}.`); }
];
const addSub = [
  r => { const a = r.int(1200, 9800), b = r.int(1200, 9800), s = a + b; return mcq(r, `Find ${sp(a)} + ${sp(b)}.`, sp(s), [sp(s + 10), sp(s - 10), sp(s + 100), sp(s - 100)], `${sp(a)} + ${sp(b)} = ${sp(s)}.`); },
  r => { const b = r.int(1100, 4800), a = b + r.int(1300, 5000), d = a - b; return mcq(r, `Find ${sp(a)} − ${sp(b)}.`, sp(d), [sp(d + 10), sp(d - 10), sp(d + 100), sp(d - 100)], `${sp(a)} − ${sp(b)} = ${sp(d)}.`); },
  r => { const x = r.int(150, 950), s = r.int(x + 300, x + 2500); return mcq(r, `Find the missing number: ? + ${sp(x)} = ${sp(s)}.`, sp(s - x), [sp(s + x), sp(s - x + 10), sp(s - x - 10), sp(s - x + 100)], `? = ${sp(s)} − ${sp(x)} = ${sp(s - x)}.`); },
  r => { const a = r.int(120, 480), b = r.int(120, 480), c = r.int(120, 480), s = a + b + c; return mcq(r, `Find ${a} + ${b} + ${c}.`, sp(s), [sp(s + 10), sp(s - 10), sp(s + 100), sp(s - 100)], `${a} + ${b} = ${a + b}, then ${a + b} + ${c} = ${sp(s)}.`); },
  r => { const a = r.int(2500, 8500), b = r.int(1500, 6500), s = a + b; return mcq(r, `A school collected ${money(a)} in the first term and ${money(b)} in the second term. How much was collected altogether?`, money(s), [money(s + 100), money(s - 100), money(Math.abs(a - b)), money(s + 1000)], `${sp(a)} + ${sp(b)} = ${sp(s)}.`); },
  r => { const b = r.int(1200, 4800), a = b + r.int(900, 3500), d = a - b; return mcq(r, `Mr Lee has ${money(a)} and Mrs Lee has ${money(b)}. How much more does Mr Lee have?`, money(d), [money(a + b), money(d + 100), money(d - 100), money(d + 10)], `${sp(a)} − ${sp(b)} = ${sp(d)}.`); },
  r => { const a = r.int(5000, 9000), x = r.int(1000, a - 1500), y = r.int(300, a - x - 400), left = a - x - y; return mcq(r, `A shop had ${sp(a)} sweets. It sold ${sp(x)} in the morning and ${sp(y)} in the afternoon. How many sweets were left?`, sp(left), [sp(a - x), sp(a + x + y), sp(left + 100), sp(left - 100)], `${sp(a)} − ${sp(x)} − ${sp(y)} = ${sp(left)}.`); }
];
const ratios = [
  r => { let g, p, q; do { g = r.int(2, 9); p = r.int(1, 8); q = r.int(2, 9); } while (p === q || gcd(p, q) !== 1); const a = g * p, b = g * q;
    return mcq(r, `Express the ratio ${a} : ${b} in its simplest form.`, `${p} : ${q}`, [`${q} : ${p}`, `${p + 1} : ${q}`, `${p} : ${q + 1}`, g % 2 === 0 ? `${a / 2} : ${b / 2}` : `${a} : ${q}`], `Divide both numbers by ${g}: ${a} ÷ ${g} = ${p} and ${b} ÷ ${g} = ${q}.`); },
  r => { const a = r.int(1, 6), b = r.int(a + 1, 9), k = r.int(2, 9);
    return mcq(r, `Find the missing number: ${a} : ${b} = ${a * k} : ?`, b * k, [b + k, b * k + k, a * k + b, b * k - 1], `Multiply both parts of ${a} : ${b} by ${k}, so ? = ${b} × ${k} = ${b * k}.`); },
  r => { let g, p, q; do { g = r.int(2, 8); p = r.int(1, 7); q = r.int(2, 9); } while (p === q || gcd(p, q) !== 1); const A = g * p, B = g * q, it = r.pick([['boys', 'girls', 'In a class there are'], ['red marbles', 'blue marbles', 'A bag has'], ['apples', 'oranges', 'A basket has'], ['cats', 'dogs', 'A shelter has']]);
    return mcq(r, `${it[2]} ${A} ${it[0]} and ${B} ${it[1]}. What is the ratio of ${it[0]} to ${it[1]} in its simplest form?`, `${p} : ${q}`, [`${q} : ${p}`, `${A} : ${B}`, `${p} : ${q + 1}`, `${p + 1} : ${q}`], `Divide both numbers by ${g}: ${A} : ${B} = ${p} : ${q}.`); },
  r => { let p = r.int(1, 6), q = r.int(2, 8); while (p === q || gcd(p, q) !== 1) { p = r.int(1, 6); q = r.int(2, 8); } const k = r.int(2, 6);
    return mcq(r, `Which ratio is equal to ${p} : ${q}?`, `${p * k} : ${q * k}`, [`${p * k} : ${q * k + 1}`, `${p + k} : ${q}`, `${p + k} : ${q + k + 1}`, `${q * k} : ${p * k}`], `Multiply both parts by ${k}: ${p * k} : ${q * k}.`); },
  r => { const p = r.int(2, 6), q = r.int(p + 1, 9), k = r.int(2, 8), it = r.pick([['cats', 'dogs'], ['pens', 'pencils'], ['boys', 'girls'], ['red beads', 'blue beads']]);
    return mcq(r, `The ratio of ${it[0]} to ${it[1]} is ${p} : ${q}. There are ${q * k} ${it[1]}. How many ${it[0]} are there?`, p * k, [q * k - p, p * k + k, q * k + p, q * k], `${q} parts = ${q * k}, so 1 part = ${k}. Then ${p} parts = ${p} × ${k} = ${p * k}.`); },
  r => { const p = r.int(1, 7), q = r.int(2, 9), k = r.int(2, 9); if (p === q) return null; const T = (p + q) * k;
    return mcq(r, `A sum of ${money(T)} is shared between Amy and Ben in the ratio ${p} : ${q}. How much does Amy get?`, money(p * k), [money(q * k), money(T / 2), money(p * k + k), money(T - p)], `Total parts = ${p} + ${q} = ${p + q}. 1 part = ${T} ÷ ${p + q} = ${k}. Amy gets ${p} × ${k} = ${p * k}.`); }
];

/* ================= G1 Sec 2 : Linear equations (10 blank + 10 mcq) ================= */
const eqMcq = [
  r => { const x = r.int(2, 15), a = r.int(2, 14); return mcq(r, `Solve $x + ${a} = ${x + a}$.`, `$x = ${x}$`, [`$x = ${x + 2 * a}$`, `$x = ${x + a}$`, `$x = ${x - 1}$`, `$x = ${a - x}$`].filter(s => s !== `$x = ${x}$`), `Subtract ${a} from both sides: $x = ${x + a} - ${a} = ${x}$.`); },
  r => { const x = r.int(2, 12), a = r.int(2, 9); return mcq(r, `Solve $${a}x = ${a * x}$.`, `$x = ${x}$`, [`$x = ${a * x - a}$`, `$x = ${a * x + a}$`, `$x = ${x + 1}$`, `$x = ${a + x}$`], `Divide both sides by ${a}: $x = ${a * x} \\div ${a} = ${x}$.`); },
  r => { const x = r.int(2, 9), a = r.int(2, 8); return mcq(r, `Solve $\\dfrac{x}{${a}} = ${x}$.`, `$x = ${a * x}$`, [`$x = ${x}$`, `$x = ${a + x}$`, `$x = ${x / a < 1 ? a - x : x - a}$`, `$x = ${a * x + a}$`].filter(s => s !== `$x = ${a * x}$`), `Multiply both sides by ${a}: $x = ${x} \\times ${a} = ${a * x}$.`); },
  r => { const x = r.int(2, 10), a = r.int(2, 7), b = r.int(1, 12); return mcq(r, `Which value of $x$ satisfies $${a}x + ${b} = ${a * x + b}$?`, `$x = ${x}$`, [`$x = ${x + 1}$`, `$x = ${x - 1}$`, `$x = ${x + b}$`, `$x = ${a * x}$`], `Subtract ${b}: $${a}x = ${a * x}$. Divide by ${a}: $x = ${x}$.`); },
  r => { const x = r.int(2, 9), a = r.int(2, 6), b = r.int(1, 9), c = a * x + b; const wrongs = [x + 1, x - 1, x + 2, x * 2].filter(v => a * v + b !== c);
    return mcq(r, `Which equation has the solution $x = ${x}$?`, `$${a}x + ${b} = ${c}$`, [`$${a}x + ${b} = ${c + a}$`, `$${a}x + ${b} = ${c - 1}$`, `$${a}x + ${b} = ${c + 2 * a + 1}$`], `Substitute $x = ${x}$: $${a}(${x}) + ${b} = ${c}$.`); },
  r => { const x = r.int(2, 9), a = r.int(2, 7), b = r.int(1, 9); return mcq(r, `Solve $${a}x - ${b} = ${a * x - b}$.`, `$x = ${x}$`, [`$x = ${x - 1}$`, `$x = ${x + 1}$`, `$x = ${x + b}$`, `$x = ${a * x}$`], `Add ${b} to both sides: $${a}x = ${a * x}$. Then $x = ${x}$.`); },
  r => { const x = r.int(2, 8), a = r.int(2, 5), b = r.int(1, 9); return mcq(r, `Solve $${a}(x + ${b}) = ${a * (x + b)}$.`, `$x = ${x}$`, [`$x = ${x + b}$`, `$x = ${x - 1}$`, `$x = ${a * x}$`, `$x = ${x + 2}$`], `Divide by ${a}: $x + ${b} = ${x + b}$, so $x = ${x}$.`); },
  r => { const x = r.int(2, 10), a = r.int(2, 5), b = r.int(1, 8); return mcq(r, `If $${a}x + ${b} = ${a * x + b}$, what is the value of $${a}x$?`, `${a * x}`, [`${x}`, `${a * x + b}`, `${a * x - b}`, `${a * x + 2 * b}`], `$${a}x = ${a * x + b} - ${b} = ${a * x}$.`); },
  r => { const x = r.int(3, 12), k = r.int(2, 9); return mcq(r, `The sum of a number and ${k} is ${x + k}. What is the number?`, x, [x + 2 * k, x + k, k, x - 1], `Let the number be $x$. $x + ${k} = ${x + k}$, so $x = ${x}$.`); },
  r => { const a = r.int(2, 9), res = r.int(5, 40); return mcq(r, `A number $x$ is multiplied by 3 and then ${a} is subtracted. The result is ${res}. Which equation shows this?`, `$3x - ${a} = ${res}$`, [`$3x + ${a} = ${res}$`, `$3(x - ${a}) = ${res}$`, `$x - 3 \\times ${a} = ${res}$`], 'Multiplying $x$ by 3 gives $3x$. Subtracting the number gives $3x - ' + a + '$.'); }
];
const eqBlank = [
  r => { const x = r.int(2, 12), a = r.int(2, 9), b = r.int(1, 15); return blank(`Solve $${a}x + ${b} = ${a * x + b}$. Find $x$.`, x, `$${a}x = ${a * x}$, so $x = ${x}$.`); },
  r => { const x = r.int(2, 12), a = r.int(2, 9), b = r.int(1, 15); return blank(`Solve $${a}x - ${b} = ${a * x - b}$. Find $x$.`, x, `$${a}x = ${a * x}$, so $x = ${x}$.`); },
  r => { const x = r.int(2, 9), a = r.int(2, 6), b = r.int(1, 9); return blank(`Solve $\\dfrac{x}{${a}} + ${b} = ${x + b}$. Find $x$.`, a * (x), `$\\dfrac{x}{${a}} = ${x}$, so $x = ${a * x}$.`); },
  r => { const x = r.int(2, 9), a = r.int(2, 5), b = r.int(1, 8); return blank(`Solve $${a}(x + ${b}) = ${a * (x + b)}$. Find $x$.`, x, `$x + ${b} = ${x + b}$, so $x = ${x}$.`); },
  r => { const x = r.int(2, 9), a = r.int(2, 5), b = r.int(1, 8); return blank(`Solve $${a}(x - ${b}) = ${a * (x - b)}$. Find $x$.`, x, `$x - ${b} = ${x - b}$, so $x = ${x}$.`); },
  r => { const x = r.int(2, 9), a = r.int(2, 9), b = r.int(1, 12); return blank(`Find the value of $${a}x + ${b}$ when $x = ${x}$.`, a * x + b, `$${a}(${x}) + ${b} = ${a * x + b}$.`); },
  r => { const x = r.int(2, 15), a = r.int(3, 9); return blank(`Solve $${a}x = ${a * x}$. Find $x$.`, x, `$x = ${a * x} \\div ${a} = ${x}$.`); },
  r => { const x = r.int(2, 12), k = r.int(2, 9), a = r.int(2, 9); return blank(`Solve $x - ${a} = ${x - a}$. Find $x$.`, x, `Add ${a} to both sides: $x = ${x}$.`); },
  r => { const x = r.int(2, 9), a = r.int(2, 6), b = r.int(2, 6), c = a + b, d = r.int(1, 9); return blank(`Solve $${a + b + 1}x + ${d} = ${a}x + ${d + (b + 1) * x}$. Find $x$.`, x, `Collect the $x$ terms: $${b + 1}x = ${(b + 1) * x}$, so $x = ${x}$.`); },
  r => { const x = r.int(2, 9), a = r.int(3, 6), b = r.int(2, 5), c = r.int(1, 9); if (a <= b) return null; return blank(`Solve $${a}x + ${c} = ${b}x + ${c + (a - b) * x}$. Find $x$.`, x, `Collect the $x$ terms: $${a - b}x = ${(a - b) * x}$, so $x = ${x}$.`); },
  r => { const x = r.int(3, 12), a = r.int(2, 6), b = r.int(2, 9); return blank(`A number is multiplied by ${a} and then ${b} is added. The result is ${a * x + b}. Find the number.`, x, `$${a}x + ${b} = ${a * x + b}$, so $${a}x = ${a * x}$ and $x = ${x}$.`); }
];

/* ================= G1 Sec 3 : Laws of indices (15 blank + 5 word) ================= */
const idxBlank = [
  r => { const b = r.int(2, 9), m = r.int(2, 6), n = r.int(2, 6); return blank(`Write $${b}^{${m}} \\times ${b}^{${n}}$ as a single power of ${b}. Find the index.`, m + n, `Add the indices: ${m} + ${n} = ${m + n}.`); },
  r => { const b = r.int(2, 9), n = r.int(2, 5), m = n + r.int(2, 6); return blank(`Write $${b}^{${m}} \\div ${b}^{${n}}$ as a single power of ${b}. Find the index.`, m - n, `Subtract the indices: ${m} − ${n} = ${m - n}.`); },
  r => { const b = r.int(2, 9), m = r.int(2, 5), n = r.int(2, 5); return blank(`Write $(${b}^{${m}})^{${n}}$ as a single power of ${b}. Find the index.`, m * n, `Multiply the indices: ${m} × ${n} = ${m * n}.`); },
  r => { const b = r.int(2, 6), n = r.int(2, 4); return blank(`Evaluate $${b}^{${n}}$.`, b ** n, `${b}^${n} = ${Array(n).fill(b).join(' × ')} = ${b ** n}.`); },
  r => { const b = r.int(2, 9), c = r.int(2, 5); return blank(`Evaluate $${b}^{0} + ${c}^{2}$.`, 1 + c * c, `Any non-zero number to the power 0 is 1, so $${b}^0 = 1$ and $${c}^2 = ${c * c}$. The total is ${1 + c * c}.`); },
  r => { const [b, n, v] = r.pick([[2, 2, 0.25], [2, 3, 0.125], [5, 1, 0.2], [5, 2, 0.04], [10, 1, 0.1], [10, 2, 0.01], [10, 3, 0.001], [4, 1, 0.25]]); return blank(`Evaluate $${b}^{-${n}}$ as a decimal.`, v, `$${b}^{-${n}} = \\dfrac{1}{${b}^{${n}}} = ${v}$.`); },
  r => { const b = r.pick([2, 3, 4, 5, 10]), n = r.int(2, 5); return blank(`Find $n$ if $${b}^{n} = ${b ** n}$.`, n, `${b}^${n} = ${b ** n}, so n = ${n}.`); },
  r => { const b = r.int(2, 5), n = r.pick([3, 5]); return blank(`Evaluate $(-${b})^{${n}}$.`, (-b) ** n, `An odd power of a negative number is negative: $(-${b})^{${n}} = ${(-b) ** n}$.`); },
  r => { const b = r.pick([2, 3, 5]), m = r.int(5, 9), n = r.int(2, 4); return blank(`Evaluate $\\dfrac{${b}^{${m}}}{${b}^{${m - n}}}$.`, b ** n, `Subtract the indices: ${b}^${n} = ${b ** n}.`); },
  r => { const a = r.int(2, 4), b = r.int(2, 3), c = r.int(2, 5), d = r.int(2, 3); return blank(`Evaluate $${a}^{${b}} \\times ${c}^{${d}}$.`, a ** b * c ** d, `${a}^${b} = ${a ** b} and ${c}^${d} = ${c ** d}. The product is ${a ** b * c ** d}.`); },
  r => { const b = r.pick([2, 3, 4, 5]), n = r.int(2, 4); return blank(`If $${b}^{x+1} = ${b ** (n + 1)}$, find $x$.`, n, `$x + 1 = ${n + 1}$, so $x = ${n}$.`); },
  r => { const m = r.int(1, 3), n = m + r.int(1, 3); return blank(`Evaluate $10^{${m}} \\div 10^{${n}}$ as a decimal.`, 10 ** (m - n), `$10^{${m - n}} = ${10 ** (m - n)}$.`); },
  r => { const b = r.int(2, 9), m = r.int(2, 6), n = r.int(1, 4), k = r.int(1, Math.min(4, m + n - 1)); return blank(`Write $${b}^{${m}} \\times ${b}^{${n}} \\div ${b}^{${k}}$ as a single power of ${b}. Find the index.`, m + n - k, `${m} + ${n} − ${k} = ${m + n - k}.`); },
  r => { const b = r.int(2, 5), n = r.int(2, 3), m = r.int(2, 3); return blank(`Evaluate $(${b}^{${n}})^{${m}} \\div ${b}^{${n * m - 1}}$.`, b, `$(${b}^{${n}})^{${m}} = ${b}^{${n * m}}$, then ${n * m} − ${n * m - 1} = 1, so the answer is ${b}.`); }
];
const idxWord = [
  r => { const N = r.pick([3, 5, 8, 10]), h = r.int(3, 6); return blank(`A colony starts with ${N} bacteria and doubles every hour. How many bacteria are there after ${h} hours?`, N * 2 ** h, `After ${h} hours the colony has doubled ${h} times: $${N} \\times 2^{${h}} = ${N * 2 ** h}$.`); },
  r => { const k = r.int(3, 5), n = r.int(3, 5); return blank(`Sam sends a message to ${k} friends. In each round, every person who received the message sends it to ${k} new people. How many people receive the message in round ${n}?`, k ** n, `Round ${n} has ${k}^${n} = ${k ** n} people.`); },
  r => { const n = r.int(4, 7); return blank(`A sheet of paper is 0.1 mm thick. It is folded in half ${n} times. How thick is the folded paper in millimetres?`, 0.1 * 2 ** n, `Each fold doubles the thickness: $0.1 \\times 2^{${n}} = ${(0.1 * 2 ** n).toFixed(1)}$ mm.`); },
  r => { const s = r.int(3, 9); return blank(`A cube has sides of length ${s} cm. Find its volume in cm$^3$.`, s ** 3, `Volume = $${s}^3 = ${s ** 3}$ cm$^3$.`); },
  r => { const P = r.pick([100, 200, 500]), n = r.int(2, 4); return blank(`A company's profit triples every year. Its profit this year is \\$${P}. What will its profit be, in dollars, after ${n} years?`, P * 3 ** n, `The profit triples ${n} times: $${P} \\times 3^{${n}} = ${P * 3 ** n}$.`); }
];

/* ================= registry ================= */
const GYMS = [
  {id: 'G1.1.numbers.1',        fmt: 'mcq20', mcq: placeValue},
  {id: 'G1.1.numbers.2',        fmt: 'mcq20', mcq: factorsMultiples},
  {id: 'G1.1.numbers.3',        fmt: 'mcq20', mcq: negatives},
  {id: 'G1.1.numbers.4',        fmt: 'mcq20', mcq: rounding},
  {id: 'G1.1.four-operations.1', fmt: 'mcq20', mcq: addSub},
  {id: 'G1.1.ratio.1',          fmt: 'mcq20', mcq: ratios},
  {id: 'G1.2.linear-equations-in-one-variable.1', fmt: 'mix', mcq: eqMcq, blank: eqBlank},
  {id: 'G1.3.indices-and-standard-form.1', fmt: 'blank20', blank: idxBlank, word: idxWord}
];

/* ---------- G2 helpers ----------
   A G2 template returns either  N(q, a, w, opt)  (a numeric answer: used as a typed blank OR turned into
   4 multiple-choice options) or  mcq(r, ...)  (multiple choice only, for non-numeric answers).
   opt = {wr: [likely wrong numbers], f: number -> option text}. */
const numText = v => { v = +(+v).toFixed(6); return v < 0 ? '−' + sp(-v) : sp(v); };
function N(q, a, w, opt){ if (!Number.isFinite(a)) throw new Error('bad answer: ' + q); opt = opt || {}; return {t: 'num', q, a: +(+a).toFixed(6), w, wr: opt.wr || [], f: opt.f || numText}; }
const dpOf = x => (String(+(+x).toFixed(6)).split('.')[1] || '').length;
function numToMcq(r, it){
  const a = it.a, out = [], add = x => { x = +(+x).toFixed(6); if (Number.isFinite(x) && x !== a && !out.includes(x) && dpOf(x) <= Math.max(2, dpOf(a)) && (a < 0 || x >= 0)) out.push(x); };
  it.wr.forEach(add);
  if (out.length < 3){
    const mag = Math.abs(a), dp = (String(+a.toFixed(6)).split('.')[1] || '').length, u = 10 ** -dp, step = Math.max(u, mag >= 1000 ? 100 : mag >= 100 ? 10 : mag >= 20 ? 5 : mag >= 6 ? 2 : 1);
    const pool = r.shuffle([a + u, a - u, a + step, a - step, a + 2 * step, a - 2 * step, a * 2, a / 2, a + 10 * u, a - 10 * u, ...(Number.isInteger(a) ? [] : [a * 10, a / 10]), a + 1, a - 1, -a]);
    for (const x of pool){ if (out.length >= 3) break; add(x); }
  }
  const q = mcq(r, it.q, it.f(a), out.map(it.f), it.w);
  return q;
}
function buildG2(g){
  const level = +g.id.split('.')[1], r = new R(hashStr(g.id)), out = [], seen = new Set();
  if (g.plain.length < 8) throw new Error(g.id + ': needs at least 8 plain templates (has ' + g.plain.length + ')');
  if (g.word.length < 3) throw new Error(g.id + ': needs at least 3 word-problem templates (has ' + g.word.length + ')');
  const uses = new Map();
  function take(list, n, word, asMcq){
    let made = 0;
    for (let pass = 0; pass < 2 && made < n; pass++){
      for (const mk of r.shuffle(list)){
        if (made === n) break;
        if ((uses.get(mk) || 0) > pass) continue;
        for (let t = 0; t < 60; t++){
          let q = null; try { q = mk(r); } catch (e) { q = null; }
          if (!q) continue;
          if (q.t === 'mcq' && !asMcq) { q = null; break; }
          if (q.t === 'num') q = asMcq ? numToMcq(r, q) : blank(q.q, q.a, q.w);
          if (seen.has(q.q)) continue;
          seen.add(q.q); if (word) q.word = true; out.push(q); uses.set(mk, (uses.get(mk) || 0) + 1); made++; break;
        }
      }
    }
    if (made < n) throw new Error(g.id + ': only made ' + made + ' of ' + n + (word ? ' word' : ' plain') + (asMcq ? ' mcq' : ' typed') + ' questions');
  }
  if (level === 1){ take(g.plain, 15, false, true); take(g.word, 5, true, true); }
  else if (level === 2){ take(g.plain, 7, false, false); take(g.word, 3, true, false); take(g.plain, 8, false, true); take(g.word, 2, true, true); }
  else { take(g.plain, 15, false, false); take(g.word, 5, true, false); }
  out.forEach((q, i) => {
    q.id = g.id + '.q' + (i + 1);
    if (/NaN|undefined|Infinity/.test(q.q + q.w)) throw new Error('bad text ' + q.id + ': ' + q.q);
    if (q.t === 'mcq'){
      if (q.opts.length !== 4 || new Set(q.opts).size !== 4 || q.a < 0) throw new Error('bad options ' + q.id);
    } else {
      if (!Number.isFinite(q.a) || Math.abs(q.a) > 1e9) throw new Error('bad answer ' + q.id + ': ' + q.q);
      if (!/^-?\d+(\.\d+)?$/.test(String(q.a)) || String(q.a).length > 12) throw new Error('answer cannot be typed on the keypad ' + q.id + ': ' + q.a);
      if (Math.abs(q.a * 1e4 - Math.round(q.a * 1e4)) > 1e-6) throw new Error('answer has more than 4 decimals ' + q.id + ': ' + q.q + ' -> ' + q.a);
      if (/\.\d{4}$/.test(String(q.a)) && !/decimal place|d\.p\.|correct to|nearest|significant/.test(q.q)) console.warn('WARN 4-decimal answer without a rounding instruction: ' + q.id + ' ' + q.a);
    }
  });
  const nm = out.filter(q => q.t === 'mcq').length, nb = out.length - nm;
  if (out.length !== 20 || (level === 1 && nm !== 20) || (level === 2 && (nm !== 10 || nb !== 10)) || (level > 2 && nb !== 20)) throw new Error(g.id + ': format (' + nm + ' mcq, ' + nb + ' typed)');
  return out;
}

const G3DIR = path.join(__dirname, 'g3'), G2DIR = path.join(__dirname, 'g2'), G1DIR = path.join(__dirname, 'g1');
const H = {R, hashStr, sp, sg, money, mcq, blank, gcd, divisors, PRIMES, N, numText};
if (fs.existsSync(G3DIR)) fs.readdirSync(G3DIR).filter(f => f.endsWith('.cjs')).sort().forEach(f => require('./g3/' + f)(H).forEach(d => GYMS.push({id: d.id, fmt: 'typed', plain: d.plain, word: d.word})));
const G3X = path.join(__dirname, 'g3-extra.cjs');
if (fs.existsSync(G3X)) require(G3X)(H).forEach(x => {   // extra G3 templates (from the worksheet comparison): appended to the gym, always used first
  const g = GYMS.find(d => d.id === x.id); if (!g) throw new Error('g3-extra: no such gym ' + x.id);
  (x.plain || []).forEach(m => { m.pri = true; g.plain.push(m); }); (x.word || []).forEach(m => { m.pri = true; g.word.push(m); });
});
if (fs.existsSync(G1DIR)) fs.readdirSync(G1DIR).filter(f => f.endsWith('.cjs')).sort().forEach(f => require('./g1/' + f)(H).forEach(d => GYMS.push({id: d.id, fmt: 'g2', plain: d.plain, word: d.word})));
if (fs.existsSync(G2DIR)) fs.readdirSync(G2DIR).filter(f => f.endsWith('.cjs')).sort().forEach(f => require('./g2/' + f)(H).forEach(d => GYMS.push({id: d.id, fmt: 'g2', plain: d.plain, word: d.word})));

function buildTyped(g){
  const r = new R(hashStr(g.id)), out = [], seen = new Set(), nW = Math.min(g.word.length, 6), nP = 20 - nW;
  if (nW < 5) throw new Error(g.id + ': needs at least 5 word-problem templates (has ' + g.word.length + ')');
  if (g.plain.length < nP) throw new Error(g.id + ': needs ' + nP + ' plain templates (has ' + g.plain.length + ')');
  function take(list, n, word){
    let made = 0;
    for (const mk of list.filter(m => m.pri).concat(r.shuffle(list.filter(m => !m.pri)))){
      if (made === n) break;
      for (let t = 0; t < 40; t++){
        let q = null; try { q = mk(r); } catch (e) { q = null; }
        if (!q || seen.has(q.q)) continue;
        seen.add(q.q); if (word) q.word = true; out.push(q); made++; break;
      }
    }
    if (made < n) throw new Error(g.id + ': only made ' + made + ' of ' + n + (word ? ' word' : ' plain') + ' questions');
  }
  take(g.plain, nP, false); take(g.word, nW, true);
  out.forEach((q, i) => {
    q.id = g.id + '.q' + (i + 1);
    if (q.t !== 'blank' || !Number.isFinite(q.a) || Math.abs(q.a) > 1e9) throw new Error('bad answer ' + q.id + ': ' + q.q);
    if (/\.\d{4}$/.test(String(q.a)) && !/decimal place|d\.p\.|correct to|nearest|significant/.test(q.q)) console.warn('WARN 4-decimal answer without a rounding instruction (recurring decimal?): ' + q.id + ' ' + q.a);
    if (/NaN|undefined|Infinity/.test(q.q + q.w)) throw new Error('bad text ' + q.id + ': ' + q.q);
    if (!/^-?\d+(\.\d+)?$/.test(String(q.a)) || String(q.a).length > 12) throw new Error('answer cannot be typed on the keypad ' + q.id + ': ' + q.a);
    if (Math.abs(q.a * 1e4 - Math.round(q.a * 1e4)) > 1e-6) throw new Error('answer has more than 4 decimals ' + q.id + ': ' + q.q + ' -> ' + q.a);
  });
  if (out.length !== 20) throw new Error(g.id + ': expected 20 questions');
  return out;
}
function build(g){
  if (g.fmt === 'typed') return buildTyped(g);
  if (g.fmt === 'g2') return buildG2(g);
  const r = new R(hashStr(g.id)), out = [], seen = new Set();
  function fill(list, n, word){
    let made = 0, guard = 0, i = 0;
    while (made < n && guard++ < 3000){
      const mk = list[i++ % list.length]; let q = null;
      try { q = mk(r); } catch (e) { q = null; }
      if (!q || seen.has(q.q)) continue;
      seen.add(q.q); if (word) q.word = true; out.push(q); made++;
    }
    if (made < n) throw new Error(g.id + ': could not make ' + n + ' unique questions (made ' + made + ')');
  }
  if (g.fmt === 'mcq20') fill(g.mcq, 20);
  else if (g.fmt === 'mix') { fill(g.mcq, 10); fill(g.blank, 10); }
  else { fill(g.blank, 15); fill(g.word, 5, true); }
  out.forEach((q, i) => { q.id = g.id + '.q' + (i + 1); });
  // validation
  if (out.length !== 20) throw new Error(g.id + ': expected 20 questions');
  const nm = out.filter(q => q.t === 'mcq').length, nb = out.filter(q => q.t === 'blank').length, nw = out.filter(q => q.word).length;
  if (g.fmt === 'mcq20' && nm !== 20) throw new Error(g.id + ': format');
  if (g.fmt === 'mix' && (nm !== 10 || nb !== 10)) throw new Error(g.id + ': format');
  if (g.fmt === 'blank20' && (nb !== 20 || nw !== 5)) throw new Error(g.id + ': format');
  out.forEach(q => { if (q.t === 'mcq' && (q.opts.length !== 4 || new Set(q.opts).size !== 4 || q.a < 0)) throw new Error('bad options ' + q.id); });
  return out;
}

const banks = {};
GYMS.forEach(g => { banks[g.id] = build(g); });
const dest = path.join(__dirname, '..', 'js', 'banks.js');
fs.writeFileSync(dest, '/* generated by tools/build-banks.cjs - do not edit by hand */\nwindow.GQ_BANKS = ' + JSON.stringify(banks) + ';\n');
let total = 0; for (const k in banks) { total += banks[k].length; console.log(k, banks[k].length, 'questions'); }
console.log('banks:', Object.keys(banks).length, 'gyms,', total, 'questions ->', path.relative(process.cwd(), dest));
