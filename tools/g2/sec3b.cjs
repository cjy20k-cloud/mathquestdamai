/* G2 (Normal Academic) Sec 3 generators, part B: Ch5 Congruence and Similarity (with scale drawings), Ch6 Coordinate
   Geometry, Ch7 Functions and Graphs, Ch8 Trigonometric Ratios, Ch9 Further Trigonometry.
   Sec 3 banks are 20 typed answers (15 plain + 5 word problems). Style follows the Shing Lee N(A) practice exercises and the
   G2 chapter worksheets in the Shinglee folder (SLWS). Every answer is computed from the question's own numbers and is rounded
   exactly as the question says. */
'use strict';
module.exports = function(H){
  const {N, gcd, sp} = H;
  const rd = (v, d) => +v.toFixed(d);
  const R = Math.PI / 180;
  const sin = d => Math.sin(d * R), cos = d => Math.cos(d * R), tan = d => Math.tan(d * R);
  const asin = v => Math.asin(v) / R, acos = v => Math.acos(v) / R, atan = v => Math.atan(v) / R;
  const sgn = n => n < 0 ? `- ${-n}` : `+ ${n}`;
  const TRI = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [7, 24, 25]];
  const gyms = [];

  /* ---- Congruence and similarity ---- */
  gyms.push({id: 'G2.3.congruence-and-similarity.1', plain: [
    r => { const a = r.int(2, 6), b = r.int(1, 4), k = r.int(2, 5); return N(`In triangle ABC, D is on AB and E is on AC with DE parallel to BC. AD = ${a} cm, DB = ${b} cm and BC = ${(a + b) * k} cm. Find DE, in cm.`, a * k, `Triangles ADE and ABC are similar. DE ÷ BC = AD ÷ AB = ${a} ÷ ${a + b}, so DE = ${(a + b) * k} × ${a}/${a + b} = ${a * k} cm.`); },
    r => { const p = r.int(2, 5), q = r.int(p + 1, 8), s = r.int(2, 6); if (gcd(p, q) !== 1) return null; return N(`Two similar triangles have corresponding sides ${p * s} cm and ${q * s} cm. The smaller triangle has an area of ${p * p * 4} cm². Find the area of the larger triangle, in cm².`, q * q * 4, `Length ratio = ${p} : ${q}, so the area ratio = ${p * p} : ${q * q}. Area = ${p * p * 4} × ${q * q} ÷ ${p * p} = ${q * q * 4} cm².`); },
    r => { const p = r.int(2, 4), q = r.int(p + 1, 6), V = p ** 3 * r.int(2, 6); if (gcd(p, q) !== 1) return null; return N(`Two similar solids have heights ${p} cm and ${q} cm. The smaller solid has a volume of ${V} cm³. Find the volume of the larger solid, in cm³.`, V / p ** 3 * q ** 3, `Volume ratio = ${p}³ : ${q}³ = ${p ** 3} : ${q ** 3}. Volume = ${V} ÷ ${p ** 3} × ${q ** 3} = ${V / p ** 3 * q ** 3} cm³.`); },
    r => { const p = r.int(2, 4), q = r.int(p + 1, 7), A = p * p * r.int(2, 6); if (gcd(p, q) !== 1) return null; return N(`Two similar bottles have heights ${p * 5} cm and ${q * 5} cm. The surface area of the smaller bottle is ${A} cm². Find the surface area of the larger bottle, in cm².`, A / (p * p) * q * q, `Area ratio = ${p * p} : ${q * q}. Surface area = ${A} ÷ ${p * p} × ${q * q} = ${A / (p * p) * q * q} cm².`); },
    r => { const x = r.int(3, 10), a = r.int(1, 5), k = r.int(2, 4); return N(`Triangles ABC and DEF are congruent. AB = $(${k}x + ${a})$ cm and DE = ${k * x + a} cm. Find $x$.`, x, `Corresponding sides are equal: ${k}x + ${a} = ${k * x + a}, so x = ${x}.`); },
    r => { const p = r.int(2, 4), q = r.int(p + 1, 6), a = r.int(2, 6) * p; if (gcd(p, q) !== 1) return null; return N(`Two similar jugs have capacities in the ratio ${p ** 3} : ${q ** 3}. The smaller jug is ${a} cm tall. Find the height of the larger jug, in cm.`, a / p * q, `Height ratio = ${p} : ${q}, so the larger jug is ${a} ÷ ${p} × ${q} = ${a / p * q} cm tall.`); },
    r => { const a = r.int(2, 6), m = r.int(2, 9); return N(`Triangles ABC and PQR are similar. AB = ${2 * a} cm, PQ = ${3 * a} cm and BC = ${2 * m} cm. Find QR, in cm.`, 3 * m, `The scale factor is ${3 * a} ÷ ${2 * a} = 1.5. QR = ${2 * m} × 1.5 = ${3 * m} cm.`); },
    r => { const t = r.pick([[5, 12, 13], [3, 4, 5], [8, 15, 17]]), k = r.int(2, 4); return N(`A triangle has sides ${t[0]} cm, ${t[1]} cm and ${t[2]} cm. A similar triangle has a shortest side of ${t[0] * k} cm. Find the perimeter of the similar triangle, in cm.`, (t[0] + t[1] + t[2]) * k, `The scale factor is ${k}. Perimeter = ${t[0] + t[1] + t[2]} × ${k} = ${(t[0] + t[1] + t[2]) * k} cm.`); }
  ], word: [
    r => { const h = r.pick([1.5, 2, 1.2]), s = r.pick([2, 2.5, 3]), S = r.pick([10, 15, 20]); const H = h * S / s; if (Math.abs(H - rd(H, 2)) > 1e-9) return null; return N(`A pole ${h} m tall casts a shadow of ${s} m. At the same time a tree casts a shadow of ${S} m. Find the height of the tree, in m.`, rd(H, 2), `Height ÷ shadow is the same: H = ${h} × ${S} ÷ ${s} = ${rd(H, 2)} m.`); },
    r => { const k = r.pick([100, 200, 250, 500]), L = r.int(2, 9); return N(`A model of a building is built to a scale of 1 : ${k}. The model is ${L * 2} cm tall. Find the height of the real building, in m.`, L * 2 * k / 100, `Real height = ${L * 2} × ${k} cm = ${L * 2 * k} cm = ${L * 2 * k / 100} m.`); },
    r => { const a = r.int(2, 5), k = r.int(2, 4); return N(`A photo measures ${a * 5} cm by ${a * 7} cm. It is enlarged so that the shorter side becomes ${a * 5 * k} cm. Find the area of the enlarged photo, in cm².`, a * 5 * k * a * 7 * k, `The enlarged photo is ${a * 5 * k} cm by ${a * 7 * k} cm, so its area is ${a * 5 * k * a * 7 * k} cm².`); },
    r => { const k = r.pick([2, 3, 4]), V = r.int(3, 9) * 5; return N(`A small tin of paint holds ${V} litres. A similar tin has all lengths ${k} times as long. How many litres does the larger tin hold?`, V * k ** 3, `Volume scale factor = ${k}³ = ${k ** 3}. Capacity = ${V} × ${k ** 3} = ${V * k ** 3} litres.`); },
    r => { const k = r.pick([2, 3, 5]), A = r.int(2, 6) * 4; return N(`A small flag has an area of ${A} cm². A similar flag has all lengths ${k} times as long. Find its area, in cm².`, A * k * k, `Area scale factor = ${k}² = ${k * k}. Area = ${A} × ${k * k} = ${A * k * k} cm².`); }
  ]});

  /* ---- Constructions and scale drawings ---- */
  gyms.push({id: 'G2.3.congruence-and-similarity.2', plain: [
    r => { const k = r.pick([100, 200, 250, 500]), d = r.int(2, 9); return N(`A scale drawing has a scale of 1 : ${k}. A length of ${d} cm on the drawing represents what length in the real object, in m?`, d * k / 100, `${d} × ${k} = ${d * k} cm = ${d * k / 100} m.`); },
    r => { const k = r.pick([100, 200, 500]), d = r.int(2, 9); return N(`A scale drawing has a scale of 1 : ${k}. A real length of ${d * k / 100} m is shown as how many cm on the drawing?`, d, `${d * k / 100} m = ${d * k} cm. On the drawing: ${d * k} ÷ ${k} = ${d} cm.`); },
    r => { const k = r.pick([50, 100]), a = r.int(3, 8), b = r.int(2, a - 1); return N(`A room is ${a * k / 100} m by ${b * k / 100} m. It is drawn at a scale of 1 : ${k}. Find the area of the room on the drawing, in cm².`, a * b, `The drawing is ${a} cm by ${b} cm, so its area is ${a * b} cm².`); },
    r => { const m = r.pick([5, 10, 20]), d = r.pick([3.5, 4.5, 6.5, 7.2, 8.5]); return N(`A scale drawing uses 1 cm to represent ${m} m. A path measures ${d} cm on the drawing. Find the actual length of the path, in m.`, rd(d * m, 2), `${d} × ${m} = ${rd(d * m, 2)} m.`); },
    r => { const m = r.pick([10, 20, 25]); return N(`A triangular plot is drawn with sides 3 cm, 4 cm and 5 cm at a scale of 1 cm to ${m} m. Find the actual perimeter of the plot, in m.`, 12 * m, `Perimeter on the drawing = 12 cm. Actual = 12 × ${m} = ${12 * m} m.`); },
    r => { const a = r.int(20, 80) * 2; return N(`A student bisects an angle of ${a}° with a pair of compasses. Find the size of each half, in degrees.`, a / 2, `Each half = ${a} ÷ 2 = ${a / 2}°.`); },
    r => { const k = r.pick([20000, 50000]); return N(`A map has a scale of 1 : ${sp(k)}. How many square kilometres does 1 cm² on the map represent?`, rd((k / 100000) ** 2, 4), `1 cm represents ${k / 100000} km, so 1 cm² represents ${k / 100000}² = ${rd((k / 100000) ** 2, 4)} km².`); },
    r => { const k = r.pick([10, 12, 15, 20]), h = r.pick([150, 180, 120, 160]); return N(`A person is ${h} cm tall. A scale model is made at a scale of 1 : ${k}. Find the height of the model, in cm.`, rd(h / k, 2), `${h} ÷ ${k} = ${rd(h / k, 2)} cm.`); },
    r => { const rr = r.pick([7, 14, 21]); return N(`Find the circumference of the locus of points ${rr} cm from a fixed point P. Take π = 22/7. Give your answer in cm.`, 2 * 22 / 7 * rr, `The locus is a circle of radius ${rr} cm. Circumference = 2 × 22/7 × ${rr} = ${2 * 22 / 7 * rr} cm.`); },
    r => { const d = r.int(3, 12) * 2; return N(`A and B are ${d} cm apart. Points equidistant from A and B lie on the perpendicular bisector of AB. How far is the point where the bisector crosses AB from A, in cm?`, d / 2, `The bisector crosses AB at its midpoint: ${d} ÷ 2 = ${d / 2} cm from A.`); }
  ], word: [
    r => { const k = r.pick([100, 200, 250]), a = r.int(2, 6), b = r.int(2, 5); return N(`A garden is ${a * k / 100} m long and ${b * k / 100} m wide. On a drawing with scale 1 : ${k}, how long is the garden, in cm?`, a, `${a * k / 100} m = ${a * k} cm. On the drawing: ${a * k} ÷ ${k} = ${a} cm.`); },
    r => { const m = r.pick([2, 5, 10]), d = r.int(3, 12); return N(`A boat's course is drawn on a chart where 1 cm represents ${m} km. The course is ${d} cm long. Find the actual distance, in km.`, d * m, `${d} × ${m} = ${d * m} km.`); },
    r => { const k = r.pick([2000, 5000, 10000]), d = r.int(3, 9); return N(`On a treasure map with scale 1 : ${sp(k)}, the treasure is ${d} cm from the start. How many metres is that on the ground?`, d * k / 100, `${d} × ${sp(k)} cm = ${sp(d * k)} cm = ${d * k / 100} m.`); },
    r => { const a = r.pick([4.5, 3.5, 5.5]), b = r.pick([3, 2.5, 4]); return N(`On a floor plan with scale 1 : 100, a bedroom is ${a} cm by ${b} cm. Find the actual area of the bedroom, in m².`, rd(a * b, 2), `The room is ${a} m by ${b} m, so its area is ${rd(a * b, 2)} m².`); },
    r => { const m = r.pick([10, 20]); return N(`A triangular field is drawn to scale with sides 3 cm, 4 cm and 5 cm (a right-angled triangle) where 1 cm represents ${m} m. Find the actual area of the field, in m².`, 6 * m * m, `The legs are ${3 * m} m and ${4 * m} m. Area = ½ × ${3 * m} × ${4 * m} = ${6 * m * m} m².`); }
  ]});

  /* ---- Coordinate geometry ---- */
  gyms.push({id: 'G2.3.coordinate-geometry.1', plain: [
    r => { const x1 = r.int(-4, 3), y1 = r.int(-4, 5), m = r.pick([-3, -2, -1, 1, 2, 3, 4]), dx = r.int(1, 4); return N(`Find the gradient of the line through $A(${x1}, ${y1})$ and $B(${x1 + dx}, ${y1 + m * dx})$.`, m, `Gradient = (${y1 + m * dx} − ${y1}) ÷ (${x1 + dx} − ${x1}) = ${m * dx} ÷ ${dx} = ${m}.`); },
    r => { const x1 = r.int(-6, 4) * 2, x2 = r.int(-3, 8) * 2, y1 = r.int(-6, 6) * 2, y2 = r.int(-3, 8) * 2; return N(`Find the $x$-coordinate of the midpoint of $A(${x1}, ${y1})$ and $B(${x2}, ${y2})$.`, (x1 + x2) / 2, `Midpoint x = (${x1} + ${x2}) ÷ 2 = ${(x1 + x2) / 2}.`); },
    r => { const x1 = r.int(-6, 4) * 2, x2 = r.int(-3, 8) * 2, y1 = r.int(-6, 6) * 2, y2 = r.int(-3, 8) * 2; return N(`Find the $y$-coordinate of the midpoint of $A(${x1}, ${y1})$ and $B(${x2}, ${y2})$.`, (y1 + y2) / 2, `Midpoint y = (${y1} + ${y2}) ÷ 2 = ${(y1 + y2) / 2}.`); },
    r => { const t = r.pick(TRI), x1 = r.int(-3, 3), y1 = r.int(-3, 3); return N(`Find the distance between $A(${x1}, ${y1})$ and $B(${x1 + t[0]}, ${y1 + t[1]})$.`, t[2], `Distance² = ${t[0]}² + ${t[1]}² = ${t[2] ** 2}, so the distance is ${t[2]}.`); },
    r => { const m = r.pick([-3, -2, 2, 3, 4]), p = r.int(1, 5), q = r.int(-6, 8); return N(`A line with gradient ${m} passes through $(${p}, ${q})$. Find its $y$-intercept.`, q - m * p, `y = ${m}x + c. ${q} = ${m}(${p}) + c, so c = ${q - m * p}.`); },
    r => { const m = r.pick([2, 3, 4, 5]), c1 = r.int(1, 6), p = r.int(1, 5), q = r.int(5, 20); return N(`The line $y = ${m}x ${sgn(c1)}$ is parallel to line $l$, which passes through $(${p}, ${q})$. Find the $y$-intercept of $l$.`, q - m * p, `Parallel lines have the same gradient ${m}. ${q} = ${m}(${p}) + c, so c = ${q - m * p}.`); },
    r => { const m = r.pick([2, 4, 5, -2, -4, -5, 10]); return N(`A line has gradient ${m}. Find the gradient of a line perpendicular to it.`, rd(-1 / m, 4), `Perpendicular gradients multiply to −1, so the gradient is −1/${m} = ${rd(-1 / m, 4)}.`); },
    r => { const a = r.int(3, 10), b = r.int(2, 9); return N(`Triangle OAB has vertices $O(0, 0)$, $A(${a * 2}, 0)$ and $B(0, ${b * 2})$. Find its area, in square units.`, 2 * a * b, `Area = ½ × ${a * 2} × ${b * 2} = ${2 * a * b}.`); },
    r => { const m = r.pick([-2, -1, 2, 3]), c = r.int(-5, 6), x = r.int(-3, 5); return N(`The point $(${x}, k)$ lies on the line $y = ${m}x ${sgn(c)}$. Find $k$.`, m * x + c, `k = ${m}(${x}) ${sgn(c)} = ${m * x + c}.`); },
    r => { const m = r.pick([2, 3, 4, -2, -3]), p = r.int(1, 5), q = r.int(-4, 4), x0 = r.int(-3, 4); return N(`A line with gradient ${m} passes through $(${p}, ${m * (p - x0) + 0})$. Find where it crosses the $x$-axis: give the $x$-coordinate.`, x0 + 0, `y = ${m}(x − ${x0}), which is zero at x = ${x0}.`); }
  ], word: [
    r => { const t = r.pick(TRI), k = r.int(1, 2); return N(`On a grid with 1 unit = 1 km, a town A is at $(1, 2)$ and a town B is at $(${1 + t[0] * k}, ${2 + t[1] * k})$. Find the straight-line distance between them, in km.`, t[2] * k, `Distance² = ${t[0] * k}² + ${t[1] * k}² = ${(t[2] * k) ** 2}, so the distance is ${t[2] * k} km.`); },
    r => { const x1 = r.int(1, 6) * 2, x2 = r.int(5, 12) * 2, y1 = r.int(1, 6) * 2, y2 = r.int(5, 12) * 2; return N(`Two points on a map have coordinates $(${x1}, ${y1})$ and $(${x2}, ${y2})$. A shop is placed at their midpoint. Find the $x$-coordinate of the shop.`, (x1 + x2) / 2, `(${x1} + ${x2}) ÷ 2 = ${(x1 + x2) / 2}.`); },
    r => { const m = r.int(2, 6), c = r.int(10, 40), x = r.int(3, 9); return N(`A plumber charges $y = ${m * 10}x + ${c}$ dollars for a job lasting $x$ hours. Find the charge for ${x} hours, in dollars.`, m * 10 * x + c, `y = ${m * 10}(${x}) + ${c} = ${m * 10 * x + c} dollars.`); },
    r => { const a = r.int(2, 9), b = r.int(2, 9); return N(`A field has corners at $(0, 0)$, $(${a * 10}, 0)$ and $(0, ${b * 10})$ (units in metres). Find the area of the triangular field, in m².`, 50 * a * b, `Area = ½ × ${a * 10} × ${b * 10} = ${50 * a * b} m².`); },
  ]});

  return gyms;
};
