# questionnaire

A timed computer science quiz, published at **https://quiz.eliweiss.me** and linked from [eliweiss.me](https://eliweiss.me).

Pick one of ten topics, answer 20 questions in 15 minutes, get graded, then review every question: why the right answer is right, and why each wrong option (including yours) is wrong.

No build step, no dependencies: plain HTML, CSS and JavaScript (ES modules).

## How it works

- Each topic has a bank of 25 questions. A quiz draws 20 at random and shuffles each question's options, so replays differ.
- One 15-minute countdown covers the whole quiz (bar across the top of the page plus a timer pill). When it hits zero the quiz submits itself and unanswered questions count as wrong.
- Navigate with Back/Next, the numbered strip, or the keyboard: `1`–`4` or `A`–`D` to answer, `←` `→` to move.
- Results show score, grade, time, a right/wrong strip, and an expandable review of every question (missed ones open by default, filterable).
- Best score per topic is kept in the browser's `localStorage`. Nothing is sent anywhere.
- The page accent colour changes with the selected topic's `hue`.

## Structure

| Path | Purpose |
|---|---|
| `index.html` | Page shell |
| `css/styles.css` | Design tokens at the top, then each screen |
| `js/topics.js` | The ten topics (name, glyph, hue, blurb) plus quiz length and time limit |
| `js/app.js` | Topic picker, quiz, timer and results/review screens |
| `js/questions/<topic-id>.js` | One question bank per topic, loaded on demand |
| `validate.mjs` | Checks every bank is well formed |
| `netlify.toml` | Netlify publishes the repo root |

## Question format

```js
{
  q: 'Question text',
  code: 'optional snippet',          // omit if not needed
  options: ['A', 'B', 'C', 'D'],     // exactly 4
  answer: 2,                         // index of the correct option
  why: ['…', '…', '…', '…'],         // one explanation per option, same order
}
```

`why[answer]` explains why it is correct; the others explain the misconception behind each wrong option. Order doesn't matter, options are shuffled at runtime. After editing, run:

```bash
node validate.mjs
```

## Run locally

ES modules need HTTP, not `file://`:

```bash
python -m http.server 3200
```

Then open http://localhost:3200.

## Deployment

Netlify deploys the repo root from `main` on every push. `quiz.eliweiss.me` is a `CNAME` at GoDaddy (which hosts the DNS for `eliweiss.me`) pointing at this site's Netlify address.
