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
    1, "Python", "Numbers", "python,numbers,int", "SINGLECORRECT",
    "What is an Integer (int) in Python?",
    "A whole number without a decimal point", "A number with a decimal point", "Text enclosed in quotes", "A true/false value",
    "", "", "", "", "", "",
    "1", "An integer is a whole number (positive, negative, or zero) without any decimal points.",
    "1.00", "0.00", "Easy"
  ],
  [
    2, "Python", "Numbers", "python,numbers,float", "SINGLECORRECT",
    "What is a Float in Python?",
    "A number that contains a decimal point", "A text string", "A whole number only", "An error state",
    "", "", "", "", "", "",
    "1", "A float represents any number that contains a decimal point (e.g., 49.99, 2.5).",
    "1.00", "0.00", "Easy"
  ],
  [
    3, "Python", "Numbers", "python,numbers,int", "SINGLECORRECT",
    "What is the data type of temperature = -12 in Python?",
    "float", "int", "str", "bool",
    "", "", "", "", "", "",
    "2", "-12 is a whole negative number without decimals, so it is an int.",
    "1.00", "0.00", "Easy"
  ],
  [
    4, "Python", "Numbers", "python,numbers,float", "SINGLECORRECT",
    "What is the data type of score = 10.0 in Python?",
    "int", "float", "str", "bool",
    "", "", "", "", "", "",
    "2", "Even if a decimal number ends in zero (10.0), Python still treats it as a float.",
    "1.00", "0.00", "Easy"
  ],
  [
    5, "Python", "Numbers", "python,numbers,division", "SINGLECORRECT",
    "What is the output of print(10 / 2) in Python?",
    "5", "5.0", "10/2", "Error",
    "", "", "", "", "", "",
    "2", "Division (/) in Python always returns a decimal number (float), so 10 / 2 gives 5.0.",
    "1.00", "0.00", "Medium"
  ],
  [
    6, "Python", "Numbers", "python,numbers,operators", "SINGLECORRECT",
    "Which operator is used for multiplication in Python?",
    "x", "X", "*", "^",
    "", "", "", "", "", "",
    "3", "In Python, the asterisk symbol (*) is used for multiplication.",
    "1.00", "0.00", "Easy"
  ],
  [
    7, "Python", "Numbers", "python,numbers,math", "SINGLECORRECT",
    "What is the result of total = 10 + 5 in Python?",
    "15", "105", "10 + 5", "5",
    "", "", "", "", "", "",
    "1", "The + operator adds numeric values together, resulting in 15.",
    "1.00", "0.00", "Easy"
  ],
  [
    8, "Python", "Numbers", "python,numbers,math", "SINGLECORRECT",
    "What is the result of change = 20 - 7 in Python?",
    "13", "27", "-13", "14",
    "", "", "", "", "", "",
    "1", "The - operator subtracts numbers, so 20 - 7 equals 13.",
    "1.00", "0.00", "Easy"
  ],
  [
    9, "Python", "Numbers", "python,numbers,math", "SINGLECORRECT",
    "What is the result of area = 6 * 4 in Python?",
    "24", "10", "64", "2",
    "", "", "", "", "", "",
    "1", "6 multiplied by 4 equals 24.",
    "1.00", "0.00", "Easy"
  ],
  [
    10, "Python", "Numbers", "python,numbers,vs_strings", "SINGLECORRECT",
    "What is the output of print(5 + 5)?",
    "55", "10", "5+5", "SyntaxError",
    "", "", "", "", "", "",
    "2", "Since 5 and 5 are numbers without quotes, Python performs mathematical addition resulting in 10.",
    "1.00", "0.00", "Easy"
  ],
  [
    11, "Python", "Numbers", "python,numbers,vs_strings", "SINGLECORRECT",
    "What is the output of print(\"5\" + \"5\")?",
    "10", "55", "\"10\"", "Error",
    "", "", "", "", "", "",
    "2", "Enclosing numbers in quotes makes them strings. Using + joins the text together, giving '55'.",
    "1.00", "0.00", "Medium"
  ],
  [
    12, "Python", "Numbers", "python,numbers,types", "SINGLECORRECT",
    "What is the data type of the result when you add an integer to a float (e.g., 5 + 2.5)?",
    "int", "float", "str", "bool",
    "", "", "", "", "", "",
    "2", "Adding an integer (5) to a float (2.5) results in a float (7.5).",
    "1.00", "0.00", "Medium"
  ],
  [
    13, "Python", "Numbers", "python,numbers,division", "SINGLECORRECT",
    "What data type does the division operator (/) always return in Python?",
    "int", "float", "str", "depends on the numbers",
    "", "", "", "", "", "",
    "2", "In Python 3, division (/) always returns a float type, even if the division is even (like 4 / 2 = 2.0).",
    "1.00", "0.00", "Easy"
  ],
  [
    14, "Python", "Numbers", "python,numbers,performance", "SINGLECORRECT",
    "Why does Python distinguish between integers and float numbers?",
    "Computers process whole numbers faster than decimal numbers", "Integers can only store positive numbers", "Floats cannot be used in math calculations", "Integers require quotation marks",
    "", "", "", "", "", "",
    "1", "Computers handle whole numbers (integers) faster and more efficiently than decimals (floats).",
    "1.00", "0.00", "Medium"
  ],
  [
    15, "Python", "Numbers", "python,numbers,quotes", "SINGLECORRECT",
    "What happens when you store a number inside quotation marks (e.g., num = \"100\")?",
    "It remains an integer", "It becomes a String (text)", "It converts to a float", "Python gives a SyntaxError",
    "", "", "", "", "", "",
    "2", "Placing quotation marks around any value converts it into a String data type in Python.",
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

const excelPath = path.join(desktopDir, 'Numbers_Quiz_Graphy.xlsx');
const csvPath = path.join(desktopDir, 'Numbers_Quiz_Graphy.csv');

XLSX.writeFile(wb, excelPath);
const csvContent = XLSX.utils.sheet_to_csv(ws);
fs.writeFileSync(csvPath, csvContent);

console.log("Excel saved to:", excelPath);
console.log("CSV saved to:", csvPath);
