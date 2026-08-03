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
    1, "Python", "Data Types", "python,datatypes,basics", "SINGLECORRECT",
    "What does a \"Data Type\" represent in Python?",
    "The kind of information stored inside a variable", "The total number of variables in a program", "The file size of the Python script", "The speed of code execution",
    "", "", "", "", "", "",
    "1", "A Data Type defines the kind of value a variable is holding (such as text, number, or boolean).",
    "1.00", "0.00", "Easy"
  ],
  [
    2, "Python", "Data Types", "python,datatypes,int", "SINGLECORRECT",
    "What is the data type of the variable age = 25?",
    "float", "str", "int", "bool",
    "", "", "", "", "", "",
    "3", "25 is a whole number without decimal points, so Python stores it as an Integer (int).",
    "1.00", "0.00", "Easy"
  ],
  [
    3, "Python", "Data Types", "python,datatypes,float", "SINGLECORRECT",
    "What is the data type of price = 19.99 in Python?",
    "int", "float", "str", "bool",
    "", "", "", "", "", "",
    "2", "Numbers containing decimal points (like 19.99) are classified as Float in Python.",
    "1.00", "0.00", "Easy"
  ],
  [
    4, "Python", "Data Types", "python,datatypes,str", "SINGLECORRECT",
    "What is the data type of name = \"Rahul\"?",
    "str", "int", "float", "bool",
    "", "", "", "", "", "",
    "1", "Text enclosed within quotation marks is stored as a String (str) in Python.",
    "1.00", "0.00", "Easy"
  ],
  [
    5, "Python", "Data Types", "python,datatypes,bool", "SINGLECORRECT",
    "What is the data type of is_passed = True?",
    "str", "int", "float", "bool",
    "", "", "", "", "", "",
    "4", "True and False are Boolean values (bool) in Python.",
    "1.00", "0.00", "Easy"
  ],
  [
    6, "Python", "Data Types", "python,datatypes,str", "SINGLECORRECT",
    "What is the data type of x = \"25\"?",
    "int", "float", "str", "bool",
    "", "", "", "", "", "",
    "3", "Even though 25 is a number, putting quotation marks around it makes it a String (str).",
    "1.00", "0.00", "Medium"
  ],
  [
    7, "Python", "Data Types", "python,datatypes,str", "SINGLECORRECT",
    "What is the data type of is_active = \"True\"?",
    "bool", "str", "int", "float",
    "", "", "", "", "", "",
    "2", "Enclosing True in quotation marks converts it into text, making it a String (str), not a Boolean.",
    "1.00", "0.00", "Medium"
  ],
  [
    8, "Python", "Data Types", "python,datatypes,int", "SINGLECORRECT",
    "What is the data type of temperature = -5?",
    "float", "int", "str", "bool",
    "", "", "", "", "", "",
    "2", "Integers in Python can be positive or negative whole numbers.",
    "1.00", "0.00", "Easy"
  ],
  [
    9, "Python", "Data Types", "python,datatypes,float", "SINGLECORRECT",
    "How does Python classify the value x = 10.0 compared to x = 10?",
    "10.0 is float, while 10 is int", "Both are int", "Both are float", "Both are str",
    "", "", "", "", "", "",
    "1", "Adding .0 makes 10.0 a float, whereas 10 without decimals is an int.",
    "1.00", "0.00", "Medium"
  ],
  [
    10, "Python", "Data Types", "python,datatypes,type", "SINGLECORRECT",
    "Which built-in Python function is used to check the data type of a variable?",
    "check_type()", "datatype()", "type()", "get_type()",
    "", "", "", "", "", "",
    "3", "The built-in function type(variable_name) returns the data type of a variable.",
    "1.00", "0.00", "Easy"
  ],
  [
    11, "Python", "Data Types", "python,datatypes,type", "SINGLECORRECT",
    "What will print(type(\"Hello\")) output in Python?",
    "<class 'str'>", "<class 'string'>", "Text", "String",
    "", "", "", "", "", "",
    "1", "Python outputs <class 'str'> when checking the data type of a string.",
    "1.00", "0.00", "Easy"
  ],
  [
    12, "Python", "Data Types", "python,datatypes,operators", "SINGLECORRECT",
    "What is the output of print(5 + 3)?",
    "53", "8", "\"5 + 3\"", "Error",
    "", "", "", "", "", "",
    "2", "When applied to numbers, the + operator performs addition (5 + 3 = 8).",
    "1.00", "0.00", "Easy"
  ],
  [
    13, "Python", "Data Types", "python,datatypes,concatenation", "SINGLECORRECT",
    "What is the output of print(\"Hello\" + \"World\")?",
    "Hello World", "HelloWorld", "Error", "\"Hello + World\"",
    "", "", "", "", "", "",
    "2", "When applied to strings, the + operator joins (concatenates) them directly without adding spaces.",
    "1.00", "0.00", "Medium"
  ],
  [
    14, "Python", "Data Types", "python,datatypes,errors", "SINGLECORRECT",
    "What happens when you run print(\"My age is \" + 25) in Python?",
    "It prints \"My age is 25\"", "It raises a TypeError", "It prints \"My age is \"", "It converts 25 to 25.0",
    "", "", "", "", "", "",
    "2", "Python does not allow adding (concatenating) a String and an Integer directly, resulting in a TypeError.",
    "1.00", "0.00", "Medium"
  ],
  [
    15, "Python", "Data Types", "python,datatypes,bool", "SINGLECORRECT",
    "Which of the following is the correct syntax for Boolean values in Python?",
    "true and false", "True and False", "TRUE and FALSE", "\"true\" and \"false\"",
    "", "", "", "", "", "",
    "2", "Boolean keywords in Python must begin with a capital letter: True and False.",
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

const excelPath = path.join(desktopDir, 'Data_Types_Quiz_Graphy.xlsx');
const csvPath = path.join(desktopDir, 'Data_Types_Quiz_Graphy.csv');

XLSX.writeFile(wb, excelPath);
const csvContent = XLSX.utils.sheet_to_csv(ws);
fs.writeFileSync(csvPath, csvContent);

console.log("Excel saved to:", excelPath);
console.log("CSV saved to:", csvPath);
