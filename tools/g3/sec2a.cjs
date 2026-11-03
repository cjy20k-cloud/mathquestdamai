/* G3 Sec 2 generators, part A: Ch1 Linear Inequalities, Ch2 Equations in Two Variables, Ch3 Expansion and Factorisation,
   Ch5 Quadratic Graphs and Equations, Ch6 Proportion. Modelled on the Shing Lee Sec 2 (Express) practice exercises. */
'use strict';
module.exports = function(H){
  const {blank, gcd, sp} = H, B = blank;
  const rd = (x, d) => +x.toFixed(d), g = [];
  const sgn = (n, v = 'x') => n === 1 ? v : n === -1 ? '-' + v : n + v;
  const addT = n => n === 0 ? '' : n > 0 ? ` + ${n}` : ` - ${-n}`;      // " + 5" / " - 5"
  const pm = n => n >= 0 ? `+ ${n}` : `- ${-n}`;

  /* ---- Linear inequalities ---- */
  g.push({id: 'G3.2.linear-inequalities.1', plain: [
    r => { const a = r.int(2, 6), x = r.int(2, 9), b = r.int(1, 9); return B(`Find the smallest integer $x$ that satisfies $${a}x + ${b} > ${a * x + b + 1}$.`, x + 1, `$${a}x > ${a * x + 1}$, so $x > ${rd(x + 1 / a, 3)}$. The smallest integer is ${x + 1}.`); },
    r => { const a = r.int(2, 6), x = r.int(2, 9), b = r.int(1, 9); return B(`Find the greatest integer $x$ that satisfies $${a}x - ${b} < ${a * x - b + a - 1}$.`, x, `$${a}x < ${a * x + a - 1}$, so $x < ${rd((a * x + a - 1) / a, 3)}$. The greatest integer is ${x}.`); },
    r => { const a = r.int(2, 5), c = r.int(8, 30); return B(`Find the greatest integer $x$ such that $${a}x \\le ${c}$.`, Math.floor(c / a), `$x \\le ${rd(c / a, 3)}$, so the greatest integer is ${Math.floor(c / a)}.`); },
r => { const a = r.int(2, 5), x = r.int(1, 8); return B(`Find the smallest integer $x$ satisfying $-${a}x < ${-a * x}$.`, x + 1, `Divide by $-${a}$ and reverse the sign: $x > ${x}$. The smallest integer is ${x + 1}.`); },
    r => { const a = r.int(-3, -1), lo = r.int(-4, -1), hi = r.int(2, 6); return B(`How many integers satisfy $${lo} < x \\le ${hi}$?`, hi - lo, `The integers are ${lo + 1}, …, ${hi}. That is ${hi - lo}.`); },
    r => { const lo = r.int(-5, 0), hi = r.int(3, 8); return B(`How many integers satisfy $${lo} \\le x \\le ${hi}$?`, hi - lo + 1, `The integers are ${lo}, …, ${hi}. That is ${hi - lo + 1}.`); },
r => { const a = r.int(2, 5), x = r.int(1, 8), b = r.int(1, 9); return B(`Find the greatest integer $x$ satisfying $-${a}x + ${b} > ${-a * x + b - 1}$.`, x, `$-${a}x > ${-a * x - 1}$. Divide by $-${a}$ and reverse the sign: $x < ${rd(x + 1 / a, 3)}$. The greatest integer is ${x}.`); },
    r => { const a = r.int(2, 6), b = r.int(1, 9), c = r.int(10, 40); return B(`Find the greatest integer $x$ such that $${a}x + ${b} \\le ${c}$.`, Math.floor((c - b) / a), `$${a}x \\le ${c - b}$, so $x \\le ${rd((c - b) / a, 3)}$. The greatest integer is ${Math.floor((c - b) / a)}.`); },
    r => { const a = r.int(2, 5), b = r.int(2, 9), c = r.int(10, 40); return B(`Find the smallest integer $x$ such that $${a}x - ${b} \\ge ${c}$.`, Math.ceil((c + b) / a), `$${a}x \\ge ${c + b}$, so $x \\ge ${rd((c + b) / a, 3)}$. The smallest integer is ${Math.ceil((c + b) / a)}.`); },
    r => { const a = r.int(3, 6), c = r.int(10, 40); return B(`Find the smallest integer $x$ satisfying $-${a}x \\le -${c}$.`, Math.ceil(c / a), `Divide by $-${a}$ and reverse the sign: $x \\ge ${rd(c / a, 3)}$. The smallest integer is ${Math.ceil(c / a)}.`); },
    r => { const a = r.int(2, 4), b = r.int(1, 5), c = r.int(2, 4), d = r.int(1, 5); const lo = Math.ceil((b + 0) / 1); return B(`Find the smallest integer $x$ satisfying both $x > ${a + b}$ and $x \\ge ${a + b + c - 1}$.`, a + b + c - 1, `The stronger condition is $x \\ge ${a + b + c - 1}$, so the smallest integer is ${a + b + c - 1}.`); },
    r => { const lo = r.int(2, 7), hi = lo + r.int(4, 10); return B(`Find the sum of all integers $x$ with $${lo} \\le x < ${hi}$.`, (lo + hi - 1) * (hi - lo) / 2, `The integers are ${lo} to ${hi - 1}. Sum = ${(lo + hi - 1) * (hi - lo) / 2}.`); },
    r => { const a = r.int(2, 5), b = r.int(3, 12); return B(`Solve $\\dfrac{x}{${a}} > ${b}$. Find the smallest integer $x$.`, a * b + 1, `$x > ${a * b}$, so the smallest integer is ${a * b + 1}.`); },
    r => { const a = r.int(2, 5), b = r.int(2, 6), c = r.int(1, 4); if (a <= c) return null; return B(`Find the greatest integer $x$ such that $${a}x - ${b} < ${c}x + ${b * 3}$.`, Math.ceil(4 * b / (a - c)) - 1, `$${a - c}x < ${4 * b}$, so $x < ${rd(4 * b / (a - c), 3)}$. The greatest integer is ${Math.ceil(4 * b / (a - c)) - 1}.`); }
  ], word: [
    r => { const m = r.int(40, 90), p = r.int(3, 7); return B(`Ali has \\$${m} and wants to buy notebooks costing \\$${p} each. What is the greatest number of notebooks he can buy?`, Math.floor(m / p), `$${p}n \\le ${m}$, so $n \\le ${rd(m / p, 2)}$. He can buy ${Math.floor(m / p)} notebooks.`); },
    r => { const W = r.int(5, 9) * 100, p = r.int(60, 80); return B(`A lift can carry a maximum load of ${W} kg. Each passenger has a mass of ${p} kg. What is the greatest number of passengers the lift can carry?`, Math.floor(W / p), `$${p}n \\le ${W}$, so $n \\le ${rd(W / p, 2)}$. The greatest number is ${Math.floor(W / p)}.`); },
r => { const s = r.int(60, 75), t = r.int(4, 6), n = s + r.int(3, 8); return B(`Mei scored an average of ${s} in ${t} tests. What is the minimum score she needs in the next test to raise her average to at least ${n}?`, n * (t + 1) - s * t, `Total needed = ${n} × ${t + 1} = ${n * (t + 1)}. Current total = ${s * t}. She needs at least ${n * (t + 1) - s * t}.`); },
    r => { const c = r.int(3, 8), f = r.int(20, 40), b = r.int(50, 120); return B(`A club charges a joining fee of \\$${f} and \\$${c} per session. Tom has a budget of \\$${b}. What is the greatest number of sessions he can attend?`, Math.floor((b - f) / c), `$${f} + ${c}n \\le ${b}$, so $n \\le ${rd((b - f) / c, 2)}$. The greatest number is ${Math.floor((b - f) / c)}.`); },
    r => { const P = r.int(40, 70), a = r.int(8, 15); return B(`The perimeter of a rectangle is to be at most ${P} cm. Its length is ${a} cm. What is the greatest possible whole-number width, in cm?`, Math.floor((P - 2 * a) / 2), `$2(${a} + w) \\le ${P}$, so $w \\le ${(P - 2 * a) / 2}$. The greatest integer width is ${Math.floor((P - 2 * a) / 2)}.`); },
    r => { const k = r.int(3, 6), t = r.int(100, 200); return B(`A bus ticket costs \\$${k}. The bus company must earn more than \\$${t * k} a day. What is the smallest number of tickets it must sell?`, t + 1, `$${k}n > ${t * k}$, so $n > ${t}$. The smallest integer is ${t + 1}.`); }
  ]});

  /* ---- Equations in two variables ---- */
  const sys = r => { const x = r.int(1, 9), y = r.int(1, 9), a = r.int(1, 4), b = r.int(1, 4), c = r.int(1, 4), d = r.int(1, 4); if (a * d - b * c === 0) return null; return {x, y, a, b, c, d, e: a * x + b * y, f: c * x + d * y}; };
  g.push({id: 'G3.2.equations-in-two-variables.1', plain: [
    r => { const s = sys(r); if (!s) return null; return B(`Solve $${s.a === 1 ? '' : s.a}x + ${s.b === 1 ? '' : s.b}y = ${s.e}$ and $${s.c === 1 ? '' : s.c}x + ${s.d === 1 ? '' : s.d}y = ${s.f}$. Find $x$.`, s.x, `Eliminate $y$ and solve: $x = ${s.x}$ and $y = ${s.y}$.`); },
    r => { const s = sys(r); if (!s) return null; return B(`Solve $${s.a === 1 ? '' : s.a}x + ${s.b === 1 ? '' : s.b}y = ${s.e}$ and $${s.c === 1 ? '' : s.c}x + ${s.d === 1 ? '' : s.d}y = ${s.f}$. Find $y$.`, s.y, `Eliminate $x$ and solve: $x = ${s.x}$ and $y = ${s.y}$.`); },
    r => { const x = r.int(2, 9), y = r.int(1, 9), k = r.int(1, 3); return B(`Solve $x + y = ${x + y}$ and $x - y = ${x - y}$. Find $x$.`, x, `Add the equations: $2x = ${2 * x}$, so $x = ${x}$.`); },
    r => { const x = r.int(2, 9), y = r.int(1, 9); return B(`Solve $x + y = ${x + y}$ and $x - y = ${x - y}$. Find $y$.`, y, `Subtract the equations: $2y = ${2 * y}$, so $y = ${y}$.`); },
r => { const x = r.int(2, 8), y = r.int(2, 8); return B(`Solve $2x + 3y = ${2 * x + 3 * y}$ and $x - y = ${x - y}$. Find $y$.`, y, `From the second equation $x = y + ${x - y}$. Substitute: $5y + ${2 * (x - y)} = ${2 * x + 3 * y}$, so $y = ${y}$.`); },
    r => { const x = r.int(1, 8), y = r.int(1, 8), a = r.int(2, 5); return B(`Solve $y = ${a}x$ and $x + y = ${x * (a + 1)}$. Find $y$.`, a * x, `Substitute: $x + ${a}x = ${x * (a + 1)}$, so $x = ${x}$ and $y = ${a * x}$.`); },
    r => { const x = r.int(2, 9), y = r.int(2, 9); return B(`Solve $2x + y = ${2 * x + y}$ and $x + y = ${x + y}$. Find $x + 2y$.`, x + 2 * y, `Subtract: $x = ${x}$. Then $y = ${y}$, so $x + 2y = ${x + 2 * y}$.`); },
    r => { const x = r.int(2, 6), y = r.int(2, 6); return B(`Solve $3x + 2y = ${3 * x + 2 * y}$ and $x - y = ${x - y}$. Find $x$.`, x, `From the second equation $x = y + ${x - y}$. Substitute into the first: $5y + ${3 * (x - y)} = ${3 * x + 2 * y}$, so $y = ${y}$ and $x = ${x}$.`); },
    r => { const x = r.int(1, 8), y = r.int(1, 8); return B(`The sum of two numbers is ${x + y} and their difference is ${Math.abs(x - y)}. Find the larger number.`, Math.max(x, y), `Larger = (${x + y} + ${Math.abs(x - y)}) ÷ 2 = ${Math.max(x, y)}.`); },
    r => { const x = r.int(2, 8), y = r.int(2, 8); if (x === y) return null; return B(`The sum of two numbers is ${x + y} and their difference is ${Math.abs(x - y)}. Find the smaller number.`, Math.min(x, y), `Smaller = (${x + y} − ${Math.abs(x - y)}) ÷ 2 = ${Math.min(x, y)}.`); },
    r => { const x = r.int(1, 7), y = r.int(1, 7); return B(`Solve $4x + 3y = ${4 * x + 3 * y}$ and $2x + 3y = ${2 * x + 3 * y}$. Find $x$.`, x, `Subtract: $2x = ${2 * x}$, so $x = ${x}$.`); },
r => { const x = r.int(1, 6), y = r.int(1, 6); return B(`Solve $y = 3x - ${3 * x - y}$ and $2x + y = ${2 * x + y}$. Find $x$.`, x, `Substitute $y$: $2x + 3x - ${3 * x - y} = ${2 * x + y}$, so $5x = ${5 * x}$ and $x = ${x}$.`); },
    r => { const x = r.int(1, 6), y = r.int(1, 6); return B(`Solve $5x - 2y = ${5 * x - 2 * y}$ and $x + 2y = ${x + 2 * y}$. Find $x$.`, x, `Add the equations: $6x = ${6 * x}$, so $x = ${x}$.`); },
    r => { const x = r.int(1, 6), y = r.int(1, 6); return B(`Solve $2x + 3y = ${2 * x + 3 * y}$ and $2x - y = ${2 * x - y}$. Find $y$.`, y, `Subtract: $4y = ${4 * y}$, so $y = ${y}$.`); },
    r => { const x = r.int(1, 6), y = r.int(1, 6); return B(`Given $x + 2y = ${x + 2 * y}$ and $3x + 2y = ${3 * x + 2 * y}$, find $x + y$.`, x + y, `Subtract: $2x = ${2 * x}$, so $x = ${x}$ and $y = ${y}$.`); }
  ], word: [
    r => { const p = r.int(2, 5), b = r.int(6, 12), n = r.int(2, 6), m = r.int(2, 6); if (n === m) return null; return B(`${n} pens and ${m} books cost \\$${p * n + b * m}. ${m} pens and ${n} books cost \\$${p * m + b * n}. Find the cost of one pen in dollars.`, p, `Solve the simultaneous equations: pen = \\$${p}, book = \\$${b}.`); },
    r => { const a = r.int(8, 15), c = r.int(4, 8), na = r.int(2, 5), nc = r.int(2, 6); return B(`A family buys ${na} adult tickets and ${nc} child tickets for \\$${a * na + c * nc}. Another family buys ${na + 1} adult tickets and ${nc - 1} child tickets for \\$${a * (na + 1) + c * (nc - 1)}. Find the price of an adult ticket in dollars.`, a, `Subtracting the equations: adult − child = ${a - c}... Solving gives adult = \\$${a}, child = \\$${c}.`); },
    r => { const t = r.int(10, 20), n = r.int(3, 9); return B(`A bag contains 20-cent and 50-cent coins. There are ${t} coins altogether worth \\$${(0.2 * (t - n) + 0.5 * n).toFixed(2)}. How many 50-cent coins are there?`, n, `Let there be $x$ 50-cent coins: $x + y = ${t}$ and $50x + 20y = ${Math.round(100 * (0.2 * (t - n) + 0.5 * n))}$. Solving gives $x = ${n}$.`); },
    r => { const s = r.int(8, 14), d = r.int(20, 30); return B(`A father is ${d} years older than his son. The sum of their ages is ${2 * s + d}. Find the son's age.`, s, `$f - s = ${d}$ and $f + s = ${2 * s + d}$, so $s = ${s}$.`); },
    r => { const w = r.int(4, 9), l = w + r.int(2, 6); return B(`The perimeter of a rectangle is ${2 * (l + w)} cm and its length is ${l - w} cm longer than its width. Find its width in cm.`, w, `$2(l + w) = ${2 * (l + w)}$ and $l = w + ${l - w}$. So $4w + ${2 * (l - w)} = ${2 * (l + w)}$, giving $w = ${w}$.`); }
  ]});

  /* ---- Expansion and factorisation ---- */
  g.push({id: 'G3.2.expansion-and-factorisation-of-algebraic-expressions.1', plain: [
    r => { const a = r.int(1, 9), b = r.int(1, 9); return B(`Expand $(x + ${a})(x + ${b})$ to get $x^2 + px + q$. Find $p$.`, a + b, `$(x + ${a})(x + ${b}) = x^2 + ${a + b}x + ${a * b}$.`); },
    r => { const a = r.int(1, 9), b = r.int(1, 9); return B(`Expand $(x + ${a})(x + ${b})$ to get $x^2 + px + q$. Find $q$.`, a * b, `$(x + ${a})(x + ${b}) = x^2 + ${a + b}x + ${a * b}$.`); },
    r => { const a = r.int(1, 9), b = r.int(1, 9); return B(`Expand $(x - ${a})(x + ${b})$ to get $x^2 + px + q$. Find $q$.`, -a * b, `$(x - ${a})(x + ${b}) = x^2 + ${b - a}x - ${a * b}$.`); },
    r => { const a = r.int(2, 9); return B(`Expand $(x + ${a})^2$ to get $x^2 + px + q$. Find $p + q$.`, 2 * a + a * a, `$(x + ${a})^2 = x^2 + ${2 * a}x + ${a * a}$.`); },
    r => { const a = r.int(2, 9); return B(`Expand $(x - ${a})(x + ${a})$ to get $x^2 - q$. Find $q$.`, a * a, `Difference of two squares: $x^2 - ${a * a}$.`); },
    r => { const a = r.int(2, 5), b = r.int(2, 5), c = r.int(1, 6), d = r.int(1, 6); return B(`Expand $(${a}x + ${c})(${b}x + ${d})$. Find the coefficient of $x$.`, a * d + b * c, `The $x$ terms: $${a}x \\times ${d} + ${c} \\times ${b}x = ${a * d + b * c}x$.`); },
    r => { const a = r.int(5, 9), b = r.int(1, 4); return B(`Use $a^2 - b^2 = (a - b)(a + b)$ to evaluate $${100 + a}^2 - ${100 - b}^2$.`, (100 + a) ** 2 - (100 - b) ** 2, `$(${100 + a} - ${100 - b})(${100 + a} + ${100 - b}) = ${a + b} \\times ${200 + a - b} = ${(100 + a) ** 2 - (100 - b) ** 2}$.`); },
    r => { const k = r.int(2, 8), a = r.int(2, 6), b = r.int(1, 6); return B(`Factorise $${k * a}x + ${k * b}$ as $k(ax + b)$ with $k$ as large as possible. Find $k$.`, gcd(k * a, k * b), `The HCF of ${k * a} and ${k * b} is ${gcd(k * a, k * b)}.`); },
    r => { const p = r.int(1, 8), q = r.int(1, 8); return B(`Factorise $x^2 + ${p + q}x + ${p * q}$ as $(x + m)(x + n)$ where $m \\ge n$. Find $m$.`, Math.max(p, q), `Two numbers with product ${p * q} and sum ${p + q} are ${p} and ${q}. The larger is ${Math.max(p, q)}.`); },
    r => { const p = r.int(1, 8), q = r.int(1, 8); if (p === q) return null; return B(`Factorise $x^2 + ${p + q}x + ${p * q}$ as $(x + m)(x + n)$ where $m \\ge n$. Find $n$.`, Math.min(p, q), `Two numbers with product ${p * q} and sum ${p + q} are ${p} and ${q}. The smaller is ${Math.min(p, q)}.`); },
    r => { const p = r.int(2, 9), q = r.int(2, 9); if (p === q) return null; return B(`Factorise $x^2 - ${p + q}x + ${p * q}$ as $(x - m)(x - n)$ where $m \\ge n$. Find $m$.`, Math.max(p, q), `The numbers with product ${p * q} and sum ${p + q} are ${p} and ${q}.`); },
    r => { const a = r.int(2, 9); return B(`Factorise $x^2 - ${a * a}$ as $(x - m)(x + m)$. Find $m$.`, a, `$x^2 - ${a * a} = (x - ${a})(x + ${a})$.`); },
    r => { const a = r.int(2, 6), x = r.int(2, 7); return B(`Evaluate $x^2 + ${2 * a}x + ${a * a}$ when $x = ${x}$.`, (x + a) ** 2, `$x^2 + ${2 * a}x + ${a * a} = (x + ${a})^2 = ${(x + a) ** 2}$.`); },
    r => { const a = r.int(2, 6), b = r.int(2, 6), c = r.int(2, 6); return B(`Expand and simplify $${a}(x + ${b}) + ${c}(x - ${b})$. Find the coefficient of $x$.`, a + c, `$${a}x + ${a * b} + ${c}x - ${b * c} = ${a + c}x + ${a * b - b * c}$.`); },
    r => { const a = r.int(2, 6), b = r.int(1, 5), x = r.int(2, 6); return B(`Evaluate $(x + ${a})(x - ${b})$ when $x = ${x}$.`, (x + a) * (x - b), `$(${x + a})(${x - b}) = ${(x + a) * (x - b)}$.`); },
    r => { const k = r.int(2, 5), a = r.int(2, 6), b = r.int(2, 6); return B(`Factorise completely $${k}x^2 + ${k * a}x$ as $${k}x(x + a)$. Find $a$.`, a, `$${k}x^2 + ${k * a}x = ${k}x(x + ${a})$.`); }
  ], word: [
r => { const a = r.int(2, 5), b = r.int(1, 4), x = b + r.int(2, 7); return B(`A rectangle has length $(x + ${a})$ cm and width $(x - ${b})$ cm. Find its area when $x = ${x}$, in cm².`, (x + a) * (x - b), `$(${x + a})(${x - b}) = ${(x + a) * (x - b)}$ cm².`); },
    r => { const s = r.int(3, 9), a = r.int(2, 4); return B(`A square has side $(x + ${a})$ cm. Find its area when $x = ${s}$, in cm².`, (s + a) ** 2, `$(${s + a})^2 = ${(s + a) ** 2}$ cm².`); },
    r => { const a = r.int(2, 6), b = r.int(2, 6); return B(`A rectangular garden has length $(x + ${a})$ m and width $x$ m. Its area is $x^2 + px$ m². Find $p$.`, a, `Area = $x(x + ${a}) = x^2 + ${a}x$.`); },
    r => { const a = 100 + r.int(1, 4), b = 100 - r.int(1, 4); return B(`Use the identity $a^2 - b^2 = (a - b)(a + b)$ to find the difference between the areas of two squares with sides ${a} m and ${b} m, in m².`, a * a - b * b, `$(${a} - ${b})(${a} + ${b}) = ${a - b} \\times ${a + b} = ${a * a - b * b}$ m².`); },
    r => { const a = r.int(2, 6), x = r.int(5, 10); return B(`A path of width ${a} m surrounds a square pond of side $x$ m. The total area of pond and path is $(x + ${2 * a})^2$ m². Find the total area when $x = ${x}$, in m².`, (x + 2 * a) ** 2, `$(${x} + ${2 * a})^2 = ${(x + 2 * a) ** 2}$ m².`); },
    r => { const a = r.int(2, 5), n = r.int(3, 9); return B(`A cuboid has dimensions $x$ cm, $(x + ${a})$ cm and $${n}$ cm. Find its volume when $x = ${n}$, in cm³.`, n * (n + a) * n, `$${n} \\times ${n + a} \\times ${n} = ${n * (n + a) * n}$ cm³.`); }
  ]});

  /* ---- Graphs of quadratic functions ---- */
  g.push({id: 'G3.2.functions-graphs-and-equations.1', plain: [
    r => { const p = r.int(1, 7), q = r.int(1, 7); if (p === q) return null; return B(`Find the equation of the line of symmetry $x = k$ of the graph $y = (x - ${p})(x - ${q})$. Give $k$ as a decimal.`, (p + q) / 2, `The axis of symmetry is halfway between the roots: $k = \\dfrac{${p} + ${q}}{2} = ${(p + q) / 2}$.`); },
    r => { const h = r.int(-4, 5), k = r.int(-8, 8); return B(`The graph of $y = (x ${pm(-h)})^2 ${pm(k)}$ has its turning point at $(h, k)$. Find $k$.`, k, `For $y = (x - h)^2 + k$ the turning point is $(h, k)$, so $k = ${k}$.`); },
    r => { const h = r.int(-4, 5), k = r.int(-8, 8); return B(`The graph of $y = (x ${pm(-h)})^2 ${pm(k)}$ has its turning point at $(h, k)$. Find $h$.`, h, `The turning point is at $x = ${h}$.`); },
    r => { const c = r.int(-9, 9), b = r.int(-6, 6); return B(`Find the $y$-intercept of $y = x^2 ${pm(b)}x ${pm(c)}$.`, c, `Put $x = 0$: $y = ${c}$.`); },
    r => { const a = r.int(2, 8), x = r.int(-3, 5); return B(`Find $y$ when $x = ${x}$ for $y = x^2 - ${a}x + ${a}$.`, x * x - a * x + a, `$y = (${x})^2 - ${a}(${x}) + ${a} = ${x * x - a * x + a}$.`); },
    r => { const p = r.int(1, 6), q = r.int(1, 6); const v = -((p + q) ** 2) / 4 + p * q; return B(`Find the minimum value of $y = x^2 - ${p + q}x + ${p * q}$. Give your answer as a decimal.`, v, `Complete the square: $y = (x - ${(p + q) / 2})^2 + ${v}$. The minimum is ${v}.`); },
    r => { const a = r.int(2, 8), c = r.int(1, 12); return B(`Find the maximum value of $y = -x^2 + ${2 * a}x + ${c}$.`, a * a + c, `$y = -(x - ${a})^2 + ${a * a + c}$, so the maximum value is ${a * a + c}.`); },
    r => { const a = r.int(1, 4), v = r.int(-9, -1); return B(`The graph of $y = (x - ${a})^2 ${pm(v)}$ is drawn. At how many points does it cross the $x$-axis?`, 2, `The minimum value is ${v}, which is below 0, so it crosses the $x$-axis twice.`); },
    r => { const p = r.int(2, 8); return B(`The graph of $y = x^2 - ${2 * p}x + ${p * p}$ touches the $x$-axis at one point. Find the $x$-coordinate.`, p, `$y = (x - ${p})^2$, so it touches at $x = ${p}$.`); },
    r => { const p = r.int(1, 5), q = r.int(1, 5); return B(`The roots of $y = x^2 - ${p + q}x + ${p * q}$ are $x = ${p}$ and $x = ${q}$. Find the sum of the roots.`, p + q, `$${p} + ${q} = ${p + q}$.`); },
    r => { const h = r.int(2, 6), k = r.int(1, 8); return B(`The turning point of a quadratic graph $y = (x - ${h})^2 + ${k}$ is at $x = ${h}$. Find $y$ when $x = ${h + 2}$.`, 4 + k, `$y = (${h + 2} - ${h})^2 + ${k} = ${4 + k}$.`); },
    r => { const a = r.int(2, 6), c = r.int(2, 9); return B(`For $y = ${a}x^2 + ${c}$, find $y$ when $x = 3$.`, a * 9 + c, `$y = ${a}(9) + ${c} = ${a * 9 + c}$.`); },
    r => { const p = r.int(1, 8), q = r.int(1, 8); return B(`The roots of a quadratic graph are $x = -${p}$ and $x = ${q}$. Find the $x$-coordinate of the turning point as a decimal.`, (q - p) / 2, `Halfway between the roots: $\\dfrac{-${p} + ${q}}{2} = ${(q - p) / 2}$.`); },
    r => { const k = r.int(2, 9); return B(`How many $x$-intercepts does $y = x^2 + ${k}$ have?`, 0, `$x^2 + ${k} > 0$ for all $x$, so the graph never meets the $x$-axis.`); }
  ].concat([
    r => { const p = r.int(-3, 6), q = r.int(-3, 6); if (p === q) return null; return B(`The graph of $y = (x ${pm(-p)})(x ${pm(-q)})$ crosses the $x$-axis at two points. Find the larger $x$-coordinate.`, Math.max(p, q), `The roots are $x = ${p}$ and $x = ${q}$, so the larger is ${Math.max(p, q)}.`); }
  ]), word: [
    r => { const v = r.int(10, 25), t = v / 5; return B(`A ball is thrown upwards. Its height $h$ metres after $t$ seconds is $h = ${v}t - 5t^2$. Find the height after 1 second, in metres.`, v - 5, `$h = ${v}(1) - 5(1)^2 = ${v - 5}$ m.`); },
    r => { const v = r.pick([10, 20, 30, 40]); return B(`A ball's height $h$ metres after $t$ seconds is $h = ${v}t - 5t^2$. Find the time, in seconds, when the ball returns to the ground (excluding $t = 0$).`, v / 5, `$h = 0$: $5t(${v / 5} - t) = 0$, so $t = ${v / 5}$ s.`); },
    r => { const v = r.pick([10, 20, 30, 40]); return B(`A ball's height $h$ metres after $t$ seconds is $h = ${v}t - 5t^2$. Find the greatest height reached, in metres.`, v * v / 20, `The maximum is at $t = ${v / 10}$: $h = ${v}(${v / 10}) - 5(${v / 10})^2 = ${v * v / 20}$ m.`); },
    r => { const P = r.int(5, 12) * 2; return B(`A farmer has ${2 * P} m of fencing for a rectangular pen. If the width is $x$ m, the area is $A = x(${P} - x)$. Find the greatest possible area, in m².`, (P / 2) ** 2, `The maximum occurs at $x = ${P / 2}$: $A = ${P / 2} \\times ${P / 2} = ${(P / 2) ** 2}$ m².`); },
    r => { const w = r.int(3, 9); return B(`A rectangle has a width of $x$ m and a length of $(${2 * w} - x)$ m. Find its area, in m², when $x = ${w - 1}$.`, (w - 1) * (w + 1), `$${w - 1} \\times ${w + 1} = ${(w - 1) * (w + 1)}$ m².`); },
    r => { const a = r.int(2, 5), t = r.int(2, 4); return B(`A stone falls so that the distance it falls is $d = 5t^2$ metres after $t$ seconds. How far has it fallen after ${t} seconds, in metres?`, 5 * t * t, `$d = 5(${t})^2 = ${5 * t * t}$ m.`); }
  ]});

  /* ---- Quadratic equations ---- */
  g.push({id: 'G3.2.functions-graphs-and-equations.2', plain: [
    r => { const p = r.int(1, 9), q = r.int(1, 9); if (p === q) return null; return B(`Solve $(x - ${p})(x - ${q}) = 0$. Find the larger root.`, Math.max(p, q), `$x = ${p}$ or $x = ${q}$. The larger root is ${Math.max(p, q)}.`); },
    r => { const p = r.int(1, 9), q = r.int(1, 9); if (p === q) return null; return B(`Solve $x^2 - ${p + q}x + ${p * q} = 0$. Find the smaller root.`, Math.min(p, q), `$(x - ${p})(x - ${q}) = 0$, so the roots are ${Math.min(p, q)} and ${Math.max(p, q)}.`); },
    r => { const p = r.int(1, 8), q = r.int(1, 8); if (p === q) return null; return B(`Solve $x^2 + ${p + q}x + ${p * q} = 0$. Find the larger root.`, -Math.min(p, q), `$(x + ${p})(x + ${q}) = 0$, so $x = -${p}$ or $x = -${q}$. The larger is ${-Math.min(p, q)}.`); },
r => { const p = r.int(1, 6), q = r.int(1, 6); if (p === q) return null; return B(`Solve $(x + ${p})(x - ${q}) = 0$. Find the positive root.`, q, `$x = -${p}$ or $x = ${q}$. The positive root is ${q}.`); },
    r => { const k = r.int(2, 12); return B(`Solve $x^2 = ${k}x$. Find the non-zero solution.`, k, `$x(x - ${k}) = 0$, so $x = 0$ or $x = ${k}$.`); },
    r => { const a = r.int(2, 12); return B(`Solve $x^2 = ${a * a}$. Find the positive solution.`, a, `$x = \\pm ${a}$. The positive solution is ${a}.`); },
    r => { const p = r.int(1, 7), q = r.int(1, 7); if (p === q) return null; return B(`The roots of $x^2 - ${p + q}x + ${p * q} = 0$ are $\\alpha$ and $\\beta$. Find $\\alpha + \\beta$.`, p + q, `The sum of the roots is the negative of the coefficient of $x$: ${p + q}.`); },
    r => { const p = r.int(1, 7), q = r.int(1, 7); if (p === q) return null; return B(`The roots of $x^2 - ${p + q}x + ${p * q} = 0$ are $\\alpha$ and $\\beta$. Find $\\alpha\\beta$.`, p * q, `The product of the roots is the constant term: ${p * q}.`); },
    r => { const a = r.int(2, 4), p = r.int(1, 6), q = r.int(1, 6); if (p === q) return null; return B(`Solve $${a}(x - ${p})(x - ${q}) = 0$. Find the larger root.`, Math.max(p, q), `The roots are ${p} and ${q}.`); },
    r => { const p = r.int(2, 8); return B(`Solve $(x - ${p})^2 = 0$. Find $x$.`, p, `A repeated root: $x = ${p}$.`); },
    r => { const p = r.int(1, 6), q = r.int(1, 6); if (p === q) return null; return B(`Solve $x^2 = ${p + q}x - ${p * q}$. Find the smaller root.`, Math.min(p, q), `Rearrange: $x^2 - ${p + q}x + ${p * q} = 0$, so $(x - ${p})(x - ${q}) = 0$.`); },
    r => { const p = r.int(1, 6), q = r.int(1, 6); if (p === q) return null; return B(`Solve $x(x + ${p + q}) = -${p * q}$. Find the larger root.`, -Math.min(p, q), `$x^2 + ${p + q}x + ${p * q} = 0$, so $(x + ${p})(x + ${q}) = 0$.`); },
    r => { const a = r.int(2, 5), p = r.int(1, 6); return B(`Solve $${a}x^2 = ${a * p * p}$. Find the positive solution.`, p, `$x^2 = ${p * p}$, so $x = ${p}$.`); },
    r => { const p = r.int(1, 8), q = r.int(1, 8); if (p === q) return null; return B(`One root of $x^2 - ${p + q}x + k = 0$ is ${p}. Find $k$.`, p * q, `Substitute $x = ${p}$: $${p * p} - ${(p + q) * p} + k = 0$, so $k = ${p * q}$.`); }
  ], word: [
    r => { const n = r.int(3, 12); return B(`The product of two consecutive positive integers is ${n * (n + 1)}. Find the larger integer.`, n + 1, `$x(x + 1) = ${n * (n + 1)}$ gives $(x - ${n})(x + ${n + 1}) = 0$, so $x = ${n}$ and the larger integer is ${n + 1}.`); },
    r => { const w = r.int(3, 9), d = r.int(2, 5); return B(`The length of a rectangle is ${d} cm more than its width. Its area is ${w * (w + d)} cm². Find the width in cm.`, w, `$w(w + ${d}) = ${w * (w + d)}$ gives $(w - ${w})(w + ${w + d}) = 0$, so $w = ${w}$.`); },
    r => { const s = r.int(3, 12); return B(`A square has an area of ${s * s} cm². Find the length of its side in cm.`, s, `$x^2 = ${s * s}$, so $x = ${s}$.`); },
r => { const a = r.int(7, 14), d = r.int(2, 4); return B(`The product of Ben's age now and his age ${d} years ago is ${a * (a - d)}. Find Ben's age now.`, a, `$x(x - ${d}) = ${a * (a - d)}$ gives $(x - ${a})(x + ${a - d}) = 0$, so Ben is ${a}.`); },
    r => { const b = r.int(3, 9), h = r.int(2, 6); return B(`A triangle has base $x$ cm and height $(x - ${h})$ cm. Its area is ${b * (b - h) / 2} cm². Find the base in cm.`, b, `$\\dfrac{1}{2}x(x - ${h}) = ${b * (b - h) / 2}$ gives $x^2 - ${h}x - ${b * (b - h)} = 0$, so $x = ${b}$.`); },
    r => { const n = r.int(3, 10), m = n + r.int(1, 4); return B(`Two numbers differ by ${m - n} and their product is ${n * m}. Find the larger positive number.`, m, `$n(n + ${m - n}) = ${n * m}$ gives $n = ${n}$, so the larger number is ${m}.`); }
  ]});

  /* ---- Direct and inverse proportion ---- */
  g.push({id: 'G3.2.proportion.1', plain: [
    r => { const k = r.int(2, 9), x = r.int(2, 9); return B(`$y$ is directly proportional to $x$. When $x = ${x}$, $y = ${k * x}$. Find $y$ when $x = ${x + 3}$.`, k * (x + 3), `$y = ${k}x$, so $y = ${k} \\times ${x + 3} = ${k * (x + 3)}$.`); },
    r => { const k = r.int(2, 9), x = r.int(2, 9); return B(`$y$ is directly proportional to $x$. When $x = ${x}$, $y = ${k * x}$. Find the constant $k$ in $y = kx$.`, k, `$k = ${k * x} \\div ${x} = ${k}$.`); },
    r => { const k = r.int(2, 6) * 12, x = r.int(2, 6); return B(`$y$ is inversely proportional to $x$. When $x = ${x}$, $y = ${k / x}$. Find the constant $k$ in $y = \\dfrac{k}{x}$.`, k, `$k = xy = ${x} \\times ${k / x} = ${k}$.`); },
    r => { const k = r.pick([24, 36, 48, 60, 72]), x = r.pick([2, 3, 4, 6]), z = r.pick([8, 9, 12]); if (k % x || k % z) return null; return B(`$y$ is inversely proportional to $x$. When $x = ${x}$, $y = ${k / x}$. Find $y$ when $x = ${z}$.`, k / z, `$xy = ${k}$, so $y = ${k} \\div ${z} = ${k / z}$.`); },
    r => { const k = r.int(2, 6), x = r.int(2, 5); return B(`$y$ is directly proportional to $x^2$. When $x = ${x}$, $y = ${k * x * x}$. Find $y$ when $x = ${x + 1}$.`, k * (x + 1) ** 2, `$y = ${k}x^2$, so $y = ${k}(${x + 1})^2 = ${k * (x + 1) ** 2}$.`); },
r => { const k = r.int(2, 5), x = r.pick([1, 3, 4]); return B(`$y$ is directly proportional to $x^3$. When $x = ${x}$, $y = ${k * x ** 3}$. Find $y$ when $x = 2$.`, 8 * k, `$y = ${k}x^3$, so $y = ${k}(8) = ${8 * k}$.`); },
    r => { const k = r.int(2, 6) * 4, x = r.pick([1, 2, 4]); return B(`$y$ is inversely proportional to $x^2$. When $x = 2$, $y = ${k}$. Find $y$ when $x = 4$.`, k / 4, `$y = \\dfrac{${4 * k}}{x^2}$, so $y = \\dfrac{${4 * k}}{16} = ${k / 4}$.`); },
    r => { const y1 = r.int(3, 9), x1 = r.int(2, 6), x2 = x1 * r.int(2, 3); return B(`If $y \\propto x$ and $y = ${y1}$ when $x = ${x1}$, find $y$ when $x = ${x2}$.`, y1 * x2 / x1, `$\\dfrac{y}{x}$ is constant, so $y = ${y1} \\times ${x2 / x1} = ${y1 * x2 / x1}$.`); },
    r => { const x1 = r.pick([2, 3, 4, 6]), y1 = r.pick([6, 8, 12]), x2 = r.pick([1, 2, 3, 12, 24]); const v = x1 * y1 / x2; if (!Number.isInteger(v)) return null; return B(`If $y \\propto \\dfrac{1}{x}$ and $y = ${y1}$ when $x = ${x1}$, find $y$ when $x = ${x2}$.`, v, `$xy = ${x1 * y1}$, so $y = ${x1 * y1} \\div ${x2} = ${v}$.`); },
    r => { const k = r.int(3, 9), y = r.int(2, 8) * k; return B(`$y = ${k}x$. Find $x$ when $y = ${y}$.`, y / k, `$x = ${y} \\div ${k} = ${y / k}$.`); },
    r => { const k = r.pick([24, 36, 48]), y = r.pick([2, 3, 4, 6]); if (k % y) return null; return B(`$y = \\dfrac{${k}}{x}$. Find $x$ when $y = ${y}$.`, k / y, `$x = ${k} \\div ${y} = ${k / y}$.`); },
    r => { const k = r.int(2, 9), x = r.int(2, 9); return B(`$y$ is directly proportional to $x$ with constant $${k}$. Find $x$ when $y = ${k * x}$.`, x, `$x = ${k * x} \\div ${k} = ${x}$.`); },
    r => { const k = r.int(2, 6), x = r.int(2, 6); return B(`$y$ is directly proportional to $\\sqrt{x}$. When $x = ${x * x}$, $y = ${k * x}$. Find $y$ when $x = ${(x + 1) ** 2}$.`, k * (x + 1), `$y = ${k}\\sqrt{x}$, so $y = ${k} \\times ${x + 1} = ${k * (x + 1)}$.`); },
    r => { const a = r.int(2, 6), b = r.int(2, 6); return B(`$y$ is directly proportional to $x$. If $y$ increases from $${a * 3}$ to $${a * 6}$, by what factor does $x$ increase?`, 2, `$y$ is doubled, so $x$ is also doubled.`); }
  ], word: [
    r => { const n = r.int(3, 6), c = r.int(4, 9), m = n + r.int(2, 5); return B(`${n} notebooks cost \\$${n * c}. Find the cost of ${m} notebooks in dollars.`, m * c, `One notebook costs \\$${c}, so ${m} cost ${m * c}.`); },
    r => { const w = r.pick([4, 6, 8]), d = r.pick([12, 18, 24]), w2 = r.pick([2, 3, 12]); if ((w * d) % w2) return null; return B(`${w} workers can paint a house in ${d} days. How many days will ${w2} workers take, working at the same rate?`, w * d / w2, `Workers × days = ${w * d}, so ${w2} workers take ${w * d / w2} days.`); },
    r => { const v = r.pick([40, 60, 80]), t = r.pick([3, 4, 6]), v2 = r.pick([48, 120, 30, 90]); if ((v * t) % v2) return null; return B(`A car travels at ${v} km/h and takes ${t} hours to complete a journey. How many hours will it take at ${v2} km/h?`, v * t / v2, `Speed × time = ${v * t} km, so time = ${v * t} ÷ ${v2} = ${v * t / v2} h.`); },
r => { const rate = r.pick([0.72, 0.74, 0.75, 0.78, 0.8]), b = r.int(5, 20) * 10; return B(`The exchange rate is SGD 1 = USD ${rate}. How many US dollars is SGD ${b} worth?`, rd(rate * b, 2), `${rate} × ${b} = ${rd(rate * b, 2)}.`); },
r => { const L = r.pick([6, 7, 8, 9]), k = r.pick([150, 250, 350, 450]); return B(`A car uses ${L} litres of petrol to travel 100 km. Assuming the same rate, how many litres does it use to travel ${k} km?`, rd(L * k / 100, 2), `${L} ÷ 100 × ${k} = ${rd(L * k / 100, 2)} litres.`); },
    r => { const t = r.int(3, 6), p = r.int(4, 9), t2 = r.int(7, 12); return B(`A machine fills ${p * t} bottles in ${t} minutes. How many bottles does it fill in ${t2} minutes?`, p * t2, `Rate = ${p} bottles per minute. In ${t2} minutes: ${p * t2}.`); }
  ]});

  return g;
};
