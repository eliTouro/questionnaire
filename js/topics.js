// One entry per topic. `id` must match a file in js/questions/. `hue` tints the whole page
// once the topic is chosen. Each question bank holds more than 20 questions; a quiz draws 20 at random.
export const QUESTIONS_PER_QUIZ = 20;
export const SECONDS_PER_QUIZ = 15 * 60;

export const topics = [
  { id: 'data-structures',   name: 'Data Structures',        glyph: '[ ]',   hue: 258, blurb: 'Arrays, trees, heaps, hash tables and graphs.' },
  { id: 'algorithms',        name: 'Algorithms & Big-O',     glyph: 'O(n)',  hue: 222, blurb: 'Sorting, searching, recursion, DP and complexity.' },
  { id: 'operating-systems', name: 'Operating Systems',      glyph: 'PID',   hue: 188, blurb: 'Processes, threads, scheduling and virtual memory.' },
  { id: 'networking',        name: 'Networking',             glyph: '://',   hue: 164, blurb: 'TCP/IP, DNS, subnets and how packets travel.' },
  { id: 'databases',         name: 'Databases & SQL',        glyph: 'SQL',   hue: 140, blurb: 'Joins, keys, indexes, transactions and ACID.' },
  { id: 'web',               name: 'Web Fundamentals',       glyph: '</>',   hue: 24,  blurb: 'HTTP, HTML, CSS and the quirks of JavaScript.' },
  { id: 'programming',       name: 'Programming & OOP',      glyph: 'fn()',  hue: 346, blurb: 'Scope, types, objects, SOLID and design patterns.' },
  { id: 'git',               name: 'Git & Version Control',  glyph: '⑂',     hue: 8,   blurb: 'Branches, merges, rebases and undoing mistakes.' },
  { id: 'security',          name: 'Security & Crypto',      glyph: '0x7F',  hue: 292, blurb: 'Hashing, TLS, injection attacks and auth.' },
  { id: 'architecture',      name: 'Architecture & Binary',  glyph: '1011',  hue: 205, blurb: 'Bits, two’s complement, caches and the CPU cycle.' },
];
