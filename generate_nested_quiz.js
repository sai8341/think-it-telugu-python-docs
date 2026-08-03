const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const headers = [
  "S No.", "SUBJECT", "TOPIC", "TAGS", "QUESTION TYPE", "QUESTION TEXT",
  "OPTION1", "OPTION2", "OPTION3", "OPTION4", "OPTION5", "OPTION6",
  "OPTION7", "OPTION8", "OPTION9", "OPTION10", "RIGHT ANSWER", "EXPLANATION",
  "CORRECT MARKS", "NEGATIVE MARKS", "DIFFICULTY"
];

const rows = [
  [
    1, "Python", "Nested Conditions", "python,conditionals,nested,basics", "SINGLECORRECT",
    "What is a nested condition in Python?",
    "An 'if' or 'if-else' statement written inside another 'if' or 'else' block", "A condition written inside a print statement", "A loop written inside a function", "An error in Python syntax",
    "", "", "", "", "", "",
    "1", "Putting an 'if' or 'if-else' block inside another 'if' or 'else' block is called a nested condition.",
    "1.00", "0.00", "Easy"
  ],
  [
    2, "Python", "Nested Conditions", "python,conditionals,nested,indentation", "SINGLECORRECT",
    "How many spaces of indentation are used for code inside a nested 'if' block?",
    "8 spaces (4 spaces for outer + 4 spaces for inner)", "4 spaces only", "2 spaces only", "0 spaces",
    "", "", "", "", "", "",
    "1", "Outer block uses 4 spaces, and inner nested block uses an additional 4 spaces (total 8 spaces).",
    "1.00", "0.00", "Easy"
  ],
  [
    3, "Python", "Nested Conditions", "python,conditionals,nested,execution", "SINGLECORRECT",
    "When does an inner nested 'if' block execute?",
    "Only if the outer 'if' condition is True", "Only if the outer 'if' condition is False", "Always, regardless of the outer condition", "Before the outer condition is checked",
    "", "", "", "", "", "",
    "1", "An inner nested 'if' block runs only when its outer 'if' condition evaluates to True.",
    "1.00", "0.00", "Easy"
  ],
  [
    4, "Python", "Nested Conditions", "python,conditionals,nested,output", "SINGLECORRECT",
    "What will be printed?\nage = 20\nweight = 55\nif age >= 18:\n    if weight >= 50:\n        print('Eligible')\n    else:\n        print('Weight Low')\nelse:\n    print('Underage')",
    "Eligible", "Weight Low", "Underage", "None",
    "", "", "", "", "", "",
    "1", "age >= 18 is True and weight >= 50 is True, so Python prints 'Eligible'.",
    "1.00", "0.00", "Easy"
  ],
  [
    5, "Python", "Nested Conditions", "python,conditionals,nested,output", "SINGLECORRECT",
    "What will be printed?\nage = 20\nweight = 45\nif age >= 18:\n    if weight >= 50:\n        print('Eligible')\n    else:\n        print('Weight Low')\nelse:\n    print('Underage')",
    "Weight Low", "Eligible", "Underage", "SyntaxError",
    "", "", "", "", "", "",
    "1", "age >= 18 is True, but weight >= 50 is False, so the inner 'else' prints 'Weight Low'.",
    "1.00", "0.00", "Easy"
  ],
  [
    6, "Python", "Nested Conditions", "python,conditionals,nested,output", "SINGLECORRECT",
    "What will be printed?\nage = 16\nweight = 60\nif age >= 18:\n    if weight >= 50:\n        print('Eligible')\n    else:\n        print('Weight Low')\nelse:\n    print('Underage')",
    "Underage", "Eligible", "Weight Low", "None",
    "", "", "", "", "", "",
    "1", "age >= 18 is False, so Python skips the entire outer 'if' block and runs the outer 'else' block, printing 'Underage'.",
    "1.00", "0.00", "Easy"
  ],
  [
    7, "Python", "Nested Conditions", "python,conditionals,nested,else", "SINGLECORRECT",
    "Can you place a nested 'if' statement inside an 'else' block?",
    "Yes, nested conditions can be placed in both 'if' and 'else' blocks", "No, nested conditions are only allowed in 'if' blocks", "No, it causes a SyntaxError", "Only when comparing strings",
    "", "", "", "", "", "",
    "1", "Python allows nested conditions inside 'if', 'elif', or 'else' blocks.",
    "1.00", "0.00", "Easy"
  ],
  [
    8, "Python", "Nested Conditions", "python,conditionals,nested,output", "SINGLECORRECT",
    "What will print?\nis_member = True\nhas_coupon = False\nif is_member:\n    if has_coupon:\n        print('30% Off')\n    else:\n        print('10% Off')\nelse:\n    print('Full Price')",
    "10% Off", "30% Off", "Full Price", "No Output",
    "", "", "", "", "", "",
    "1", "is_member is True, but has_coupon is False, so inner 'else' prints '10% Off'.",
    "1.00", "0.00", "Easy"
  ],
  [
    9, "Python", "Nested Conditions", "python,conditionals,nested,output", "SINGLECORRECT",
    "What will print?\nx = 10\ny = 20\nif x > 5:\n    if y > 15:\n        print('Both Passed')\n    else:\n        print('Only X Passed')",
    "Both Passed", "Only X Passed", "10", "20",
    "", "", "", "", "", "",
    "1", "Both 10 > 5 and 20 > 15 are True, so 'Both Passed' is printed.",
    "1.00", "0.00", "Easy"
  ],
  [
    10, "Python", "Nested Conditions", "python,conditionals,nested,indentation", "SINGLECORRECT",
    "What error occurs if an inner 'if' statement is not indented under the outer 'if' block?",
    "IndentationError or unexpected logic behavior", "TypeError", "ZeroDivisionError", "KeyError",
    "", "", "", "", "", "",
    "1", "Proper indentation is required to specify which statements belong inside the nested block.",
    "1.00", "0.00", "Easy"
  ],
  [
    11, "Python", "Nested Conditions", "python,conditionals,nested,best-practices", "SINGLECORRECT",
    "What is a recommended practice if your code has too many deeply nested conditions?",
    "Simplify the code using logical operators like 'and' or 'or'", "Add more spaces to every line", "Convert all numbers to strings", "Remove all 'else' blocks",
    "", "", "", "", "", "",
    "1", "Deep nesting makes code hard to read; combining rules with 'and' / 'or' simplifies the logic.",
    "1.00", "0.00", "Medium"
  ],
  [
    12, "Python", "Nested Conditions", "python,conditionals,nested,logic", "SINGLECORRECT",
    "Which expression is equivalent to: if A:\n    if B:\n        print('Yes')",
    "if A and B:\n    print('Yes')", "if A or B:\n    print('Yes')", "if A not B:\n    print('Yes')", "if A == B:\n    print('Yes')",
    "", "", "", "", "", "",
    "1", "A nested if checking B inside if A is logically identical to 'if A and B:'.",
    "1.00", "0.00", "Medium"
  ],
  [
    13, "Python", "Nested Conditions", "python,conditionals,nested,output", "SINGLECORRECT",
    "What will print?\na = 5\nif a > 0:\n    if a < 10:\n        print('Single Digit Positive')\n    else:\n        print('Multi Digit Positive')",
    "Single Digit Positive", "Multi Digit Positive", "5", "None",
    "", "", "", "", "", "",
    "1", "5 > 0 is True and 5 < 10 is True, so 'Single Digit Positive' is printed.",
    "1.00", "0.00", "Easy"
  ],
  [
    14, "Python", "Nested Conditions", "python,conditionals,nested,output", "SINGLECORRECT",
    "What will print?\na = 15\nif a > 0:\n    if a < 10:\n        print('Single Digit Positive')\n    else:\n        print('Multi Digit Positive')",
    "Multi Digit Positive", "Single Digit Positive", "15", "None",
    "", "", "", "", "", "",
    "1", "15 > 0 is True, but 15 < 10 is False, so inner 'else' prints 'Multi Digit Positive'.",
    "1.00", "0.00", "Easy"
  ],
  [
    15, "Python", "Nested Conditions", "python,conditionals,nested,output", "SINGLECORRECT",
    "What will print?\npassword = '123'\nis_admin = True\nif password == '123':\n    if is_admin:\n        print('Admin Dashboard')\n    else:\n        print('User Dashboard')\nelse:\n    print('Wrong Password')",
    "Admin Dashboard", "User Dashboard", "Wrong Password", "SyntaxError",
    "", "", "", "", "", "",
    "1", "Password is correct and is_admin is True, so 'Admin Dashboard' is printed.",
    "1.00", "0.00", "Easy"
  ],
  [
    16, "Python", "Nested Conditions", "python,conditionals,nested,output", "SINGLECORRECT",
    "What will print if password is '999'?\npassword = '999'\nis_admin = True\nif password == '123':\n    if is_admin:\n        print('Admin Dashboard')\n    else:\n        print('User Dashboard')\nelse:\n    print('Wrong Password')",
    "Wrong Password", "Admin Dashboard", "User Dashboard", "None",
    "", "", "", "", "", "",
    "1", "password == '123' is False, so execution goes directly to the outer 'else' block.",
    "1.00", "0.00", "Easy"
  ],
  [
    17, "Python", "Nested Conditions", "python,conditionals,nested,syntax", "SINGLECORRECT",
    "How many levels of nesting does Python support?",
    "Unlimited levels (though deeper nesting is harder to read)", "Maximum 2 levels", "Maximum 5 levels", "Exactly 1 level",
    "", "", "", "", "", "",
    "1", "Python allows nesting as many levels deep as required, though keeping it shallow is better practice.",
    "1.00", "0.00", "Easy"
  ],
  [
    18, "Python", "Nested Conditions", "python,conditionals,nested,output", "SINGLECORRECT",
    "What will print?\nx = 4\nif x % 2 == 0:\n    if x > 0:\n        print('Positive Even')\n    else:\n        print('Non-positive Even')",
    "Positive Even", "Non-positive Even", "4", "SyntaxError",
    "", "", "", "", "", "",
    "1", "4 % 2 == 0 is True and 4 > 0 is True, so 'Positive Even' is printed.",
    "1.00", "0.00", "Easy"
  ],
  [
    19, "Python", "Nested Conditions", "python,conditionals,nested,output", "SINGLECORRECT",
    "What will print?\nx = -4\nif x % 2 == 0:\n    if x > 0:\n        print('Positive Even')\n    else:\n        print('Non-positive Even')",
    "Non-positive Even", "Positive Even", "-4", "None",
    "", "", "", "", "", "",
    "1", "-4 % 2 == 0 is True, but -4 > 0 is False, so inner 'else' prints 'Non-positive Even'.",
    "1.00", "0.00", "Medium"
  ],
  [
    20, "Python", "Nested Conditions", "python,conditionals,nested,recap", "SINGLECORRECT",
    "Which keyword pair is used inside an outer block to form a nested decision?",
    "if / else inside an existing block", "def / return", "import / from", "for / while",
    "", "", "", "", "", "",
    "1", "Nested conditions are created by putting an 'if' or 'if-else' block inside an existing block.",
    "1.00", "0.00", "Easy"
  ]
];

const desktopDir = 'C:/Users/saikumar/Desktop/Graphy_Python_Quizzes';
if (!fs.existsSync(desktopDir)) {
  fs.mkdirSync(desktopDir, { recursive: true });
}

const wb = XLSX.utils.book_new();
const wsData = [headers, ...rows];
const ws = XLSX.utils.aoa_to_sheet(wsData);
XLSX.utils.book_append_sheet(wb, ws, "Sample Questions");

const excelPath = path.join(desktopDir, 'Nested_Conditions_Quiz_Graphy.xlsx');
const csvPath = path.join(desktopDir, 'Nested_Conditions_Quiz_Graphy.csv');

XLSX.writeFile(wb, excelPath);
const csvContent = XLSX.utils.sheet_to_csv(ws);
fs.writeFileSync(csvPath, csvContent);

console.log("Excel saved to:", excelPath);
console.log("CSV saved to:", csvPath);
