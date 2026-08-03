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
    1, "Python", "Arithmetic Operators", "python,operators,addition", "SINGLECORRECT",
    "Which operator is used to add two numbers in Python?",
    "+", "-", "*", "/",
    "", "", "", "", "", "",
    "1", "The + operator is used to perform addition in Python.",
    "1.00", "0.00", "Easy"
  ],
  [
    2, "Python", "Arithmetic Operators", "python,operators,subtraction", "SINGLECORRECT",
    "What is the result of num1 - num2 when num1 = 10 and num2 = 3?",
    "13", "7", "30", "3.33",
    "", "", "", "", "", "",
    "2", "10 - 3 equals 7.",
    "1.00", "0.00", "Easy"
  ],
  [
    3, "Python", "Arithmetic Operators", "python,operators,multiplication", "SINGLECORRECT",
    "Which symbol is used for multiplication in Python?",
    "x", "*", "X", "^",
    "", "", "", "", "", "",
    "2", "In Python, the asterisk symbol (*) is used for multiplication.",
    "1.00", "0.00", "Easy"
  ],
  [
    4, "Python", "Arithmetic Operators", "python,operators,division", "SINGLECORRECT",
    "What is the data type of the result when you divide two numbers using / (e.g., 10 / 2)?",
    "int", "float", "str", "bool",
    "", "", "", "", "", "",
    "2", "In Python, division using / always returns a Float (decimal number), so 10 / 2 gives 5.0.",
    "1.00", "0.00", "Easy"
  ],
  [
    5, "Python", "Arithmetic Operators", "python,operators,division", "SINGLECORRECT",
    "What is the output of print(10 / 2)?",
    "5", "5.0", "10/2", "2.5",
    "", "", "", "", "", "",
    "2", "Division (/) always produces a float result in Python 3, so 10 / 2 results in 5.0.",
    "1.00", "0.00", "Easy"
  ],
  [
    6, "Python", "Arithmetic Operators", "python,operators,floor_division", "SINGLECORRECT",
    "What does the Floor Division operator (//) do in Python?",
    "Returns the exact decimal division result", "Rounds the division result down to the nearest whole number", "Returns only the remainder", "Raises a number to a power",
    "", "", "", "", "", "",
    "2", "Floor division (//) divides numbers and discards any decimal part, rounding down to the nearest whole number.",
    "1.00", "0.00", "Medium"
  ],
  [
    7, "Python", "Arithmetic Operators", "python,operators,floor_division", "SINGLECORRECT",
    "What is the output of print(10 // 3)?",
    "3.33", "3", "1", "3.0",
    "", "", "", "", "", "",
    "2", "Floor division 10 // 3 rounds down 3.333... to 3.",
    "1.00", "0.00", "Medium"
  ],
  [
    8, "Python", "Arithmetic Operators", "python,operators,modulus", "SINGLECORRECT",
    "What does the Modulus operator (%) return in Python?",
    "The quotient of division", "The leftover remainder after division", "The square root of a number", "A boolean True/False",
    "", "", "", "", "", "",
    "2", "The Modulus operator (%) calculates and returns only the leftover remainder of a division.",
    "1.00", "0.00", "Medium"
  ],
  [
    9, "Python", "Arithmetic Operators", "python,operators,modulus", "SINGLECORRECT",
    "What is the output of print(10 % 3)?",
    "3", "1", "0", "3.33",
    "", "", "", "", "", "",
    "2", "When 10 is divided by 3 (3 * 3 = 9), the leftover remainder is 1.",
    "1.00", "0.00", "Medium"
  ],
  [
    10, "Python", "Arithmetic Operators", "python,operators,modulus", "SINGLECORRECT",
    "How can you check if a number is Even using the Modulus operator (%)?",
    "number % 2 == 0", "number % 2 == 1", "number / 2 == 0", "number * 2 == 0",
    "", "", "", "", "", "",
    "1", "If dividing a number by 2 leaves a remainder of 0 (number % 2 == 0), the number is Even.",
    "1.00", "0.00", "Medium"
  ],
  [
    11, "Python", "Arithmetic Operators", "python,operators,exponentiation", "SINGLECORRECT",
    "Which operator is used for Exponentiation (Power) in Python?",
    "^", "**", "*", "//",
    "", "", "", "", "", "",
    "2", "The double asterisk (**) operator is used for calculating powers (exponentiation) in Python.",
    "1.00", "0.00", "Easy"
  ],
  [
    12, "Python", "Arithmetic Operators", "python,operators,exponentiation", "SINGLECORRECT",
    "What is the output of print(2 ** 3)?",
    "6", "5", "8", "9",
    "", "", "", "", "", "",
    "3", "2 ** 3 means 2 raised to the power of 3 (2 * 2 * 2 = 8).",
    "1.00", "0.00", "Easy"
  ],
  [
    13, "Python", "Arithmetic Operators", "python,operators,floor_vs_modulus", "SINGLECORRECT",
    "If chocolates = 10 and friends = 3, which operator tells you how many chocolates are left over?",
    "chocolates / friends", "chocolates // friends", "chocolates % friends", "chocolates ** friends",
    "", "", "", "", "", "",
    "3", "Modulus (%) gives the leftover remainder (10 % 3 = 1 leftover chocolate).",
    "1.00", "0.00", "Medium"
  ],
  [
    14, "Python", "Arithmetic Operators", "python,operators,floor_vs_modulus", "SINGLECORRECT",
    "If chocolates = 10 and friends = 3, which operator tells you how many whole chocolates each friend gets?",
    "chocolates / friends", "chocolates // friends", "chocolates % friends", "chocolates + friends",
    "", "", "", "", "", "",
    "2", "Floor division (//) gives the whole number portion (10 // 3 = 3 chocolates per friend).",
    "1.00", "0.00", "Medium"
  ],
  [
    15, "Python", "Arithmetic Operators", "python,operators,exponentiation", "SINGLECORRECT",
    "What is the output of print(5 ** 2)?",
    "10", "25", "7", "52",
    "", "", "", "", "", "",
    "2", "5 ** 2 means 5 raised to the power of 2 (5 * 5 = 25).",
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

const excelPath = path.join(desktopDir, 'Arithmetic_Operators_Quiz_Graphy.xlsx');
const csvPath = path.join(desktopDir, 'Arithmetic_Operators_Quiz_Graphy.csv');

XLSX.writeFile(wb, excelPath);
const csvContent = XLSX.utils.sheet_to_csv(ws);
fs.writeFileSync(csvPath, csvContent, 'utf8');

console.log("Excel saved successfully to:", excelPath);
console.log("CSV saved successfully to:", csvPath);
