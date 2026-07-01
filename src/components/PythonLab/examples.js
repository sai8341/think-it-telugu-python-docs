/**
 * Pre-loaded Python code examples mapped to each module.
 * Students can select from a dropdown to load example code instantly.
 */

const examples = [
  {
    label: 'Module 1 - Hello World',
    module: 'Module 1',
    code: `# Module 1: Your First Python Program
# Try clicking "Run" to see the output!

print("Hello, World!")
print("Welcome to Python! 🐍")
print("You are learning to code - let's go!")
`,
  },
  {
    label: 'Module 2 - Variables & Data Types',
    module: 'Module 2',
    code: `# Module 2: Variables & Data Types

name = "Ravi"
age = 20
height = 5.8
is_student = True

print("Name:", name)
print("Age:", age)
print("Height:", height)
print("Is Student:", is_student)

# Check the type of each variable
print("\\nType of name:", type(name))
print("Type of age:", type(age))
print("Type of height:", type(height))
print("Type of is_student:", type(is_student))
`,
  },
  {
    label: 'Module 3 - Input & Output',
    module: 'Module 3',
    code: `# Module 3: Input & Output
# Note: input() works in Python Lab!

name = "Student"
age = 20

print(f"Hello {name}, you are {age} years old!")
print(f"In 5 years, you will be {age + 5} years old.")

# String formatting examples
price = 99.5
print(f"The price is: ₹{price:.2f}")
`,
  },
  {
    label: 'Module 4 - Operators',
    module: 'Module 4',
    code: `# Module 4: Operators

a = 15
b = 4

# Arithmetic Operators
print("Addition:", a + b)
print("Subtraction:", a - b)
print("Multiplication:", a * b)
print("Division:", a / b)
print("Floor Division:", a // b)
print("Modulus:", a % b)
print("Power:", a ** b)

# Comparison Operators
print("\\nIs a > b?", a > b)
print("Is a == b?", a == b)
print("Is a != b?", a != b)
`,
  },
  {
    label: 'Module 5 - Conditional Statements',
    module: 'Module 5',
    code: `# Module 5: Conditional Statements

marks = 85

if marks >= 90:
    print("Grade: A+ (Outstanding!)")
elif marks >= 80:
    print("Grade: A (Excellent!)")
elif marks >= 70:
    print("Grade: B (Good)")
elif marks >= 60:
    print("Grade: C (Average)")
else:
    print("Grade: F (Need Improvement)")

print(f"Your marks: {marks}")

# Nested if example
age = 20
has_id = True

if age >= 18:
    if has_id:
        print("\\n✅ You can vote!")
    else:
        print("\\n⚠️ Bring your ID to vote.")
else:
    print("\\n❌ You are too young to vote.")
`,
  },
  {
    label: 'Module 6 - Loops',
    module: 'Module 6',
    code: `# Module 6: Loops

# For Loop - print numbers 1 to 5
print("Counting with for loop:")
for i in range(1, 6):
    print(f"  Count: {i}")

# While Loop - countdown
print("\\nCountdown with while loop:")
count = 5
while count > 0:
    print(f"  {count}...")
    count -= 1
print("  🚀 Launch!")

# Loop with break and continue
print("\\nEven numbers from 1 to 10:")
for num in range(1, 11):
    if num % 2 != 0:
        continue
    print(f"  {num}", end=" ")
print()
`,
  },
  {
    label: 'Module 7 - Strings',
    module: 'Module 7',
    code: `# Module 7: Strings

message = "Hello, Python Learner!"

print("Original:", message)
print("Uppercase:", message.upper())
print("Lowercase:", message.lower())
print("Length:", len(message))
print("First char:", message[0])
print("Last char:", message[-1])
print("Slice [0:5]:", message[0:5])
print("Replace:", message.replace("Learner", "Developer"))

# String methods
email = "  student@example.com  "
print(f"\\nStripped: '{email.strip()}'")
print("Starts with space:", email.startswith(" "))

# f-strings
name = "Ravi"
score = 95
print(f"\\n{name} scored {score}% in Python!")
`,
  },
  {
    label: 'Module 8 - Lists',
    module: 'Module 8',
    code: `# Module 8: Lists

fruits = ["Apple", "Banana", "Cherry", "Mango", "Orange"]

print("All fruits:", fruits)
print("First fruit:", fruits[0])
print("Last fruit:", fruits[-1])

# List operations
fruits.append("Grapes")
print("After append:", fruits)

fruits.remove("Banana")
print("After remove:", fruits)

fruits.sort()
print("Sorted:", fruits)

print("Total fruits:", len(fruits))

# List comprehension
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
squares = [n**2 for n in numbers]
evens = [n for n in numbers if n % 2 == 0]

print("\\nNumbers:", numbers)
print("Squares:", squares)
print("Evens:", evens)
`,
  },
  {
    label: '🧪 Free Playground',
    module: 'Custom',
    code: `# 🧪 Free Playground
# Write any Python code here and click Run!

# Try something fun:
for i in range(5):
    print("⭐" * (i + 1))

print("\\nHappy Coding! 🎉")
`,
  },
];

export default examples;
