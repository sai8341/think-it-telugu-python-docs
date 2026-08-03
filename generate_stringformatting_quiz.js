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
    1, "Python", "String Formatting", "python,fstring,basics", "SINGLECORRECT",
    "What prefix letter is placed before a quotation mark to create an f-string in Python?",
    "f (or F)", "s", "format", "r",
    "", "", "", "", "", "",
    "1", "Placing the letter 'f' or 'F' before quotation marks designates the string as an f-string.",
    "1.00", "0.00", "Easy"
  ],
  [
    2, "Python", "String Formatting", "python,fstring,syntax", "SINGLECORRECT",
    "Which brackets are used to inject variables inside an f-string?",
    "Curly brackets {}", "Square brackets []", "Parentheses ()", "Angle brackets <>",
    "", "", "", "", "", "",
    "1", "Variables and expressions are placed inside curly brackets {} within f-strings.",
    "1.00", "0.00", "Easy"
  ],
  [
    3, "Python", "String Formatting", "python,fstring,output", "SINGLECORRECT",
    "What will be the output of name = \"Sai\"; print(f\"Hello {name}\")?",
    "Hello Sai", "Hello {name}", "Hello name", "SyntaxError",
    "", "", "", "", "", "",
    "1", "Python evaluates {name} inside the f-string and replaces it with its value 'Sai'.",
    "1.00", "0.00", "Easy"
  ],
  [
    4, "Python", "String Formatting", "python,fstring,error", "SINGLECORRECT",
    "What happens if you write print(\"Hello {name}\") WITHOUT putting the 'f' prefix?",
    "It prints 'Hello {name}' literally", "It replaces {name} with variable value", "It throws a SyntaxError", "It prints Nothing",
    "", "", "", "", "", "",
    "1", "Without the 'f' prefix, Python treats {name} as plain literal text.",
    "1.00", "0.00", "Easy"
  ],
  [
    5, "Python", "String Formatting", "python,fstring,decimals", "SINGLECORRECT",
    "Which format specifier inside an f-string rounds a float number to 2 decimal places?",
    ":.2f", ":2d", ":round2", ".2float",
    "", "", "", "", "", "",
    "1", "The specifier :.2f formats floating-point numbers to exactly 2 decimal places.",
    "1.00", "0.00", "Medium"
  ],
  [
    6, "Python", "String Formatting", "python,fstring,decimals_output", "SINGLECORRECT",
    "What is the output of price = 19.995; print(f\"${price:.2f}\")?",
    "$20.00", "$19.995", "$19.99", "$20.0",
    "", "", "", "", "", "",
    "1", ":.2f rounds 19.995 to 2 decimal places, producing '$20.00'.",
    "1.00", "0.00", "Medium"
  ],
  [
    7, "Python", "String Formatting", "python,fstring,expressions", "SINGLECORRECT",
    "Can you perform mathematical expressions directly inside curly brackets in an f-string (e.g. f\"{5 * 5}\")?",
    "Yes, Python evaluates expressions inside {} directly", "No, only single variable names are allowed", "Only addition is supported", "It raises a SyntaxError",
    "", "", "", "", "", "",
    "1", "Python evaluates any valid expression written inside curly brackets {} in an f-string.",
    "1.00", "0.00", "Easy"
  ],
  [
    8, "Python", "String Formatting", "python,fstring,expressions_output", "SINGLECORRECT",
    "What will be the output of print(f\"Total: {10 + 20}\")?",
    "Total: 30", "Total: 10 + 20", "Total: {30}", "SyntaxError",
    "", "", "", "", "", "",
    "1", "The expression 10 + 20 evaluates to 30 inside the f-string.",
    "1.00", "0.00", "Easy"
  ],
  [
    9, "Python", "String Formatting", "python,fstring,advantage", "SINGLECORRECT",
    "Why are f-strings preferred over traditional string concatenation using + ?",
    "They are cleaner to read and faster to execute", "They require less memory", "They only work with numbers", "They automatically save files to disk",
    "", "", "", "", "", "",
    "1", "F-strings provide a cleaner, more readable syntax and are significantly faster than older methods.",
    "1.00", "0.00", "Easy"
  ],
  [
    10, "Python", "String Formatting", "python,fstring,multiple_vars", "SINGLECORRECT",
    "What is the output of name = \"Alice\"; age = 20; print(f\"{name} is {age} years old\")?",
    "Alice is 20 years old", "{name} is {age} years old", "Alice is age years old", "TypeError",
    "", "", "", "", "", "",
    "1", "Multiple variables inside {} are each replaced with their corresponding values.",
    "1.00", "0.00", "Easy"
  ],
  [
    11, "Python", "String Formatting", "python,fstring,multiline", "SINGLECORRECT",
    "How can you create a multi-line f-string in Python?",
    "Using triple quotes f\"\"\"...\"\"\" or f'''...'''", "Using single quotes f'...' with \\m", "Using double f-strings f\"f\"...", "It is impossible",
    "", "", "", "", "", "",
    "1", "Triple quotes f\"\"\"...\"\"\" allow f-strings to span across multiple lines.",
    "1.00", "0.00", "Easy"
  ],
  [
    12, "Python", "String Formatting", "python,fstring,functions", "SINGLECORRECT",
    "What is the output of word = \"python\"; print(f\"{word.upper()}\")?",
    "PYTHON", "python", "Word.upper()", "SyntaxError",
    "", "", "", "", "", "",
    "1", "String methods like .upper() can be called inside curly brackets {} in f-strings.",
    "1.00", "0.00", "Medium"
  ],
  [
    13, "Python", "String Formatting", "python,fstring,type_casting", "SINGLECORRECT",
    "Do you need to explicitly convert integers to strings (e.g. str(score)) when using f-strings?",
    "No, f-strings handle variable type conversions automatically", "Yes, str() is mandatory", "Only for float numbers", "Only for Booleans",
    "", "", "", "", "", "",
    "1", "F-strings automatically convert non-string variables into string representation inside {}.",
    "1.00", "0.00", "Easy"
  ],
  [
    14, "Python", "String Formatting", "python,fstring,quotes", "SINGLECORRECT",
    "Which of the following is a valid f-string declaration?",
    "f\"User score: {score}\"", "\"f User score: {score}\"", "format(\"User score: {score}\")", "f[User score: {score}]",
    "", "", "", "", "", "",
    "1", "The f prefix must immediately precede the opening quotation mark.",
    "1.00", "0.00", "Easy"
  ],
  [
    15, "Python", "String Formatting", "python,fstring,summary", "SINGLECORRECT",
    "In Python 3.6+, what is the recommended standard for string formatting?",
    "f-strings (Formatted String Literals)", "% operator formatting", "str.format() method", "Manual string concatenation",
    "", "", "", "", "", "",
    "1", "F-strings are the modern PEP 498 standard and recommended best practice in Python 3.6+.",
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

const excelPath = path.join(desktopDir, 'String_Formatting_Quiz_Graphy.xlsx');
const csvPath = path.join(desktopDir, 'String_Formatting_Quiz_Graphy.csv');

XLSX.writeFile(wb, excelPath);
const csvContent = XLSX.utils.sheet_to_csv(ws);
fs.writeFileSync(csvPath, csvContent);

console.log("Excel saved to:", excelPath);
console.log("CSV saved to:", csvPath);
