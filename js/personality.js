/* Gym Quest: every student expert has one fixed personality (picked from the gym id) and talks in speech bubbles,
   on the map and during the quiz. Lines are generic on purpose: they never hint at an answer.
   GQPersona.of(gymId) -> {type, tag};  GQPersona.say(gymId, kind, salt, studentName) -> a line.
   kinds: greet idle start think last right streak wrong win lose beaten soon */
(function(){
'use strict';
var TYPES = ['cheer', 'strict', 'sleepy', 'show', 'nerd', 'sport', 'drama', 'chill'];
var TAGS = {cheer: 'The Cheerleader', strict: 'The Strict Prefect', sleepy: 'The Sleepy Genius', show: 'The Show-off', nerd: 'The Maths Nerd', sport: 'The Sports Captain', drama: 'The Drama Star', chill: 'The Chill One'};
var L = {
  cheer: {
    greet: ['Hi hi! Ready to shine? ✨', 'Yay, a challenger! Let\'s go!', 'You\'ve got this, {n}! Come in!'],
    idle: ['Gooo maths! 📣', 'You can do it!', 'Believe in yourself, {n}!', 'Today is a great day for maths!'],
    start: ['Big smile! Question 1 coming up!', 'Here we go, {n}! You\'re awesome!', 'Deep breath… and go! 🌟'],
    think: ['Take your time, you\'ve got this!', 'I can tell you\'re close!', 'Cheering for you! 📣', 'Think it through, {n}!'],
    last: ['Final one! Finish strong! 🌟', 'Last question! I believe in you!'],
    right: ['Yesss! Amazing! 🎉', 'Woohoo, correct!', 'That\'s my star! ⭐'],
    streak: ['You\'re on FIRE, {n}! 🔥', 'Another one! Unstoppable!'],
    wrong: ['Oops! That\'s okay, learn and go!', 'So close! Chin up!', 'Mistakes help us grow! 💪'],
    win: ['PERFECT! I\'m so proud! 🏅', '10 out of 10?! Amazing, {n}!'],
    lose: ['Great effort! Try again, you\'ll nail it!', 'So close! Come back stronger!'],
    beaten: ['You already won, superstar! Rematch? 🎉', 'Back for more? Love it!'],
    soon: ['My questions are coming soon! 🚧', 'Still preparing, come back soon!']
  },
  strict: {
    greet: ['Welcome. Pay attention.', 'Sit up. Let\'s begin.', 'No guessing. Show your working.'],
    idle: ['Eyes on the question.', 'Check your answer twice.', 'Neat working, neat mind.', 'Attention to detail wins.'],
    start: ['Read the question carefully.', 'Begin. No rushing, {n}.', 'Question 1. Focus.'],
    think: ['Read it again. Carefully.', 'Signs! Units! Check them.', 'Do not rush.', 'Is that really your answer?'],
    last: ['Final question. Stay sharp.', 'Last one. Do not slip now.'],
    right: ['Correct. Continue.', 'Good. Maintain focus.', 'Acceptable. Well done.'],
    streak: ['Consistent. Impressive, {n}.', 'Well done. Keep it up.'],
    wrong: ['Incorrect. Study the working.', 'Careless? Learn from it.', 'Review it, then try again.'],
    win: ['Flawless. You earned this badge. 🏅', 'Full marks. Excellent, {n}.'],
    lose: ['Not yet. Review, then return.', 'Perfection takes practice.'],
    beaten: ['You have passed. Revising? Good.', 'Back again? Diligent.'],
    soon: ['Questions under review. Return later.', 'Not ready yet. Be patient.']
  },
  sleepy: {
    greet: ['*yawn* oh, a challenger…', 'Hmm? Oh hi… let\'s do maths.', 'I was napping… ready when you are.'],
    idle: ['Zzz… maths… zzz…', '*yawn*', 'Five more minutes…', 'I solved it in my dreams 💤'],
    start: ['Okay… first one… *yawn*', 'Let\'s go. Slowly.', 'Wake me if you need help.'],
    think: ['Take your time… no rush… zzz', 'Hmm, interesting one…', 'I\'d nap on it, then answer.', '*sips kopi* ☕'],
    last: ['Last one… finally. Nearly nap time.', 'One more… you can do it.'],
    right: ['Mm, nice. Correct.', 'Oh, right! Good one.', 'Correct… and I barely woke up.'],
    streak: ['Wow, I\'m wide awake now!', 'Hmm, you\'re good, {n}.'],
    wrong: ['Ah… not quite. Happens.', 'Oops. Rest, then retry.', 'Hm, close-ish.'],
    win: ['Wow… 10/10. I\'m awake now! 🏅', 'You beat me, {n}. Nap time.'],
    lose: ['Not this time. Sleep on it, retry.', 'Rest, then try again.'],
    beaten: ['You beat me already… rematch? *yawn*', 'Back? Okay, I\'ll wake up.'],
    soon: ['Questions… not ready. Zzz.', 'Still writing… *yawn*']
  },
  show: {
    greet: ['Behold! The Maths Master! 😎', 'You dare challenge ME?', 'Prepare to be amazed!'],
    idle: ['I got 100% last time. Obviously.', 'Maths is easy… for me. 😎', 'Watch and learn!', 'Ask me anything!'],
    start: ['Let\'s see if you can keep up!', 'Question 1. Easy peasy.', 'Don\'t be nervous, {n}. Okay, maybe a little.'],
    think: ['I solved this in 2 seconds.', 'Need a hint? Too bad.', 'Tick tock…', 'Even I find this one fun.'],
    last: ['The final test! Impress me!', 'Last one! Don\'t embarrass yourself.'],
    right: ['Not bad! Not as good as me.', 'Hmph, correct.', 'Okay, that was cool.'],
    streak: ['Hey! You\'re almost as good as me!', 'Alright, I\'m impressed, {n}.'],
    wrong: ['Ha! Too hard? …sorry.', 'Oops! I\'d never get that wrong.', 'Better luck next time!'],
    win: ['WHAT?! You beat me! 🏅 Respect.', '10/10?! I… I\'m impressed, {n}.'],
    lose: ['Ha! Come back when you\'ve studied.', 'Not enough! Try again, champ.'],
    beaten: ['You beat me once. Luck? Rematch!', 'Back to lose again? 😏'],
    soon: ['My masterpiece questions are coming!', 'Genius takes time. 🚧']
  },
  nerd: {
    greet: ['Fun fact: this gym is my favourite!', 'Hi! Did you know maths is everywhere?', 'Let\'s explore some maths! 🤓'],
    idle: ['Did you know? Pi never ends!', 'Maths is the language of patterns.', 'I love a good formula.', 'Zero was a big invention!'],
    start: ['Great! Let\'s begin systematically.', 'Ooh, question one. Exciting!', 'Remember: set up, then solve.'],
    think: ['Hint: draw a diagram.', 'Try writing out the steps.', 'Which formula fits this?', 'Check units and signs.'],
    last: ['The final question! Use everything!', 'Last one. Think it through.'],
    right: ['Correct! Elegant solution.', 'Precisely! 🤓', 'Yes! Good reasoning.'],
    streak: ['Statistically impressive, {n}!', 'A perfect streak!'],
    wrong: ['Interesting error. Let\'s learn from it.', 'Not quite. Check the working!', 'Ah, a common mistake!'],
    win: ['Q.E.D. Flawless! 🏅', 'Perfect score! Fascinating, {n}.'],
    lose: ['Review the working and retry!', 'Practice makes the pattern clear.'],
    beaten: ['You\'ve mastered this! Revise for fun?', 'Back for more? Love the enthusiasm!'],
    soon: ['I\'m still drafting questions! 📐', 'Peer review in progress. 🚧']
  },
  sport: {
    greet: ['Game on! Let\'s play!', 'Warm up your brain, {n}!', 'Ready? Set? Maths!'],
    idle: ['Maths is a team sport!', 'Stretch those brain muscles! 💪', 'No pain, no gain!', 'Go go go!'],
    start: ['Kick off! Question one!', 'On your marks…', 'Let\'s score some points!'],
    think: ['Eye on the ball!', 'Steady pace, {n}.', 'Don\'t drop the ball now!', 'Focus! You\'re in the zone.'],
    last: ['Final whistle\'s coming! Finish!', 'Last lap! Sprint!'],
    right: ['GOAL! 🥅', 'Nice shot!', 'Score! Keep it up!'],
    streak: ['Hat trick! You\'re on a roll!', 'MVP material, {n}!'],
    wrong: ['Missed it! Shake it off!', 'Fumble! Back in the game.', 'Tough break. Next play!'],
    win: ['CHAMPION! 🏅 Perfect game!', '10/10! Gold medal, {n}!'],
    lose: ['Good game! Train and rematch!', 'Back to training! Next time!'],
    beaten: ['Champ! Rematch? 🏆', 'You won once. Ready for round 2?'],
    soon: ['Training in progress! 🚧', 'Not ready yet, still drawing plays!']
  },
  drama: {
    greet: ['Oh! A visitor! How dramatic!', 'At last, you have arrived…', 'Welcome, brave soul!'],
    idle: ['The suspense is killing me!', 'Maths… the final frontier!', 'Oh, the drama of equations!', 'Will you succeed? Will you fail?'],
    start: ['And so… it begins!', 'The curtain rises, {n}!', 'Question one! Gasp!'],
    think: ['The tension! The suspense!', 'Will it be… correct?', 'Dramatic pause…', 'Oh, what will you answer?!'],
    last: ['The FINAL question! Gasp!', 'Last act! Everything is on the line!'],
    right: ['Magnificent! Standing ovation! 👏', 'Bravo! Encore!', 'Oh, the brilliance!'],
    streak: ['A masterpiece, {n}!', 'Spectacular! Utterly spectacular!'],
    wrong: ['Alas! Tragedy strikes!', 'Oh, the horror! Not quite!', 'Gasp! A plot twist!'],
    win: ['A PERFECT PERFORMANCE! 🏅', 'Bravo, {n}! I might cry!'],
    lose: ['A tragic ending… but there is a sequel!', 'Fear not, the hero returns!'],
    beaten: ['The hero returns! Another act? 🎭', 'You conquered me once! Again?'],
    soon: ['The script is not ready! 🚧', 'Patience! The sequel is coming!']
  },
  chill: {
    greet: ['Hey, welcome. No stress.', 'Yo, ready? Take it easy.', 'Chill, {n}. You got this.'],
    idle: ['Relax. Just do your best.', 'No stress, just maths.', 'Breathe in. Breathe out.', 'Steady lah. 😌'],
    start: ['Alright, easy does it.', 'No pressure, {n}. Go.', 'Q1. Just vibes and logic.'],
    think: ['Take your time, it\'s cool.', 'Breathe. Think. Answer.', 'No rush at all.', 'You\'ll figure it out.'],
    last: ['Last one. Finish it off, easy.', 'Final one. Chill and finish.'],
    right: ['Steady! Nice one.', 'Cool, correct.', 'Smooth! 😌'],
    streak: ['Wah, you\'re on a roll, {n}!', 'Smooth streak. Steady lah!'],
    wrong: ['Aiya, it\'s okay. Next one!', 'No worries. Learn and move on.', 'Happens to everyone.'],
    win: ['Wah, perfect! Respect. 🏅', '10/10. Smooth, {n}.'],
    lose: ['It\'s fine. Try again later.', 'No stress. Rest and retry.'],
    beaten: ['You already won! Come chill? 😌', 'Rematch? Sure, why not.'],
    soon: ['Questions are coming, no rush. 🚧', 'Still cooking, come back later.']
  }
};

function hash(s){ var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function of(id){ var t = TYPES[hash('persona:' + id) % TYPES.length]; return {type: t, tag: TAGS[t]}; }
function say(id, kind, salt, name){
  var p = L[of(id).type], list = p[kind] || p.idle, line = list[hash(id + '|' + kind + '|' + salt) % list.length];
  return line.replace(/\{n\}/g, name || 'friend');
}
window.GQPersona = {of: of, say: say, TYPES: TYPES};
})();
