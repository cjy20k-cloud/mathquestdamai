/* G2 (Normal Academic) Sec 4 generators, part B: Ch3 Data Analysis - Measures of Spread (cumulative frequency, quartiles,
   box-and-whisker plots, standard deviation) and Ch5 Properties of Circles (chords, angles at the circumference, cyclic
   quadrilaterals, tangents).
   Sec 4 banks are 20 typed answers (15 plain + 5 word problems). Style follows the Shing Lee N(A) practice exercises and the
   G2 chapter worksheets in the Shinglee folder (SLWS). Diagrams cannot be drawn in a question, so each diagram is described by its
   data or by the angle facts. Every answer is computed from the question's own numbers. */
'use strict';
module.exports = function(H){
  const {N, gcd, sp} = H;
  const rd = (v, d) => +v.toFixed(d);
  const gyms = [];
  const median = a => { const b = a.slice().sort((x, y) => x - y), n = b.length; return n % 2 ? b[(n - 1) / 2] : (b[n / 2 - 1] + b[n / 2]) / 2; };
  const quart = a => { const b = a.slice().sort((x, y) => x - y), h = Math.floor(b.length / 2); return {q1: median(b.slice(0, h)), q3: median(b.slice(b.length - h)), med: median(b)}; };
  const sd = a => { const m = a.reduce((x, y) => x + y, 0) / a.length; return Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / a.length); };
  const list = a => a.join(', ');
  const cfTable = r => { const ub = [10, 20, 30, 40, 50].map(v => v * r.pick([1, 1])), f = [r.int(2, 6), r.int(6, 14), r.int(10, 22), r.int(8, 16), r.int(2, 8)]; const cf = []; f.reduce((s, x, i) => { cf[i] = s + x; return s + x; }, 0); return {ub, f, cf}; };
  const cfText = t => t.ub.map((u, i) => `≤ ${u}: ${t.cf[i]}`).join('; ');
  const data = (r, n, lo, hi) => Array.from({length: n}, () => r.int(lo, hi));

  /* ---- Cumulative frequency diagrams ---- */
  gyms.push({id: 'G2.4.data-analysis-measures-of-spread.1', plain: [
    r => { const t = cfTable(r); return N(`A cumulative frequency table for the marks of some students is: ${cfText(t)} (each entry is the number of students with marks up to and including that mark). How many students are there in total?`, t.cf[4], `The last cumulative frequency is the total: ${t.cf[4]}.`); },
    r => { const t = cfTable(r); return N(`A cumulative frequency table for the marks of some students is: ${cfText(t)}. How many students scored more than 20 marks but at most 40 marks?`, t.cf[3] - t.cf[1], `${t.cf[3]} − ${t.cf[1]} = ${t.cf[3] - t.cf[1]}.`); },
    r => { const t = cfTable(r); return N(`A cumulative frequency table for the marks of some students is: ${cfText(t)}. How many students scored more than 30 marks?`, t.cf[4] - t.cf[2], `${t.cf[4]} − ${t.cf[2]} = ${t.cf[4] - t.cf[2]}.`); },
    r => { const n = r.pick([40, 60, 80, 100, 120]); return N(`The scores of ${n} students are shown on a cumulative frequency curve. The median is the value at which the cumulative frequency is what number?`, n / 2, `The median is the middle value, so the cumulative frequency is ${n} ÷ 2 = ${n / 2}.`); },
    r => { const n = r.pick([40, 60, 80, 100, 120]); return N(`The scores of ${n} students are shown on a cumulative frequency curve. At what cumulative frequency do you read off the lower quartile?`, n / 4, `The lower quartile is the ¼ point: ${n} ÷ 4 = ${n / 4}.`); },
    r => { const n = r.pick([40, 60, 80, 100, 120]); return N(`The scores of ${n} students are shown on a cumulative frequency curve. At what cumulative frequency do you read off the upper quartile?`, 3 * n / 4, `The upper quartile is the ¾ point: 3 × ${n} ÷ 4 = ${3 * n / 4}.`); },
    r => { const n = r.pick([40, 50, 80, 100, 200]), p = r.pick([10, 20, 25, 75, 90]); return N(`A cumulative frequency curve is drawn for ${n} students. How many students have scores below the ${p}th percentile?`, n * p / 100, `${p}% of ${n} = ${n * p / 100}.`); },
    r => { const t = cfTable(r); return N(`A frequency table for marks has class frequencies ${t.f.join(', ')} for the classes 0 – 10, 10 – 20, 20 – 30, 30 – 40 and 40 – 50. What is the cumulative frequency at the end of the 30 – 40 class?`, t.cf[3], `${t.f.slice(0, 4).join(' + ')} = ${t.cf[3]}.`); },
    r => { const t = cfTable(r); const x = t.ub[r.int(0, 3)]; return N(`A cumulative frequency table shows: ${cfText(t)}. What percentage of the students scored at most ${x}? Give your answer correct to 1 decimal place.`, rd(t.cf[t.ub.indexOf(x)] / t.cf[4] * 100, 1), `${t.cf[t.ub.indexOf(x)]} ÷ ${t.cf[4]} × 100% = ${rd(t.cf[t.ub.indexOf(x)] / t.cf[4] * 100, 1)}%.`); },
    r => { const n = r.pick([40, 60, 80, 100]), p = r.pick([10, 20, 30]); return N(`The scores of ${n} students are shown on a cumulative frequency curve. ${p}% of the students scored above a certain mark. At what cumulative frequency do you read off that mark?`, n * (100 - p) / 100, `${100 - p}% of ${n} students scored below it: ${n * (100 - p) / 100}.`); }
  ], word: [
    r => { const t = cfTable(r); return N(`The times, in minutes, that ${t.cf[4]} customers waited in a shop are summarised as: ${t.ub.map((u, i) => `≤ ${u / 10}: ${t.cf[i]}`).join('; ')}. How many customers waited more than 3 minutes?`, t.cf[4] - t.cf[2], `${t.cf[4]} − ${t.cf[2]} = ${t.cf[4] - t.cf[2]}.`); },
    r => { const n = r.pick([60, 80, 100, 120]); return N(`A cumulative frequency curve shows the heights of ${n} students. Half of the students are shorter than the median height. How many students are shorter than the median?`, n / 2, `Half of ${n} is ${n / 2}.`); },
    r => { const n = r.pick([80, 100, 200]), p = r.pick([20, 25, 40]); return N(`${n} athletes ran a race. ${p}% of them finished in less than 15 minutes. How many athletes finished in less than 15 minutes?`, n * p / 100, `${p}% of ${n} = ${n * p / 100}.`); },
    r => { const t = cfTable(r); return N(`A school records the marks of its students: ${cfText(t)}. How many students scored between 10 and 30 marks (more than 10, up to 30)?`, t.cf[2] - t.cf[0], `${t.cf[2]} − ${t.cf[0]} = ${t.cf[2] - t.cf[0]}.`); },
    r => { const n = r.pick([60, 80, 100, 120]); return N(`A teacher draws a cumulative frequency curve for ${n} students. The interquartile range is the difference between the cumulative frequencies at the two quartiles. How many students lie between the lower quartile and the upper quartile?`, n / 2, `Between the two quartiles lie ${n} ÷ 2 = ${n / 2} students.`); }
  ]});

  /* ---- Range, quartiles and percentiles ---- */
  gyms.push({id: 'G2.4.data-analysis-measures-of-spread.2', plain: [
    r => { const d = data(r, 9, 10, 60); return N(`Find the range of ${list(d)}.`, Math.max(...d) - Math.min(...d), `Range = ${Math.max(...d)} − ${Math.min(...d)} = ${Math.max(...d) - Math.min(...d)}.`); },
    r => { const d = data(r, 9, 10, 60), q = quart(d); return N(`Find the lower quartile of ${list(d)}.`, q.q1, `In order: ${d.slice().sort((a, b) => a - b).join(', ')}. The lower quartile is the median of the lower half: ${q.q1}.`); },
    r => { const d = data(r, 9, 10, 60), q = quart(d); return N(`Find the upper quartile of ${list(d)}.`, q.q3, `In order: ${d.slice().sort((a, b) => a - b).join(', ')}. The upper quartile is the median of the upper half: ${q.q3}.`); },
    r => { const d = data(r, 11, 10, 80), q = quart(d); return N(`Find the interquartile range of ${list(d)}.`, q.q3 - q.q1, `In order: ${d.slice().sort((a, b) => a - b).join(', ')}. Q1 = ${q.q1}, Q3 = ${q.q3}. IQR = ${q.q3 - q.q1}.`); },
    r => { const d = data(r, 8, 10, 60), q = quart(d); return N(`Find the median of ${list(d)}.`, q.med, `In order: ${d.slice().sort((a, b) => a - b).join(', ')}. The median is ${q.med}.`); },
    r => { const n = r.pick([20, 40, 50, 80, 100]), p = r.pick([10, 25, 50, 75, 90]); return N(`In a group of ${n} students, a student is at the ${p}th percentile. How many students scored lower than this student?`, n * p / 100, `${p}% of ${n} = ${n * p / 100}.`); },
    r => { const n = r.pick([20, 40, 60, 80]), p = r.pick([25, 50, 75, 90]); return N(`The ${p}th percentile of ${n} ordered values is found. Which position in the ordered list is this value? (Use ${p}% of ${n}.)`, n * p / 100, `Position = ${p}/100 × ${n} = ${n * p / 100}.`); },
    r => { const a = r.int(10, 30), b = a + r.int(10, 30); return N(`The lower quartile of a data set is ${a} and the upper quartile is ${b}. Find the interquartile range.`, b - a, `IQR = ${b} − ${a} = ${b - a}.`); },
    r => { const d = data(r, 7, 5, 50), q = quart(d); return N(`For the data ${list(d)}, find the median minus the lower quartile.`, q.med - q.q1, `In order: ${d.slice().sort((a, b) => a - b).join(', ')}. Median = ${q.med}, Q1 = ${q.q1}. Difference = ${q.med - q.q1}.`); },
    r => { const lo = r.int(5, 20), hi = r.int(60, 99); return N(`The smallest value in a data set is ${lo} and the largest is ${hi}. Find the range.`, hi - lo, `Range = ${hi} − ${lo} = ${hi - lo}.`); }
  ], word: [
    r => { const d = data(r, 11, 20, 90), q = quart(d); return N(`The marks of 11 students are ${list(d)}. Find the interquartile range.`, q.q3 - q.q1, `In order: ${d.slice().sort((a, b) => a - b).join(', ')}. Q1 = ${q.q1}, Q3 = ${q.q3}. IQR = ${q.q3 - q.q1}.`); },
    r => { const d = data(r, 9, 5, 40), q = quart(d); return N(`The waiting times, in minutes, of 9 patients are ${list(d)}. Find the range of the waiting times.`, Math.max(...d) - Math.min(...d), `Range = ${Math.max(...d)} − ${Math.min(...d)} = ${Math.max(...d) - Math.min(...d)} minutes.`); },
    r => { const n = r.pick([40, 60, 80, 100]), p = r.pick([25, 50, 75, 90]); return N(`${n} runners finish a race. Mei finishes at the ${p}th percentile of times, meaning ${p}% of the runners were faster. How many runners were faster than Mei?`, n * p / 100, `${p}% of ${n} = ${n * p / 100}.`); },
    r => { const d = data(r, 8, 20, 90), q = quart(d); return N(`The ages of 8 members of a club are ${list(d)}. Find the median age.`, q.med, `In order: ${d.slice().sort((a, b) => a - b).join(', ')}. The median is ${q.med}.`); },
    r => { const d = data(r, 9, 10, 70), q = quart(d); return N(`Nine test marks are ${list(d)}. Find the upper quartile.`, q.q3, `In order: ${d.slice().sort((a, b) => a - b).join(', ')}. The upper quartile is ${q.q3}.`); }
  ]});

  /* ---- Box-and-whisker plots ---- */
  const five = r => { const mn = r.int(5, 20), q1 = mn + r.int(4, 14), md = q1 + r.int(3, 12), q3 = md + r.int(3, 14), mx = q3 + r.int(4, 18); return {mn, q1, md, q3, mx}; };
  const fiveText = f => `minimum ${f.mn}, lower quartile ${f.q1}, median ${f.md}, upper quartile ${f.q3}, maximum ${f.mx}`;
  gyms.push({id: 'G2.4.data-analysis-measures-of-spread.3', plain: [
    r => { const f = five(r); return N(`A box-and-whisker plot has: ${fiveText(f)}. Find the range.`, f.mx - f.mn, `Range = ${f.mx} − ${f.mn} = ${f.mx - f.mn}.`); },
    r => { const f = five(r); return N(`A box-and-whisker plot has: ${fiveText(f)}. Find the interquartile range (the width of the box).`, f.q3 - f.q1, `IQR = ${f.q3} − ${f.q1} = ${f.q3 - f.q1}.`); },
    r => { const f = five(r); return N(`A box-and-whisker plot has: ${fiveText(f)}. What percentage of the data lies between the lower quartile and the upper quartile?`, 50, 'The box covers the middle half of the data, which is 50%.'); },
    r => { const n = r.pick([40, 60, 80, 100]); return N(`A box-and-whisker plot is drawn for ${n} values. How many values lie above the upper quartile?`, n / 4, `A quarter of the data lies above the upper quartile: ${n} ÷ 4 = ${n / 4}.`); },
    r => { const n = r.pick([40, 60, 80, 100]); return N(`A box-and-whisker plot is drawn for ${n} values. How many values lie below the median?`, n / 2, `Half the data lies below the median: ${n} ÷ 2 = ${n / 2}.`); },
    r => { const f = five(r); return N(`A box-and-whisker plot has: ${fiveText(f)}. Find the length of the upper whisker (from the upper quartile to the maximum).`, f.mx - f.q3, `${f.mx} − ${f.q3} = ${f.mx - f.q3}.`); },
    r => { const f = five(r); return N(`A box-and-whisker plot has: ${fiveText(f)}. Find the length of the lower whisker (from the minimum to the lower quartile).`, f.q1 - f.mn, `${f.q1} − ${f.mn} = ${f.q1 - f.mn}.`); },
    r => { const a = r.int(8, 20), b = a + r.int(3, 10); return N(`Class A has an interquartile range of ${b} marks and class B has an interquartile range of ${a} marks. How much larger is the interquartile range of class A?`, b - a, `${b} − ${a} = ${b - a}.`); },
    r => { const f = five(r), k = r.int(2, 9); return N(`A box-and-whisker plot has: ${fiveText(f)}. Every value is increased by ${k}. Find the new median.`, f.md + k, `The median increases by ${k}: ${f.md} + ${k} = ${f.md + k}.`); },
    r => { const f = five(r), k = r.int(2, 4); return N(`A box-and-whisker plot has: ${fiveText(f)}. Every value is multiplied by ${k}. Find the new interquartile range.`, (f.q3 - f.q1) * k, `The IQR is multiplied by ${k}: ${f.q3 - f.q1} × ${k} = ${(f.q3 - f.q1) * k}.`); }
  ], word: [
    r => { const f = five(r); return N(`The marks of a class are shown in a box-and-whisker plot with ${fiveText(f)}. Find the range of the marks.`, f.mx - f.mn, `${f.mx} − ${f.mn} = ${f.mx - f.mn}.`); },
    r => { const f = five(r); return N(`The times taken by runners are shown in a box-and-whisker plot with ${fiveText(f)} (in seconds). Find the interquartile range, in seconds.`, f.q3 - f.q1, `${f.q3} − ${f.q1} = ${f.q3 - f.q1} seconds.`); },
    r => { const n = r.pick([40, 80, 120]); return N(`${n} students sat a test. The box-and-whisker plot shows the upper quartile is 68 marks. How many students scored more than 68 marks?`, n / 4, `A quarter of ${n} students scored above the upper quartile: ${n / 4}.`); },
    r => { const n = r.pick([60, 80, 100]); return N(`A box-and-whisker plot for the heights of ${n} plants shows a median of 30 cm. How many plants are shorter than 30 cm?`, n / 2, `Half of the ${n} plants lie below the median: ${n / 2}.`); },
    r => { const a = r.int(5, 15), b = a + r.int(4, 12), c = r.int(2, 6); return N(`Shop A's daily sales have an interquartile range of \\$${b}00 and shop B's have \\$${a}00. How many hundred dollars larger is shop A's interquartile range? (Give the number of hundreds.)`, b - a, `${b} − ${a} = ${b - a} hundred dollars.`); }
  ]});

  /* ---- Standard deviation ---- */
  gyms.push({id: 'G2.4.data-analysis-measures-of-spread.4', plain: [
    r => { const d = data(r, 5, 4, 20); return N(`Find the standard deviation of ${list(d)}, correct to 2 decimal places.`, rd(sd(d), 2), `Mean = ${rd(d.reduce((a, b) => a + b, 0) / 5, 2)}. Standard deviation = ${rd(sd(d), 2)}.`); },
    r => N('Find the standard deviation of 2, 4, 4, 4, 5, 5, 7, 9.', 2, 'The mean is 5 and the sum of squared differences is 32, so the variance is 32 ÷ 8 = 4 and the standard deviation is 2.'),
    r => { const n = r.int(5, 10), m = r.int(8, 30), s = r.int(2, 6); return N(`For ${n} numbers, the sum is ${n * m} and the sum of squares is ${n * (s * s + m * m)}. Find the standard deviation.`, s, `Mean = ${m}. Variance = ${n * (s * s + m * m)}/${n} − ${m}² = ${s * s}. Standard deviation = ${s}.`); },
    r => { const n = r.int(4, 10), m = r.int(8, 30); return N(`The sum of ${n} numbers is ${n * m}. Find their mean.`, m, `Mean = ${n * m} ÷ ${n} = ${m}.`); },
    r => { const s = r.int(2, 8), k = r.int(2, 9); return N(`A set of numbers has a standard deviation of ${s}. Each number is increased by ${k}. Find the new standard deviation.`, s, 'Adding the same number to every value does not change the spread, so the standard deviation stays the same.'); },
    r => { const s = r.int(2, 8), k = r.int(2, 4); return N(`A set of numbers has a standard deviation of ${s}. Each number is multiplied by ${k}. Find the new standard deviation.`, s * k, `Multiplying every value by ${k} multiplies the standard deviation by ${k}: ${s * k}.`); },
    r => { const a = r.pick([5.2, 6.4, 7.8, 8.5]), b = r.pick([2.1, 3.3, 4.6, 5.0]); return N(`Class A's marks have a standard deviation of ${a} and class B's marks have a standard deviation of ${b}. Find the difference between the two standard deviations.`, rd(a - b, 2), `${a} − ${b} = ${rd(a - b, 2)}.`); },
    r => { const s = r.int(2, 8); return N(`The standard deviation of a set of marks is ${s}. Find the variance.`, s * s, `Variance = ${s}² = ${s * s}.`); },
    r => { const v = r.pick([4, 9, 16, 25, 36, 49]); return N(`The variance of a set of numbers is ${v}. Find the standard deviation.`, Math.sqrt(v), `Standard deviation = √${v} = ${Math.sqrt(v)}.`); },
    r => { const d = data(r, 4, 3, 15); return N(`Find the standard deviation of ${list(d)}, correct to 2 decimal places.`, rd(sd(d), 2), `Standard deviation = ${rd(sd(d), 2)}.`); }
  ], word: [
    r => { const d = data(r, 5, 50, 90); return N(`A student's marks in five tests are ${list(d)}. Find the standard deviation, correct to 2 decimal places.`, rd(sd(d), 2), `Standard deviation = ${rd(sd(d), 2)}.`); },
    r => { const n = r.int(6, 12), m = r.int(50, 80), s = r.int(3, 8); return N(`The masses of ${n} parcels have a total of ${n * m} kg and the sum of the squares of the masses is ${n * (s * s + m * m)}. Find the standard deviation of the masses, in kg.`, s, `Variance = ${n * (s * s + m * m)}/${n} − ${m}² = ${s * s}. Standard deviation = ${s} kg.`); },
    r => { const s = r.int(3, 9), k = r.int(2, 10); return N(`The test marks of a class have a standard deviation of ${s}. The teacher adds ${k} marks to every student's score. What is the new standard deviation?`, s, 'Adding the same amount to every score does not change the spread.'); },
    r => { const a = r.pick([4.2, 5.5, 6.1]), b = r.pick([7.3, 8.4, 9.0]); return N(`Team A's times have a standard deviation of ${a} seconds and team B's have ${b} seconds. Find the difference in their standard deviations, in seconds.`, rd(b - a, 2), `${b} − ${a} = ${rd(b - a, 2)}.`); },
    r => { const d = data(r, 4, 20, 40); return N(`The heights, in cm, of four plants are ${list(d)}. Find the standard deviation, correct to 2 decimal places.`, rd(sd(d), 2), `Standard deviation = ${rd(sd(d), 2)} cm.`); }
  ]});

  /* ---- Chords of a circle ---- */
  const CH = [[5, 12, 13], [3, 4, 5], [8, 15, 17], [7, 24, 25], [6, 8, 10]];                   // distance from the centre, half the chord, radius
  gyms.push({id: 'G2.4.properties-of-circles.1', plain: [
    r => { const t = r.pick(CH); return N(`A chord of length ${2 * t[1]} cm is in a circle of radius ${t[2]} cm. Find the perpendicular distance from the centre to the chord, in cm.`, t[0], `The perpendicular from the centre bisects the chord. d² = ${t[2]}² − ${t[1]}² = ${t[0] ** 2}, so d = ${t[0]} cm.`); },
    r => { const t = r.pick(CH); return N(`A chord is ${t[0]} cm from the centre of a circle of radius ${t[2]} cm. Find the length of the chord, in cm.`, 2 * t[1], `Half the chord² = ${t[2]}² − ${t[0]}² = ${t[1] ** 2}, so half the chord is ${t[1]} cm and the chord is ${2 * t[1]} cm.`); },
    r => { const t = r.pick(CH); return N(`A chord of length ${2 * t[1]} cm is ${t[0]} cm from the centre of a circle. Find the radius of the circle, in cm.`, t[2], `r² = ${t[0]}² + ${t[1]}² = ${t[2] ** 2}, so r = ${t[2]} cm.`); },
    r => { const c = r.int(4, 20) * 2; return N(`The perpendicular from the centre of a circle meets a chord of length ${c} cm at M. Find the length of one half of the chord, in cm.`, c / 2, `The perpendicular from the centre bisects the chord: ${c} ÷ 2 = ${c / 2} cm.`); },
    r => { const d = r.int(3, 12); return N(`Two equal chords AB and CD lie in the same circle. The distance from the centre to AB is ${d} cm. Find the distance from the centre to CD, in cm.`, d, 'Equal chords are the same distance from the centre.'); },
    r => { const a = r.int(20, 80) * 2; return N(`OM is perpendicular to the chord AB of a circle with centre O. Angle AOB = ${a}°. Find angle AOM, in degrees.`, a / 2, `OM bisects angle AOB: ${a} ÷ 2 = ${a / 2}°.`); },
    r => { const a = r.int(20, 70); return N(`A and B are on a circle with centre O. Angle OAB = ${a}°. Find angle AOB, in degrees.`, 180 - 2 * a, `Triangle OAB is isosceles (OA = OB): AOB = 180 − 2 × ${a} = ${180 - 2 * a}°.`); },
    r => { const t = r.pick(CH); return N(`A chord of length ${2 * t[1]} cm is in a circle of radius ${t[2]} cm. Find the greatest depth of the minor segment, in cm.`, t[2] - t[0], `The depth = radius − distance from centre = ${t[2]} − ${t[0]} = ${t[2] - t[0]} cm.`); },
    r => { const r0 = r.int(5, 20); return N(`The longest chord in a circle of radius ${r0} cm is a diameter. Find its length, in cm.`, 2 * r0, `The diameter is 2 × ${r0} = ${2 * r0} cm.`); },
    r => { const a = r.int(40, 120); return N(`A chord AB of a circle with centre O subtends an angle of ${a}° at O. The perpendicular from O to AB meets AB at M. Find angle OAM, in degrees.`, 90 - a / 2, `Angle AOM = ${a / 2}°. In the right-angled triangle OMA, angle OAM = 90 − ${a / 2} = ${90 - a / 2}°.`); }
  ], word: [
    r => { const t = r.pick(CH); return N(`A circular window has a radius of ${t[2]} cm. A horizontal bar is fixed ${t[0]} cm below the centre. Find the length of the bar, in cm.`, 2 * t[1], `Half the bar² = ${t[2]}² − ${t[0]}² = ${t[1] ** 2}, so the bar is ${2 * t[1]} cm.`); },
    r => { const t = r.pick(CH); return N(`A tunnel has a circular cross-section of radius ${t[2]} m. The floor is a chord ${t[0]} m below the centre. Find the width of the floor, in m.`, 2 * t[1], `Half the width² = ${t[2]}² − ${t[0]}² = ${t[1] ** 2}, so the width is ${2 * t[1]} m.`); },
    r => { const t = r.pick(CH); return N(`A round plate has a radius of ${t[2]} cm. A chord of length ${2 * t[1]} cm is drawn on it. How far is the chord from the centre of the plate, in cm?`, t[0], `d² = ${t[2]}² − ${t[1]}² = ${t[0] ** 2}, so d = ${t[0]} cm.`); },
    r => { const t = r.pick(CH); return N(`A circular pond has a radius of ${t[2]} m. A straight path crosses the pond ${t[0]} m from its centre. How long is the part of the path inside the pond, in m?`, 2 * t[1], `The path is a chord. Half its length² = ${t[2]}² − ${t[0]}² = ${t[1] ** 2}, so its length is ${2 * t[1]} m.`); },
    r => { const t = r.pick(CH); return N(`A circular lid has a radius of ${t[2]} cm. A straight cut of length ${2 * t[1]} cm is made across it. Find the depth of the smaller piece at its thickest point, in cm.`, t[2] - t[0], `Depth = radius − distance from centre = ${t[2]} − ${t[0]} = ${t[2] - t[0]} cm.`); }
  ]});

  /* ---- Angles at the centre and circumference ---- */
  gyms.push({id: 'G2.4.properties-of-circles.2', plain: [
    r => { const a = r.int(15, 70); return N(`A, B and C are on a circle with centre O. Angle ACB = ${a}°. Find angle AOB, in degrees.`, 2 * a, `The angle at the centre is twice the angle at the circumference: 2 × ${a} = ${2 * a}°.`); },
    r => { const a = r.int(20, 80) * 2; return N(`A, B and C are on a circle with centre O. Angle AOB = ${a}°. Find angle ACB, in degrees.`, a / 2, `The angle at the circumference is half the angle at the centre: ${a} ÷ 2 = ${a / 2}°.`); },
    r => { const a = r.int(20, 70); return N(`AB is a diameter of a circle and C is on the circle. Angle BAC = ${a}°. Find angle ABC, in degrees.`, 90 - a, `Angle ACB = 90° (angle in a semicircle). Angle ABC = 180 − 90 − ${a} = ${90 - a}°.`); },
    r => { const a = r.int(20, 80); return N(`AB is a diameter of a circle and C is on the circle. Find angle ACB, in degrees.`, 90, 'The angle in a semicircle is 90°.'); },
    r => { const a = r.int(20, 80) * 2; return N(`A, B and C are on a circle with centre O, with C on the major arc AB. Angle AOB = ${a}°. Find angle OAB, in degrees.`, 90 - a / 2, `Triangle OAB is isosceles: OAB = (180 − ${a}) ÷ 2 = ${90 - a / 2}°.`); },
    r => { const a = r.int(20, 50); return N(`A, B and C are on a circle with centre O. Angle ACB = ${a}°. Find angle OAB, in degrees.`, 90 - a, `Angle AOB = ${2 * a}°. In isosceles triangle OAB, OAB = (180 − ${2 * a}) ÷ 2 = ${90 - a}°.`); },
    r => { const a = r.int(2, 6) * 20; return N(`The reflex angle AOB at the centre of a circle is ${a + 180}°. Find the angle ACB at the circumference on the minor arc AB, in degrees.`, (a + 180) / 2, `The angle at the circumference is half the angle at the centre: ${(a + 180)} ÷ 2 = ${(a + 180) / 2}°.`); },
    r => { const a = r.int(25, 65); return N(`PQ is a diameter of a circle and R lies on the circle. Angle PQR = ${a}°. Find angle QPR, in degrees.`, 90 - a, `Angle PRQ = 90°, so QPR = 180 − 90 − ${a} = ${90 - a}°.`); }
  ], word: [
    r => { const a = r.int(20, 70); return N(`A spotlight at C on the edge of a circular stage sees the ends A and B of a stage-front chord at an angle ACB of ${a}°. Find the angle AOB at the centre O of the stage, in degrees.`, 2 * a, `Angle at the centre = 2 × ${a} = ${2 * a}°.`); },
    r => { const a = r.int(20, 70); return N(`A circular fountain has diameter AB. A person stands at C on the edge so that angle CAB is ${a}°. Find angle ABC, in degrees.`, 90 - a, `Angle ACB = 90°, so ABC = 90 − ${a} = ${90 - a}°.`); },
    r => { const a = r.int(30, 80) * 2; return N(`Three posts A, B and C stand on the edge of a circular field with centre O. Angle AOB = ${a}°. Find angle ACB, in degrees.`, a / 2, `${a} ÷ 2 = ${a / 2}°.`); },
    r => { const a = r.int(20, 50); return N(`On a circular clock face with centre O, points A, B and C are on the edge. Angle ACB = ${a}°. Find the angle at the centre subtended by AB, in degrees.`, 2 * a, `2 × ${a} = ${2 * a}°.`); },
    r => { const a = r.int(20, 50); return N(`A circular tower base has centre O. A, B and C are points on its edge with angle ACB = ${a}°. Find angle OBA, in degrees.`, 90 - a, `Angle AOB = ${2 * a}°; triangle OAB is isosceles, so OBA = (180 − ${2 * a}) ÷ 2 = ${90 - a}°.`); }
  ]});

  /* ---- Angles in the same and opposite segments (cyclic quadrilaterals) ---- */
  gyms.push({id: 'G2.4.properties-of-circles.3', plain: [
    r => { const a = r.int(20, 80); return N(`A, B, C and D lie on a circle. Angle ABD = ${a}°. Find angle ACD (both in the same segment), in degrees.`, a, 'Angles in the same segment are equal.'); },
    r => { const a = r.int(50, 130); return N(`ABCD is a cyclic quadrilateral. Angle ABC = ${a}°. Find angle ADC, in degrees.`, 180 - a, `Opposite angles of a cyclic quadrilateral add up to 180°: 180 − ${a} = ${180 - a}°.`); },
    r => { const a = r.int(50, 130); return N(`ABCD is a cyclic quadrilateral. Angle BAD = ${a}°. Find angle BCD, in degrees.`, 180 - a, `180 − ${a} = ${180 - a}°.`); },
    r => { const a = r.int(50, 130); return N(`ABCD is a cyclic quadrilateral and BC is extended to E. Angle ADC = ${a}°. Find the exterior angle DCE, in degrees.`, a, 'The exterior angle of a cyclic quadrilateral equals the interior opposite angle.'); },
    r => { const a = r.int(2, 4), x = r.int(10, 30), u = a * x + 10, v = 180 - u, y = (v + 0 - 10) / 1; return N(`Opposite angles of a cyclic quadrilateral are $(${a}x + 10)°$ and ${v}°. Find $x$.`, x, `${a}x + 10 + ${v} = 180, so ${a}x = ${a * x} and x = ${x}.`); },
    r => { const a = r.int(20, 80); return N(`A, B, C and D lie on a circle. Angle BAC = ${a}° and angle BDC is in the same segment. Find angle BDC, in degrees.`, a, 'Angles in the same segment are equal.'); },
    r => { const a = r.int(40, 100), b = r.int(40, 100); return N(`ABCD is a cyclic quadrilateral with angle A = ${a}° and angle B = ${b}°. Find angle C, in degrees.`, 180 - a, `Angle C is opposite angle A: 180 − ${a} = ${180 - a}°.`); },
    r => { const a = r.int(40, 100), b = r.int(40, 100); return N(`ABCD is a cyclic quadrilateral with angle A = ${a}° and angle B = ${b}°. Find angle D, in degrees.`, 180 - b, `Angle D is opposite angle B: 180 − ${b} = ${180 - b}°.`); },
    r => { const a = r.int(30, 70); return N(`PQRS is a cyclic quadrilateral. Angle PQR = ${2 * a}° and angle QRS = ${a + 40}°. Find angle PSR, in degrees.`, 180 - 2 * a, `Angle PSR is opposite angle PQR: 180 − ${2 * a} = ${180 - 2 * a}°.`); }
  ], word: [
    r => { const a = r.int(60, 120); return N(`Four posts A, B, C and D stand on the edge of a circular field. Angle ABC = ${a}°. Find angle ADC, in degrees.`, 180 - a, `Opposite angles of a cyclic quadrilateral add up to 180°: 180 − ${a} = ${180 - a}°.`); },
    r => { const a = r.int(30, 70); return N(`Two people stand at C and D on the same side of a chord AB of a circular pond. Angle ACB = ${a}°. Find angle ADB, in degrees.`, a, 'Angles in the same segment are equal.'); },
    r => { const a = r.int(60, 120); return N(`A cyclic quadrilateral ABCD is marked on a circular lawn. Angle BAD = ${a}°. Find angle BCD, in degrees.`, 180 - a, `180 − ${a} = ${180 - a}°.`); },
    r => { const a = r.int(60, 120); return N(`A cyclic quadrilateral ABCD is drawn on a circular tile, with side BC extended to E. Angle BAD = ${a}°. Find angle DCE, in degrees.`, a, 'The exterior angle equals the interior opposite angle.'); },
    r => { const a = r.int(40, 80), b = r.int(60, 100); return N(`A cyclic quadrilateral has angles A = ${a}° and B = ${b}° (in order around the circle). Find angle C, in degrees.`, 180 - a, `Angle C is opposite angle A: 180 − ${a} = ${180 - a}°.`); }
  ]});

  /* ---- Tangents to a circle ---- */
  const TG = [[8, 15, 17], [5, 12, 13], [7, 24, 25], [3, 4, 5], [6, 8, 10]];                   // radius, tangent length, OP
  gyms.push({id: 'G2.4.properties-of-circles.4', plain: [
    r => { const t = r.pick(TG); return N(`A tangent from P touches a circle of centre O and radius ${t[0]} cm at A. OP = ${t[2]} cm. Find the length of the tangent PA, in cm.`, t[1], `OA ⟂ PA, so PA² = ${t[2]}² − ${t[0]}² = ${t[1] ** 2} and PA = ${t[1]} cm.`); },
    r => { const t = r.pick(TG); return N(`A tangent PA of length ${t[1]} cm touches a circle of radius ${t[0]} cm at A. Find the distance OP from P to the centre O, in cm.`, t[2], `OP² = ${t[0]}² + ${t[1]}² = ${t[2] ** 2}, so OP = ${t[2]} cm.`); },
    r => { const t = r.pick(TG); return N(`A tangent PA of length ${t[1]} cm touches a circle at A. OP = ${t[2]} cm. Find the radius of the circle, in cm.`, t[0], `r² = ${t[2]}² − ${t[1]}² = ${t[0] ** 2}, so r = ${t[0]} cm.`); },
    r => { const l = r.int(5, 25); return N(`Tangents PA and PB are drawn from P to a circle. PA = ${l} cm. Find PB, in cm.`, l, 'Tangents from an external point are equal in length.'); },
    r => { const a = r.int(20, 60); return N(`PA is a tangent to a circle with centre O. Angle APO = ${a}°. Find angle AOP, in degrees.`, 90 - a, `Angle OAP = 90°, so AOP = 180 − 90 − ${a} = ${90 - a}°.`); },
    r => { const a = r.int(40, 140); return N(`Tangents PA and PB touch a circle with centre O at A and B. Angle AOB = ${a}°. Find angle APB, in degrees.`, 180 - a, `In quadrilateral OAPB, angles OAP and OBP are 90°, so APB = 360 − 90 − 90 − ${a} = ${180 - a}°.`); },
    r => { const a = r.int(30, 80); return N(`A tangent at A and a chord AB of a circle make an angle of ${a}°. Find the angle in the alternate segment, in degrees.`, a, 'The angle between a tangent and a chord equals the angle in the alternate segment.'); },
    r => { const t = r.pick(TG); return N(`Tangents PA and PB are drawn from P to a circle of centre O and radius ${t[0]} cm, with PA = ${t[1]} cm. Find the area of the kite OAPB, in cm².`, t[0] * t[1], `The kite is two right-angled triangles, each of area ½ × ${t[0]} × ${t[1]}. Total = ${t[0] * t[1]} cm².`); },
    r => { const a = r.int(20, 70); return N(`Tangents PA and PB touch a circle at A and B. Angle APB = ${2 * a}°. Find angle PAB, in degrees.`, 90 - a, `Triangle PAB is isosceles (PA = PB): PAB = (180 − ${2 * a}) ÷ 2 = ${90 - a}°.`); },
    r => { const a = r.int(30, 80); return N(`A tangent PT touches a circle at T. Angle between the tangent and the radius OT is what size, in degrees?`, 90, 'A tangent is perpendicular to the radius at the point of contact.'); }
  ], word: [
    r => { const t = r.pick(TG); return N(`A rope is stretched straight from a point P to touch a circular tank of radius ${t[0]} m at A. P is ${t[2]} m from the centre of the tank. Find the length of rope PA, in m.`, t[1], `PA² = ${t[2]}² − ${t[0]}² = ${t[1] ** 2}, so PA = ${t[1]} m.`); },
    r => { const t = r.pick(TG); return N(`A lamp P is ${t[2]} m from the centre of a round pillar of radius ${t[0]} m. The two tangents from P to the pillar have equal length. Find the total length of the two tangents, in m.`, 2 * t[1], `Each tangent is √(${t[2]}² − ${t[0]}²) = ${t[1]} m, so the total is ${2 * t[1]} m.`); },
    r => { const a = r.int(30, 80); return N(`A straight road touches a circular lake at T. A path from T to a point R on the lake makes an angle of ${a}° with the road. Find the angle in the alternate segment, in degrees.`, a, 'The tangent-chord angle equals the angle in the alternate segment.'); },
    r => { const a = r.int(40, 130); return N(`Two straight fences touch a circular pond at A and B and meet at P. The centre of the pond is O and angle AOB = ${a}°. Find the angle APB between the fences, in degrees.`, 180 - a, `APB = 360 − 90 − 90 − ${a} = ${180 - a}°.`); },
  ]});

  return gyms;
};
