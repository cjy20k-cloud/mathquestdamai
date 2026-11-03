/* G3 Sec 1 generators (part B, continued): Simple equations, Angles, Triangles/Polygons, Ratio/Rate/Speed. */
'use strict';
module.exports = function(H){
  const {blank, gcd, sp} = H, B = blank;
  const out = [];
  const interiorSum = n => (n - 2) * 180;

  /* ---- Simple equations in one variable ---- */
  out.push({id: 'G3.1.simple-equations-in-one-variable.1', plain: [
    r => { const x = r.int(2, 15), a = r.int(2, 9), b = r.int(1, 20); return B(`Solve $${a}x + ${b} = ${a * x + b}$. Find $x$.`, x, `$${a}x = ${a * x}$, so $x = ${x}$.`); },
    r => { const x = r.int(2, 15), a = r.int(2, 9), b = r.int(1, 20); return B(`Solve $${a}x - ${b} = ${a * x - b}$. Find $x$.`, x, `$${a}x = ${a * x}$, so $x = ${x}$.`); },
    r => { const x = r.int(2, 9), a = r.int(4, 8), c = r.int(2, 3), b = r.int(1, 9); return B(`Solve $${a}x + ${b} = ${c}x + ${(a - c) * x + b}$. Find $x$.`, x, `Collect the $x$ terms: $${a - c}x = ${(a - c) * x}$, so $x = ${x}$.`); },
    r => { const x = r.int(2, 9), a = r.int(2, 5), b = r.int(2, 6); return B(`Solve $${a}(x + ${b}) = ${a * (x + b)}$. Find $x$.`, x, `Divide by ${a}: $x + ${b} = ${x + b}$, so $x = ${x}$.`); },
    r => { const x = r.int(2, 9), a = r.int(3, 6), b = r.int(2, 5); if (x === b) return null; return B(`Solve $${a}(x - ${b}) + ${b} = ${a * (x - b) + b}$. Find $x$.`, x + 0, `$${a}(x - ${b}) = ${a * (x - b)}$, so $x - ${b} = ${x - b}$ and $x = ${x}$.`); },
    r => { const x = r.int(2, 12), a = r.int(2, 7), b = r.int(1, 9); return B(`Solve $\\dfrac{x}{${a}} + ${b} = ${x + b}$. Find $x$.`, a * x, `$\\dfrac{x}{${a}} = ${x}$, so $x = ${a * x}$.`); },
    r => { const m = r.int(2, 6), k = r.int(2, 5), a = r.int(2, 5); if (a === k) return null; return B(`Solve $\\dfrac{${a}x}{${k}} = ${a * m}$. Find $x$.`, k * m, `Multiply by ${k}: $${a}x = ${a * m * k}$, so $x = ${k * m}$.`); },
    r => { const x = r.int(2, 9), a = r.int(2, 4), b = r.int(2, 6), c = r.int(2, 9); return B(`Solve $\\dfrac{x + ${a}}{${b}} = ${c}$. Find $x$.`, b * c - a, `Multiply by ${b}: $x + ${a} = ${b * c}$, so $x = ${b * c - a}$.`); },
    r => { const x = r.int(2, 9), a = r.int(2, 5), b = r.int(2, 5); if (a === b) return null; return B(`Solve $${a}x - ${b}(x - 2) = ${(a - b) * x + 2 * b}$. Find $x$.`, x, `Expand: $${a}x - ${b}x + ${2 * b} = ${(a - b) * x + 2 * b}$, so $${a - b}x = ${(a - b) * x}$.`); },
    r => { const x = r.int(8, 20), a = r.int(4, 7), c = r.int(2, 3), b = r.int(1, 6), d = (a - c) * x - b; return B(`Solve $${a}x - ${b} = ${c}x + ${d}$. Find $x$.`, x, `Collect the $x$ terms: $${a - c}x = ${d + b}$, so $x = ${x}$.`); },
    r => { const m = r.int(1, 5), x = 3 * m + 1; return B(`Solve $\\dfrac{2x + 1}{3} = ${2 * m + 1}$. Find $x$.`, x, `Multiply by 3: $2x + 1 = ${6 * m + 3}$, so $2x = ${6 * m + 2}$ and $x = ${x}$.`); },
    r => { const x = r.int(2, 9), a = r.int(2, 5), b = r.int(1, 9); return B(`Given that $${a}x + ${b} = ${a * x + b}$, find the value of $${a}x + ${2 * b}$.`, a * x + 2 * b, `$${a}x = ${a * x}$, so $${a}x + ${2 * b} = ${a * x + 2 * b}$.`); },
    r => { const x = r.int(3, 10), a = r.int(2, 5); return B(`Solve $${a}(x + 1) - (x - 1) = ${a * (x + 1) - (x - 1)}$. Find $x$.`, x, `Expand: $${a}x + ${a} - x + 1 = ${a * (x + 1) - (x - 1)}$, so $${a - 1}x = ${(a - 1) * x}$.`); },
    r => { const m = r.int(2, 8); return B(`Solve $\\dfrac{x}{2} + \\dfrac{x}{3} = ${5 * m}$. Find $x$.`, 6 * m, `Multiply by 6: $3x + 2x = ${30 * m}$, so $x = ${6 * m}$.`); },
    r => { const a = r.int(2, 9), c = r.int(10, 20); return B(`Solve $${a} - x = ${c}$. Find $x$.`, a - c, `$x = ${a} - ${c} = ${a - c}$.`); }
  ], word: [
    r => { const x = r.int(5, 15), k = r.int(2, 5), b = r.int(3, 9); return B(`I think of a number, multiply it by ${k} and add ${b}. The answer is ${k * x + b}. Find the number.`, x, `$${k}x + ${b} = ${k * x + b}$, so $x = ${x}$.`); },
    r => { const a = r.int(8, 16), d = r.int(20, 35); return B(`Ben is ${a} years younger than his mother. The sum of their ages is ${2 * d - a}. How old is Ben's mother?`, d, `Let the mother's age be $m$: $m + (m - ${a}) = ${2 * d - a}$, so $2m = ${2 * d}$ and $m = ${d}$.`); },
    r => { const n = r.int(5, 20); return B(`The sum of three consecutive integers is ${3 * n + 3}. Find the smallest of the three integers.`, n, `$n + (n + 1) + (n + 2) = ${3 * n + 3}$, so $3n = ${3 * n}$ and $n = ${n}$.`); },
    r => { const w = r.int(5, 12), d = r.int(3, 9); return B(`A rectangle's length is ${d} cm more than its width. Its perimeter is ${2 * (2 * w + d)} cm. Find its width in cm.`, w, `$2(w + (w + ${d})) = ${2 * (2 * w + d)}$, so $4w = ${4 * w}$ and $w = ${w}$.`); },
    r => { const p = r.int(2, 6), n = r.int(4, 9), c = r.int(5, 15); return B(`Mary buys ${n} pencils at the same price and a pen for \\$${c}. She pays \\$${p * n + c} in all. Find the price of one pencil in dollars.`, p, `$${n}p + ${c} = ${p * n + c}$, so $p = ${p}$.`); },
    r => { const x = r.int(6, 14); return B(`A father is 4 times as old as his son. In 5 years' time the sum of their ages will be ${5 * x + 10}. Find the son's age now.`, x, `Let the son's age be $s$: $(s + 5) + (4s + 5) = ${5 * x + 10}$, so $5s = ${5 * x}$ and $s = ${x}$.`); }
  ]});

  /* ---- Angles and parallel lines ---- */
  out.push({id: 'G3.1.angles-and-parallel-lines.1', plain: [
    r => { const a = r.int(20, 80); return B(`Find the complement of ${a}°.`, 90 - a, `90 − ${a} = ${90 - a}°.`); },
    r => { const a = r.int(20, 160); return B(`Find the supplement of ${a}°.`, 180 - a, `180 − ${a} = ${180 - a}°.`); },
    r => { const a = r.int(20, 80), b = r.int(20, 70); return B(`Angles on a straight line are ${a}°, ${b}° and $x$°. Find $x$.`, 180 - a - b, `180 − ${a} − ${b} = ${180 - a - b}.`); },
    r => { const a = r.int(60, 120), b = r.int(60, 120), c = r.int(40, 80), x = 360 - a - b - c; if (x <= 0) return null; return B(`Angles at a point are ${a}°, ${b}°, ${c}° and $x$°. Find $x$.`, x, `360 − ${a} − ${b} − ${c} = ${x}.`); },
    r => { const a = r.int(30, 150); return B(`Two straight lines cross. One of the angles is ${a}°. Find the angle vertically opposite to it.`, a, 'Vertically opposite angles are equal.'); },
    r => { const a = r.int(30, 150); return B(`Two straight lines cross. One of the angles is ${a}°. Find the size of an adjacent angle.`, 180 - a, `Adjacent angles on a straight line add up to 180°: 180 − ${a} = ${180 - a}.`); },
    r => { const a = r.int(40, 130); return B(`Two parallel lines are cut by a transversal. A corresponding angle to ${a}° is $y$°. Find $y$.`, a, 'Corresponding angles are equal.'); },
    r => { const a = r.int(40, 130); return B(`Two parallel lines are cut by a transversal. An alternate angle to ${a}° is $y$°. Find $y$.`, a, 'Alternate angles are equal.'); },
    r => { const a = r.int(40, 130); return B(`Two parallel lines are cut by a transversal. A co-interior angle to ${a}° is $y$°. Find $y$.`, 180 - a, `Co-interior angles add up to 180°: 180 − ${a} = ${180 - a}.`); },
    r => { const x = r.int(38, 60), b = r.int(10, 30), e = 5 * x + b - 180; return B(`Two angles on a straight line are $(2x + ${b})°$ and $(3x - ${e})°$. Find $x$.`, x, `$(2x + ${b}) + (3x - ${e}) = 180$, so $5x = ${180 - b + e}$ and $x = ${x}$.`); },
    r => { const a = r.int(3, 30) * 2; return B(`Angle $AOB = ${a}°$ and $OC$ bisects it. Find angle $AOC$.`, a / 2, `Half of ${a} = ${a / 2}°.`); },
    r => { const a = r.int(20, 70); return B(`$AB$ is parallel to $CD$ and $BD$ is a transversal. Angle $ABD = ${a}°$. Find the co-interior angle $BDC$.`, 180 - a, `180 − ${a} = ${180 - a}°.`); },
    r => { const rt = r.pick([[1, 2, 3], [2, 3, 4], [1, 4, 5], [2, 3, 7], [3, 4, 5]]), s = rt[0] + rt[1] + rt[2]; return B(`Three angles at a point are in the ratio ${rt.join(' : ')}. Find the largest angle in degrees.`, 360 / s * Math.max(...rt), `One part = 360 ÷ ${s} = ${360 / s}°. Largest = ${Math.max(...rt)} × ${360 / s} = ${360 / s * Math.max(...rt)}°.`); },
    r => { const rt = r.pick([[1, 2, 3], [2, 3, 4], [1, 1, 2], [3, 4, 5]]), s = rt[0] + rt[1] + rt[2]; return B(`The angles of a triangle are in the ratio ${rt.join(' : ')}. Find the smallest angle in degrees.`, 180 / s * Math.min(...rt), `One part = 180 ÷ ${s} = ${180 / s}°. Smallest = ${Math.min(...rt)} × ${180 / s} = ${180 / s * Math.min(...rt)}°.`); },
    r => { const x = r.int(10, 30), b = r.int(10, 40), d = 3 * x + b; return B(`Two vertically opposite angles are $(2x + ${b})°$ and $(5x - ${d})°$. Find $x$.`, x, `Vertically opposite angles are equal: $2x + ${b} = 5x - ${d}$, so $3x = ${b + d}$ and $x = ${x}$.`); }
  ], word: [
    r => { const h = r.int(1, 5); return B(`Find the angle between the hour hand and the minute hand of a clock at ${h}:00. Take the smaller angle, in degrees.`, 30 * h, `Each hour is 30°, so at ${h}:00 the angle is ${30 * h}°.`); },
    r => { const a = r.int(55, 80); return B(`A ladder leans against a vertical wall and makes an angle of ${a}° with the horizontal ground. Find the angle between the ladder and the wall.`, 90 - a, `The wall is perpendicular to the ground: 90 − ${a} = ${90 - a}°.`); },
    r => { const a = r.int(40, 85); return B(`Two straight roads cross at a junction. One of the angles between them is ${a}°. Find the size of the obtuse angle between the roads.`, 180 - a, `180 − ${a} = ${180 - a}°.`); },
    r => { const a = r.int(35, 65); return B(`Two parallel streets are crossed by a straight avenue. The avenue makes an angle of ${a}° with the first street. What angle does it make with the second street in the corresponding position?`, a, 'Corresponding angles between parallel lines are equal.'); },
    r => { const a = r.int(50, 120); return B(`A signpost makes an angle of ${a}° with the road on one side. Find the angle it makes with the road on the other side.`, 180 - a, `The road is a straight line: 180 − ${a} = ${180 - a}°.`); },
    r => { const a = r.int(30, 80); return B(`A door has opened through ${a}°. Through how many more degrees must it turn to be at a right angle to the wall?`, 90 - a, `90 − ${a} = ${90 - a}°.`); }
  ]});

  /* ---- Triangles, quadrilaterals and polygons ---- */
  out.push({id: 'G3.1.triangles-quadrilaterals-polygons.1', plain: [
    r => { const a = r.int(30, 80), b = r.int(30, 80); return B(`Two angles of a triangle are ${a}° and ${b}°. Find the third angle.`, 180 - a - b, `180 − ${a} − ${b} = ${180 - a - b}.`); },
    r => { const a = r.int(20, 70); return B(`An isosceles triangle has a vertex angle of ${a * 2}°. Find each base angle.`, 90 - a, `(180 − ${2 * a}) ÷ 2 = ${90 - a}°.`); },
    r => { const a = r.int(30, 70), b = r.int(30, 70); return B(`Two interior angles of a triangle are ${a}° and ${b}°. Find the exterior angle at the third vertex.`, a + b, `The exterior angle equals the sum of the two opposite interior angles: ${a} + ${b} = ${a + b}°.`); },
    r => { const a = r.int(70, 110), b = r.int(70, 110), c = r.int(70, 110); return B(`Three angles of a quadrilateral are ${a}°, ${b}° and ${c}°. Find the fourth angle.`, 360 - a - b - c, `360 − ${a} − ${b} − ${c} = ${360 - a - b - c}.`); },
    r => { const n = r.int(5, 12); return B(`Find the sum of the interior angles of a polygon with ${n} sides.`, interiorSum(n), `(${n} − 2) × 180 = ${interiorSum(n)}°.`); },
    r => { const n = r.pick([5, 6, 8, 9, 10, 12]); return B(`Find the size of each interior angle of a regular polygon with ${n} sides.`, interiorSum(n) / n, `Sum = ${interiorSum(n)}°, so each angle is ${interiorSum(n)} ÷ ${n} = ${interiorSum(n) / n}°.`); },
    r => { const n = r.pick([5, 6, 8, 9, 10, 12, 15, 18, 20]); return B(`Find the size of each exterior angle of a regular polygon with ${n} sides.`, 360 / n, `360 ÷ ${n} = ${360 / n}°.`); },
    r => { const e = r.pick([30, 36, 40, 45, 60, 72]); return B(`Each exterior angle of a regular polygon is ${e}°. How many sides does the polygon have?`, 360 / e, `360 ÷ ${e} = ${360 / e}.`); },
    r => { const i = r.pick([108, 120, 135, 140, 150, 156, 162]); return B(`Each interior angle of a regular polygon is ${i}°. How many sides does it have?`, 360 / (180 - i), `Exterior angle = ${180 - i}°, so the number of sides is 360 ÷ ${180 - i} = ${360 / (180 - i)}.`); },
    r => { const a = r.int(50, 110); return B(`In a parallelogram, one angle is ${a}°. Find the adjacent angle.`, 180 - a, `Adjacent angles in a parallelogram add up to 180°: ${180 - a}.`); },
    r => { const a = r.int(60, 110), b = r.int(60, 110); return B(`In a kite $ABCD$, $\\angle B = \\angle D = ${a}°$ and $\\angle A = ${b}°$. Find $\\angle C$.`, 360 - 2 * a - b, `360 − ${a} − ${a} − ${b} = ${360 - 2 * a - b}°.`); },
    r => { const a = r.int(60, 100); return B(`In a trapezium $ABCD$ with $AB \\parallel DC$, $\\angle A = ${a}°$. Find $\\angle D$.`, 180 - a, `Co-interior angles between parallel lines add to 180°: ${180 - a}.`); },
    r => { const n = r.int(7, 14); return B(`A polygon has ${n} sides. How many diagonals can be drawn from one vertex?`, n - 3, `A vertex joins to ${n} − 3 = ${n - 3} non-adjacent vertices.`); },
    r => { const n = r.int(5, 12); return B(`The sum of the interior angles of a polygon is ${interiorSum(n)}°. How many sides does it have?`, n, `${interiorSum(n)} ÷ 180 + 2 = ${n}.`); },
    r => { const a = r.int(5, 20); return B(`The angles of a triangle are $x°$, $(x + ${a})°$ and $(x + ${2 * a})°$. Find the smallest angle $x$.`, 60 - a, `$3x + ${3 * a} = 180$, so $x = ${60 - a}$.`); }
  ], word: [
    r => { const n = r.pick([6, 8, 9, 10, 12]); return B(`A park is in the shape of a regular ${n}-sided polygon. Find the size of each interior angle in degrees.`, interiorSum(n) / n, `Each interior angle = ${interiorSum(n)} ÷ ${n} = ${interiorSum(n) / n}°.`); },
    r => { const a = r.int(40, 70); return B(`A triangular flag is isosceles. The angle at the top is ${2 * a}°. Find the size of one of the other angles in degrees.`, 90 - a, `(180 − ${2 * a}) ÷ 2 = ${90 - a}°.`); },
    r => { const e = r.pick([20, 24, 30, 36, 40]); return B(`A designer draws a regular polygon whose exterior angle is ${e}°. How many sides does the polygon have?`, 360 / e, `360 ÷ ${e} = ${360 / e}.`); },
    r => { const a = r.int(80, 100), b = r.int(80, 100), c = r.int(80, 100); return B(`A plot of land is a quadrilateral. Three of its corners are ${a}°, ${b}° and ${c}°. Find the fourth corner in degrees.`, 360 - a - b - c, `360 − ${a} − ${b} − ${c} = ${360 - a - b - c}°.`); },
    r => { const n = r.pick([5, 8, 10, 12]); return B(`A pattern is made from identical regular ${n}-sided tiles. Find the size of one exterior angle of a tile in degrees.`, 360 / n, `360 ÷ ${n} = ${360 / n}°.`); },
    r => B(`A stop sign is a regular octagon. Find the sum of its interior angles in degrees.`, 1080, '(8 − 2) × 180 = 1080°.')
  ]});

  /* ---- Ratio, rate and speed ---- */
  out.push({id: 'G3.1.ratio-rate-and-speed.1', plain: [
    r => { const k = r.int(2, 9), a = r.int(2, 7), b = r.int(2, 9); if (a === b || gcd(a, b) !== 1) return null; return B(`Simplify the ratio ${k * a} : ${k * b}. Find the first term of the simplest form.`, a, `Divide both terms by ${k}: ${a} : ${b}.`); },
    r => { const a = r.int(2, 5), b = r.int(2, 5), t = r.int(2, 9); if (a === b) return null; return B(`Divide ${t * (a + b)} in the ratio ${a} : ${b}. Find the larger share.`, t * Math.max(a, b), `Each part is ${t * (a + b)} ÷ ${a + b} = ${t}. The larger share is ${Math.max(a, b)} × ${t} = ${t * Math.max(a, b)}.`); },
    r => { const a = r.int(2, 5), b = r.int(2, 7), k = r.int(2, 6); if (a === b) return null; return B(`$${a} : ${b} = x : ${b * k}$. Find $x$.`, a * k, `${b * k} ÷ ${b} = ${k}, so $x = ${a} \\times ${k} = ${a * k}$.`); },
    r => { const a = r.int(1, 4), b = r.int(2, 5), c = r.int(2, 6), t = r.int(2, 8); return B(`Three numbers are in the ratio ${a} : ${b} : ${c}. Their sum is ${t * (a + b + c)}. Find the largest number.`, t * Math.max(a, b, c), `One part = ${t}. The largest = ${Math.max(a, b, c)} × ${t} = ${t * Math.max(a, b, c)}.`); },
    r => { const v = r.int(40, 90), t = r.int(2, 5); return B(`A car travels ${v * t} km in ${t} hours at a constant speed. Find its speed in km/h.`, v, `Speed = ${v * t} ÷ ${t} = ${v} km/h.`); },
    r => { const v = r.pick([36, 54, 72, 90, 108]); return B(`Convert ${v} km/h to m/s.`, v / 3.6, `${v} × 1000 ÷ 3600 = ${v / 3.6} m/s.`); },
    r => { const v = r.int(5, 30); return B(`Convert ${v} m/s to km/h.`, +(v * 3.6).toFixed(2), `${v} × 3.6 = ${(v * 3.6).toFixed(1)} km/h.`); },
    r => { const d1 = r.int(60, 120), t1 = r.int(2, 3), d2 = r.int(60, 120), t2 = r.int(2, 3); return B(`A cyclist travels ${d1} km in ${t1} hours and then ${d2} km in ${t2} hours. Find the average speed for the whole journey in km/h, correct to 1 decimal place.`, +((d1 + d2) / (t1 + t2)).toFixed(1), `Average speed = (${d1} + ${d2}) ÷ (${t1} + ${t2}) = ${((d1 + d2) / (t1 + t2)).toFixed(1)} km/h.`); },
    r => { const v = r.int(30, 80), d = v * r.int(2, 5); return B(`How long does it take, in hours, to travel ${d} km at ${v} km/h?`, d / v, `Time = ${d} ÷ ${v} = ${d / v} hours.`); },
    r => { const a = r.int(2, 9), b = r.int(2, 9), k = r.int(2, 8); return B(`The ratio of boys to girls is ${a} : ${b}. There are ${a * k} boys. How many girls are there?`, b * k, `One part = ${a * k} ÷ ${a} = ${k}. Girls = ${b} × ${k} = ${b * k}.`); },
    r => { const a = r.int(2, 6), b = r.int(2, 6), k = r.int(3, 9); if (a === b) return null; return B(`Two numbers are in the ratio ${a} : ${b}. The difference between them is ${k * Math.abs(a - b)}. Find the larger number.`, k * Math.max(a, b), `One part = ${k}. Larger = ${Math.max(a, b)} × ${k} = ${k * Math.max(a, b)}.`); },
    r => { const rate = r.int(3, 9), n = r.int(3, 9); return B(`A tap fills ${rate * n} litres in ${n} minutes. How many litres does it fill in 12 minutes?`, rate * 12, `Rate = ${rate * n} ÷ ${n} = ${rate} litres per minute. In 12 minutes: ${rate * 12} litres.`); },
    r => { const a = r.int(2, 5), b = r.int(3, 7), k = r.int(2, 9); if (a >= b) return null; return B(`The ratio $a : b = ${a} : ${b}$. If $b = ${b * k}$, find $a + b$.`, (a + b) * k, `One part = ${k}. $a + b = ${a + b} \\times ${k} = ${(a + b) * k}$.`); },
    r => { const a = r.int(2, 5), b = r.int(2, 7), k = r.int(2, 6); if (a === b) return null; return B(`$${a * k} : ${b * k} = ${a} : x$. Find $x$.`, b, `Divide both terms by ${k}: ${a} : ${b}, so $x = ${b}$.`); },
    r => { const p = r.int(3, 9) * 5, m = r.int(2, 6), n = m + r.int(2, 5); return B(`A machine prints ${p * m} pages in ${m} minutes. How many pages does it print in ${n} minutes?`, p * n, `Rate = ${p} pages per minute, so in ${n} minutes it prints ${p * n} pages.`); }
  ], word: [
    r => { const a = r.int(2, 5), b = r.int(3, 7), t = r.int(4, 12); if (a === b) return null; return B(`Ali and Bala share \\$${t * (a + b)} in the ratio ${a} : ${b}. How much does Bala get, in dollars?`, t * b, `One part = ${t}. Bala gets ${b} × ${t} = ${t * b}.`); },
    r => { const v = r.int(40, 70), t1 = r.int(2, 4), t2 = r.int(1, 3); return B(`A coach drives at ${v} km/h for ${t1} hours and then at ${v + 20} km/h for ${t2} hours. How far does it travel altogether, in km?`, v * t1 + (v + 20) * t2, `${v} × ${t1} + ${v + 20} × ${t2} = ${v * t1 + (v + 20) * t2}.`); },
    r => { const a = r.int(2, 4), b = r.int(3, 6), k = r.int(3, 9); if (a >= b) return null; return B(`The ratio of red marbles to blue marbles is ${a} : ${b}. There are ${(b - a) * k} more blue marbles than red marbles. How many marbles are there altogether?`, (a + b) * k, `The difference ${b - a} parts = ${(b - a) * k}, so 1 part = ${k}. Total = ${a + b} × ${k} = ${(a + b) * k}.`); },
    r => { const n = r.pick([6, 8, 12]), p = r.int(2, 5); return B(`A shopkeeper sells ${n} oranges for \\$${p * n}. Find the cost of 10 oranges in dollars.`, 10 * p, `One orange costs ${p} dollars, so 10 oranges cost ${10 * p}.`); },
    r => { const d1 = r.int(100, 200), t1 = r.int(2, 3), d2 = r.int(100, 200), t2 = r.int(2, 3); return B(`A train travels ${d1} km in the first ${t1} hours and ${d2} km in the next ${t2} hours. Find its average speed for the whole journey in km/h, correct to 1 decimal place.`, +((d1 + d2) / (t1 + t2)).toFixed(1), `Average speed = ${d1 + d2} ÷ ${t1 + t2} = ${((d1 + d2) / (t1 + t2)).toFixed(1)} km/h.`); },
    r => { const v = r.pick([54, 72, 90]); return B(`A sprinter runs at ${v / 3.6} m/s. Find his speed in km/h.`, v, `${v / 3.6} × 3.6 = ${v} km/h.`); }
  ]});

  return out;
};
