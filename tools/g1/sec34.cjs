/* G1 (Normal Technical) Sec 3 and Sec 4 generators for the gyms that did not have a bank yet: Sec 3 Ch1 Indices and Standard
   Form (zero and negative indices, standard form), Ch2 Map Scales, Ch3 Algebraic Expansion, Fractions and the nth Term,
   Ch5 Arc Lengths and Sector Areas, Ch6 Pyramids, Cones and Spheres, Ch7 Cumulative Frequency, Ch8 Graphs of Linear Equations,
   Ch9 Simultaneous Linear Equations; Sec 4 Ch2 Graphs of Quadratic Functions, Ch4 Trigonometry.
   Sec 3 and Sec 4 banks are 20 typed answers (15 plain + 5 word problems). The scope follows the TLG G1 Book 3/4 chapters and the
   G1 worksheets in the Shinglee folder. Every answer is computed from the question's own numbers and rounded exactly as the
   question says; circles use pi = 22/7 with radii that are multiples of 7. */
'use strict';
module.exports = function(H){
  const {N, gcd, sp} = H;
  const rd = (v, d) => +v.toFixed(d);
  const sgn = n => n < 0 ? `- ${-n}` : `+ ${n}`;
  const D = Math.PI / 180, sin = d => Math.sin(d * D), cos = d => Math.cos(d * D), tan = d => Math.tan(d * D), asin = v => Math.asin(v) / D, atan = v => Math.atan(v) / D;
  const gyms = [];

  /* ---- Zero and negative indices ---- */
  gyms.push({id: 'G1.3.indices-and-standard-form.2', plain: [
    r => { const b = r.int(2, 9); return N(`Evaluate $${b}^0$.`, 1, `Any non-zero number to the power 0 is 1.`); },
    r => { const [b, n] = r.pick([[2, 1], [2, 2], [2, 3], [2, 4], [4, 1], [4, 2], [5, 1], [5, 2], [5, 3], [10, 1], [10, 2], [10, 3]]); return N(`Evaluate $${b}^{-${n}}$ as a decimal.`, rd(1 / b ** n, 4), `${b}^(−${n}) = 1 ÷ ${b}^${n} = 1 ÷ ${b ** n} = ${rd(1 / b ** n, 4)}.`); },
    r => { const a = r.int(2, 5), m = r.int(4, 8), n = r.int(1, 3); return N(`Evaluate $${a}^{${m}} \\div ${a}^{${m - n}}$.`, a ** n, `Subtract the indices: ${a}^${n} = ${a ** n}.`); },
    r => { const a = r.int(2, 4), m = r.int(4, 7), n = r.int(1, 3); return N(`Evaluate $${a}^{${m}} \\times ${a}^{-${n}}$.`, a ** (m - n), `Add the indices: ${m} + (−${n}) = ${m - n}, so ${a}^${m - n} = ${a ** (m - n)}.`); },
    r => { const a = r.int(3, 9), b = r.int(2, 5); return N(`Evaluate $${a}^0 + ${b}^2$.`, 1 + b * b, `${a}⁰ = 1 and ${b}² = ${b * b}, so the total is ${1 + b * b}.`); },
    r => { const n = r.int(1, 4); return N(`Write $\\dfrac{1}{10^{${n}}}$ as $10^{k}$. Find $k$.`, -n, `1/10^${n} = 10^(−${n}), so k = ${-n}.`); },
    r => { const b = r.pick([2, 3, 5]), n = r.int(2, 5); return N(`Solve $${b}^x = ${b ** n}$.`, n, `${b ** n} = ${b}^${n}, so x = ${n}.`); },
    r => { const n = r.int(1, 3); return N(`Solve $10^x = ${rd(10 ** -n, 4)}$.`, -n, `${rd(10 ** -n, 4)} = 10^(−${n}), so x = ${-n}.`); },
    r => { const k = r.int(2, 4); return N(`Evaluate $\\left(\\dfrac{1}{${k}}\\right)^{-2}$.`, k * k, `(1/${k})^(−2) = ${k}² = ${k * k}.`); }
  ], word: [
    r => { const n = r.int(2, 4); return N(`A grain of sand has a mass of $10^{-${n}}$ grams. Write this mass as a decimal number of grams.`, rd(10 ** -n, 4), `10^(−${n}) = ${rd(10 ** -n, 4)}.`); },
    r => { const k = r.int(2, 4); return N(`A sheet of paper is $2^{-${k}}$ cm thick. Write the thickness as a decimal number of cm.`, rd(2 ** -k, 4), `2^(−${k}) = 1 ÷ ${2 ** k} = ${rd(2 ** -k, 4)} cm.`); },
    r => { const a = r.int(2, 4), m = r.int(5, 8), n = r.int(2, 4); return N(`The number of bacteria in a dish is $${a}^{${m}} \\div ${a}^{${n}}$ thousand. Find this number, in thousands.`, a ** (m - n), `${a}^(${m} − ${n}) = ${a}^${m - n} = ${a ** (m - n)}.`); },
    r => { const n = r.int(1, 3); return N(`A pencil lead is $5^{-${n}}$ cm wide. Find its width as a decimal, in cm.`, rd(5 ** -n, 4), `5^(−${n}) = 1 ÷ ${5 ** n} = ${rd(5 ** -n, 4)}.`); }
  ]});

  /* ---- Standard form ---- */
  gyms.push({id: 'G1.3.indices-and-standard-form.3', plain: [
    r => { const m = r.int(11, 99) / 10, n = r.int(2, 5); return N(`Write $${m} \\times 10^{${n}}$ as an ordinary number.`, rd(m * 10 ** n, 2), `${m} × ${10 ** n} = ${rd(m * 10 ** n, 2)}.`); },
    r => { const d = r.int(2, 9), k = r.int(2, 4); return N(`$0.${'0'.repeat(k - 1)}${d} = ${d} \\times 10^{n}$. Find $n$.`, -k, `0.${'0'.repeat(k - 1)}${d} = ${d} × 10^(−${k}), so n = ${-k}.`); },
    r => { const d = r.int(2, 9), k = r.int(3, 6); return N(`$${d}${'0'.repeat(k)} = ${d} \\times 10^{n}$. Find $n$.`, k, `${d}${'0'.repeat(k)} = ${d} × 10^${k}, so n = ${k}.`); },
    r => { const a = r.int(2, 4), b = r.int(2, 2), p = r.int(2, 5), q = r.int(2, 5); return N(`Write $(${a} \\times 10^{${p}}) \\times (${b} \\times 10^{${q}})$ in the form $${a * b} \\times 10^{n}$. Find $n$.`, p + q, `10^${p} × 10^${q} = 10^${p + q}, so n = ${p + q}.`); },
    r => { const a = r.int(2, 4), p = r.int(5, 9), q = r.int(2, 4); return N(`Write $(${a * 2} \\times 10^{${p}}) \\div (2 \\times 10^{${q}})$ in the form $${a} \\times 10^{n}$. Find $n$.`, p - q, `10^${p} ÷ 10^${q} = 10^${p - q}, so n = ${p - q}.`); },
    r => { const a = r.int(2, 9), n = r.int(3, 6); return N(`How many zeros are there in the ordinary number $${a} \\times 10^{${n}}$?`, n, `${a} × 10^${n} = ${a}${'0'.repeat(n)}, which has ${n} zeros.`); },
    r => { const a = r.int(11, 99) / 10, k = r.int(2, 3); return N(`Write $${a} \\times 10^{-${k}}$ as an ordinary number.`, rd(a * 10 ** -k, 6), `${a} × 10^(−${k}) = ${rd(a * 10 ** -k, 6)}.`); },
    r => { const d = r.int(2, 9), k = r.int(2, 5); return N(`The number ${d * 10 ** k} is written as $${d} \\times 10^{n}$. Find $n$.`, k, `${d * 10 ** k} = ${d} × 10^${k}.`); }
  ], word: [
    r => { const k = r.pick([1.5, 3, 4.5, 6]), e = r.pick([10, 11]); return N(`Light travels at $3 \\times 10^8$ m/s. How many seconds does it take to travel $${k} \\times 10^{${e}}$ m?`, rd(k * 10 ** e / 3e8, 4), `Time = ${k * 10 ** e} ÷ ${3e8} = ${rd(k * 10 ** e / 3e8, 4)} s.`); },
    r => { const a = r.int(2, 9), n = r.int(3, 7); return N(`The distance from the Earth to a star is ${a} × 10^${n} km. Write this distance as an ordinary number of km.`, a * 10 ** n, `${a} × 10^${n} = ${a * 10 ** n}.`); },
    r => { const a = r.int(2, 9), k = r.int(3, 4); return N(`The width of an atom is $${a} \\times 10^{-${k}}$ mm. Write this width as a decimal, in mm.`, rd(a * 10 ** -k, 6), `${a} × 10^(−${k}) = ${rd(a * 10 ** -k, 6)}.`); },
    r => { const a = r.int(2, 6), b = r.int(2, 4), p = r.int(2, 4), q = r.int(2, 4); return N(`A factory makes $${a} \\times 10^{${p}}$ screws each day for $${b} \\times 10^{${q}}$ days. Write the total in the form $${a * b} \\times 10^{n}$. Find $n$.`, p + q, `The total is ${a * b} × 10^${p + q}, so n = ${p + q}.`); }
  ]});

  /* ---- Map scales ---- */
  gyms.push({id: 'G1.3.map-scales.1', plain: [
    r => { const d = r.int(2, 9), s = r.pick([10000, 20000, 25000, 50000, 100000]); return N(`A map has a scale of 1 : ${sp(s)}. Two towns are ${d} cm apart on the map. Find the actual distance, in km.`, d * s / 100000, `${d} × ${sp(s)} cm = ${sp(d * s)} cm = ${d * s / 100000} km.`); },
    r => { const k = r.int(2, 8), s = r.pick([25000, 50000, 100000]); return N(`A map has a scale of 1 : ${sp(s)}. A road is ${k * s / 100000 * 2} km long. Find its length on the map, in cm.`, k * 2, `${k * s / 100000 * 2} km = ${sp(k * s / 100000 * 2 * 100000)} cm. On the map: ${k * 2} cm.`); },
    r => { const k = r.pick([2, 5, 10]), d = r.int(2, 9) + 0.5; return N(`A map scale is 1 cm : ${k} km. A lake is ${d} cm long on the map. Find its actual length, in km.`, d * k, `${d} × ${k} = ${d * k} km.`); },
    r => { const a = r.int(2, 6), s = r.pick([20000, 25000, 50000]); return N(`On a map, ${a} cm represents ${a * s / 100000} km. The scale is 1 : n. Find $n$.`, s, `${a * s / 100000} km = ${a * s} cm, so 1 cm represents ${s} cm and n = ${s}.`); },
    r => { const s = r.pick([50000, 100000]), d = r.int(2, 8); return N(`A map has a scale of 1 : ${sp(s)}. Find the actual distance, in metres, represented by ${d} cm on the map.`, d * s / 100, `${d} × ${sp(s)} cm = ${sp(d * s)} cm = ${d * s / 100} m.`); },
    r => { const k = r.pick([100, 200, 500]), d = r.int(2, 9); return N(`A scale drawing has a scale of 1 : ${k}. A length of ${d} cm on the drawing represents what length in real life, in m?`, d * k / 100, `${d} × ${k} = ${d * k} cm = ${d * k / 100} m.`); },
    r => { const k = r.pick([100, 200, 500]), d = r.int(2, 9); return N(`A scale drawing has a scale of 1 : ${k}. A real length of ${d * k / 100} m is shown as how many cm on the drawing?`, d, `${d * k / 100} m = ${d * k} cm. On the drawing: ${d * k} ÷ ${k} = ${d} cm.`); },
    r => { const k = r.pick([20000, 50000]); return N(`A map has a scale of 1 : ${sp(k)}. How many square kilometres does 1 cm² on the map represent?`, rd((k / 100000) ** 2, 4), `1 cm represents ${k / 100000} km, so 1 cm² represents ${k / 100000}² = ${rd((k / 100000) ** 2, 4)} km².`); }
  ], word: [
    r => { const d = r.int(3, 9), s = r.pick([20000, 25000, 50000]); return N(`On a map with scale 1 : ${sp(s)}, the distance from a school to a park is ${d} cm. Find the actual distance, in km.`, d * s / 100000, `${d} × ${sp(s)} cm = ${d * s / 100000} km.`); },
    r => { const k = r.pick([2, 5]), d = r.int(5, 12); return N(`A hiking map has a scale of 1 cm : ${k} km. A trail is ${d} cm long on the map. How many km is the actual trail?`, d * k, `${d} × ${k} = ${d * k} km.`); },
    r => { const k = r.pick([100, 200, 250]), a = r.int(2, 6); return N(`A garden is ${a * k / 100} m long. On a drawing with scale 1 : ${k}, how long is the garden, in cm?`, a, `${a * k / 100} m = ${a * k} cm. On the drawing: ${a} cm.`); },
    r => { const k = r.pick([2000, 5000, 10000]), d = r.int(3, 9); return N(`On a treasure map with scale 1 : ${sp(k)}, the treasure is ${d} cm from the start. How many metres is that on the ground?`, d * k / 100, `${d} × ${sp(k)} cm = ${d * k / 100} m.`); }
  ]});

  /* ---- Expansion, factorisation and the nth term ---- */
  gyms.push({id: 'G1.3.algebraic-expansion-fractions-and-expression-for-the-nth-term-of-a-number-sequence.1', plain: [
    r => { const a = r.int(1, 9), b = r.int(1, 9); return N(`$(x + ${a})(x + ${b})$ is expanded as $x^2 + px + q$. Find $p$.`, a + b, `(x + ${a})(x + ${b}) = x² + ${a + b}x + ${a * b}, so p = ${a + b}.`); },
    r => { const a = r.int(2, 9), b = r.int(2, 9); return N(`$(x + ${a})(x + ${b})$ is expanded as $x^2 + px + q$. Find $q$.`, a * b, `The constant term is ${a} × ${b} = ${a * b}.`); },
    r => { const a = r.int(2, 9), b = r.int(1, 7); return N(`$(x - ${a})(x + ${b})$ is expanded as $x^2 + px + q$. Find $p$.`, b - a, `(x − ${a})(x + ${b}) = x² + ${b - a}x − ${a * b}, so p = ${b - a}.`); },
    r => { const k = r.int(2, 9), a = r.int(2, 5), b = r.int(1, 7); if (gcd(a, b) !== 1) return null; return N(`Factorise $${k * a}x + ${k * b}$ completely as $k(${a}x + ${b})$. Find $k$.`, k, `${k * a} = ${k} × ${a} and ${k * b} = ${k} × ${b}, so k = ${k}.`); },
    r => { const a = r.int(2, 8), b = r.int(1, 9), k = r.int(2, 5); return N(`The $n$th term of a sequence is $${a}n + ${b}$. Find the ${k * 5}th term.`, a * k * 5 + b, `${a} × ${k * 5} + ${b} = ${a * k * 5 + b}.`); },
    r => { const a = r.int(2, 8), b = r.int(1, 9); return N(`A sequence goes ${a + b}, ${2 * a + b}, ${3 * a + b}, ${4 * a + b}, … The $n$th term is $an + b$. Find $a + b$.`, a + b, `The common difference is ${a}, so a = ${a}. The first term is ${a + b}, so b = ${b}. a + b = ${a + b}.`); },
    r => { const a = r.int(2, 6), b = r.int(1, 9), n = r.int(10, 20), t = a * n + b; return N(`The $n$th term of a sequence is $${a}n + ${b}$. Which term is equal to ${t}?`, n, `${a}n + ${b} = ${t}, so ${a}n = ${t - b} and n = ${n}.`); },
    r => { const a = r.int(2, 9), x = r.int(2, 9); return N(`Simplify $\\dfrac{x^2 + ${a}x}{x}$ and find its value when $x = ${x}$.`, x + a, `x² + ${a}x = x(x + ${a}), so the fraction simplifies to x + ${a}. When x = ${x}: ${x + a}.`); },
    r => { const a = r.int(2, 5), b = r.int(1, 6), x = r.int(2, 8); return N(`Expand $${a}(x + ${b})$ and find its value when $x = ${x}$.`, a * (x + b), `${a}x + ${a * b}. When x = ${x}: ${a * x} + ${a * b} = ${a * (x + b)}.`); }
  ], word: [
    r => { const a = r.int(2, 6), b = r.int(1, 5), x = r.int(2, 8); return N(`A rectangle has length $(x + ${a})$ m and width $(x + ${b})$ m. Find its area when $x = ${x}$, in m².`, (x + a) * (x + b), `(${x} + ${a})(${x} + ${b}) = ${x + a} × ${x + b} = ${(x + a) * (x + b)} m².`); },
    r => { const k = r.int(3, 9), a = r.int(2, 5); return N(`A pattern uses $${a}n + 1$ matchsticks to make $n$ shapes. How many matchsticks are needed for ${k + 5} shapes?`, a * (k + 5) + 1, `${a} × ${k + 5} + 1 = ${a * (k + 5) + 1}.`); },
    r => { const a = r.int(2, 6), s = r.int(2, 8); return N(`A square has side $(x + ${s})$ cm. Find its area when $x = ${a}$, in cm².`, (a + s) ** 2, `(${a} + ${s})² = ${(a + s) ** 2} cm².`); },
    r => { const a = r.int(2, 5), b = r.int(3, 9), t = r.int(6, 14); return N(`Mei saves \\$${b} in the first week and \\$${a} more each following week, so her savings in week $n$ follow $${a}n + ${b - a}$. How much does she save in week ${t}, in dollars?`, a * t + b - a, `${a} × ${t} + ${b - a} = ${a * t + b - a}.`); }
  ]});

  /* ---- Arc lengths and sector areas ---- */
  gyms.push({id: 'G1.3.arc-lengths-and-sector-areas.1', plain: [
    r => { const rr = r.pick([7, 14, 21]), t = r.pick([90, 180, 270]); return N(`Find the length of an arc of a circle of radius ${rr} cm that subtends an angle of ${t}° at the centre, in cm. Take π = 22/7.`, t / 360 * 2 * 22 / 7 * rr, `Arc = ${t}/360 × 2 × 22/7 × ${rr} = ${t / 360 * 2 * 22 / 7 * rr} cm.`); },
    r => { const rr = r.pick([7, 14, 21]); return N(`Find the circumference of a circle of radius ${rr} cm, in cm. Take π = 22/7.`, 2 * 22 / 7 * rr, `Circumference = 2 × 22/7 × ${rr} = ${2 * 22 / 7 * rr} cm.`); },
    r => { const rr = r.pick([7, 14, 21]), t = r.pick([90, 180, 270]); return N(`Find the area of a sector of radius ${rr} cm and angle ${t}°, in cm². Take π = 22/7.`, t / 360 * 22 / 7 * rr * rr, `Area = ${t}/360 × 22/7 × ${rr}² = ${t / 360 * 22 / 7 * rr * rr} cm².`); },
    r => { const rr = r.pick([7, 14, 21]); return N(`Find the area of a circle of radius ${rr} cm, in cm². Take π = 22/7.`, 22 / 7 * rr * rr, `Area = 22/7 × ${rr}² = ${22 / 7 * rr * rr} cm².`); },
    r => { const rr = r.pick([7, 14, 21]), t = r.pick([90, 180]); return N(`Find the perimeter of a sector of radius ${rr} cm and angle ${t}°, in cm. Take π = 22/7.`, t / 360 * 2 * 22 / 7 * rr + 2 * rr, `Arc = ${t / 360 * 2 * 22 / 7 * rr}. Perimeter = arc + 2 × ${rr} = ${t / 360 * 2 * 22 / 7 * rr + 2 * rr} cm.`); },
    r => { const rr = r.pick([7, 14, 21]), t = r.pick([90, 180, 270]); return N(`An arc of length ${t / 360 * 2 * 22 / 7 * rr} cm is cut from a circle of radius ${rr} cm. Find the angle at the centre, in degrees. Take π = 22/7.`, t, `${t / 360 * 2 * 22 / 7 * rr} = θ/360 × 2 × 22/7 × ${rr}, so θ = ${t}°.`); },
    r => { const rr = r.pick([7, 14]); return N(`Find the length of a semicircular arc of radius ${rr} cm, in cm. Take π = 22/7.`, 22 / 7 * rr, `Arc = ½ × 2 × 22/7 × ${rr} = ${22 / 7 * rr} cm.`); },
    r => { const rr = r.pick([7, 14, 21]), t = r.pick([90, 180]); return N(`A sector has an area of ${t / 360 * 22 / 7 * rr * rr} cm² and angle ${t}°. Find the radius, in cm. Take π = 22/7.`, rr, `${t / 360 * 22 / 7 * rr * rr} = ${t}/360 × 22/7 × r², so r = ${rr} cm.`); }
  ], word: [
    r => { const rr = r.pick([7, 14, 21]), m = r.pick([15, 30, 45]); return N(`The minute hand of a clock is ${rr} cm long. Find the distance moved by its tip in ${m} minutes. Take π = 22/7 and give your answer in cm correct to 2 decimal places.`, rd(m / 60 * 2 * 22 / 7 * rr, 2), `In ${m} minutes the tip travels ${m}/60 of the circumference: ${rd(m / 60 * 2 * 22 / 7 * rr, 2)} cm.`); },
    r => { const rr = r.pick([14, 21]), t = r.pick([90, 180, 270]); return N(`A garden sprinkler waters a sector of radius ${rr} m through an angle of ${t}°. Find the area watered, in m². Take π = 22/7.`, t / 360 * 22 / 7 * rr * rr, `Area = ${t}/360 × 22/7 × ${rr}² = ${t / 360 * 22 / 7 * rr * rr} m².`); },
    r => { const rr = r.pick([35, 70, 21]), n = r.int(10, 40); return N(`A bicycle wheel has a radius of ${rr} cm. How many metres does the bicycle travel when the wheel makes ${n} complete turns? Take π = 22/7.`, n * 2 * 22 / 7 * rr / 100, `Each turn = ${2 * 22 / 7 * rr} cm. ${n} turns = ${n * 2 * 22 / 7 * rr / 100} m.`); }
  ]});

  /* ---- Pyramids, cones and spheres ---- */
  const CONE = [[7, 24, 25], [21, 28, 35], [14, 48, 50]];
  gyms.push({id: 'G1.3.pyramids-cones-and-spheres.1', plain: [
    r => { const b = r.int(2, 8) * 3, h = r.int(3, 12); return N(`A square-based pyramid has a base of side ${b} cm and a height of ${h} cm. Find its volume, in cm³.`, b * b * h / 3, `Volume = ⅓ × ${b * b} × ${h} = ${b * b * h / 3} cm³.`); },
    r => { const l = r.int(4, 12), w = r.int(3, 9), h = r.int(1, 6) * 3; return N(`A pyramid has a rectangular base ${l} cm by ${w} cm and a height of ${h} cm. Find its volume, in cm³.`, l * w * h / 3, `Volume = ⅓ × ${l} × ${w} × ${h} = ${l * w * h / 3} cm³.`); },
    r => { const t = r.pick(CONE), h = t[1]; return N(`A cone has a base radius of ${t[0]} cm and a vertical height of ${h} cm. Find its volume, in cm³. Take π = 22/7.`, 22 / 7 * t[0] * t[0] * h / 3, `Volume = ⅓πr²h = ⅓ × 22/7 × ${t[0]}² × ${h} = ${22 / 7 * t[0] * t[0] * h / 3} cm³.`); },
    r => { const t = r.pick(CONE); return N(`A cone has a base radius of ${t[0]} cm and a slant height of ${t[2]} cm. Find its curved surface area, in cm². Take π = 22/7.`, 22 / 7 * t[0] * t[2], `Curved surface area = πrl = 22/7 × ${t[0]} × ${t[2]} = ${22 / 7 * t[0] * t[2]} cm².`); },
    r => { const t = r.pick(CONE); return N(`A cone has a base radius of ${t[0]} cm and a vertical height of ${t[1]} cm. Find its slant height, in cm.`, t[2], `Slant height² = ${t[0]}² + ${t[1]}² = ${t[2] ** 2}, so the slant height is ${t[2]} cm.`); },
    r => { const k = r.pick([7, 14, 21]); return N(`Find the surface area of a sphere of radius ${k} cm, in cm². Take π = 22/7.`, 4 * 22 / 7 * k * k, `Surface area = 4πr² = 4 × 22/7 × ${k}² = ${4 * 22 / 7 * k * k} cm².`); },
    r => { const k = r.pick([21, 10.5]); return N(`Find the volume of a sphere of radius ${k} cm, in cm³. Take π = 22/7.`, 4 / 3 * 22 / 7 * k ** 3, `Volume = 4/3 × 22/7 × ${k}³ = ${4 / 3 * 22 / 7 * k ** 3} cm³.`); },
    r => { const k = r.pick([21, 10.5]); return N(`Find the volume of a hemisphere of radius ${k} cm, in cm³. Take π = 22/7.`, 2 / 3 * 22 / 7 * k ** 3, `Volume = 2/3 × 22/7 × ${k}³ = ${2 / 3 * 22 / 7 * k ** 3} cm³.`); },
    r => { const b = r.int(2, 8) * 3, h = r.int(3, 12), V = b * b * h / 3; return N(`A square-based pyramid has a base of side ${b} cm and a volume of ${V} cm³. Find its height, in cm.`, h, `Height = 3 × ${V} ÷ ${b * b} = ${h} cm.`); }
  ], word: [
    r => { const b = r.int(3, 10) * 3, h = r.int(4, 12); return N(`A tent is a square-based pyramid with a base of side ${b} m and a height of ${h} m. Find the volume of air inside, in m³.`, b * b * h / 3, `Volume = ⅓ × ${b * b} × ${h} = ${b * b * h / 3} m³.`); },
    r => { const t = r.pick(CONE); return N(`An ice-cream cone has a base radius of ${t[0]} cm and a height of ${t[1]} cm. How much ice cream fits exactly in the cone, in cm³? Take π = 22/7.`, 22 / 7 * t[0] * t[0] * t[1] / 3, `Volume = ⅓ × 22/7 × ${t[0]}² × ${t[1]} = ${22 / 7 * t[0] * t[0] * t[1] / 3} cm³.`); },
    r => { const k = r.pick([7, 14, 21]); return N(`A ball has a radius of ${k} cm. Find the area of leather needed to cover its surface, in cm². Take π = 22/7.`, 4 * 22 / 7 * k * k, `Surface area = 4 × 22/7 × ${k}² = ${4 * 22 / 7 * k * k} cm².`); },
    r => { const k = r.pick([21, 10.5]); return N(`A dome is a solid hemisphere of radius ${k} m. Find its volume, in m³. Take π = 22/7.`, 2 / 3 * 22 / 7 * k ** 3, `Volume = 2/3 × 22/7 × ${k}³ = ${2 / 3 * 22 / 7 * k ** 3} m³.`); }
  ]});

  /* ---- Cumulative frequency ---- */
  const cft = r => { const f = [r.int(2, 6), r.int(6, 14), r.int(10, 22), r.int(8, 16), r.int(2, 8)], cf = []; f.reduce((s, x, i) => { cf[i] = s + x; return s + x; }, 0); return {ub: [10, 20, 30, 40, 50], f, cf}; };
  const cftext = t => t.ub.map((u, i) => `≤ ${u}: ${t.cf[i]}`).join('; ');
  gyms.push({id: 'G1.3.cumulative-frequency.1', plain: [
    r => { const t = cft(r); return N(`A cumulative frequency table for marks is: ${cftext(t)} (each entry is the number of students with marks up to and including that mark). How many students are there in total?`, t.cf[4], `The last cumulative frequency is the total: ${t.cf[4]}.`); },
    r => { const t = cft(r); return N(`A cumulative frequency table for marks is: ${cftext(t)}. How many students scored more than 20 marks but at most 40 marks?`, t.cf[3] - t.cf[1], `${t.cf[3]} − ${t.cf[1]} = ${t.cf[3] - t.cf[1]}.`); },
    r => { const t = cft(r); return N(`A cumulative frequency table for marks is: ${cftext(t)}. How many students scored more than 30 marks?`, t.cf[4] - t.cf[2], `${t.cf[4]} − ${t.cf[2]} = ${t.cf[4] - t.cf[2]}.`); },
    r => { const n = r.pick([40, 60, 80, 100]); return N(`The scores of ${n} students are shown on a cumulative frequency curve. At what cumulative frequency do you read off the median?`, n / 2, `The median is the middle value: ${n} ÷ 2 = ${n / 2}.`); },
    r => { const n = r.pick([40, 60, 80, 100]); return N(`The scores of ${n} students are shown on a cumulative frequency curve. At what cumulative frequency do you read off the lower quartile?`, n / 4, `The lower quartile is the ¼ point: ${n} ÷ 4 = ${n / 4}.`); },
    r => { const n = r.pick([40, 60, 80, 100]); return N(`The scores of ${n} students are shown on a cumulative frequency curve. At what cumulative frequency do you read off the upper quartile?`, 3 * n / 4, `The upper quartile is the ¾ point: 3 × ${n} ÷ 4 = ${3 * n / 4}.`); },
    r => { const t = cft(r); return N(`A frequency table has class frequencies ${t.f.join(', ')} for the classes 0 – 10, 10 – 20, 20 – 30, 30 – 40 and 40 – 50. What is the cumulative frequency at the end of the 30 – 40 class?`, t.cf[3], `${t.f.slice(0, 4).join(' + ')} = ${t.cf[3]}.`); },
    r => { const n = r.pick([40, 50, 80, 100, 200]), p = r.pick([10, 20, 25, 75, 90]); return N(`A cumulative frequency curve is drawn for ${n} students. How many students have scores below the ${p}th percentile?`, n * p / 100, `${p}% of ${n} = ${n * p / 100}.`); }
  ], word: [
    r => { const t = cft(r); return N(`The times, in minutes, that ${t.cf[4]} customers waited are summarised as: ${t.ub.map((u, i) => `≤ ${u / 10}: ${t.cf[i]}`).join('; ')}. How many customers waited more than 3 minutes?`, t.cf[4] - t.cf[2], `${t.cf[4]} − ${t.cf[2]} = ${t.cf[4] - t.cf[2]}.`); },
    r => { const n = r.pick([60, 80, 100, 120]); return N(`A cumulative frequency curve shows the heights of ${n} students. How many students are shorter than the median height?`, n / 2, `Half of ${n} is ${n / 2}.`); },
    r => { const n = r.pick([80, 100, 200]), p = r.pick([20, 25, 40]); return N(`${n} athletes ran a race. ${p}% of them finished in less than 15 minutes. How many athletes finished in less than 15 minutes?`, n * p / 100, `${p}% of ${n} = ${n * p / 100}.`); }
  ]});

  /* ---- Graphs of linear equations ---- */
  gyms.push({id: 'G1.3.graphs-of-linear-equations.1', plain: [
    r => { const m = r.pick([-3, -2, -1, 1, 2, 3, 4]), x1 = r.int(-3, 3), y1 = r.int(-3, 5), dx = r.int(1, 4); return N(`Find the gradient of the line through $A(${x1}, ${y1})$ and $B(${x1 + dx}, ${y1 + m * dx})$.`, m, `Gradient = ${m * dx} ÷ ${dx} = ${m}.`); },
    r => { const m = r.int(2, 5), c = r.int(-6, 8) || 3; return N(`The equation of a line is $y = ${m}x ${sgn(c)}$. Find the $y$-intercept.`, c, 'The y-intercept is the constant term.'); },
    r => { const m = r.int(2, 5), p = r.int(-6, 6) || 2, c = -m * p; return N(`Find the $x$-intercept of the line $y = ${m}x ${sgn(c)}$.`, p, `Put y = 0: ${m}x ${sgn(c)} = 0, so x = ${p}.`); },
    r => { const a = r.int(2, 6), b = r.int(2, 9); return N(`Find the gradient of the line $${a}x + y = ${b}$.`, -a, `Write it as y = −${a}x + ${b}. The gradient is −${a}.`); },
    r => { const m = r.int(2, 5), p = r.int(1, 5), q = r.int(-4, 10); return N(`A line with gradient ${m} passes through $(${p}, ${q})$. Find its $y$-intercept.`, q - m * p, `y = ${m}x + c. ${q} = ${m}(${p}) + c, so c = ${q - m * p}.`); },
    r => { const m = r.int(2, 5), c = r.int(1, 6), p = r.int(1, 5), q = r.int(5, 20); return N(`The line $y = ${m}x + ${c}$ is parallel to line $l$, which passes through $(${p}, ${q})$. Find the $y$-intercept of $l$.`, q - m * p, `Parallel lines have the same gradient ${m}. ${q} = ${m}(${p}) + c, so c = ${q - m * p}.`); },
    r => { const a = r.pick([2, 3, 4]), b = r.pick([3, 5, 6]), c = a * b * r.int(1, 3); return N(`The line $${a}x + ${b}y = ${c}$ crosses the $x$-axis at $(p, 0)$. Find $p$.`, c / a, `Put y = 0: ${a}x = ${c}, so x = ${c / a}.`); },
    r => { const a = r.pick([2, 3, 4]), b = r.pick([3, 5, 6]), c = a * b * r.int(1, 3); return N(`The line $${a}x + ${b}y = ${c}$ crosses the $y$-axis at $(0, q)$. Find $q$.`, c / b, `Put x = 0: ${b}y = ${c}, so y = ${c / b}.`); },
    r => { const m = r.int(-3, 4) || 2, c = r.int(-5, 6), x = r.int(-3, 5); return N(`The point $(${x}, k)$ lies on the line $y = ${m}x ${sgn(c)}$. Find $k$.`, m * x + c, `k = ${m}(${x}) ${sgn(c)} = ${m * x + c}.`); }
  ], word: [
    r => { const f = r.int(3, 6), p = r.int(2, 3), n = r.int(8, 20); return N(`A taxi fare is \\$${f} plus \\$${p} for each km, so $y = ${p}x + ${f}$ dollars for $x$ km. Find the fare for ${n} km, in dollars.`, p * n + f, `y = ${p}(${n}) + ${f} = ${p * n + f}.`); },
    r => { const v = r.int(3, 8), t = r.int(4, 12); return N(`A distance-time graph is a straight line through the origin and the point $(${t}, ${v * t})$ (distance in metres, time in seconds). Find the speed, in m/s.`, v, `Speed = gradient = ${v * t} ÷ ${t} = ${v} m/s.`); },
    r => { const g = r.int(2, 6), f = r.int(10, 30), n = r.int(3, 9); return N(`A phone plan costs \\$${f} per month plus \\$${g} for each GB of data. This gives the line $y = ${g}x + ${f}$. Find the cost for ${n} GB, in dollars.`, g * n + f, `y = ${g}(${n}) + ${f} = ${g * n + f}.`); }
  ]});

  /* ---- Simultaneous linear equations ---- */
  gyms.push({id: 'G1.3.simultaneous-linear-equations.1', plain: [
    r => { const x = r.int(2, 12), y = r.int(1, x - 1); return N(`Solve $x + y = ${x + y}$ and $x - y = ${x - y}$. Find $x$.`, x, `Add the equations: 2x = ${2 * x}, so x = ${x}.`); },
    r => { const x = r.int(2, 12), y = r.int(1, x - 1); return N(`Solve $x + y = ${x + y}$ and $x - y = ${x - y}$. Find $y$.`, y, `Subtract the equations: 2y = ${2 * y}, so y = ${y}.`); },
    r => { const x = r.int(1, 8), y = r.int(1, 8); return N(`Solve $2x + y = ${2 * x + y}$ and $x + y = ${x + y}$. Find $x$.`, x, `Subtract the second equation from the first: x = ${2 * x + y} − ${x + y} = ${x}.`); },
    r => { const x = r.int(1, 8), y = r.int(1, 8); return N(`Solve $x + 2y = ${x + 2 * y}$ and $x - y = ${x - y}$. Find $y$.`, y, `Subtract the second equation from the first: 3y = ${3 * y}, so y = ${y}.`); },
    r => { const k = r.int(2, 4), x = r.int(2, 9); return N(`Solve $y = ${k}x$ and $x + y = ${(k + 1) * x}$. Find $x$.`, x, `Substitute y = ${k}x: x + ${k}x = ${(k + 1) * x}, so ${k + 1}x = ${(k + 1) * x} and x = ${x}.`); },
    r => { const x = r.int(2, 8), y = r.int(1, 8); return N(`Solve $3x + 2y = ${3 * x + 2 * y}$ and $3x - y = ${3 * x - y}$. Find $y$.`, y, `Subtract the second equation from the first: 3y = ${3 * y}, so y = ${y}.`); },
    r => { const x = r.int(2, 9), y = r.int(2, 9); return N(`Solve $x + y = ${x + y}$ and $x - y = ${x - y}$. Find $xy$.`, x * y, `Adding gives x = ${x}, subtracting gives y = ${y}. xy = ${x * y}.`); },
    r => { const x = r.int(1, 7), y = r.int(1, 7); return N(`Solve $2x + 3y = ${2 * x + 3 * y}$ and $4x - y = ${4 * x - y}$. Find $x + y$.`, x + y, `Multiply the second equation by 3 and add: 14x = ${14 * x}, so x = ${x} and y = ${y}. x + y = ${x + y}.`); }
  ], word: [
    r => { const p = r.int(2, 6), q = r.int(1, 5), n = r.int(1, 3); return N(`${n + 1} pens and 2 rulers cost \\$${(n + 1) * p + 2 * q}. 1 pen and 2 rulers cost \\$${p + 2 * q}. Find the cost of one pen, in dollars.`, p, `Subtract the second statement from the first: ${n} pens cost ${n * p}, so one pen costs ${p}.`); },
    r => { const x = r.int(10, 40), y = r.int(5, x - 1); return N(`The sum of two numbers is ${x + y} and their difference is ${x - y}. Find the larger number.`, x, `Larger = (sum + difference) ÷ 2 = (${x + y} + ${x - y}) ÷ 2 = ${x}.`); },
    r => { const s = r.int(5, 15); return N(`A father is 4 times as old as his son. The sum of their ages is ${5 * s}. How old is the son?`, s, `f = 4s and f + s = ${5 * s}, so 5s = ${5 * s} and s = ${s}.`); },
    r => { const a = r.int(8, 14), c = r.int(3, 7), n = r.int(2, 4); return N(`${n} adult tickets and 3 child tickets cost \\$${n * a + 3 * c}. 1 adult ticket and 3 child tickets cost \\$${a + 3 * c}. Find the price of one adult ticket, in dollars.`, a, `Subtract the second statement from the first: ${n - 1} adult ticket${n > 2 ? 's' : ''} cost ${(n - 1) * a}, so one adult ticket is ${a}.`); }
  ]});

  /* ---- Graphs of quadratic functions (Sec 4) ---- */
  gyms.push({id: 'G1.4.graphs-of-quadratic-functions.1', plain: [
    r => { const a = r.pick([1, 2, 3, -1, -2]), b = r.int(-5, 5), c = r.int(-6, 8), x = r.int(-3, 4); return N(`Find the value of $y$ when $x = ${x}$ on the curve $y = ${a === 1 ? '' : a === -1 ? '-' : a}x^2 ${b === 0 ? '' : (b > 0 ? '+ ' : '- ') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'x'} ${c === 0 ? '' : sgn(c)}$.`, a * x * x + b * x + c, `y = ${a}(${x})² + ${b}(${x}) + ${c} = ${a * x * x + b * x + c}.`); },
    r => { const p = r.int(1, 6), q = r.int(1, 6); return N(`The curve $y = (x - ${p})(x + ${q})$ crosses the $y$-axis at $(0, k)$. Find $k$.`, -p * q, `Put x = 0: y = (−${p})(${q}) = ${-p * q}.`); },
    r => { const p = r.int(1, 7), q = r.int(1, 9); return N(`The curve $y = x^2 - ${2 * p}x + ${p * p + q}$ has a line of symmetry $x = h$. Find $h$.`, p, `The line of symmetry is x = −b/(2a) = ${2 * p}/2 = ${p}.`); },
    r => { const p = r.int(1, 7), q = r.int(1, 9); return N(`Find the minimum value of $y = x^2 - ${2 * p}x + ${p * p + q}$.`, q, `y = (x − ${p})² + ${q}, so the minimum value is ${q}.`); },
    r => { const p = r.int(1, 6), q = r.int(p + 1, 9); return N(`The curve $y = x^2 - ${p + q}x + ${p * q}$ meets the $x$-axis at two points. Find the larger $x$-coordinate.`, q, `y = (x − ${p})(x − ${q}) = 0 gives x = ${p} or x = ${q}. The larger is ${q}.`); },
    r => { const p = r.int(1, 6), q = r.int(1, 12); return N(`Find the maximum value of $y = ${q} - (x - ${p})^2$.`, q, `(x − ${p})² ≥ 0, so the greatest value of y is ${q}.`); },
    r => { const k = r.int(2, 9); return N(`The curve $y = x^2 - ${k * k}$ crosses the $x$-axis. Find the positive $x$-coordinate of a crossing point.`, k, `x² = ${k * k}, so x = ${k} (positive).`); },
    r => { const x = r.int(1, 5), a = r.int(2, 5); return N(`The curve $y = x^2 + ${a}x$ passes through the point $(${x}, k)$. Find $k$.`, x * x + a * x, `k = ${x}² + ${a}(${x}) = ${x * x + a * x}.`); },
    r => { const p = r.int(2, 6), q = r.int(1, 8); return N(`The curve $y = (x - ${p})^2 + ${q}$ has its turning point at $(a, b)$. Find $a + b$.`, p + q, `The turning point is (${p}, ${q}), so a + b = ${p + q}.`); }
  ], word: [
    r => { const v = r.int(10, 30) * 2, t = r.int(2, 4); return N(`A ball is thrown upwards. Its height after $t$ seconds is $h = ${v}t - 5t^2$ metres. Find its height after ${t} seconds, in metres.`, v * t - 5 * t * t, `h = ${v}(${t}) − 5(${t})² = ${v * t - 5 * t * t} m.`); },
    r => { const s = r.int(2, 9); return N(`A farmer has ${4 * s} m of fencing for a rectangular pen. The area for a width of $x$ m is $A = x(${2 * s} - x)$ square metres. Find the greatest possible area, in m².`, s * s, `The maximum of x(${2 * s} − x) is at x = ${s}, giving A = ${s * s} m².`); },
    r => { const p = r.int(4, 10), x = r.int(1, p - 1); return N(`An arch is modelled by $y = ${p}x - x^2$ where $x$ and $y$ are in metres. Find the height $y$ of the arch when $x = ${x}$, in metres.`, p * x - x * x, `y = ${p}(${x}) − ${x * x} = ${p * x - x * x} m.`); },
    r => { const p = r.int(4, 9), q = r.int(1, 20); return N(`A company's profit is $P = -x^2 + ${2 * p}x - ${p * p - q}$ thousand dollars when it sells $x$ thousand items. Find the greatest profit, in thousand dollars.`, q, `P = −(x − ${p})² + ${q}, so the greatest profit is ${q} thousand dollars.`); }
  ]});

  /* ---- Trigonometry (Sec 4) ---- */
  const ANG = [20, 25, 30, 35, 40, 50, 55, 60, 65, 70];
  gyms.push({id: 'G1.4.trigonometry.1', plain: [
    r => { const h = r.int(6, 20), a = r.pick(ANG); return N(`In a right-angled triangle, the hypotenuse is ${h} cm and an angle is ${a}°. Find the side opposite this angle, correct to 1 decimal place, in cm.`, rd(h * sin(a), 1), `opposite = ${h} × sin ${a}° = ${rd(h * sin(a), 1)} cm.`); },
    r => { const h = r.int(6, 20), a = r.pick(ANG); return N(`In a right-angled triangle, the hypotenuse is ${h} cm and an angle is ${a}°. Find the side adjacent to this angle, correct to 1 decimal place, in cm.`, rd(h * cos(a), 1), `adjacent = ${h} × cos ${a}° = ${rd(h * cos(a), 1)} cm.`); },
    r => { const b = r.int(5, 20), a = r.pick(ANG); return N(`In a right-angled triangle, the side adjacent to an angle of ${a}° is ${b} cm. Find the side opposite the angle, correct to 1 decimal place, in cm.`, rd(b * tan(a), 1), `opposite = ${b} × tan ${a}° = ${rd(b * tan(a), 1)} cm.`); },
    r => { const o = r.int(5, 18), a = r.pick(ANG); return N(`In a right-angled triangle, the side opposite an angle of ${a}° is ${o} cm. Find the hypotenuse, correct to 1 decimal place, in cm.`, rd(o / sin(a), 1), `hypotenuse = ${o} ÷ sin ${a}° = ${rd(o / sin(a), 1)} cm.`); },
    r => { const o = r.int(4, 12), b = r.int(5, 15); return N(`In a right-angled triangle, the sides next to the right angle are ${o} cm and ${b} cm. Find the angle opposite the ${o} cm side, correct to the nearest degree.`, Math.round(atan(o / b)), `tan θ = ${o}/${b}, so θ = ${rd(atan(o / b), 2)}° ≈ ${Math.round(atan(o / b))}°.`); },
    r => { const o = r.int(4, 12), h = r.int(14, 25); return N(`In a right-angled triangle, the hypotenuse is ${h} cm and the side opposite angle $x$ is ${o} cm. Find $x$, correct to the nearest degree.`, Math.round(asin(o / h)), `sin x = ${o}/${h}, so x = ${rd(asin(o / h), 2)}° ≈ ${Math.round(asin(o / h))}°.`); },
    r => { const t = r.pick([[3, 4, 5], [6, 8, 10]]), w = r.pick(['sin', 'cos', 'tan']), v = w === 'sin' ? t[0] / t[2] : w === 'cos' ? t[1] / t[2] : t[0] / t[1]; return N(`In a right-angled triangle, the side opposite angle $A$ is ${t[0]} cm, the side adjacent to $A$ is ${t[1]} cm and the hypotenuse is ${t[2]} cm. Find $\\${w} A$ as a decimal.`, rd(v, 4), `${w} A = ${rd(v, 4)}.`); },
    r => { const a = r.pick([15, 20, 25, 35, 40, 55, 65]); return N(`$\\sin ${a}^\\circ = \\cos x^\\circ$ where $x$ is an acute angle. Find $x$.`, 90 - a, `sin θ = cos(90° − θ), so x = ${90 - a}.`); },
    r => { const a = r.pick(ANG), h = r.int(8, 20); return N(`In triangle ABC, angle B = 90°, angle A = ${a}° and AC = ${h} cm. Find BC, correct to 1 decimal place, in cm.`, rd(h * sin(a), 1), `BC is opposite angle A: BC = ${h} × sin ${a}° = ${rd(h * sin(a), 1)} cm.`); }
  ], word: [
    r => { const L = r.int(4, 9), a = r.pick([60, 65, 70, 75]); return N(`A ladder ${L} m long leans against a vertical wall and makes an angle of ${a}° with the ground. How high up the wall does it reach, correct to 1 decimal place, in m?`, rd(L * sin(a), 1), `height = ${L} × sin ${a}° = ${rd(L * sin(a), 1)} m.`); },
    r => { const h = r.int(5, 12), s = r.int(4, 10); return N(`A pole ${h} m tall casts a shadow ${s} m long on level ground. Find the angle of elevation of the Sun, correct to the nearest degree.`, Math.round(atan(h / s)), `tan θ = ${h}/${s}, so θ ≈ ${Math.round(atan(h / s))}°.`); },
    r => { const d = r.int(20, 60), a = r.pick([25, 30, 35, 40, 50]); return N(`From a point ${d} m from the foot of a tower, the angle of elevation of its top is ${a}°. Find the height of the tower, correct to 1 decimal place, in m.`, rd(d * tan(a), 1), `height = ${d} × tan ${a}° = ${rd(d * tan(a), 1)} m.`); },
    r => { const L = r.int(6, 15), a = r.pick([10, 15, 20, 25]); return N(`A ramp ${L} m long rises at an angle of ${a}° to the horizontal. Find its vertical height, correct to 1 decimal place, in m.`, rd(L * sin(a), 1), `height = ${L} × sin ${a}° = ${rd(L * sin(a), 1)} m.`); }
  ]});

  return gyms;
};
