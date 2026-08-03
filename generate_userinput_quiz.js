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
    1, "Python", "User Input", "python,input,basics", "SINGLECORRECT",
    "Which Python function is used to ask for and receive input from the user?",
    "input()", "read()", "get()", "scan()",
    "", "", "", "", "", "",
    "1", "The input() function pauses the program and waits for the user to type input and press Enter.",
    "1.00", "0.00", "Easy"
  ],
  [
    2, "Python", "User Input", "python,input,behavior", "SINGLECORRECT",
    "What happens to the Python program when it encounters the input() command?",
    "It pauses and waits for the user to type and press Enter", "It immediately closes", "It skips to the next line without waiting", "It raises an error",
    "", "", "", "", "", "",
    "1", "input() pauses code execution until the user submits keyboard input by pressing Enter.",
    "1.00", "0.00", "Easy"
  ],
  [
    3, "Python", "User Input", "python,input,golden_rule", "SINGLECORRECT",
    "What data type does the input() function ALWAYS return in Python?",
    "String (str)", "Integer (int)", "Float (float)", "Boolean (bool)",
    "", "", "", "", "", "",
    "1", "Golden Rule of input(): input() always captures user response as a String (str), regardless of what is typed.",
    "1.00", "0.00", "Easy"
  ],
  [
    4, "Python", "User Input", "python,input,type", "SINGLECORRECT",
    "If a user types 25 in response to age = input(\"Enter age: \"), what is type(age)?",
    "<class 'str'>", "<class 'int'>", "<class 'float'>", "<class 'bool'>",
    "", "", "", "", "", "",
    "1", "Even when numbers are typed, input() returns them as text string \"25\", so type() is <class 'str'>.",
    "1.00", "0.00", "Medium"
  ],
  [
    5, "Python", "User Input", "python,input,concatenation", "SINGLECORRECT",
    "If a user inputs 10 for num1 and 20 for num2, what is the output of print(num1 + num2) without type casting?",
    "1020", "30", "10 20", "TypeError",
    "", "", "", "", "", "",
    "1", "Because input() stores \"10\" and \"20\" as strings, + concatenates them into \"1020\".",
    "1.00", "0.00", "Medium"
  ],
  [
    6, "Python", "User Input", "python,input,casting", "SINGLECORRECT",
    "What process is used to convert user input from a String to an Integer?",
    "Type Casting (or Type Conversion)", "String Splitting", "Variable Declaring", "Memory Allocation",
    "", "", "", "", "", "",
    "1", "Converting data from one type to another (e.g. str to int) is called Type Casting or Type Conversion.",
    "1.00", "0.00", "Easy"
  ],
  [
    7, "Python", "User Input", "python,input,int_conversion", "SINGLECORRECT",
    "Which function converts user input string to a whole number integer?",
    "int()", "str()", "float()", "num()",
    "", "", "", "", "", "",
    "1", "int() converts string text containing numbers into an integer whole number.",
    "1.00", "0.00", "Easy"
  ],
  [
    8, "Python", "User Input", "python,input,float_conversion", "SINGLECORRECT",
    "Which function converts user input string to a decimal float?",
    "float()", "int()", "decimal()", "str()",
    "", "", "", "", "", "",
    "1", "float() converts string input into a decimal floating point number.",
    "1.00", "0.00", "Easy"
  ],
  [
    9, "Python", "User Input", "python,input,casting_syntax", "SINGLECORRECT",
    "What is the correct syntax to get an integer input from the user?",
    "age = int(input(\"Enter age: \"))", "age = input(int(\"Enter age: \"))", "age = input(\"Enter age: \").int()", "age = integer.input(\"Enter age: \")",
    "", "", "", "", "", "",
    "1", "Wrapping input() inside int() like int(input(\"...\")) correctly converts the input to an integer.",
    "1.00", "0.00", "Easy"
  ],
  [
    10, "Python", "User Input", "python,input,prompt", "SINGLECORRECT",
    "What is the purpose of the string message inside input(\"Enter name: \")?",
    "It displays a prompt message guiding the user what to type", "It names the variable automatically", "It sets default text if user types nothing", "It validates user spelling",
    "", "", "", "", "", "",
    "1", "The string argument inside input() is displayed to prompt the user on what to enter.",
    "1.00", "0.00", "Easy"
  ],
  [
    11, "Python", "User Input", "python,input,math", "SINGLECORRECT",
    "What will be the output if user enters 5 and the code executes: age = int(input()); print(age + 1)?",
    "6", "51", "\"6\"", "TypeError",
    "", "", "", "", "", "",
    "1", "Because int() converts \"5\" to integer 5, 5 + 1 evaluates to 6.",
    "1.00", "0.00", "Easy"
  ],
  [
    12, "Python", "User Input", "python,input,float_math", "SINGLECORRECT",
    "What will be the output if user enters 49.99 for price = float(input(\"Price: \")); print(price * 2)?",
    "99.98", "49.9949.99", "49.992", "TypeError",
    "", "", "", "", "", "",
    "1", "float() converts input to 49.99 decimal, so 49.99 * 2 equals 99.98.",
    "1.00", "0.00", "Medium"
  ],
  [
    13, "Python", "User Input", "python,input,error", "SINGLECORRECT",
    "What happens if a user enters the text \"abc\" for age = int(input(\"Enter age: \"))?",
    "Python throws a ValueError", "Python converts it to 0", "Python converts it to None", "Python ignores it",
    "", "", "", "", "", "",
    "1", "Trying to convert non-numeric text like \"abc\" into an integer raises a ValueError.",
    "1.00", "0.00", "Medium"
  ],
  [
    14, "Python", "User Input", "python,input,variable", "SINGLECORRECT",
    "Can you store the user's input directly inside a variable?",
    "Yes, by assigning input() to a variable name (e.g. name = input())", "No, input cannot be stored in variables", "Only if it is a number", "Only if it is a single character",
    "", "", "", "", "", "",
    "1", "input() returns a value that can be assigned directly to any variable name.",
    "1.00", "0.00", "Easy"
  ],
  [
    15, "Python", "User Input", "python,input,type_check", "SINGLECORRECT",
    "What will print(type(int(\"100\"))) display?",
    "<class 'int'>", "<class 'str'>", "<class 'float'>", "100",
    "", "", "", "", "", "",
    "1", "int(\"100\") converts string \"100\" to integer 100, so type is <class 'int'>.",
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

const excelPath = path.join(desktopDir, 'User_Input_Quiz_Graphy.xlsx');
const csvPath = path.join(desktopDir, 'User_Input_Quiz_Graphy.csv');

XLSX.writeFile(wb, excelPath);
const csvContent = XLSX.utils.sheet_to_csv(ws);
fs.writeFileSync(csvPath, csvContent);

console.log("Excel saved to:", excelPath);
console.log("CSV saved to:", csvPath);
