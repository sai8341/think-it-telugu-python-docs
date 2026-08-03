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
    1, "Python", "Match-Case", "python,conditionals,match-case,basics", "SINGLECORRECT",
    "In which Python version was the 'match-case' statement introduced?",
    "Python 3.10", "Python 3.6", "Python 2.7", "Python 3.0",
    "", "", "", "", "", "",
    "1", "'match-case' structural pattern matching was introduced in Python 3.10.",
    "1.00", "0.00", "Easy"
  ],
  [
    2, "Python", "Match-Case", "python,conditionals,match-case,purpose", "SINGLECORRECT",
    "What is the main purpose of using 'match-case' in Python?",
    "To write cleaner and more readable code instead of long if-elif-else chains", "To create loops in Python", "To handle database errors", "To speed up math calculations",
    "", "", "", "", "", "",
    "1", "'match-case' replaces repetitive if-elif-else chains when comparing a variable against fixed values.",
    "1.00", "0.00", "Easy"
  ],
  [
    3, "Python", "Match-Case", "python,conditionals,match-case,wildcard", "SINGLECORRECT",
    "What does the underscore wildcard ('case _:') do in a match-case statement?",
    "It acts as a fallback default block like 'else'", "It causes an error", "It skips the entire match block", "It repeats the match check",
    "", "", "", "", "", "",
    "1", "'case _:' is the wildcard pattern that matches anything if no prior case matched.",
    "1.00", "0.00", "Easy"
  ],
  [
    4, "Python", "Match-Case", "python,conditionals,match-case,multiple", "SINGLECORRECT",
    "Which symbol is used to match multiple values in a single case (OR condition)?",
    "Pipe symbol (|)", "Ampersand (&)", "Plus (+)", "Slash (/)",
    "", "", "", "", "", "",
    "1", "The pipe symbol (|) allows matching multiple values in a single case like 'case 'B' | 'C':'.",
    "1.00", "0.00", "Easy"
  ],
  [
    5, "Python", "Match-Case", "python,conditionals,match-case,output", "SINGLECORRECT",
    "What will be printed?\nrole = 'admin'\nmatch role:\n    case 'admin':\n        print('Full Access')\n    case 'viewer':\n        print('Read Only')\n    case _:\n        print('No Access')",
    "Full Access", "Read Only", "No Access", "SyntaxError",
    "", "", "", "", "", "",
    "1", "role is 'admin', so 'Full Access' is printed.",
    "1.00", "0.00", "Easy"
  ],
  [
    6, "Python", "Match-Case", "python,conditionals,match-case,output", "SINGLECORRECT",
    "What will be printed?\ngrade = 'B'\nmatch grade:\n    case 'A':\n        print('Top')\n    case 'B' | 'C':\n        print('Good')\n    case _:\n        print('Fail')",
    "Good", "Top", "Fail", "SyntaxError",
    "", "", "", "", "", "",
    "1", "grade 'B' matches 'case 'B' | 'C':', so 'Good' is printed.",
    "1.00", "0.00", "Easy"
  ],
  [
    7, "Python", "Match-Case", "python,conditionals,match-case,output", "SINGLECORRECT",
    "What happens if none of the cases match and there is NO 'case _:' block?",
    "Python does nothing and moves to the next line without throwing an error", "Python throws an error", "Python crashes", "Python restarts",
    "", "", "", "", "", "",
    "1", "If no case matches and there is no wildcard 'case _:', Python simply exits the match statement cleanly.",
    "1.00", "0.00", "Easy"
  ],
  [
    8, "Python", "Match-Case", "python,conditionals,match-case,ternary", "SINGLECORRECT",
    "What is the correct syntax for a single-line ternary operator in Python?",
    "val_if_true if condition else val_if_false", "if condition then val_if_true else val_if_false", "condition ? val_if_true : val_if_false", "val_if_true else condition if val_if_false",
    "", "", "", "", "", "",
    "1", "Python's inline if-else syntax is: value_if_true if condition else value_if_false.",
    "1.00", "0.00", "Easy"
  ],
  [
    9, "Python", "Match-Case", "python,conditionals,match-case,output", "SINGLECORRECT",
    "What will be printed?\nmarks = 45\nresult = 'Pass' if marks >= 35 else 'Fail'\nprint(result)",
    "Pass", "Fail", "45", "SyntaxError",
    "", "", "", "", "", "",
    "1", "45 >= 35 is True, so 'Pass' is assigned to result.",
    "1.00", "0.00", "Easy"
  ],
  [
    10, "Python", "Match-Case", "python,conditionals,match-case,output", "SINGLECORRECT",
    "What will be printed?\nday = 3\nmatch day:\n    case 1:\n        print('Mon')\n    case 2:\n        print('Tue')\n    case 3:\n        print('Wed')\n    case _:\n        print('Other')",
    "Wed", "Mon", "Tue", "Other",
    "", "", "", "", "", "",
    "1", "day is 3, so 'Wed' is printed.",
    "1.00", "0.00", "Easy"
  ],
  [
    11, "Python", "Match-Case", "python,conditionals,match-case,output", "SINGLECORRECT",
    "What will be printed?\nday = 7\nmatch day:\n    case 1:\n        print('Mon')\n    case 2:\n        print('Tue')\n    case _:\n        print('Weekend')",
    "Weekend", "Mon", "Tue", "7",
    "", "", "", "", "", "",
    "1", "day 7 does not match 1 or 2, so the wildcard 'case _:' prints 'Weekend'.",
    "1.00", "0.00", "Easy"
  ],
  [
    12, "Python", "Match-Case", "python,conditionals,match-case,comparison", "SINGLECORRECT",
    "Which keyword in languages like Java or C++ is similar to Python's 'match-case'?",
    "switch-case", "select-case", "choose-case", "branch-case",
    "", "", "", "", "", "",
    "1", "Java and C++ call this feature a switch-case statement.",
    "1.00", "0.00", "Easy"
  ],
  [
    13, "Python", "Match-Case", "python,conditionals,match-case,syntax", "SINGLECORRECT",
    "What symbol must end every 'case' line in a match-case statement?",
    "Colon (:)", "Semicolon (;)", "Comma (,)", "Dot (.)",
    "", "", "", "", "", "",
    "1", "Every case header in Python must end with a colon (:).",
    "1.00", "0.00", "Easy"
  ],
  [
    14, "Python", "Match-Case", "python,conditionals,match-case,output", "SINGLECORRECT",
    "What will print?\ncode = 404\nmatch code:\n    case 200:\n        print('OK')\n    case 404:\n        print('Not Found')\n    case _:\n        print('Error')",
    "Not Found", "OK", "Error", "404",
    "", "", "", "", "", "",
    "1", "code is 404, so 'Not Found' is printed.",
    "1.00", "0.00", "Easy"
  ],
  [
    15, "Python", "Match-Case", "python,conditionals,match-case,types", "SINGLECORRECT",
    "Can you match string values using 'match-case' in Python?",
    "Yes, strings, numbers, and other data types can all be matched", "No, only numbers are allowed", "No, only booleans are allowed", "Only floating-point numbers",
    "", "", "", "", "", "",
    "1", "Python's match-case supports matching strings, integers, lists, and more.",
    "1.00", "0.00", "Easy"
  ],
  [
    16, "Python", "Match-Case", "python,conditionals,match-case,output", "SINGLECORRECT",
    "What will print?\nage = 15\nstatus = 'Adult' if age >= 18 else 'Minor'\nprint(status)",
    "Minor", "Adult", "15", "None",
    "", "", "", "", "", "",
    "1", "15 >= 18 is False, so the ternary operator assigns 'Minor' to status.",
    "1.00", "0.00", "Easy"
  ],
  [
    17, "Python", "Match-Case", "python,conditionals,match-case,order", "SINGLECORRECT",
    "Where should the wildcard 'case _:' block be placed in a match-case statement?",
    "At the very end of all case blocks", "At the very top before case 1", "Inside a separate if block", "Wildcards are not allowed",
    "", "", "", "", "", "",
    "1", "The wildcard 'case _:' must be placed at the bottom as the final fallback.",
    "1.00", "0.00", "Medium"
  ],
  [
    18, "Python", "Match-Case", "python,conditionals,match-case,output", "SINGLECORRECT",
    "What will print?\ncmd = 'start'\nmatch cmd:\n    case 'start' | 'run':\n        print('System Running')\n    case 'stop':\n        print('System Halted')",
    "System Running", "System Halted", "start", "None",
    "", "", "", "", "", "",
    "1", "cmd is 'start', matching 'start' | 'run', so 'System Running' is printed.",
    "1.00", "0.00", "Easy"
  ],
  [
    19, "Python", "Match-Case", "python,conditionals,match-case,output", "SINGLECORRECT",
    "What will print?\nx = 5\nmatch x:\n    case 1:\n        print('One')\n    case 2:\n        print('Two')",
    "Nothing (No output)", "One", "Two", "SyntaxError",
    "", "", "", "", "", "",
    "1", "x is 5 which matches neither 1 nor 2. Without a wildcard, nothing is printed.",
    "1.00", "0.00", "Easy"
  ],
  [
    20, "Python", "Match-Case", "python,conditionals,match-case,recap", "SINGLECORRECT",
    "Which keyword combination is used in modern Python for structural pattern matching?",
    "match and case", "switch and case", "choose and match", "select and option",
    "", "", "", "", "", "",
    "1", "Python 3.10 introduced the 'match' and 'case' keywords for pattern matching.",
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

const excelPath = path.join(desktopDir, 'Match_Case_Quiz_Graphy.xlsx');
const csvPath = path.join(desktopDir, 'Match_Case_Quiz_Graphy.csv');

XLSX.writeFile(wb, excelPath);
const csvContent = XLSX.utils.sheet_to_csv(ws);
fs.writeFileSync(csvPath, csvContent);

console.log("Excel saved to:", excelPath);
console.log("CSV saved to:", csvPath);
