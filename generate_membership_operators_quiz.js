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
    1, "Python", "Membership Operators", "python,operators,membership,in", "SINGLECORRECT",
    "Which keyword is used to check if a substring exists inside a string?",
    "has", "in", "contains", "exists",
    "", "", "", "", "", "",
    "2", "The 'in' operator checks if a value or substring exists inside a sequence in Python.",
    "1.00", "0.00", "Easy"
  ],
  [
    2, "Python", "Membership Operators", "python,operators,membership,notin", "SINGLECORRECT",
    "Which keyword is used to check if a value is NOT present in a sequence?",
    "not in", "is not", "does not contain", "absent",
    "", "", "", "", "", "",
    "1", "The 'not in' operator returns True if the specified item is not found inside the sequence.",
    "1.00", "0.00", "Easy"
  ],
  [
    3, "Python", "Membership Operators", "python,operators,membership", "SINGLECORRECT",
    "What will be the output of: print('Py' in 'Python')?",
    "True", "False", "None", "TypeError",
    "", "", "", "", "", "",
    "1", "'Py' is present at the beginning of 'Python', so 'in' returns True.",
    "1.00", "0.00", "Easy"
  ],
  [
    4, "Python", "Membership Operators", "python,operators,membership", "SINGLECORRECT",
    "What will be the output of: print('java' in 'Python')?",
    "True", "False", "None", "SyntaxError",
    "", "", "", "", "", "",
    "2", "'java' is not inside 'Python', so 'in' returns False.",
    "1.00", "0.00", "Easy"
  ],
  [
    5, "Python", "Membership Operators", "python,operators,membership,casesensitive", "SINGLECORRECT",
    "What will be the output of: print('python' in 'Python')?",
    "True", "False", "None", "TypeError",
    "", "", "", "", "", "",
    "2", "Python is strictly case-sensitive. Small 'p' in 'python' does not match capital 'P' in 'Python'.",
    "1.00", "0.00", "Medium"
  ],
  [
    6, "Python", "Membership Operators", "python,operators,membership,notin", "SINGLECORRECT",
    "What will be the output of: print('Java' not in 'Python Programming')?",
    "True", "False", "None", "SyntaxError",
    "", "", "", "", "", "",
    "1", "'Java' is indeed absent from 'Python Programming', so 'not in' returns True.",
    "1.00", "0.00", "Easy"
  ],
  [
    7, "Python", "Membership Operators", "python,operators,membership,notin", "SINGLECORRECT",
    "What will be the output of: print('Code' not in 'Learn Code Repeat')?",
    "True", "False", "None", "TypeError",
    "", "", "", "", "", "",
    "2", "'Code' is present in the text, so 'not in' returns False.",
    "1.00", "0.00", "Easy"
  ],
  [
    8, "Python", "Membership Operators", "python,operators,membership,singlechar", "SINGLECORRECT",
    "What will be the output of: print('a' in 'apple')?",
    "True", "False", "1", "None",
    "", "", "", "", "", "",
    "1", "The single character 'a' is inside 'apple', so 'in' returns True.",
    "1.00", "0.00", "Easy"
  ],
  [
    9, "Python", "Membership Operators", "python,operators,membership,empty", "SINGLECORRECT",
    "What will be the output of: print('' in 'Python')?",
    "True", "False", "TypeError", "ValueError",
    "", "", "", "", "", "",
    "1", "An empty string '' is considered a substring of every string in Python, returning True.",
    "1.00", "0.00", "Medium"
  ],
  [
    10, "Python", "Membership Operators", "python,operators,membership,space", "SINGLECORRECT",
    "What will be the output of: print(' ' in 'Hello World')?",
    "True", "False", "None", "SyntaxError",
    "", "", "", "", "", "",
    "1", "The space character ' ' is present between 'Hello' and 'World', returning True.",
    "1.00", "0.00", "Easy"
  ],
  [
    11, "Python", "Membership Operators", "python,operators,membership,list", "SINGLECORRECT",
    "What will be the output of: names = ['Sai', 'Rahul']; print('Sai' in names)?",
    "True", "False", "None", "NameError",
    "", "", "", "", "", "",
    "1", "'Sai' is an element of the list 'names', so 'in' returns True.",
    "1.00", "0.00", "Easy"
  ],
  [
    12, "Python", "Membership Operators", "python,operators,membership,list", "SINGLECORRECT",
    "What will be the output of: names = ['Sai', 'Rahul']; print('John' in names)?",
    "True", "False", "None", "NameError",
    "", "", "", "", "", "",
    "2", "'John' is not in the list 'names', so 'in' returns False.",
    "1.00", "0.00", "Easy"
  ],
  [
    13, "Python", "Membership Operators", "python,operators,membership,typeerror", "SINGLECORRECT",
    "What happens if you run: print(10 in '102030')?",
    "True", "False", "TypeError", "ValueError",
    "", "", "", "", "", "",
    "3", "In Python, the left operand of 'in' for strings must be a string (e.g. '10'), not an integer. This raises a TypeError.",
    "1.00", "0.00", "Hard"
  ],
  [
    14, "Python", "Membership Operators", "python,operators,membership", "SINGLECORRECT",
    "Which of the following expressions evaluates to True?",
    "'x' in 'box'", "'y' in 'box'", "'box' in 'b'", "'O' in 'box'",
    "", "", "", "", "", "",
    "1", "'x' is a character in 'box'. 'O' fails due to capital letter.",
    "1.00", "0.00", "Easy"
  ],
  [
    15, "Python", "Membership Operators", "python,operators,membership", "SINGLECORRECT",
    "What will be the output of: print('@' in 'user@gmail.com')?",
    "True", "False", "None", "SyntaxError",
    "", "", "", "", "", "",
    "1", "The symbol '@' exists inside 'user@gmail.com', returning True.",
    "1.00", "0.00", "Easy"
  ],
  [
    16, "Python", "Membership Operators", "python,operators,membership,bool", "SINGLECORRECT",
    "What is the data type of the result returned by 'in' and 'not in' operators?",
    "Integer", "String", "Boolean", "Float",
    "", "", "", "", "", "",
    "3", "Membership operators always return a Boolean value (either True or False).",
    "1.00", "0.00", "Easy"
  ],
  [
    17, "Python", "Membership Operators", "python,operators,membership,notin", "SINGLECORRECT",
    "What will be the output of: print('admin' not in 'user_dashboard')?",
    "True", "False", "None", "TypeError",
    "", "", "", "", "", "",
    "1", "'admin' is not in 'user_dashboard', so 'not in' evaluates to True.",
    "1.00", "0.00", "Easy"
  ],
  [
    18, "Python", "Membership Operators", "python,operators,membership,variables", "SINGLECORRECT",
    "What will be the output of: word = 'cat'; text = 'caterpillar'; print(word in text)?",
    "True", "False", "None", "NameError",
    "", "", "", "", "", "",
    "1", "The string 'cat' is the starting part of 'caterpillar', so 'word in text' evaluates to True.",
    "1.00", "0.00", "Medium"
  ],
  [
    19, "Python", "Membership Operators", "python,operators,membership,syntax", "SINGLECORRECT",
    "Which of the following is an INVALID membership operator expression in Python?",
    "'a' in 'abc'", "'a' not in 'abc'", "'a' inside 'abc'", "not 'a' in 'abc'",
    "", "", "", "", "", "",
    "3", "'inside' is not a Python keyword. Python uses 'in' and 'not in'.",
    "1.00", "0.00", "Easy"
  ],
  [
    20, "Python", "Membership Operators", "python,operators,membership,not", "SINGLECORRECT",
    "What will be the output of: print(not ('a' in 'apple'))?",
    "True", "False", "None", "TypeError",
    "", "", "", "", "", "",
    "2", "'a' in 'apple' is True. Then 'not True' flips it to False.",
    "1.00", "0.00", "Medium"
  ]
];

const desktopDir = "C:\\Users\\saikumar\\Desktop\\Graphy_Python_Quizzes";

if (!fs.existsSync(desktopDir)) {
  fs.mkdirSync(desktopDir, { recursive: true });
}

// 1. Generate Excel (.xlsx)
const wb = XLSX.utils.book_new();
const wsData = [headers, ...rows];
const ws = XLSX.utils.aoa_to_sheet(wsData);
XLSX.utils.book_append_sheet(wb, ws, "Membership_Operators_Quiz");

const excelPath = path.join(desktopDir, "Membership_Operators_Quiz_Graphy.xlsx");
XLSX.writeFile(wb, excelPath);
console.log(`Graphy Format Excel generated: ${excelPath}`);

// 2. Generate CSV (.csv)
const csvContent = wsData.map(row => 
  row.map(field => {
    const str = String(field);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }).join(",")
).join("\n");

const csvPath = path.join(desktopDir, "Membership_Operators_Quiz_Graphy.csv");
fs.writeFileSync(csvPath, csvContent, 'utf8');
console.log(`Graphy Format CSV generated: ${csvPath}`);
