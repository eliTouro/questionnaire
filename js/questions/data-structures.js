export default [
  {
    q: "What is the time complexity of reading the element at index i of an array (given i)?",
    options: [
      "O(1), because the address is computed directly from the base address and index",
      "O(log n), because the array is searched like a balanced tree",
      "O(n), because elements before index i must be walked past",
      "O(i), because the cost grows with the size of the index"
    ],
    answer: 0,
    why: [
      "Arrays are stored contiguously, so address = base + i * elementSize, a constant-time computation regardless of n or i.",
      "Logarithmic time arises from halving a search space, but no searching happens in an index lookup.",
      "Walking past earlier elements describes a linked list, which lacks contiguous memory and direct indexing.",
      "The cost does not depend on the magnitude of i; the address arithmetic is the same for i = 0 and i = 1,000,000."
    ]
  },
  {
    q: "Items 1, 2, 3 are pushed onto an empty stack in that order, and then one pop is performed. Which value is returned?",
    options: [
      "1, because the oldest element leaves first",
      "3, because the most recently pushed element leaves first",
      "2, because the middle element is always removed",
      "It depends on whether the stack is array-based or list-based"
    ],
    answer: 1,
    why: [
      "Oldest-first removal is FIFO behavior, which describes a queue, not a stack.",
      "A stack is LIFO (last in, first out), so the most recently pushed item, 3, is popped first.",
      "A stack has no rule about removing a middle element; it only exposes its top.",
      "The abstract behavior (LIFO) is identical for any implementation; only the internal storage differs."
    ]
  },
  {
    q: "Which statement correctly describes a queue?",
    options: [
      "Elements are inserted and removed at the same end",
      "Elements are always kept in sorted order",
      "Elements are inserted at the rear and removed from the front",
      "Elements are removed in order of their key's hash value"
    ],
    answer: 2,
    why: [
      "Insertion and removal at the same end is the defining behavior of a stack (LIFO), not a queue.",
      "Sorted order is a property of a sorted list or priority structure; a plain queue preserves arrival order only.",
      "A queue is FIFO: enqueue at the rear and dequeue from the front, so the earliest arrival is served first.",
      "Hash values are used for placement in hash tables and have no role in queue ordering."
    ]
  },
  {
    q: "What is the time complexity of inserting a new node at the head of a singly linked list, given a pointer to the head?",
    options: [
      "O(n), because every existing node must be shifted over by one",
      "O(n), because the tail must be located before linking the new node",
      "O(log n), because the list is repeatedly split in half",
      "O(1), because only the new node's next and the head pointer change"
    ],
    answer: 3,
    why: [
      "Shifting is needed in arrays, but linked list nodes do not occupy fixed positions, so nothing is moved.",
      "Finding the tail is needed for appending without a tail pointer, not for inserting at the head.",
      "No halving takes place in this operation; a linked list has no structure to split by.",
      "Set new.next = head, then head = new; that is a fixed number of pointer updates independent of list length."
    ]
  },
  {
    q: "What is the average-case time complexity of lookup in a hash table with a good hash function and a bounded load factor?",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    answer: 0,
    why: [
      "A good hash spreads keys evenly, so chains or probe sequences stay short on average, giving expected constant time.",
      "O(log n) is typical for balanced trees, but hash tables do not search by comparisons across a hierarchy.",
      "O(n) is the worst case when all keys collide into one bucket, not the average with a good hash.",
      "O(n log n) is the cost of sorting, not of a single lookup."
    ]
  },
  {
    q: "What does an in-order traversal of a binary search tree produce?",
    options: [
      "Keys level by level from the root downward",
      "Keys in ascending sorted order",
      "Keys in the order they were inserted",
      "Keys with every parent listed after its children"
    ],
    answer: 1,
    why: [
      "Level-by-level output is breadth-first (level-order) traversal, which does not sort the keys.",
      "In-order visits left subtree, node, right subtree; since left keys < node < right keys, the output is sorted ascending.",
      "Insertion order is not preserved by the tree structure; in-order output is sorted regardless of insertion order.",
      "Parents after children describes post-order traversal, which is not sorted in general."
    ]
  },
  {
    q: "In a binary min-heap, where is the smallest element always located?",
    options: [
      "At the last position of the array",
      "At a leaf node chosen by the insertion path",
      "At the root",
      "At the left child of the root"
    ],
    answer: 2,
    why: [
      "The last array slot holds the most recently placed leaf, which can be any value that satisfies the heap property.",
      "Leaves are typically larger than their ancestors; a minimum cannot sit below a smaller or equal parent.",
      "The min-heap property says every parent is less than or equal to its children, so the global minimum is at the root.",
      "A heap only orders parent against child, so the root's left child is not necessarily smaller than the right child or anything else."
    ]
  },
  {
    q: "Why can binary search not be performed efficiently on a sorted singly linked list?",
    options: [
      "Linked lists cannot hold sorted data",
      "Sorted linked lists require O(n log n) space",
      "Binary search needs a stack that lists lack",
      "Reaching the middle node takes O(n), since there is no random access"
    ],
    answer: 3,
    why: [
      "A linked list can be kept sorted; the issue is access cost, not whether the order can exist.",
      "A sorted list uses O(n) space like any list; space is not the obstacle.",
      "Iterative binary search needs no stack; it needs indexed access to the middle element.",
      "Binary search jumps to the midpoint, but in a linked list reaching it requires traversal, which erases the O(log n) advantage."
    ]
  },
  {
    q: "What is the worst-case time to insert an element at the beginning of an array with n elements (without spare capacity tricks)?",
    options: [
      "O(n), because all existing elements must be shifted one position",
      "O(1), because the array index starts at zero",
      "O(log n), because the array can be split and merged",
      "O(n^2), because each shifted element requires a further scan"
    ],
    answer: 0,
    why: [
      "To free index 0 every existing element moves one slot to the right, which is n moves.",
      "Zero-based indexing makes reads O(1), but the slot is already occupied, so insertion still requires shifting.",
      "Splitting and merging are not part of how a contiguous array is modified.",
      "Each element is moved exactly once, so the total is linear, not quadratic."
    ]
  },
  {
    q: "Which technique resolves hash collisions by storing all keys that map to the same index in a list attached to that index?",
    options: [
      "Linear probing",
      "Separate chaining",
      "Double hashing",
      "Rehashing to a smaller table"
    ],
    answer: 1,
    why: [
      "Linear probing is open addressing: it places the key in the next free slot of the same array, not in an attached list.",
      "Separate chaining keeps a linked list (or similar) in each bucket holding all colliding keys.",
      "Double hashing is open addressing with a second hash function giving the probe step; there are no attached lists.",
      "Rehashing normally grows the table to lower the load factor; shrinking would increase collisions."
    ]
  },
  {
    q: "What is the height of a perfectly balanced binary search tree with n nodes, and thus the cost of a search in it?",
    options: [
      "O(n)",
      "O(sqrt n)",
      "O(log n)",
      "O(1)"
    ],
    answer: 2,
    why: [
      "O(n) is the height of a degenerate (chain-like) tree, not a balanced one.",
      "Square-root height does not match a binary branching structure, where each level can double the node count.",
      "Each level of a balanced binary tree roughly doubles the nodes, so n nodes need about log2 n levels.",
      "Constant height would require every node to be near the root, impossible for large n with at most two children each."
    ]
  },
  {
    q: "What is the time complexity of building a binary heap from an unsorted array of n elements using the bottom-up heapify (sift-down) method?",
    options: [
      "O(n log n), because each insertion costs log n",
      "O(log n), because only the root needs fixing",
      "O(n^2), because every pair must be compared",
      "O(n), because most nodes are near the bottom and sift down only a little"
    ],
    answer: 3,
    why: [
      "n separate insertions do cost O(n log n), but bottom-up heapify is cheaper than that naive approach.",
      "Fixing the root alone would leave the lower subtrees violating the heap property.",
      "Heaps need no all-pairs comparison; each sift-down follows a single root-to-leaf path.",
      "Half the nodes are leaves needing no work, a quarter sift at most 1 level, and so on; the sum of heights converges to O(n)."
    ]
  },
  {
    q: "A trie stores a set of words. What is the worst-case time to check whether a word of length L is present, ignoring alphabet-size effects?",
    options: [
      "O(L), independent of how many words are stored",
      "O(n), where n is the number of stored words",
      "O(L log n), because child nodes are searched in a balanced tree",
      "O(L * n), because each stored word is compared character by character"
    ],
    answer: 0,
    why: [
      "The search follows one edge per character, so it takes L steps whatever the dictionary size.",
      "Scanning all n words is what a plain list does; a trie avoids that by sharing prefixes.",
      "A standard trie finds each child in constant time (array or hash), so no log n factor is introduced.",
      "Comparing against every word would multiply cost by n, but the trie only walks a single path."
    ]
  },
  {
    q: "A graph has V vertices and E edges. How much space does an adjacency matrix use?",
    options: [
      "O(V + E)",
      "O(V^2)",
      "O(E^2)",
      "O(V log V)"
    ],
    answer: 1,
    why: [
      "O(V + E) is the space of an adjacency list, not a matrix.",
      "The matrix has one cell for every ordered pair of vertices, so it uses V x V cells regardless of how many edges exist.",
      "Space depends on the number of vertex pairs, not on squaring the edge count.",
      "No logarithmic structure is involved; the matrix is a plain two-dimensional table."
    ]
  },
  {
    q: "What does this code print?",
    code: "const s = [];\ns.push(4);\ns.push(7);\ns.pop();\ns.push(2);\ns.push(s.pop() + s.pop());\nconsole.log(s);",
    options: [
      "[ 4, 2 ]",
      "[ 11 ]",
      "[ 6 ]",
      "[ 2, 4 ]"
    ],
    answer: 2,
    why: [
      "[4, 2] is the stack just before the last line; the final push replaces both values with their sum.",
      "11 would be 4 + 7, but the 7 was already popped away and discarded earlier.",
      "After the first pop the stack is [4], then [4, 2]; the last line pops 2 and 4 and pushes their sum 6, giving [6].",
      "Order within a stack follows pushes, and the last line leaves a single element anyway, so this cannot occur."
    ]
  },
  {
    q: "What does this array-based queue code print?",
    code: "const q = [];\nq.push(1); q.push(2); q.push(3);\nq.shift();\nq.push(4);\nconsole.log(q.shift(), q);",
    options: [
      "4 [ 1, 2, 3 ]",
      "1 [ 3, 4 ]",
      "3 [ 2, 4 ]",
      "2 [ 3, 4 ]"
    ],
    answer: 3,
    why: [
      "shift removes from the front, not the end, so 4 (the last item pushed) is not returned.",
      "1 was already removed by the first shift, so it is not available for the second.",
      "3 is not at the front; removal follows FIFO, and 3 arrived after 2.",
      "After the first shift the queue is [2, 3], then push gives [2, 3, 4]; the second shift returns 2, leaving [3, 4]."
    ]
  },
  {
    q: "What does this function return when called with the head of the list 1 -> 2 -> 3 -> null?",
    code: "function reverse(head) {\n  let prev = null;\n  while (head) {\n    const next = head.next;\n    head.next = prev;\n    prev = head;\n    head = next;\n  }\n  return prev;\n}",
    options: [
      "The node 3, giving the list 3 -> 2 -> 1 -> null",
      "The node 1, giving the list 1 -> null",
      "null, because head is null when the loop ends",
      "The node 1, giving the list 1 -> 2 -> 3 -> null"
    ],
    answer: 0,
    why: [
      "Each iteration points the current node back at the previous one; when the loop ends prev is the old tail, 3, heading the reversed list.",
      "Node 1 does end up as the last node, but it points to null only at the end of the reversed list, not as a standalone result.",
      "head is indeed null after the loop, but the function returns prev, not head.",
      "That would be the unchanged list; the loop rewires every next pointer, so the order is reversed."
    ]
  },
  {
    q: "What order does this recursive depth-first traversal return?",
    code: "const g = { 0: [1, 2], 1: [3], 2: [3], 3: [] };\nfunction dfs(u, seen = []) {\n  seen.push(u);\n  for (const v of g[u]) if (!seen.includes(v)) dfs(v, seen);\n  return seen;\n}\nconsole.log(dfs(0));",
    options: [
      "[ 0, 1, 2, 3 ]",
      "[ 0, 1, 3, 2 ]",
      "[ 0, 2, 3, 1 ]",
      "[ 3, 1, 2, 0 ]"
    ],
    answer: 1,
    why: [
      "That is the breadth-first order (level by level); DFS goes deep into vertex 1's neighbor before visiting 2.",
      "Visit 0, go deep via its first neighbor 1, then to 3, backtrack to 0 and visit 2 (3 is already seen): 0, 1, 3, 2.",
      "That would result from exploring 0's neighbors in the order 2 then 1, but the adjacency list gives 1 first.",
      "The traversal starts at vertex 0 and records vertices when first visited, so 0 must come first."
    ]
  },
  {
    q: "When deleting a node with two children from a binary search tree, which replacement keeps the BST property valid?",
    options: [
      "Its left child, moved up with the right subtree discarded",
      "Its parent, swapped down into its position",
      "Its in-order successor (or predecessor), copied in and then removed from its old position",
      "Any leaf of the tree, since leaves are easiest to remove"
    ],
    answer: 2,
    why: [
      "Discarding the right subtree would delete nodes that should remain in the tree.",
      "Swapping with the parent would put a value on the wrong side relative to the other child's subtree.",
      "The in-order successor is the smallest key in the right subtree, so it is greater than all left keys and not greater than any right key.",
      "An arbitrary leaf is usually not between the left and right subtree keys, so placing it at the node's position would break the ordering."
    ]
  },
  {
    q: "Keys 1, 2, 3, ..., n are inserted into an initially empty plain (non-balancing) BST in increasing order. What is the worst-case time to search for a key in the resulting tree?",
    options: [
      "O(log n), because BST search always halves the range",
      "O(1), because the keys are consecutive integers",
      "O(n log n), because each insertion rebalances the tree",
      "O(n), because the tree degenerates into a right-leaning chain"
    ],
    answer: 3,
    why: [
      "Halving happens only if the tree is balanced; plain BSTs make no such guarantee.",
      "Consecutive keys do not allow direct access in a BST; search still follows child pointers from the root.",
      "A plain BST never rebalances, and a search is a single path, not a sort-like cost.",
      "Each new key is larger than all earlier ones and becomes a right child, producing a chain of height n; searching for n visits every node."
    ]
  },
  {
    q: "A dynamic array doubles its capacity whenever it is full. Which statement describes the cost of appending n elements one at a time?",
    options: [
      "Amortized O(1) per append, O(n) total, although an individual append can cost O(n)",
      "Worst-case O(1) for every single append",
      "Amortized O(log n) per append, because capacity doubles log n times",
      "Amortized O(n) per append, because every append may need to copy"
    ],
    answer: 0,
    why: [
      "Copies cost 1 + 2 + 4 + ... up to n, which sums to less than 2n, so the average per append is constant even if one resize is O(n).",
      "A resize copies all current elements, so a single append can cost O(n); constant time holds only on average.",
      "Doubling occurs log n times, but their combined copy cost is a geometric series bounded by 2n, not n log n.",
      "Only occasional appends trigger copying; averaged over all of them the cost per append is constant."
    ]
  },
  {
    q: "What is the worst-case time to determine whether a given value x is present in a binary max-heap of n elements?",
    options: [
      "O(1), because the maximum is at the root",
      "O(n), because the heap has no ordering between siblings or subtrees",
      "O(log n), because the heap is a balanced tree",
      "O(n log n), because the heap must be sorted first"
    ],
    answer: 1,
    why: [
      "The root gives only the maximum; it says nothing about whether an arbitrary x is present.",
      "The heap property only relates parents to children, so x could be in either subtree, and it may require examining every node.",
      "Balance bounds height, but without left/right ordering you cannot discard half the tree as in a BST.",
      "No sort is required; a single linear scan of the array suffices, which is cheaper."
    ]
  },
  {
    q: "In a hash table using open addressing (linear probing), why can a deleted slot not simply be marked empty?",
    options: [
      "The table would shrink and trigger a rehash",
      "The hash function would change for later keys",
      "It could break probe sequences, making later keys unreachable; a tombstone marker is used",
      "Empty slots can only be created during resizing"
    ],
    answer: 2,
    why: [
      "Deletions do not alter table capacity; resizing is controlled by the load factor policy.",
      "The hash function is a fixed function of the key and never depends on slot contents.",
      "A lookup stops at the first empty slot, so freeing a slot in the middle of a probe chain would hide keys stored beyond it; tombstones keep the chain intact.",
      "Empty slots exist from the start, and deletion with a tombstone is the standard approach instead of freeing."
    ]
  },
  {
    q: "These keys are inserted, in order, into an empty plain BST. Which preorder (root, left, right) traversal results?",
    code: "insert(5)\ninsert(3)\ninsert(8)\ninsert(1)\ninsert(4)\ninsert(7)",
    options: [
      "1, 4, 3, 7, 8, 5",
      "1, 3, 4, 5, 7, 8",
      "5, 3, 8, 1, 4, 7",
      "5, 3, 1, 4, 8, 7"
    ],
    answer: 3,
    why: [
      "That is the post-order traversal (left, right, root), not preorder.",
      "That is the in-order traversal, which returns the keys sorted.",
      "That is the insertion order (also the level order here); preorder follows each left subtree fully before the right.",
      "The tree has root 5, left 3 (children 1 and 4) and right 8 (left child 7); preorder gives 5, 3, 1, 4, 8, 7."
    ]
  },
  {
    q: "Dijkstra's shortest-path algorithm on a graph with V vertices and E edges (non-negative weights) uses an adjacency list and a binary min-heap as priority queue. What is its running time?",
    options: [
      "O((V + E) log V)",
      "O(V * E)",
      "O(V + E)",
      "O(V^2 log V)"
    ],
    answer: 0,
    why: [
      "Each vertex is extracted and each edge may cause a heap update or insertion, each costing O(log V), giving O((V + E) log V).",
      "O(V * E) is closer to Bellman-Ford, which relaxes every edge V - 1 times, not Dijkstra with a heap.",
      "O(V + E) is the cost of BFS or DFS; Dijkstra also pays the heap's logarithmic cost per operation.",
      "O(V^2) arises with an array-based priority queue; with a heap the quadratic term does not appear."
    ]
  }
]
