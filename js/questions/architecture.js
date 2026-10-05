export default [
  {
    q: "What is the decimal value of the unsigned binary number 10110110?",
    options: ["166", "180", "182", "190"],
    answer: 2,
    why: [
      "166 is 10100110; it comes from dropping the 16s place bit (and so mis-summing the place values).",
      "180 is 10110100; it ignores the 2s place bit, which is set in 10110110.",
      "Correct: 128 + 32 + 16 + 4 + 2 = 182, adding the place values of each 1 bit.",
      "190 is 10111110; it wrongly counts an 8s place bit, which is 0 in 10110110."
    ]
  },
  {
    q: "What is the 8-bit two's complement representation of -5?",
    options: ["11111011", "11111010", "10000101", "00000101"],
    answer: 0,
    why: [
      "Correct: +5 is 00000101; invert the bits to get 11111010, then add 1 to get 11111011.",
      "11111010 is only the ones' complement; the final +1 step was forgotten.",
      "10000101 is sign-magnitude (sign bit set, magnitude 5), not two's complement.",
      "00000101 is simply +5, with nothing negated."
    ]
  },
  {
    q: "What range of values can an 8-bit two's complement integer represent?",
    options: ["-127 to 127", "0 to 255", "-256 to 255", "-128 to 127"],
    answer: 3,
    why: [
      "-127 to 127 is the range of sign-magnitude, which wastes one pattern on a second zero.",
      "0 to 255 is the range of an unsigned 8-bit integer, which has no negative values.",
      "-256 to 255 would need 9 bits; 8 bits give only 256 distinct patterns in total.",
      "Correct: 256 patterns are split into 128 negative values (-128 to -1) and 128 non-negative values (0 to 127)."
    ]
  },
  {
    q: "A two-input XOR gate outputs 1 under which condition?",
    options: ["Both inputs are 1", "The two inputs differ", "Both inputs are 0", "At least one input is 1"],
    answer: 1,
    why: [
      "Outputting 1 only when both inputs are 1 describes AND; XOR outputs 0 for 1,1.",
      "Correct: XOR is exclusive-or, outputting 1 exactly when the inputs are different (0,1 or 1,0).",
      "Outputting 1 only when both are 0 describes NOR; XOR outputs 0 for 0,0.",
      "'At least one input is 1' describes OR, which also outputs 1 for 1,1, unlike XOR."
    ]
  },
  {
    q: "Which CPU register holds the memory address of the next instruction to be fetched?",
    options: ["Instruction register", "Stack pointer", "Program counter", "Accumulator"],
    answer: 2,
    why: [
      "The instruction register holds the instruction currently being decoded and executed, not the address of the next one.",
      "The stack pointer holds the address of the top of the call stack, not the instruction stream position.",
      "Correct: the program counter (instruction pointer) holds the address of the next instruction and is advanced or overwritten by jumps.",
      "The accumulator holds arithmetic operands and results, not instruction addresses."
    ]
  },
  {
    q: "On a little-endian machine, how is a multi-byte integer stored in memory?",
    options: [
      "Least significant byte at the lowest address",
      "Most significant byte at the lowest address",
      "Bytes in random order chosen by the OS",
      "Each byte's bits stored in reverse order"
    ],
    answer: 0,
    why: [
      "Correct: little-endian stores the least significant byte first, at the lowest address (x86 and most ARM systems work this way).",
      "That describes big-endian, where the most significant byte comes first.",
      "Byte order is fixed by the architecture, not chosen at random by the OS.",
      "Endianness concerns the order of bytes within a word; bits inside each byte are not reversed."
    ]
  },
  {
    q: "Which list orders the storage levels from fastest to slowest?",
    options: [
      "L1 cache, L2 cache, registers, RAM",
      "Registers, L2 cache, L1 cache, RAM",
      "RAM, L3 cache, L2 cache, L1 cache",
      "Registers, L1 cache, L2 cache, RAM"
    ],
    answer: 3,
    why: [
      "Registers sit inside the execution core and are faster than any cache, so they cannot come after L1 and L2.",
      "L1 is smaller and closer to the core than L2, so it is faster; L1 and L2 are swapped here.",
      "This list runs from slowest to fastest, which is the reverse of what was asked.",
      "Correct: speed falls (and capacity grows) moving from registers to L1, L2, L3 and then main memory."
    ]
  },
  {
    q: "What is the 8-bit binary equivalent of the hexadecimal value 0xA5?",
    options: ["1010 1010", "1010 0101", "0101 1010", "1010 0110"],
    answer: 1,
    why: [
      "1010 1010 is 0xAA; the low hex digit 5 is 0101, not 1010.",
      "Correct: each hex digit maps to 4 bits, A = 1010 and 5 = 0101, giving 1010 0101.",
      "0101 1010 is 0x5A; the two nibbles are swapped.",
      "1010 0110 is 0xA6; the low nibble 5 is 0101, while 0110 is 6."
    ]
  },
  {
    q: "What does this program print?",
    code: "int x = 0b1100;\nint y = 0b1010;\nprintf(\"%d\", x ^ y);",
    options: ["14", "8", "2", "6"],
    answer: 3,
    why: [
      "14 (0b1110) is x | y; the operator here is XOR, not OR.",
      "8 (0b1000) is x & y; the operator here is XOR, not AND.",
      "2 is the number of bit positions that differ, but XOR returns the bit pattern of differences, not a count.",
      "Correct: 1100 XOR 1010 = 0110, which is 6, since XOR sets a bit only where the operands differ."
    ]
  },
  {
    q: "What does this JavaScript code print?",
    code: "let x = 5;\nconsole.log(x << 3);",
    options: ["40", "15", "8", "125"],
    answer: 0,
    why: [
      "Correct: shifting left by 3 multiplies by 2^3 = 8, so 5 << 3 = 40 (101 becomes 101000).",
      "15 would be 5 * 3 or 5 + 10; the shift count is a power of two, not a multiplier.",
      "8 is 2^3 alone; the shift multiplies the original value 5 by 8.",
      "125 is 5^3; a left shift multiplies by a power of two, it does not exponentiate."
    ]
  },
  {
    q: "What is the correct order of the stages in a CPU's basic instruction cycle?",
    options: [
      "Execute, fetch, decode",
      "Decode, fetch, execute",
      "Fetch, decode, execute",
      "Fetch, execute, decode"
    ],
    answer: 2,
    why: [
      "Execution cannot happen before the instruction has been fetched from memory.",
      "Decoding needs the instruction bits, so the fetch must come first.",
      "Correct: fetch the instruction at the PC, decode it to determine the operation and operands, then execute it.",
      "The instruction must be decoded before the control unit knows what to execute."
    ]
  },
  {
    q: "A 5-stage pipeline with no hazards or stalls executes 100 instructions, one stage per cycle. How many cycles does it take in total?",
    options: ["500", "104", "105", "100"],
    answer: 1,
    why: [
      "500 is the cost with no pipelining (5 cycles per instruction); pipelining overlaps instructions.",
      "Correct: the first instruction needs 5 cycles to fill the pipeline, then one more completes every cycle: 5 + 99 = 104.",
      "105 is an off-by-one error; after the first instruction finishes at cycle 5, only 99 more cycles are needed.",
      "100 ignores the pipeline fill time; the first result cannot appear until cycle 5."
    ]
  },
  {
    q: "In an 8-bit two's complement register, what happens when 127 is incremented by 1?",
    options: [
      "It wraps to -128 (signed overflow)",
      "It becomes 128",
      "It wraps to 0",
      "It wraps to -127"
    ],
    answer: 0,
    why: [
      "Correct: 01111111 + 1 = 10000000, which is -128 in two's complement; the carry into the sign bit signals signed overflow.",
      "128 does not fit in the signed 8-bit range, so it cannot be stored as such.",
      "Wrapping to 0 happens for unsigned 255 + 1; 127 + 1 produces 10000000, not 00000000.",
      "-127 is 10000001; adding 1 to 01111111 yields 10000000, which is -128."
    ]
  },
  {
    q: "An 8-bit signed value 0xF0 is sign-extended to 16 bits. What is the result?",
    options: ["0x00F0", "0xF000", "0xFFF0", "0x0F00"],
    answer: 2,
    why: [
      "0x00F0 is zero extension, which turns -16 into +240 and changes the value.",
      "0xF000 shifts the byte into the high half instead of extending it.",
      "Correct: 0xF0 is -16 in 8-bit two's complement; copying the sign bit into the new upper bits gives 0xFFF0, still -16.",
      "0x0F00 is neither an extension nor value-preserving; it just rearranges the nibbles."
    ]
  },
  {
    q: "The 32-bit value 0x12345678 is stored on a little-endian machine. What byte is at the lowest memory address?",
    options: ["0x12", "0x87", "0x21", "0x78"],
    answer: 3,
    why: [
      "0x12 is the most significant byte and would be first only on a big-endian machine.",
      "0x87 would require swapping the nibbles within a byte; endianness reorders whole bytes, not nibbles.",
      "0x21 is also a nibble swap of 0x12; bytes keep their internal digit order.",
      "Correct: little-endian puts the least significant byte first, so memory reads 78 56 34 12 from the lowest address upward."
    ]
  },
  {
    q: "Why does summing a large 2D array in C row by row run much faster than summing it column by column?",
    options: [
      "Row traversal executes fewer arithmetic instructions",
      "Row elements are adjacent in memory, so each cache line is fully used",
      "Rows are kept in registers while columns stay in RAM",
      "Column order reads each element twice, hurting temporal locality"
    ],
    answer: 1,
    why: [
      "Both orders perform the same number of additions; the difference is in memory access patterns.",
      "Correct: C stores arrays in row-major order, so consecutive row elements share cache lines (spatial locality), whereas column steps jump a whole row each time and miss more often.",
      "Registers are far too few to hold whole rows; both orders fetch data through the cache hierarchy.",
      "Each element is read exactly once in both orders; the issue is spatial, not temporal, locality."
    ]
  },
  {
    q: "Which pair of gates implements a half adder, producing a sum bit and a carry bit from two input bits?",
    options: [
      "Sum = AND, carry = XOR",
      "Sum = OR, carry = AND",
      "Sum = XOR, carry = AND",
      "Sum = XOR, carry = OR"
    ],
    answer: 2,
    why: [
      "This swaps the roles: 1 + 1 should give sum 0 and carry 1, but AND would give sum 1.",
      "OR gives sum 1 for 1 + 1, but the sum bit must be 0 there (binary 10).",
      "Correct: the sum bit is 1 only when inputs differ (XOR) and the carry is 1 only when both are 1 (AND).",
      "A carry of OR would produce a carry for 0 + 1, which is wrong; carry requires both inputs to be 1."
    ]
  },
  {
    q: "After these x86-style instructions run, what value is in register eax?",
    code: "mov eax, 5\nadd eax, 3\nshl eax, 1",
    options: ["16", "8", "10", "15"],
    answer: 0,
    why: [
      "Correct: mov sets eax to 5, add makes it 8, and shl by 1 doubles it to 16.",
      "8 is the value after the add; the shift left by 1 then doubles it.",
      "10 is 5 shifted left alone; the add of 3 happens before the shift, so it is included.",
      "15 is 5 * 3; add means addition, and shl means a shift, not multiplication by the operand."
    ]
  },
  {
    q: "In IEEE 754 single precision (1 sign bit, 8 exponent bits with bias 127, 23 mantissa bits), what value does 0xC0400000 represent?",
    options: ["-1.5", "3.0", "-6.0", "-3.0"],
    answer: 3,
    why: [
      "-1.5 would require an exponent field of 127; here the exponent field is 128, so there is a factor of 2.",
      "The top bit of 0xC is set, so the sign is negative, not positive.",
      "-6.0 would need an exponent field of 129; the field here is 128, a factor of 2^1.",
      "Correct: sign = 1, exponent = 128 so 2^(128-127) = 2, mantissa .1 binary gives 1.5, and -1.5 * 2 = -3.0."
    ]
  },
  {
    q: "What does this JavaScript code print? (JavaScript numbers are IEEE 754 doubles with a 53-bit significand.)",
    code: "const a = 2 ** 53;\nconsole.log(a + 1 === a);",
    options: [
      "false, because 2^53 + 1 is an exact integer",
      "true, because 2^53 + 1 rounds back to 2^53",
      "It throws an overflow error",
      "NaN"
    ],
    answer: 1,
    why: [
      "The result is an exact integer mathematically, but a double cannot represent it; above 2^53 spacing between doubles is 2.",
      "Correct: above 2^53, doubles are spaced 2 apart, so 2^53 + 1 is a tie that rounds to even, giving 2^53 again.",
      "Floating-point arithmetic does not throw on loss of precision; it silently rounds.",
      "NaN arises from invalid operations like 0/0, not from rounding of a finite sum."
    ]
  },
  {
    q: "A direct-mapped cache is 32 KB with 64-byte lines, and addresses are byte addresses. How many index bits does the address use?",
    options: ["6", "8", "9", "15"],
    answer: 2,
    why: [
      "6 is the number of block-offset bits (64 = 2^6), not the index bits.",
      "8 would correspond to 256 lines, which would be a 16 KB cache with 64-byte lines.",
      "Correct: 32 KB / 64 B = 512 lines = 2^9, so 9 bits select the line, with 6 offset bits below them.",
      "15 is log2(32 KB), the number of bits to address the whole cache, not just choose a line."
    ]
  },
  {
    q: "A cache has a 1 ns hit time, a 5% miss rate, and a 100 ns miss penalty. What is the average memory access time?",
    options: ["6 ns", "5 ns", "101 ns", "1.05 ns"],
    answer: 0,
    why: [
      "Correct: AMAT = hit time + miss rate * miss penalty = 1 + 0.05 * 100 = 6 ns.",
      "5 ns is only the miss contribution; the hit time must be added.",
      "101 ns adds the full miss penalty to every access instead of weighting it by the miss rate.",
      "1.05 ns misapplies the percentage (adding 0.05 rather than multiplying it by 100 ns)."
    ]
  },
  {
    q: "In a classic 5-stage pipeline with full forwarding, what happens to the second instruction here?",
    code: "lw  r1, 0(r2)\nadd r3, r1, r4",
    options: [
      "No stall; EX-to-EX forwarding supplies r1 in time",
      "A structural hazard duplicates the instruction",
      "A control hazard forces a branch prediction",
      "It must stall one cycle even with forwarding"
    ],
    answer: 3,
    why: [
      "The loaded value only exists after the MEM stage, which is later than when add needs it in EX, so EX-to-EX forwarding is too late.",
      "A structural hazard is a resource conflict; instructions are never duplicated, and this is a data dependency.",
      "There is no branch here, so no control hazard or prediction is involved.",
      "Correct: this is a load-use hazard; data arrives at the end of MEM, so the add must wait one cycle even with forwarding."
    ]
  },
  {
    q: "What does this code print?",
    code: "int x = 44;\nx = x & (x - 1);\nprintf(\"%d\", x);",
    options: ["43", "40", "32", "0"],
    answer: 1,
    why: [
      "43 is just x - 1; the AND with x clears bits, so the result is not x - 1.",
      "Correct: 44 = 101100 and 43 = 101011; ANDing gives 101000 = 40, since x & (x-1) clears the lowest set bit.",
      "32 would keep only the highest set bit; this trick clears the lowest one instead.",
      "0 results only when x is a power of two (a single set bit), and 44 has three set bits."
    ]
  },
  {
    q: "Which single gate type is universal, meaning any Boolean function can be built using only that gate?",
    options: ["XOR", "AND", "NAND", "OR"],
    answer: 2,
    why: [
      "XOR cannot build NOT from itself alone with constants removed; with only XOR you cannot produce a constant-1 function or AND, so it is not universal.",
      "AND alone is monotone and cannot produce inversion (NOT), so it cannot build every function.",
      "Correct: NAND can build NOT (tie inputs together), then AND and OR, so any circuit can be made from NAND gates alone.",
      "OR alone is monotone and cannot invert a signal, so it cannot implement NOT."
    ]
  }
]
