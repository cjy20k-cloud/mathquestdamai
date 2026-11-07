# Gym Quest

A separate app (own Netlify site) for gym-style maths quizzes. Students make **one locked profile**
(name, stream G1/G2/G3, level Sec 1-4), design a character, travel their stream's continent, and
challenge a **student expert** in each gym. Answer all 10 questions right to earn the gym badge.

## What is in here

| Path | What it is |
|---|---|
| `index.html`, `css/`, `js/app.js` | The app (no build step, no dependencies) |
| `js/avatar.js` | Character art: 2 sexes x 3 outfits, 10 hairstyles, 10 accessories each, skin and hair colours (all drawn in code, glossy cartoon style with dark outlines to match the trailer) |
| `assets/` | Art made with Higgsfield (see *Look and art* below): `trailer.mp4` (8 s loop, no sound), `key-art.jpg`, `world.jpg`, `hero.jpg`, `cast.jpg` |
| `js/world.js` | The walk-around map (canvas): towns, gym buildings, an expert at every door, level gates, continent map, touch D-pad |
| `js/world-data.js` | Generated: 3 continents > towns (topics) > gyms (sub topics) |
| `js/banks.js` | Generated: the fixed 20-question bank for every gym that has one |
| `js/backend.js`, `js/config.js` | Leaderboard client. Set `ENDPOINT` in `config.js` |
| `js/classlink.js` | Sends every finished quiz to the main app's class server (see *Class dashboards* below) |
| `apps-script/Code.gs` | Google Apps Script backend (leaderboard and one-profile registry) |
| `tools/build-world.cjs` | Rebuilds `world-data.js` from the main app's `app-catalog.js` |
| `tools/build-banks.cjs` | Rebuilds `banks.js` from the question generators (`tools/g2/`, `tools/g3/`, `tools/g3-extra.cjs`) |
| `tools/check-banks.cjs`, `tools/show-bank.cjs` | Check every maths segment renders in KaTeX; print a bank (with options) to proof-read |
| `tools/build-site.cjs` | Netlify build: copies only the app files into `dist/` |

## Rules implemented

* **Profile**: name + stream + level, confirmed once and never editable. With the leaderboard connected the
  server also refuses a name that is already registered ("one profile per student").
* **Continents**: a student only sees their own stream's continent, as a walk-around map (arrow keys / WASD / touch D-pad, Space or A to talk, M for the continent map with tap-to-travel). Each topic is a town, each sub topic a gym building with its student expert at the door. A **List** button switches to a plain list view.
* **Level access**: the map has four zones (Sec 1 at the top). A gate across the main road closes off every zone above the student's level; Sec 4 can enter everything.
* **Character**: boy or girl, 3 outfits (full school uniform, half school uniform, PE uniform); only the head/face is
  customised (10 hairstyles, 10 accessories per sex, plus skin tone and hair colour).
* **Gym**: a student expert asks 10 questions drawn at random from the gym's bank of 20. All 10 right = badge.
* **Question formats**:
  * **G3 (Express)**: every bank is 20 typed-answer questions (numeric keypad, no multiple choice), 14 plain + 6 word
    problems. A quiz draws 3 word problems + 7 plain questions from the 20.
  * **G2 (Normal Academic)**: every bank has 5 word problems and follows the school level: Sec 1 = 20 multiple choice,
    Sec 2 = 10 multiple choice + 10 typed, Sec 3/4 = 20 typed. A quiz always draws 3 word problems.
  * **G1 (Normal Technical)**: same formats as G2 (Sec 1 = 20 multiple choice, Sec 2 = 10 multiple choice + 10 typed, Sec 3/4 = 20
    typed), with 5 word problems per bank and smaller numbers. Eight G1 gyms were written first in `tools/build-banks.cjs`; the rest
    are in `tools/g1/`.

## Deploying

1. **Netlify**: New site from the `mathquestdamai` repo (the app is at the repo root, so leave *Base directory* empty). `netlify.toml` does the rest. If you deploy from the main project instead, set *Base directory* to `gym-quest`.
2. **Leaderboard** (optional until ready): create a Google Sheet > Extensions > Apps Script > paste `apps-script/Code.gs`,
   change `KEY`, then Deploy > Web app (Execute as *Me*, access *Anyone*). Put the `/exec` URL and the same key into
   `js/config.js`. Until then the app works fully, but the leaderboard only uses this device.
3. **Link from the main app**: the main app's sidebars already have a *Gym Quest* link (`ui-system.js` sets `window.MR_GYM_QUEST_URL`, `index-shell.js` reads it). It points at `https://mathquestdamai.netlify.app/`: change that one constant if the Netlify site gets a different address.

## Class dashboards (badges, scores, missed questions)

A student can add a **class code** (the same code they use in the main app) when they make their profile, or later under *My profile > My class*. With a code, `js/classlink.js` sends every finished quiz to the main app's class server (`teacher-dashboard.gs`, URL and key in `js/config.js` as `CLASS_ENDPOINT` / `CLASS_KEY`, the same values the main app uses): gym, score out of 10, whether the badge was earned, and for each wrong answer the question, the right answer and what the student gave. Results that cannot be sent wait in a small outbox on the device and are retried. Adding a code later also sends everything the student has already done.

* **Student**: the main app's *My Progress* page has a *Gym Quest* card (badges collection, every quiz score), looked up by the student's name and class code.
* **Teacher**: the teacher dashboard has a *Gym Quest* panel with a scores heat map (students x gyms, best score, completion rate, average) and a most-missed-questions list that can be filtered by town or student.
* **Completion rate** = badges earned / gyms open to the student (their stream, towns up to their level).
* **Setup**: paste the latest `teacher-dashboard.gs` into the class server's Apps Script and redeploy it as a *new version* (it adds the `GQRes` and `GQQ` tabs, created automatically). Until then the panel says the server needs updating. Use the same name as in the main app so a student appears as one row.

## Look and art

The look comes from a trailer made with Higgsfield: glossy 3D-cartoon, navy-and-gold school uniforms, sky islands, glowing maths symbols.

| Asset | Made with | Used for |
|---|---|---|
| `key-art.jpg` (key art, `gpt_image_2_5`) and `trailer.mp4` (8 s, `kling3_0` image-to-video from the key art) | Higgsfield | Welcome screen background (the video plays muted on a loop; the still shows for reduced motion) |
| `world.jpg` (floating-islands world) | Higgsfield | Page backdrop, continent banners, expert portrait backgrounds |
| `cast.jpg` (eight student experts) | Higgsfield | "Meet the student experts" card; the character art in `avatar.js` follows this style |
| `hero.jpg` | Higgsfield | Backdrop behind the character builder preview |

Everything in `assets/` is about 1.7 MB. `tools/build-site.cjs` copies `assets/` into `dist/`.
The medals are drawn in code by `badgeSVG()` in `js/app.js` (a gem colour and one of eight maths emblems per gym, in the style of the trailer's badge art).
Students who prefer reduced motion get no video, no drifting symbols and no confetti.

## Adding questions

Questions are generated by code so every answer is computed, not typed in by hand. G1 generators live in
`tools/build-banks.cjs` and `tools/g1/` (`sec1`, `sec2`, `sec34`, same template style as G2); the **G2 generators are in `tools/g2/`** (`sec1a-d`, `sec2a-c`, `sec3a-c`, `sec4a-b`; a template returns
`N(question, answer, worked, {wr, f})`, which becomes a typed blank or four options with plausible wrong answers, or `mcq(...)`
for a multiple-choice-only question); the **G3 generators are in `tools/g3/`** (`sec1a/b/c`, `sec2a/b`, `sec3a/b/c`, `sec4`, plus
`parts/`), one `{id, plain: [...], word: [...]}` entry per gym. Each template is `r => blank(question, answer, worked)`
and is used once per bank. Then run:

```
node gym-quest/tools/build-banks.cjs      # rebuild js/banks.js (refuses bad banks, warns about recurring decimals)
node gym-quest/tools/check-banks.cjs      # every maths segment must render in KaTeX
node gym-quest/tools/show-bank.cjs G3.2   # print banks (questions and answers) to proof-read
```

The G3 build refuses a bank unless it has 20 unique typed questions with at least 5 word problems, finite answers of at most
4 decimal places that can be typed on the keypad. Gyms without a bank show *Coming soon*.
To rename or split gyms, edit `OVERRIDES` in `tools/build-world.cjs` and run it. Bank ids (`G1.1.numbers.1`) must keep matching.

## Known limits

* **Every gym has a bank**: 42 G1 gyms, 87 G2 gyms and 62 G3 gyms (3 820 questions).
* G1 questions follow the 31 G1 chapters of the TLG Normal Technical books in the Shinglee folder; the G1 gyms were written from the chapter
  titles and the usual Normal Technical scope, and were not checked against the G1 worksheets chapter by chapter.
* G2 questions follow the 39 G2 chapters in the Shinglee folder (the SLWS worksheets, which have extractable text and answer keys);
  G3 banks were compared with the 42 G3 chapter worksheets and `tools/g3-extra.cjs` adds the question types they had missed in
  9 gyms (limits of accuracy, frequency tables, quadrants, experimental probability, frequency density, segments, set counting,
  order of a matrix). Every question is original and generated; none is copied from a textbook.
* G3 questions cover the chapters and sub-topics of the Shing Lee Express (G3) Sec 1-4 books, as original generated
  questions in the style of Singapore practice exercises. The scans are image-only (no text layer), so individual exercise
  questions were not transcribed from them; only the chapter structure and a sample of the exercise styles were used.
* Each G3 bank is built from distinct question templates with random numbers fixed at build time, so the 20 questions
  in a bank are always the same until `build-banks.cjs` is re-run.
* Anyone who clears their browser data on the same device can make a new profile unless the leaderboard backend is connected.
* The "one profile" check is by name only, so two students with the same name need to add their class to it.
