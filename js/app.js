import { topics, QUESTIONS_PER_QUIZ, SECONDS_PER_QUIZ } from './topics.js';

const stage = document.getElementById('stage');
const topbarRight = document.getElementById('topbar-right');
const timebar = document.getElementById('timebar');
const timebarFill = document.getElementById('timebar-fill');
const brand = document.getElementById('brand');
const root = document.documentElement;

const DEFAULT_HUE = 252;
const LETTERS = ['A', 'B', 'C', 'D'];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

let quiz = null; // active quiz state, null outside a quiz
let timerId = null;

/* ---------- helpers ---------- */

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatTime(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function setHue(hue) {
  root.style.setProperty('--hue', hue);
}

function readBest(id) {
  try {
    return JSON.parse(localStorage.getItem(`csquiz.best.${id}`));
  } catch {
    return null;
  }
}

function writeBest(id, score, seconds) {
  try {
    const best = readBest(id);
    if (!best || score > best.score || (score === best.score && seconds < best.seconds)) {
      localStorage.setItem(`csquiz.best.${id}`, JSON.stringify({ score, seconds }));
    }
  } catch {
    /* storage unavailable: best scores are a convenience only */
  }
}

function mount(...nodes) {
  stage.replaceChildren(...nodes);
  stage.scrollIntoView({ block: 'start' });
  window.scrollTo({ top: 0 });
  stage.focus({ preventScroll: true });
}

function confirmDialog({ title, text, ok, cancel = 'Keep going' }) {
  return new Promise((resolve) => {
    const dialog = el('dialog', 'dialog');
    const body = el('div', 'dialog__body');
    const actions = el('div', 'dialog__actions');
    const keep = el('button', 'btn btn--ghost', cancel);
    const go = el('button', 'btn btn--primary', ok);
    keep.type = go.type = 'button';
    actions.append(keep, go);
    body.append(el('h2', 'dialog__title', title), el('p', 'dialog__text', text), actions);
    dialog.append(body);
    const done = (value) => {
      dialog.close();
      dialog.remove();
      resolve(value);
    };
    keep.addEventListener('click', () => done(false));
    go.addEventListener('click', () => done(true));
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      done(false);
    });
    document.body.append(dialog);
    dialog.showModal();
    keep.focus();
  });
}

/* ---------- topic picker ---------- */

function renderTopics() {
  stopTimer();
  quiz = null;
  setHue(DEFAULT_HUE);
  timebar.classList.remove('is-on');
  topbarRight.replaceChildren();
  document.body.dataset.screen = 'topics';

  const hero = el('section', 'hero');
  const title = el('h1', 'hero__title');
  title.append('Pick a topic.', el('br'), el('span', 'hero__title-soft', 'Beat the clock.'));
  hero.append(
    title,
    el('p', 'hero__lede', `Twenty questions, fifteen minutes. When time is up you see every answer, and why it was right or wrong.`),
  );

  const grid = el('ul', 'topics');
  topics.forEach((topic, i) => {
    const best = readBest(topic.id);
    const item = el('li', 'topics__item');
    item.style.setProperty('--order', i);
    const card = el('button', 'topic');
    card.type = 'button';
    card.style.setProperty('--hue', topic.hue);
    card.setAttribute('aria-label', `${topic.name}. ${topic.blurb}${best ? ` Best score ${best.score} of ${QUESTIONS_PER_QUIZ}.` : ''}`);
    const meta = el('span', 'topic__meta');
    meta.append(
      el('span', 'topic__best', best ? `Best ${best.score}/${QUESTIONS_PER_QUIZ}` : 'Not tried'),
      el('span', 'topic__go', 'Start →'),
    );
    card.append(
      el('span', 'topic__glyph', topic.glyph),
      el('span', 'topic__name', topic.name),
      el('span', 'topic__blurb', topic.blurb),
      meta,
    );
    card.addEventListener('click', () => startQuiz(topic));
    item.append(card);
    grid.append(item);
  });

  mount(hero, grid);
}

/* ---------- loading + starting ---------- */

async function startQuiz(topic) {
  setHue(topic.hue);
  mount(el('p', 'loading', `Loading ${topic.name}…`));
  let bank;
  try {
    bank = (await import(`./questions/${topic.id}.js`)).default;
  } catch {
    const box = el('div', 'notice');
    const retry = el('button', 'btn btn--primary', 'Try again');
    const back = el('button', 'btn btn--ghost', 'Back to topics');
    retry.type = back.type = 'button';
    retry.addEventListener('click', () => startQuiz(topic));
    back.addEventListener('click', renderTopics);
    box.append(el('h2', 'notice__title', 'Couldn’t load these questions'), el('p', null, 'Check your connection and try again.'), el('div', 'notice__actions'));
    box.lastChild.append(retry, back);
    mount(box);
    return;
  }

  const questions = shuffle(bank)
    .slice(0, QUESTIONS_PER_QUIZ)
    .map((raw) => ({
      q: raw.q,
      code: raw.code,
      options: shuffle(raw.options.map((text, i) => ({ text, why: raw.why[i], correct: i === raw.answer }))),
    }));

  quiz = {
    topic,
    questions,
    answers: new Array(questions.length).fill(null), // chosen option index per question
    index: 0,
    startedAt: performance.now(),
    secondsLeft: SECONDS_PER_QUIZ,
    over: false,
  };
  document.body.dataset.screen = 'quiz';
  renderQuiz(true);
  startTimer();
}

/* ---------- timer ---------- */

function startTimer() {
  stopTimer();
  timebar.classList.add('is-on');
  const tick = () => {
    if (!quiz || quiz.over) return;
    const elapsed = (performance.now() - quiz.startedAt) / 1000;
    quiz.secondsLeft = SECONDS_PER_QUIZ - elapsed;
    const left = Math.max(0, quiz.secondsLeft);
    timebarFill.style.transform = `scaleX(${left / SECONDS_PER_QUIZ})`;
    const pill = document.getElementById('timer-text');
    if (pill) {
      pill.textContent = formatTime(Math.ceil(left));
      pill.parentElement.classList.toggle('is-low', left <= 60);
    }
    timebar.classList.toggle('is-low', left <= 60);
    if (left <= 0) finish(true);
  };
  tick();
  timerId = setInterval(tick, 250);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

/* ---------- quiz screen ---------- */

function renderTopbarQuiz() {
  const pill = el('div', 'timer');
  pill.setAttribute('role', 'timer');
  const text = el('span', 'timer__text', formatTime(Math.ceil(Math.max(0, quiz.secondsLeft))));
  text.id = 'timer-text';
  pill.append(el('span', 'timer__icon'), text);
  const quit = el('button', 'btn btn--quiet', 'Quit');
  quit.type = 'button';
  quit.addEventListener('click', requestQuit);
  topbarRight.replaceChildren(pill, quit);
}

async function requestQuit() {
  if (!quiz || quiz.over) return renderTopics();
  const ok = await confirmDialog({
    title: 'Quit this quiz?',
    text: 'Your answers so far will be lost.',
    ok: 'Quit quiz',
  });
  if (ok) renderTopics();
}

function renderQuiz(first = false) {
  const { topic, questions, answers, index } = quiz;
  const question = questions[index];
  if (first) renderTopbarQuiz();

  const head = el('div', 'qhead');
  head.append(
    el('span', 'qhead__topic', topic.name),
    el('span', 'qhead__count', `Question ${index + 1} of ${questions.length}`),
  );

  const card = el('section', 'qcard');
  card.setAttribute('aria-labelledby', 'q-text');
  const prompt = el('h1', 'qcard__q', question.q);
  prompt.id = 'q-text';
  card.append(prompt);
  if (question.code) {
    const pre = el('pre', 'code');
    pre.append(el('code', null, question.code));
    pre.tabIndex = 0;
    card.append(pre);
  }

  const options = el('div', 'options');
  options.setAttribute('role', 'radiogroup');
  options.setAttribute('aria-labelledby', 'q-text');
  question.options.forEach((option, i) => {
    const btn = el('button', 'option');
    btn.type = 'button';
    btn.setAttribute('role', 'radio');
    const selected = answers[index] === i;
    btn.setAttribute('aria-checked', String(selected));
    btn.classList.toggle('is-selected', selected);
    btn.append(el('span', 'option__key', LETTERS[i]), el('span', 'option__text', option.text));
    btn.addEventListener('click', () => choose(i));
    options.append(btn);
  });
  card.append(options);

  const prev = el('button', 'btn btn--ghost', '← Back');
  prev.type = 'button';
  prev.disabled = index === 0;
  prev.addEventListener('click', () => go(index - 1));

  const isLast = index === questions.length - 1;
  const next = el('button', 'btn btn--primary', isLast ? 'Finish quiz' : 'Next →');
  next.type = 'button';
  next.addEventListener('click', isLast ? () => requestFinish() : () => go(index + 1));

  const nav = el('div', 'qnav');
  const answeredCount = answers.filter((a) => a !== null).length;
  nav.append(prev, el('span', 'qnav__answered', `${answeredCount} of ${questions.length} answered`), next);

  const strip = el('div', 'strip');
  strip.setAttribute('role', 'group');
  strip.setAttribute('aria-label', 'Jump to question');
  questions.forEach((_, i) => {
    const dot = el('button', 'strip__dot', String(i + 1));
    dot.type = 'button';
    dot.classList.toggle('is-answered', answers[i] !== null);
    dot.classList.toggle('is-current', i === index);
    dot.setAttribute('aria-label', `Question ${i + 1}${answers[i] !== null ? ', answered' : ''}`);
    if (i === index) dot.setAttribute('aria-current', 'step');
    dot.addEventListener('click', () => go(i));
    strip.append(dot);
  });

  const wrap = el('div', 'quiz');
  wrap.append(head, card, nav, strip);
  card.classList.add('is-entering');

  stage.replaceChildren(wrap);
  if (!first) window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
}

function go(i) {
  if (!quiz || quiz.over || i < 0 || i >= quiz.questions.length) return;
  quiz.index = i;
  renderQuiz();
}

function choose(i) {
  if (!quiz || quiz.over) return;
  quiz.answers[quiz.index] = i;
  // Update in place (no re-render) so the selection feels instant.
  stage.querySelectorAll('.option').forEach((btn, n) => {
    btn.classList.toggle('is-selected', n === i);
    btn.setAttribute('aria-checked', String(n === i));
  });
  const dot = stage.querySelectorAll('.strip__dot')[quiz.index];
  dot.classList.add('is-answered');
  dot.setAttribute('aria-label', `Question ${quiz.index + 1}, answered`);
  const count = quiz.answers.filter((a) => a !== null).length;
  stage.querySelector('.qnav__answered').textContent = `${count} of ${quiz.questions.length} answered`;
}

async function requestFinish() {
  const unanswered = quiz.answers.filter((a) => a === null).length;
  if (unanswered > 0) {
    const ok = await confirmDialog({
      title: 'Finish with blanks?',
      text: `${unanswered} ${unanswered === 1 ? 'question is' : 'questions are'} unanswered and will count as wrong.`,
      ok: 'Finish quiz',
      cancel: 'Keep answering',
    });
    if (!ok) return;
  }
  if (quiz && !quiz.over) finish(false);
}

document.addEventListener('keydown', (event) => {
  if (!quiz || quiz.over || document.querySelector('dialog[open]')) return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  const key = event.key.toLowerCase();
  const pick = '1234'.indexOf(key) >= 0 ? '1234'.indexOf(key) : 'abcd'.indexOf(key);
  if (key.length === 1 && pick >= 0) {
    choose(pick);
  } else if (key === 'arrowright') {
    go(quiz.index + 1);
  } else if (key === 'arrowleft') {
    go(quiz.index - 1);
  }
});

/* ---------- results ---------- */

function grade(pct) {
  if (pct >= 90) return { letter: 'A', line: 'Outstanding. You know this cold.' };
  if (pct >= 80) return { letter: 'B', line: 'Strong work. A few details to tighten.' };
  if (pct >= 70) return { letter: 'C', line: 'Solid base. Review the misses below.' };
  if (pct >= 60) return { letter: 'D', line: 'Getting there. The explanations will help.' };
  return { letter: 'F', line: 'Time to study. Read each explanation below.' };
}

function finish(timedOut) {
  if (!quiz || quiz.over) return;
  quiz.over = true;
  stopTimer();
  timebar.classList.remove('is-on');
  const seconds = Math.min(SECONDS_PER_QUIZ, (performance.now() - quiz.startedAt) / 1000);
  const correct = quiz.questions.map((q, i) => quiz.answers[i] !== null && q.options[quiz.answers[i]].correct);
  const score = correct.filter(Boolean).length;
  writeBest(quiz.topic.id, score, seconds);
  document.body.dataset.screen = 'results';
  renderResults({ timedOut, seconds, correct, score });
}

function countUp(node, target) {
  if (reduceMotion.matches || target === 0) {
    node.textContent = String(target);
    return;
  }
  const duration = 900;
  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / duration);
    node.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 3))));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function renderResults({ timedOut, seconds, correct, score }) {
  const { topic, questions, answers } = quiz;
  const total = questions.length;
  const pct = Math.round((score / total) * 100);
  const { letter, line } = grade(pct);

  topbarRight.replaceChildren();
  const home = el('button', 'btn btn--quiet', 'All topics');
  home.type = 'button';
  home.addEventListener('click', renderTopics);
  topbarRight.append(home);

  const summary = el('section', 'summary');
  const scoreNum = el('span', 'summary__num', '0');
  const scoreRow = el('div', 'summary__score');
  scoreRow.append(scoreNum, el('span', 'summary__of', `/ ${total}`));
  const gradeBadge = el('div', 'summary__grade');
  gradeBadge.append(el('span', 'summary__letter', letter), el('span', 'summary__pct', `${pct}%`));

  const left = el('div', 'summary__main');
  left.append(
    el('p', 'eyebrow', timedOut ? `${topic.name} · time ran out` : topic.name),
    scoreRow,
    el('p', 'summary__line', line),
  );

  const stats = el('dl', 'stats');
  const unanswered = answers.filter((a) => a === null).length;
  [
    ['Correct', String(score)],
    ['Wrong', String(total - score - unanswered)],
    ['Skipped', String(unanswered)],
    ['Time', formatTime(seconds)],
  ].forEach(([label, value]) => {
    const cell = el('div', 'stats__cell');
    cell.append(el('dt', 'stats__label', label), el('dd', 'stats__value', value));
    stats.append(cell);
  });

  const blocks = el('div', 'blocks');
  blocks.setAttribute('aria-hidden', 'true');
  correct.forEach((ok, i) => {
    const block = el('span', `blocks__cell ${ok ? 'is-right' : 'is-wrong'}`);
    block.style.setProperty('--order', i);
    blocks.append(block);
  });

  const actions = el('div', 'summary__actions');
  const again = el('button', 'btn btn--primary', 'Try this topic again');
  const other = el('button', 'btn btn--ghost', 'Pick another topic');
  again.type = other.type = 'button';
  again.addEventListener('click', () => startQuiz(topic));
  other.addEventListener('click', renderTopics);
  actions.append(again, other);

  summary.append(left, gradeBadge, blocks, stats, actions);

  // Review
  const review = el('section', 'review');
  const reviewHead = el('div', 'review__head');
  reviewHead.append(el('h2', 'review__title', 'Your answers, explained'));
  const filters = el('div', 'filters');
  filters.setAttribute('role', 'group');
  filters.setAttribute('aria-label', 'Filter questions');
  const list = el('ol', 'review__list');

  const applyFilter = (name) => {
    filters.querySelectorAll('.chip').forEach((chip) => chip.setAttribute('aria-pressed', String(chip.dataset.filter === name)));
    list.querySelectorAll('.rev').forEach((item) => {
      const ok = item.dataset.result === 'right';
      item.hidden = (name === 'wrong' && ok) || (name === 'right' && !ok);
    });
  };
  [
    ['all', `All ${total}`],
    ['wrong', `Missed ${total - score}`],
    ['right', `Correct ${score}`],
  ].forEach(([name, label]) => {
    const chip = el('button', 'chip', label);
    chip.type = 'button';
    chip.dataset.filter = name;
    chip.addEventListener('click', () => applyFilter(name));
    filters.append(chip);
  });
  reviewHead.append(filters);

  questions.forEach((question, i) => list.append(buildReviewItem(question, i, answers[i], correct[i])));
  review.append(reviewHead, list);

  mount(summary, review);
  applyFilter('all');
  countUp(scoreNum, score);
}

function buildReviewItem(question, i, chosen, isRight) {
  const item = el('li', 'rev');
  item.dataset.result = isRight ? 'right' : 'wrong';
  const details = el('details', 'rev__details');
  details.open = !isRight;

  const summary = el('summary', 'rev__summary');
  const status = el('span', `rev__status ${isRight ? 'is-right' : 'is-wrong'}`, isRight ? '✓' : chosen === null ? '–' : '✕');
  status.setAttribute('aria-label', isRight ? 'Correct' : chosen === null ? 'Skipped' : 'Wrong');
  summary.append(status, el('span', 'rev__num', `Q${i + 1}`), el('span', 'rev__q', question.q), el('span', 'rev__chev'));
  details.append(summary);

  const body = el('div', 'rev__body');
  if (question.code) {
    const pre = el('pre', 'code');
    pre.append(el('code', null, question.code));
    pre.tabIndex = 0;
    body.append(pre);
  }

  const rightIndex = question.options.findIndex((o) => o.correct);
  const callout = (kind, label, option, letterIndex) => {
    const box = el('div', `callout callout--${kind}`);
    const top = el('div', 'callout__top');
    top.append(el('span', 'callout__tag', label), el('span', 'callout__answer', `${LETTERS[letterIndex]}. ${option.text}`));
    box.append(top, el('p', 'callout__why', option.why));
    return box;
  };

  if (isRight) {
    body.append(callout('right', 'Your answer · correct', question.options[rightIndex], rightIndex));
  } else {
    if (chosen === null) {
      const skipped = el('p', 'rev__skipped', 'You didn’t answer this one.');
      body.append(skipped);
    } else {
      body.append(callout('wrong', 'Your answer · wrong', question.options[chosen], chosen));
    }
    body.append(callout('right', 'Correct answer', question.options[rightIndex], rightIndex));
  }

  const others = question.options
    .map((option, n) => ({ option, n }))
    .filter(({ n }) => n !== rightIndex && n !== chosen);
  if (others.length) {
    const more = el('div', 'others');
    more.append(el('p', 'others__label', 'Why the other options don’t work'));
    others.forEach(({ option, n }) => {
      const row = el('div', 'others__row');
      row.append(el('span', 'others__key', LETTERS[n]), el('div', 'others__body'));
      row.lastChild.append(el('p', 'others__text', option.text), el('p', 'others__why', option.why));
      more.append(row);
    });
    body.append(more);
  }

  details.append(body);
  item.append(details);
  return item;
}

/* ---------- boot ---------- */

brand.addEventListener('click', (event) => {
  event.preventDefault();
  if (quiz && !quiz.over) requestQuit();
  else renderTopics();
});

window.addEventListener('beforeunload', (event) => {
  if (quiz && !quiz.over) event.preventDefault();
});

renderTopics();
