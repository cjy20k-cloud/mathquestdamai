/* G3 Sec 1 generators, part B: Ch4 Basic Algebra, Ch5 Simple Equations, Ch6 Angles, Ch7 Triangles/Quadrilaterals/Polygons,
   Ch8 Ratio/Rate/Speed, Ch9 Percentage. Modelled on the Shing Lee Sec 1 (Express) practice exercises. */
'use strict';
module.exports = function(H){
  const {blank, gcd, sp} = H, B = blank;
  const money = n => '\\$' + (Number.isInteger(n) ? sp(n) : n.toFixed(2));
  const g = [];
  const lin = (a, b) => `${a === 1 ? '' : a === -1 ? '-' : a}x${b === 0 ? '' : b > 0 ? ' + ' + b : ' − ' + (-b)}`;

  /* ---- Basic algebra and manipulations ---- */
  g.push({id: 'G3.1.basic-algebra-and-manipulations.1', plain: [
    r => { const a = r.int(2, 6), b = r.int(2, 6), x = r.int(2, 9), y = r.int(2, 9); return B(`Evaluate $${a}x + ${b}y$ when $x = ${x}$ and $y = ${y}$.`, a * x + b * y, `${a}(${x}) + ${b}(${y}) = ${a * x} + ${b * y} = ${a * x + b * y}.`); },
    r => { const a = r.int(5, 9), b = r.int(2, 4), c = r.int(2, 8), d = r.int(2, 9); return B(`Simplify $${a}x + ${c} - ${b}x + ${d}$ to the form $px + q$. Find $q$.`, c + d, `Collect like terms: $${a - b}x + ${c + d}$, so $q = ${c + d}$.`); },
    r => { const a = r.int(5, 9), b = r.int(2, 4), c = r.int(2, 8), d = r.int(2, 9); return B(`Simplify $${a}x + ${c} - ${b}x + ${d}$ to the form $px + q$. Find $p$.`, a - b, `$${a}x - ${b}x = ${a - b}x$, so $p = ${a - b}$.`); },
    r => { const a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 9); return B(`Expand $${a}(${b}x - ${c})$. Find the coefficient of $x$.`, a * b, `$${a}(${b}x - ${c}) = ${a * b}x - ${a * c}$.`); },
    r => { const a = r.int(2, 5), b = r.int(2, 5), c = r.int(1, 6), d = r.int(1, 6); return B(`Simplify $${a}(x + ${c}) - ${b}(x - ${d})$ to the form $px + q$. Find $p + q$.`, (a - b) + (a * c + b * d), `$${a}x + ${a * c} - ${b}x + ${b * d} = ${a - b}x + ${a * c + b * d}$, so $p + q = ${(a - b) + (a * c + b * d)}$.`); },
    r => { const u = r.int(3, 12), a = r.int(2, 6), t = r.int(2, 9); return B(`Using $v = u + at$, find $v$ when $u = ${u}$, $a = ${a}$ and $t = ${t}$.`, u + a * t, `$v = ${u} + ${a}(${t}) = ${u + a * t}$.`); },
    r => { const x = r.int(-5, -2), y = r.int(-5, -2); return B(`Evaluate $3x^2 - 2y$ when $x = ${x}$ and $y = ${y}$.`, 3 * x * x - 2 * y, `$3(${x})^2 - 2(${y}) = ${3 * x * x} + ${-2 * y} = ${3 * x * x - 2 * y}$.`); },
    r => { const k = r.int(2, 9), a = r.int(2, 6), b = r.int(1, 8); return B(`Factorise $${k * a}x + ${k * b}$ completely as $k(ax + b)$ where $k$ is the highest common factor. Find $k$.`, gcd(k * a, k * b), `The HCF of ${k * a} and ${k * b} is ${gcd(k * a, k * b)}.`); },
    r => { const k = r.int(2, 6), a = r.int(2, 6), b = r.int(2, 6); return B(`Simplify $\\dfrac{${k * a}x + ${k * b}}{${k}}$ to the form $px + q$. Find $p + q$.`, a + b, `Divide each term by ${k}: $${a}x + ${b}$, so $p + q = ${a + b}$.`); },
    r => { const x = r.int(2, 9); return B(`Evaluate $2(x + 3) - (x - 4)$ when $x = ${x}$.`, 2 * (x + 3) - (x - 4), `$2(${x + 3}) - (${x - 4}) = ${2 * (x + 3)} - ${x - 4} = ${2 * (x + 3) - (x - 4)}$.`); },
    r => { const x = r.int(1, 6) * 4; return B(`Evaluate $\\dfrac{3x}{4} + \\dfrac{x}{2}$ when $x = ${x}$.`, 3 * x / 4 + x / 2, `$\\dfrac{3(${x})}{4} + \\dfrac{${x}}{2} = ${3 * x / 4} + ${x / 2} = ${3 * x / 4 + x / 2}$.`); },
    r => { const a = r.int(2, 6), b = r.int(2, 6); return B(`Expand and simplify $(x + ${a})(x + ${b})$. Find the coefficient of $x$.`, a + b, `$(x + ${a})(x + ${b}) = x^2 + ${a + b}x + ${a * b}$.`); },
    r => { const a = r.int(2, 5), b = r.int(-4, -1); return B(`Evaluate $a^2 - 2ab + b^2$ when $a = ${a}$ and $b = ${b}$.`, a * a - 2 * a * b + b * b, `$(a - b)^2 = (${a - b})^2 = ${(a - b) ** 2}$.`); },
    r => { const n = r.int(3, 12); return B(`Evaluate the sum of three consecutive integers $n$, $n + 1$ and $n + 2$ when $n = ${n}$.`, 3 * n + 3, `$${n} + ${n + 1} + ${n + 2} = ${3 * n + 3}$.`); },
    r => { const x = r.int(2, 6); return B(`The sides of a triangle are $(x + 3)$ cm, $(2x - 1)$ cm and $(x + 5)$ cm. Find its perimeter when $x = ${x}$.`, 4 * x + 7, `Perimeter = $(x + 3) + (2x - 1) + (x + 5) = 4x + 7 = ${4 * x + 7}$ cm.`); }
  ], word: [
    r => { const c = r.int(2, 5), p = r.int(5, 9) / 10, k = r.int(5, 20); return B(`A taxi charges \\$${c}.00 plus \\$${p.toFixed(2)} per km. Find the fare, in dollars, for a ${k} km trip.`, +(c + p * k).toFixed(2), `Fare = ${c} + ${p.toFixed(2)} × ${k} = ${(c + p * k).toFixed(2)}.`); },
    r => { const f = r.int(15, 30), n = r.int(20, 80), p = r.pick([0.05, 0.08, 0.1]); return B(`A mobile plan costs \\$${f} a month plus \\$${p.toFixed(2)} for each SMS. Find the total cost, in dollars, in a month when ${n} SMSs are sent.`, +(f + p * n).toFixed(2), `Cost = ${f} + ${p.toFixed(2)} × ${n} = ${(f + p * n).toFixed(2)}.`); },
    r => { const x = r.int(10, 15); return B(`Ali is $x$ years old. His father is $(3x + 4)$ years old. Find the sum of their ages when $x = ${x}$.`, 4 * x + 4, `Sum = $x + 3x + 4 = 4x + 4 = ${4 * x + 4}$.`); },
    r => { const x = r.int(4, 9); return B(`A rectangle has length $(2x + 3)$ cm and width $(x - 1)$ cm. Find its perimeter when $x = ${x}$, in cm.`, 2 * ((2 * x + 3) + (x - 1)), `Perimeter = $2[(2x + 3) + (x - 1)] = 2(3x + 2) = ${2 * (3 * x + 2)}$ cm.`); },
    r => { const p = r.int(2, 5), b = r.int(6, 12), n = r.int(3, 8), m = r.int(2, 5); return B(`Mrs Lee buys $n$ pens at \\$${p} each and $m$ books at \\$${b} each. Find the total cost, in dollars, when $n = ${n}$ and $m = ${m}$.`, p * n + b * m, `Total = ${p}(${n}) + ${b}(${m}) = ${p * n + b * m}.`); },
    r => { const x = r.int(8, 20), n = r.int(3, 6), d = r.int(2, 5); return B(`A shirt costs \\$${x}. A shop gives a discount of \\$${d} on each shirt bought. Find the cost, in dollars, of ${n} shirts.`, n * (x - d), `${n}(${x} − ${d}) = ${n * (x - d)}.`); }
  ]});

  g.push(...require('./parts/sec1b-more.cjs')(H));   // simple equations, angles, polygons, ratio/rate/speed

  /* ---- Percentage ---- */
  g.push({id: 'G3.1.percentage.1', plain: [
    r => { const p = r.pick([5, 8, 12, 15, 20, 25, 35, 40, 60]), q = r.int(2, 9) * 20; return B(`Find ${p}% of ${q}.`, p * q / 100, `${p}/100 × ${q} = ${p * q / 100}.`); },
    r => { const a = r.int(3, 18), b = r.pick([20, 25, 40, 50]); return B(`Express ${a} out of ${b} as a percentage.`, a / b * 100, `${a}/${b} × 100 = ${a / b * 100}%.`); },
    r => { const p = r.pick([10, 15, 20, 25, 30]), q = r.int(4, 20) * 20; return B(`Increase ${q} by ${p}%.`, q * (100 + p) / 100, `${q} × ${100 + p}/100 = ${q * (100 + p) / 100}.`); },
    r => { const p = r.pick([10, 15, 20, 25, 30]), q = r.int(4, 20) * 20; return B(`Decrease ${q} by ${p}%.`, q * (100 - p) / 100, `${q} × ${100 - p}/100 = ${q * (100 - p) / 100}.`); },
    r => { const p = r.pick([20, 25, 40]), q = r.int(4, 15) * 20; return B(`After a ${p}% increase, a number becomes ${q * (100 + p) / 100}. Find the original number.`, q, `${q * (100 + p) / 100} ÷ ${(100 + p) / 100} = ${q}.`); },
    r => { const p = r.pick([20, 25, 30, 40]), q = r.int(4, 12) * 20; return B(`After a ${p}% decrease, a number becomes ${q * (100 - p) / 100}. Find the original number.`, q, `${q * (100 - p) / 100} ÷ ${(100 - p) / 100} = ${q}.`); },
    r => { const f = r.pick([[1, 4, 25], [3, 5, 60], [1, 5, 20], [7, 20, 35], [3, 8, 37.5], [9, 10, 90]]); return B(`Express $\\dfrac{${f[0]}}{${f[1]}}$ as a percentage.`, f[2], `${f[0]} ÷ ${f[1]} × 100 = ${f[2]}%.`); },
    r => { const p = r.pick([5, 15, 35, 45, 62.5, 12.5, 87.5]); return B(`Express ${p}% as a decimal.`, p / 100, `${p} ÷ 100 = ${p / 100}.`); },
    r => { const a = r.int(2, 9) * 10, b = r.int(2, 9) * 10 + 20; if (a >= b) return null; return B(`The price of a book rises from \\$${a} to \\$${b}. Find the percentage increase, correct to 1 decimal place.`, +((b - a) / a * 100).toFixed(1), `Increase = ${b - a}. Percentage = ${b - a}/${a} × 100 = ${((b - a) / a * 100).toFixed(1)}%.`); },
    r => { const a = r.int(2, 9) * 20 + 40, p = r.pick([10, 20, 25, 30]); return B(`A jacket costs \\$${a}. After a ${p}% discount, what is the new price in dollars?`, a * (100 - p) / 100, `${a} × ${100 - p}/100 = ${a * (100 - p) / 100}.`); },
    r => { const a = r.int(2, 8) * 50, g = 9; return B(`A meal costs \\$${a} before GST. GST is ${g}%. Find the amount of GST in dollars.`, +(a * g / 100).toFixed(2), `${a} × 9/100 = ${(a * g / 100).toFixed(2)}.`); },
    r => { const a = r.int(2, 9) * 100, r1 = r.pick([2, 3, 4, 5]), t = r.int(2, 5); return B(`Find the simple interest on \\$${a} at ${r1}% per year for ${t} years, in dollars.`, a * r1 * t / 100, `I = PRT/100 = ${a} × ${r1} × ${t} ÷ 100 = ${a * r1 * t / 100}.`); },
    r => { const p = r.int(2, 9) * 5, a = r.int(2, 9) * 40; return B(`${p}% of a number is ${p * a / 100}. Find the number.`, a, `${p * a / 100} ÷ ${p / 100} = ${a}.`); },
    r => { const x = r.int(10, 40), y = r.int(10, 40); if (x === y) return null; return B(`What percentage of ${Math.max(x, y) * 5} is ${Math.min(x, y) * 5}? Give the answer correct to 1 decimal place.`, +(Math.min(x, y) / Math.max(x, y) * 100).toFixed(1), `${Math.min(x, y) * 5}/${Math.max(x, y) * 5} × 100 = ${(Math.min(x, y) / Math.max(x, y) * 100).toFixed(1)}%.`); }
  ], word: [
    r => { const s = r.int(2, 9) * 50, p = r.pick([20, 25, 30, 40]); return B(`A bicycle is marked at \\$${s}. It is sold at a discount of ${p}%. Find the selling price in dollars.`, s * (100 - p) / 100, `${s} × ${100 - p}/100 = ${s * (100 - p) / 100}.`); },
    r => { const n = r.int(2, 9) * 50, p = r.pick([12, 16, 24, 32]); return B(`There are ${n} students in a school. ${p}% of them take the bus. How many students take the bus?`, n * p / 100, `${p}/100 × ${n} = ${n * p / 100}.`); },
    r => { const a = r.int(2, 6) * 100, p = r.pick([3, 4, 5]), t = r.int(2, 4); return B(`Mr Tan deposits \\$${a} in a bank that pays simple interest at ${p}% per year. How much interest does he earn in ${t} years, in dollars?`, a * p * t / 100, `${a} × ${p} × ${t} ÷ 100 = ${a * p * t / 100}.`); },
    r => { const o = r.int(2, 6) * 100, p = r.pick([20, 25, 40]); return B(`After a price increase of ${p}%, the price of a phone is \\$${o * (100 + p) / 100}. Find the original price in dollars.`, o, `${o * (100 + p) / 100} ÷ ${(100 + p) / 100} = ${o}.`); },
    r => { const m = r.int(2, 5) * 20, s = r.int(2, 6) * 20; const sc = m + s; const pc = r.pick([1, 2]); return B(`In a quiz Ali scored ${m} out of ${m + s} marks. Find his score as a percentage, correct to 1 decimal place.`, +(m / (m + s) * 100).toFixed(1), `${m}/${m + s} × 100 = ${(m / (m + s) * 100).toFixed(1)}%.`); },
    r => { const c = r.int(2, 8) * 50, p = r.pick([20, 25, 30, 40]); return B(`A shopkeeper buys a watch for \\$${c} and sells it at a profit of ${p}%. Find the selling price in dollars.`, c * (100 + p) / 100, `${c} × ${100 + p}/100 = ${c * (100 + p) / 100}.`); }
  ]});

  return g;
};
