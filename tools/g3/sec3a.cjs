/* G3 Sec 3 generators, part A: Ch1 More About Quadratic Equations and Functions, Ch2 More About Linear Inequalities,
   Ch3 Indices (6 gyms: laws, zero/negative, fractional, index equations, standard form, compound interest). */
'use strict';
module.exports = function(H){
  const {blank, gcd, sp} = H, B = blank;
  const rd = (x, d) => +x.toFixed(d), g = [];
  const pm = n => n >= 0 ? `+ ${n}` : `- ${-n}`;
  const quad = (a, b, c) => `${a === 1 ? '' : a === -1 ? '-' : a}x^2 ${pm(b)}x ${pm(c)}`;

  /* ---- More about quadratic equations and quadratic functions ---- */
  g.push({id: 'G3.3.more-about-quadratic-equations-and-quadratic-functions.1', plain: [
    r => { const p = r.int(-6, 6) || 3, q = r.int(-9, 9); return B(`Write $x^2 ${pm(2 * p)}x ${pm(p * p + q)}$ in the form $(x + p)^2 + q$. Find $q$.`, q, `$x^2 ${pm(2 * p)}x ${pm(p * p + q)} = (x ${pm(p)})^2 ${pm(q)}$.`); },
    r => { const p = r.int(-6, 6) || 2, q = r.int(-9, 9); return B(`Write $x^2 ${pm(2 * p)}x ${pm(p * p + q)}$ in the form $(x + p)^2 + q$. Find $p$.`, p, `Half the coefficient of $x$ gives $p = ${p}$.`); },
    r => { const a = r.int(1, 3), b = r.int(-8, 8) || 4, c = r.int(-8, 8); return B(`Find the value of the discriminant $b^2 - 4ac$ of $${quad(a, b, c)} = 0$.`, b * b - 4 * a * c, `$b^2 - 4ac = (${b})^2 - 4(${a})(${c}) = ${b * b - 4 * a * c}$.`); },
    r => { const p = r.int(-5, 6), q = r.int(-5, 6); if (p === q) return null; return B(`How many real roots does $(x ${pm(-p)})(x ${pm(-q)}) = 0$ have?`, 2, `The roots are $x = ${p}$ and $x = ${q}$.`); },
    r => { const k = r.int(1, 9); return B(`How many real roots does $x^2 + ${k} = 0$ have?`, 0, `$x^2 = -${k}$ has no real solution.`); },
    r => { const p = r.int(1, 5), q = r.int(1, 5), a = 1; const b = -(p + q), c = p * q; return B(`Solve $x^2 ${pm(b)}x ${pm(c)} = 0$ using the quadratic formula. Find the larger root.`, Math.max(p, q), `$x = \\dfrac{${-b} \\pm \\sqrt{${b * b - 4 * c}}}{2}$, giving ${p} and ${q}.`); },
    r => { const a = r.int(1, 3), b = r.int(3, 9), c = r.int(-6, -1); const d = b * b - 4 * a * c; return B(`Solve $${quad(a, b, c)} = 0$. Find the larger root correct to 2 decimal places.`, rd((-b + Math.sqrt(d)) / (2 * a), 2), `$x = \\dfrac{-${b} + \\sqrt{${d}}}{${2 * a}} = ${rd((-b + Math.sqrt(d)) / (2 * a), 3)}$ ≈ ${rd((-b + Math.sqrt(d)) / (2 * a), 2)}.`); },
    r => { const a = r.int(1, 3), b = r.int(3, 9), c = r.int(-6, -1); const d = b * b - 4 * a * c; return B(`Solve $${quad(a, b, c)} = 0$. Find the smaller root correct to 2 decimal places.`, rd((-b - Math.sqrt(d)) / (2 * a), 2), `$x = \\dfrac{-${b} - \\sqrt{${d}}}{${2 * a}} = ${rd((-b - Math.sqrt(d)) / (2 * a), 3)}$ ≈ ${rd((-b - Math.sqrt(d)) / (2 * a), 2)}.`); },
    r => { const h = r.int(-5, 5), k = r.int(-9, 9); return B(`The graph of $y = x^2 ${pm(-2 * h)}x ${pm(h * h + k)}$ has a minimum point. Find the minimum value of $y$.`, k, `$y = (x ${pm(-h)})^2 ${pm(k)}$, so the minimum value is ${k}.`); },
    r => { const h = r.int(-5, 5) || 2, k = r.int(-9, 9); return B(`The graph of $y = x^2 ${pm(-2 * h)}x ${pm(h * h + k)}$ has its turning point at $(h, k)$. Find $h$.`, h, `$x = -\\dfrac{b}{2a} = ${h}$.`); },
    r => { const a = r.int(2, 3), h = r.int(1, 5), k = r.int(-9, 9); return B(`The graph of $y = ${a}x^2 - ${2 * a * h}x + ${a * h * h + k}$ has a minimum point. Find the minimum value of $y$.`, k, `$y = ${a}(x - ${h})^2 ${pm(k)}$, so the minimum value is ${k}.`); },
    r => { const h = r.int(1, 6), k = r.int(1, 12); return B(`The graph of $y = -x^2 + ${2 * h}x + ${k}$ has a maximum point. Find the maximum value of $y$.`, h * h + k, `$y = -(x - ${h})^2 + ${h * h + k}$, so the maximum value is ${h * h + k}.`); },
    r => { const a = r.int(1, 4), b = r.int(-8, 8) || 2, c = r.int(1, 8); return B(`Find the value of $b^2 - 4ac$ for $${quad(a, b, c)}$ when it is written as $ax^2 + bx + c$.`, b * b - 4 * a * c, `$b^2 - 4ac = ${b * b} - ${4 * a * c} = ${b * b - 4 * a * c}$.`); },
r => { const p = r.int(2, 9); return B(`Find the value of $x$ for which $x^2 - ${2 * p}x + ${p * p} = 0$ has equal roots.`, p, `$(x - ${p})^2 = 0$, so $x = ${p}$.`); },
    r => { const p = r.int(1, 6), q = r.int(1, 6); if (p === q) return null; return B(`The roots of $x^2 - ${p + q}x + ${p * q} = 0$ are $\\alpha$ and $\\beta$. Find $\\alpha^2 + \\beta^2$.`, p * p + q * q, `$\\alpha + \\beta = ${p + q}$ and $\\alpha\\beta = ${p * q}$, so $\\alpha^2 + \\beta^2 = ${(p + q) ** 2} - ${2 * p * q} = ${p * p + q * q}$.`); },
  ], word: [
    r => { const w = r.int(3, 9), d = r.int(2, 6); return B(`A rectangle has length $(x + ${d})$ cm and width $x$ cm. Its area is ${w * (w + d)} cm². Find $x$.`, w, `$x(x + ${d}) = ${w * (w + d)}$ gives $x^2 + ${d}x - ${w * (w + d)} = 0$, so $x = ${w}$.`); },
    r => { const n = r.int(4, 12); return B(`The product of two consecutive odd positive integers is ${n * (n + 2)}. Find the smaller integer.`, n, `$n(n + 2) = ${n * (n + 2)}$ gives $n^2 + 2n - ${n * (n + 2)} = 0$, so $n = ${n}$.`); },
    r => { const t = r.int(2, 5), v = 5 * t; return B(`The height of a ball above the ground is $h = ${5 * t * 2}t - 5t^2$ metres at time $t$ seconds. At what time $t > 0$ (in seconds) does the ball return to the ground?`, 2 * t, `$h = 0$: $5t(${2 * t} - t) = 0$, so $t = ${2 * t}$ s.`); },
    r => { const x = r.int(4, 10), y = x + r.int(2, 4); return B(`The sum of two numbers is ${x + y} and the sum of their squares is ${x * x + y * y}. Find the larger number.`, y, `Let the numbers be $x$ and ${x + y} − $x$: $x^2 + (${x + y} - x)^2 = ${x * x + y * y}$ gives $x = ${x}$ or ${y}. The larger number is ${y}.`); },
    r => { const w = r.int(5, 12), d = r.int(2, 6); return B(`The length of a rectangular field is ${d} m more than its width. Its diagonal is $\\sqrt{${w * w + (w + d) ** 2}}$ m. Find the width in metres.`, w, `$w^2 + (w + ${d})^2 = ${w * w + (w + d) ** 2}$ gives $2w^2 + ${2 * d}w + ${d * d - w * w - (w + d) ** 2} = 0$, so $w = ${w}$.`); }
  ]});

  /* ---- More about linear inequalities ---- */
  g.push({id: 'G3.3.more-about-linear-inequalities.1', plain: [
    r => { const lo = r.int(2, 9), hi = lo + r.int(4, 12), a = r.int(2, 4); return B(`How many integers satisfy both $x \\ge ${lo}$ and $x < ${hi}$?`, hi - lo, `The integers are ${lo} to ${hi - 1}: ${hi - lo} of them.`); },
    r => { const a = r.int(2, 5), b = r.int(1, 9), c = r.int(2, 5), d = r.int(10, 30); const lo = Math.ceil((d + 1 - 0) / a - 0.0001); return B(`Solve the simultaneous inequalities $${a}x - ${b} > ${a * 3 - b}$ and $x \\le ${3 + c + 3}$. Find the number of integer solutions.`, 3 + c + 3 - 3, `From the first, $x > 3$. So $4 \\le x \\le ${3 + c + 3}$, giving ${3 + c + 3 - 3} integers.`); },
r => { const a = r.int(2, 5), x = r.int(3, 9); return B(`Find the smallest integer $x$ satisfying $\\dfrac{x}{${a}} > ${x}$.`, a * x + 1, `$x > ${a * x}$, so the smallest integer is ${a * x + 1}.`); },
    r => { const a = r.int(2, 6), b = r.int(1, 9), c = r.int(10, 40); return B(`Find the greatest integer $x$ satisfying $${a}x - ${b} < ${c}$.`, Math.ceil((c + b) / a) - 1, `$${a}x < ${c + b}$, so $x < ${rd((c + b) / a, 3)}$. The greatest integer is ${Math.ceil((c + b) / a) - 1}.`); },
    r => { const lo = r.int(-8, -2), hi = r.int(3, 9); return B(`List the integers $x$ such that $${lo} < x \\le ${hi}$. Find their sum.`, (lo + 1 + hi) * (hi - lo) / 2, `Sum of ${lo + 1} to ${hi} = ${(lo + 1 + hi) * (hi - lo) / 2}.`); },
r => { const a = r.int(3, 6), b = r.int(2, 5), c = 2, k = r.int(2, 9); return B(`Solve $${a}x - ${b} \\le ${c}x + ${b + (a - c) * k}$. Find the greatest integer $x$.`, Math.floor(((a - c) * k + 2 * b) / (a - c)), `$${a - c}x \\le ${(a - c) * k + 2 * b}$, so $x \\le ${rd(((a - c) * k + 2 * b) / (a - c), 3)}$.`); },
    r => { const a = r.int(2, 4), k = r.int(2, 9); return B(`Solve $-${a}x + ${a * k} \\ge 0$. Find the greatest integer $x$.`, k, `$-${a}x \\ge -${a * k}$, so $x \\le ${k}$.`); },
    r => { const v = r.int(2, 6), t = r.int(5, 12); return B(`The inequality $\\dfrac{x - ${v}}{${t}} \\ge 1$ has smallest integer solution $x = ?$`, v + t, `$x - ${v} \\ge ${t}$, so $x \\ge ${v + t}$.`); },
    r => { const a = r.int(1, 5), b = r.int(6, 12); return B(`How many positive integers satisfy $x + ${a} < ${b}$?`, b - a - 1, `$x < ${b - a}$, so $x = 1, 2, …, ${b - a - 1}$: ${b - a - 1} integers.`); },
    r => { const a = r.int(3, 9), b = r.int(2, 8); return B(`Find the greatest integer value of $x$ for which $${a}x + ${b} < ${a * 10}$.`, Math.ceil((a * 10 - b) / a) - 1, `$${a}x < ${a * 10 - b}$, so $x < ${rd((a * 10 - b) / a, 3)}$.`); },
    r => { const k = r.int(2, 6), m = r.int(3, 9); return B(`Solve $\\dfrac{${k}x + 1}{${m}} < ${k}$. Find the greatest integer $x$.`, Math.ceil((k * m - 1) / k) - 1, `$${k}x + 1 < ${k * m}$, so $x < ${rd((k * m - 1) / k, 3)}$.`); },
    r => { const a = r.int(2, 4), b = r.int(2, 5), c = r.int(1, 6); return B(`Find the smallest integer $x$ satisfying $${a}(x - ${b}) \\ge ${c}$.`, Math.ceil(c / a + b), `$x - ${b} \\ge ${rd(c / a, 3)}$, so $x \\ge ${rd(c / a + b, 3)}$. The smallest integer is ${Math.ceil(c / a + b)}.`); },
    r => { const lo = r.int(2, 6), hi = lo + r.int(5, 12); return B(`Find the number of integers $x$ with $${lo} < x < ${hi}$.`, hi - lo - 1, `${lo + 1} to ${hi - 1} gives ${hi - lo - 1} integers.`); },
    r => { const k = r.int(3, 9); return B(`If $-${k} < x < ${k}$ and $x$ is an integer, find the sum of the squares of all possible values of $x$.`, 2 * (k - 1) * k * (2 * k - 1) / 6, `Sum of squares of 1 to ${k - 1}, doubled = ${2 * (k - 1) * k * (2 * k - 1) / 6}.`); }
  ], word: [
    r => { const a = r.int(8, 15), b = r.int(15, 25); return B(`A taxi fare is \\$${a} plus \\$2 per km. Ali has at most \\$${a + 2 * b}. What is the greatest whole number of km he can travel?`, b, `$${a} + 2d \\le ${a + 2 * b}$, so $d \\le ${b}$.`); },
    r => { const m = r.int(50, 90), c = r.int(4, 9); return B(`Zara has \\$${m}. Each ticket costs \\$${c}. She wants to keep at least \\$10. What is the greatest number of tickets she can buy?`, Math.floor((m - 10) / c), `$${c}n \\le ${m - 10}$, so $n \\le ${rd((m - 10) / c, 2)}$. The greatest number is ${Math.floor((m - 10) / c)}.`); },
    r => { const w = r.int(2, 4) * 5, n = r.int(4, 8); return B(`A box can hold a maximum of ${w * n + w - 1} kg. Each parcel weighs ${w} kg. What is the greatest number of parcels it can hold?`, n, `$${w}p \\le ${w * n + w - 1}$, so $p \\le ${rd((w * n + w - 1) / w, 2)}$. The greatest number is ${n}.`); },
    r => { const lo = r.int(18, 22), hi = r.int(26, 32); return B(`The temperature $T$ °C in a room satisfies $${lo} \\le T \\le ${hi}$ and is a whole number. How many different temperatures are possible?`, hi - lo + 1, `${lo} to ${hi} inclusive gives ${hi - lo + 1} values.`); },
    r => { const a = r.int(2, 4), L = r.int(30, 50), b = r.int(2, 5); return B(`A rectangle has length ${L} cm and width $x$ cm. Its perimeter must be less than ${2 * (L + a * b)} cm. What is the greatest whole-number width $x$ in cm?`, a * b - 1, `$2(${L} + x) < ${2 * (L + a * b)}$, so $x < ${a * b}$. The greatest whole number is ${a * b - 1}.`); },
    r => { const s = r.int(60, 80), n = r.int(3, 5), t = s + r.int(1, 3); return B(`A student has marks averaging ${s} in ${n} tests. What is the least mark needed in the next test to get an average of at least ${t} overall? (Marks are whole numbers.)`, t * (n + 1) - s * n, `$\\dfrac{${s * n} + m}{${n + 1}} \\ge ${t}$ gives $m \\ge ${t * (n + 1) - s * n}$.`); }
  ]});

  /* ---- Indices: laws ---- */
  g.push({id: 'G3.3.indices.1', plain: [
    r => { const b = r.int(2, 9), m = r.int(2, 8), n = r.int(2, 8); return B(`Simplify $${b}^{${m}} \\times ${b}^{${n}}$ to the form $${b}^k$. Find $k$.`, m + n, `Add the indices: ${m} + ${n} = ${m + n}.`); },
    r => { const b = r.int(2, 9), n = r.int(2, 5), m = n + r.int(2, 7); return B(`Simplify $${b}^{${m}} \\div ${b}^{${n}}$ to the form $${b}^k$. Find $k$.`, m - n, `Subtract the indices: ${m} − ${n} = ${m - n}.`); },
    r => { const b = r.int(2, 9), m = r.int(2, 5), n = r.int(2, 5); return B(`Simplify $(${b}^{${m}})^{${n}}$ to the form $${b}^k$. Find $k$.`, m * n, `Multiply the indices: ${m} × ${n} = ${m * n}.`); },
    r => { const a = r.int(2, 5), m = r.int(2, 5), n = r.int(2, 4); return B(`Simplify $x^{${m}} \\times x^{${n}}$ and find the index of $x$.`, m + n, `${m} + ${n} = ${m + n}.`); },
    r => { const a = r.int(2, 4), b = r.int(2, 4), m = r.int(2, 5), n = r.int(2, 5); return B(`Simplify $${a}x^{${m}} \\times ${b}x^{${n}}$ and find the coefficient of $x^{${m + n}}$.`, a * b, `$${a} \\times ${b} = ${a * b}$ and $x^{${m}} \\times x^{${n}} = x^{${m + n}}$.`); },
    r => { const a = r.int(6, 12), b = r.int(2, 3), m = r.int(5, 9), n = r.int(2, 4); if (a % b) return null; return B(`Simplify $\\dfrac{${a}x^{${m}}}{${b}x^{${n}}}$ and find the coefficient of $x^{${m - n}}$.`, a / b, `$${a} \\div ${b} = ${a / b}$ and $x^{${m}} \\div x^{${n}} = x^{${m - n}}$.`); },
    r => { const b = r.int(2, 4), m = r.int(2, 4), n = r.int(2, 3); return B(`Evaluate $(${b}^{${m}})^{${n}} \\div ${b}^{${m * n - 2}}$.`, b * b, `$${b}^{${m * n}} \\div ${b}^{${m * n - 2}} = ${b}^2 = ${b * b}$.`); },
r => { const a = r.int(2, 4), b = r.int(2, 4); return B(`Evaluate $(${a} \\times ${b})^2$.`, (a * b) ** 2, `$(${a * b})^2 = ${(a * b) ** 2}$.`); },
    r => { const a = r.int(2, 5), m = r.int(2, 4), n = r.int(2, 3); return B(`Simplify $(${a}x^{${m}})^{${n}}$ and find the coefficient of $x^{${m * n}}$.`, a ** n, `$(${a}x^{${m}})^{${n}} = ${a ** n}x^{${m * n}}$.`); },
    r => { const m = r.int(3, 8), n = r.int(2, 6), k = r.int(1, 4); return B(`Simplify $x^{${m}} \\times x^{${n}} \\div x^{${k}}$ and find the index of $x$.`, m + n - k, `${m} + ${n} − ${k} = ${m + n - k}.`); },
    r => { const b = r.int(2, 5), n = r.int(2, 5); return B(`Evaluate $${b}^{${n}} \\times ${b}^{2} \\div ${b}^{${n + 1}}$.`, b, `Index = ${n} + 2 − ${n + 1} = 1, so the value is ${b}.`); },
    r => { const a = r.int(2, 4), b = r.int(2, 3), m = r.int(2, 5), n = r.int(2, 4); return B(`Find the value of $${a}^{${m}} \\times ${b}^{${n}}$.`, a ** m * b ** n, `${a ** m} × ${b ** n} = ${a ** m * b ** n}.`); },
    r => { const k = r.int(2, 6), p = r.int(2, 5); return B(`If $2^{${p}} \\times 2^{n} = 2^{${p + k}}$, find $n$.`, k, `${p} + n = ${p + k}, so n = ${k}.`); },
    r => { const k = r.int(2, 6), p = r.int(8, 12); return B(`If $3^{${p}} \\div 3^{n} = 3^{${p - k}}$, find $n$.`, k, `${p} − n = ${p - k}, so n = ${k}.`); },
    r => { const a = r.int(2, 4), m = r.int(2, 3), n = r.int(2, 3); return B(`Evaluate $\\dfrac{(${a}^{${m}})^{${n}}}{${a}^{${m * n - 1}}}$.`, a, `$${a}^{${m * n}} \\div ${a}^{${m * n - 1}} = ${a}$.`); }
  ], word: [
    r => { const N = r.int(2, 5) * 10, h = r.int(3, 6); return B(`A culture has ${N} bacteria and doubles every hour. How many bacteria are there after ${h} hours?`, N * 2 ** h, `${N} × 2^${h} = ${N * 2 ** h}.`); },
    r => { const k = r.int(3, 5), n = r.int(3, 5); return B(`A rumour starts with 1 person. Each person tells ${k} new people each day. How many people are told on day ${n}?`, k ** n, `Day ${n}: ${k}^${n} = ${k ** n}.`); },
    r => { const e = r.int(3, 9); return B(`A cube has edge ${e} cm. Find its volume in cm³.`, e ** 3, `${e}³ = ${e ** 3}.`); },
    r => { const P = r.pick([100, 200, 500]), n = r.int(2, 4); return B(`A shop's profit triples every year. This year's profit is \\$${P}. What will it be after ${n} years, in dollars?`, P * 3 ** n, `${P} × 3^${n} = ${P * 3 ** n}.`); },
    r => { const n = r.int(4, 8); return B(`A sheet of paper 0.1 mm thick is folded in half ${n} times. Find the thickness in mm.`, rd(0.1 * 2 ** n, 1), `0.1 × 2^${n} = ${rd(0.1 * 2 ** n, 1)} mm.`); },
    r => { const n = r.int(3, 6); return B(`A tournament starts with ${2 ** n} players. Half the players are knocked out each round. How many rounds are needed to find the winner?`, n, `${2 ** n} → … → 1 takes ${n} rounds.`); }
  ]});

  /* ---- Indices: zero and negative ---- */
  g.push({id: 'G3.3.indices.2', plain: [
    r => { const b = r.int(2, 9), n = r.int(1, 4); return B(`Evaluate $${b}^{0} + ${b}^{${n}}$.`, 1 + b ** n, `$${b}^0 = 1$ and $${b}^{${n}} = ${b ** n}$, so the sum is ${1 + b ** n}.`); },
    r => { const b = r.pick([2, 4, 5, 10]), n = r.int(1, 3), v = rd(1 / b ** n, 4); return B(`Evaluate $${b}^{-${n}}$ as a decimal.`, v, `$${b}^{-${n}} = \\dfrac{1}{${b ** n}} = ${v}$.`); },
    r => { const b = r.int(2, 5), n = r.int(2, 4); return B(`Evaluate $\\left(\\dfrac{1}{${b}}\\right)^{-${n}}$.`, b ** n, `$\\left(\\dfrac{1}{${b}}\\right)^{-${n}} = ${b}^{${n}} = ${b ** n}$.`); },
    r => { const a = r.int(2, 5), b = r.int(2, 4), k = r.int(2, 4); return B(`Evaluate $\\left(\\dfrac{${a}}{${b}}\\right)^{-1}$ as a decimal.`, rd(b / a, 4), `The reciprocal is $\\dfrac{${b}}{${a}} = ${rd(b / a, 4)}$.`); },
    r => { const n = r.int(2, 6), m = r.int(1, 5); return B(`Write $\\dfrac{1}{x^{${n}}}$ as $x^{k}$. Find $k$.`, -n, `$\\dfrac{1}{x^{${n}}} = x^{-${n}}$.`); },
    r => { const n = r.int(2, 5), m = r.int(2, 4); return B(`Simplify $x^{${m}} \\times x^{-${n}}$ and find the index of $x$.`, m - n, `${m} + (−${n}) = ${m - n}.`); },
    r => { const a = r.int(2, 5), n = r.int(2, 3); return B(`Evaluate $${a}^{-${n}} \\times ${a}^{${n + 2}}$.`, a ** 2, `$${a}^{${-n + n + 2}} = ${a ** 2}$.`); },
    r => { const k = r.int(2, 6); return B(`Evaluate $(2^{${k}})^{0}$.`, 1, 'Any non-zero number to the power 0 is 1.'); },
    r => { const a = r.pick([2, 4, 5, 10]), n = r.int(1, 2), v = rd(3 * 1 / a ** n, 4); return B(`Evaluate $3 \\times ${a}^{-${n}}$ as a decimal.`, v, `$3 \\times \\dfrac{1}{${a ** n}} = ${v}$.`); },
    r => { const a = r.int(2, 4), b = r.int(2, 4); return B(`Evaluate $\\dfrac{${a}^{3}}{${a}^{5}}$ as a fraction $\\dfrac{1}{k}$. Find $k$.`, a * a, `$${a}^{3-5} = ${a}^{-2} = \\dfrac{1}{${a * a}}$.`); },
    r => { const n = r.int(1, 4); return B(`Evaluate $10^{-${n}}$ as a decimal.`, rd(10 ** -n, 4), `$10^{-${n}} = ${rd(10 ** -n, 4)}$.`); },
r => { const a = r.int(2, 5), n = r.int(2, 4); return B(`Evaluate $${a}^{${n}} \\times ${a}^{-${n}}$.`, 1, `$${a}^{${n}} \\times ${a}^{-${n}} = ${a}^0 = 1$.`); },
    r => { const a = r.int(2, 4), n = r.int(2, 4); return B(`Evaluate $(-${a})^{-2}$ as a decimal correct to 4 decimal places.`, rd(1 / a ** 2, 4), `$(-${a})^{-2} = \\dfrac{1}{(-${a})^2} = \\dfrac{1}{${a * a}} = ${rd(1 / a ** 2, 4)}$.`); },
    r => { const a = r.int(2, 3), n = r.int(2, 3); return B(`Evaluate $\\dfrac{1}{${a}^{-${n}}}$.`, a ** n, `$\\dfrac{1}{${a}^{-${n}}} = ${a}^{${n}} = ${a ** n}$.`); },
r => { const k = r.int(2, 6), c = r.int(2, 9); return B(`Express $\\dfrac{${c}}{x^{${k}}}$ as $${c}x^{n}$. Find $n$.`, -k, `$\\dfrac{${c}}{x^{${k}}} = ${c}x^{-${k}}$.`); }
  ], word: [
    r => { const n = r.int(2, 4); return B(`A computer chip has a feature size of $10^{-${n}}$ mm. Write this as a decimal in mm.`, rd(10 ** -n, 4), `$10^{-${n}} = ${rd(10 ** -n, 4)}$.`); },
    r => { const v = r.int(2, 5), t = r.int(2, 3); return B(`A radioactive sample's mass after $t$ hours is $M = 64 \\times 2^{-t}$ grams. Find the mass after ${t + 1} hours, in grams.`, 64 / 2 ** (t + 1), `$M = 64 \\times 2^{-${t + 1}} = ${64 / 2 ** (t + 1)}$ g.`); },
    r => { const k = r.int(2, 4); return B(`The value of a machine is $V = 8000 \\times 2^{-n}$ dollars after $n$ years. Find its value after ${k} years, in dollars.`, 8000 / 2 ** k, `$8000 \\times 2^{-${k}} = ${8000 / 2 ** k}$.`); },
    r => { const a = r.pick([2, 4, 5]), n = r.int(1, 2); return B(`A recipe uses $${a}^{-${n}}$ of a litre of milk for each person. Write this amount as a decimal in litres.`, rd(1 / a ** n, 4), `$${a}^{-${n}} = \\dfrac{1}{${a ** n}} = ${rd(1 / a ** n, 4)}$.`); },
    r => { const n = r.int(2, 5); return B(`A virus doubles each hour. If there are 1024 viruses now, how many were there ${n} hours ago?`, 1024 / 2 ** n, `$1024 \\times 2^{-${n}} = ${1024 / 2 ** n}$.`); },
    r => { const n = r.int(3, 6); return B(`The thickness of a sheet of foil is $10^{-${n}}$ m. How many sheets are needed to make a stack 1 m high?`, 10 ** n, `1 ÷ $10^{-${n}}$ = ${sp(10 ** n)}.`); }
  ]});

  /* ---- Indices: fractional ---- */
  g.push({id: 'G3.3.indices.3', plain: [
    r => { const b = r.pick([4, 9, 16, 25, 36, 49, 64, 100]); return B(`Evaluate $${b}^{\\frac{1}{2}}$.`, Math.sqrt(b), `$${b}^{1/2} = \\sqrt{${b}} = ${Math.sqrt(b)}$.`); },
    r => { const b = r.pick([8, 27, 64, 125, 216, 1000]); return B(`Evaluate $${b}^{\\frac{1}{3}}$.`, Math.round(Math.cbrt(b)), `$${b}^{1/3} = \\sqrt[3]{${b}} = ${Math.round(Math.cbrt(b))}$.`); },
    r => { const b = r.pick([[8, 2], [27, 2], [64, 2], [125, 2], [1000, 2]]); return B(`Evaluate $${b[0]}^{\\frac{2}{3}}$.`, Math.round(Math.cbrt(b[0])) ** 2, `$${b[0]}^{2/3} = (\\sqrt[3]{${b[0]}})^2 = ${Math.round(Math.cbrt(b[0])) ** 2}$.`); },
    r => { const b = r.pick([4, 9, 16, 25, 36]); return B(`Evaluate $${b}^{\\frac{3}{2}}$.`, Math.sqrt(b) ** 3, `$${b}^{3/2} = (\\sqrt{${b}})^3 = ${Math.sqrt(b) ** 3}$.`); },
r => { const b = r.pick([4, 16, 25, 64, 100]); return B(`Evaluate $${b}^{-\\frac{1}{2}}$ as a decimal.`, rd(1 / Math.sqrt(b), 4), `$${b}^{-1/2} = \\dfrac{1}{\\sqrt{${b}}} = ${rd(1 / Math.sqrt(b), 4)}$.`); },
    r => { const b = r.pick([8, 27, 64, 125]); return B(`Evaluate $${b}^{-\\frac{1}{3}}$ as a decimal correct to 4 decimal places.`, rd(1 / Math.cbrt(b), 4), `$${b}^{-1/3} = \\dfrac{1}{${Math.round(Math.cbrt(b))}} = ${rd(1 / Math.cbrt(b), 4)}$.`); },
    r => { const b = r.pick([16, 81, 256, 625]); return B(`Evaluate $${b}^{\\frac{1}{4}}$.`, Math.round(Math.pow(b, 0.25)), `$${b}^{1/4} = ${Math.round(Math.pow(b, 0.25))}$.`); },
    r => { const k = r.int(2, 6); return B(`Write $\\sqrt{x^{${2 * k}}}$ as $x^n$. Find $n$.`, k, `$\\sqrt{x^{${2 * k}}} = x^{${2 * k}/2} = x^{${k}}$.`); },
    r => { const k = r.int(1, 4); return B(`Write $\\sqrt[3]{x^{${3 * k}}}$ as $x^n$. Find $n$.`, k, `$\\sqrt[3]{x^{${3 * k}}} = x^{${k}}$.`); },
    r => { const b = r.pick([4, 9, 16, 25]), c = r.pick([8, 27, 64]); return B(`Evaluate $${b}^{\\frac{1}{2}} \\times ${c}^{\\frac{1}{3}}$.`, Math.sqrt(b) * Math.round(Math.cbrt(c)), `$${Math.sqrt(b)} \\times ${Math.round(Math.cbrt(c))} = ${Math.sqrt(b) * Math.round(Math.cbrt(c))}$.`); },
    r => { const a = r.pick([4, 9, 16, 25]); return B(`Evaluate $(${a} \\times ${a})^{\\frac{1}{2}}$.`, a, `$(${a * a})^{1/2} = ${a}$.`); },
    r => { const b = r.pick([[4, 5], [9, 3], [16, 3], [25, 2]]); return B(`Evaluate $${b[0]}^{\\frac{1}{2}} \\times ${b[0]}^{\\frac{1}{2}}$.`, b[0], `$${b[0]}^{1/2 + 1/2} = ${b[0]}^1 = ${b[0]}$.`); },
    r => { const a = r.int(2, 4); return B(`If $x^{\\frac{1}{2}} = ${a * 2}$, find $x$.`, (a * 2) ** 2, `Square both sides: $x = ${(a * 2) ** 2}$.`); },
    r => { const a = r.int(2, 5); return B(`If $x^{\\frac{1}{3}} = ${a}$, find $x$.`, a ** 3, `Cube both sides: $x = ${a ** 3}$.`); },
    r => { const a = r.pick([4, 9, 16]), b = r.pick([8, 27]); return B(`Evaluate $${a}^{-\\frac{1}{2}} + ${b}^{\\frac{2}{3}}$ as a decimal.`, rd(1 / Math.sqrt(a) + Math.round(Math.cbrt(b)) ** 2, 4), `$\\dfrac{1}{${Math.sqrt(a)}} + ${Math.round(Math.cbrt(b)) ** 2} = ${rd(1 / Math.sqrt(a) + Math.round(Math.cbrt(b)) ** 2, 4)}$.`); }
  ], word: [
    r => { const s = r.int(3, 12); return B(`A square tile has an area of ${s * s} cm². Using fractional indices, its side is $${s * s}^{\\frac{1}{2}}$ cm. Find the side length in cm.`, s, `$${s * s}^{1/2} = ${s}$.`); },
    r => { const e = r.int(2, 9); return B(`The volume of a cube is ${e ** 3} cm³. Its edge is $${e ** 3}^{\\frac{1}{3}}$ cm. Find the edge in cm.`, e, `$${e ** 3}^{1/3} = ${e}$.`); },
    r => { const t = r.pick([4, 9, 16, 25, 36]); return B(`The period of a pendulum is proportional to $L^{\\frac{1}{2}}$. For $L = ${t}$ units the value of $L^{\\frac{1}{2}}$ is needed. Find it.`, Math.sqrt(t), `$${t}^{1/2} = ${Math.sqrt(t)}$.`); },
    r => { const v = r.pick([8, 27, 64, 125, 216]); return B(`A spherical balloon has volume proportional to $r^3$. The cube root of its volume factor ${v} is its radius factor $${v}^{\\frac{1}{3}}$. Find it.`, Math.round(Math.cbrt(v)), `$${v}^{1/3} = ${Math.round(Math.cbrt(v))}$.`); },
    r => { const a = r.pick([8, 27, 64]); return B(`The surface area of a cube is $6x^{2}$ and its volume is $x^3$. If the volume is ${a} cm³, find $x^2$ (the area of one face) in cm².`, Math.round(Math.cbrt(a)) ** 2, `$x = ${a}^{1/3} = ${Math.round(Math.cbrt(a))}$ so $x^2 = ${Math.round(Math.cbrt(a)) ** 2}$.`); },
    r => { const a = r.pick([16, 81, 256]); return B(`A population is $${a}^{\\frac{1}{4}}$ thousand. Find the population in thousands.`, Math.round(Math.pow(a, 0.25)), `$${a}^{1/4} = ${Math.round(Math.pow(a, 0.25))}$.`); }
  ]});

  /* ---- Indices: solving index equations ---- */
  g.push({id: 'G3.3.indices.4', plain: [
    r => { const b = r.int(2, 5), n = r.int(2, 5); return B(`Solve $${b}^{x} = ${b ** n}$. Find $x$.`, n, `$${b ** n} = ${b}^{${n}}$, so $x = ${n}$.`); },
    r => { const b = r.int(2, 4), n = r.int(1, 4), k = r.int(1, 3); return B(`Solve $${b}^{x + ${k}} = ${b ** (n + k)}$. Find $x$.`, n, `$x + ${k} = ${n + k}$, so $x = ${n}$.`); },
    r => { const b = r.pick([2, 3, 5]), n = r.int(2, 4); return B(`Solve $${b}^{2x} = ${b ** (2 * n)}$. Find $x$.`, n, `$2x = ${2 * n}$, so $x = ${n}$.`); },
    r => { const b = r.pick([2, 3]), n = r.int(1, 4); return B(`Solve $${b}^{x} = \\dfrac{1}{${b ** n}}$. Find $x$.`, -n, `$\\dfrac{1}{${b ** n}} = ${b}^{-${n}}$, so $x = ${-n}$.`); },
    r => { const n = r.int(2, 5); return B(`Solve $4^{x} = ${2 ** (2 * n)}$. Find $x$.`, n, `$4^{x} = 2^{2x} = 2^{${2 * n}}$, so $x = ${n}$.`); },
    r => { const n = r.int(1, 4); return B(`Solve $8^{x} = ${2 ** (3 * n)}$. Find $x$.`, n, `$8^{x} = 2^{3x} = 2^{${3 * n}}$, so $x = ${n}$.`); },
    r => { const n = r.int(2, 5); return B(`Solve $9^{x} = ${3 ** (2 * n)}$. Find $x$.`, n, `$3^{2x} = 3^{${2 * n}}$, so $x = ${n}$.`); },
    r => { const k = r.int(1, 3), n = r.int(1, 3); return B(`Solve $2^{x} \\times 2^{${k}} = ${2 ** (n + k)}$. Find $x$.`, n, `$2^{x + ${k}} = 2^{${n + k}}$, so $x = ${n}$.`); },
    r => { const n = r.int(1, 4); return B(`Solve $\\dfrac{3^{x}}{3^{2}} = ${3 ** n}$. Find $x$.`, n + 2, `$3^{x - 2} = 3^{${n}}$, so $x = ${n + 2}$.`); },
    r => { const n = r.int(1, 3); return B(`Solve $25^{x} = ${5 ** (2 * n)}$. Find $x$.`, n, `$5^{2x} = 5^{${2 * n}}$, so $x = ${n}$.`); },
    r => { const n = r.int(1, 4); return B(`Solve $2^{3x - 1} = ${2 ** (3 * n - 1)}$. Find $x$.`, n, `$3x - 1 = ${3 * n - 1}$, so $x = ${n}$.`); },
    r => { const n = r.int(2, 5); return B(`Solve $27^{x} = ${3 ** (3 * n)}$. Find $x$.`, n, `$3^{3x} = 3^{${3 * n}}$, so $x = ${n}$.`); },
    r => { const a = r.int(2, 4), n = r.int(2, 5); return B(`Solve $${a}^{x} = ${a ** n}$ and find $x^2$.`, n * n, `$x = ${n}$, so $x^2 = ${n * n}$.`); },
r => { const n = r.int(1, 4); return B(`Solve $2^{x} = \\dfrac{1}{${2 ** (n + 1)}}$. Find $x$.`, -(n + 1), `$2^{x} = 2^{-${n + 1}}$, so $x = ${-(n + 1)}$.`); },
    r => { const n = r.int(2, 6); return B(`Solve $x^{3} = ${n ** 3}$. Find $x$.`, n, `$x = \\sqrt[3]{${n ** 3}} = ${n}$.`); }
  ], word: [
    r => { const n = r.int(4, 8); return B(`A culture of bacteria starts at 1 and doubles every hour. After how many hours does it reach ${2 ** n}?`, n, `$2^{t} = ${2 ** n}$, so $t = ${n}$.`); },
    r => { const k = r.int(2, 4), n = r.int(3, 6); return B(`A virus spreads so that each infected person infects ${k} others. After $n$ rounds, ${k ** n} people are newly infected. Find $n$.`, n, `$${k}^{n} = ${k ** n}$, so $n = ${n}$.`); },
    r => { const n = r.int(3, 7); return B(`A sheet of paper is folded in half repeatedly, doubling the layers each time. After how many folds are there ${2 ** n} layers?`, n, `$2^{n} = ${2 ** n}$, so $n = ${n}$.`); },
    r => { const P = 5 * r.int(2, 8), n = r.int(3, 6); return B(`A drug's concentration halves every hour. It starts at ${P * 2 ** n} units. After how many hours is it ${P} units?`, n, `${P * 2 ** n} ÷ ${P} = ${2 ** n} = $2^{${n}}$, so ${n} hours.`); },
    r => { const n = r.int(3, 6); return B(`An investment of \\$1 triples every year. After how many years is it worth \\$${3 ** n}?`, n, `$3^{n} = ${3 ** n}$, so $n = ${n}$.`); },
    r => { const k = r.int(2, 5), n = r.int(2, 4); return B(`The number of cells in a sample is $${k}^{t}$ after $t$ days. After how many days are there ${k ** n} cells?`, n, `$${k}^{t} = ${k ** n}$ gives $t = ${n}$.`); }
  ]});

  /* ---- Indices: standard form ---- */
  const sf = (a, n) => `${a} \\times 10^{${n}}`;
  g.push({id: 'G3.3.indices.5', plain: [
    r => { const a = r.int(11, 99) / 10, n = r.int(3, 9); return B(`Write ${sp(Math.round(a * 10 ** n))} in standard form $a \\times 10^{n}$. Find $n$.`, n, `${sp(Math.round(a * 10 ** n))} = $${sf(a, n)}$.`); },
    r => { const a = r.int(11, 99) / 10, n = r.int(3, 9); return B(`Write ${sp(Math.round(a * 10 ** n))} in standard form $a \\times 10^{n}$. Find $a$.`, a, `${sp(Math.round(a * 10 ** n))} = $${sf(a, n)}$.`); },
    r => { const a = r.int(11, 99) / 10, n = r.int(2, 6); return B(`Write ${rd(a * 10 ** -n, n + 1)} in standard form $a \\times 10^{n}$. Find $n$.`, -n, `${rd(a * 10 ** -n, n + 1)} = $${sf(a, -n)}$.`); },
    r => { const a = r.int(11, 99) / 10, n = r.int(2, 6); return B(`Write ${rd(a * 10 ** -n, n + 1)} in standard form $a \\times 10^{n}$. Find $a$.`, a, `${rd(a * 10 ** -n, n + 1)} = $${sf(a, -n)}$.`); },
    r => { const a = r.int(2, 5), b = r.int(2, 4), m = r.int(2, 6), n = r.int(2, 6); const p = a * b; return B(`Evaluate $(${a} \\times 10^{${m}}) \\times (${b} \\times 10^{${n}})$ and write it as $c \\times 10^{k}$ with $1 \\le c < 10$. Find $k$.`, m + n + (p >= 10 ? 1 : 0), `$${p} \\times 10^{${m + n}} = ${p >= 10 ? p / 10 : p} \\times 10^{${m + n + (p >= 10 ? 1 : 0)}}$.`); },
    r => { const a = r.int(2, 4), b = r.int(2, 4), m = r.int(3, 8), n = r.int(1, 2); return B(`Evaluate $(${a * b} \\times 10^{${m}}) \\div (${b} \\times 10^{${n}})$ and write it as $c \\times 10^{k}$ with $1 \\le c < 10$. Find $k$.`, m - n, `$${a} \\times 10^{${m - n}}$, so $k = ${m - n}$.`); },
    r => { const a = r.int(2, 6), n = r.int(3, 6); return B(`Evaluate $${a} \\times 10^{${n}} + ${a} \\times 10^{${n}}$ and write it as $c \\times 10^{k}$ with $1 \\le c < 10$. Find $c$.`, 2 * a >= 10 ? 2 * a / 10 : 2 * a, `$${2 * a} \\times 10^{${n}}$ = $${2 * a >= 10 ? 2 * a / 10 : 2 * a} \\times 10^{${2 * a >= 10 ? n + 1 : n}}$.`); },
    r => { const a = r.int(2, 5), n = r.int(3, 7); return B(`Write $${a} \\times 10^{${n}}$ as an ordinary number. How many zeros does it contain?`, n, `$${a} \\times 10^{${n}} = ${sp(a * 10 ** n)}$, which has ${n} zeros.`); },
    r => { const a = r.int(11, 99) / 10, n = r.int(3, 6); return B(`Evaluate $${sf(a, n)}$ as an ordinary number.`, Math.round(a * 10 ** n), `${a} × ${sp(10 ** n)} = ${sp(Math.round(a * 10 ** n))}.`); },
    r => { const a = r.int(2, 9), n = r.int(1, 4); return B(`Evaluate $${a} \\times 10^{-${n}}$ as a decimal.`, rd(a * 10 ** -n, n), `${a} × ${10 ** -n} = ${rd(a * 10 ** -n, n)}.`); },
    r => { const a = r.int(2, 8), b = r.int(2, 8), m = r.int(3, 6), n = r.int(2, 5); return B(`Evaluate $(${a} \\times 10^{${m}}) + (${b} \\times 10^{${n}})$ as an ordinary number.`, a * 10 ** m + b * 10 ** n, `${sp(a * 10 ** m)} + ${sp(b * 10 ** n)} = ${sp(a * 10 ** m + b * 10 ** n)}.`); },
    r => { const n = r.int(3, 7); return B(`How many digits does $10^{${n}}$ have?`, n + 1, `$10^{${n}} = ${sp(10 ** n)}$ has ${n + 1} digits.`); },
    r => { const a = r.int(2, 8), m = r.int(3, 8); return B(`Evaluate $\\dfrac{${a * 6} \\times 10^{${m}}}{${a * 2} \\times 10^{${m - 2}}}$ as an ordinary number.`, 3 * 100, `$\\dfrac{${a * 6}}{${a * 2}} = 3$ and $10^{${m} - ${m - 2}} = 100$, so the value is 300.`); },
    r => { const a = r.int(11, 99) / 10, n = r.int(2, 6); return B(`The number $${sf(a, -n)}$ is written as a decimal. How many zeros come after the decimal point before the first non-zero digit?`, n - 1, `$${sf(a, -n)} = ${rd(a * 10 ** -n, n + 1)}$, which has ${n - 1} zeros after the decimal point.`); },
    r => { const a = r.int(2, 5), b = r.int(2, 5), n = r.int(3, 6); return B(`Evaluate $(${a} \\times 10^{${n}})^{2}$ and write it as $c \\times 10^{k}$ with $1 \\le c < 10$. Find $k$.`, 2 * n + (a * a >= 10 ? 1 : 0), `$(${a})^2 = ${a * a}$ and $(10^{${n}})^2 = 10^{${2 * n}}$, so $k = ${2 * n + (a * a >= 10 ? 1 : 0)}$.`); }
  ], word: [
    r => { const d = r.pick([150, 149.6]), a = 1.5, n = 8; return B(`The distance from the Earth to the Sun is about $1.5 \\times 10^{8}$ km. Write this distance as an ordinary number in km.`, 150000000, `$1.5 \\times 100 000 000 = 150 000 000$ km.`); },
    r => { const a = r.int(3, 9), n = r.int(3, 6); return B(`A bacterium has a width of $${a} \\times 10^{-${n}}$ cm. Write this width as a decimal in cm.`, rd(a * 10 ** -n, n), `$${a} \\times 10^{-${n}} = ${rd(a * 10 ** -n, n)}$ cm.`); },
    r => { const a = r.int(2, 8), n = r.int(3, 6); return B(`Light travels $3 \\times 10^{5}$ km in one second. How far does it travel in ${a} seconds, as an ordinary number in km?`, 300000 * a, `3 × $10^5$ × ${a} = ${sp(300000 * a)} km.`); },
    r => { const a = r.int(2, 5), n = r.int(4, 7); return B(`A factory makes $${a} \\times 10^{${n}}$ screws a day. How many screws does it make in 10 days? Give $k$ in $c \\times 10^{k}$ with $1 \\le c < 10$.`, n + 1, `$${a} \\times 10^{${n}} \\times 10 = ${a} \\times 10^{${n + 1}}$, so $k = ${n + 1}$.`); },
    r => { const a = r.int(2, 9), n = r.int(5, 9); return B(`A star is $${a} \\times 10^{${n}}$ km away. Write the distance as an ordinary number and find how many digits it has.`, n + 1, `$${a} \\times 10^{${n}} = ${sp(a * 10 ** n)}$, which has ${n + 1} digits.`); },
    r => { const a = r.int(11, 99) / 10, n = r.int(2, 3); return B(`The mass of a speck of dust is $${a} \\times 10^{-${n}}$ kg. Write it as a decimal in kg, correct to ${n + 1} decimal places.`, rd(a * 10 ** -n, n + 1), `$${a} \\times 10^{-${n}} = ${rd(a * 10 ** -n, n + 1)}$ kg.`); }
  ]});

  /* ---- Indices: compound interest ---- */
  const ci = (P, r, n) => P * (1 + r / 100) ** n;
  g.push({id: 'G3.3.indices.6', plain: [
    r => { const P = r.int(2, 9) * 1000, R = r.pick([2, 3, 4, 5]), n = r.int(2, 4); return B(`Find the amount when \\$${sp(P)} is invested at ${R}% per year compound interest for ${n} years, correct to 2 decimal places, in dollars.`, rd(ci(P, R, n), 2), `$A = ${P}(1 + ${R}/100)^{${n}} = ${rd(ci(P, R, n), 2)}$.`); },
    r => { const P = r.int(2, 9) * 1000, R = r.pick([2, 3, 4, 5]), n = r.int(2, 4); return B(`Find the compound interest earned when \\$${sp(P)} is invested at ${R}% per year for ${n} years, correct to 2 decimal places, in dollars.`, rd(ci(P, R, n) - P, 2), `Interest = $${P}(1 + ${R}/100)^{${n}} - ${P} = ${rd(ci(P, R, n) - P, 2)}$.`); },
    r => { const P = r.int(1, 9) * 1000, R = r.pick([2, 4, 5, 10]); return B(`Find the amount after 1 year when \\$${sp(P)} earns ${R}% simple interest per year, in dollars.`, P * (1 + R / 100), `${P} × ${1 + R / 100} = ${P * (1 + R / 100)}.`); },
    r => { const P = r.int(2, 8) * 1000, R = r.pick([2, 4, 5]), n = r.int(2, 3); return B(`\\$${sp(P)} is invested at ${R}% per year simple interest for ${n} years. Find the interest in dollars.`, P * R * n / 100, `I = PRT/100 = ${P} × ${R} × ${n} ÷ 100 = ${P * R * n / 100}.`); },
    r => { const P = r.int(2, 9) * 1000, R = r.pick([3, 4, 5, 6]), n = r.int(2, 4); const s = P * R * n / 100, c = ci(P, R, n) - P; return B(`Find how much more compound interest than simple interest is earned on \\$${sp(P)} at ${R}% per year over ${n} years, correct to 2 decimal places, in dollars.`, rd(c - s, 2), `Compound interest = ${rd(c, 2)}, simple interest = ${s}. Difference = ${rd(c - s, 2)}.`); },
    r => { const P = r.int(2, 9) * 500, R = r.pick([4, 6, 8]), n = r.int(1, 3); return B(`Find the amount when \\$${sp(P)} is invested at ${R}% per year compounded half-yearly for ${n} year${n > 1 ? "s" : ""}, correct to 2 decimal places, in dollars.`, rd(P * (1 + R / 200) ** (2 * n), 2), `Rate per half-year = ${R / 2}%, ${2 * n} periods: $A = ${P}(1 + ${R / 200})^{${2 * n}} = ${rd(P * (1 + R / 200) ** (2 * n), 2)}$.`); },
    r => { const A = r.int(2, 9) * 1000, R = r.pick([2, 4, 5]), n = r.int(2, 3); return B(`After ${n} years at ${R}% compound interest per year, an investment is worth \\$${rd(A * (1 + R / 100) ** n, 2)}. Find the original sum in dollars.`, A, `Original = ${rd(A * (1 + R / 100) ** n, 2)} ÷ $(1 + ${R}/100)^{${n}}$ = ${A}.`); },
    r => { const P = r.int(2, 9) * 1000, R = r.pick([5, 10]), n = r.int(2, 3); return B(`The value of a car depreciates by ${R}% each year. It is worth \\$${sp(P)} now. Find its value after ${n} years, correct to 2 decimal places, in dollars.`, rd(P * (1 - R / 100) ** n, 2), `$V = ${P}(1 - ${R}/100)^{${n}} = ${rd(P * (1 - R / 100) ** n, 2)}$.`); },
    r => { const P = r.int(1, 5) * 1000, R = r.pick([2, 4]), n = 2; return B(`Find the amount after 2 years when \\$${sp(P)} is invested at ${R}% per year compound interest, in dollars (2 decimal places).`, rd(ci(P, R, 2), 2), `${P} × ${(1 + R / 100)}² = ${rd(ci(P, R, 2), 2)}.`); },
    r => { const P = r.int(2, 9) * 1000, R = r.pick([3, 5]), n = r.int(2, 3); return B(`Find the total interest on \\$${sp(P)} invested at ${R}% per year compound interest for ${n} years, correct to the nearest dollar.`, Math.round(ci(P, R, n) - P), `Interest ≈ ${rd(ci(P, R, n) - P, 2)} ≈ ${Math.round(ci(P, R, n) - P)}.`); },
    r => { const k = r.int(2, 6), R = r.pick([5, 10, 20]); return B(`A sum of money earns ${R}% compound interest per year. By what multiplier is the sum multiplied each year? Give the answer as a decimal.`, rd(1 + R / 100, 2), `Multiplier = 1 + ${R}/100 = ${rd(1 + R / 100, 2)}.`); },
    r => { const P = r.int(2, 8) * 1000, R = r.pick([4, 5]), n = r.int(2, 3); return B(`The amount after ${n} years at ${R}% compound interest on \\$${sp(P)} is $A$. Find $A$ correct to the nearest dollar.`, Math.round(ci(P, R, n)), `$A = ${P}(1 + ${R}/100)^{${n}} = ${rd(ci(P, R, n), 2)} ≈ ${Math.round(ci(P, R, n))}$.`); },
    r => { const P = r.int(2, 9) * 1000, R = r.pick([2, 3, 5]), n = r.int(3, 5); return B(`The value of a painting increases by ${R}% each year. It is worth \\$${sp(P)} now. Find its value after ${n} years, correct to 2 decimal places, in dollars.`, rd(ci(P, R, n), 2), `$V = ${P}(1 + ${R}/100)^{${n}} = ${rd(ci(P, R, n), 2)}$.`); },
    r => { const P = 1000 * r.int(2, 6), R = r.pick([4, 6, 8]); return B(`Find the amount after 1 year when \\$${sp(P)} is invested at ${R}% per year compounded quarterly, correct to 2 decimal places, in dollars.`, rd(P * (1 + R / 400) ** 4, 2), `Rate per quarter = ${R / 4}%: $A = ${P}(1 + ${R / 400})^{4} = ${rd(P * (1 + R / 400) ** 4, 2)}$.`); }
  ], word: [
    r => { const P = r.int(5, 20) * 1000, R = r.pick([2, 3, 4]), n = r.int(2, 5); return B(`Mr Lee deposits \\$${sp(P)} in a bank that pays ${R}% compound interest per year. How much will he have after ${n} years, correct to the nearest dollar?`, Math.round(ci(P, R, n)), `$A = ${P}(1 + ${R}/100)^{${n}} = ${rd(ci(P, R, n), 2)} ≈ ${Math.round(ci(P, R, n))}$.`); },
    r => { const P = r.int(2, 9) * 1000, R = r.pick([3, 4, 5]), n = r.int(2, 3); return B(`Ali invests \\$${sp(P)} at ${R}% compound interest per year for ${n} years. How much interest does he earn, correct to 2 decimal places, in dollars?`, rd(ci(P, R, n) - P, 2), `Interest = ${rd(ci(P, R, n), 2)} − ${P} = ${rd(ci(P, R, n) - P, 2)}.`); },
    r => { const P = r.int(2, 6) * 10000, R = r.pick([5, 8, 10]), n = r.int(2, 4); return B(`A town's population of ${sp(P)} grows by ${R}% each year. Find the population after ${n} years, correct to the nearest whole number.`, Math.round(P * (1 + R / 100) ** n), `$P = ${P}(1 + ${R}/100)^{${n}} = ${rd(P * (1 + R / 100) ** n, 2)} ≈ ${Math.round(P * (1 + R / 100) ** n)}$.`); },
    r => { const P = r.int(2, 9) * 1000, R = r.pick([10, 15, 20]), n = r.int(2, 3); return B(`A laptop costs \\$${sp(P)} and loses ${R}% of its value each year. Find its value after ${n} years, correct to 2 decimal places, in dollars.`, rd(P * (1 - R / 100) ** n, 2), `$V = ${P}(1 - ${R}/100)^{${n}} = ${rd(P * (1 - R / 100) ** n, 2)}$.`); },
    r => { const P = r.int(1, 5) * 2000, R = r.pick([3, 4, 6]); return B(`A savings account pays ${R}% compound interest per year. Sara saves \\$${sp(P)}. How much will she have after 2 years, correct to 2 decimal places, in dollars?`, rd(ci(P, R, 2), 2), `${P} × ${(1 + R / 100)}² = ${rd(ci(P, R, 2), 2)}.`); },
    r => { const P = r.int(2, 9) * 1000, R = r.pick([3, 4, 5]), n = r.int(2, 4); return B(`Bank A offers ${R}% simple interest per year and Bank B offers ${R}% compound interest per year. Bhaskar invests \\$${sp(P)} for ${n} years. How much more does Bank B pay than Bank A, correct to 2 decimal places, in dollars?`, rd(ci(P, R, n) - P - P * R * n / 100, 2), `Bank B interest − Bank A interest = ${rd(ci(P, R, n) - P, 2)} − ${P * R * n / 100} = ${rd(ci(P, R, n) - P - P * R * n / 100, 2)}.`); }
  ]});

  return g;
};
