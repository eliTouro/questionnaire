export default [
  {
    q: "Which HTTP method is defined as idempotent and is normally used to replace the entire state of a resource at a known URL?",
    options: ["POST", "PATCH", "PUT", "CONNECT"],
    answer: 2,
    why: [
      "POST is not idempotent: repeating it typically creates another resource or repeats a side effect.",
      "PATCH applies a partial modification and is not guaranteed to be idempotent; it does not mean full replacement.",
      "PUT replaces the target resource with the supplied representation, so sending the same request many times leaves the same end state.",
      "CONNECT establishes a tunnel to the server (e.g., for HTTPS through a proxy); it is not used for updating resources."
    ]
  },
  {
    q: "A client POSTs a new user to /users and the server successfully creates it. Which status code is the most appropriate response?",
    options: ["201 Created", "200 OK", "204 No Content", "302 Found"],
    answer: 0,
    why: [
      "201 Created signals that the request succeeded and a new resource was made, usually with a Location header pointing to it.",
      "200 OK is a generic success; it works but does not convey that a new resource was created.",
      "204 No Content means success with an empty body, typically for updates or deletes, not for creation.",
      "302 Found is a redirect, which would send the client to another URL instead of confirming creation."
    ]
  },
  {
    q: "A logged-in user requests an admin page. The server understands the request and knows who the user is, but refuses because they lack permission. Which status code fits best?",
    options: ["401 Unauthorized", "404 Not Found", "400 Bad Request", "403 Forbidden"],
    answer: 3,
    why: [
      "401 means the request lacks valid authentication; here the user is already identified, so authentication is not the issue.",
      "404 means the resource was not found; it is sometimes used to hide existence, but it does not describe a permission refusal.",
      "400 means the request itself was malformed, but this request is well-formed.",
      "403 means the server understood the request and the identity but refuses to authorize it."
    ]
  },
  {
    q: "Which HTML5 element is the semantic choice for a block of primary navigation links?",
    options: ["<menu>", "<nav>", "<aside>", "<section>"],
    answer: 1,
    why: [
      "<menu> represents a list of commands or a toolbar, not a site's navigation section.",
      "<nav> marks a section of major navigation links and is exposed as a navigation landmark to assistive technology.",
      "<aside> holds tangentially related content such as sidebars or callouts, not navigation by definition.",
      "<section> is a generic thematic grouping with no navigation meaning."
    ]
  },
  {
    q: "With the default box-sizing, what is the total horizontal space the element below occupies (excluding margins)?",
    code: ".box {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid black;\n}",
    options: ["200px", "240px", "250px", "225px"],
    answer: 2,
    why: [
      "200px would only be right if box-sizing were border-box; by default width sets just the content box.",
      "240px forgets the border: 200 + 20 + 20 omits the 5px borders on each side.",
      "In content-box, total = 200 + (20 x 2) padding + (5 x 2) border = 250px.",
      "225px adds padding and border on only one side, but both left and right sides contribute."
    ]
  },
  {
    q: "Which HTTP header tells the recipient what media type the message body is, such as application/json?",
    options: ["Content-Type", "Accept", "Content-Length", "Authorization"],
    answer: 0,
    why: [
      "Content-Type describes the media type of the body being sent, in either a request or a response.",
      "Accept is a request header listing the media types the client is willing to receive; it does not describe the body being sent.",
      "Content-Length gives the size of the body in bytes, not its format.",
      "Authorization carries credentials such as a bearer token and says nothing about the body format."
    ]
  },
  {
    q: "Which statement correctly describes the REST constraint of statelessness?",
    options: [
      "The server stores a session for each client between requests",
      "Resources may only be manipulated with the POST method",
      "Responses must always be formatted as XML documents",
      "Each request carries everything needed to process it, with no client session kept"
    ],
    answer: 3,
    why: [
      "This is the opposite: a stateless server does not remember client context between requests.",
      "REST uses the full set of HTTP methods (GET, PUT, DELETE, etc.), not only POST.",
      "REST is not tied to a format; JSON, XML, HTML and others are all valid representations.",
      "In REST, each request is self-contained, so any server instance can handle it, which aids scalability."
    ]
  },
  {
    q: "In a flex container using the default flex-direction: row, which property distributes items along the main (horizontal) axis?",
    options: ["align-items", "justify-content", "align-content", "flex-wrap"],
    answer: 1,
    why: [
      "align-items aligns items along the cross axis (vertically here), not the main axis.",
      "justify-content controls spacing and alignment of items along the main axis, which is horizontal for row.",
      "align-content spaces multiple flex lines along the cross axis and only has effect when lines wrap.",
      "flex-wrap decides whether items may wrap onto multiple lines; it does not distribute them along an axis."
    ]
  },
  {
    q: "Given the HTML and CSS below, what color is the link text?",
    code: "<a id=\"x\" class=\"a b\">link</a>\n\na.a.b { color: red; }\n#x    { color: blue; }",
    options: ["blue", "red", "purple", "whichever rule is declared last"],
    answer: 0,
    why: [
      "#x has specificity (1,0,0) which beats a.a.b at (0,2,1); a single ID outranks any number of classes and elements.",
      "red would win only if class selectors outweighed IDs, but specificity compares ID count first.",
      "Colors are not blended; the cascade selects exactly one winning declaration.",
      "Source order only breaks ties between equal specificity, and these two are not equal."
    ]
  },
  {
    q: "What does this code print?",
    code: "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}",
    options: ["0 1 2", "undefined undefined undefined", "3 3 3", "0 0 0"],
    answer: 2,
    why: [
      "0 1 2 would occur with let, which creates a fresh binding per iteration; var does not.",
      "The callbacks do see a defined i; it is just already updated by the time they run.",
      "var is function-scoped, so all callbacks close over the same i, which is 3 once the loop ends and the timers fire.",
      "i is incremented by the loop, so it is not still 0 when the callbacks run."
    ]
  },
  {
    q: "What does this code log?",
    code: "const o = { n: \"a\" };\nfunction f() { return this.n; }\nconst g = f.bind({ n: \"b\" });\nconsole.log(g.call({ n: \"c\" }));",
    options: ["a", "b", "c", "undefined"],
    answer: 1,
    why: [
      "o is never used as the receiver, so \"a\" is not involved.",
      "bind creates a function whose this is permanently fixed, and a later call() cannot override it.",
      "Many assume call() wins, but a bound function ignores a new this supplied by call or apply.",
      "this.n resolves to the bound object's n, so the result is defined."
    ]
  },
  {
    q: "What is the output order of this code?",
    code: "console.log(\"A\");\nsetTimeout(() => console.log(\"B\"), 0);\nPromise.resolve().then(() => console.log(\"C\"));\nconsole.log(\"D\");",
    options: ["A B C D", "A C D B", "A D B C", "A D C B"],
    answer: 3,
    why: [
      "This ignores that the callbacks are deferred; synchronous logs run before any queued callback.",
      "D is synchronous, so it prints before the promise callback C does.",
      "Promise callbacks are microtasks and run before the setTimeout macrotask, so C precedes B.",
      "Synchronous code runs first (A, D), then the microtask queue (C), then the timer macrotask (B)."
    ]
  },
  {
    q: "A page at https://a.com calls fetch(\"https://b.com/api\"). Which statement about CORS is correct?",
    options: [
      "The server b.com blocks the request before it is processed",
      "The request is never sent unless a proxy is configured",
      "The browser blocks JavaScript from reading the response unless b.com permits a.com",
      "Adding an Origin header in client code disables the check"
    ],
    answer: 2,
    why: [
      "For simple requests, the server usually does process them; CORS is not enforced by the server rejecting them.",
      "Simple cross-origin requests are sent normally; only the response access is restricted.",
      "CORS is enforced by the browser: the response is readable only if b.com sends a matching Access-Control-Allow-Origin header.",
      "Origin is a forbidden header that scripts cannot set, and it is the browser's input to the check, not a bypass."
    ]
  },
  {
    q: "What does the HttpOnly attribute on a cookie do?",
    options: [
      "Prevents JavaScript from reading the cookie via document.cookie",
      "Restricts the cookie to be sent over HTTPS only",
      "Stops the cookie being sent on cross-site requests",
      "Makes the cookie expire when the browser closes"
    ],
    answer: 0,
    why: [
      "HttpOnly hides the cookie from document.cookie, which limits theft through XSS.",
      "That describes the Secure attribute; HttpOnly is about script access, not transport.",
      "That describes SameSite; HttpOnly does not affect which requests include the cookie.",
      "That describes a session cookie with no Expires or Max-Age; it is unrelated to HttpOnly."
    ]
  },
  {
    q: "What does the response header Cache-Control: no-cache actually instruct caches to do?",
    options: [
      "Never store the response anywhere",
      "May store it, but must revalidate with the origin before reusing it",
      "Delete the response from the cache after zero seconds",
      "Allow only shared caches such as CDNs to store it"
    ],
    answer: 1,
    why: [
      "Never storing is what no-store means; no-cache is commonly misread as this.",
      "no-cache allows storing but requires revalidation (e.g., via ETag) before each reuse.",
      "It does not describe a deletion timer; freshness and eviction are controlled by other directives.",
      "Restricting to shared caches is not what this does; private and public control that."
    ]
  },
  {
    q: "What does this code print?",
    code: "async function f() { return 1; }\nconsole.log(f());",
    options: ["1", "undefined", "a rejected Promise", "a pending-or-resolved Promise object"],
    answer: 3,
    why: [
      "The value 1 is only obtained by awaiting or chaining then; f() itself returns a promise.",
      "f has a return value, and the async wrapper still produces a promise, not undefined.",
      "Nothing throws, so the promise is fulfilled, not rejected.",
      "An async function always returns a Promise, so logging it shows a Promise object (here fulfilled with 1), not the raw value."
    ]
  },
  {
    q: "A client holds a cached response with ETag \"v7\". Which request header lets it revalidate so the server can answer 304 Not Modified?",
    options: ["If-None-Match", "If-Modified", "Cache-Match", "Accept-Encoding"],
    answer: 0,
    why: [
      "The client sends If-None-Match: \"v7\"; if the ETag still matches, the server returns 304 with no body.",
      "If-Modified is not a real header; the real one is If-Modified-Since, which pairs with Last-Modified, not ETag.",
      "Cache-Match does not exist in HTTP.",
      "Accept-Encoding negotiates compression and has no role in validating cache freshness."
    ]
  },
  {
    q: "Which values does the CSS shorthand flex: 1 expand to?",
    options: [
      "flex-grow: 1; flex-shrink: 1; flex-basis: auto",
      "flex-grow: 0; flex-shrink: 1; flex-basis: 0%",
      "flex-grow: 1; flex-shrink: 1; flex-basis: 0%",
      "flex-grow: 1; flex-shrink: 0; flex-basis: 0%"
    ],
    answer: 2,
    why: [
      "That is close to flex: auto; with flex: 1 the basis is 0%, not auto.",
      "grow is 1, not 0; a grow of 0 would prevent the item from taking free space.",
      "A single unitless number sets flex-grow, with shrink defaulting to 1 and basis to 0%, so items share space equally.",
      "flex-shrink defaults to 1 here, not 0; items can still shrink."
    ]
  },
  {
    q: "What happens when this code runs (as a script, not in a module)?",
    code: "console.log(typeof x);\nlet x = 1;",
    options: [
      "Logs \"undefined\"",
      "Throws a ReferenceError",
      "Logs \"number\"",
      "Logs \"object\""
    ],
    answer: 1,
    why: [
      "typeof is safe for undeclared names, but x is declared; accessing it in its temporal dead zone is different.",
      "let bindings are hoisted but uninitialized until the declaration runs, so even typeof throws a ReferenceError in the TDZ.",
      "The value 1 is not assigned until after the log, so the type is never observed as a number.",
      "typeof null gives \"object\", but x is not null and is not accessible yet."
    ]
  },
  {
    q: "What is the output order of this code?",
    code: "async function a() {\n  console.log(1);\n  await null;\n  console.log(2);\n}\na();\nsetTimeout(() => console.log(4), 0);\nconsole.log(3);",
    options: ["1 2 3 4", "1 3 4 2", "3 1 2 4", "1 3 2 4"],
    answer: 3,
    why: [
      "This assumes await blocks the whole program, but it only suspends the async function.",
      "The continuation after await is a microtask, which runs before the setTimeout macrotask, so 2 precedes 4.",
      "The async function body runs synchronously up to its first await, so 1 prints before 3.",
      "1 runs synchronously, the await yields so 3 prints, then the microtask prints 2, and finally the timer prints 4."
    ]
  },
  {
    q: "Which cross-origin request will trigger a CORS preflight (OPTIONS) request?",
    options: [
      "POST with Content-Type: application/json",
      "GET with no custom headers",
      "POST with Content-Type: text/plain",
      "POST with Content-Type: application/x-www-form-urlencoded"
    ],
    answer: 0,
    why: [
      "application/json is not a CORS-safelisted content type, so the browser sends a preflight first.",
      "A GET without custom headers is a simple request and is sent directly.",
      "text/plain is one of the three safelisted content types, so no preflight is needed.",
      "Form-urlencoded is also safelisted (as is multipart/form-data), so this stays a simple request."
    ]
  },
  {
    q: "A cookie is set with SameSite=Lax. In which cross-site situation will the browser still send it?",
    options: [
      "A cross-site fetch() using POST",
      "An <img> loaded from another site",
      "The user clicks a link that navigates the top-level page with GET",
      "A hidden form on another site submitting a POST"
    ],
    answer: 2,
    why: [
      "Lax withholds cookies from cross-site subrequests such as fetch calls.",
      "Embedded resources like images are cross-site subrequests, so Lax cookies are not included.",
      "Lax permits cookies on top-level navigations using safe methods like GET, so following a link keeps the user logged in.",
      "Cross-site POST form submissions are unsafe-method requests, which Lax blocks to mitigate CSRF."
    ]
  },
  {
    q: "What does this code log?",
    code: "function F() {\n  this.v = 1;\n  return { v: 2 };\n}\nconsole.log(new F().v);",
    options: ["1", "2", "undefined", "It throws a TypeError"],
    answer: 1,
    why: [
      "1 would result if the constructor returned nothing or a primitive; here it returns an object.",
      "When a constructor returns an object, new yields that object instead of this, so v is 2.",
      "The returned object defines v, so the property exists.",
      "Returning an object from a constructor is allowed and does not throw."
    ]
  },
  {
    q: "What happens with this code?",
    code: "Promise.all([\n  Promise.resolve(1),\n  Promise.reject(\"x\"),\n  Promise.resolve(3)\n]).then(console.log, console.error);",
    options: [
      "Logs [1, undefined, 3]",
      "Logs [1, \"x\", 3]",
      "Never settles because one input is rejected",
      "Calls console.error with \"x\""
    ],
    answer: 3,
    why: [
      "Promise.all does not substitute undefined for failures; a rejection fails the whole result.",
      "Collecting both values and errors is what Promise.allSettled does, not Promise.all.",
      "It does settle; Promise.all rejects as soon as any input rejects.",
      "Promise.all rejects immediately with the first rejection reason, so the second handler runs with \"x\"."
    ]
  },
  {
    q: "Two block siblings are stacked: the first has margin-bottom: 30px and the second has margin-top: 20px. What is the vertical gap between them?",
    options: ["30px", "50px", "20px", "25px"],
    answer: 0,
    why: [
      "Adjacent vertical margins collapse to the larger of the two, so the gap is 30px.",
      "50px assumes margins add together, but that is not the case for collapsing block margins.",
      "20px picks the smaller margin; collapsing uses the larger one.",
      "25px averages the values, but collapsing does not average, it takes the maximum."
    ]
  }
]
