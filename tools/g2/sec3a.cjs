/* G2 (Normal Academic) Sec 3 generators, part A: Ch1 Algebraic Manipulation, Ch2 Quadratic Equations, Ch3 Graphs of
   Quadratic Functions, Ch4 Indices and Compound Interest.
   Sec 3 banks are 20 typed answers (15 plain + 5 word problems). Style follows the Shing Lee N(A) practice exercises and the
   G2 chapter worksheets in the Shinglee folder (SLWS). Every answer is computed from the question's own numbers;
   each answer is a number that can be typed on the keypad (rounded as the question says). */
'use strict';
module.exports = function(H){
  const {N, gcd, sp} = H;
  const rd = (v, d) => +v.toFixed(d);
  const sgn = n => n < 0 ? `- ${-n}` : `+ ${n}`;
  const sx = n => n === 0 ? '' : `${n < 0 ? '-' : '+'} ${Math.abs(n) === 1 ? '' : Math.abs(n)}x`;     // "+ 3x", "- x" or nothing
  const sc = n => n === 0 ? '' : sgn(n);
  const mul = (a, b) => { const o = Array(a.length + b.length - 1).fill(0); a.forEach((x, i) => b.forEach((y, j) => { o[i + j] += x * y; })); return o; };   // coefficients c0, c1, c2 ...
  const nz = [-4, -3, -2, -1, 1, 2, 3, 4];
  const gyms = [];

  /* ---- Factorisation by grouping ---- */
  gyms.push({id: 'G2.3.algebraic-manipulation.1', plain: [
    r => { const a = r.int(2, 9), b = r.int(2, 9); return N(`$xy + ${a}x + ${b}y + ${a * b} = (x + p)(y + q)$. Find $p + q$.`, a + b, `xy + ${a}x + ${b}y + ${a * b} = x(y + ${a}) + ${b}(y + ${a}) = (y + ${a})(x + ${b}). The two numbers are ${a} and ${b}, so p + q = ${a + b}.`); },
    r => { const a = r.int(2, 8), b = r.int(2, 8); return N(`$xy - ${a}x + ${b}y - ${a * b} = (y - p)(x + q)$. Find $p + q$.`, a + b, `x(y − ${a}) + ${b}(y − ${a}) = (y − ${a})(x + ${b}), so p = ${a}, q = ${b} and p + q = ${a + b}.`); },
    r => { const a = r.int(2, 6), x = r.int(2, 6), y = r.int(2, 6), k = r.int(2, 5); if (a === k) return null; return N(`Factorise $${a}x + ${a}y + ${k}x + ${k}y$ as $(x + y)(${a} + ${k})$. Find its value when $x = ${x}$ and $y = ${y}$.`, (x + y) * (a + k), `(${x} + ${y})(${a} + ${k}) = ${x + y} × ${a + k} = ${(x + y) * (a + k)}.`); },
    r => { const a = r.int(3, 9), b = r.int(2, 8), c = r.int(11, 19), d = r.int(5, 9); return N(`Evaluate $${a} \\times ${c} + ${a} \\times ${d} + ${b} \\times ${c} + ${b} \\times ${d}$ by factorising in pairs.`, (a + b) * (c + d), `(${a} + ${b})(${c} + ${d}) = ${a + b} × ${c + d} = ${(a + b) * (c + d)}.`); },
    r => { const a = r.int(2, 4), b = r.int(1, 4), x = r.int(2, 5), y = r.int(2, 6); return N(`$${a}xy + ${3 * a}x + ${b}y + ${3 * b} = (${a}x + ${b})(y + 3)$. Find the value of the expression when $x = ${x}$ and $y = ${y}$.`, (a * x + b) * (y + 3), `(${a * x} + ${b})(${y} + 3) = ${a * x + b} × ${y + 3} = ${(a * x + b) * (y + 3)}.`); },
    r => { const m = r.int(3, 9), n = r.int(1, m - 1), k = r.int(2, 6); return N(`Factorise $m^2 - mn + ${k}m - ${k}n$ as $(m - n)(m + ${k})$. Find its value when $m = ${m}$ and $n = ${n}$.`, (m - n) * (m + k), `(${m} − ${n})(${m} + ${k}) = ${m - n} × ${m + k} = ${(m - n) * (m + k)}.`); },
    r => { const s = r.int(4, 12), t = r.int(3, 9); return N(`Given that $a + b = ${s}$ and $c + d = ${t}$, find the value of $ac + ad + bc + bd$.`, s * t, `ac + ad + bc + bd = a(c + d) + b(c + d) = (a + b)(c + d) = ${s} × ${t} = ${s * t}.`); },
    r => { const p = r.int(2, 6), q = r.int(2, 6), x = r.int(2, 8); return N(`$x^2 + ${p}x + ${q}x + ${p * q} = (x + ${p})(x + ${q})$. Find the value of this expression when $x = ${x}$.`, (x + p) * (x + q), `(${x} + ${p})(${x} + ${q}) = ${x + p} × ${x + q} = ${(x + p) * (x + q)}.`); },
    r => { const a = r.int(2, 6), b = r.int(2, 6), x = r.int(2, 7), y = r.int(2, 7); return N(`Factorise $${a}x - ${a}y + ${b}x - ${b}y$ as $(x - y)(${a} + ${b})$. Find its value when $x = ${x + y}$ and $y = ${y}$.`, x * (a + b), `(${x + y} − ${y})(${a} + ${b}) = ${x} × ${a + b} = ${x * (a + b)}.`); }
  ], word: [
    r => { const a = r.int(2, 6), b = r.int(2, 6), x = r.int(3, 9), y = r.int(3, 9); return N(`A hall is split into four rectangles of area $${a}x$, $${a}y$, $${b}x$ and $${b}y$ square metres. The total area is $(${a} + ${b})(x + y)$. Find the total area when $x = ${x}$ and $y = ${y}$, in m².`, (a + b) * (x + y), `(${a} + ${b})(${x} + ${y}) = ${a + b} × ${x + y} = ${(a + b) * (x + y)} m².`); },
    r => { const s = r.int(5, 15), t = r.int(5, 15); return N(`A rectangle has length $(a + b)$ cm and width $(c + d)$ cm, where $a + b = ${s}$ and $c + d = ${t}$. Find its area, in cm².`, s * t, `Area = (a + b)(c + d) = ${s} × ${t} = ${s * t} cm².`); },
    r => { const m = r.int(3, 9), n = r.int(2, 8), k = r.int(2, 6); return N(`The area of a garden is $(m^2 - mn + ${k}m - ${k}n)$ m², which factorises as $(m - n)(m + ${k})$. Find the area when $m = ${m + n}$ and $n = ${n}$, in m².`, m * (m + n + k), `(${m + n} − ${n})(${m + n} + ${k}) = ${m} × ${m + n + k} = ${m * (m + n + k)} m².`); },
    r => { const a = r.int(3, 9), b = r.int(2, 8), x = r.int(5, 20), y = r.int(5, 20); return N(`A stall sells card A at \\$${a} and card B at \\$${b}. On Saturday it sells $x$ of each card and on Sunday $y$ of each card, so the total sales are $${a}x + ${b}x + ${a}y + ${b}y = (${a} + ${b})(x + y)$ dollars. Find the total sales when $x = ${x}$ and $y = ${y}$, in dollars.`, (a + b) * (x + y), `(${a} + ${b})(${x} + ${y}) = ${a + b} × ${x + y} = ${(a + b) * (x + y)} dollars.`); },
    r => { const p = r.int(2, 6), q = r.int(2, 6), x = r.int(3, 9), y = r.int(3, 9); return N(`A shop buys $${p}$ boxes at \\$${x} each and $${p}$ boxes at \\$${y} each, then $${q}$ boxes at \\$${x} each and $${q}$ boxes at \\$${y} each. The total cost is $(${p} + ${q})(${x} + ${y})$ dollars. Find the total cost, in dollars.`, (p + q) * (x + y), `(${p} + ${q})(${x} + ${y}) = ${p + q} × ${x + y} = ${(p + q) * (x + y)} dollars.`); }
  ]});

  /* ---- Expansion of algebraic expressions ---- */
  const F = c => `(x ${sgn(c)})`;
  gyms.push({id: 'G2.3.algebraic-manipulation.2', plain: [
    r => { const A = r.pick(nz), B = r.pick(nz), C = r.pick(nz), p = mul(mul([A, 1], [B, 1]), [C, 1]); return N(`$${F(A)}${F(B)}${F(C)}$ is expanded as $x^3 + px^2 + qx + s$. Find $q$.`, p[1], `The coefficient of x is AB + BC + CA = (${A})(${B}) + (${B})(${C}) + (${C})(${A}) = ${p[1]}.`); },
    r => { const A = r.pick(nz), B = r.pick(nz), C = r.pick(nz), p = mul(mul([A, 1], [B, 1]), [C, 1]); return N(`$${F(A)}${F(B)}${F(C)}$ is expanded as $x^3 + px^2 + qx + s$. Find $p$.`, p[2], `The coefficient of x² is A + B + C = ${A} + (${B}) + (${C}) = ${p[2]}.`); },
    r => { const A = r.pick(nz), B = r.pick(nz), C = r.pick(nz), p = mul(mul([A, 1], [B, 1]), [C, 1]); return N(`$${F(A)}${F(B)}${F(C)}$ is expanded as $x^3 + px^2 + qx + s$. Find $s$.`, p[0], `The constant term is A × B × C = (${A})(${B})(${C}) = ${p[0]}.`); },
    r => { const a = r.int(1, 5), b = r.int(1, 5), c = r.int(1, 6), p = mul([a, 1], [c, b, 1]); return N(`$(x + ${a})(x^2 + ${b}x + ${c})$ is expanded as $x^3 + px^2 + qx + s$. Find $q$.`, p[1], `x(x² + ${b}x + ${c}) + ${a}(x² + ${b}x + ${c}) = x³ + ${p[2]}x² + ${p[1]}x + ${p[0]}, so q = ${p[1]}.`); },
    r => { const a = r.int(2, 4), b = r.int(1, 5), c = r.int(2, 4), d = r.int(1, 5), p = mul([b, a], [d, c]); return N(`$(${a}x + ${b})(${c}x + ${d})$ is expanded as $px^2 + qx + s$. Find $q$.`, p[1], `${a}x × ${d} + ${b} × ${c}x = ${a * d}x + ${b * c}x = ${p[1]}x, so q = ${p[1]}.`); },
    r => { const a = r.int(2, 4), x = r.int(2, 5); return N(`Find the value of $(x + ${a})(x - ${a})(x^2 + ${a * a})$ when $x = ${x}$.`, x ** 4 - a ** 4, `(x + ${a})(x − ${a}) = x² − ${a * a}, and (x² − ${a * a})(x² + ${a * a}) = x⁴ − ${a ** 4}. When x = ${x}: ${x ** 4} − ${a ** 4} = ${x ** 4 - a ** 4}.`); },
    r => { const x = r.int(2, 9), y = r.int(2, 9); return N(`Find the value of $(x + y)^2 - (x - y)^2$ when $x = ${x}$ and $y = ${y}$.`, 4 * x * y, `(x + y)² − (x − y)² = 4xy = 4 × ${x} × ${y} = ${4 * x * y}.`); },
    r => { const a = r.int(2, 5), p = mul(mul([a, 1], [a, 1]), [a, 1]); const which = r.pick([1, 2]); return N(`$(x + ${a})^3$ is expanded as $x^3 + px^2 + qx + s$. Find $${which === 1 ? 'q' : 'p'}$.`, which === 1 ? p[1] : p[2], `(x + ${a})³ = x³ + ${p[2]}x² + ${p[1]}x + ${p[0]}.`); },
    r => { const a = r.int(2, 4), x = r.int(1, 6); return N(`Find the value of $(x + ${a})(x^2 - ${a}x + ${a * a})$ when $x = ${x}$.`, x ** 3 + a ** 3, `(x + ${a})(x² − ${a}x + ${a * a}) = x³ + ${a ** 3}. When x = ${x}: ${x ** 3} + ${a ** 3} = ${x ** 3 + a ** 3}.`); },
    r => { const a = r.int(1, 5), b = r.int(1, 5), c = r.int(1, 5), d = r.int(1, 5); return N(`$(x + ${a})(x + ${b}) + (x + ${c})(x + ${d})$ is simplified to $2x^2 + px + q$. Find $q$.`, a * b + c * d, `The constant terms are ${a} × ${b} = ${a * b} and ${c} × ${d} = ${c * d}, so q = ${a * b + c * d}.`); }
  ], word: [
    r => { const a = r.int(1, 4), b = r.int(2, 5), x = r.int(2, 6); return N(`A box has edges of $x$ cm, $(x + ${a})$ cm and $(x + ${b})$ cm. Find its volume when $x = ${x}$, in cm³.`, x * (x + a) * (x + b), `Volume = ${x} × ${x + a} × ${x + b} = ${x * (x + a) * (x + b)} cm³.`); },
    r => { const w = r.int(1, 3), x = r.int(5, 12), y = r.int(4, 10); return N(`A rectangular lawn is $${x}$ m by $${y}$ m. A path of width ${w} m is built all the way round the outside of the lawn. Find the area of the path, in m².`, (x + 2 * w) * (y + 2 * w) - x * y, `Outer rectangle: (${x} + ${2 * w}) × (${y} + ${2 * w}) = ${(x + 2 * w) * (y + 2 * w)}. Lawn = ${x * y}. Path = ${(x + 2 * w) * (y + 2 * w) - x * y} m².`); },
    r => { const a = r.int(2, 5), b = r.int(2, 6), x = r.int(2, 8); return N(`A square of side $(x + ${a})$ cm has a square of side ${b} cm cut from one corner. Find the area left when $x = ${x}$, in cm².`, (x + a) ** 2 - b * b, `(x + ${a})² − ${b * b} = ${(x + a) ** 2} − ${b * b} = ${(x + a) ** 2 - b * b} cm².`); },
    r => { const k = r.int(2, 4), x = r.int(2, 8); return N(`A rectangle has length $(${k}x + 1)$ m and width $(x + 3)$ m. Find its area when $x = ${x}$, in m².`, (k * x + 1) * (x + 3), `(${k * x} + 1)(${x} + 3) = ${k * x + 1} × ${x + 3} = ${(k * x + 1) * (x + 3)} m².`); },
    r => { const a = r.int(1, 4), x = r.int(1, 5); return N(`A cube has edges of $(x + ${a})$ cm. Find its volume when $x = ${x}$, in cm³.`, (x + a) ** 3, `(${x} + ${a})³ = ${x + a}³ = ${(x + a) ** 3} cm³.`); }
  ]});

  /* ---- Algebraic manipulation (fractions and formulae) ---- */
  const LENS = [[10, 15, 6], [6, 12, 4], [12, 24, 8], [3, 6, 2], [15, 30, 10], [20, 30, 12]];       // u, v, f with 1/f = 1/u + 1/v
  gyms.push({id: 'G2.3.algebraic-manipulation.3', plain: [
    r => { const a = r.int(2, 6), m = r.pick([2, 4, 5, 10]), x = a * m; return N(`Simplify $\\dfrac{x^2 - ${a * a}}{x^2 + ${a}x}$ and find its value when $x = ${x}$.`, (m - 1) / m, `x² − ${a * a} = (x − ${a})(x + ${a}) and x² + ${a}x = x(x + ${a}), so the fraction simplifies to (x − ${a}) ÷ x. When x = ${x}: ${x - a}/${x} = ${(m - 1) / m}.`); },
    r => { const a = r.int(1, 6), b = r.int(1, 6), x = r.int(2, 9); return N(`Simplify $\\dfrac{x^2 + ${a + b}x + ${a * b}}{x + ${a}}$ and find its value when $x = ${x}$.`, x + b, `x² + ${a + b}x + ${a * b} = (x + ${a})(x + ${b}), so the fraction simplifies to x + ${b}. When x = ${x}, it is ${x + b}.`); },
    r => { const l = r.int(6, 20), w = r.int(3, 12); return N(`The perimeter of a rectangle is $P = 2(l + w)$. Find $w$ when $P = ${2 * (l + w)}$ and $l = ${l}$.`, w, `${2 * (l + w)} = 2(${l} + w), so ${l} + w = ${l + w} and w = ${w}.`); },
    r => { const c = 5 * r.int(2, 14); return N(`The formula $F = \\dfrac{9}{5}C + 32$ converts °C to °F. Find $C$ when $F = ${9 * c / 5 + 32}$.`, c, `${9 * c / 5 + 32} − 32 = ${9 * c / 5}. C = ${9 * c / 5} × 5 ÷ 9 = ${c}.`); },
    r => { const u = r.int(1, 8), a = r.int(1, 6), s = r.int(2, 12), v2 = u * u + 2 * a * s, v = Math.sqrt(v2); if (v !== Math.round(v)) return null; return N(`Using $v^2 = u^2 + 2as$, find $a$ when $v = ${v}$, $u = ${u}$ and $s = ${s}$.`, a, `${v * v} = ${u * u} + 2a(${s}), so 2a(${s}) = ${v * v - u * u} and a = ${a}.`); },
    r => { const x = r.int(3, 12), a = r.int(1, 9), b = r.int(1, 2) * 1; const y = 2; const xx = a + 2 * b; return N(`If $y = \\dfrac{x + ${a}}{x - ${b}}$, find $x$ when $y = 2$.`, xx, `x + ${a} = 2(x − ${b}), so x + ${a} = 2x − ${2 * b} and x = ${a + 2 * b}.`); },
    r => { const t = r.pick(LENS); return N(`In the lens formula $\\dfrac{1}{f} = \\dfrac{1}{u} + \\dfrac{1}{v}$, $f = ${t[2]}$ and $u = ${t[0]}$. Find $v$.`, t[1], `1/v = 1/${t[2]} − 1/${t[0]} = ${t[0] - t[2]}/${t[2] * t[0]} = 1/${t[1]}, so v = ${t[1]}.`); },
    r => { const a = r.int(1, 9), b = r.int(2, 10); return N(`Solve $\\sqrt{x + ${a}} = ${b}$.`, b * b - a, `Square both sides: x + ${a} = ${b * b}, so x = ${b * b - a}.`); },
    r => { const k = r.int(2, 9), a = r.int(1, 4), b = r.int(1, 4); return N(`Simplify $\\dfrac{${4 * a * a}x^2 - ${b * b}}{${2 * a}x - ${b}}$ and find its value when $x = ${k}$.`, 2 * a * k + b, `${4 * a * a}x² − ${b * b} = (${2 * a}x − ${b})(${2 * a}x + ${b}), so the fraction simplifies to ${2 * a}x + ${b}. When x = ${k}: ${2 * a * k + b}.`); },
    r => { const k = r.pick([1, 2, 3, 4]), rr = 7 * k; return N(`Using $A = \\pi r^2$ with $\\pi = \\dfrac{22}{7}$, find $r$ when $A = ${22 * 7 * k * k}$.`, rr, `${22 * 7 * k * k} = 22/7 × r², so r² = ${rr * rr} and r = ${rr}.`); }
  ], word: [
    r => { const n = r.int(8, 30); return N(`The cost, in dollars, of hiring a hall for $n$ hours is $C = 50 + 8n$. Find $n$ when the cost is \\$${50 + 8 * n}.`, n, `${50 + 8 * n} = 50 + 8n, so 8n = ${8 * n} and n = ${n}.`); },
    r => { const c = r.int(10, 40); return N(`A thermometer shows ${9 * c / 5 + 32}°F. Use $F = \\dfrac{9}{5}C + 32$ to find the temperature in °C.`, c, `C = (${9 * c / 5 + 32} − 32) × 5 ÷ 9 = ${c}.`); },
    r => { const t = r.pick(LENS); return N(`A lens has focal length ${t[2]} cm. An object is ${t[0]} cm from the lens. Use $\\dfrac{1}{f} = \\dfrac{1}{u} + \\dfrac{1}{v}$ to find the image distance $v$, in cm.`, t[1], `1/v = 1/${t[2]} − 1/${t[0]} = 1/${t[1]}, so v = ${t[1]} cm.`); },
    r => { const k = r.int(10, 40); return N(`A taxi fare is $F = 4 + 0.5k$ dollars for a journey of $k$ km. Find $k$ when $F = ${4 + 0.5 * k}$.`, k, `${4 + 0.5 * k} = 4 + 0.5k, so 0.5k = ${0.5 * k} and k = ${k}.`); },
    r => { const u = r.int(2, 8), a = r.int(1, 4) * 2, t = r.int(2, 6); return N(`A ball moves a distance $s = ut + \\dfrac{1}{2}at^2$ metres. Find $s$ when $u = ${u}$, $a = ${a}$ and $t = ${t}$.`, u * t + a * t * t / 2, `s = ${u}(${t}) + ½(${a})(${t})² = ${u * t} + ${a * t * t / 2} = ${u * t + a * t * t / 2}.`); }
  ]});

  /* ---- Quadratic equations ---- */
  const quad = r => { let r1, r2; do { r1 = r.pick([-9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9]); r2 = r.pick([-9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9]); } while (r1 === r2); const b = -(r1 + r2), c = r1 * r2; return {r1, r2, eq: `x^2 ${b === 0 ? '' : (b > 0 ? '+ ' + (b === 1 ? '' : b) + 'x' : '- ' + (b === -1 ? '' : -b) + 'x')} ${c > 0 ? '+ ' + c : '- ' + (-c)} = 0`.replace(/\s+/g, ' ')}; };
  gyms.push({id: 'G2.3.quadratic-equations.1', plain: [
    r => { const q = quad(r); return N(`Solve $${q.eq}$. Find the larger root.`, Math.max(q.r1, q.r2), `Factorise: (x ${sgn(-q.r1)})(x ${sgn(-q.r2)}) = 0, so x = ${q.r1} or x = ${q.r2}. The larger root is ${Math.max(q.r1, q.r2)}.`); },
    r => { const q = quad(r); return N(`Solve $${q.eq}$. Find the smaller root.`, Math.min(q.r1, q.r2), `Factorise: (x ${sgn(-q.r1)})(x ${sgn(-q.r2)}) = 0, so x = ${q.r1} or x = ${q.r2}. The smaller root is ${Math.min(q.r1, q.r2)}.`); },
    r => { const q = quad(r); return N(`The roots of $${q.eq}$ are $\\alpha$ and $\\beta$. Find $\\alpha + \\beta$.`, q.r1 + q.r2, `The roots are ${q.r1} and ${q.r2}, so their sum is ${q.r1 + q.r2}.`); },
    r => { const q = quad(r); return N(`The roots of $${q.eq}$ are $\\alpha$ and $\\beta$. Find $\\alpha\\beta$.`, q.r1 * q.r2, `The roots are ${q.r1} and ${q.r2}, so their product is ${q.r1 * q.r2}.`); },
    r => { const k = r.int(2, 12); return N(`Solve $x^2 = ${k}x$. Find the non-zero root.`, k, `x² − ${k}x = 0, so x(x − ${k}) = 0 and x = 0 or x = ${k}. The non-zero root is ${k}.`); },
    r => { const a = r.pick([1, 2, 3]), b = r.int(-9, 9), c = r.int(-6, 6); return N(`Find the value of the discriminant $b^2 - 4ac$ for $${a}x^2 ${sx(b)} ${sc(c)} = 0$.`, b * b - 4 * a * c, `b² − 4ac = (${b})² − 4(${a})(${c}) = ${b * b} − ${4 * a * c} = ${b * b - 4 * a * c}.`); },
    r => { const a = r.int(1, 3), b = r.int(-6, 6), c = r.int(-4, 6), d = b * b - 4 * a * c; return N(`How many real roots does $${a}x^2 ${sx(b)} ${sc(c)} = 0$ have?`, d > 0 ? 2 : d === 0 ? 1 : 0, `The discriminant is ${b * b} − ${4 * a * c} = ${d}, which is ${d > 0 ? 'positive, so there are 2 real roots' : d === 0 ? 'zero, so there is 1 real root' : 'negative, so there are no real roots'}.`); },
    r => { const p = r.int(1, 6), c = r.int(-9, 15); return N(`$x^2 + ${2 * p}x ${sgn(c)} = (x + ${p})^2 + k$. Find $k$.`, c - p * p, `(x + ${p})² = x² + ${2 * p}x + ${p * p}, so k = ${c} − ${p * p} = ${c - p * p}.`); },
    r => { const a = r.pick([2, 4, 5]), c = r.pick([1, 2, 3]), p = r.int(1, 4), q = r.int(1, 4), A = a * c, B = a * q + p * c, C = p * q; const roots = [-p / a, -q / c]; return N(`Solve $${A}x^2 + ${B}x + ${C} = 0$. Find the larger root.`, rd(Math.max(...roots), 4), `${A}x² + ${B}x + ${C} = (${a}x + ${p})(${c}x + ${q}) = 0, so x = −${p}/${a} or x = −${q}/${c}. The larger root is ${rd(Math.max(...roots), 4)}.`); },
    r => { const k = r.int(2, 8); return N(`The equation $x^2 + ${2 * k}x + c = 0$ has equal roots. Find $c$.`, k * k, `Equal roots need b² − 4ac = 0: ${4 * k * k} − 4c = 0, so c = ${k * k}.`); }
  ], word: [
    r => { const n = r.int(4, 20); return N(`The product of two consecutive positive integers is ${n * (n + 1)}. Find the smaller integer.`, n, `n(n + 1) = ${n * (n + 1)}, so n² + n − ${n * (n + 1)} = 0 and (n − ${n})(n + ${n + 1}) = 0. The positive solution is n = ${n}.`); },
    r => { const w = r.int(3, 15), k = r.int(2, 6); return N(`A rectangle is ${k} cm longer than it is wide. Its area is ${w * (w + k)} cm². Find the width, in cm.`, w, `w(w + ${k}) = ${w * (w + k)}, so w² + ${k}w − ${w * (w + k)} = 0. The positive solution is w = ${w}.`); },
    r => { const n = r.int(3, 14); return N(`The sum of a positive number and its square is ${n + n * n}. Find the number.`, n, `n + n² = ${n + n * n}, so n² + n − ${n + n * n} = 0 and (n − ${n})(n + ${n + 1}) = 0. The positive solution is ${n}.`); },
    r => { const h = r.int(3, 12), k = r.int(1, 6); return N(`The base of a right-angled triangle is ${k} cm more than its height. The area is ${h * (h + k) / 2} cm². Find the height, in cm.`, h, `½h(h + ${k}) = ${h * (h + k) / 2}, so h² + ${k}h = ${h * (h + k)} and h = ${h}.`); },
    r => { const n = r.int(6, 15); return N(`A number $n$ satisfies $n^2 - 5n = ${n * n - 5 * n}$. Find the positive value of $n$.`, n, `n² − 5n − ${n * n - 5 * n} = 0 has the positive solution n = ${n}.`); }
  ]});

  /* ---- Graphs of quadratic functions ---- */
  gyms.push({id: 'G2.3.graphs-of-quadratic-functions.1', plain: [
    r => { const a = r.pick([1, 2, 3, -1, -2]), b = r.int(-5, 5), c = r.int(-6, 8), x = r.int(-3, 4); return N(`Find the value of $y$ when $x = ${x}$ on the curve $y = ${a === 1 ? '' : a === -1 ? '-' : a}x^2 ${sx(b)} ${sc(c)}$.`, a * x * x + b * x + c, `y = ${a}(${x})² + ${b}(${x}) + ${c} = ${a * x * x} + ${b * x} + ${c} = ${a * x * x + b * x + c}.`); },
    r => { const p = r.int(1, 6), q = r.int(1, 6); return N(`The curve $y = (x - ${p})(x + ${q})$ crosses the $y$-axis at the point $(0, k)$. Find $k$.`, -p * q, `Put x = 0: y = (−${p})(${q}) = ${-p * q}.`); },
    r => { const p = r.int(1, 7), q = r.int(1, 9); return N(`The curve $y = x^2 - ${2 * p}x + ${p * p + q}$ has a line of symmetry $x = h$. Find $h$.`, p, `The line of symmetry is x = −b/(2a) = ${2 * p}/2 = ${p}.`); },
    r => { const p = r.int(1, 7), q = r.int(1, 9); return N(`Find the minimum value of $y = x^2 - ${2 * p}x + ${p * p + q}$.`, q, `y = (x − ${p})² + ${q}, so the minimum value is ${q}.`); },
    r => { const p = r.int(1, 6), q = r.int(p + 1, 9); return N(`The curve $y = x^2 - ${p + q}x + ${p * q}$ meets the $x$-axis at two points. Find the larger $x$-coordinate.`, q, `y = (x − ${p})(x − ${q}) = 0 gives x = ${p} or x = ${q}. The larger is ${q}.`); },
    r => { const p = r.int(1, 6), q = r.int(1, 12); return N(`Find the maximum value of $y = ${q} - (x - ${p})^2$.`, q, `(x − ${p})² ≥ 0, so the greatest value of y is ${q}.`); },
    r => { const b = r.int(-4, 4), k = r.int(1, 4), c = r.int(-5, 8), v = k * k + b * k + c; return N(`The curve $y = x^2 ${sx(b)} + c$ passes through the point $(${k}, ${v})$. Find $c$.`, c, `${v} = ${k * k} + ${b * k} + c, so c = ${c}.`); },
    r => { const p = r.int(1, 6), c = r.int(-3, 8); return N(`Find the $x$-coordinate of the turning point of $y = x^2 + ${2 * p}x ${sgn(c)}$.`, -p, `The turning point is at x = −b/(2a) = −${2 * p}/2 = ${-p}.`); },
    r => { const k = r.int(2, 9); return N(`The curve $y = ${k * k > 0 ? '2' : '2'}x^2 - ${2 * k * k}$ crosses the $x$-axis. Find the positive $x$-coordinate of the crossing point.`, k, `2x² = ${2 * k * k}, so x² = ${k * k} and x = ${k}.`); },
    r => { const a = r.int(1, 3), b = r.int(-4, 4), c = r.int(1, 6), d = b * b - 4 * a * c; return N(`How many times does the curve $y = ${a === 1 ? '' : a}x^2 ${sx(b)} + ${c}$ cut the $x$-axis?`, d > 0 ? 2 : d === 0 ? 1 : 0, `The discriminant is ${b * b} − ${4 * a * c} = ${d}, so the curve cuts the x-axis ${d > 0 ? 'twice' : d === 0 ? 'once (it touches it)' : '0 times'}.`); }
  ], word: [
    r => { const v = r.int(10, 30) * 2, t = r.int(2, 4); const h = v * t - 5 * t * t; return N(`A ball is thrown upwards. Its height after $t$ seconds is $h = ${v}t - 5t^2$ metres. Find its height after ${t} seconds, in metres.`, h, `h = ${v}(${t}) − 5(${t})² = ${v * t} − ${5 * t * t} = ${h} m.`); },
    r => { const s = r.int(2, 9); return N(`A farmer has ${4 * s} m of fencing for a rectangular pen. The area for a width of $x$ m is $A = x(${2 * s} - x)$ square metres. Find the greatest possible area, in m².`, s * s, `The maximum of x(${2 * s} − x) is at x = ${s}, giving A = ${s} × ${s} = ${s * s} m².`); },
    r => { const p = r.int(4, 10), x = r.int(1, p - 1); return N(`An arch is modelled by $y = ${p}x - x^2$ where $x$ and $y$ are in metres. Find the height $y$ of the arch when $x = ${x}$, in metres.`, p * x - x * x, `y = ${p}(${x}) − ${x * x} = ${p * x - x * x} m.`); },
    r => { const p = r.int(4, 9), q = r.int(1, 20); return N(`A company's profit is $P = -x^2 + ${2 * p}x - ${p * p - q}$ thousand dollars when it sells $x$ thousand items. Find the greatest profit, in thousand dollars.`, q, `P = −(x − ${p})² + ${q}, so the greatest profit is ${q} thousand dollars.`); },
    r => { const h0 = r.int(2, 6), t = r.int(1, 3); return N(`A stone is thrown from a bridge. Its height above the river after $t$ seconds is $h = ${h0} + 20t - 5t^2$ metres. Find the height after ${t} second${t > 1 ? 's' : ''}, in metres.`, h0 + 20 * t - 5 * t * t, `h = ${h0} + 20(${t}) − 5(${t})² = ${h0 + 20 * t - 5 * t * t} m.`); }
  ]});

  /* ---- Quadratic graphs and graphical solutions ---- */
  gyms.push({id: 'G2.3.graphs-of-quadratic-functions.2', plain: [
    r => { const r1 = r.int(-6, -1), r2 = r.int(1, 7), k = r.int(1, 9), b = -(r1 + r2), c = r1 * r2 + k; return N(`The curve $y = x^2 ${sx(b)} ${sc(c)}$ and the line $y = ${k}$ meet where $x^2 ${sx(b)} ${sgn(c - k)} = 0$. Find the positive $x$-coordinate of the meeting point.`, r2, `x² ${sx(b)} ${sgn(c - k)} = (x ${sgn(-r1)})(x ${sgn(-r2)}) = 0, so x = ${r1} or x = ${r2}. The positive value is ${r2}.`); },
    r => { const a = r.int(2, 9); return N(`To solve $x^2 - ${a * a} = 0$ graphically, draw $y = x^2 - ${a * a}$ and read where it meets the $x$-axis. Find the positive solution.`, a, `x² = ${a * a}, so x = ${a} or ${-a}. The positive solution is ${a}.`); },
    r => { const r1 = r.int(-4, -1), r2 = r.int(2, 6), m = r1 + r2, c = -r1 * r2; if (m < 2) return null; return N(`The curve $y = x^2$ meets the line $y = ${m}x ${sgn(c)}$ at two points. Find the sum of their $x$-coordinates.`, m, `x² = ${m}x ${sgn(c)} gives x² ${sx(-m)} ${sgn(-c)} = 0, with roots ${r1} and ${r2}. Their sum is ${m}.`); },
    r => { const p = r.int(2, 5), q = r.int(1, 6), k = r.int(1, 9); const lo = p - Math.sqrt(k), hi = p + Math.sqrt(k); const kk = r.pick([1, 4, 9]); return N(`The curve $y = x^2 - ${2 * p}x + ${p * p + q}$ has a minimum value of ${q}. The line $y = ${q + kk}$ meets the curve at two points. Find the larger $x$-coordinate.`, p + Math.sqrt(kk), `(x − ${p})² + ${q} = ${q + kk} gives (x − ${p})² = ${kk}, so x = ${p} ± ${Math.sqrt(kk)}. The larger is ${p + Math.sqrt(kk)}.`); },
    r => { const r1 = r.int(1, 5), r2 = r.int(r1 + 1, 8), k = r.int(2, 9), b = -(r1 + r2), c = r1 * r2 - k; return N(`The graph of $y = x^2 ${sx(b)} ${sc(c)}$ is drawn. Use it to solve $x^2 ${sx(b)} ${sc(c)} = ${-k}$. Find the larger solution.`, r2, `x² ${sx(b)} ${sgn(c + k)} = 0 gives (x − ${r1})(x − ${r2}) = 0. The larger solution is ${r2}.`); },
    r => { const p = r.int(2, 9); return N(`The graph of $y = x^2 - ${2 * p}x + ${p * p}$ touches the $x$-axis at one point. Find its $x$-coordinate.`, p, `y = (x − ${p})², which is zero only when x = ${p}.`); },
    r => { const k = r.int(2, 9); return N(`How many solutions does $x^2 = ${k * k}$ have?`, 2, `x = ${k} or x = ${-k}, so there are 2 solutions.`); },
    r => { const r1 = r.int(-6, -1), r2 = r.int(1, 6); return N(`The curve $y = x^2 ${sx(-(r1 + r2))} ${sgn(r1 * r2)}$ cuts the $x$-axis at two points. How far apart are the two points, in units?`, r2 - r1, `The roots are ${r1} and ${r2}. The distance is ${r2} − (${r1}) = ${r2 - r1}.`); },
    r => { const p = r.int(2, 6), q = r.int(1, 8); return N(`The curve $y = (x - ${p})^2 + ${q}$ has its turning point at $(a, b)$. Find $a + b$.`, p + q, `The turning point is (${p}, ${q}), so a + b = ${p + q}.`); }
  ], word: [
    r => { const t1 = r.int(1, 2), t2 = r.int(3, 5); const k = 5 * t1 * t2 * 0 + 5 * t1 * t2; return N(`A ball's height is $h = 5t(${t1 + t2} - t)$ metres after $t$ seconds. Using the graph, the ball is at a height of ${k} m at $t = ${t1}$ and again later. Find the later time, in seconds.`, t2, `5t(${t1 + t2} − t) = ${k} gives t² − ${t1 + t2}t + ${t1 * t2} = 0, so t = ${t1} or t = ${t2}. The later time is ${t2} s.`); },
    r => { const p = r.int(2, 6); return N(`A bridge arch is modelled by $y = ${2 * p}x - x^2$ (metres). It meets the ground at $x = 0$ and at $x = k$. Find the width of the arch $k$, in metres.`, 2 * p, `${2 * p}x − x² = x(${2 * p} − x) = 0, so x = 0 or x = ${2 * p}. The width is ${2 * p} m.`); },
    r => { const w = r.int(3, 9), k = r.int(1, 5); return N(`A rectangular garden has length $(x + ${k})$ m and width $x$ m. Its area is ${w * (w + k)} m². Using the graph of $y = x(x + ${k})$, find $x$, in metres.`, w, `x(x + ${k}) = ${w * (w + k)}, so x² + ${k}x − ${w * (w + k)} = 0. The positive solution is x = ${w}.`); },
    r => { const a = r.int(3, 9); return N(`The area of a square tile is $x^2$ cm². Using the graph of $y = x^2$, find the side length of a tile with an area of ${a * a} cm², in cm.`, a, `x² = ${a * a}, so x = ${a} (side lengths are positive).`); },
    r => { const p = r.int(3, 8), q = r.int(5, 25); return N(`A ball's height is $h = ${q} - (t - ${p})^2$ metres after $t$ seconds. Find the time at which the ball is at its greatest height, in seconds.`, p, `h is greatest when (t − ${p})² = 0, so t = ${p} s.`); }
  ]});

  /* ---- Indices ---- */
  gyms.push({id: 'G2.3.indices.1', plain: [
    r => { const b = r.pick([2, 3, 5]), m = r.int(3, 6), n = r.int(2, 4), k = r.int(1, 3); if (m + n - k < 1) return null; return N(`Evaluate $${b}^{${m}} \\times ${b}^{${n}} \\div ${b}^{${k}}$.`, b ** (m + n - k), `${b}^(${m} + ${n} − ${k}) = ${b}^${m + n - k} = ${b ** (m + n - k)}.`); },
    r => { const b = r.pick([2, 3]), m = r.int(2, 3), n = r.int(2, 3); return N(`Evaluate $(${b}^{${m}})^{${n}}$.`, b ** (m * n), `(${b}^${m})^${n} = ${b}^${m * n} = ${b ** (m * n)}.`); },
    r => { const a = r.int(2, 9), c = r.int(2, 5); return N(`Evaluate $${a}^0 + ${c}^2$.`, 1 + c * c, `${a}⁰ = 1 and ${c}² = ${c * c}, so the total is ${1 + c * c}.`); },
    r => { const [b, n, v] = r.pick([[2, 3, 0.125], [5, 2, 0.04], [10, 3, 0.001], [4, 1, 0.25], [2, 2, 0.25], [5, 1, 0.2], [10, 2, 0.01], [2, 4, 0.0625]]); return N(`Evaluate $${b}^{-${n}}$ as a decimal.`, v, `${b}^(−${n}) = 1/${b}^${n} = 1/${b ** n} = ${v}.`); },
    r => { const [b, p, q] = r.pick([[16, 1, 2], [27, 1, 3], [64, 1, 3], [81, 1, 4], [25, 1, 2], [32, 1, 5], [8, 2, 3], [4, 3, 2], [27, 2, 3], [16, 3, 4]]); const v = Math.round(b ** (p / q)); return N(`Evaluate $${b}^{\\frac{${p}}{${q}}}$.`, v, `${b}^(${p}/${q}) means the ${q === 2 ? 'square' : q === 3 ? 'cube' : q + 'th'} root of ${b}${p > 1 ? ' raised to the power ' + p : ''}, which is ${v}.`); },
    r => { const b = r.pick([2, 3, 5]), x = r.int(2, 5); return N(`Solve $${b}^x = ${b ** x}$.`, x, `${b ** x} = ${b}^${x}, so x = ${x}.`); },
    r => { const b = r.pick([2, 3]), x = r.int(2, 5); return N(`Solve $${b}^{x + 1} = ${b ** (x + 1)}$.`, x, `x + 1 = ${x + 1}, so x = ${x}.`); },
    r => { const m = r.int(2, 9), k = r.int(2, 6), a = r.int(2, 5); if (m * a > 9) return null; return N(`Write $(${m} \\times 10^{${k}}) \\times (${a} \\times 10^{${k + 1}})$ in standard form $${m * a} \\times 10^{n}$. Find $n$.`, 2 * k + 1, `10^${k} × 10^${k + 1} = 10^${2 * k + 1}, so n = ${2 * k + 1}.`); },
    r => { const d = r.int(2, 9), k = r.int(2, 4); return N(`$0.${'0'.repeat(k - 1)}${d} = ${d} \\times 10^{n}$. Find $n$.`, -k, `0.${'0'.repeat(k - 1)}${d} = ${d} × 10^(−${k}), so n = ${-k}.`); },
    r => { const a = r.int(2, 4), b = r.int(2, 4); return N(`Find the value of $\\dfrac{a^3 b^2}{ab}$ when $a = ${a}$ and $b = ${b}$.`, a * a * b, `a³b² ÷ ab = a²b = ${a * a} × ${b} = ${a * a * b}.`); }
  ], word: [
    r => { const n0 = r.int(3, 9), t = r.int(3, 6); return N(`A colony has ${n0} bacteria at noon and the number doubles every hour. How many bacteria are there after ${t} hours?`, n0 * 2 ** t, `${n0} × 2^${t} = ${n0} × ${2 ** t} = ${n0 * 2 ** t}.`); },
    r => { const k = r.pick([1.5, 3, 6, 4.5]), t = r.pick([100, 200, 500]); return N(`Light travels at $3 \\times 10^8$ m/s. How many seconds does it take to travel $${k} \\times 10^{${t === 100 ? 10 : 11}}$ m? (Give your answer as an ordinary number.)`, rd(k * 10 ** (t === 100 ? 10 : 11) / 3e8, 4), `Time = distance ÷ speed = ${k * 10 ** (t === 100 ? 10 : 11)} ÷ ${3e8} = ${rd(k * 10 ** (t === 100 ? 10 : 11) / 3e8, 4)} s.`); },
    r => { const th = r.pick([0.1, 0.2, 0.5]), n = r.int(3, 8); return N(`A sheet of paper is ${th} mm thick. It is folded in half ${n} times. How thick is the folded paper, in mm?`, rd(th * 2 ** n, 4), `Each fold doubles the thickness: ${th} × 2^${n} = ${rd(th * 2 ** n, 4)} mm.`); },
    r => { const n0 = r.pick([50, 80, 100]), t = r.int(2, 4); return N(`A virus count of ${n0} triples every day. How many are there after ${t} days?`, n0 * 3 ** t, `${n0} × 3^${t} = ${n0 * 3 ** t}.`); },
    r => { const k = r.int(2, 4), s = r.int(2, 9); return N(`A grain of sand has a mass of $${s} \\times 10^{-${k}}$ grams. Write this mass as a decimal number of grams.`, rd(s / 10 ** k, 4), `${s} × 10^(−${k}) = ${rd(s / 10 ** k, 4)}.`); }
  ]});

  /* ---- Compound interest ---- */
  const CI = r => { const o = r.pick([[10, 2, 100], [10, 3, 1000], [20, 2, 25], [25, 2, 16], [5, 2, 400]]), k = r.int(1, 6), P = o[2] * k * (o[2] < 400 ? 4 : 1); return {r: o[0], n: o[1], P, A: rd(P * (1 + o[0] / 100) ** o[1], 2)}; };
  gyms.push({id: 'G2.3.indices.2', plain: [
    r => { const c = CI(r); return N(`Find the amount when \\$${sp(c.P)} is invested at ${c.r}% per year compound interest for ${c.n} years, in dollars.`, c.A, `A = P(1 + r/100)^n = ${c.P} × (1 + ${c.r}/100)^${c.n} = ${c.P} × ${rd((1 + c.r / 100) ** c.n, 6)} = ${c.A}.`); },
    r => { const c = CI(r); return N(`Find the compound interest earned when \\$${sp(c.P)} is invested at ${c.r}% per year for ${c.n} years, in dollars.`, rd(c.A - c.P, 2), `Amount = ${c.A}. Interest = ${c.A} − ${c.P} = ${rd(c.A - c.P, 2)}.`); },
    r => { const c = CI(r); return N(`After ${c.n} years at ${c.r}% per year compound interest, an investment has grown to \\$${sp(c.A)}. Find the original sum, in dollars.`, c.P, `P = ${c.A} ÷ (1 + ${c.r}/100)^${c.n} = ${c.P}.`); },
    r => { const o = r.pick([[1000, 10], [2000, 5], [500, 10], [4000, 5]]), P = o[0], rr = o[1]; return N(`Find the simple interest on \\$${sp(P)} at ${rr}% per year for 2 years, in dollars.`, P * rr * 2 / 100, `Simple interest = PRT/100 = ${P} × ${rr} × 2 ÷ 100 = ${P * rr * 2 / 100}.`); },
    r => { const P = 100 * r.int(5, 40); return N(`Find the difference between the compound interest and the simple interest on \\$${sp(P)} at 10% per year for 2 years, in dollars.`, rd(P * 1.21 - P - P * 0.2, 2), `Compound interest = ${P} × 1.21 − ${P} = ${rd(P * 0.21, 2)}. Simple interest = ${P * 0.2}. Difference = ${rd(P * 0.01, 2)}.`); },
    r => { const P = 100 * r.int(5, 50); return N(`A sum of \\$${sp(P)} is invested at 10% per year compound interest. Find the amount after 1 year, in dollars.`, rd(P * 1.1, 2), `${P} × 1.1 = ${rd(P * 1.1, 2)}.`); },
    r => { const c = CI(r); return N(`\\$${sp(c.P)} grows to \\$${sp(c.A)} in ${c.n} years with compound interest. Find the yearly interest rate, as a percentage.`, c.r, `(1 + r/100)^${c.n} = ${c.A} ÷ ${c.P} = ${rd(c.A / c.P, 6)}, so 1 + r/100 = ${rd(1 + c.r / 100, 4)} and r = ${c.r}.`); },
    r => { const P = r.pick([20000, 30000, 40000, 50000]), g = r.pick([10, 20, 25]); return N(`A town has a population of ${sp(P)}. It increases by ${g}% each year. Find the population after 2 years.`, rd(P * (1 + g / 100) ** 2, 2), `${P} × (1 + ${g}/100)² = ${rd(P * (1 + g / 100) ** 2, 2)}.`); },
    r => { const P = r.pick([10000, 20000, 25000, 50000]), d = r.pick([10, 20]); return N(`A car is bought for \\$${sp(P)}. Its value falls by ${d}% each year. Find its value after 2 years, in dollars.`, rd(P * (1 - d / 100) ** 2, 2), `${P} × (1 − ${d}/100)² = ${rd(P * (1 - d / 100) ** 2, 2)}.`); }
  ], word: [
    r => { const c = CI(r); return N(`Mei deposits \\$${sp(c.P)} in a bank that pays ${c.r}% per year compound interest. How much money does she have after ${c.n} years, in dollars?`, c.A, `${c.P} × (1 + ${c.r}/100)^${c.n} = ${c.A}.`); },
    r => { const c = CI(r); return N(`A bank pays ${c.r}% compound interest per year. How much interest does \\$${sp(c.P)} earn in ${c.n} years, in dollars?`, rd(c.A - c.P, 2), `Amount = ${c.A}. Interest = ${c.A} − ${c.P} = ${rd(c.A - c.P, 2)}.`); },
    r => { const P = r.pick([20000, 40000, 50000]), g = r.pick([10, 20, 25]); return N(`A town's population of ${sp(P)} grows by ${g}% per year. By how many people does it grow in the first 2 years?`, rd(P * (1 + g / 100) ** 2 - P, 2), `After 2 years: ${rd(P * (1 + g / 100) ** 2, 2)}. Increase = ${rd(P * (1 + g / 100) ** 2 - P, 2)}.`); },
    r => { const P = r.pick([40000, 50000, 60000, 80000]), d = r.pick([10, 20, 25]); return N(`A machine costs \\$${sp(P)} and loses ${d}% of its value each year. Find its value after 2 years, in dollars.`, rd(P * (1 - d / 100) ** 2, 2), `${P} × (1 − ${d}/100)² = ${rd(P * (1 - d / 100) ** 2, 2)}.`); },
    r => { const c = CI(r); return N(`Ali invests a sum of money at ${c.r}% compound interest per year. After ${c.n} years he has \\$${sp(c.A)}. How much did he invest, in dollars?`, c.P, `P = ${c.A} ÷ (1 + ${c.r}/100)^${c.n} = ${c.P}.`); }
  ]});

  return gyms;
};
