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
    1, "Python", "Print & Output", "python,print,output", "SINGLECORRECT",
    "Which Python function is used to display output on the screen?",
    "print()", "show()", "display()", "output()",
    "", "", "", "", "", "",
    "1", "The print() function is the standard built-in command used to output text or values to the console.",
    "1.00", "0.00", "Easy"
  ],
  [
    2, "Python", "Print & Output", "python,print,commas", "SINGLECORRECT",
    "What character does Python automatically insert between items when you separate them with commas in print()?",
    "A single space", "A comma", "A new line", "Nothing (no space)",
    "", "", "", "", "", "",
    "1", "When separating multiple items with commas in print(), Python places a single space between them by default.",
    "1.00", "0.00", "Easy"
  ],
  [
    3, "Python", "Print & Output", "python,print,output", "SINGLECORRECT",
    "What will be the output of print(\"User:\", \"Sai\", \"Score:\", 100)?",
    "User: Sai Score: 100", "User:SaiScore:100", "User:, Sai, Score:, 100", "SyntaxError",
    "", "", "", "", "", "",
    "1", "Comma-separated items in print() are printed with spaces in between: 'User: Sai Score: 100'.",
    "1.00", "0.00", "Easy"
  ],
  [
    4, "Python", "Print & Output", "python,print,escape", "SINGLECORRECT",
    "Which escape character is used to move text to a NEW line in Python?",
    "\\n", "\\t", "\\r", "\\l",
    "", "", "", "", "", "",
    "1", "\\n is the new line escape character in Python.",
    "1.00", "0.00", "Easy"
  ],
  [
    5, "Python", "Print & Output", "python,print,escape", "SINGLECORRECT",
    "Which escape character is used to insert a TAB space in Python?",
    "\\t", "\\n", "\\s", "\\b",
    "", "", "", "", "", "",
    "1", "\\t inserts a tab space (usually 4 blank spaces) into the printed text.",
    "1.00", "0.00", "Easy"
  ],
  [
    6, "Python", "Print & Output", "python,print,output", "SINGLECORRECT",
    "What is the output of print(\"First\\nSecond\")?",
    "First Second", "First\\nSecond", "First (on line 1) and Second (on line 2)", "FirstSecond",
    "", "", "", "", "", "",
    "3", "\\n forces 'Second' to print on a new line below 'First'.",
    "1.00", "0.00", "Medium"
  ],
  [
    7, "Python", "Print & Output", "python,print,sep", "SINGLECORRECT",
    "Which parameter in print() is used to customize the separator between items?",
    "sep", "split", "delimit", "join",
    "", "", "", "", "", "",
    "1", "The 'sep' parameter specifies what string to place between multiple arguments in print().",
    "1.00", "0.00", "Easy"
  ],
  [
    8, "Python", "Print & Output", "python,print,sep", "SINGLECORRECT",
    "What is the output of print(\"2026\", \"07\", \"24\", sep=\"-\")?",
    "2026-07-24", "2026 07 24", "20260724", "2026, 07, 24",
    "", "", "", "", "", "",
    "1", "Setting sep='-' replaces the default space separator with a hyphen, giving '2026-07-24'.",
    "1.00", "0.00", "Easy"
  ],
  [
    9, "Python", "Print & Output", "python,print,sep", "SINGLECORRECT",
    "What is the output of print(\"www\", \"google\", \"com\", sep=\".\")?",
    "www.google.com", "www google com", "www.google.com.", ".www.google.com",
    "", "", "", "", "", "",
    "1", "sep='.' places a dot between each item, forming 'www.google.com'.",
    "1.00", "0.00", "Easy"
  ],
  [
    10, "Python", "Print & Output", "python,print,end", "SINGLECORRECT",
    "Which parameter in print() controls what is printed at the END of the output?",
    "end", "stop", "finish", "last",
    "", "", "", "", "", "",
    "1", "The 'end' parameter defines what character is printed at the end of print().",
    "1.00", "0.00", "Easy"
  ],
  [
    11, "Python", "Print & Output", "python,print,end", "SINGLECORRECT",
    "What is the DEFAULT value of the 'end' parameter in print()?",
    "\\n (new line)", "A space (\" \")", "Empty string (\"\")", "A comma (\",\")",
    "", "", "", "", "", "",
    "1", "By default, end='\\n', which causes Python to move to a new line after every print() call.",
    "1.00", "0.00", "Easy"
  ],
  [
    12, "Python", "Print & Output", "python,print,end", "SINGLECORRECT",
    "What will be the output of the following code?\nprint(\"Loading...\", end=\" \")\nprint(\"Done!\")",
    "Loading... Done! (on the same line)", "Loading... (on line 1) and Done! (on line 2)", "Loading...Done!", "SyntaxError",
    "", "", "", "", "", "",
    "1", "Because end=' ', the first print statement ends with a space instead of a newline, keeping 'Done!' on the same line.",
    "1.00", "0.00", "Medium"
  ],
  [
    13, "Python", "Print & Output", "python,print,sep_end", "SINGLECORRECT",
    "What is the output of print(\"A\", \"B\", sep=\"\", end=\"!\")?",
    "AB!", "A B!", "A,B!", "AB",
    "", "", "", "", "", "",
    "1", "sep='' joins A and B without spaces ('AB'), and end='!' adds an exclamation mark at the end.",
    "1.00", "0.00", "Medium"
  ],
  [
    14, "Python", "Print & Output", "python,print,variables", "SINGLECORRECT",
    "What will happen when you execute: x = 50; print(x)?",
    "It prints 50", "It prints 'x'", "It throws a TypeError", "It prints Nothing",
    "", "", "", "", "", "",
    "1", "print(x) looks up the variable x and outputs its value 50.",
    "1.00", "0.00", "Easy"
  ],
  [
    15, "Python", "Print & Output", "python,print,sep", "SINGLECORRECT",
    "What is the output of print(\"Python\", \"Rules\", sep=\"***\")?",
    "Python***Rules", "Python Rules***", "Python Rules", "***Python***Rules",
    "", "", "", "", "", "",
    "1", "sep='***' replaces the space separator with '***', producing 'Python***Rules'.",
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

const excelPath = path.join(desktopDir, 'Print_Output_Quiz_Graphy.xlsx');
const csvPath = path.join(desktopDir, 'Print_Output_Quiz_Graphy.csv');

XLSX.writeFile(wb, excelPath);
const csvContent = XLSX.utils.sheet_to_csv(ws);
fs.writeFileSync(csvPath, csvContent);

console.log("Excel saved to:", excelPath);
console.log("CSV saved to:", csvPath);
