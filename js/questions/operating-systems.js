export default [
  {
    q: "Which of the following is shared among all threads of the same process?",
    options: [
      "The program counter of each thread",
      "The heap and global variables",
      "The call stack of each thread",
      "The saved register set of each thread"
    ],
    answer: 1,
    why: [
      "Each thread has its own program counter because each thread executes a different point in the code at any moment.",
      "Threads in one process share the same address space, so the heap, global data, code, and open files are common to all of them.",
      "Each thread needs a private stack to hold its own local variables and return addresses, so stacks are not shared.",
      "Registers are saved and restored per thread on a context switch, so each thread has its own register set."
    ]
  },
  {
    q: "What is the primary purpose of a system call?",
    options: [
      "To let kernel code call user-level functions directly",
      "To speed up arithmetic instructions in user programs",
      "To let a user program request a service from the kernel",
      "To compile source code into machine code at run time"
    ],
    answer: 2,
    why: [
      "The direction is reversed: system calls let user code enter the kernel, not the other way around.",
      "Arithmetic runs directly on the CPU in user mode and needs no kernel involvement, so system calls do not speed it up.",
      "A system call is the controlled entry point into the kernel, used for privileged services such as file I/O, process creation, and memory allocation.",
      "Compilation is done by a compiler or JIT, not by system calls, which only request OS services."
    ]
  },
  {
    q: "What does a hardware interrupt cause the CPU to do?",
    options: [
      "Suspend the current execution, save its state, and run an interrupt handler",
      "Permanently terminate the process that was running when it arrived",
      "Switch the machine from 64-bit mode to 32-bit mode",
      "Flush the entire page table and restart all processes"
    ],
    answer: 0,
    why: [
      "On an interrupt the CPU saves enough state, jumps to the handler through the interrupt vector, and later resumes the interrupted code.",
      "Interrupts do not kill the running process; after the handler finishes, execution normally resumes where it left off.",
      "An interrupt has nothing to do with the CPU's word-size mode; it only transfers control to a handler.",
      "Page tables are not flushed by interrupts in general, and processes are not restarted."
    ]
  },
  {
    q: "Which of the following is one of the four necessary conditions for deadlock?",
    options: [
      "Preemption of resources by the OS",
      "Shared read access to every resource",
      "Round-robin scheduling of all processes",
      "Circular wait among a set of processes"
    ],
    answer: 3,
    why: [
      "The actual condition is no preemption: resources cannot be forcibly taken away. Allowing preemption would help prevent deadlock.",
      "Deadlock requires mutual exclusion (non-shareable resources); shared read access is not a deadlock condition.",
      "The scheduling algorithm is not a deadlock condition; deadlock can occur under many scheduling policies.",
      "The four conditions are mutual exclusion, hold and wait, no preemption, and circular wait, where each process waits on a resource held by the next."
    ]
  },
  {
    q: "What is the main job of a page table?",
    options: [
      "To store the contents of files on disk",
      "To map virtual page numbers to physical frame numbers",
      "To decide which process runs next on the CPU",
      "To keep a list of all open file descriptors"
    ],
    answer: 1,
    why: [
      "File contents live in the file system on disk; the page table only holds address translations.",
      "The page table maps each virtual page to a physical frame (plus valid, protection, and dirty bits), enabling address translation by the MMU.",
      "Choosing the next process is the scheduler's job, not the page table's.",
      "Open file descriptors are tracked in a per-process file table, not in the page table."
    ]
  },
  {
    q: "In round-robin scheduling, what happens when a process's time quantum expires before it finishes?",
    options: [
      "It is terminated and must be restarted by the user",
      "It moves to the waiting state until an I/O event occurs",
      "It is preempted and placed at the back of the ready queue",
      "It keeps the CPU until it completes its current burst"
    ],
    answer: 2,
    why: [
      "Round robin never kills processes for using their quantum; it just rotates the CPU among them.",
      "The waiting state is for processes blocked on I/O or events; a quantum expiry leaves the process ready to run.",
      "On quantum expiry a timer interrupt preempts the process, which goes to the tail of the ready queue so every process gets a fair turn.",
      "Running to completion describes non-preemptive scheduling such as FCFS, not round robin."
    ]
  },
  {
    q: "In a Unix-style file system, what is stored in an inode?",
    options: [
      "File metadata (size, owner, permissions, block pointers) but not the file name",
      "Only the file name and its path in the directory tree",
      "The actual file contents stored in a fixed-size buffer",
      "The list of all processes currently reading the file"
    ],
    answer: 0,
    why: [
      "An inode holds metadata and pointers to data blocks; names are stored in directory entries that map a name to an inode number.",
      "Names live in directory entries, not in the inode, which is why one inode can have multiple hard-link names.",
      "File contents are stored in data blocks that the inode points to; the inode itself is small and fixed-size.",
      "Which processes have the file open is tracked in kernel open-file tables, not in the on-disk inode."
    ]
  },
  {
    q: "What is a page fault?",
    options: [
      "A hardware failure of the physical memory chip",
      "An error caused by a program writing past the end of an array",
      "A bug in the compiler's page-layout optimizer",
      "An exception raised when a referenced page has no valid mapping in physical memory"
    ],
    answer: 3,
    why: [
      "A page fault is a normal, expected event in virtual memory and has nothing to do with faulty hardware.",
      "Out-of-bounds writes may cause a segmentation fault or silent corruption, but a page fault is about the translation, not array bounds.",
      "Compilers are not involved; page faults occur at run time during address translation.",
      "A page fault is a trap raised by the MMU when the page is not present or the access is not allowed; the OS then loads the page from disk or signals an error."
    ]
  },
  {
    q: "Processes with CPU bursts of 6, 8, 7, and 3 ms all arrive at time 0. What is the average waiting time under non-preemptive Shortest Job First?",
    options: [
      "10.25 ms",
      "9 ms",
      "5.5 ms",
      "7 ms"
    ],
    answer: 3,
    why: [
      "10.25 ms is the FCFS result for the order 6, 8, 7, 3 (waits 0, 6, 14, 21), not SJF.",
      "9 ms does not match: SJF orders the jobs 3, 6, 7, 8, giving waits of 0, 3, 9, 16, whose average is not 9.",
      "5.5 ms underestimates the waits; the four waits sum to 28 ms, not 22 ms.",
      "SJF runs the jobs in order 3, 6, 7, 8 so the waits are 0, 3, 9, and 16, summing to 28 and averaging 7 ms."
    ]
  },
  {
    q: "Round-robin with a quantum of 4 ms is used. P1 (burst 10 ms), P2 (4 ms), and P3 (6 ms) all arrive at time 0 in that order. At what time does P3 finish?",
    options: [
      "16 ms",
      "18 ms",
      "20 ms",
      "12 ms"
    ],
    answer: 1,
    why: [
      "16 ms is when P3 begins its final slice, not when it finishes; it still has 2 ms left then.",
      "The schedule is P1 0-4, P2 4-8, P3 8-12, P1 12-16, P3 16-18, P1 18-20, so P3 finishes at 18 ms.",
      "20 ms is when P1 finishes, since it has the longest burst and runs last.",
      "12 ms is the end of P3's first quantum; it still needs 2 more ms after that."
    ]
  },
  {
    q: "Two threads run the code below. Which change eliminates the possibility of deadlock?",
    code: "Thread 1:        Thread 2:\nlock(A);         lock(B);\nlock(B);         lock(A);\nwork();          work();\nunlock(B);       unlock(A);\nunlock(A);       unlock(B);",
    options: [
      "Increase the scheduler's time quantum",
      "Give Thread 2 a higher priority than Thread 1",
      "Make both threads acquire A before B",
      "Run work() faster so locks are held briefly"
    ],
    answer: 2,
    why: [
      "A longer quantum only changes interleavings; the opposite lock order can still produce a deadlock.",
      "Priority does not prevent each thread from holding one lock while waiting for the other, so deadlock remains possible.",
      "Imposing a global lock ordering breaks the circular-wait condition, so neither thread can hold B while waiting for A.",
      "Shorter hold times make deadlock less likely but do not eliminate it, since the bad interleaving is still possible."
    ]
  },
  {
    q: "A process with 3 frames and then 4 frames uses FIFO page replacement on the reference string below (all frames start empty). How many page faults occur?",
    code: "reference string: 1 2 3 4 1 2 5 1 2 3 4 5",
    options: [
      "9 faults with 3 frames, 10 faults with 4 frames",
      "9 faults with 3 frames, 8 faults with 4 frames",
      "10 faults with 3 frames, 9 faults with 4 frames",
      "10 faults with 3 frames, 10 faults with 4 frames"
    ],
    answer: 0,
    why: [
      "Simulating FIFO gives 9 faults with 3 frames and 10 with 4 frames, which is Belady's anomaly: more frames can cause more faults.",
      "This assumes more frames always helps, but FIFO does not follow the stack property, so it can get worse.",
      "The counts are swapped; 3 frames yields 9 faults, not 10.",
      "3 frames yields 9 faults, not 10; only the 4-frame case produces 10."
    ]
  },
  {
    q: "A single-level page table is used. A TLB lookup takes 10 ns, a memory access takes 100 ns, and the TLB hit ratio is 90%. What is the effective memory access time?",
    options: [
      "110 ns",
      "120 ns",
      "130 ns",
      "100 ns"
    ],
    answer: 1,
    why: [
      "110 ns is only the cost of a TLB hit (10 + 100); it ignores that 10% of accesses miss and need an extra memory access.",
      "A hit costs 10 + 100 = 110 ns, a miss costs 10 + 100 + 100 = 210 ns, so EAT = 0.9 x 110 + 0.1 x 210 = 120 ns.",
      "130 ns would require a miss to cost 310 ns, i.e., two extra memory accesses, which a single-level table does not need.",
      "100 ns ignores the TLB lookup time and the extra page-table access on misses."
    ]
  },
  {
    q: "A system uses 4 KB pages. For the virtual address 0x00403A7C, what is the page offset?",
    options: [
      "0x403",
      "0x3A7C",
      "0xA7C",
      "0x7C"
    ],
    answer: 2,
    why: [
      "0x403 is the virtual page number (the address shifted right by 12 bits), not the offset.",
      "0x3A7C uses 14 bits; a 4 KB page needs only 12 offset bits, so the top bits belong to the page number.",
      "4 KB is 2^12 bytes, so the offset is the low 12 bits: 0xA7C. The remaining upper bits, 0x00403, form the page number.",
      "0x7C is only the low 8 bits; the offset is 12 bits wide for 4 KB pages."
    ]
  },
  {
    q: "How many times is \"hi\" printed by this program (assuming every fork succeeds)?",
    code: "int main(void) {\n  fork();\n  fork();\n  printf(\"hi\\n\");\n  return 0;\n}",
    options: [
      "1 time",
      "2 times",
      "3 times",
      "4 times"
    ],
    answer: 3,
    why: [
      "One print would mean no child processes were created, but each fork() creates a child that continues running the same code.",
      "Two prints would come from only one fork(); the second fork() is executed by both the parent and the first child.",
      "Three would count the number of forks plus one, but process counts double with each fork, they do not grow linearly.",
      "The first fork makes 2 processes, and the second fork is run by both, making 4 processes, each of which prints once."
    ]
  },
  {
    q: "Which statement correctly distinguishes a mutex from a binary semaphore?",
    options: [
      "A mutex has an owner and should be unlocked by the thread that locked it, while a semaphore can be signaled by any thread",
      "A mutex can count up to N while a binary semaphore is limited to 0 and 1",
      "A mutex works only between processes, and a semaphore only between threads",
      "A semaphore always busy-waits while a mutex never blocks the caller"
    ],
    answer: 0,
    why: [
      "Ownership is the key difference: a mutex is for locking a critical section, whereas a semaphore is a signaling mechanism that any thread may post.",
      "Counting up to N describes a counting semaphore; a mutex is strictly locked or unlocked.",
      "Both can be used between threads, and both can be shared between processes with the right setup; this is not the distinction.",
      "Neither is defined by busy-waiting; both typically block waiting threads, and spinning is an implementation choice."
    ]
  },
  {
    q: "A low-priority task holds a lock needed by a high-priority task, while a medium-priority task keeps preempting the low-priority task. Which technique resolves this priority inversion?",
    options: [
      "Permanently lowering the high-priority task's priority",
      "Temporarily raising the lock holder's priority (priority inheritance)",
      "Replacing the mutex with a spinlock on a single core",
      "Increasing the time quantum for all tasks equally"
    ],
    answer: 1,
    why: [
      "Lowering the high-priority task defeats its purpose and does not remove the medium task's interference.",
      "With priority inheritance, the lock holder inherits the waiter's priority, so the medium task cannot preempt it and it quickly releases the lock.",
      "On a single core a spinlock makes things worse: the high-priority task would spin while the holder cannot run.",
      "A bigger quantum does not address the fact that the medium task outranks the lock holder."
    ]
  },
  {
    q: "In a many-to-one threading model, what happens when one user-level thread makes a blocking system call?",
    options: [
      "Only that thread blocks and the others keep running on other cores",
      "The kernel automatically creates a new kernel thread to cover for it",
      "The entire process blocks because the kernel sees a single schedulable entity",
      "The system call fails immediately with an error for that thread"
    ],
    answer: 2,
    why: [
      "Many-to-one maps all user threads to one kernel thread, so they cannot run on multiple cores or continue independently.",
      "Standard many-to-one has no such mechanism; the kernel does not know the user threads exist.",
      "The kernel only schedules the single kernel thread, so when it blocks in the system call, every user thread in the process is blocked too.",
      "Blocking calls do not fail just because of the threading model; they block as normal."
    ]
  },
  {
    q: "A system has 10 units of resource type A. The current state is shown below. Which is a safe sequence under the Banker's algorithm?",
    code: "       Alloc  Max\nP0       3     9\nP1       2     4\nP2       2     7\nAvailable = 10 - 7 = 3",
    options: [
      "P1, P2, P0",
      "P0, P1, P2",
      "P2, P1, P0",
      "P0, P2, P1"
    ],
    answer: 0,
    why: [
      "Needs are P0=6, P1=2, P2=5. P1 can run first (2<=3) and releases 4 units (available 5), then P2 (5<=5) releases 4 more (available 7), then P0 (6<=7) finishes.",
      "P0 needs 6 units but only 3 are available, so it cannot go first.",
      "P2 needs 5 units but only 3 are available at the start, so it cannot run first.",
      "P0 cannot go first because its remaining need of 6 exceeds the 3 available units."
    ]
  },
  {
    q: "After fork() on a system that uses copy-on-write, when does the kernel copy a shared page?",
    options: [
      "Immediately at fork() for every page of the parent",
      "When the child process calls exec()",
      "When either process reads from the shared page",
      "When either process first writes to the shared page"
    ],
    answer: 3,
    why: [
      "Copying everything at fork() is exactly the cost that copy-on-write avoids; it is the naive approach.",
      "exec() replaces the child's address space entirely, so the shared pages are simply dropped rather than copied.",
      "Reads are safe on shared pages and cause no copy; the pages stay mapped read-only and shared.",
      "Shared pages are marked read-only, so a write triggers a fault and the kernel gives the writer its own private copy."
    ]
  },
  {
    q: "After the OS admits more processes, CPU utilization drops sharply while page-fault rate and disk activity soar. What is the best diagnosis and remedy?",
    options: [
      "Convoy effect; switch the scheduler from FCFS to SJF",
      "Thrashing; reduce the degree of multiprogramming so working sets fit in memory",
      "Internal fragmentation; use much smaller page sizes",
      "Starvation; raise the priority of the newest processes"
    ],
    answer: 1,
    why: [
      "The convoy effect concerns long CPU bursts delaying short ones and does not cause a surge in page faults.",
      "Thrashing happens when processes lack enough frames for their working sets, so they spend their time paging; suspending some processes frees frames.",
      "Internal fragmentation wastes space within pages but does not explain a surge of page faults and falling CPU use.",
      "Starvation is about a process never getting the CPU; raising priority would not give processes the memory they need."
    ]
  },
  {
    q: "Two threads each run work() at the same time with no locking. Why can the final value of counter be less than 2000?",
    code: "int counter = 0;\n\nvoid *work(void *arg) {\n  for (int i = 0; i < 1000; i++)\n    counter++;\n  return NULL;\n}",
    options: [
      "The compiler removes some loop iterations when it sees two threads",
      "Each thread gets its own private copy of the global counter",
      "counter++ is a non-atomic read-modify-write, so updates can be lost",
      "The scheduler kills a thread when it detects concurrent access"
    ],
    answer: 2,
    why: [
      "Compilers do not drop iterations because of threads; this is not what causes the lost updates.",
      "Globals are shared by all threads; if each had a private copy the result would be a different issue, not a race.",
      "The increment is a load, add, and store, so two threads can read the same value and both write back value+1, losing one update.",
      "Schedulers do not kill threads for racing; the race silently corrupts the result instead."
    ]
  },
  {
    q: "What problem does a journaling file system primarily solve, and how?",
    options: [
      "Crash consistency: it logs intended changes first so they can be replayed or discarded after a crash",
      "Fragmentation: it compacts files in the background to keep blocks contiguous",
      "Slow reads: it caches every directory permanently in RAM",
      "Unauthorized access: it encrypts all metadata blocks with a user key"
    ],
    answer: 0,
    why: [
      "Writing intended updates to a journal before applying them lets recovery replay complete transactions and ignore partial ones, avoiding a full fsck scan.",
      "Defragmentation is a separate task; journaling is unrelated to block contiguity.",
      "Caching can improve read speed but is not what journaling does; the journal exists on disk for recovery.",
      "Encryption addresses confidentiality, while journaling addresses consistency after crashes or power loss."
    ]
  },
  {
    q: "A Unix-like file system has 4 KB blocks, 4-byte block pointers, and an inode with 12 direct pointers and 1 single-indirect pointer (nothing else). What is the maximum file size?",
    options: [
      "4048 KB",
      "4096 KB",
      "4100 KB",
      "4144 KB"
    ],
    answer: 3,
    why: [
      "4048 KB subtracts the direct blocks instead of adding them; direct blocks add 48 KB to the total.",
      "4096 KB counts only the indirect block's 1024 data blocks and forgets the 12 direct blocks.",
      "4100 KB wrongly counts the indirect pointer block itself as 4 KB of file data; it only stores pointers.",
      "Direct: 12 x 4 KB = 48 KB. The indirect block holds 4096/4 = 1024 pointers, giving 1024 x 4 KB = 4096 KB, so the total is 4144 KB."
    ]
  },
  {
    q: "Which statement about deadlock and resource-allocation graphs is correct?",
    options: [
      "A cycle always means deadlock, regardless of how many instances each resource has",
      "If the graph has no cycle, the system must be deadlocked",
      "With single-instance resources a cycle means deadlock; with multiple instances a cycle is necessary but not sufficient",
      "A cycle indicates an unsafe state but can never lead to actual deadlock"
    ],
    answer: 2,
    why: [
      "With multiple instances per resource, a cycle can exist while another process outside the cycle can release an instance and break it.",
      "It is the opposite: no cycle means no deadlock, since a cycle is necessary for deadlock.",
      "For single-instance resources a cycle is both necessary and sufficient; with multiple instances it is only necessary, so more analysis is needed.",
      "A cycle with single-instance resources is an actual deadlock, not merely an unsafe state."
    ]
  }
]
