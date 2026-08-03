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
    1, "Python", "Assignment Operators", "python,operators,assignment", "SINGLECORRECT",
    "Which operator is used to assign a value to a variable in Python?",
    "==", "=", "->", ":=",
    "", "", "", "", "", "",
    "2", "The single equals sign (=) is the basic assignment operator used to store values in variables.",
    "1.00", "0.00", "Easy"
  ],
  [
    2, "Python", "Assignment Operators", "python,operators,add-assign", "SINGLECORRECT",
    "What is the value of score after running: score = 10; score += 5?",
    "10", "5", "15", "50",
    "", "", "", "", "", "",
    "3", "score += 5 is shorthand for score = score + 5, which evaluates to 10 + 5 = 15.",
    "1.00", "0.00", "Easy"
  ],
  [
    3, "Python", "Assignment Operators", "python,operators,sub-assign", "SINGLECORRECT",
    "What is the value of points after running: points = 20; points -= 4?",
    "24", "16", "80", "5",
    "", "", "", "", "", "",
    "2", "points -= 4 is equivalent to points = points - 4, which equals 16.",
    "1.00", "0.00", "Easy"
  ],
  [
    4, "Python", "Assignment Operators", "python,operators,mult-assign", "SINGLECORRECT",
    "What is the value of count after running: count = 6; count *= 3?",
    "18", "9", "2", "63",
    "", "", "", "", "", "",
    "1", "count *= 3 means count = count * 3, which equals 18.",
    "1.00", "0.00", "Easy"
  ],
  [
    5, "Python", "Assignment Operators", "python,operators,div-assign", "SINGLECORRECT",
    "What is the value and data type of num after running: num = 10; num /= 2?",
    "5", "5.0", "2", "2.0",
    "", "", "", "", "", "",
    "2", "Regular division (/=) always converts the result into a Float (decimal), so 10 /= 2 becomes 5.0.",
    "1.00", "0.00", "Easy"
  ],
  [
    6, "Python", "Assignment Operators", "python,operators,floor-assign", "SINGLECORRECT",
    "What is the value of value after running: value = 11; value //= 3?",
    "3.66", "3.0", "3", "2",
    "", "", "", "", "", "",
    "3", "Floor division (//=) discards the decimal part and returns an Integer, so 11 //= 3 becomes 3.",
    "1.00", "0.00", "Medium"
  ],
  [
    7, "Python", "Assignment Operators", "python,operators,mod-assign", "SINGLECORRECT",
    "What is the value of num after running: num = 15; num %= 4?",
    "3", "3.75", "0", "11",
    "", "", "", "", "", "",
    "1", "Modulus assignment (%=) stores the leftover remainder. 15 divided by 4 leaves a remainder of 3.",
    "1.00", "0.00", "Medium"
  ],
  [
    8, "Python", "Assignment Operators", "python,operators,shorthand", "SINGLECORRECT",
    "Which expression is equivalent to: x = x + 10?",
    "x =+ 10", "x += 10", "x ++ 10", "x == 10",
    "", "", "", "", "", "",
    "2", "x += 10 is the compound assignment operator equivalent to x = x + 10.",
    "1.00", "0.00", "Easy"
  ],
  [
    9, "Python", "Assignment Operators", "python,operators,shorthand", "SINGLECORRECT",
    "Which expression is equivalent to: total = total * 2?",
    "total =* 2", "total ** 2", "total *= 2", "total2 *=",
    "", "", "", "", "", "",
    "3", "total *= 2 is the shorthand equivalent of total = total * 2.",
    "1.00", "0.00", "Easy"
  ],
  [
    10, "Python", "Assignment Operators", "python,operators,order", "SINGLECORRECT",
    "What happens if you run: a = 5; a += 3; a *= 2?",
    "11", "16", "13", "10",
    "", "", "", "", "", "",
    "2", "First, a += 3 makes a = 8. Next, a *= 2 makes a = 8 * 2 = 16.",
    "1.00", "0.00", "Medium"
  ],
  [
    11, "Python", "Assignment Operators", "python,operators,sub-assign", "SINGLECORRECT",
    "What will be the output of: x = 50; x -= 15; print(x)?",
    "50", "15", "35", "65",
    "", "", "", "", "", "",
    "3", "x -= 15 subtracts 15 from 50, resulting in 35.",
    "1.00", "0.00", "Easy"
  ],
  [
    12, "Python", "Assignment Operators", "python,operators,mod-assign", "SINGLECORRECT",
    "What is the output of: a = 20; a %= 6; print(a)?",
    "2", "3", "3.33", "14",
    "", "", "", "", "", "",
    "1", "20 divided by 6 is 3 with a remainder of 2. So a %= 6 sets a to 2.",
    "1.00", "0.00", "Medium"
  ],
  [
    13, "Python", "Assignment Operators", "python,operators,string-add", "SINGLECORRECT",
    "What happens when you run: msg = 'Hello '; msg += 'World'?",
    "Error", "Hello World", "HelloWorld", "Hello",
    "", "", "", "", "", "",
    "2", "The += operator concatenates strings, joining 'Hello ' and 'World' into 'Hello World'.",
    "1.00", "0.00", "Medium"
  ],
  [
    14, "Python", "Assignment Operators", "python,operators,div-assign", "SINGLECORRECT",
    "What is the result of: n = 8; n /= 4?",
    "2", "2.0", "0.5", "4",
    "", "", "", "", "", "",
    "2", "The regular division assignment /= always produces a float result, giving 2.0.",
    "1.00", "0.00", "Easy"
  ],
  [
    15, "Python", "Assignment Operators", "python,operators,sequence", "SINGLECORRECT",
    "If a = 12, what is the value of a after running: a //= 5?",
    "2", "2.4", "2.0", "7",
    "", "", "", "", "", "",
    "1", "Floor division (//=) takes 12 // 5 which is 2 as an integer.",
    "1.00", "0.00", "Easy"
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
XLSX.utils.book_append_sheet(wb, ws, "Assignment_Operators_Quiz");

const excelPath = path.join(desktopDir, "Assignment_Operators_Quiz_Graphy.xlsx");
XLSX.writeFile(wb, excelPath);
console.log(`Excel generated: ${excelPath}`);

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

const csvPath = path.join(desktopDir, "Assignment_Operators_Quiz_Graphy.csv");
fs.writeFileSync(csvPath, csvContent, 'utf8');
console.log(`CSV generated: ${csvPath}`);
