// Python Interview Questions & Technical Preparation Data Bank
// Think IT Telugu - Deep, Beginner-Friendly, Pedagogical Master Guide

export const INTERVIEW_CATEGORIES = [
  { id: 'all', name: 'All Questions', desc: 'Complete master bundle' },
  { id: 'freshers', name: 'Theory & Freshers', desc: 'Core fundamentals & definitions' },
  { id: 'coding', name: 'Classic Logic & Math', desc: 'Prime, Fibonacci, Palindrome, Anagram' },
  { id: 'patterns', name: 'Star & Number Patterns', desc: 'Pyramids, Triangles, Hollow patterns' },
  { id: 'debugging', name: 'Code Debugging & Fixes', desc: 'Tracebacks, common traps & pdb' },
  { id: 'advanced', name: 'OOP & Internals', desc: 'Classes, Decorators, Generators & GIL' },
];

export const INTERVIEW_SECTIONS = [
  {
    id: 'section-freshers-basics',
    title: '1. Python Fundamentals & Freshers (Must Know)',
    category: 'freshers',
    desc: 'Core language mechanics, dynamic typing, memory references, and basic data structures.',
  },
  {
    id: 'section-coding-problems',
    title: '2. Classic Logic & Problem Solving (Prime, Fibonacci, Palindrome, Anagram)',
    category: 'coding',
    desc: 'Most requested coding problems asked in technical rounds for freshers and junior developers.',
  },
  {
    id: 'section-pattern-programs',
    title: '3. Star & Number Pattern Programs (Loops Mastery)',
    category: 'patterns',
    desc: 'Right-angled triangles, Pyramids, Hollow shapes, Diamonds, and Floyd numbers.',
  },
  {
    id: 'section-debugging-diagnostics',
    title: '4. Code Debugging & Beginner Error Diagnosis',
    category: 'debugging',
    desc: 'How to read tracebacks, debug with print and pdb, and fix common Python runtime traps.',
  },
  {
    id: 'section-core-advanced',
    title: '5. OOP, Advanced Internals & Memory Architecture',
    category: 'advanced',
    desc: 'Object-Oriented Programming, Decorators, Generators, Shallow vs Deep Copy, and the GIL.',
  },
];

export const INTERVIEW_QUESTIONS = [
  // ========================================================
  // 1. PYTHON FUNDAMENTALS & FRESHERS (MUST KNOW)
  // ========================================================
  {
    id: 'what-is-python',
    sectionId: 'section-freshers-basics',
    category: 'freshers',
    title: 'What is Python and what are its key features?',
    level: 'Fresher',
    tags: ['Basics', 'Features'],
    whyAsked: 'Interviewers ask this as an ice-breaker to test if you understand the high-level architecture of Python compared to compiled languages like C++ or Java.',
    interviewPitch: 'Python is a high-level, dynamically typed, interpreted language created by Guido van Rossum. Its biggest strength is its simple, English-like syntax which emphasizes developer productivity, paired with a massive standard library for everything from web development to AI.',
    summary: 'Python is an interpreted, high-level, general-purpose programming language known for readability, rapid prototyping, and a vast ecosystem.',
    points: [
      'Readable & Expressive: Uses indentation instead of curly braces, making code clean and concise.',
      'Interpreted & Interactive: Code executes line-by-line via the Python Virtual Machine (PVM) without manual compilation.',
      'Dynamically Typed: Variable types are inferred at runtime based on the assigned object.',
      'Extensive Ecosystem: Built-in packages plus millions of third-party libraries on PyPI (FastAPI, NumPy, PyTorch).',
    ],
    code: `# Clean and expressive syntax in Python:
name = "Think IT Telugu"
role = "AI Engineer"
print(f"Welcome to {name}! Role: {role}")
# Output: Welcome to Think IT Telugu! Role: AI Engineer`,
    dryRun: [
      { step: 'Line 1 (`name = "Think IT Telugu"`)', desc: 'Allocates a string object in memory and binds the identifier `name` to its memory address.' },
      { step: 'Line 2 (`role = "AI Engineer"`)', desc: 'Allocates another string object and binds `role`.' },
      { step: 'Line 3 (`print(...)`)', desc: 'Evaluates the f-string expressions and sends the formatted output to stdout.' },
    ],
    complexity: { time: 'O(1)', space: 'O(1)' },
    trap: 'Follow-up trap: "Is Python compiled or interpreted?" Answer: It is both! Python compiles source code (`.py`) to intermediate bytecode (`.pyc`), which is then interpreted by the PVM.',
  },

  {
    id: 'dynamically-typed-language',
    sectionId: 'section-freshers-basics',
    category: 'freshers',
    title: 'What is a Dynamically Typed language and how does Python handle types?',
    level: 'Fresher',
    tags: ['Data Types', 'Variables'],
    whyAsked: 'Tests if you understand runtime type binding vs compile-time declaration and how variables act as memory references.',
    interviewPitch: 'In Python, types belong to objects, not variable names. Variables are simply named tags pointing to objects in heap memory. Because type checking occurs at runtime, a variable can reference an integer at one moment and a string the next without explicit type declarations.',
    summary: 'Variables do not have fixed types; they reference objects that carry type information in memory.',
    points: [
      'No Variable Declarations: You write `score = 95` instead of `int score = 95`.',
      'Dynamic Rebinding: A variable can reference different types across its lifecycle.',
      'Strong Typing: Even though dynamically typed, Python is strongly typed — it never silently converts `"10" + 5`.',
    ],
    code: `x = 100          # x references an integer object
print(type(x))   # Output: <class 'int'>

x = "Telugu"     # x is rebound to a string object
print(type(x))   # Output: <class 'str'>

# Strong typing prevents invalid operations:
try:
    result = "Score: " + 100
except TypeError as e:
    print(f"Error caught: {e}")
    # Output: Error caught: can only concatenate str (not "int") to str`,
    dryRun: [
      { step: 'Line 1 (`x = 100`)', desc: 'Python creates an integer object `100` and points `x` to it.' },
      { step: 'Line 4 (`x = "Telugu"`)', desc: 'Python creates a string object `"Telugu"` and repoints `x` to the string. The integer `100` is freed if no other reference exists.' },
    ],
    complexity: { time: 'O(1)', space: 'O(1)' },
    trap: 'Trap: Confusing dynamically typed with weakly typed. Python is dynamic (no type keywords) BUT strongly typed (strict type rules).',
  },

  {
    id: 'interpreted-language-explained',
    sectionId: 'section-freshers-basics',
    category: 'freshers',
    title: 'What does it mean that Python is an "Interpreted" language?',
    level: 'Fresher',
    tags: ['Architecture', 'CPython'],
    whyAsked: 'Evaluates your understanding of CPython execution internals, bytecode compilation, and the Python Virtual Machine (PVM).',
    interviewPitch: 'When you run a Python script, CPython first parses and compiles the code into bytecode (`.pyc`). The Python Virtual Machine then reads this bytecode instruction by instruction and translates it into machine code at runtime, making Python platform-independent.',
    summary: 'Python executes code through a two-stage process: compilation to bytecode and interpretation by the PVM.',
    points: [
      'Bytecode Compilation: Source `.py` is compiled into bytecode stored in `__pycache__`.',
      'PVM Execution: The virtual machine loops over bytecode instructions and executes them.',
      'Immediate Error Halting: If line 5 has a runtime error, lines 1–4 execute successfully before execution terminates.',
    ],
    code: `print("Step 1: Processing data...")  # Executes immediately
print("Step 2: Connecting...")       # Executes immediately

# Uncommenting the next line would stop execution at Step 3:
# print(10 / 0)  # ZeroDivisionError occurs here

print("Step 3: Complete!")
# Output:
# Step 1: Processing data...
# Step 2: Connecting...
# Step 3: Complete!`,
    dryRun: [
      { step: 'Phase 1 (Bytecode)', desc: 'CPython compiles script into bytecode instructions (`LOAD_GLOBAL`, `CALL_FUNCTION`).' },
      { step: 'Phase 2 (PVM)', desc: 'PVM processes instructions sequentially from top to bottom.' },
    ],
    complexity: { time: 'O(N) execution', space: 'O(1)' },
    trap: 'Follow-up: "Is Python purely interpreted?" No, bytecode compilation always happens before interpretation.',
  },

  {
    id: 'mutable-vs-immutable',
    sectionId: 'section-freshers-basics',
    category: 'freshers',
    title: 'What is the difference between Mutable and Immutable data types in Python?',
    level: 'Fresher',
    tags: ['Memory', 'Data Types'],
    whyAsked: 'Crucial for understanding how Python handles data modifications in memory, dictionary keys, and function parameter passing.',
    interviewPitch: 'Mutable objects can have their contents modified in-place without changing their memory address (`id`). Immutable objects cannot be altered once created; any modification produces a brand-new object in memory with a new `id`.',
    summary: 'Mutable types (Lists, Dicts, Sets) allow in-place edits. Immutable types (Integers, Floats, Strings, Tuples) create new objects on modification.',
    points: [
      'Mutable: `list`, `dict`, `set`, `bytearray` — change values without changing memory ID.',
      'Immutable: `int`, `float`, `str`, `tuple`, `frozenset`, `bool` — cannot be modified in place.',
      'Dict Key Requirement: Only immutable (hashable) objects can be used as dictionary keys.',
    ],
    code: `# Immutable Example (String):
s = "hello"
print(f"Original ID: {id(s)}")
s = s + " world"
print(f"New ID:      {id(s)}")  # Different ID! New object created

# Mutable Example (List):
nums = [1, 2, 3]
print(f"List ID before: {id(nums)}")
nums.append(4)
print(f"List ID after:  {id(nums)}")  # Same ID! Modified in-place
# Output shows List ID remains identical, while String ID changes`,
    dryRun: [
      { step: 'String Concatenation', desc: '`s + " world"` allocates a new string in memory and rebinds `s`.' },
      { step: 'List Append', desc: '`nums.append(4)` mutates the existing buffer in memory without allocating a new list header.' },
    ],
    complexity: { time: 'O(1) list append vs O(N) string concat', space: 'O(1) in-place vs O(N) copy' },
    trap: 'Trap: Can a tuple contain a mutable object? Yes! A tuple with a list inside `(1, [2, 3])` allows modifying the list items, but the tuple itself cannot point to a different list.',
  },

  {
    id: 'list-vs-tuple',
    sectionId: 'section-freshers-basics',
    category: 'freshers',
    title: 'What is the difference between a List and a Tuple in Python?',
    level: 'Fresher',
    tags: ['Data Structures', 'Lists', 'Tuples'],
    whyAsked: 'Tests when to choose lists vs tuples for performance, data integrity, and dictionary indexing.',
    interviewPitch: 'Lists are mutable collections defined with square brackets `[]` that allow dynamic resizing and element modification. Tuples are immutable collections defined with parentheses `()` that are faster, use less memory, and can be used as dictionary keys.',
    summary: 'Lists are mutable sequences for dynamic data; Tuples are immutable fixed records with lower memory overhead.',
    points: [
      'Mutability: Lists can be changed (`append`, `pop`); Tuples cannot be modified once defined.',
      'Syntax: Lists use `[1, 2, 3]`, Tuples use `(1, 2, 3)`.',
      'Memory & Speed: Tuples are allocated in a single fixed memory block, making iteration and creation faster.',
      'Hashing: Tuples can be dictionary keys or set elements; Lists cannot because they are unhashable.',
    ],
    code: `import sys

my_list = [1, 2, 3, 4, 5]
my_tuple = (1, 2, 3, 4, 5)

print("List Size (bytes): ", sys.getsizeof(my_list))   # e.g. 104 bytes
print("Tuple Size (bytes):", sys.getsizeof(my_tuple))  # e.g. 80 bytes (more lightweight)

# Lists can be modified:
my_list[0] = 99
print("Updated List:", my_list)  # Output: [99, 2, 3, 4, 5]

# Tuples throw TypeError if modified:
try:
    my_tuple[0] = 99
except TypeError as e:
    print("Tuple Error:", e)
    # Output: Tuple Error: 'tuple' object does not support item assignment`,
    dryRun: [
      { step: 'Memory Allocation', desc: 'Lists allocate extra over-provisioned memory slots for fast appends; Tuples allocate exact memory size.' },
    ],
    complexity: { time: 'List access O(1), Tuple access O(1)', space: 'Tuple uses ~20-30% less RAM' },
    trap: 'Single-element tuple trap: `x = (5)` is an integer! You MUST write `x = (5,)` with a trailing comma to create a tuple.',
  },

  {
    id: 'is-vs-double-equals',
    sectionId: 'section-freshers-basics',
    category: 'freshers',
    title: 'What is the difference between "==" and "is" in Python?',
    level: 'Fresher',
    tags: ['Operators', 'Memory'],
    whyAsked: 'Fundamental check on value equality vs memory identity and Python object interning.',
    interviewPitch: 'The equality operator `==` compares the values or contents of two objects (via their `__eq__` method). The identity operator `is` checks whether two variables point to the exact same memory location (`id(a) == id(b)`).',
    summary: '`==` checks value equality; `is` checks identity (same memory address).',
    points: [
      '`==`: Compares object values (`[1, 2] == [1, 2]` is `True`).',
      '`is`: Compares memory addresses (`[1, 2] is [1, 2]` is `False`).',
      'Singleton Checking: Always use `is` when comparing against `None` (`if val is None:`).',
    ],
    code: `a = [1, 2, 3]
b = [1, 2, 3]
c = a  # c points to the exact same memory address as a

print("a == b:", a == b)  # Output: True  (Values are identical)
print("a is b:", a is b)  # Output: False (Distinct objects in memory)
print("a is c:", a is c)  # Output: True  (Same memory address)

# Comparing with None:
result = None
print("is None check:", result is None)  # Output: True`,
    dryRun: [
      { step: '`a == b`', desc: 'Iterates elements: 1==1, 2==2, 3==3 -> True.' },
      { step: '`a is b`', desc: 'Compares `id(a) == id(b)`. Since two separate lists were initialized, `id(a) != id(b)` -> False.' },
    ],
    complexity: { time: '`is` is O(1); `==` can be O(N) for collections', space: 'O(1)' },
    trap: 'Integer Interning Trap: `x = 256; y = 256; x is y` is `True` because Python caches integers from -5 to 256, but `x = 1000; y = 1000; x is y` may be `False` in REPL.',
  },

  {
    id: 'break-continue-pass',
    sectionId: 'section-freshers-basics',
    category: 'freshers',
    title: 'What is the difference between break, continue, and pass?',
    level: 'Fresher',
    tags: ['Loops', 'Control Flow'],
    whyAsked: 'Tests basic loop flow control and how empty syntax blocks are handled.',
    interviewPitch: '`break` immediately terminates the entire loop. `continue` skips the rest of the current iteration and jumps to the next cycle. `pass` is a null statement placeholder that does nothing, used when syntax requires a statement block.',
    summary: '`break` exits the loop entirely; `continue` skips to the next iteration; `pass` is a placeholder that does nothing.',
    points: [
      '`break`: Immediately halts the loop and jumps to code following the loop.',
      '`continue`: Skips remainder of loop body for current element and moves to next item.',
      '`pass`: Syntax placeholder for empty functions, classes, or conditional branches.',
    ],
    code: `# 1. Break Example: Stops at 3
for i in range(1, 6):
    if i == 3:
        break
    print(f"Break loop: {i}")
# Output: Break loop: 1, Break loop: 2

# 2. Continue Example: Skips 3
for i in range(1, 5):
    if i == 3:
        continue
    print(f"Continue loop: {i}")
# Output: Continue loop: 1, Continue loop: 2, Continue loop: 4

# 3. Pass Example: Placeholder
def future_feature():
    pass  # Syntactically valid without error`,
    dryRun: [
      { step: 'Break execution', desc: 'When `i == 3`, loop terminates immediately; 4 and 5 are never processed.' },
      { step: 'Continue execution', desc: 'When `i == 3`, `continue` jumps back to loop header for `i = 4`.' },
    ],
    complexity: { time: 'O(N)', space: 'O(1)' },
    trap: 'Trap: Does `pass` skip code? No! `pass` does nothing and continues executing subsequent lines in that same block.',
  },

  {
    id: 'legb-scope-rule',
    sectionId: 'section-freshers-basics',
    category: 'freshers',
    title: 'What is the LEGB Rule for variable scope in Python?',
    level: 'Fresher',
    tags: ['Scope', 'Functions'],
    whyAsked: 'Tests if you understand how Python resolves variable names across local, enclosing, global, and built-in scopes.',
    interviewPitch: 'LEGB stands for Local, Enclosing, Global, and Built-in. When a variable name is referenced, Python searches these four namespaces in order. If the name is not found in any of them, a NameError is raised.',
    summary: 'Python searches variable scopes in order: Local -> Enclosing (nested functions) -> Global (module level) -> Built-in.',
    points: [
      'L (Local): Names defined inside current function.',
      'E (Enclosing): Names defined in enclosing/outer functions (closures).',
      'G (Global): Names defined at top module level.',
      'B (Built-in): Pre-loaded names in Python (`len`, `print`, `range`).',
    ],
    code: `x = "Global X"  # Global Scope

def outer():
    x = "Enclosing X"  # Enclosing Scope
    
    def inner():
        x = "Local X"  # Local Scope
        print("Inner sees:", x)
    
    inner()
    print("Outer sees:", x)

outer()
print("Module sees:", x)
# Output:
# Inner sees: Local X
# Outer sees: Enclosing X
# Module sees: Global X`,
    dryRun: [
      { step: '`inner()` lookup', desc: 'Finds `x` immediately in its Local frame -> prints "Local X".' },
      { step: '`outer()` lookup', desc: 'Finds `x` in its own frame -> prints "Enclosing X".' },
      { step: 'Module lookup', desc: 'Finds `x` in module dictionary -> prints "Global X".' },
    ],
    complexity: { time: 'O(1) dictionary lookup per scope', space: 'O(1)' },
    trap: 'Modifying global scope trap: You can READ global variables without keywords, but to REBIND them, you must declare `global x`.',
  },

  // ========================================================
  // 2. CLASSIC LOGIC & PROBLEM SOLVING
  // ========================================================
  {
    id: 'prime-number-check',
    sectionId: 'section-coding-problems',
    category: 'coding',
    title: 'How do you check if a number is Prime and find all primes in a range?',
    level: 'Coding',
    tags: ['Math', 'Algorithms', 'Prime', 'Optimization'],
    whyAsked: 'High-frequency screening problem testing loop efficiency, mathematical optimization from O(N) to O(√N), and boundary edge-case handling.',
    interviewPitch: 'A prime number is a natural number greater than 1 with exactly two factors: 1 and itself. Instead of checking all numbers up to N (O(N)), we only test divisors up to √N. If no divisor is found in [2, int(√N)], the number must be prime.',
    summary: 'Check if N > 1, then test divisibility from 2 up to int(n**0.5) + 1. If any divide evenly, return False.',
    points: [
      'Edge Cases: Numbers <= 1 are not prime. 2 is the only even prime.',
      'Optimization: Any composite factor > √N must pair with a factor < √N.',
      'Range Finding: Apply `is_prime()` across `range(start, end + 1)`.',
    ],
    code: `def is_prime(n):
    if n <= 1:
        return False
    # Check divisors up to square root of n:
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

# Test single numbers:
print("is_prime(29):", is_prime(29))  # Output: True
print("is_prime(10):", is_prime(10))  # Output: False

# Find all primes in range [1, 20]:
primes = [num for num in range(1, 21) if is_prime(num)]
print("Primes (1-20):", primes)
# Output: Primes (1-20): [2, 3, 5, 7, 11, 13, 17, 19]`,
    dryRun: [
      { step: 'Input `n = 29`', desc: '`n <= 1` is False. √29 ≈ 5.38 -> `range(2, 6)` tests `i = 2, 3, 4, 5`.' },
      { step: 'Divisibility checks', desc: '29%2 != 0, 29%3 != 0, 29%4 != 0, 29%5 != 0 -> Loop completes -> returns `True`.' },
    ],
    complexity: { time: 'Single check: O(√N), Range [1, M]: O(M × √N)', space: 'O(1) auxiliary space' },
    trap: 'Off-by-one trap: Forgetting the `+ 1` in `int(n**0.5) + 1`. For `n = 25`, `√25 = 5`. Without `+ 1`, `range(2, 5)` stops at 4 and incorrectly marks 25 as prime!',
  },

  {
    id: 'fibonacci-series',
    sectionId: 'section-coding-problems',
    category: 'coding',
    title: 'How do you generate the Fibonacci series (Iterative & Generator approaches)?',
    level: 'Coding',
    tags: ['Algorithms', 'Fibonacci', 'Generators'],
    whyAsked: 'Tests state tracking in loops, recursion stack dangers, and memory-efficient streaming with generators (`yield`).',
    interviewPitch: 'The Fibonacci series starts with 0 and 1, where each next term is the sum of the previous two (F(n) = F(n-1) + F(n-2)). An iterative approach with two pointers runs in O(N) time and O(1) space, avoiding exponential recursion call overhead.',
    summary: 'Maintain two variables `a, b = 0, 1` and update them in a loop using tuple assignment `a, b = b, a + b`.',
    points: [
      'Iterative Approach: O(N) time with O(1) space — standard and efficient.',
      'Generator (`yield`): Generates terms lazily on-demand without storing millions of numbers in RAM.',
      'Avoid Naive Recursion: Naive recursion takes O(2^N) time due to duplicate sub-problem computations.',
    ],
    code: `# 1. Iterative List Generation:
def fibonacci_list(n):
    if n <= 0:
        return []
    series = []
    a, b = 0, 1
    for _ in range(n):
        series.append(a)
        a, b = b, a + b
    return series

print("First 8 Fibonacci terms:", fibonacci_list(8))
# Output: First 8 Fibonacci terms: [0, 1, 1, 2, 3, 5, 8, 13]

# 2. Memory-Efficient Generator:
def fibonacci_gen(limit):
    a, b = 0, 1
    while a <= limit:
        yield a
        a, b = b, a + b

print("Fibonacci numbers <= 20:", list(fibonacci_gen(20)))
# Output: Fibonacci numbers <= 20: [0, 1, 1, 2, 3, 5, 8, 13]`,
    dryRun: [
      { step: 'Init', desc: '`a = 0, b = 1`' },
      { step: 'Iter 1', desc: 'Append `0`. Rebind `a, b = 1, 0 + 1 = 1`' },
      { step: 'Iter 2', desc: 'Append `1`. Rebind `a, b = 1, 1 + 1 = 2`' },
      { step: 'Iter 3', desc: 'Append `1`. Rebind `a, b = 2, 1 + 2 = 3`' },
      { step: 'Iter 4', desc: 'Append `2`. Rebind `a, b = 3, 2 + 3 = 5`' },
    ],
    complexity: { time: 'O(N) linear time', space: 'O(1) auxiliary space (or O(N) if storing list)' },
    trap: 'Interview Follow-up: "How do you find the N-th Fibonacci number in O(log N)?" Answer: Matrix exponentiation or Binet formula.',
  },

  {
    id: 'palindrome-checker',
    sectionId: 'section-coding-problems',
    category: 'coding',
    title: 'How do you check if a String or Number is a Palindrome (with & without slicing)?',
    level: 'Coding',
    tags: ['Strings', 'Palindrome', 'Math'],
    whyAsked: 'Tests string indexing, two-pointer techniques, and mathematical digit reversal using modulo `% 10` and integer division `// 10`.',
    interviewPitch: 'A palindrome reads the same forwards and backwards. For strings, Python allows instant slicing `s == s[::-1]`. If the interviewer forbids slicing or string conversion on numbers, we reverse digits mathematically using `% 10` and `// 10`.',
    summary: 'Strings: `s == s[::-1]` or two pointers. Numbers: Extract last digit with `num % 10` and build reversed integer with `rev * 10 + digit`.',
    points: [
      'String Slicing: `s == s[::-1]` is fastest and idiomatic in Python.',
      'Two-Pointer Approach: Compare characters from `left` and `right` moving inward in O(1) extra space.',
      'Number Without String Conversion: Reverse digits mathematically with `% 10` and `// 10`.',
    ],
    code: `# Method 1: String Two-Pointer Check
def is_palindrome_str(s):
    cleaned = "".join(c.lower() for c in s if c.isalnum())
    return cleaned == cleaned[::-1]

print(is_palindrome_str("Race Car"))  # Output: True
print(is_palindrome_str("Python"))    # Output: False

# Method 2: Number Palindrome WITHOUT str() conversion
def is_palindrome_number(num):
    if num < 0:
        return False  # Negative numbers like -121 are not palindromes
    original = num
    reversed_num = 0
    while num > 0:
        digit = num % 10
        reversed_num = (reversed_num * 10) + digit
        num = num // 10
    return original == reversed_num

print("121 is palindrome:", is_palindrome_number(121))  # Output: True
print("123 is palindrome:", is_palindrome_number(123))  # Output: False`,
    dryRun: [
      { step: 'Number `num = 121`', desc: '`orig = 121`, `rev = 0`' },
      { step: 'Loop 1', desc: '`digit = 121 % 10 = 1`. `rev = 0*10 + 1 = 1`. `num = 121 // 10 = 12`' },
      { step: 'Loop 2', desc: '`digit = 12 % 10 = 2`. `rev = 1*10 + 2 = 12`. `num = 12 // 10 = 1`' },
      { step: 'Loop 3', desc: '`digit = 1 % 10 = 1`. `rev = 12*10 + 1 = 121`. `num = 1 // 10 = 0`' },
      { step: 'Result', desc: '`121 == 121` -> True' },
    ],
    complexity: { time: 'O(N) where N is number of characters / digits', space: 'O(1) extra space' },
    trap: 'Edge case trap: Negative numbers (`-121` reversed is `121-`, so not a palindrome) and casing/spaces in phrases like `"A man, a plan, a canal: Panama"`.',
  },

  {
    id: 'anagram-checker',
    sectionId: 'section-coding-problems',
    category: 'coding',
    title: 'How do you check if two strings are Anagrams?',
    level: 'Coding',
    tags: ['Strings', 'Dictionaries', 'Anagram'],
    whyAsked: 'Evaluates character frequency counting, hash map logic, and time complexity trade-offs between sorting and hash tables.',
    interviewPitch: 'Two strings are anagrams if they contain the exact same characters with identical frequencies, just arranged in a different order. We can check this in O(N) time using a frequency dictionary or `collections.Counter`, or in O(N log N) by comparing sorted strings.',
    summary: 'Compare character frequency counts using `collections.Counter(s1) == collections.Counter(s2)` or a standard dictionary.',
    points: [
      'Hash Map / Counter: O(N) time and O(K) space — optimal.',
      'Sorting: `sorted(s1) == sorted(s2)` takes O(N log N) time and O(N) space.',
      'Case & Spaces: Standardize inputs with `.lower()` and `.replace(" ", "")`.',
    ],
    code: `from collections import Counter

# Method 1: Optimal O(N) using Counter / Dictionary
def is_anagram(str1, str2):
    # Clean spaces and convert to lowercase
    s1 = str1.replace(" ", "").lower()
    s2 = str2.replace(" ", "").lower()
    return Counter(s1) == Counter(s2)

# Method 2: Using standard dictionary
def is_anagram_manual(str1, str2):
    s1 = str1.replace(" ", "").lower()
    s2 = str2.replace(" ", "").lower()
    if len(s1) != len(s2):
        return False
    counts = {}
    for char in s1:
        counts[char] = counts.get(char, 0) + 1
    for char in s2:
        if char not in counts or counts[char] == 0:
            return False
        counts[char] -= 1
    return True

print(is_anagram("listen", "silent"))    # Output: True
print(is_anagram("Triangle", "Integral")) # Output: True
print(is_anagram("hello", "world"))      # Output: False`,
    dryRun: [
      { step: 'String 1 (`"listen"`)', desc: 'Counts: `{"l":1, "i":1, "s":1, "t":1, "e":1, "n":1}`' },
      { step: 'String 2 (`"silent"`)', desc: 'Counts: `{"s":1, "i":1, "l":1, "e":1, "n":1, "t":1}`' },
      { step: 'Comparison', desc: 'Dictionaries match identically -> returns `True`.' },
    ],
    complexity: { time: 'O(N) with Counter / Dict vs O(N log N) with sorting', space: 'O(1) fixed 26 alphabet buckets' },
    trap: 'Trap: Forgetting to handle unequal lengths early (`if len(s1) != len(s2): return False`), which gives an immediate O(1) early exit.',
  },

  {
    id: 'armstrong-number',
    sectionId: 'section-coding-problems',
    category: 'coding',
    title: 'How do you check if a number is an Armstrong (Narcissistic) number?',
    level: 'Coding',
    tags: ['Math', 'Numbers', 'Algorithms'],
    whyAsked: 'Tests digit extraction, power calculations, and problem breakdown for arithmetic algorithms.',
    interviewPitch: 'An Armstrong number of order N is a number equal to the sum of its digits each raised to the power of N (the number of digits). For example, 153 has 3 digits, and 1³ + 5³ + 3³ = 1 + 125 + 27 = 153.',
    summary: 'Count total digits `n`, then sum `digit ** n` for each digit and compare against the original number.',
    points: [
      'Determine Power: `num_digits = len(str(number))`',
      'Compute Sum: Add `int(digit) ** num_digits` for each digit.',
      'Examples: `153` (3-digit), `9474` (4-digit), `370`, `371`, `407`.',
    ],
    code: `def is_armstrong(num):
    num_str = str(num)
    num_digits = len(num_str)
    
    total = sum(int(digit) ** num_digits for digit in num_str)
    return total == num

print("153 is Armstrong:", is_armstrong(153))    # Output: True (1^3 + 5^3 + 3^3 = 153)
print("9474 is Armstrong:", is_armstrong(9474))  # Output: True (9^4 + 4^4 + 7^4 + 4^4 = 9474)
print("123 is Armstrong:", is_armstrong(123))    # Output: False (1^3 + 2^3 + 3^3 = 36 != 123)

# Find Armstrong numbers up to 1000:
armstrongs = [n for n in range(1, 1000) if is_armstrong(n)]
print("Armstrong numbers (1-1000):", armstrongs)
# Output: Armstrong numbers (1-1000): [1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 370, 371, 407]`,
    dryRun: [
      { step: 'Input `153`', desc: 'Digits = 3. `1^3 = 1`, `5^3 = 125`, `3^3 = 27`' },
      { step: 'Summation', desc: '`1 + 125 + 27 = 153` == original `153` -> returns `True`' },
    ],
    complexity: { time: 'O(D) where D is number of digits (log10(N))', space: 'O(1)' },
    trap: 'Order trap: Many freshers hardcode power of 3! For 4-digit numbers like 9474, the power must dynamically be 4.',
  },

  {
    id: 'second-largest-element',
    sectionId: 'section-coding-problems',
    category: 'coding',
    title: 'How do you find the Second Largest element in a list without sorting?',
    level: 'Coding',
    tags: ['Lists', 'Algorithms', 'Array'],
    whyAsked: 'Tests single-pass O(N) array traversal, duplicate handling, and handling edge cases without relying on expensive O(N log N) sorting.',
    interviewPitch: 'Instead of sorting which takes O(N log N), we track two variables `first` and `second` initialized to negative infinity. In a single pass through the list, if a number is greater than `first`, we update `second = first` and `first = num`. If it is between `first` and `second`, we update `second`.',
    summary: 'Traverse list in O(N) keeping track of `first` and `second` maximums, ignoring duplicates.',
    points: [
      'Single Pass: O(N) time with O(1) space.',
      'Handles Duplicates: If list is `[10, 10, 9]`, second largest is `9`, not `10`.',
      'Handles Edge Cases: Returns `None` if list has fewer than 2 unique numbers.',
    ],
    code: `def find_second_largest(numbers):
    if len(numbers) < 2:
        return None
    
    first = second = float('-inf')
    for num in numbers:
        if num > first:
            second = first
            first = num
        elif num > second and num != first:
            second = num
            
    return second if second != float('-inf') else None

print(find_second_largest([12, 35, 1, 10, 34, 1]))  # Output: 34
print(find_second_largest([10, 10, 10]))           # Output: None (No unique 2nd largest)
print(find_second_largest([-5, -1, -10, -2]))      # Output: -2 (Works with negative numbers)`,
    dryRun: [
      { step: 'Init', desc: '`first = -inf`, `second = -inf`' },
      { step: 'Process 12', desc: '`second = -inf`, `first = 12`' },
      { step: 'Process 35', desc: '`second = 12`, `first = 35`' },
      { step: 'Process 34', desc: '`34 < 35` and `34 > 12` -> `second = 34`' },
      { step: 'Final Result', desc: 'Returns `34`' },
    ],
    complexity: { time: 'O(N) single pass', space: 'O(1) auxiliary space' },
    trap: 'Initialization trap: Initializing with `first = second = 0` fails when all numbers in the list are negative! Always initialize with `float("-inf")`.',
  },

  {
    id: 'remove-duplicates-order',
    sectionId: 'section-coding-problems',
    category: 'coding',
    title: 'How do you remove duplicates from a list while preserving original order?',
    level: 'Coding',
    tags: ['Lists', 'Data Structures', 'Pythonic'],
    whyAsked: 'Tests Pythonic idioms (`dict.fromkeys`), set lookups, and why `list(set(lst))` fails order preservation.',
    interviewPitch: 'Using `list(set(lst))` removes duplicates but destroys the original order because sets are unordered. The most Pythonic and fastest way in Python 3.7+ is `list(dict.fromkeys(lst))`, which runs in O(N) time and guarantees insertion order.',
    summary: 'Use `list(dict.fromkeys(lst))` for fast O(N) deduplication preserving original order.',
    points: [
      '`list(set(lst))`: Removes duplicates but LOSES original order.',
      '`list(dict.fromkeys(lst))`: Fast O(N) and PRESERVES insertion order.',
      'Manual Set Loop: Maintain a `seen` set for tracking while appending to a new list.',
    ],
    code: `raw_list = [3, 1, 2, 3, 4, 1, 5, 2]

# Method 1: Pythonic O(N) preserving order (Python 3.7+)
unique_ordered = list(dict.fromkeys(raw_list))
print("Preserved Order:", unique_ordered)
# Output: Preserved Order: [3, 1, 2, 4, 5]

# Method 2: Explicit seen set loop (Clean and universal)
def remove_duplicates(lst):
    seen = set()
    result = []
    for item in lst:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

print("Seen Set Method:", remove_duplicates(raw_list))
# Output: Seen Set Method: [3, 1, 2, 4, 5]`,
    dryRun: [
      { step: '`dict.fromkeys`', desc: 'Dictionary keys in Python 3.7+ preserve insertion order. Duplicate keys are silently overwritten, keeping the first occurrence.' },
    ],
    complexity: { time: 'O(N) linear time', space: 'O(N) to store unique keys' },
    trap: 'Interview trap: "Why is `if item not in result:` slow?" Checking membership in a list is O(N), making the whole function O(N²)! Always use a set for O(1) membership checks.',
  },

  {
    id: 'char-word-frequency',
    sectionId: 'section-coding-problems',
    category: 'coding',
    title: 'How do you count the frequency of characters or words in a string?',
    level: 'Coding',
    tags: ['Strings', 'Dictionaries', 'Hashing'],
    whyAsked: 'Core hash table question for text processing, NLP preprocessing, and interview data manipulation.',
    interviewPitch: 'We can count word or character frequencies using a standard dictionary with the `.get(key, default)` idiom, or via `collections.Counter` which produces a frequency hash map in a single readable line.',
    summary: 'Use `counts[char] = counts.get(char, 0) + 1` in a loop, or `collections.Counter(text)`.',
    points: [
      'Standard Dictionary: `freq[w] = freq.get(w, 0) + 1` handles missing keys without KeyError.',
      '`collections.Counter`: High-performance C-optimized class for counting elements.',
      '`Counter.most_common(k)`: Easily retrieves top K most frequent words.',
    ],
    code: `from collections import Counter

sentence = "apple banana apple orange banana apple"
words = sentence.split()

# Method 1: Standard Dictionary with .get()
word_counts = {}
for word in words:
    word_counts[word] = word_counts.get(word, 0) + 1

print("Word Counts:", word_counts)
# Output: Word Counts: {'apple': 3, 'banana': 2, 'orange': 1}

# Method 2: Using Counter & most_common()
counter = Counter(words)
print("Most Common 2 words:", counter.most_common(2))
# Output: Most Common 2 words: [('apple', 3), ('banana', 2)]`,
    dryRun: [
      { step: 'Word 1 ("apple")', desc: '`word_counts.get("apple", 0)` returns 0 -> sets `word_counts["apple"] = 1`' },
      { step: 'Word 3 ("apple")', desc: '`word_counts.get("apple", 0)` returns 1 -> sets `word_counts["apple"] = 2`' },
    ],
    complexity: { time: 'O(N) where N is number of words', space: 'O(U) where U is unique words' },
    trap: 'KeyError trap: Directly doing `dict[word] += 1` throws a `KeyError` on the first encounter. Always use `.get(word, 0)` or `collections.defaultdict(int)`.',
  },

  // ========================================================
  // 3. STAR & NUMBER PATTERN PROGRAMS
  // ========================================================
  {
    id: 'right-angle-triangle',
    sectionId: 'section-pattern-programs',
    category: 'patterns',
    title: 'How do you print a Right-Angled Star Triangle Pattern?',
    level: 'Pattern',
    tags: ['Patterns', 'Loops', 'Stars'],
    whyAsked: 'Tests nested loop row-column coordination and Python string multiplication `*`.',
    interviewPitch: 'For a right-angled triangle of height N, row `i` (from 1 to N) contains exactly `i` stars. In Python, we can either use nested loops or the string repetition operator `*` to multiply stars.',
    summary: 'Row `i` prints `i` stars. Loop from `i = 1` to `n + 1` and print `* * i`.',
    points: [
      'Nested Loop Logic: Outer loop runs for rows `1..N`, inner loop prints `i` stars.',
      'Pythonic Shortcut: `print("* " * i)` multiplies strings cleanly.',
    ],
    code: `n = 5
for i in range(1, n + 1):
    print("* " * i)

# Output:
# * 
# * * 
# * * * 
# * * * * 
# * * * * *`,
    dryRun: [
      { step: 'Row 1 (`i = 1`)', desc: 'Prints 1 star (`* `)' },
      { step: 'Row 2 (`i = 2`)', desc: 'Prints 2 stars (`* * `)' },
      { step: 'Row 5 (`i = 5`)', desc: 'Prints 5 stars (`* * * * * `)' },
    ],
    complexity: { time: 'O(N²)', space: 'O(1)' },
    trap: 'Follow-up: "Can you print numbers instead of stars?" Yes! Replace `*` with `str(i) * i` or use inner loop `range(1, i + 1)`.',
  },

  {
    id: 'inverted-triangle-pattern',
    sectionId: 'section-pattern-programs',
    category: 'patterns',
    title: 'How do you print an Inverted Right-Angled Star Triangle?',
    level: 'Pattern',
    tags: ['Patterns', 'Loops', 'Stars'],
    whyAsked: 'Tests reverse looping with `range(start, stop, step)` where step is `-1`.',
    interviewPitch: 'An inverted triangle starts with N stars on row 1 and decreases by 1 star each row until row N has 1 star. We iterate `range(n, 0, -1)` and print `* * i`.',
    summary: 'Loop backwards from `n` down to 1 using `range(n, 0, -1)` and print `* * i`.',
    points: [
      'Reverse Range: `range(n, 0, -1)` starts at `n` and stops before 0.',
      'Decreasing Output: Each row has 1 less star than the previous row.',
    ],
    code: `n = 5
for i in range(n, 0, -1):
    print("* " * i)

# Output:
# * * * * * 
# * * * * 
# * * * 
# * * 
# *`,
    dryRun: [
      { step: 'Row 1 (`i = 5`)', desc: 'Prints 5 stars' },
      { step: 'Row 2 (`i = 4`)', desc: 'Prints 4 stars' },
      { step: 'Row 5 (`i = 1`)', desc: 'Prints 1 star' },
    ],
    complexity: { time: 'O(N²)', space: 'O(1)' },
    trap: 'Stop parameter trap: Writing `range(n, 0)` without `-1` step produces an empty loop because default step is `+1`.',
  },

  {
    id: 'pyramid-star-pattern',
    sectionId: 'section-pattern-programs',
    category: 'patterns',
    title: 'How do you print a Centered Pyramid Star Pattern?',
    level: 'Pattern',
    tags: ['Patterns', 'Loops', 'Pyramid'],
    whyAsked: 'Tests leading whitespace alignment and calculating odd numbers of stars (`2*i - 1`).',
    interviewPitch: 'A centered pyramid requires balancing leading spaces and stars on each row. For height N, row `i` (from 1 to N) requires `n - i` leading spaces followed by `2*i - 1` stars.',
    summary: 'Row `i` prints `n - i` spaces followed by `2*i - 1` stars.',
    points: [
      'Leading Spaces: `n - i` spaces push stars to the center.',
      'Star Formula: `2*i - 1` generates odd counts: 1, 3, 5, 7, 9.',
    ],
    code: `n = 5
for i in range(1, n + 1):
    spaces = " " * (n - i)
    stars = "*" * (2 * i - 1)
    print(spaces + stars)

# Output:
#     *
#    ***
#   *****
#  *******
# *********`,
    dryRun: [
      { step: 'Row 1 (`i = 1`)', desc: '4 spaces + 1 star (`    *`)' },
      { step: 'Row 2 (`i = 2`)', desc: '3 spaces + 3 stars (`   ***`)' },
      { step: 'Row 5 (`i = 5`)', desc: '0 spaces + 9 stars (`*********`)' },
    ],
    complexity: { time: 'O(N²)', space: 'O(1)' },
    trap: 'Alignment trap: Using `* ` (with a space) inside the `2*i - 1` formula skews the center. For spaced pyramids, print `(n - i) * " " + i * "* "`.',
  },

  {
    id: 'diamond-star-pattern',
    sectionId: 'section-pattern-programs',
    category: 'patterns',
    title: 'How do you print a Full Diamond Star Pattern?',
    level: 'Pattern',
    tags: ['Patterns', 'Loops', 'Diamond'],
    whyAsked: 'Tests combining upper pyramid and lower inverted pyramid logic seamlessly.',
    interviewPitch: 'A diamond combines an upper pyramid of height N with a lower inverted pyramid of height N-1. The top half increases stars from 1 to 2N-1, while the bottom half decreases from 2N-3 down to 1.',
    summary: 'Print top pyramid (`1..n`), then print bottom inverted pyramid (`n-1..1`).',
    points: [
      'Upper Half: `1` to `n` with `n - i` spaces and `2*i - 1` stars.',
      'Lower Half: `n - 1` down to `1` with `n - i` spaces and `2*i - 1` stars.',
    ],
    code: `n = 5

# Upper Pyramid
for i in range(1, n + 1):
    print(" " * (n - i) + "*" * (2 * i - 1))

# Lower Inverted Pyramid
for i in range(n - 1, 0, -1):
    print(" " * (n - i) + "*" * (2 * i - 1))

# Output:
#     *
#    ***
#   *****
#  *******
# *********
#  *******
#   *****
#    ***
#     *`,
    dryRun: [
      { step: 'Upper peak', desc: 'Row 1 has 1 star, expands to 9 stars at row 5' },
      { step: 'Lower tapering', desc: 'Row 6 has 7 stars, tapers back down to 1 star at row 9' },
    ],
    complexity: { time: 'O(N²)', space: 'O(1)' },
    trap: 'Duplicate center row trap: Starting the lower pyramid from `n` repeats the widest row twice! Always start lower loop at `n - 1`.',
  },

  {
    id: 'hollow-square-triangle',
    sectionId: 'section-pattern-programs',
    category: 'patterns',
    title: 'How do you print a Hollow Square and Hollow Triangle Pattern?',
    level: 'Pattern',
    tags: ['Patterns', 'Loops', 'Hollow'],
    whyAsked: 'Tests multi-condition boundary checks (`if i == 1 or i == n or j == 1 or j == n`).',
    interviewPitch: 'Hollow patterns print stars only on the boundaries (first row, last row, first column, last column) and print empty spaces in the interior.',
    summary: 'Check if current position is on a boundary; if yes, print *, otherwise print space.',
    points: [
      'Boundary Condition: `i == 1 or i == n or j == 1 or j == n` prints stars.',
      'Interior Condition: Any non-boundary index prints whitespace.',
    ],
    code: `# 1. Hollow Square:
n = 5
print("Hollow Square:")
for i in range(1, n + 1):
    for j in range(1, n + 1):
        if i == 1 or i == n or j == 1 or j == n:
            print("*", end=" ")
        else:
            print(" ", end=" ")
    print()

# Output:
# * * * * * 
# *       * 
# *       * 
# *       * 
# * * * * * 

# 2. Hollow Right Triangle:
print("\\nHollow Triangle:")
for i in range(1, n + 1):
    for j in range(1, i + 1):
        if j == 1 or j == i or i == n:
            print("*", end=" ")
        else:
            print(" ", end=" ")
    print()

# Output:
# * 
# * * 
# *   * 
# *     * 
# * * * * *`,
    dryRun: [
      { step: 'Row 1', desc: '`i == 1` -> prints all 5 stars (`* * * * *`)' },
      { step: 'Row 2-4', desc: '`j == 1` and `j == 5` print `*`, `j = 2,3,4` print spaces (`*       *`)' },
      { step: 'Row 5', desc: '`i == 5` -> prints all 5 stars (`* * * * *`)' },
    ],
    complexity: { time: 'O(N²)', space: 'O(1)' },
    trap: 'Newline trap: Forgetting `end=" "` in inner print calls prints each character on a new line! Always use `end=" "` and `print()` for row breaks.',
  },

  {
    id: 'floyds-number-triangle',
    sectionId: 'section-pattern-programs',
    category: 'patterns',
    title: 'How do you print Floyd’s Triangle (Continuous Number Pattern)?',
    level: 'Pattern',
    tags: ['Patterns', 'Loops', 'Numbers'],
    whyAsked: 'Tests continuous state tracking across nested loops instead of resetting each row.',
    interviewPitch: 'Floyd’s triangle is a right-angled triangular array of natural numbers where numbers increment continuously starting from 1 across rows.',
    summary: 'Maintain a running counter variable `num = 1` outside the loops and increment `num += 1` on every print.',
    points: [
      'State Preservation: Counter `num` is initialized before the outer loop and NOT reset.',
      'Row `i`: Contains `i` consecutive numbers.',
    ],
    code: `n = 4
num = 1

for i in range(1, n + 1):
    for j in range(1, i + 1):
        print(num, end=" ")
        num += 1
    print()

# Output:
# 1 
# 2 3 
# 4 5 6 
# 7 8 9 10`,
    dryRun: [
      { step: 'Row 1 (`i = 1`)', desc: 'Prints `1`, `num` becomes 2' },
      { step: 'Row 2 (`i = 2`)', desc: 'Prints `2 3`, `num` becomes 4' },
      { step: 'Row 3 (`i = 3`)', desc: 'Prints `4 5 6`, `num` becomes 7' },
      { step: 'Row 4 (`i = 4`)', desc: 'Prints `7 8 9 10`, `num` becomes 11' },
    ],
    complexity: { time: 'O(N²)', space: 'O(1)' },
    trap: 'Scope trap: Putting `num = 1` INSIDE the outer loop resets numbers every row (1 / 1 2 / 1 2 3). It must remain OUTSIDE.',
  },

  // ========================================================
  // 4. CODE DEBUGGING & BEGINNER ERROR DIAGNOSIS
  // ========================================================
  {
    id: 'reading-traceback-errors',
    sectionId: 'section-debugging-diagnostics',
    category: 'debugging',
    title: 'How do you read and understand a Python Traceback when an error occurs?',
    level: 'Debugging',
    tags: ['Debugging', 'Traceback', 'Errors'],
    whyAsked: 'Tests real-world debugging maturity — whether a developer panics at errors or methodically inspects call stacks.',
    interviewPitch: 'A Python traceback is read from bottom to top. The very last line gives the exact exception type and error message (e.g., `IndexError: list index out of range`). The lines above show the call stack, pointing to the exact file and line number where the failure originated.',
    summary: 'Read tracebacks bottom-up: last line is the exception and message; lines above show the file path, function, and line number.',
    points: [
      'Bottom Line: Exception name and cause (`TypeError: unsupported operand...`).',
      'Location Line: `File "app.py", line 42, in process_data` tells you where to inspect.',
      'Common Types: `IndexError` (invalid index), `KeyError` (missing dict key), `AttributeError` (calling nonexistent method), `ValueError` (invalid cast).',
    ],
    code: `# Sample code that triggers a traceback:
def calculate_average(scores):
    total = sum(scores)
    return total / len(scores)

# Passing an empty list triggers ZeroDivisionError:
try:
    calculate_average([])
except ZeroDivisionError as e:
    import traceback
    print("--- TRACEBACK OUTPUT ---")
    traceback.print_exc()

# Simulated Output:
# Traceback (most recent call last):
#   File "script.py", line 4, in calculate_average
#     return total / len(scores)
# ZeroDivisionError: division by zero`,
    dryRun: [
      { step: 'Bottom line', desc: 'Identifies the error type (`ZeroDivisionError: division by zero`).' },
      { step: 'Line above', desc: 'Points to line 4 inside `calculate_average`: `len(scores)` evaluated to 0.' },
      { step: 'The Fix', desc: 'Add guard clause: `if not scores: return 0`.' },
    ],
    complexity: { time: 'O(1)', space: 'O(1)' },
    trap: 'Panic trap: Reading tracebacks from top to bottom causes confusion from library wrappers. Always start at the bottom line!',
  },

  {
    id: 'debugging-techniques-pdb',
    sectionId: 'section-debugging-diagnostics',
    category: 'debugging',
    title: 'What are the best methods to debug Python code (print vs breakpoint/pdb)?',
    level: 'Debugging',
    tags: ['Debugging', 'pdb', 'Tools'],
    whyAsked: 'Distinguishes junior "print-only" coders from engineers who know Python 3.7+ interactive debugging.',
    interviewPitch: 'For quick checks, `print(f"{var=}")` outputs variable names and values. For complex logic, Python 3.7+ provides built-in `breakpoint()`, which pauses execution and opens the interactive `pdb` debugger to inspect variables, step line-by-line (`n`), step into functions (`s`), and continue (`c`).',
    summary: 'Use `print(f"{x=}")` for quick logging; use `breakpoint()` for interactive stepping with pdb.',
    points: [
      'Self-Documenting Print: `print(f"{user_id=}")` prints `user_id=101`.',
      'Built-in `breakpoint()`: Native in Python 3.7+ (calls `pdb.set_trace()`).',
      'PDB Commands: `n` (next line), `s` (step into), `c` (continue), `p var` (print value), `q` (quit).',
    ],
    code: `# 1. Python 3.8+ Self-documenting f-strings:
total = 150
discount = 0.2
final_price = total * (1 - discount)
print(f"{total=}, {discount=}, {final_price=}")
# Output: total=150, discount=0.2, final_price=120.0

# 2. Interactive Breakpoint (Uncomment in local terminal):
def process_order(price, tax):
    # breakpoint()  # Pauses execution and opens interactive PDB shell!
    return price + (price * tax)

print("Order Total:", process_order(100, 0.05))
# Output: Order Total: 105.0`,
    dryRun: [
      { step: '`breakpoint()` trigger', desc: 'Halts runtime and gives terminal control to evaluate expressions live.' },
    ],
    complexity: { time: 'O(1)', space: 'O(1)' },
    trap: 'Production trap: Never commit active `breakpoint()` or `pdb.set_trace()` calls to production code repositories.',
  },

  {
    id: 'mutable-default-argument-trap',
    sectionId: 'section-debugging-diagnostics',
    category: 'debugging',
    title: 'Why is using a Mutable Default Argument (e.g. def func(x=[])) a dangerous trap?',
    level: 'Debugging',
    tags: ['Traps', 'Functions', 'Memory'],
    whyAsked: 'One of the most famous Python interview gotchas testing function definition evaluation timing.',
    interviewPitch: 'In Python, default parameter expressions are evaluated once when the function is defined, NOT each time the function is called. If you use a mutable object like `[]` or `{}` as a default, that single object is shared across all subsequent invocations, causing unexpected state pollution.',
    summary: 'Default arguments evaluate once at function definition time. Use `None` as default and initialize inside the body.',
    points: [
      'Root Cause: The list is created once when the `def` statement executes in memory.',
      'Consequence: Repeated calls without arguments append to the same shared list.',
      'The Solution: Use `arg=None` as default, then initialize `if arg is None: arg = []`.',
    ],
    code: `# THE BUG:
def add_item_buggy(item, cart=[]):
    cart.append(item)
    return cart

print(add_item_buggy("Apple"))   # Output: ['Apple']
print(add_item_buggy("Banana"))  # Output: ['Apple', 'Banana'] (Oops! Cart was shared!)

# THE FIX:
def add_item_fixed(item, cart=None):
    if cart is None:
        cart = []  # Creates a fresh list on EVERY call
    cart.append(item)
    return cart

print(add_item_fixed("Apple"))   # Output: ['Apple']
print(add_item_fixed("Banana"))  # Output: ['Banana'] (Clean and independent!)`,
    dryRun: [
      { step: 'Buggy call 1', desc: 'Appends `"Apple"` to shared list object at memory address 0x100.' },
      { step: 'Buggy call 2', desc: 'Uses same list at 0x100 -> now contains `["Apple", "Banana"]`.' },
      { step: 'Fixed call', desc: '`cart=None` triggers `cart = []`, creating a new list on every call.' },
    ],
    complexity: { time: 'O(1)', space: 'O(1)' },
    trap: 'Interview trap: This also applies to dictionaries `def cache(data={}):` and custom objects. Always use `None` for mutable defaults!',
  },

  {
    id: 'modifying-list-while-iterating',
    sectionId: 'section-debugging-diagnostics',
    category: 'debugging',
    title: 'Why shouldn’t you modify a List while iterating over it, and how to fix it?',
    level: 'Debugging',
    tags: ['Traps', 'Lists', 'Loops'],
    whyAsked: 'Tests internal iterator index mechanics and how to safely filter collections.',
    interviewPitch: 'When you remove items from a list while iterating forward, the list shrinks and all subsequent elements shift left by one index. However, the internal loop counter continues advancing by +1, silently skipping adjacent elements.',
    summary: 'Modifying a list in-place shifts indices and skips items. Fix by iterating over a slice copy `lst[:]` or using a list comprehension.',
    points: [
      'The Bug: Removing items causes elements to shift left, skipping elements right after removals.',
      'Fix 1 (Best): Use a list comprehension `[x for x in nums if condition]`.',
      'Fix 2: Iterate over a shallow copy `for x in nums[:]:`.',
    ],
    code: `# THE BUG:
nums = [1, 2, 2, 3, 4]
for num in nums:
    if num == 2:
        nums.remove(num)
print("Buggy result:", nums)
# Output: Buggy result: [1, 2, 3, 4]  (One '2' was SKIPPED!)

# THE FIX (Method 1: List Comprehension):
nums2 = [1, 2, 2, 3, 4]
filtered_nums = [x for x in nums2 if x != 2]
print("Fixed result:", filtered_nums)
# Output: Fixed result: [1, 3, 4]

# THE FIX (Method 2: Iterate over copy):
nums3 = [1, 2, 2, 3, 4]
for num in nums3[:]:  # Slicing creates a snapshot copy
    if num == 2:
        nums3.remove(num)
print("Copy loop result:", nums3)
# Output: Copy loop result: [1, 3, 4]`,
    dryRun: [
      { step: 'Iter index 1 (`num = 2`)', desc: 'Removes first `2`. Elements shift left: index 1 now holds the second `2`.' },
      { step: 'Iter index 2', desc: 'Loop advances to index 2 (which is now `3`), completely skipping the second `2`!' },
    ],
    complexity: { time: 'List comprehension is O(N) vs `remove()` in loop which is O(N²)', space: 'O(N)' },
    trap: 'Performance trap: Calling `list.remove()` inside a loop is O(N²) because `remove()` scans the list each time. List comprehension is O(N).',
  },

  {
    id: 'unboundlocalerror-scope-trap',
    sectionId: 'section-debugging-diagnostics',
    category: 'debugging',
    title: 'What causes UnboundLocalError and how do you fix it?',
    level: 'Debugging',
    tags: ['Scope', 'Errors', 'Variables'],
    whyAsked: 'Tests understanding of Python compile-time variable scope assignment vs runtime resolution.',
    interviewPitch: 'When Python compiles a function, any variable assigned to (`=`) inside the function body is marked as a Local variable. If you try to read that variable before the assignment line executes, Python raises an UnboundLocalError instead of falling back to the global variable.',
    summary: 'Assigning to a variable inside a function marks it as local. Use `global` or `nonlocal` if modifying outer variables.',
    points: [
      'Cause: Python sees `count = count + 1` and flags `count` as local, but reading `count` on the right side fails because local `count` has not been assigned yet.',
      'Fix: Declare `global count` or pass and return values explicitly.',
    ],
    code: `counter = 0

# THE BUG:
def increment_buggy():
    # counter += 1  # UnboundLocalError: local variable 'counter' referenced before assignment
    pass

# THE FIX (Method 1: Global Keyword):
def increment_fixed():
    global counter
    counter += 1

increment_fixed()
print("Counter after global fix:", counter)  # Output: Counter after global fix: 1

# THE FIX (Method 2: Pure Function - Recommended):
def increment_pure(val):
    return val + 1

score = increment_pure(10)
print("Pure function score:", score)  # Output: Pure function score: 11`,
    dryRun: [
      { step: 'Compiler Phase', desc: 'CPython scans function, detects assignment `counter = ...`, and marks `counter` in local symbol table.' },
      { step: 'Execution Phase', desc: 'Tries to read `counter` before local binding exists -> raises `UnboundLocalError`.' },
    ],
    complexity: { time: 'O(1)', space: 'O(1)' },
    trap: 'Interview best practice: In real production code, avoid `global` keywords; pass parameters and return new values (pure functions).',
  },

  // ========================================================
  // 5. OOP, ADVANCED INTERNALS & MEMORY ARCHITECTURE
  // ========================================================
  {
    id: 'oop-four-pillars',
    sectionId: 'section-core-advanced',
    category: 'advanced',
    title: 'What are the 4 Pillars of Object-Oriented Programming (OOP) in Python?',
    level: 'Advanced',
    tags: ['OOP', 'Classes', 'Architecture'],
    whyAsked: 'Core architecture question for software engineering, modular design, and API building.',
    interviewPitch: 'The 4 pillars of OOP are: Encapsulation (bundling data and methods with access restrictions), Abstraction (hiding internal implementation details using ABCs), Inheritance (reusing parent class behaviors in child classes), and Polymorphism (providing a unified interface for different underlying types).',
    summary: 'Encapsulation, Abstraction, Inheritance, and Polymorphism structure modular, scalable software in Python.',
    points: [
      'Encapsulation: Restricting direct access to internal state using private `_` and `__` prefixes.',
      'Abstraction: Exposing only high-level interfaces using `abc.ABC` and `@abstractmethod`.',
      'Inheritance: Subclasses inherit attributes and methods from base classes (`class Dog(Animal):`).',
      'Polymorphism: Different classes implementing the same method signature (duck typing).',
    ],
    code: `class Animal:
    def speak(self):
        return "Some sound"

class Dog(Animal):  # Inheritance
    def speak(self):  # Polymorphism (Method Overriding)
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

# Polymorphic iteration:
animals = [Dog(), Cat()]
for a in animals:
    print(f"{a.__class__.__name__}: {a.speak()}")
# Output:
# Dog: Woof!
# Cat: Meow!`,
    dryRun: [
      { step: 'Dynamic Dispatch', desc: 'At runtime, Python inspects the object type and invokes the correct overridden `speak()` method.' },
    ],
    complexity: { time: 'O(1) method resolution', space: 'O(1)' },
    trap: 'Python Duck Typing quote: "If it walks like a duck and quacks like a duck, it’s a duck." Python emphasizes behavior over strict class hierarchies.',
  },

  {
    id: 'init-vs-self-explained',
    sectionId: 'section-core-advanced',
    category: 'advanced',
    title: 'What are __init__ and self in Python classes?',
    level: 'Advanced',
    tags: ['OOP', 'Classes', 'Constructors'],
    whyAsked: 'Fundamental check on class instantiation and instance memory references.',
    interviewPitch: '`__init__` is Python’s instance initializer (constructor) that runs automatically when a new object is instantiated to configure its initial attributes. `self` is an explicit reference to the current instance object being created or manipulated, allowing access to instance variables and methods.',
    summary: '`__init__` initializes instance attributes; `self` represents the specific object instance.',
    points: [
      '`__init__`: Dunder method invoked immediately after object creation to set initial state.',
      '`self`: First parameter of every instance method pointing to the caller object in memory.',
      'Automatic Passing: When you call `car.drive()`, Python translates it to `Car.drive(car)`.',
    ],
    code: `class Student:
    def __init__(self, name, marks):
        self.name = name    # Instance variable bound to self
        self.marks = marks

    def get_result(self):
        return "Pass" if self.marks >= 40 else "Fail"

s1 = Student("Sai", 85)
s2 = Student("Rahul", 32)

print(f"{s1.name}: {s1.get_result()}")  # Output: Sai: Pass
print(f"{s2.name}: {s2.get_result()}")  # Output: Rahul: Fail`,
    dryRun: [
      { step: '`s1 = Student("Sai", 85)`', desc: 'Allocates instance in memory, passes instance as `self`, sets `s1.name = "Sai"` and `s1.marks = 85`.' },
    ],
    complexity: { time: 'O(1)', space: 'O(1)' },
    trap: 'Naming trap: Is `self` a Python keyword? NO! It is a strong community convention. You could name it `this`, but never do so in professional code.',
  },

  {
    id: 'shallow-vs-deep-copy',
    sectionId: 'section-core-advanced',
    category: 'advanced',
    title: 'What is the difference between Shallow Copy and Deep Copy?',
    level: 'Advanced',
    tags: ['Memory', 'Copy', 'Data Structures'],
    whyAsked: 'Critical for avoiding accidental shared mutations when duplicating nested lists or dictionaries.',
    interviewPitch: 'A Shallow Copy (`copy.copy()` or `lst.copy()`) creates a new outer collection, but inserts references to the original nested objects. A Deep Copy (`copy.deepcopy()`) recursively copies both the outer container and all nested objects, creating a completely independent clone in memory.',
    summary: 'Shallow copy duplicates only the outer container; Deep copy duplicates the outer container AND all nested child objects.',
    points: [
      'Shallow Copy (`copy.copy()`): Modifying nested lists in the copy affects the original!',
      'Deep Copy (`copy.deepcopy()`): Fully independent memory clone; changes never affect original.',
      'Assignment (`b = a`): Does NOT copy anything; creates another pointer to the exact same object.',
    ],
    code: `import copy

original = [[1, 2, 3], [4, 5, 6]]

# 1. Shallow Copy
shallow = copy.copy(original)
shallow[0][0] = 999  # Modifies nested list!
print("Original after shallow edit:", original)
# Output: Original after shallow edit: [[999, 2, 3], [4, 5, 6]] (Changed!)

# 2. Deep Copy
original2 = [[1, 2, 3], [4, 5, 6]]
deep = copy.deepcopy(original2)
deep[0][0] = 999
print("Original after deep edit:   ", original2)
# Output: Original after deep edit:    [[1, 2, 3], [4, 5, 6]] (Protected!)`,
    dryRun: [
      { step: 'Shallow copy memory', desc: 'Outer list has new memory address, but `shallow[0]` points to original `original[0]` address.' },
      { step: 'Deep copy memory', desc: 'Recursively allocates new memory addresses for outer list and every child list.' },
    ],
    complexity: { time: 'Shallow O(N) vs Deep O(total nested elements)', space: 'Deep copy uses full duplicate RAM' },
    trap: 'Trap: For 1-level flat lists (`[1, 2, 3]`), shallow copy is sufficient! Deep copy is only needed for nested data structures.',
  },

  {
    id: 'decorators-in-python',
    sectionId: 'section-core-advanced',
    category: 'advanced',
    title: 'What are Decorators in Python and how do they work?',
    level: 'Advanced',
    tags: ['Advanced', 'Decorators', 'Functions'],
    whyAsked: 'Evaluates first-class functions, closures, and metaprogramming used extensively in FastAPI, Flask, and Django.',
    interviewPitch: 'A decorator is a design pattern that allows you to dynamically extend or modify the behavior of a function without changing its source code. In Python, functions are first-class objects, so a decorator takes a function as input, wraps it in an inner closure, and returns the modified wrapper.',
    summary: 'A decorator wraps a function to add logging, timing, authentication, or caching without altering the original function.',
    points: [
      'First-Class Functions: Functions can be passed as arguments, assigned to variables, and returned from other functions.',
      'Syntax: `@my_decorator` above a function is syntactic sugar for `func = my_decorator(func)`.',
      'Use Cases: Logging, timing execution, authentication checks, rate limiting.',
    ],
    code: `import time

# Decorator to measure execution time:
def timer_decorator(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        duration = time.time() - start
        print(f"[{func.__name__}] Execution Time: {duration:.5f}s")
        return result
    return wrapper

@timer_decorator
def compute_squares():
    return sum(i * i for i in range(100_000))

total = compute_squares()
# Output:
# [compute_squares] Execution Time: 0.00612s`,
    dryRun: [
      { step: '@timer_decorator application', desc: 'Replaces `compute_squares` with `wrapper`.' },
      { step: 'Invocation', desc: 'Calls `wrapper()`, records start time, executes `func()`, logs duration, returns result.' },
    ],
    complexity: { time: 'O(1) wrapper overhead', space: 'O(1)' },
    trap: 'Metadata preservation: Using decorators strips function name and docstrings unless you decorate the wrapper with `@functools.wraps(func)`.',
  },

  {
    id: 'generators-vs-lists',
    sectionId: 'section-core-advanced',
    category: 'advanced',
    title: 'What are Generators and how do they differ from Lists (yield vs return)?',
    level: 'Advanced',
    tags: ['Advanced', 'Generators', 'Memory'],
    whyAsked: 'Tests memory optimization for big data processing, streaming, and lazy evaluation.',
    interviewPitch: 'A regular function with `return` computes all values at once and stores the complete dataset in RAM. A generator function uses `yield` to return items lazily one by one on-demand, maintaining state between iterations and consuming virtually O(1) memory even for billions of records.',
    summary: 'Lists store all elements in memory eagerly; Generators produce values lazily on-demand using `yield`.',
    points: [
      '`yield`: Pauses function execution, returns current value, and saves execution state for the next call.',
      'Memory Efficiency: Streaming a 10 GB file line-by-line uses mere kilobytes of RAM with generators.',
      '`next()` Protocol: Generators implement the iterator protocol (`__iter__` and `__next__`).',
    ],
    code: `import sys

# 1. List (Eager Evaluation - Uses Memory):
num_list = [i for i in range(1_000_000)]
print("List Memory (bytes):", sys.getsizeof(num_list))  # ~8.4 MB in RAM

# 2. Generator Expression (Lazy Evaluation - O(1) Memory):
num_gen = (i for i in range(1_000_000))
print("Gen Memory (bytes): ", sys.getsizeof(num_gen))   # ~104 bytes in RAM!

# Fetch first 3 values from generator:
print("Next 1:", next(num_gen))  # Output: 0
print("Next 2:", next(num_gen))  # Output: 1
print("Next 3:", next(num_gen))  # Output: 2`,
    dryRun: [
      { step: 'List allocation', desc: 'Eagerly allocates 1,000,000 integer pointers in memory immediately.' },
      { step: 'Generator evaluation', desc: 'Allocates small generator state object. Computes values only when `next()` is called.' },
    ],
    complexity: { time: 'O(1) per step generation', space: 'O(1) constant memory' },
    trap: 'Single exhaustion trap: Generators can only be consumed once! Once a generator finishes, subsequent iterations produce nothing unless re-instantiated.',
  },

  {
    id: 'gil-global-interpreter-lock',
    sectionId: 'section-core-advanced',
    category: 'advanced',
    title: 'What is the Global Interpreter Lock (GIL) in CPython and why does it exist?',
    level: 'Advanced',
    tags: ['Architecture', 'Concurrency', 'GIL'],
    whyAsked: 'Senior architecture check on multithreading limitations vs multiprocessing for CPU-bound workloads.',
    interviewPitch: 'The GIL is a mutex in CPython that prevents multiple native threads from executing Python bytecode simultaneously. It exists because CPython’s memory management is not thread-safe. For CPU-heavy tasks, threading does not offer speedups; you must use `multiprocessing`. For I/O-heavy tasks (APIs, network), threading works great.',
    summary: 'The GIL allows only one thread to execute Python bytecode at a time in CPython to protect reference count memory management.',
    points: [
      'Why GIL Exists: CPython uses reference counting for garbage collection, which is not thread-safe without locks.',
      'CPU-Bound Tasks (Math/ML): Use `multiprocessing` to bypass GIL and utilize all CPU cores.',
      'I/O-Bound Tasks (Web/DB/Files): Standard `threading` or `asyncio` works effectively because threads release the GIL during I/O wait.',
    ],
    code: `# CPU-bound tasks should use multiprocessing, not threading:
from multiprocessing import Process

def heavy_calculation(n):
    return sum(i * i for i in range(n))

if __name__ == "__main__":
    p1 = Process(target=heavy_calculation, args=(10_000_000,))
    p2 = Process(target=heavy_calculation, args=(10_000_000,))
    p1.start()
    p2.start()
    p1.join()
    p2.join()
    print("Multiprocessing finished utilizing multi-core CPU!")
# Output: Multiprocessing finished utilizing multi-core CPU!`,
    dryRun: [
      { step: 'Thread execution', desc: 'Thread 1 acquires GIL -> executes bytecode -> releases GIL -> Thread 2 acquires GIL (serialized).' },
      { step: 'Process execution', desc: 'Process 1 and Process 2 run in separate OS memory spaces, each with its own GIL on separate CPU cores.' },
    ],
    complexity: { time: 'Multiprocessing scales across N CPU cores', space: 'Separate process memory overhead' },
    trap: 'Python 3.13+ Free-Threaded build: Python 3.13 introduced experimental support (PEP 703) to disable the GIL completely!',
  },

  {
    id: 'memory-management-gc',
    sectionId: 'section-core-advanced',
    category: 'advanced',
    title: 'How does Python manage memory (Reference Counting & Cyclic Garbage Collection)?',
    level: 'Advanced',
    tags: ['Memory', 'Garbage Collection', 'Internals'],
    whyAsked: 'Tests deep knowledge of Python internal memory allocation, `sys.getrefcount`, and circular reference resolution.',
    interviewPitch: 'Python uses two primary memory management mechanisms: Reference Counting and Generational Garbage Collection. When an object’s reference count drops to 0, its memory is deallocated immediately. To resolve circular references (e.g. object A referencing B and B referencing A), Python runs a cyclic generational GC (Generations 0, 1, and 2).',
    summary: 'Memory is freed instantly when reference count hits 0; a 3-generation cyclic GC cleans up circular references.',
    points: [
      'Reference Counting: Every object maintains a count of pointers pointing to it (`sys.getrefcount()`).',
      'Immediate Deallocation: Count == 0 -> memory returned to Python memory pool immediately.',
      'Cyclic GC: Detects unreferenced islands of circular references using 3 generational buckets.',
    ],
    code: `import sys
import gc

# 1. Reference Counting:
a = [1, 2, 3]
print("Initial refcount:", sys.getrefcount(a) - 1)  # 1 reference

b = a  # 2nd reference
print("Refcount after b=a:", sys.getrefcount(a) - 1)  # 2 references

del b  # Decrement count
print("Refcount after del b:", sys.getrefcount(a) - 1)  # 1 reference

# 2. Circular Reference Example:
node1 = {}
node2 = {}
node1["next"] = node2
node2["prev"] = node1  # Circular loop!

del node1
del node2  # Reference count is 1, but objects are unreachable!
# Python's cyclic GC runs in background to collect them:
collected = gc.collect()
print(f"Cyclic GC collected {collected} unreachable objects.")
# Output: Cyclic GC collected unreachable objects`,
    dryRun: [
      { step: '`del b`', desc: 'Decrements reference count of list `[1, 2, 3]` from 2 to 1.' },
      { step: '`gc.collect()`', desc: 'Scans Generation 0/1/2 heuristic graphs to detect unreachable circular loops and deallocates them.' },
    ],
    complexity: { time: 'Reference count decrement is O(1); GC collection is periodic', space: 'O(1)' },
    trap: 'PyPy / JIT difference: Reference counting is specific to CPython. Other implementations like PyPy or Jython use different garbage collectors.',
  },

  {
    id: 'args-kwargs-unpacking',
    sectionId: 'section-core-advanced',
    category: 'advanced',
    title: 'What are *args and **kwargs in Python functions?',
    level: 'Advanced',
    tags: ['Functions', 'Args', 'Pythonic'],
    whyAsked: 'Tests flexible function signatures, decorator argument forwarding, and tuple/dictionary unpacking.',
    interviewPitch: '`*args` allows a function to accept any number of positional arguments, which are packed into a Tuple. `**kwargs` allows accepting any number of keyword (named) arguments, which are packed into a Dictionary. They are essential for writing flexible wrappers and decorators.',
    summary: '`*args` collects extra positional arguments into a Tuple; `**kwargs` collects keyword arguments into a Dictionary.',
    points: [
      '`*args`: Packed as a `tuple` (e.g. `(1, 2, 3)`).',
      '`**kwargs`: Packed as a `dict` (e.g. `{"name": "Sai", "role": "Dev"}`).',
      'Argument Forwarding: Used in decorators to forward arbitrary arguments: `func(*args, **kwargs)`.',
      'Order: Standard parameters -> `*args` -> Keyword-only parameters -> `**kwargs`.',
    ],
    code: `def introduce_team(team_name, *members, **details):
    print(f"Team: {team_name}")
    print("Members (Tuple):", members)
    print("Details (Dict):  ", details)

introduce_team(
    "Think IT AI",
    "Sai", "Kiran", "Divya",
    project="Docs Platform",
    version=2.0
)

# Output:
# Team: Think IT AI
# Members (Tuple): ('Sai', 'Kiran', 'Divya')
# Details (Dict):   {'project': 'Docs Platform', 'version': 2.0}`,
    dryRun: [
      { step: 'Positional binding', desc: '`team_name = "Think IT AI"`' },
      { step: '`*members` packing', desc: 'Packs remaining positional args into `("Sai", "Kiran", "Divya")`.' },
      { step: '`**details` packing', desc: 'Packs keyword arguments into `{"project": "Docs Platform", "version": 2.0}`.' },
    ],
    complexity: { time: 'O(N) packing', space: 'O(N)' },
    trap: 'The names `args` and `kwargs` are conventions; the unpacking power comes from the single asterisk `*` and double asterisk `**`.',
  },
];
