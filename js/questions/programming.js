export default [
  {
    q: "What is true about a variable declared inside a function body (local scope) in most languages?",
    options: [
      "It stays alive and visible to all other functions after the call ends",
      "It is visible only within that function, and normally ceases to exist once the call returns",
      "It is visible to every function that the same file imports",
      "It is shared between all calls of the function and keeps its last value"
    ],
    answer: 1,
    why: [
      "That describes a global (or static) variable; locals are not visible outside their function.",
      "Correct: local variables are bound to the function's scope and are normally created per call and discarded when it returns (closures are the exception that can keep them alive).",
      "Imports expose module-level names, not a function's local variables.",
      "That describes a static variable; ordinary locals are created fresh on each call."
    ]
  },
  {
    q: "Which of the following Python values is immutable?",
    options: [
      "A list such as [1, 2, 3]",
      "A dictionary such as {\"a\": 1}",
      "A tuple such as (1, 2, 3)",
      "A set such as {1, 2, 3}"
    ],
    answer: 2,
    why: [
      "Lists are mutable: you can append, remove or reassign elements in place.",
      "Dictionaries are mutable: keys can be added, removed and updated in place.",
      "Correct: tuples cannot have their elements reassigned or resized after creation, which is why they can be dictionary keys (if their contents are hashable).",
      "Sets are mutable: add and remove modify them in place (frozenset is the immutable version)."
    ]
  },
  {
    q: "What does this Python code print?",
    code: "def f(lst):\n    lst.append(1)\n    lst = [9]\n    lst.append(2)\n\na = []\nf(a)\nprint(a)",
    options: [
      "[1]",
      "[9, 2]",
      "[1, 2]",
      "[]"
    ],
    answer: 0,
    why: [
      "Correct: the parameter initially references the caller's list, so append(1) mutates it, but lst = [9] only rebinds the local name to a new list, leaving a untouched afterward.",
      "This assumes the reassignment lst = [9] replaced the caller's list, but assignment only rebinds the local name.",
      "append(2) acts on the new local list [9], not on the caller's list, so 2 never reaches a.",
      "This assumes arguments are copied (pure pass by value), but the list object is shared so append(1) is visible to the caller."
    ]
  },
  {
    q: "Why must every correct recursive function have a base case?",
    options: [
      "Because recursion is only allowed on arrays and strings",
      "Because the base case makes the function run faster than a loop",
      "Because without it the compiler refuses to compile the function",
      "Because it stops the chain of calls; without it the recursion never terminates and overflows the stack"
    ],
    answer: 3,
    why: [
      "Recursion works on any problem that can be broken into smaller subproblems, not only arrays and strings.",
      "A base case is about termination, not speed; recursion is often slower than iteration due to call overhead.",
      "Compilers generally accept recursion without a base case; the problem shows up at runtime, not compile time.",
      "Correct: the base case returns without recursing, ending the call chain; otherwise calls pile up until a stack overflow occurs."
    ]
  },
  {
    q: "What does a garbage collector do in a managed language such as Java, Python or JavaScript?",
    options: [
      "It deletes any variable that has not been used for a fixed amount of time",
      "It automatically reclaims memory of objects that are no longer reachable by the program",
      "It removes unused functions from the source code before compiling",
      "It compresses files on disk that the program has closed"
    ],
    answer: 1,
    why: [
      "Collection depends on reachability, not on elapsed time; an old but referenced object stays alive.",
      "Correct: the collector finds objects that can no longer be reached from live references (roots) and frees their memory so the programmer need not do so manually.",
      "Garbage collection operates on runtime heap memory, not on source code.",
      "Garbage collection manages heap memory, not files on disk."
    ]
  },
  {
    q: "Which best describes encapsulation in object-oriented programming?",
    options: [
      "Letting a subclass reuse the fields and methods of its parent class",
      "Treating objects of different classes uniformly through a shared interface",
      "Bundling data with the methods that operate on it and restricting direct access to internal state",
      "Hiding the fact that an object is created by exposing a factory function"
    ],
    answer: 2,
    why: [
      "That describes inheritance, a different OOP pillar.",
      "That describes polymorphism, not encapsulation.",
      "Correct: encapsulation keeps state private behind a public interface so invariants can be enforced in one place.",
      "That describes the factory pattern, a creational design pattern rather than a pillar of OOP."
    ]
  },
  {
    q: "In OOP, what is polymorphism?",
    options: [
      "The ability to call the same method on different types of objects and have each respond with its own behavior",
      "The ability of a class to have more than one parent class",
      "The process of converting an object into a string for storage",
      "The practice of keeping all fields of a class private"
    ],
    answer: 0,
    why: [
      "Correct: with polymorphism, code written against a common interface or base type works with many concrete types, each supplying its own implementation (for example, shape.area()).",
      "That is multiple inheritance, which is a separate feature and not what polymorphism means.",
      "That is serialization, unrelated to polymorphism.",
      "That is a practice related to encapsulation, not polymorphism."
    ]
  },
  {
    q: "What is the main purpose of a unit test?",
    options: [
      "To check that the whole system works with real databases and networks",
      "To measure how fast the application runs under heavy load",
      "To confirm the interface looks correct on every browser",
      "To verify that a small, isolated piece of code (such as a function or class) behaves as expected"
    ],
    answer: 3,
    why: [
      "That describes integration or end-to-end testing, which cover multiple components working together.",
      "That describes performance or load testing, not unit testing.",
      "That describes cross-browser or UI testing, which is outside the scope of unit tests.",
      "Correct: unit tests exercise one small unit in isolation, giving fast and precise feedback when something breaks."
    ]
  },
  {
    q: "What does this Python code print?",
    code: "def add(x, lst=[]):\n    lst.append(x)\n    return lst\n\nadd(1)\nprint(add(2))",
    options: [
      "[2]",
      "[1, 2]",
      "[1]",
      "[2, 1]"
    ],
    answer: 1,
    why: [
      "This assumes a fresh empty list is created on every call, but a default value is evaluated only once at function definition.",
      "Correct: the default list is created once and shared across calls, so the first call leaves [1] in it and the second call appends 2, giving [1, 2].",
      "That would be the result after only the first call; the second call appends to the same default list.",
      "append adds to the end, so the order is 1 then 2, never [2, 1]."
    ]
  },
  {
    q: "Which is the strongest reason to favor composition over inheritance in many designs?",
    options: [
      "Composition always executes faster than inheritance at runtime",
      "Composition removes the need for interfaces or abstractions",
      "Composition lets you assemble and swap behavior at runtime without a rigid, tightly coupled class hierarchy",
      "Composition is the only way to reuse code in an object-oriented language"
    ],
    answer: 2,
    why: [
      "Performance is not the main argument; the difference in speed is negligible in most cases.",
      "Composition typically relies on interfaces so that components can be replaced, so it does not remove them.",
      "Correct: has-a relationships keep classes loosely coupled and let behavior be configured or replaced dynamically, while inheritance fixes the relationship at compile time and exposes the parent's internals.",
      "Inheritance is also a way to reuse code; the claim that composition is the only way is false."
    ]
  },
  {
    q: "A class Square extends Rectangle, and code that sets width and height independently on a Rectangle breaks when given a Square. Which principle is violated?",
    options: [
      "Liskov Substitution Principle",
      "Single Responsibility Principle",
      "Interface Segregation Principle",
      "Dependency Inversion Principle"
    ],
    answer: 0,
    why: [
      "Correct: LSP says a subtype must be usable wherever its base type is expected without breaking correctness; a Square cannot honor independent width and height.",
      "SRP is about a class having one reason to change, which is not what is broken here.",
      "ISP concerns forcing clients to depend on methods they do not use, which is not the issue in this example.",
      "DIP concerns depending on abstractions rather than concrete classes, which is not the problem shown."
    ]
  },
  {
    q: "Why can pure reference counting fail to free some memory?",
    options: [
      "Because counting references is too slow to be practical",
      "Because it cannot free objects that are stored in lists",
      "Because it only works for primitive values such as integers",
      "Because objects that reference each other in a cycle keep each other's counts above zero even when unreachable"
    ],
    answer: 3,
    why: [
      "Speed overhead exists, but the correctness problem is cycles, not slowness.",
      "Objects in containers are counted like any other; being in a list is not the problem.",
      "Reference counting is used for objects in languages such as CPython, not just primitives.",
      "Correct: if A refers to B and B refers to A, both counts stay at least 1 although nothing else can reach them, so a cycle detector or tracing collector is needed."
    ]
  },
  {
    q: "What does this JavaScript code print?",
    code: "const fns = [];\nfor (var i = 0; i < 3; i++) {\n  fns.push(() => i);\n}\nconsole.log(fns.map(f => f()).join(\",\"));",
    options: [
      "0,1,2",
      "3,3,3",
      "2,2,2",
      "undefined,undefined,undefined"
    ],
    answer: 1,
    why: [
      "This would happen with let, which creates a new binding per iteration; var does not.",
      "Correct: var is function-scoped so all closures share one i, which is 3 once the loop ends.",
      "The loop continues until i is 3, so the shared variable ends at 3, not 2.",
      "i is still in scope for the closures, so it has a numeric value rather than undefined."
    ]
  },
  {
    q: "Which design pattern defines a family of interchangeable algorithms behind a common interface so the algorithm can be chosen at runtime?",
    options: [
      "Singleton",
      "Observer",
      "Strategy",
      "Adapter"
    ],
    answer: 2,
    why: [
      "Singleton restricts a class to a single instance; it does not swap algorithms.",
      "Observer notifies dependents when state changes; it is not about selecting algorithms.",
      "Correct: Strategy encapsulates each algorithm as an object implementing a shared interface, letting the client pick or swap one at runtime.",
      "Adapter converts one interface into another that a client expects; it does not choose between algorithms."
    ]
  },
  {
    q: "Which describes a pure function?",
    options: [
      "It returns the same output for the same inputs and has no side effects",
      "It never calls any other function",
      "It modifies its arguments to return results efficiently",
      "It always returns a primitive value"
    ],
    answer: 0,
    why: [
      "Correct: purity means the result depends only on the inputs and nothing outside is read or modified, which makes functions easy to test, cache and reason about.",
      "A pure function may call other pure functions; calling none is not required.",
      "Mutating arguments is a side effect, which makes a function impure.",
      "A pure function may return any value, including objects or other functions."
    ]
  },
  {
    q: "In a test, you replace a real payment service with an object that returns canned responses so the code under test can run without network access. What is this object called?",
    options: [
      "A fixture that loads data from disk",
      "A regression that records past failures",
      "A decorator that adds logging",
      "A test double such as a stub or mock"
    ],
    answer: 3,
    why: [
      "A fixture sets up the state a test needs; it does not stand in for a collaborator.",
      "A regression is a bug reappearing in code that once worked, not a type of test object.",
      "A decorator wraps behavior to extend it; it does not substitute the dependency for testing.",
      "Correct: test doubles (stubs, mocks, fakes) replace real dependencies so tests are fast, isolated and deterministic."
    ]
  },
  {
    q: "Which statement about recursion and the call stack is correct?",
    options: [
      "Recursive calls use no extra memory because they share one stack frame",
      "Each active recursive call usually occupies its own stack frame, so very deep recursion can exhaust the stack",
      "Recursion stores its frames on the heap, so depth is limited only by disk space",
      "Recursive functions are always converted to loops by every compiler"
    ],
    answer: 1,
    why: [
      "Each call gets its own frame holding its parameters and locals, so memory grows with depth.",
      "Correct: frames accumulate until calls return, so recursion of depth n typically uses O(n) stack space and can cause stack overflow when too deep.",
      "Call frames are on the call stack, which has a limited size; disk space is irrelevant.",
      "Only some languages and compilers eliminate tail calls, and many (such as CPython) never do."
    ]
  },
  {
    q: "A high-level OrderService creates a MySQLDatabase object directly inside its constructor. Which principle suggests instead depending on an abstract Database interface that is passed in?",
    options: [
      "Open/Closed Principle",
      "Single Responsibility Principle",
      "Dependency Inversion Principle",
      "Liskov Substitution Principle"
    ],
    answer: 2,
    why: [
      "OCP is about extending behavior without modifying existing code; it is related, but the issue described is coupling to a concrete class.",
      "SRP concerns a class having one reason to change, not how it obtains its dependencies.",
      "Correct: DIP says high-level modules should depend on abstractions rather than concrete low-level modules, and injecting the dependency enables swapping and testing.",
      "LSP concerns subtypes being substitutable for their base types, not how dependencies are created."
    ]
  },
  {
    q: "Which pattern lets multiple objects automatically get notified when the state of another object changes?",
    options: [
      "Observer",
      "Factory Method",
      "Decorator",
      "Facade"
    ],
    answer: 0,
    why: [
      "Correct: Observer defines a one-to-many dependency where subjects publish changes to registered subscribers, as in event listeners.",
      "Factory Method delegates creation of objects to subclasses; it has nothing to do with notifications.",
      "Decorator adds responsibilities to an object by wrapping it; it does not broadcast changes.",
      "Facade provides a simplified interface to a complex subsystem; it is not a notification mechanism."
    ]
  },
  {
    q: "What does this Python code print?",
    code: "a = [1, 2]\nb = a\nb += [3]\nc = a\nc = c + [4]\nprint(a)",
    options: [
      "[1, 2]",
      "[1, 2, 4]",
      "[1, 2, 3, 4]",
      "[1, 2, 3]"
    ],
    answer: 3,
    why: [
      "This ignores that b += [3] is an in-place extend on the list shared by a and b, so a changes.",
      "The 3 is included because b and a reference the same list when b += [3] runs; and the 4 never reaches a.",
      "c = c + [4] builds a new list and rebinds c, so a does not receive the 4.",
      "Correct: += on a list mutates it in place (visible through a), while c = c + [4] creates a new list and only rebinds c."
    ]
  },
  {
    q: "A naive recursive Fibonacci, fib(n) = fib(n-1) + fib(n-2), runs in exponential time. How does memoization change this?",
    options: [
      "It reduces recursion depth to O(1)",
      "It caches each fib(k) once computed, reducing the number of distinct computations to O(n)",
      "It converts the algorithm into a constant-time formula",
      "It removes the need for a base case"
    ],
    answer: 1,
    why: [
      "Depth still grows with n, since fib(n) calls fib(n-1) and so on before returning.",
      "Correct: the naive version recomputes the same subproblems repeatedly; caching results means each of the n values is computed once, giving O(n) time.",
      "Memoization does not change the recurrence into a closed form; each value is still computed from earlier ones.",
      "Base cases are still required to terminate the recursion and seed the cache."
    ]
  },
  {
    q: "A Machine interface has print(), scan() and fax(), and a BasicPrinter class is forced to implement scan() and fax() by throwing exceptions. Which principle does this design violate?",
    options: [
      "Open/Closed Principle",
      "Liskov Substitution Principle",
      "Interface Segregation Principle",
      "Single Responsibility Principle"
    ],
    answer: 2,
    why: [
      "OCP concerns extending behavior without modifying existing code, which is not the central problem here.",
      "LSP is also arguably strained, but the root cause is the oversized interface; ISP is the principle that directly addresses it.",
      "Correct: ISP says clients should not be forced to depend on methods they do not use; the fix is to split the interface into smaller ones such as Printer, Scanner and Fax.",
      "SRP is about the reasons a class changes, not about how big an interface is."
    ]
  },
  {
    q: "What is the generational hypothesis that many modern garbage collectors rely on?",
    options: [
      "Most objects die young, so collecting a small young generation frequently is cheap and effective",
      "Most objects live forever, so old objects should be collected most often",
      "Objects of the same type always die at the same time",
      "Large objects are always more likely to be garbage than small ones"
    ],
    answer: 0,
    why: [
      "Correct: because most allocations become garbage quickly, collectors split the heap into generations and collect the young one often, which is fast, while collecting older generations rarely.",
      "This is the reverse: if old objects were collected most, the approach would be wasteful since they tend to survive.",
      "Lifetime depends on references held, not on an object's type.",
      "Size is not what the hypothesis is based on; it concerns the age of objects."
    ]
  },
  {
    q: "What does this Python code print?",
    code: "class A:\n    def f(self): return \"A\"\nclass B(A):\n    def f(self): return \"B\" + super().f()\nclass C(A):\n    def f(self): return \"C\" + super().f()\nclass D(B, C): pass\nprint(D().f())",
    options: [
      "BA",
      "BCA",
      "BAC",
      "CBA"
    ],
    answer: 1,
    why: [
      "This ignores that super() in B follows the method resolution order of D, which goes to C before A.",
      "Correct: the MRO of D is D, B, C, A, so B.f calls super().f() which resolves to C.f, which in turn calls A.f, producing BCA.",
      "A is the common base and comes last in the MRO, so it cannot appear before C.",
      "D lists B before C as its bases, so B is first in the MRO, not C."
    ]
  },
  {
    q: "In JavaScript, what does console.log(0.1 + 0.2 === 0.3) print, and why?",
    code: "console.log(0.1 + 0.2 === 0.3);",
    options: [
      "true, because JavaScript rounds results to one decimal place",
      "true, because both sides are the same mathematical value",
      "false, because binary floating point cannot represent 0.1 and 0.2 exactly, so the sum is slightly off 0.3",
      "false, because strict equality compares only strings"
    ],
    answer: 2,
    why: [
      "JavaScript does not round results to one decimal place; it uses IEEE 754 doubles directly.",
      "Mathematically they are equal, but the stored binary approximations differ, so the comparison fails at runtime.",
      "Correct: 0.1 and 0.2 have no exact binary representation, and their sum is 0.30000000000000004, which is not equal to the double nearest 0.3.",
      "Strict equality compares numbers by value and type; it does not apply only to strings."
    ]
  }
]
