/* Extra G3 templates added after comparing the G3 banks with the G3 chapter worksheets in the Shinglee folder (SLWS).
   The worksheets use question types the first G3 build did not have (limits of accuracy, frequency tables and pictograms,
   quadrants, experimental probability, frequency density, segment areas, fractions that lead to quadratics, set counting,
   order and elements of a matrix). Each gym below gets a few more templates; build-banks.cjs appends them to the gym's own
   list and always uses them first, so every question type appears in the bank. */
'use strict';
module.exports = function(H){
  const {blank, sp} = H, B = blank;
  const rd = (v, d) => +v.toFixed(d);
  const out = [];

  /* ---- Rounding and estimation: limits of accuracy ---- */
  out.push({id: 'G3.1.approximation-and-estimation.1', plain: [
    r => { const L = r.int(21, 98) / 10; return B(`A length is ${L} m, correct to 1 decimal place. Find the largest possible value of the length, in m.`, rd(L + 0.05, 2), `The length is at most half a unit in the last place above ${L}: ${L} + 0.05 = ${rd(L + 0.05, 2)} m.`); },
    r => { const m = r.int(40, 99); return B(`A mass is ${m} kg, correct to the nearest kg. Find the smallest possible mass, in kg.`, m - 0.5, `The smallest value that rounds to ${m} is ${m} − 0.5 = ${m - 0.5} kg.`); },
    r => { const a = r.int(21, 60) / 10, b = r.int(21, 60) / 10; return B(`A rectangular room measures ${a} m by ${b} m, each correct to 1 decimal place. Find the largest possible area of the room, in m².`, rd((a + 0.05) * (b + 0.05), 4), `Largest area = (${a} + 0.05)(${b} + 0.05) = ${rd((a + 0.05) * (b + 0.05), 4)} m².`); }
  ], word: [
    r => { const a = r.int(40, 90) / 10, t = r.int(3, 9); return B(`A cyclist travels ${a} km, correct to 1 decimal place, in ${t} hours, correct to the nearest hour. Find the least possible average speed, in km/h, correct to 2 decimal places.`, rd((a - 0.05) / (t + 0.5), 2), `Least speed = least distance ÷ greatest time = ${rd(a - 0.05, 2)} ÷ ${t + 0.5} = ${rd((a - 0.05) / (t + 0.5), 2)} km/h.`); }
  ]});

  /* ---- Data handling: frequency tables and pictograms ---- */
  out.push({id: 'G3.1.data-handling.1', plain: [
    r => { const v = [1, 2, 3, 4, 5], f = v.map(() => r.int(2, 9)), T = f.reduce((a, b) => a + b, 0), S = v.reduce((t, x, i) => t + x * f[i], 0); return B(`The number of goals scored in a match by a team is recorded: 1, 2, 3, 4, 5 goals occurred ${f.join(', ')} times respectively. Find the mean number of goals per match, correct to 2 decimal places.`, rd(S / T, 2), `Total goals = ${v.map((x, i) => x + '×' + f[i]).join(' + ')} = ${S}. Matches = ${T}. Mean = ${S} ÷ ${T} = ${rd(S / T, 2)}.`); },
    r => { const k = r.pick([4, 5, 6, 8, 10]), n = r.int(3, 9); return B(`In a pictogram, one symbol stands for ${k} pupils. A row has ${n} whole symbols and a half symbol. How many pupils does the row show?`, k * n + k / 2, `${n} × ${k} + ½ × ${k} = ${k * n + k / 2}.`); },
    r => { const f = [r.int(3, 9), r.int(4, 12), r.int(5, 14), r.int(2, 8)], T = f.reduce((a, b) => a + b, 0); return B(`A frequency table shows the number of books read by ${T} pupils. The frequencies for 0, 1, 2 and 3 books are ${f.join(', ')}. What percentage of the pupils read at least 2 books? Give your answer correct to 1 decimal place.`, rd((f[2] + f[3]) / T * 100, 1), `Pupils reading at least 2 books = ${f[2]} + ${f[3]} = ${f[2] + f[3]}. ${f[2] + f[3]} ÷ ${T} × 100 = ${rd((f[2] + f[3]) / T * 100, 1)}%.`); }
  ], word: [
    r => { const k = r.pick([5, 6, 8, 10]), a = r.int(2, 6), b = r.int(2, 6); return B(`A pictogram uses one symbol for ${k} tickets sold. Monday has ${a} symbols and Tuesday has ${b} and a half symbols. How many more tickets were sold on ${a > b ? 'Monday' : 'Tuesday'}?`, Math.abs(k * a - (k * b + k / 2)), `Monday = ${k * a}, Tuesday = ${k * b + k / 2}. The difference is ${Math.abs(k * a - (k * b + k / 2))}.`); }
  ]});

  /* ---- Linear functions and graphs: ordered pairs, quadrants, function values ---- */
  out.push({id: 'G3.1.linear-functions-and-graphs.1', plain: [
    r => { const x = r.int(-8, -1), y = r.int(1, 8); const q = x < 0 && y > 0 ? 2 : 3; return B(`The point $(${x}, ${y})$ is plotted on a Cartesian plane. In which quadrant does it lie? (Type 1, 2, 3 or 4.)`, q, 'Negative x and positive y is the second quadrant.'); },
    r => { const x = r.int(-8, -1), y = r.int(-8, -1); return B(`The point $(${x}, ${y})$ is plotted on a Cartesian plane. In which quadrant does it lie? (Type 1, 2, 3 or 4.)`, 3, 'Both coordinates are negative, so the point is in the third quadrant.'); },
    r => { const m = r.int(2, 5), c = r.int(-6, 6), x = r.int(-5, -1); return B(`A function is given by $y = ${m}x ${c < 0 ? '- ' + (-c) : '+ ' + c}$. Complete the table entry: find $y$ when $x = ${x}$.`, m * x + c, `y = ${m}(${x}) ${c < 0 ? '− ' + (-c) : '+ ' + c} = ${m * x + c}.`); }
  ], word: [
    r => { const f = r.int(3, 9), p = r.int(2, 5), x = r.int(4, 14); return B(`A taxi's fare in dollars is given by $y = ${p}x + ${f}$, where $x$ is the distance in km. The ordered pair $(${x}, k)$ is on the graph of this function. Find $k$.`, p * x + f, `k = ${p}(${x}) + ${f} = ${p * x + f}.`); }
  ]});

  /* ---- Probability: experimental probability ---- */
  out.push({id: 'G3.2.probability.1', plain: [
    r => { const n = r.pick([100, 200, 250, 400]), h = Math.round(n * r.pick([0.46, 0.52, 0.55, 0.6, 0.48])); return B(`A coin is tossed ${n} times and lands heads ${h} times. Find the relative frequency of heads, as a decimal.`, rd(h / n, 4), `Relative frequency = ${h} ÷ ${n} = ${rd(h / n, 4)}.`); },
    r => { const n = r.pick([50, 100, 200]), k = r.int(6, 40), N0 = r.pick([1000, 2000, 5000]); return B(`In an experiment, ${k} out of ${n} bulbs tested were faulty. Using this relative frequency, how many faulty bulbs would you expect in a batch of ${sp(N0)} bulbs?`, rd(k / n * N0, 2), `Expected = ${k}/${n} × ${N0} = ${rd(k / n * N0, 2)}.`); },
    r => { const p = r.pick([0.15, 0.25, 0.35, 0.4, 0.55]); return B(`The probability that a spinner lands on red is ${p}. Find the probability that it does not land on red.`, rd(1 - p, 2), `P(not red) = 1 − ${p} = ${rd(1 - p, 2)}.`); }
  ], word: [
    r => { const d = r.pick([40, 60, 80, 100]), p = r.pick([0.1, 0.2, 0.25, 0.3]); return B(`A weather bureau finds that the relative frequency of rain on a day in November is ${p}. How many rainy days would you expect in a ${d}-day period?`, rd(d * p, 2), `Expected = ${d} × ${p} = ${rd(d * p, 2)}.`); }
  ]});

  /* ---- Statistical diagrams: frequency density ---- */
  out.push({id: 'G3.2.statistical-diagrams.1', plain: [
    r => { const w = r.pick([5, 10, 20]), f = w * r.int(2, 9) / 2; return B(`In a histogram, a class of width ${w} has a frequency of ${f}. Find the frequency density.`, rd(f / w, 2), `Frequency density = frequency ÷ class width = ${f} ÷ ${w} = ${rd(f / w, 2)}.`); },
    r => { const w = r.pick([4, 5, 8, 10]), d = r.pick([1.5, 2, 2.5, 3, 4]); return B(`In a histogram, a class of width ${w} has a frequency density of ${d}. Find the frequency of the class.`, rd(w * d, 2), `Frequency = frequency density × class width = ${d} × ${w} = ${rd(w * d, 2)}.`); },
    r => { const w1 = r.pick([5, 10]), w2 = w1 * 2, d1 = r.pick([1, 1.5, 2]), d2 = r.pick([2, 2.5, 3]); return B(`A histogram has two bars: the first has width ${w1} and height (frequency density) ${d1}, the second has width ${w2} and height ${d2}. Find the total frequency of the two classes.`, rd(w1 * d1 + w2 * d2, 2), `Frequencies = ${w1} × ${d1} + ${w2} × ${d2} = ${rd(w1 * d1 + w2 * d2, 2)}.`); }
  ], word: [
    r => { const w = r.pick([5, 10, 15]), f = w * r.int(2, 8), pup = r.int(40, 90); return B(`The times taken by ${pup} pupils to run 100 m are shown in a histogram. The class 15 – ${15 + w} seconds has a frequency of ${f}. Find the frequency density of this class.`, rd(f / w, 2), `Frequency density = ${f} ÷ ${w} = ${rd(f / w, 2)}.`); }
  ]});

  /* ---- Arc lengths, sector areas: segments and shaded regions ---- */
  out.push({id: 'G3.3.arc-lengths-sector-areas-and-radian-measure.1', plain: [
    r => { const rr = r.int(6, 14), t = r.pick([60, 90, 120]); return B(`A sector of a circle has radius ${rr} cm and angle ${t}°. Find the area of the segment cut off by the chord joining the ends of the two radii, correct to 2 decimal places, in cm².`, rd(t / 360 * Math.PI * rr * rr - 0.5 * rr * rr * Math.sin(t * Math.PI / 180), 2), `Segment = sector − triangle = ${rd(t / 360 * Math.PI * rr * rr, 2)} − ${rd(0.5 * rr * rr * Math.sin(t * Math.PI / 180), 2)} = ${rd(t / 360 * Math.PI * rr * rr - 0.5 * rr * rr * Math.sin(t * Math.PI / 180), 2)} cm².`); },
    r => { const a = r.int(6, 20); return B(`A quarter circle of radius ${a} cm is drawn inside a square of side ${a} cm with its centre at one corner of the square. Find the area of the square outside the quarter circle, correct to 2 decimal places, in cm².`, rd(a * a - Math.PI * a * a / 4, 2), `Area = ${a * a} − ¼π(${a})² = ${rd(a * a - Math.PI * a * a / 4, 2)} cm².`); },
    r => { const R = r.int(8, 16), rr = r.int(3, 7); return B(`A shaded ring has an outer radius of ${R} cm and an inner radius of ${rr} cm. Find the area of the ring, correct to 2 decimal places, in cm².`, rd(Math.PI * (R * R - rr * rr), 2), `Area = π(${R}² − ${rr}²) = ${rd(Math.PI * (R * R - rr * rr), 2)} cm².`); }
  ], word: [
    r => { const rr = r.int(10, 20), t = r.pick([60, 90, 120]); return B(`A circular lawn of radius ${rr} m has a straight path cutting off a segment. The path joins two points A and B on the edge with angle AOB = ${t}° at the centre O. Find the area of the segment of lawn, correct to 1 decimal place, in m².`, rd(t / 360 * Math.PI * rr * rr - 0.5 * rr * rr * Math.sin(t * Math.PI / 180), 1), `Segment = sector − triangle = ${rd(t / 360 * Math.PI * rr * rr, 2)} − ${rd(0.5 * rr * rr * Math.sin(t * Math.PI / 180), 2)} = ${rd(t / 360 * Math.PI * rr * rr - 0.5 * rr * rr * Math.sin(t * Math.PI / 180), 1)} m².`); }
  ]});

  /* ---- Quadratic equations: fractions that lead to a quadratic, vertex ---- */
  out.push({id: 'G3.3.more-about-quadratic-equations-and-quadratic-functions.1', plain: [
    r => { const p = r.int(2, 6), q = r.int(p + 1, 9); return B(`Solve $x + \\dfrac{${p * q}}{x} = ${p + q}$. Find the larger root.`, q, `Multiply by x: x² + ${p * q} = ${p + q}x, so x² − ${p + q}x + ${p * q} = 0, giving (x − ${p})(x − ${q}) = 0. The larger root is ${q}.`); },
    r => { const a = r.int(1, 4), b = r.int(2, 4) * 2, c = r.int(1, 8); return B(`Find the maximum value of $y = -x^2 + ${b}x + ${c}$.`, c + (b / 2) ** 2, `y = −(x − ${b / 2})² + ${c + (b / 2) ** 2}, so the maximum value is ${c + (b / 2) ** 2}.`); },
  ], word: [
    r => { const w = r.int(3, 12), k = r.int(2, 6); return B(`A rectangular tray has length $(x + ${k})$ cm and width $x$ cm. Its area is ${w * (w + k)} cm². Form an equation and solve it to find $x$, in cm.`, w, `x(x + ${k}) = ${w * (w + k)}, so x² + ${k}x − ${w * (w + k)} = 0. The positive root is x = ${w}.`); }
  ]});

  /* ---- Sets: counting with the universal set ---- */
  out.push({id: 'G3.4.set-language-and-notation.1', plain: [
    r => { const n = r.pick([12, 15, 20, 24, 30]), k = r.pick([2, 3, 4, 5]); const A = Math.floor(n / k); return B(`$\\xi = \\{1, 2, 3, \\ldots, ${n}\\}$ and $A$ is the set of multiples of ${k} in $\\xi$. Find $n(A')$, the number of elements not in $A$.`, n - A, `n(A) = ${A}. n(A') = n(ξ) − n(A) = ${n} − ${A} = ${n - A}.`); },
    r => { const a = r.int(10, 25), b = r.int(8, 22), both = r.int(2, 7); return B(`In a group, $n(A) = ${a}$, $n(B) = ${b}$ and $n(A \\cap B) = ${both}$. Find $n(A \\cup B)$.`, a + b - both, `n(A ∪ B) = ${a} + ${b} − ${both} = ${a + b - both}.`); },
    r => { const T = r.int(35, 60), a = r.int(15, 25), b = r.int(12, 22), both = r.int(3, 9); return B(`$n(\\xi) = ${T}$, $n(A) = ${a}$, $n(B) = ${b}$ and $n(A \\cap B) = ${both}$. Find $n((A \\cup B)')$.`, T - (a + b - both), `n(A ∪ B) = ${a + b - both}. n((A ∪ B)') = ${T} − ${a + b - both} = ${T - (a + b - both)}.`); }
  ], word: [
    r => { const T = r.int(40, 60), a = r.int(18, 28), b = r.int(15, 25), both = r.int(4, 10); return B(`In a class of ${T} pupils, ${a} take art and ${b} take drama. ${both} pupils take both. How many pupils take neither art nor drama?`, T - (a + b - both), `Pupils taking at least one subject = ${a} + ${b} − ${both} = ${a + b - both}. Neither = ${T} − ${a + b - both} = ${T - (a + b - both)}.`); }
  ]});

  /* ---- Matrices: order and elements ---- */
  out.push({id: 'G3.4.matrices.1', plain: [
    r => { const m = r.int(2, 4), n = r.int(2, 4); return B(`A matrix has ${m} rows and ${n} columns. How many elements does it have?`, m * n, `Number of elements = ${m} × ${n} = ${m * n}.`); },
    r => { const A = [[r.int(1, 9), r.int(1, 9), r.int(1, 9)], [r.int(1, 9), r.int(1, 9), r.int(1, 9)]], i = r.int(0, 1), j = r.int(0, 2); return B(`$M = \\begin{pmatrix} ${A[0].join(' & ')} \\\\ ${A[1].join(' & ')} \\end{pmatrix}$. Write down the element in row ${i + 1}, column ${j + 1}.`, A[i][j], `Row ${i + 1}, column ${j + 1} is ${A[i][j]}.`); },
    r => { const m = r.int(2, 4), n = r.int(2, 4), p = r.int(2, 4); return B(`Matrix $A$ has order $${m} \\times ${n}$ and matrix $B$ has order $${n} \\times ${p}$. How many elements does the product $AB$ have?`, m * p, `AB has order ${m} × ${p}, so it has ${m * p} elements.`); }
  ], word: [
    r => { const s = r.int(3, 6), t = r.int(3, 5); return B(`A shop records the sales of ${s} products on ${t} days in a matrix with one row for each product and one column for each day. How many entries does the matrix have?`, s * t, `Entries = ${s} × ${t} = ${s * t}.`); }
  ]});

  return out;
};
