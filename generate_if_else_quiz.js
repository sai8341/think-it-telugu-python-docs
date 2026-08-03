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
    1, "Python", "If-Else Conditions", "python,conditionals,if-else,basics", "SINGLECORRECT",
    "What does a condition in Python evaluate to?",
    "Either True or False", "An integer value", "A string value", "None",
    "", "", "", "", "", "",
    "1", "A condition in Python is a logical expression that evaluates to a Boolean value (either True or False).",
    "1.00", "0.00", "Easy"
  ],
  [
    2, "Python", "If-Else Conditions", "python,conditionals,syntax", "SINGLECORRECT",
    "Which character is mandatory at the end of an 'if' or 'else' statement in Python?",
    "Colon (:)", "Semicolon (;)", "Comma (,)", "Period (.)",
    "", "", "", "", "", "",
    "1", "The colon (:) is mandatory at the end of the line in 'if' and 'else' statements to signal the start of a block.",
    "1.00", "0.00", "Easy"
  ],
  [
    3, "Python", "If-Else Conditions", "python,conditionals,indentation", "SINGLECORRECT",
    "How does Python identify lines of code that belong inside an 'if' block?",
    "By Indentation (spaces)", "By curly braces {}", "By keywords 'begin' and 'end'", "By square brackets []",
    "", "", "", "", "", "",
    "1", "Python uses indentation (4 spaces by default) to define blocks of code.",
    "1.00", "0.00", "Easy"
  ],
  [
    4, "Python", "If-Else Conditions", "python,conditionals,indentation", "SINGLECORRECT",
    "What error occurs if you forget to indent code inside an 'if' block?",
    "IndentationError", "SyntaxError", "NameError", "TypeError",
    "", "", "", "", "", "",
    "1", "Forgetting to indent code after an 'if' line raises an IndentationError: expected an indented block.",
    "1.00", "0.00", "Easy"
  ],
  [
    5, "Python", "If-Else Conditions", "python,conditionals,syntax", "SINGLECORRECT",
    "What error occurs if you forget the colon (:) at the end of an 'if' condition?",
    "SyntaxError", "IndentationError", "ValueError", "KeyError",
    "", "", "", "", "", "",
    "1", "Omitting the colon (:) raises a SyntaxError: expected ':'.",
    "1.00", "0.00", "Easy"
  ],
  [
    6, "Python", "If-Else Conditions", "python,conditionals,execution", "SINGLECORRECT",
    "What happens when the condition in a simple 'if' statement evaluates to False?",
    "Python skips the indented block inside the 'if'", "Python throws a RuntimeError", "Python terminates the entire program", "Python automatically runs the code twice",
    "", "", "", "", "", "",
    "1", "If the condition is False, Python completely skips execution of the indented 'if' block.",
    "1.00", "0.00", "Easy"
  ],
  [
    7, "Python", "If-Else Conditions", "python,conditionals,if-else", "SINGLECORRECT",
    "When does the 'else' block in an 'if-else' statement execute?",
    "When the 'if' condition evaluates to False", "When the 'if' condition evaluates to True", "Always after the 'if' block runs", "Never",
    "", "", "", "", "", "",
    "1", "The 'else' block serves as a fallback and executes only when the 'if' condition is False.",
    "1.00", "0.00", "Easy"
  ],
  [
    8, "Python", "If-Else Conditions", "python,conditionals,output", "SINGLECORRECT",
    "What will be the output of: \nmarks = 75\nif marks >= 35:\n    print('Pass')\nelse:\n    print('Fail')",
    "Pass", "Fail", "Pass Fail", "SyntaxError",
    "", "", "", "", "", "",
    "1", "Since 75 >= 35 is True, the 'if' block runs and outputs 'Pass'.",
    "1.00", "0.00", "Easy"
  ],
  [
    9, "Python", "If-Else Conditions", "python,conditionals,output", "SINGLECORRECT",
    "What will be the output of: \nage = 15\nif age >= 18:\n    print('Eligible')\nelse:\n    print('Not Eligible')",
    "Not Eligible", "Eligible", "Eligible Not Eligible", "None",
    "", "", "", "", "", "",
    "1", "Since 15 >= 18 is False, execution moves to the 'else' block which prints 'Not Eligible'.",
    "1.00", "0.00", "Easy"
  ],
  [
    10, "Python", "If-Else Conditions", "python,conditionals,indentation", "SINGLECORRECT",
    "What is the standard recommended number of spaces for indentation in Python (PEP 8)?",
    "4 spaces", "2 spaces", "8 spaces", "1 tab space only",
    "", "", "", "", "", "",
    "1", "PEP 8 style guide recommends 4 spaces per indentation level.",
    "1.00", "0.00", "Easy"
  ],
  [
    11, "Python", "If-Else Conditions", "python,conditionals,comparison", "SINGLECORRECT",
    "Which operator is used to test equality in an 'if' condition?",
    "==", "=", "!=", "===",
    "", "", "", "", "", "",
    "1", "The double equals sign (==) is the equality operator used in conditions.",
    "1.00", "0.00", "Easy"
  ],
  [
    12, "Python", "If-Else Conditions", "python,conditionals,comparison", "SINGLECORRECT",
    "What is the result of the expression (10 % 2 == 0)?",
    "True", "False", "0", "10",
    "", "", "", "", "", "",
    "1", "10 % 2 is 0. 0 == 0 evaluates to True.",
    "1.00", "0.00", "Medium"
  ],
  [
    13, "Python", "If-Else Conditions", "python,conditionals,even-odd", "SINGLECORRECT",
    "Which condition correctly checks if an integer 'num' is even?",
    "num % 2 == 0", "num / 2 == 0", "num // 2 == 0", "num % 2 != 0",
    "", "", "", "", "", "",
    "1", "An even number leaves a remainder of 0 when divided by 2 (num % 2 == 0).",
    "1.00", "0.00", "Medium"
  ],
  [
    14, "Python", "If-Else Conditions", "python,conditionals,output", "SINGLECORRECT",
    "What will be printed?\nnum = 7\nif num % 2 == 0:\n    print('Even')\nelse:\n    print('Odd')",
    "Odd", "Even", "7", "SyntaxError",
    "", "", "", "", "", "",
    "1", "7 % 2 is 1 (not 0), so the condition is False and the 'else' block prints 'Odd'.",
    "1.00", "0.00", "Easy"
  ],
  [
    15, "Python", "If-Else Conditions", "python,conditionals,scope", "SINGLECORRECT",
    "What happens to a unindented print statement placed immediately after an 'if' block?",
    "It always executes regardless of the 'if' condition", "It only executes if the 'if' condition is True", "It causes a SyntaxError", "It only executes if the 'if' condition is False",
    "", "", "", "", "", "",
    "1", "Unindented code is outside the 'if' block and executes sequentially regardless of the condition.",
    "1.00", "0.00", "Medium"
  ],
  [
    16, "Python", "If-Else Conditions", "python,conditionals,boolean", "SINGLECORRECT",
    "What will be the output of:\nis_logged_in = False\nif is_logged_in:\n    print('Welcome')\nelse:\n    print('Please Login')",
    "Please Login", "Welcome", "False", "None",
    "", "", "", "", "", "",
    "1", "is_logged_in is False, so the 'else' branch runs and prints 'Please Login'.",
    "1.00", "0.00", "Easy"
  ],
  [
    17, "Python", "If-Else Conditions", "python,conditionals,comparison", "SINGLECORRECT",
    "What will be the output of:\nx = 10\ny = 20\nif x > y:\n    print('X is larger')\nelse:\n    print('Y is larger')",
    "Y is larger", "X is larger", "10", "20",
    "", "", "", "", "", "",
    "1", "10 > 20 is False, so the 'else' block prints 'Y is larger'.",
    "1.00", "0.00", "Easy"
  ],
  [
    18, "Python", "If-Else Conditions", "python,conditionals,logical", "SINGLECORRECT",
    "What will be printed?\na = 5\nif a > 0 and a < 10:\n    print('Valid Range')\nelse:\n    print('Out of Range')",
    "Valid Range", "Out of Range", "True", "False",
    "", "", "", "", "", "",
    "1", "Both 5 > 0 (True) and 5 < 10 (True) are True, so the 'and' expression evaluates to True and prints 'Valid Range'.",
    "1.00", "0.00", "Medium"
  ],
  [
    19, "Python", "If-Else Conditions", "python,conditionals,input", "SINGLECORRECT",
    "Why must you wrap input() in int() when comparing a user's entered number in an 'if' condition?",
    "Because input() always returns a string, and strings cannot be numerically compared directly", "Because input() only accepts float numbers", "Because Python requires all variables to be integers", "Because input() causes a syntax error without int()",
    "", "", "", "", "", "",
    "1", "input() returns a string (str). To compare numbers with < or >=, we must convert string to integer using int().",
    "1.00", "0.00", "Medium"
  ],
  [
    20, "Python", "If-Else Conditions", "python,conditionals,mistakes", "SINGLECORRECT",
    "Which of the following is a VALID if-else statement in Python?",
    "if x > 5:\n    print('Yes')\nelse:\n    print('No')", "if x > 5\n    print('Yes')\nelse\n    print('No')", "if (x > 5) {\n    print('Yes')\n}", "if x > 5:\nprint('Yes')",
    "", "", "", "", "", "",
    "1", "Option 1 has both colons (:) and proper 4-space indentation.",
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

const excelPath = path.join(desktopDir, 'If_Else_Conditions_Quiz_Graphy.xlsx');
const csvPath = path.join(desktopDir, 'If_Else_Conditions_Quiz_Graphy.csv');

XLSX.writeFile(wb, excelPath);
const csvContent = XLSX.utils.sheet_to_csv(ws);
fs.writeFileSync(csvPath, csvContent);

console.log("Excel saved to:", excelPath);
console.log("CSV saved to:", csvPath);
