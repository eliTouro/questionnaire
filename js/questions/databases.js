export default [
  {
    q: "Which SQL clause is used to filter groups after aggregation has been computed?",
    options: ["HAVING", "WHERE", "ORDER BY", "DISTINCT"],
    answer: 0,
    why: [
      "HAVING is evaluated after GROUP BY, so it can reference aggregates such as COUNT(*) or SUM(x) to keep or discard whole groups.",
      "WHERE runs before grouping and filters individual rows, so it cannot use aggregate functions.",
      "ORDER BY only sorts the final result; it never removes rows or groups.",
      "DISTINCT removes duplicate result rows; it does not filter based on aggregate conditions."
    ]
  },
  {
    q: "Which pair of properties must a primary key satisfy?",
    options: ["Unique and sorted", "Unique and non-null", "Non-null and indexed by a hash", "Numeric and auto-incrementing"],
    answer: 1,
    why: [
      "Sorting is a property of an index or a query result, not a requirement of a key; a primary key need not be stored in any order.",
      "A primary key must uniquely identify each row and may never be NULL, so every row has a definite identity.",
      "Primary keys are usually backed by an index, but it is typically a B-tree and the index type is not part of the definition.",
      "Keys can be text, UUIDs or composites; auto-increment is just a convenient way to generate surrogate keys."
    ]
  },
  {
    q: "What does an INNER JOIN between tables A and B return?",
    options: ["All rows from A, with NULLs where B has no match", "All rows from both tables, matched or not", "Only the row pairs that satisfy the join condition", "Every possible pairing of rows from A and B"],
    answer: 2,
    why: [
      "That describes a LEFT OUTER JOIN, which preserves unmatched rows from A.",
      "That describes a FULL OUTER JOIN, which preserves unmatched rows from both sides.",
      "An INNER JOIN keeps only combinations of rows where the ON condition is true, discarding unmatched rows on either side.",
      "That is a CROSS JOIN (Cartesian product), which has no join condition filtering the pairings."
    ]
  },
  {
    q: "What is the main purpose of a foreign key constraint?",
    options: ["To speed up all queries on the column", "To encrypt sensitive column values", "To make the column unique within its table", "To enforce referential integrity between tables"],
    answer: 3,
    why: [
      "A foreign key does not by itself create an index in every DBMS, and speed is not its purpose.",
      "Foreign keys have nothing to do with encryption; they are a consistency constraint.",
      "Foreign key values can repeat freely (many orders may reference one customer); uniqueness is the job of UNIQUE or primary key.",
      "A foreign key guarantees every value references an existing row in the parent table, preventing orphaned rows."
    ]
  },
  {
    q: "In ACID, what does Atomicity guarantee?",
    options: ["Concurrent transactions never see each other's changes", "A transaction is applied entirely or not at all", "Committed data survives a crash", "Data always satisfies the declared constraints"],
    answer: 1,
    why: [
      "That is Isolation, which governs how concurrent transactions interact.",
      "Atomicity means all of a transaction's operations succeed together, or on failure none of them take effect (rollback).",
      "That is Durability, usually achieved with write-ahead logging.",
      "That is Consistency, which moves the database from one valid state to another."
    ]
  },
  {
    q: "What is the typical trade-off of adding an index on a column?",
    options: ["Faster reads on that column, but slower writes and more storage", "Faster writes and reads, with no downside", "Slower reads but less storage use", "Faster reads, but only for the primary key column"],
    answer: 0,
    why: [
      "Indexes let the engine locate rows without scanning the table, but each INSERT, UPDATE or DELETE must also maintain the index, and the index occupies space.",
      "Indexes are never free: every write must also update them, so writes get slower.",
      "Indexes consume extra storage, and their purpose is to make lookups faster, not slower.",
      "Secondary indexes can be created on any column; they are not limited to the primary key."
    ]
  },
  {
    q: "In a LEFT JOIN from table A to table B, what appears in B's columns for an A row that has no matching B row?",
    options: ["The row is dropped from the result", "Zero or empty string defaults", "The values from the previous matched row", "NULL in every B column"],
    answer: 3,
    why: [
      "Dropping unmatched rows is the behavior of an INNER JOIN, not a LEFT JOIN.",
      "SQL does not substitute type defaults; missing data is represented explicitly as NULL.",
      "SQL never carries values forward from other rows during a join.",
      "A LEFT JOIN preserves every A row and fills the B columns with NULL when no match exists."
    ]
  },
  {
    q: "Which category of NoSQL database is Redis most commonly classified as?",
    options: ["Document store", "Column-family store", "Key-value store", "Graph database"],
    answer: 2,
    why: [
      "Document stores such as MongoDB hold JSON-like documents that can be queried by field; Redis primarily maps keys to values.",
      "Column-family stores such as Cassandra organize data into wide rows grouped by column families.",
      "Redis maps keys to values (strings, hashes, lists, sets), making it a key-value store used for caching and fast lookups.",
      "Graph databases such as Neo4j model nodes and edges and are optimized for traversals."
    ]
  },
  {
    q: "Given the table and query below, what do COUNT(*) and COUNT(x) return, in that order?",
    code: "CREATE TABLE t(x INT);\nINSERT INTO t VALUES (1), (NULL), (3), (NULL);\nSELECT COUNT(*), COUNT(x) FROM t;",
    options: ["4 and 4", "4 and 2", "2 and 2", "2 and 4"],
    answer: 1,
    why: [
      "COUNT(x) skips NULLs, so it cannot equal the full row count when NULLs are present.",
      "COUNT(*) counts all 4 rows, while COUNT(x) counts only the 2 rows where x is not NULL.",
      "COUNT(*) does not ignore NULLs; it counts rows regardless of column values.",
      "This reverses the behavior: COUNT(*) is never smaller than COUNT(column)."
    ]
  },
  {
    q: "A table has a row where x is NULL. What does the query SELECT * FROM t WHERE x = NULL return for that row?",
    options: ["The row is not returned, because the comparison evaluates to UNKNOWN", "The row is returned, because NULL equals NULL", "An error is raised for comparing with NULL", "The row is returned only if x is a nullable column"],
    answer: 0,
    why: [
      "Comparing anything to NULL with = yields UNKNOWN, and WHERE keeps only rows where the condition is TRUE; use IS NULL instead.",
      "NULL means unknown, so NULL = NULL is not true; it is UNKNOWN.",
      "SQL allows the comparison syntactically; it just never evaluates to true, so no error occurs.",
      "Column nullability does not change the three-valued logic; the predicate is UNKNOWN for a NULL value either way."
    ]
  },
  {
    q: "A table has primary key (student_id, course_id) and also stores student_name. Which normal form does this design violate?",
    code: "enrollment(\n  student_id, course_id,\n  student_name, grade\n)\nPRIMARY KEY (student_id, course_id)",
    options: ["First normal form, because the key is composite", "Third normal form only, not second", "Second normal form, due to a partial dependency", "Boyce-Codd normal form only, not third"],
    answer: 2,
    why: [
      "Composite keys are allowed in 1NF; 1NF concerns atomic values and no repeating groups.",
      "The problem is a dependency on part of the key, which is a 2NF issue and is more fundamental than 3NF's transitive dependencies.",
      "student_name depends only on student_id, part of the composite key. A partial dependency violates 2NF; the fix is a separate student table.",
      "The design fails 2NF, and a table failing 2NF also fails 3NF and BCNF, so it is not a BCNF-only violation."
    ]
  },
  {
    q: "In employee(emp_id, dept_id, dept_name) with key emp_id, where dept_id determines dept_name, which normal form is violated?",
    options: ["1NF, because dept_name repeats across rows", "2NF, because emp_id is a composite key", "BCNF, but never 3NF", "3NF, due to a transitive dependency"],
    answer: 3,
    why: [
      "Repeated values do not violate 1NF; 1NF only requires atomic values and no repeating groups.",
      "The key emp_id is a single column, so no partial dependency is possible; 2NF holds.",
      "A transitive dependency on a non-key attribute violates 3NF itself (and therefore BCNF as well).",
      "emp_id -> dept_id -> dept_name is a transitive dependency of a non-key column on the key, which violates 3NF; move departments into their own table."
    ]
  },
  {
    q: "Transaction T1 reads a row twice. In between, T2 updates that row and commits, and T1's second read returns a different value. What is this anomaly called?",
    options: ["Non-repeatable read", "Dirty read", "Phantom read", "Lost update"],
    answer: 0,
    why: [
      "A non-repeatable read is when the same row read twice in one transaction changes because another transaction committed an update in between.",
      "A dirty read would require T1 to see T2's uncommitted change; here T2 had already committed.",
      "A phantom involves a repeated range query returning a different set of rows, not a changed value in the same row.",
      "A lost update is when two writers overwrite each other's changes; here T1 only reads."
    ]
  },
  {
    q: "T1 runs SELECT ... WHERE price BETWEEN 10 AND 20 twice. Between runs, T2 inserts and commits a new row with price 15, and the second run returns an extra row. What anomaly is this?",
    options: ["Dirty read", "Non-repeatable read", "Phantom read", "Write skew"],
    answer: 2,
    why: [
      "A dirty read involves seeing uncommitted data, but T2's insert was committed.",
      "A non-repeatable read concerns a row that already existed changing value, not a new row appearing.",
      "A phantom read is when a repeated predicate or range query sees new (or missing) rows inserted or deleted by another committed transaction.",
      "Write skew involves two transactions writing based on a stale read; it is not a read anomaly within one transaction."
    ]
  },
  {
    q: "A composite B-tree index exists on (a, b, c). Which query can use the index's leftmost-prefix ordering to seek directly to matching entries?",
    options: ["WHERE b = 2 AND c = 3", "WHERE a = 1 AND b = 2", "WHERE c = 3", "WHERE b = 2"],
    answer: 1,
    why: [
      "Without a constraint on a, entries matching b and c are scattered throughout the index, so it cannot seek by prefix.",
      "The predicates on a and b form a leftmost prefix of (a, b, c), so the index can seek straight to the matching range.",
      "c is the last column; entries with c = 3 are scattered across all (a, b) combinations.",
      "b is not the leading column, so matches are not contiguous in the index."
    ]
  },
  {
    q: "Why does the following query fail in standard SQL?",
    code: "SELECT price * qty AS total\nFROM orders\nWHERE total > 100;",
    options: ["Aliases may only be used in GROUP BY", "Multiplication is not allowed in SELECT", "WHERE cannot reference numeric columns", "WHERE is logically evaluated before the SELECT list defines the alias"],
    answer: 3,
    why: [
      "Standard SQL does not restrict aliases to GROUP BY; some engines allow them in GROUP BY or ORDER BY, but that is not the reason here.",
      "Arithmetic expressions in SELECT are perfectly valid.",
      "WHERE can filter on numeric columns; the problem is only the alias.",
      "Logical evaluation order is FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, so the alias total does not exist yet when WHERE runs; repeat the expression or use a subquery."
    ]
  },
  {
    q: "Table A has id values 1, 2, 2 and table B has id values 2, 2, 3. How many rows does the query return?",
    code: "SELECT *\nFROM A JOIN B\n  ON A.id = B.id;",
    options: ["4", "2", "3", "6"],
    answer: 0,
    why: [
      "Each of A's two rows with id 2 matches each of B's two rows with id 2, giving 2 x 2 = 4 result rows; ids 1 and 3 have no partner.",
      "A join pairs every matching combination, not just one match per row, so duplicates multiply rather than being paired one-to-one.",
      "Three would count distinct ids or unmatched rows; an INNER JOIN produces no rows for the unmatched ids 1 and 3.",
      "Six is the number of rows in A plus B; the join output only contains matching pairs."
    ]
  },
  {
    q: "Table a contains ids 1, 2, 3 and table b contains ids 2 and NULL. What does this query return?",
    code: "SELECT id FROM a\nWHERE id NOT IN (\n  SELECT id FROM b\n);",
    options: ["1 and 3", "No rows", "1, 2 and 3", "A runtime error"],
    answer: 1,
    why: [
      "This is the intuitive but wrong answer: it ignores the NULL in the subquery.",
      "NOT IN expands to id <> 2 AND id <> NULL; the NULL comparison is UNKNOWN, so no row can evaluate to TRUE. Use NOT EXISTS to avoid this trap.",
      "id 2 is certainly excluded because it appears in b, so it cannot be returned.",
      "SQL permits NULLs inside an IN or NOT IN subquery; the result is simply empty, not an error."
    ]
  },
  {
    q: "Which anomaly can still occur under snapshot isolation (for example PostgreSQL REPEATABLE READ) but is prevented by true serializable isolation?",
    options: ["Dirty read", "Non-repeatable read", "Write skew", "Dirty write"],
    answer: 2,
    why: [
      "Snapshot isolation reads only committed data from its snapshot, so dirty reads cannot happen.",
      "Each transaction reads from a fixed snapshot, so repeated reads of a row return the same value.",
      "Write skew happens when two transactions read overlapping data and then write disjoint rows, each based on a now-stale condition (such as two on-call doctors both going off call). Snapshot isolation allows this; serializability does not.",
      "Snapshot isolation uses first-committer-wins or write locks to prevent overwriting uncommitted writes."
    ]
  },
  {
    q: "Two transactions run concurrently as shown. Under a locking database, what typically happens?",
    code: "T1: UPDATE acct SET bal = bal-10 WHERE id=1;\nT2: UPDATE acct SET bal = bal-10 WHERE id=2;\nT1: UPDATE acct SET bal = bal+10 WHERE id=2;\nT2: UPDATE acct SET bal = bal+10 WHERE id=1;",
    options: ["Both succeed, because row locks are shared", "T2 silently overwrites T1's updates", "Both wait forever until a client timeout", "A deadlock is detected and one transaction is aborted"],
    answer: 3,
    why: [
      "Writes take exclusive row locks, which conflict with each other, so they are not shared.",
      "Locking prevents silent overwrites; the second writer waits for the lock rather than clobbering it.",
      "Databases do not rely only on client timeouts; they detect the wait-for cycle and break it themselves.",
      "T1 holds row 1 and waits for row 2 while T2 holds row 2 and waits for row 1. The engine detects this cycle and rolls back one victim so the other can proceed."
    ]
  },
  {
    q: "How does write-ahead logging (WAL) provide durability?",
    options: ["It keeps all data only in memory for speed", "It writes data pages to disk before any log is created", "Log records are flushed to disk before commit is acknowledged", "It replicates every transaction to a second server synchronously"],
    answer: 2,
    why: [
      "Keeping data only in memory would lose it on a crash; WAL exists to make changes recoverable.",
      "The order is the reverse: the log goes first, so data pages can be written lazily later.",
      "Because the log record is durably on disk before the commit returns, the engine can replay it after a crash to redo committed changes and undo uncommitted ones.",
      "Replication can add redundancy, but WAL is a local log-first protocol and does not require a second server."
    ]
  },
  {
    q: "What makes an index a covering index for a given query?",
    options: ["It contains every column the query needs, so the table is not read", "It is built on the table's primary key", "It indexes every column of the table", "It is stored in memory instead of on disk"],
    answer: 0,
    why: [
      "If the index holds all referenced columns (in the filter and SELECT list), the engine answers from the index alone and skips the extra table lookups.",
      "Being on the primary key is unrelated; a covering index can be any index that happens to include the needed columns.",
      "Covering is relative to a specific query; an index does not need to include every column.",
      "Where an index is stored does not determine whether it covers a query."
    ]
  },
  {
    q: "Which is the weakest standard SQL isolation level that prevents dirty reads?",
    options: ["READ UNCOMMITTED", "READ COMMITTED", "REPEATABLE READ", "SERIALIZABLE"],
    answer: 1,
    why: [
      "READ UNCOMMITTED explicitly allows dirty reads, so it is the one level that does not prevent them.",
      "READ COMMITTED guarantees a transaction sees only committed data, the weakest level that prevents dirty reads, although it still allows non-repeatable reads and phantoms.",
      "REPEATABLE READ does prevent dirty reads, but it is stronger than needed, so it is not the weakest such level.",
      "SERIALIZABLE prevents dirty reads, but it is the strongest level rather than the weakest."
    ]
  },
  {
    q: "A Dynamo-style store keeps N = 3 replicas. Which read quorum R and write quorum W guarantee that every read overlaps the latest acknowledged write?",
    options: ["R = 1, W = 1", "R = 1, W = 2", "R = 2, W = 1", "R = 2, W = 2"],
    answer: 3,
    why: [
      "R + W = 2 is not greater than 3, so a read can hit a replica that missed the write.",
      "R + W = 3 does not exceed N, so a read replica can be one of the single replica not written.",
      "R + W = 3 is again not greater than N; a read of two replicas can both miss the one replica that took the write.",
      "R + W = 4 > N = 3, so any read set must share at least one replica with every write set, ensuring it sees the latest write."
    ]
  },
  {
    q: "Which workload most clearly favors a relational database over a document store?",
    options: ["Caching user sessions by an opaque key", "Storing self-contained product pages with varying fields", "Multi-table updates with joins and enforced integrity constraints", "Logging billions of timestamped events at high write rates"],
    answer: 2,
    why: [
      "Session caching is a simple key lookup, which suits key-value stores.",
      "Self-contained records with varying fields suit the flexible schema of a document store.",
      "Relational systems excel at normalized, interrelated data where ACID multi-row transactions, joins and foreign keys keep the data consistent.",
      "Write-heavy append-only event logs are typically handled by log-structured or wide-column stores that scale horizontally."
    ]
  }
]
