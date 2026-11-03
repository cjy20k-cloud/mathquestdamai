/* G2 (Normal Academic) Sec 3 generators, part C: Ch7 Functions and Graphs, Ch8 Trigonometric Ratios, Ch9 Further
   Trigonometry (obtuse angles, area of a triangle, sine rule, cosine rule).
   Sec 3 banks are 20 typed answers (15 plain + 5 word problems). Style follows the Shing Lee N(A) practice exercises and the
   G2 chapter worksheets in the Shinglee folder (SLWS). Every answer is computed from the question's own numbers and is rounded
   exactly as the question says. */
'use strict';
module.exports = function(H){
  const {N, gcd} = H;
  const rd = (v, d) => +v.toFixed(d);
  const D = Math.PI / 180;
  const sin = d => Math.sin(d * D), cos = d => Math.cos(d * D), tan = d => Math.tan(d * D);
  const asin = v => Math.asin(v) / D, acos = v => Math.acos(v) / D, atan = v => Math.atan(v) / D;
  const ANG = [20, 25, 30, 35, 40, 50, 55, 60, 65, 70];
  const gyms = [];

  /* ---- Functions and graphs ---- */
  gyms.push({id: 'G2.3.functions-and-graphs.1', plain: [
    r => { const a = r.int(2, 6), x = 2, y = a * 8; return N(`The curve $y = ax^3$ passes through the point $(2, ${y})$. Find $a$.`, a, `${y} = a × 2³ = 8a, so a = ${a}.`); },
    r => { const a = r.int(3, 9), x = r.pick([2, 3, 4, 6]) , k = a * x; return N(`The curve $y = \\dfrac{a}{x}$ passes through $(${x}, ${a})$. Find $y$ when $x = ${2 * x}$.`, a / 2, `a = xy = ${x} × ${a} = ${k}. When x = ${2 * x}, y = ${k} ÷ ${2 * x} = ${a / 2}.`); },
    r => { const x = r.int(-4, 4), a = r.int(1, 3); return N(`Find the value of $y = x^3 - ${a}x$ when $x = ${x}$.`, x ** 3 - a * x, `y = (${x})³ − ${a}(${x}) = ${x ** 3} − ${a * x} = ${x ** 3 - a * x}.`); },
    r => { const x = r.int(3, 7); return N(`Find the value of $y = 2^x$ when $x = ${x}$.`, 2 ** x, `2^${x} = ${2 ** x}.`); },
    r => { const x = r.int(3, 8); return N(`Solve $2^x = ${2 ** x}$.`, x, `${2 ** x} = 2^${x}, so x = ${x}.`); },
    r => { const k = r.pick([2, 4, 5, 10]), x = r.pick([2, 4, 5, 10]); return N(`Find the value of $y = x^2 + \\dfrac{${k * x}}{x}$ when $x = ${x}$.`, x * x + k, `y = ${x * x} + ${k * x}/${x} = ${x * x} + ${k} = ${x * x + k}.`); },
    r => { const k = r.pick([12, 24, 36, 48]), x = r.pick([2, 3, 4, 6]); if ((k / (x * x)) % 1) return null; return N(`Find the value of $y = \\dfrac{${k}}{x^2}$ when $x = ${x}$.`, k / (x * x), `y = ${k} ÷ ${x * x} = ${k / (x * x)}.`); },
    r => { const x = r.int(-3, 3), a = r.int(2, 5); return N(`Find the value of $y = -x^3 + ${a}x$ when $x = ${x}$.`, -(x ** 3) + a * x, `y = −(${x})³ + ${a}(${x}) = ${-(x ** 3)} + ${a * x} = ${-(x ** 3) + a * x}.`); },
    r => { const p = r.pick([2, 4, 6, 8, 10]); return N(`For $x > 0$, find the minimum value of $y = x + \\dfrac{${p * p}}{x}$.`, 2 * p, `The minimum occurs when x = ${p * p}/x, i.e. x = ${p}, giving y = ${p} + ${p} = ${2 * p}.`); },
    r => { const b = r.int(2, 4), n = r.int(2, 5); return N(`Solve $${b}^x = ${b ** n}$.`, n, `${b ** n} = ${b}^${n}, so x = ${n}.`); },
    r => { const a = r.int(2, 6), x = r.int(2, 3), y = a * x * x; return N(`The curve $y = ax^2$ passes through the point $(${x}, ${y})$. Find $a$.`, a, `${y} = a × ${x * x}, so a = ${a}.`); }
  ], word: [
    r => { const n0 = r.pick([100, 200, 50]), t = r.int(3, 6); return N(`The number of bacteria in a dish is $P = ${n0} \\times 2^t$ after $t$ hours. Find $P$ when $t = ${t}$.`, n0 * 2 ** t, `P = ${n0} × 2^${t} = ${n0 * 2 ** t}.`); },
    r => { const t = r.int(2, 6); return N(`A stone is dropped from a cliff. The distance fallen is $d = 5t^2$ metres after $t$ seconds. Find $d$ when $t = ${t}$.`, 5 * t * t, `d = 5(${t})² = ${5 * t * t} m.`); },
    r => { const e = r.int(3, 9); return N(`The volume of a cube is $V = x^3$ cm³, where $x$ cm is the edge. Find $x$ when $V = ${e ** 3}$.`, e, `x³ = ${e ** 3}, so x = ${e}.`); },
    r => { const d = r.pick([2, 4, 5, 10]), I = r.pick([100, 200, 400]); if ((I / (d * d)) % 1) return null; return N(`The brightness of a lamp at a distance $d$ metres is $B = \\dfrac{${I}}{d^2}$. Find $B$ when $d = ${d}$.`, I / (d * d), `B = ${I} ÷ ${d * d} = ${I / (d * d)}.`); }
  ]});

  /* ---- Trigonometric ratios ---- */
  gyms.push({id: 'G2.3.trigonometric-ratios.1', plain: [
    r => { const h = r.int(6, 20), a = r.pick(ANG); return N(`In a right-angled triangle, the hypotenuse is ${h} cm and an angle is ${a}°. Find the side opposite this angle, correct to 1 decimal place, in cm.`, rd(h * sin(a), 1), `opposite = ${h} × sin ${a}° = ${rd(h * sin(a), 1)} cm.`); },
    r => { const h = r.int(6, 20), a = r.pick(ANG); return N(`In a right-angled triangle, the hypotenuse is ${h} cm and an angle is ${a}°. Find the side next to (adjacent to) this angle, correct to 1 decimal place, in cm.`, rd(h * cos(a), 1), `adjacent = ${h} × cos ${a}° = ${rd(h * cos(a), 1)} cm.`); },
    r => { const b = r.int(5, 20), a = r.pick(ANG); return N(`In a right-angled triangle, the side adjacent to an angle of ${a}° is ${b} cm. Find the side opposite the angle, correct to 1 decimal place, in cm.`, rd(b * tan(a), 1), `opposite = ${b} × tan ${a}° = ${rd(b * tan(a), 1)} cm.`); },
    r => { const o = r.int(5, 18), a = r.pick(ANG); return N(`In a right-angled triangle, the side opposite an angle of ${a}° is ${o} cm. Find the hypotenuse, correct to 1 decimal place, in cm.`, rd(o / sin(a), 1), `hypotenuse = ${o} ÷ sin ${a}° = ${rd(o / sin(a), 1)} cm.`); },
    r => { const o = r.int(4, 12), b = r.int(5, 15); return N(`In a right-angled triangle, the sides next to the right angle are ${o} cm and ${b} cm. Find the angle opposite the ${o} cm side, correct to the nearest degree.`, Math.round(atan(o / b)), `tan θ = ${o}/${b}, so θ = ${rd(atan(o / b), 2)}° ≈ ${Math.round(atan(o / b))}°.`); },
    r => { const o = r.int(4, 12), h = r.int(14, 25); return N(`In a right-angled triangle, the hypotenuse is ${h} cm and the side opposite angle $x$ is ${o} cm. Find $x$, correct to the nearest degree.`, Math.round(asin(o / h)), `sin x = ${o}/${h}, so x = ${rd(asin(o / h), 2)}° ≈ ${Math.round(asin(o / h))}°.`); },
    r => { const t = r.pick([[3, 4, 5], [6, 8, 10], [9, 12, 15]]), which = r.pick(['sin', 'cos', 'tan']); const v = which === 'sin' ? t[0] / t[2] : which === 'cos' ? t[1] / t[2] : t[0] / t[1]; return N(`In a right-angled triangle, the side opposite angle $A$ is ${t[0]} cm, the side adjacent to $A$ is ${t[1]} cm and the hypotenuse is ${t[2]} cm. Find $\\${which} A$ as a decimal.`, rd(v, 4), `${which} A = ${which === 'sin' ? 'opposite ÷ hypotenuse' : which === 'cos' ? 'adjacent ÷ hypotenuse' : 'opposite ÷ adjacent'} = ${rd(v, 4)}.`); },
    r => { const a = r.pick([15, 20, 25, 35, 40, 55, 65]); return N(`$\\sin ${a}^\\circ = \\cos x^\\circ$ where $x$ is an acute angle. Find $x$.`, 90 - a, `sin θ = cos(90° − θ), so x = 90 − ${a} = ${90 - a}.`); },
    r => { const a = r.pick([[30, 0.5], [45, 1], [60, 0.866]]); return N(`Evaluate $\\tan 45^\\circ + \\sin 30^\\circ$.`, 1.5, 'tan 45° = 1 and sin 30° = 0.5, so the total is 1.5.'); },
    r => { const a = r.pick(ANG), h = r.int(8, 20); return N(`In triangle ABC, angle B = 90°, angle A = ${a}° and AC = ${h} cm. Find BC, correct to 1 decimal place, in cm.`, rd(h * sin(a), 1), `BC is opposite angle A: BC = ${h} × sin ${a}° = ${rd(h * sin(a), 1)} cm.`); }
  ], word: [
    r => { const L = r.int(4, 9), a = r.pick([60, 65, 70, 75]); return N(`A ladder ${L} m long leans against a vertical wall and makes an angle of ${a}° with the ground. How high up the wall does it reach, correct to 1 decimal place, in m?`, rd(L * sin(a), 1), `height = ${L} × sin ${a}° = ${rd(L * sin(a), 1)} m.`); },
    r => { const h = r.int(5, 12), s = r.int(4, 10); return N(`A pole ${h} m tall casts a shadow ${s} m long on level ground. Find the angle of elevation of the Sun, correct to the nearest degree.`, Math.round(atan(h / s)), `tan θ = ${h}/${s}, so θ = ${rd(atan(h / s), 2)}° ≈ ${Math.round(atan(h / s))}°.`); },
    r => { const d = r.int(20, 60), a = r.pick([25, 30, 35, 40, 50]); return N(`From a point ${d} m from the foot of a tower, the angle of elevation of its top is ${a}°. Find the height of the tower, correct to 1 decimal place, in m.`, rd(d * tan(a), 1), `height = ${d} × tan ${a}° = ${rd(d * tan(a), 1)} m.`); },
    r => { const L = r.int(6, 15), a = r.pick([10, 15, 20, 25]); return N(`A ramp ${L} m long rises at an angle of ${a}° to the horizontal. Find its vertical height, correct to 1 decimal place, in m.`, rd(L * sin(a), 1), `height = ${L} × sin ${a}° = ${rd(L * sin(a), 1)} m.`); },
    r => { const o = r.int(3, 9), h = r.int(11, 20); return N(`A kite string is ${h} m long and the kite is ${o} m above the ground. Find the angle the string makes with the horizontal, correct to the nearest degree.`, Math.round(asin(o / h)), `sin θ = ${o}/${h}, so θ = ${rd(asin(o / h), 2)}° ≈ ${Math.round(asin(o / h))}°.`); }
  ]});

  /* ---- Sine and cosine of obtuse angles ---- */
  gyms.push({id: 'G2.3.further-trigonometry.1', plain: [
    r => { const a = r.pick([30, 45, 60]); return N(`Use $\\sin(180^\\circ - \\theta) = \\sin\\theta$ to find $\\sin ${180 - a}^\\circ$ correct to 3 decimal places.`, rd(sin(180 - a), 3), `sin ${180 - a}° = sin ${a}° = ${rd(sin(a), 3)}.`); },
    r => { const a = r.pick([30, 45, 60]); return N(`Use $\\cos(180^\\circ - \\theta) = -\\cos\\theta$ to find $\\cos ${180 - a}^\\circ$ correct to 3 decimal places.`, rd(cos(180 - a), 3), `cos ${180 - a}° = −cos ${a}° = ${rd(cos(180 - a), 3)}.`); },
    r => { const a = r.pick([20, 25, 30, 40, 50, 65]); return N(`$\\sin x^\\circ = \\sin ${a}^\\circ$ and $x$ is obtuse. Find $x$.`, 180 - a, `The obtuse angle with the same sine is 180° − ${a}° = ${180 - a}°.`); },
    r => { const a = r.pick([30, 40, 50, 60, 70]); return N(`$\\sin ${180 - a}^\\circ = \\sin x^\\circ$ where $x$ is acute. Find $x$.`, a, `sin(180° − ${a}°) = sin ${a}°, so x = ${a}.`); },
    r => { const a = r.pick([100, 110, 120, 130, 140, 150, 160]); return N(`Find $\\sin ${a}^\\circ$ correct to 3 decimal places.`, rd(sin(a), 3), `sin ${a}° = sin ${180 - a}° = ${rd(sin(a), 3)}.`); },
    r => { const a = r.pick([100, 110, 120, 130, 140, 150, 160]); return N(`Find $\\cos ${a}^\\circ$ correct to 3 decimal places.`, rd(cos(a), 3), `cos ${a}° = −cos ${180 - a}° = ${rd(cos(a), 3)}.`); },
    r => { const a = r.pick([110, 120, 130, 135, 140, 150]); return N(`Find $\\tan ${a}^\\circ$ correct to 2 decimal places.`, rd(tan(a), 2), `tan ${a}° = −tan ${180 - a}° = ${rd(tan(a), 2)}.`); },
    r => { const a = r.pick([100, 120, 135, 150]); return N(`$\\cos x^\\circ = ${rd(cos(a), 3)}$ where $x$ is between 90 and 180. Find $x$, correct to the nearest degree.`, a, `x = ${rd(acos(cos(a)), 1)}°, which is ${a}°.`); },
    r => { const a = r.pick([30, 45, 60, 20, 35]); return N(`$\\sin ${a}^\\circ = k$. Write down $\\sin ${180 - a}^\\circ$ correct to 3 decimal places.`, rd(sin(a), 3), `sin ${180 - a}° = sin ${a}° = ${rd(sin(a), 3)}.`); },
    r => { const a = r.pick([20, 30, 40, 50, 60, 70]); return N(`Find the obtuse angle $x$ such that $\\cos x^\\circ = -\\cos ${a}^\\circ$.`, 180 - a, `cos(180° − θ) = −cos θ, so x = 180 − ${a} = ${180 - a}.`); }
  ], word: [
    r => { const a = r.pick([20, 30, 40, 50]); return N(`Two roads meet at an obtuse angle $\\theta$ with $\\sin\\theta = \\sin ${a}^\\circ$. Find $\\theta$, in degrees.`, 180 - a, `θ = 180° − ${a}° = ${180 - a}°.`); },
    r => { const a = r.pick([110, 120, 135, 150]); return N(`In a triangle, an obtuse angle is ${a}°. Find the sine of this angle, correct to 3 decimal places.`, rd(sin(a), 3), `sin ${a}° = ${rd(sin(a), 3)}.`); },
    r => { const a = r.pick([120, 135, 150]); return N(`A hinge is opened to ${a}°. Find the cosine of the angle, correct to 3 decimal places.`, rd(cos(a), 3), `cos ${a}° = ${rd(cos(a), 3)}.`); },
    r => { const a = r.pick([25, 35, 45, 55]); return N(`A triangular sign has an obtuse angle whose sine is the same as the sine of ${a}°. How large is the obtuse angle, in degrees?`, 180 - a, `180° − ${a}° = ${180 - a}°.`); },
    r => { const a = r.pick([130, 140, 150]); return N(`A swing's chain makes an obtuse angle of ${a}° at the top. Find $\\tan ${a}^\\circ$ correct to 2 decimal places.`, rd(tan(a), 2), `tan ${a}° = ${rd(tan(a), 2)}.`); }
  ]});

  /* ---- Area of a triangle ---- */
  gyms.push({id: 'G2.3.further-trigonometry.2', plain: [
    r => { const a = r.int(2, 12) * 2, b = r.int(2, 12) * 2; return N(`A triangle has two sides of ${a} cm and ${b} cm with an included angle of 30°. Find its area, in cm².`, a * b / 4, `Area = ½ × ${a} × ${b} × sin 30° = ½ × ${a} × ${b} × 0.5 = ${a * b / 4} cm².`); },
    r => { const a = r.int(2, 12) * 2, b = r.int(2, 12) * 2; return N(`A triangle has two sides of ${a} cm and ${b} cm with an included angle of 150°. Find its area, in cm².`, a * b / 4, `Area = ½ × ${a} × ${b} × sin 150° = ½ × ${a} × ${b} × 0.5 = ${a * b / 4} cm².`); },
    r => { const a = r.int(3, 15), b = r.int(3, 15); return N(`A triangle has two sides of ${a} cm and ${b} cm with an included angle of 90°. Find its area, in cm².`, a * b / 2, `Area = ½ × ${a} × ${b} × sin 90° = ${a * b / 2} cm².`); },
    r => { const a = r.int(6, 15), b = r.int(6, 15), C = r.pick(ANG); return N(`Find the area of a triangle with sides ${a} cm and ${b} cm and an included angle of ${C}°, correct to 1 decimal place, in cm².`, rd(a * b * sin(C) / 2, 1), `Area = ½ab sin C = ½ × ${a} × ${b} × sin ${C}° = ${rd(a * b * sin(C) / 2, 1)} cm².`); },
    r => { const a = r.int(2, 12) * 2, b = r.int(2, 12) * 2, A = a * b / 4; return N(`A triangle has sides ${a} cm and ${b} cm and an area of ${A} cm². The included angle is acute. Find the included angle, in degrees.`, 30, `${A} = ½ × ${a} × ${b} × sin C, so sin C = ${A} ÷ ${a * b / 2} = 0.5 and C = 30°.`); },
    r => { const a = r.int(4, 12) * 2; return N(`An equilateral triangle has sides of ${a} cm. Find its area, correct to 1 decimal place, in cm².`, rd(a * a * sin(60) / 2, 1), `Area = ½ × ${a} × ${a} × sin 60° = ${rd(a * a * sin(60) / 2, 1)} cm².`); },
    r => { const a = r.int(2, 12) * 2, b = r.int(2, 12) * 2; return N(`A parallelogram has sides of ${a} cm and ${b} cm with an angle of 30° between them. Find its area, in cm².`, a * b / 2, `Area = ab sin C = ${a} × ${b} × 0.5 = ${a * b / 2} cm².`); },
    r => { const a = r.int(6, 14), b = r.int(6, 14), C = r.pick([100, 110, 120, 130]); return N(`Find the area of a triangle with sides ${a} cm and ${b} cm and an included angle of ${C}°, correct to 1 decimal place, in cm².`, rd(a * b * sin(C) / 2, 1), `Area = ½ × ${a} × ${b} × sin ${C}° = ${rd(a * b * sin(C) / 2, 1)} cm².`); },
    r => { const a = r.int(2, 8) * 2, b = r.int(2, 8) * 2; return N(`The area of a triangle is ${a * b / 4} cm² and two sides are ${a} cm and ${b} cm. If the included angle is obtuse, find it, in degrees.`, 150, `sin C = ${a * b / 4} ÷ (½ × ${a} × ${b}) = 0.5. The obtuse angle is 180° − 30° = 150°.`); },
    r => { const a = r.int(5, 12), C = r.pick([30, 45, 60, 90]); return N(`A triangle has two equal sides of ${a} cm and an angle of ${C}° between them. Find its area, correct to 1 decimal place, in cm².`, rd(a * a * sin(C) / 2, 1), `Area = ½ × ${a} × ${a} × sin ${C}° = ${rd(a * a * sin(C) / 2, 1)} cm².`); }
  ], word: [
    r => { const a = r.int(4, 10) * 2, b = r.int(4, 10) * 2; return N(`A triangular plot has two sides of ${a} m and ${b} m meeting at an angle of 30°. Find its area, in m².`, a * b / 4, `Area = ½ × ${a} × ${b} × sin 30° = ${a * b / 4} m².`); },
    r => { const a = r.int(5, 12), b = r.int(5, 12), C = r.pick([40, 50, 70, 80]); return N(`A triangular sail has two sides of ${a} m and ${b} m with an angle of ${C}° between them. Find its area, correct to 1 decimal place, in m².`, rd(a * b * sin(C) / 2, 1), `Area = ½ × ${a} × ${b} × sin ${C}° = ${rd(a * b * sin(C) / 2, 1)} m².`); },
    r => { const a = r.int(6, 20), b = r.int(6, 20); return N(`A rectangular piece of cloth is cut along its diagonal to make two triangles. If the sides of the rectangle are ${a} cm and ${b} cm, find the area of one triangle using ½ab sin 90°, in cm².`, a * b / 2, `Area = ½ × ${a} × ${b} × 1 = ${a * b / 2} cm².`); },
    r => { const a = r.int(4, 10) * 2, b = r.int(4, 10) * 2; return N(`A roof panel is a triangle with sides ${a} m and ${b} m and an obtuse included angle of 150°. Find its area, in m².`, a * b / 4, `Area = ½ × ${a} × ${b} × sin 150° = ${a * b / 4} m².`); },
    r => { const a = r.int(4, 12) * 2; return N(`A decorative tile is an equilateral triangle of side ${a} cm. Find its area, correct to 1 decimal place, in cm².`, rd(a * a * sin(60) / 2, 1), `Area = ½ × ${a} × ${a} × sin 60° = ${rd(a * a * sin(60) / 2, 1)} cm².`); }
  ]});

  /* ---- The sine rule ---- */
  gyms.push({id: 'G2.3.further-trigonometry.3', plain: [
    r => { const a = r.int(3, 12); return N(`In triangle ABC, A = 30°, B = 90° and a = ${a} cm. Use the sine rule to find $b$, in cm.`, 2 * a, `a/sin A = b/sin B gives b = ${a} × sin 90° ÷ sin 30° = ${a} ÷ 0.5 = ${2 * a} cm.`); },
    r => { const a = r.int(5, 14), A = r.pick([30, 35, 40, 45]), B = r.pick([50, 60, 70, 80, 100]); return N(`In triangle ABC, a = ${a} cm, A = ${A}° and B = ${B}°. Find $b$, correct to 1 decimal place, in cm.`, rd(a * sin(B) / sin(A), 1), `b = ${a} × sin ${B}° ÷ sin ${A}° = ${rd(a * sin(B) / sin(A), 1)} cm.`); },
    r => { const A = r.pick([30, 40, 50]), B = r.pick([60, 70, 80]), a = r.int(6, 14); return N(`In triangle ABC, A = ${A}°, B = ${B}° and a = ${a} cm. Find angle C, in degrees.`, 180 - A - B, `C = 180° − ${A}° − ${B}° = ${180 - A - B}°.`); },
    r => { const A = r.pick([30, 40, 50]), B = r.pick([60, 70, 80]), a = r.int(6, 14), C = 180 - A - B; return N(`In triangle ABC, A = ${A}°, B = ${B}° and a = ${a} cm. Find $c$, correct to 1 decimal place, in cm.`, rd(a * sin(C) / sin(A), 1), `C = ${C}°. c = ${a} × sin ${C}° ÷ sin ${A}° = ${rd(a * sin(C) / sin(A), 1)} cm.`); },
    r => { const a = r.pick([4, 5, 6, 7, 8]), A = 30; return N(`In triangle ABC, $\\dfrac{a}{\\sin A} = 2R$ where $R$ is the radius of the circle through A, B and C. If a = ${a} cm and A = 30°, find $R$, in cm.`, a, `2R = ${a} ÷ sin 30° = ${2 * a}, so R = ${a} cm.`); },
    r => { const a = r.int(9, 15), A = r.pick([30, 35, 40, 45]), B = r.pick([35, 50, 60, 70]), b = rd(a * sin(B) / sin(A), 4); return N(`In triangle ABC, a = ${a} cm, b = ${rd(b, 1)} cm and A = ${A}°. Find angle B (acute), correct to the nearest degree.`, Math.round(asin(rd(b, 1) * sin(A) / a)), `sin B = b sin A ÷ a = ${rd(b, 1)} × sin ${A}° ÷ ${a} = ${rd(rd(b, 1) * sin(A) / a, 4)}, so B ≈ ${Math.round(asin(rd(b, 1) * sin(A) / a))}°.`); },
    r => { const a = r.int(6, 14), A = r.pick([30, 45]), B = 90; return N(`In triangle ABC, A = ${A}°, B = 90° and a = ${a} cm. Find the hypotenuse $b$, correct to 1 decimal place, in cm.`, rd(a / sin(A), 1), `b = ${a} ÷ sin ${A}° = ${rd(a / sin(A), 1)} cm.`); },
    r => { const A = r.pick([40, 50]), B = r.pick([60, 70]), a = r.int(8, 16); return N(`In triangle ABC, A = ${A}°, B = ${B}° and a = ${a} cm. Find the longest side of the triangle, correct to 1 decimal place, in cm.`, rd(a * sin(Math.max(B, 180 - A - B)) / sin(A), 1), `The largest angle is ${Math.max(B, 180 - A - B)}°, so the longest side is ${a} × sin ${Math.max(B, 180 - A - B)}° ÷ sin ${A}° = ${rd(a * sin(Math.max(B, 180 - A - B)) / sin(A), 1)} cm.`); },
    r => { const b = r.int(7, 15), A = r.pick([30, 40, 50]), B = r.pick([60, 70, 80]); return N(`In triangle ABC, b = ${b} cm, A = ${A}° and B = ${B}°. Find $a$, correct to 1 decimal place, in cm.`, rd(b * sin(A) / sin(B), 1), `a = ${b} × sin ${A}° ÷ sin ${B}° = ${rd(b * sin(A) / sin(B), 1)} cm.`); }
  ], word: [
    r => { const d = r.int(80, 150), A = r.pick([40, 45, 50]), B = r.pick([60, 70, 80]), C = 180 - A - B; return N(`Two observers A and B are ${d} m apart on level ground. They both look at a tower at C. Angle CAB = ${A}° and angle CBA = ${B}°. Find the distance AC, correct to 1 decimal place, in m.`, rd(d * sin(B) / sin(C), 1), `Angle C = ${C}°. AC = ${d} × sin ${B}° ÷ sin ${C}° = ${rd(d * sin(B) / sin(C), 1)} m.`); },
    r => { const d = r.int(50, 120), A = r.pick([30, 40, 50]), B = r.pick([60, 70, 80]), C = 180 - A - B; return N(`A triangular field has a side AB = ${d} m, angle A = ${A}° and angle B = ${B}°. Find the side BC, correct to 1 decimal place, in m.`, rd(d * sin(A) / sin(C), 1), `Angle C = ${C}°. BC = ${d} × sin ${A}° ÷ sin ${C}° = ${rd(d * sin(A) / sin(C), 1)} m.`); },
    r => { const a = r.int(8, 20); return N(`In a right-angled triangle ABC with B = 90° and A = 30°, the side opposite A is ${a} m. Use the sine rule to find the hypotenuse, in m.`, 2 * a, `b = ${a} × sin 90° ÷ sin 30° = ${2 * a} m.`); },
    r => { const A = r.pick([35, 40, 45]), a = r.int(10, 20), B = r.pick([55, 65, 75]); return N(`A boat at A and a buoy at B are observed from a lighthouse C. a = BC = ${a} km, angle A = ${A}° and angle B = ${B}°. Find the distance AC (side b), correct to 1 decimal place, in km.`, rd(a * sin(B) / sin(A), 1), `AC = ${a} × sin ${B}° ÷ sin ${A}° = ${rd(a * sin(B) / sin(A), 1)} km.`); },
    r => { const a = r.int(6, 15); return N(`A circular pond passes through three posts A, B and C. Side BC = ${a} m and angle A = 30°. Find the radius of the pond, in m.`, a, `2R = a ÷ sin A = ${a} ÷ 0.5 = ${2 * a}, so R = ${a} m.`); }
  ]});

  /* ---- The cosine rule ---- */
  const TRI3 = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]];
  const C60 = [[3, 8, 7], [5, 8, 7], [7, 15, 13]], C120 = [[3, 5, 7], [7, 8, 13]];       // b, c, a: a^2 = b^2 + c^2 -/+ bc
  gyms.push({id: 'G2.3.further-trigonometry.4', plain: [
    r => { const t = r.pick(C60); return N(`In triangle ABC, b = ${t[0]} cm, c = ${t[1]} cm and A = 60°. Use the cosine rule to find $a$, in cm.`, t[2], `a² = ${t[0]}² + ${t[1]}² − 2(${t[0]})(${t[1]})cos 60° = ${t[0] ** 2 + t[1] ** 2} − ${t[0] * t[1]} = ${t[2] ** 2}, so a = ${t[2]} cm.`); },
    r => { const t = r.pick(C120); return N(`In triangle ABC, b = ${t[0]} cm, c = ${t[1]} cm and A = 120°. Use the cosine rule to find $a$, in cm.`, t[2], `a² = ${t[0]}² + ${t[1]}² − 2(${t[0]})(${t[1]})cos 120° = ${t[0] ** 2 + t[1] ** 2} + ${t[0] * t[1]} = ${t[2] ** 2}, so a = ${t[2]} cm.`); },
    r => { const t = r.pick(C60); return N(`In triangle ABC, a = ${t[2]} cm, b = ${t[0]} cm and c = ${t[1]} cm. Find angle A, in degrees.`, 60, `cos A = (${t[0] ** 2} + ${t[1] ** 2} − ${t[2] ** 2}) ÷ (2 × ${t[0]} × ${t[1]}) = 0.5, so A = 60°.`); },
    r => { const t = r.pick(C120); return N(`A triangle has sides ${t[0]} cm, ${t[1]} cm and ${t[2]} cm. Find its largest angle, in degrees.`, 120, `The largest angle is opposite ${t[2]} cm: cos A = (${t[0] ** 2} + ${t[1] ** 2} − ${t[2] ** 2}) ÷ (2 × ${t[0]} × ${t[1]}) = −0.5, so A = 120°.`); },
    r => { const b = r.int(5, 12), c = r.int(5, 12), A = r.pick([40, 50, 70, 80]); const a = Math.sqrt(b * b + c * c - 2 * b * c * cos(A)); return N(`In triangle ABC, b = ${b} cm, c = ${c} cm and A = ${A}°. Find $a$, correct to 1 decimal place, in cm.`, rd(a, 1), `a² = ${b}² + ${c}² − 2(${b})(${c})cos ${A}° = ${rd(a * a, 2)}, so a = ${rd(a, 1)} cm.`); },
    r => { const a = r.int(5, 9), b = r.int(6, 10), c = r.int(7, 11); if (a + b <= c || a + c <= b || b + c <= a) return null; const A = acos((b * b + c * c - a * a) / (2 * b * c)); return N(`In triangle ABC, a = ${a} cm, b = ${b} cm and c = ${c} cm. Find angle A, correct to the nearest degree.`, Math.round(A), `cos A = (${b * b} + ${c * c} − ${a * a}) ÷ (2 × ${b} × ${c}) = ${rd((b * b + c * c - a * a) / (2 * b * c), 4)}, so A ≈ ${Math.round(A)}°.`); },
    r => { const t = r.pick(TRI3), b = t[0], c = t[1]; return N(`In triangle ABC, b = ${b} cm, c = ${c} cm and A = 90°. Use the cosine rule to find $a$, in cm.`, t[2], `cos 90° = 0, so a² = ${b}² + ${c}² = ${t[2] ** 2} and a = ${t[2]} cm.`); },
    r => { const t = r.pick([[5, 7, 8], [7, 8, 13]]); const k = t[0] === 5 ? 60 : 120; return N(`A triangle has sides ${t[0]} cm, ${t[1]} cm and ${t[2]} cm. Find the angle opposite the ${t[0] === 5 ? t[1] : t[2]} cm side, in degrees.`, k, `cos θ = ${t[0] === 5 ? '(25 + 64 − 49) ÷ 80 = 0.5' : '(49 + 64 − 169) ÷ 112 = −0.5'}, so θ = ${k}°.`); },
    r => { const A = r.pick([60, 120]), t = A === 60 ? r.pick(C60) : r.pick(C120); return N(`In triangle ABC, A = ${A}°, b = ${t[0]} cm and c = ${t[1]} cm. Find the perimeter of the triangle, in cm.`, t[0] + t[1] + t[2], `a = ${t[2]} cm. Perimeter = ${t[2]} + ${t[0]} + ${t[1]} = ${t[0] + t[1] + t[2]} cm.`); }
  ], word: [
    r => { const t = r.pick(C60); return N(`Two ships leave a port at the same time. Their paths are 60° apart. After some time they are ${t[0]} km and ${t[1]} km from the port. Find the distance between them, in km.`, t[2], `Distance² = ${t[0]}² + ${t[1]}² − 2(${t[0]})(${t[1]})cos 60° = ${t[2] ** 2}, so the distance is ${t[2]} km.`); },
    r => { const t = r.pick(C120); return N(`Two paths in a park meet at an angle of 120°. Ali walks ${t[0]} km along one path and Ben walks ${t[1]} km along the other. How far apart are they, in km?`, t[2], `Distance² = ${t[0]}² + ${t[1]}² − 2(${t[0]})(${t[1]})cos 120° = ${t[2] ** 2}, so the distance is ${t[2]} km.`); },
    r => { const t = r.pick([[5, 7, 8]]); return N(`A triangular field has sides of ${t[0]} m, ${t[1]} m and ${t[2]} m. Find the largest angle of the field, correct to the nearest degree.`, Math.round(acos((t[0] ** 2 + t[1] ** 2 - t[2] ** 2) / (2 * t[0] * t[1]))), `The largest angle is opposite ${t[2]} m: cos θ = (${t[0] ** 2} + ${t[1] ** 2} − ${t[2] ** 2}) ÷ (2 × ${t[0]} × ${t[1]}) = ${rd((t[0] ** 2 + t[1] ** 2 - t[2] ** 2) / (2 * t[0] * t[1]), 4)}, so θ ≈ ${Math.round(acos((t[0] ** 2 + t[1] ** 2 - t[2] ** 2) / (2 * t[0] * t[1])))}°.`); },
    r => { const b = r.int(6, 12), c = r.int(8, 14), A = r.pick([50, 70, 80]); const a = Math.sqrt(b * b + c * c - 2 * b * c * cos(A)); return N(`A tunnel is dug through a hill between two points A and B. From a point C, CA = ${b} m, CB = ${c} m and angle ACB = ${A}°. Find the length of the tunnel AB, correct to 1 decimal place, in m.`, rd(a, 1), `AB² = ${b}² + ${c}² − 2(${b})(${c})cos ${A}° = ${rd(a * a, 2)}, so AB = ${rd(a, 1)} m.`); },
    r => { const t = r.pick(C60); return N(`A rhombus-like flower bed is split by a path. Two sides of a triangular section are ${t[0]} m and ${t[1]} m with an angle of 60° between them. Find the length of the third side, in m.`, t[2], `a² = ${t[0]}² + ${t[1]}² − ${t[0] * t[1]} = ${t[2] ** 2}, so a = ${t[2]} m.`); }
  ]});

  return gyms;
};
