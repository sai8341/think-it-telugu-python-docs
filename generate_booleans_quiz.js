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
    1, "Python", "Booleans", "python,booleans,basics", "SINGLECORRECT",
    "What is a Boolean (bool) in Python?",
    "A data type that can only be True or False", "A function for doing math", "A text string inside double quotes", "A list of multiple numbers",
    "", "", "", "", "", "",
    "1", "A Boolean is the simplest data type in Python, representing one of two values: True or False.",
    "1.00", "0.00", "Easy"
  ],
  [
    2, "Python", "Booleans", "python,booleans,syntax", "SINGLECORRECT",
    "Which of the following is the CORRECT way to write a Boolean True in Python?",
    "true", "True", "TRUE", "\"True\"",
    "", "", "", "", "", "",
    "2", "In Python, Boolean keywords are strictly capitalized: True and False.",
    "1.00", "0.00", "Easy"
  ],
  [
    3, "Python", "Booleans", "python,booleans,syntax", "SINGLECORRECT",
    "What happens if you assign is_active = true with a lowercase 't' in Python?",
    "Python automatically capitalizes it to True", "Python throws a NameError", "It creates a String variable", "It prints True",
    "", "", "", "", "", "",
    "2", "Python is case-sensitive and does not recognize lowercase true, resulting in a NameError.",
    "1.00", "0.00", "Medium"
  ],
  [
    4, "Python", "Booleans", "python,booleans,quotes", "SINGLECORRECT",
    "What is the data type of the variable status = \"True\"?",
    "bool", "str", "int", "float",
    "", "", "", "", "", "",
    "2", "Enclosing True inside quotation marks makes it a String (str), not a Boolean.",
    "1.00", "0.00", "Easy"
  ],
  [
    5, "Python", "Booleans", "python,booleans,quotes", "SINGLECORRECT",
    "What is the data type of the variable status = True (without quotation marks)?",
    "str", "bool", "int", "float",
    "", "", "", "", "", "",
    "2", "True written without quotes is a native Boolean (bool) data type in Python.",
    "1.00", "0.00", "Easy"
  ],
  [
    6, "Python", "Booleans", "python,booleans,analogy", "SINGLECORRECT",
    "Which real-life object is commonly used as an analogy for Booleans?",
    "A light switch (On / Off)", "A ruler measuring length", "A calculator doing multiplication", "A dictionary of words",
    "", "", "", "", "", "",
    "1", "Booleans act like light switches because they can only be in one of two states: True (On) or False (Off).",
    "1.00", "0.00", "Easy"
  ],
  [
    7, "Python", "Booleans", "python,booleans,type", "SINGLECORRECT",
    "What will print(type(False)) output in Python?",
    "<class 'bool'>", "<class 'boolean'>", "<class 'str'>", "False",
    "", "", "", "", "", "",
    "1", "The type() function returns <class 'bool'> for Boolean values in Python.",
    "1.00", "0.00", "Easy"
  ],
  [
    8, "Python", "Booleans", "python,booleans,syntax", "SINGLECORRECT",
    "Which of the following is an invalid Boolean value in Python?",
    "True", "False", "FALSE", "Both True and False are valid",
    "", "", "", "", "", "",
    "3", "FALSE in all uppercase letters is invalid in Python because Boolean keywords must have only the first letter capitalized.",
    "1.00", "0.00", "Medium"
  ],
  [
    9, "Python", "Booleans", "python,booleans,use-case", "SINGLECORRECT",
    "Which of the following scenarios is BEST suited for a Boolean variable?",
    "Storing a user's phone number", "Storing whether a user is logged in (True/False)", "Storing the price of an item", "Storing a list of student names",
    "", "", "", "", "", "",
    "2", "Booleans are ideal for binary Yes/No states, such as checking if a user is logged in.",
    "1.00", "0.00", "Easy"
  ],
  [
    10, "Python", "Booleans", "python,booleans,type", "SINGLECORRECT",
    "What is the abbreviation used by Python for the Boolean data type?",
    "boolean", "bool", "boo", "bln",
    "", "", "", "", "", "",
    "2", "Python uses the short name 'bool' for the Boolean data type.",
    "1.00", "0.00", "Easy"
  ],
  [
    11, "Python", "Booleans", "python,booleans,values", "SINGLECORRECT",
    "How many possible values can a Boolean variable hold at any one time in Python?",
    "Exactly 2 (True or False)", "Unlimited values", "Exactly 10 values", "Any numeric value",
    "", "", "", "", "", "",
    "1", "A Boolean variable can only hold one of two possible values: True or False.",
    "1.00", "0.00", "Easy"
  ],
  [
    12, "Python", "Booleans", "python,booleans,quotes", "SINGLECORRECT",
    "What is the difference between is_valid = False and is_valid = \"False\"?",
    "is_valid = False is a Boolean, while \"False\" is a String", "Both are Booleans", "Both are Strings", "\"False\" causes a syntax error",
    "", "", "", "", "", "",
    "1", "Without quotes, False is a Boolean switch; with quotes, \"False\" is just text (String).",
    "1.00", "0.00", "Easy"
  ],
  [
    13, "Python", "Booleans", "python,booleans,comparison", "SINGLECORRECT",
    "What will print(5 > 3) evaluate to in Python?",
    "True", "False", "5 > 3", "Error",
    "", "", "", "", "", "",
    "1", "Since 5 is greater than 3, Python evaluates the comparison expression to the Boolean True.",
    "1.00", "0.00", "Medium"
  ],
  [
    14, "Python", "Booleans", "python,booleans,comparison", "SINGLECORRECT",
    "What will print(10 == 20) evaluate to in Python?",
    "True", "False", "10", "Error",
    "", "", "", "", "", "",
    "2", "Since 10 is not equal to 20, the equality comparison evaluates to the Boolean False.",
    "1.00", "0.00", "Medium"
  ],
  [
    15, "Python", "Booleans", "python,booleans,overview", "SINGLECORRECT",
    "Which three data types form the foundational building blocks of basic Python programming?",
    "Strings, Numbers, and Booleans", "Lists, Dictionaries, and Sets", "Classes, Modules, and Functions", "HTML, CSS, and JavaScript",
    "", "", "", "", "", "",
    "1", "Strings (text), Numbers (integers & floats), and Booleans (True/False) are the 3 foundational data types in Python.",
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

const excelPath = path.join(desktopDir, 'Booleans_Quiz_Graphy.xlsx');
const csvPath = path.join(desktopDir, 'Booleans_Quiz_Graphy.csv');

XLSX.writeFile(wb, excelPath);
const csvContent = XLSX.utils.sheet_to_csv(ws);
fs.writeFileSync(csvPath, csvContent);

console.log("Excel saved to:", excelPath);
console.log("CSV saved to:", csvPath);
