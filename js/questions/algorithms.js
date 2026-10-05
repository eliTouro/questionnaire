export default [
  {
    q: "What is the worst-case time complexity of binary search on a sorted array of n elements?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: 1,
    why: [
      "O(1) would require knowing the target's position in advance; binary search still has to narrow the range step by step.",
      "Each comparison halves the remaining range, so at most about log2(n) comparisons are needed.",
      "O(n) describes linear search, which does not exploit the sorted order.",
      "O(n log n) is the cost of sorting, not of a single search; searching does only log n work."
    ]
  },
  {
    q: "What is the worst-case time complexity of bubble sort on n elements?",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(n^2)"],
    answer: 3,
    why: [
      "O(n) is the best case, reached only when the input is already sorted and the algorithm stops after one pass.",
      "O(n log n) is the bound of merge sort and heap sort; bubble sort compares adjacent pairs and needs far more passes.",
      "O(log n) is too small; every element must be examined at least once, so any sort is at least linear.",
      "In the worst case (reverse-sorted input) about n passes of up to n comparisons are made, giving O(n^2)."
    ]
  },
  {
    q: "Which of the following sorting algorithms is stable and guarantees O(n log n) time in the worst case?",
    options: ["Merge sort", "Quicksort", "Heap sort", "Selection sort"],
    answer: 0,
    why: [
      "Merge sort splits in half and merges, giving O(n log n) always, and taking equal elements from the left half first keeps it stable.",
      "Quicksort is typically not stable and degrades to O(n^2) with consistently bad pivots.",
      "Heap sort guarantees O(n log n) but is not stable, because heap operations swap distant elements.",
      "Selection sort is O(n^2) in every case, and the usual swap-based version is not stable either."
    ]
  },
  {
    q: "Which data structure does breadth-first search (BFS) use to decide which vertex to visit next?",
    options: ["A stack", "A binary search tree", "A queue", "A hash set only"],
    answer: 2,
    why: [
      "A stack gives last-in-first-out order, which is what depth-first search uses, not BFS.",
      "A BST orders keys, but BFS does not need ordering; it needs the oldest discovered vertex first.",
      "A FIFO queue processes vertices in the order they were discovered, which yields level-by-level exploration.",
      "A hash set can record visited vertices but cannot provide the ordering BFS requires."
    ]
  },
  {
    q: "What is the time complexity of this loop in terms of n?",
    code: "let c = 0;\nfor (let i = 1; i < n; i *= 2) {\n  c++;\n}",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(sqrt n)"],
    answer: 1,
    why: [
      "O(n) would require i to increase by a constant amount; here i doubles each time.",
      "i takes the values 1, 2, 4, 8, ... so the loop runs about log2(n) times.",
      "There is no nested loop or per-iteration linear work, so there is no extra factor of n.",
      "Doubling reaches n much faster than sqrt(n) steps would suggest; the iteration count is logarithmic, not a square root."
    ]
  },
  {
    q: "What happens when this function is called as countdown(3) in JavaScript?",
    code: "function countdown(n) {\n  console.log(n);\n  return countdown(n - 1);\n}",
    options: [
      "It prints 3, 2, 1 and then returns undefined",
      "It prints 3, 2, 1, 0 and stops because 0 is falsy",
      "It returns 0 after printing 3, 2, 1, 0",
      "It keeps printing smaller numbers until a stack overflow RangeError"
    ],
    answer: 3,
    why: [
      "Nothing in the code stops at 1; there is no base case, so recursion does not end after 1.",
      "The function never tests n, so zero being falsy has no effect.",
      "There is no return of 0 anywhere, since the function never reaches a terminating branch.",
      "With no base case the recursion never terminates, call frames pile up, and the engine throws a RangeError (stack overflow)."
    ]
  },
  {
    q: "What defines a greedy algorithm?",
    options: [
      "It repeatedly makes the locally best choice without reconsidering earlier choices",
      "It tries all possible choices and keeps the best overall result",
      "It stores answers to overlapping subproblems in a table",
      "It splits a problem in half and solves each half recursively"
    ],
    answer: 0,
    why: [
      "A greedy algorithm commits to the choice that looks best right now and never backtracks, which is correct only when the problem has the greedy-choice property.",
      "Trying all choices is exhaustive search or backtracking, not greedy.",
      "Tabulating overlapping subproblems is dynamic programming.",
      "Halving and recursing is divide and conquer."
    ]
  },
  {
    q: "Which algorithm finds the shortest path (fewest edges) from a source in an unweighted graph?",
    options: ["Depth-first search", "Kruskal's algorithm", "Breadth-first search", "Topological sort"],
    answer: 2,
    why: [
      "DFS dives deep along one branch and may reach a vertex first via a long path, so it does not give fewest edges.",
      "Kruskal's builds a minimum spanning tree, which is a different problem from shortest paths.",
      "BFS explores in order of increasing distance, so the first time it reaches a vertex is along a shortest path.",
      "Topological sort orders the vertices of a DAG and computes no distances."
    ]
  },
  {
    q: "What is the time complexity of fib(n) below, given the memo is shared across calls and starts empty?",
    code: "const memo = {};\nfunction fib(n) {\n  if (n < 2) return n;\n  if (memo[n] !== undefined) return memo[n];\n  return memo[n] = fib(n - 1) + fib(n - 2);\n}",
    options: ["O(log n)", "O(n)", "O(n^2)", "O(2^n)"],
    answer: 1,
    why: [
      "Computing fib(n) requires fib values for every smaller index, so it cannot be logarithmic here.",
      "Each value from 2 to n is computed once and then served from the memo, so total work is linear.",
      "Each subproblem takes constant extra work after its children are cached, so there is no quadratic term.",
      "O(2^n) is the cost of the naive version without memoization; caching removes the repeated subtrees."
    ]
  },
  {
    q: "Why can Dijkstra's algorithm give wrong answers on graphs with negative edge weights?",
    options: [
      "It cannot represent negative numbers in its priority queue",
      "It only works on trees, which cannot have negative edges",
      "It always runs in exponential time when weights are negative",
      "Once a vertex is finalized it is never updated, but a later negative edge could have produced a shorter path"
    ],
    answer: 3,
    why: [
      "Priority queues store negative numbers fine; the failure is in the algorithm's logic, not the data structure.",
      "Dijkstra works on general graphs with non-negative weights, not only trees.",
      "Running time is not the issue; the algorithm still terminates, but returns incorrect distances.",
      "Dijkstra assumes that extending a path never makes it shorter. A negative edge breaks that, so a finalized distance can be wrong."
    ]
  },
  {
    q: "Quicksort always uses the first element as pivot. On which input does it take O(n^2) time?",
    options: [
      "An already sorted array",
      "An array of random values",
      "An array whose elements alternate between large and small values",
      "An array with exactly two distinct values, evenly split"
    ],
    answer: 0,
    why: [
      "On sorted input the first element is the minimum, so each partition peels off one element and recursion depth reaches n, giving O(n^2).",
      "Random data tends to produce reasonably balanced partitions, giving O(n log n) on average.",
      "An alternating pattern does not make the first element consistently an extreme, so splits are not systematically degenerate.",
      "Even with two distinct values the partitions are not forced to one side by the first-element rule in the way sorted input forces them."
    ]
  },
  {
    q: "Using the Master Theorem, what is the solution of T(n) = 2T(n/2) + n?",
    options: ["Theta(n)", "Theta(n^2)", "Theta(n log n)", "Theta(log n)"],
    answer: 2,
    why: [
      "Theta(n) would hold if the combine cost dominated, but here the two recursive halves contribute equally with the n combine step.",
      "Theta(n^2) would arise from a much larger combine cost or more subproblems, such as 4T(n/2) + n.",
      "Here a = 2, b = 2, so n^(log_b a) = n matches f(n) = n, which is case 2 and gives Theta(n log n).",
      "Theta(log n) is the solution of T(n) = T(n/2) + 1, which has no linear combine cost."
    ]
  },
  {
    q: "What is the time complexity of Dijkstra's algorithm using a binary min-heap on a graph with V vertices and E edges?",
    options: ["O(V^2 + E)", "O((V + E) log V)", "O(V * E)", "O(E log E + V^2)"],
    answer: 1,
    why: [
      "O(V^2) is the bound for the simple array-based implementation, not the heap version.",
      "Each vertex is extracted and each edge may trigger a heap update, each costing O(log V), giving O((V + E) log V).",
      "O(V * E) is the bound of Bellman-Ford, which tolerates negative weights.",
      "This mixes bounds from other algorithms and does not match any standard Dijkstra implementation."
    ]
  },
  {
    q: "What is the best possible worst-case time of any comparison-based sorting algorithm?",
    options: ["Omega(n)", "Omega(log n)", "Omega(n^2)", "Omega(n log n)"],
    answer: 3,
    why: [
      "Omega(n) is only the trivial bound of reading the input; it is not tight for comparison sorting.",
      "Omega(log n) is far too small; a decision tree needs log2(n!) leaves' depth, which is about n log n.",
      "Omega(n^2) is not a lower bound, since merge sort and heap sort run in O(n log n).",
      "A decision tree must distinguish n! orderings, so its height is at least log2(n!), which is Theta(n log n)."
    ]
  },
  {
    q: "The standard dynamic-programming solution to the 0/1 knapsack problem with n items and capacity W runs in which time?",
    options: [
      "O(n * W), which is pseudo-polynomial",
      "O(n log W), which is polynomial in the input size",
      "O(2^n), because every subset is stored",
      "O(n + W), because items are processed once"
    ],
    answer: 0,
    why: [
      "The table has n rows and W+1 columns, each filled in constant time; since W is a number whose size is log W bits, this is pseudo-polynomial.",
      "There is no log W factor; the table has W columns, not log W of them.",
      "Subsets are not enumerated; DP reuses overlapping subproblems to avoid 2^n work.",
      "Each item is considered for every capacity value, so the work multiplies rather than adds."
    ]
  },
  {
    q: "What does f(5) return?",
    code: "function f(n) {\n  if (n <= 1) return 1;\n  return f(n - 1) + f(n - 2);\n}",
    options: ["5", "13", "8", "21"],
    answer: 2,
    why: [
      "5 is f(4), not f(5); it is one step too early in the sequence.",
      "13 is the next-but-one value; f(5) is not that far along.",
      "f(0)=1, f(1)=1, f(2)=2, f(3)=3, f(4)=5, so f(5)=5+3=8.",
      "21 is f(7); the recursion is only five levels from the base."
    ]
  },
  {
    q: "Which condition must a graph satisfy for a topological ordering of its vertices to exist?",
    options: [
      "It must be undirected and connected",
      "It must be a directed acyclic graph",
      "It must have non-negative edge weights",
      "It must be a tree"
    ],
    answer: 1,
    why: [
      "Topological order is defined for directed edges; an undirected graph has no direction to respect.",
      "A cycle would require each vertex on it to come before itself, so an ordering exists exactly when the directed graph has no cycles.",
      "Edge weights are irrelevant to topological ordering, which depends only on edge direction.",
      "Trees are one example, but many non-tree DAGs, such as ones with multiple paths between vertices, also have topological orders."
    ]
  },
  {
    q: "Appending to a dynamic array that doubles its capacity when full has what amortized cost per append?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    answer: 3,
    why: [
      "O(n) is the cost of a single resize, but resizes are rare, so it does not describe the average cost.",
      "There is no logarithmic factor; the doubling copies form a geometric series.",
      "n appends do not cost n log n in total; total copying is bounded by about 2n.",
      "Copy costs 1 + 2 + 4 + ... sum to less than 2n over n appends, so the average cost per append is constant."
    ]
  },
  {
    q: "What is the solution of T(n) = 3T(n/2) + n?",
    options: [
      "Theta(n^(log2 3)), about n^1.585",
      "Theta(n log n)",
      "Theta(n^2)",
      "Theta(n^1.5)"
    ],
    answer: 0,
    why: [
      "Here a = 3, b = 2, so n^(log2 3) is about n^1.585, which grows faster than f(n) = n; case 1 gives Theta(n^(log2 3)).",
      "Theta(n log n) would need a = 2; with three subproblems the leaves dominate.",
      "Theta(n^2) would need a = 4; log2 3 is below 2.",
      "log2 3 is 1.585, not 1.5, so n^1.5 does not match the exponent."
    ]
  },
  {
    q: "The longest common subsequence of strings of lengths m and n is computed with the standard DP table. What are its time complexity and recurrence idea?",
    options: [
      "O(m + n); extend a match, otherwise skip a character from one string",
      "O(2^(m+n)); try all subsequence pairs",
      "O(m * n); on a match take the diagonal plus 1, otherwise take the max of left and up",
      "O(m * n * min(m, n)); compare all substrings pairwise"
    ],
    answer: 2,
    why: [
      "A linear bound is too small; the table has one cell for every pair of prefixes.",
      "Enumerating all subsequences is exponential, which DP is designed to avoid.",
      "The table has (m+1)(n+1) cells, each filled in O(1) from the diagonal on a match or from the max of its left and upper neighbors otherwise.",
      "No cubic factor appears; each cell needs only constant work from three neighbors."
    ]
  },
  {
    q: "Which statement about the Bellman-Ford algorithm is correct?",
    options: [
      "It runs in O(V + E) time and requires non-negative weights",
      "It runs in O(V * E) time, handles negative edges and can detect negative cycles",
      "It runs in O(E log V) time and only works on DAGs",
      "It finds all-pairs shortest paths in O(V^3)"
    ],
    answer: 1,
    why: [
      "O(V + E) is the cost of a single traversal; Bellman-Ford relaxes all edges up to V-1 times and allows negative weights.",
      "It relaxes every edge V-1 times, so O(V * E), and an extra pass that still improves a distance reveals a negative cycle.",
      "That mixes in heap-based costs and a DAG restriction; Bellman-Ford works on general directed graphs.",
      "O(V^3) all-pairs is Floyd-Warshall; Bellman-Ford is single-source."
    ]
  },
  {
    q: "A greedy algorithm that always takes the largest coin that fits is used with coin values {1, 3, 4} to make 6. What is true?",
    options: [
      "It returns 4 + 1 + 1 and that is optimal",
      "It returns 3 + 3 and that is optimal",
      "It returns 4 + 1 + 1 but 3 + 3 uses fewer coins, so no answer is optimal",
      "It returns 4 + 1 + 1 (3 coins), but 3 + 3 (2 coins) is better, so greedy is not optimal here"
    ],
    answer: 3,
    why: [
      "Greedy does give 4 + 1 + 1, but 3 coins is not the minimum, so calling it optimal is wrong.",
      "Greedy picks 4 first (the largest that fits), not 3, so it does not return 3 + 3.",
      "3 + 3 is a valid optimal solution, so an optimal answer does exist; the statement that none is optimal is false.",
      "Greedy takes 4, then 1, then 1 for 3 coins, while 3 + 3 uses only 2, showing the greedy-choice property fails for this coin system."
    ]
  },
  {
    q: "What is the time complexity of this algorithm, where d is a V x V matrix of distances?",
    code: "for (let k = 0; k < V; k++)\n  for (let i = 0; i < V; i++)\n    for (let j = 0; j < V; j++)\n      if (d[i][k] + d[k][j] < d[i][j])\n        d[i][j] = d[i][k] + d[k][j];",
    options: ["Theta(V^3)", "Theta(V^2)", "Theta(V^2 log V)", "Theta(V * E)"],
    answer: 0,
    why: [
      "This is the Floyd-Warshall algorithm: three nested loops each running V times with constant work inside gives Theta(V^3).",
      "V^2 would be the case for two nested loops; the extra loop over k adds another factor of V.",
      "There is no logarithmic step; every iteration does O(1) work.",
      "The loops run over matrix indices, not over edges, so E does not appear."
    ]
  },
  {
    q: "Quickselect finds the k-th smallest element of an unsorted array of n elements. What are its average and worst-case times?",
    options: [
      "O(n log n) average, O(n log n) worst",
      "O(log n) average, O(n) worst",
      "O(n) average, O(n^2) worst",
      "O(n) average, O(n) worst"
    ],
    answer: 2,
    why: [
      "Quickselect only recurses into one side, so its average work is lower than a full sort's n log n.",
      "It must at least scan the array once per partition, so average cannot be O(log n).",
      "Expected work is n + n/2 + n/4 + ... = O(n), but consistently bad pivots shrink the problem by only one element, giving O(n^2).",
      "Plain quickselect has no linear worst-case guarantee; that needs a median-of-medians pivot rule."
    ]
  },
  {
    q: "Building a binary heap from n arbitrary elements by calling sift-down from the last internal node up to the root takes what time?",
    options: ["O(n log n) because each of n elements sifts down log n levels", "O(log n)", "O(n^2)", "O(n)"],
    answer: 3,
    why: [
      "This is a valid upper bound but not tight; most nodes are near the bottom and sift down only a few levels.",
      "O(log n) is the cost of one insertion or removal; building touches all n elements.",
      "There is no quadratic behaviour; each sift-down is bounded by the node's height.",
      "About n/2 nodes sift 0 levels, n/4 sift 1, and so on; the sum of heights is bounded by 2n, so building is O(n)."
    ]
  }
]
