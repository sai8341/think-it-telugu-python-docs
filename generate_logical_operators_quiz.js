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
    1, "Python", "Logical Operators", "python,operators,logical,and", "SINGLECORRECT",
    "What will be the output of print(True and True)?",
    "True", "False", "None", "SyntaxError",
    "", "", "", "", "", "",
    "1", "The 'and' operator returns True only if both conditions are True.",
    "1.00", "0.00", "Easy"
  ],
  [
    2, "Python", "Logical Operators", "python,operators,logical,and", "SINGLECORRECT",
    "What will be the output of print(True and False)?",
    "True", "False", "None", "TypeError",
    "", "", "", "", "", "",
    "2", "For 'and' operator, if any single condition is False, the entire result is False.",
    "1.00", "0.00", "Easy"
  ],
  [
    3, "Python", "Logical Operators", "python,operators,logical,or", "SINGLECORRECT",
    "What will be the output of print(False or True)?",
    "False", "True", "None", "TypeError",
    "", "", "", "", "", "",
    "2", "The 'or' operator returns True if at least one of the conditions is True.",
    "1.00", "0.00", "Easy"
  ],
  [
    4, "Python", "Logical Operators", "python,operators,logical,or", "SINGLECORRECT",
    "What will be the output of print(False or False)?",
    "True", "False", "0", "None",
    "", "", "", "", "", "",
    "2", "The 'or' operator returns False only when all conditions are False.",
    "1.00", "0.00", "Easy"
  ],
  [
    5, "Python", "Logical Operators", "python,operators,logical,not", "SINGLECORRECT",
    "What will be the output of print(not True)?",
    "True", "False", "None", "SyntaxError",
    "", "", "", "", "", "",
    "2", "The 'not' operator flips True to False.",
    "1.00", "0.00", "Easy"
  ],
  [
    6, "Python", "Logical Operators", "python,operators,logical,not", "SINGLECORRECT",
    "What will be the output of print(not False)?",
    "True", "False", "1", "None",
    "", "", "", "", "", "",
    "1", "The 'not' operator flips False to True.",
    "1.00", "0.00", "Easy"
  ],
  [
    7, "Python", "Logical Operators", "python,operators,syntax", "SINGLECORRECT",
    "Which of the following is the correct syntax for logical AND in Python?",
    "AND", "and", "&&", "&",
    "", "", "", "", "", "",
    "2", "In Python, logical operators must be written in lowercase (and, or, not).",
    "1.00", "0.00", "Easy"
  ],
  [
    8, "Python", "Logical Operators", "python,operators,errors", "SINGLECORRECT",
    "What happens if you write print(True AND False) with capital letters?",
    "Outputs False", "Outputs True", "Raises NameError", "Raises TypeError",
    "", "", "", "", "", "",
    "3", "Python keywords are case-sensitive. 'AND' is treated as an undefined variable name, causing NameError.",
    "1.00", "0.00", "Medium"
  ],
  [
    9, "Python", "Logical Operators", "python,operators,logical", "SINGLECORRECT",
    "What will be the output of: a = True; b = True; print(a and b)?",
    "True", "False", "a and b", "NameError",
    "", "", "", "", "", "",
    "1", "Both variables 'a' and 'b' are True, so 'a and b' evaluates to True.",
    "1.00", "0.00", "Easy"
  ],
  [
    10, "Python", "Logical Operators", "python,operators,logical,nested", "SINGLECORRECT",
    "What will be the output of: print(not (True or False))?",
    "True", "False", "None", "SyntaxError",
    "", "", "", "", "", "",
    "2", "(True or False) evaluates to True. Then 'not True' flips it to False.",
    "1.00", "0.00", "Medium"
  ],
  [
    11, "Python", "Logical Operators", "python,operators,logical,nested", "SINGLECORRECT",
    "What will be the output of: print(not (False and True))?",
    "True", "False", "0", "TypeError",
    "", "", "", "", "", "",
    "1", "(False and True) evaluates to False. Then 'not False' flips it to True.",
    "1.00", "0.00", "Medium"
  ],
  [
    12, "Python", "Logical Operators", "python,operators,precedence", "SINGLECORRECT",
    "Which operator has the highest precedence among logical operators in Python?",
    "or", "and", "not", "All have equal precedence",
    "", "", "", "", "", "",
    "3", "In Python, 'not' has the highest precedence, followed by 'and', and lastly 'or'.",
    "1.00", "0.00", "Medium"
  ],
  [
    13, "Python", "Logical Operators", "python,operators,precedence", "SINGLECORRECT",
    "What will be the output of: print(True or False and False)?",
    "False", "True", "SyntaxError", "None",
    "", "", "", "", "", "",
    "2", "'and' executes first: (False and False) is False. Then (True or False) evaluates to True.",
    "1.00", "0.00", "Medium"
  ],
  [
    14, "Python", "Logical Operators", "python,operators,precedence", "SINGLECORRECT",
    "What will be the output of: print(not True or True)?",
    "False", "True", "SyntaxError", "None",
    "", "", "", "", "", "",
    "2", "'not' executes first: (not True) is False. Then (False or True) evaluates to True.",
    "1.00", "0.00", "Medium"
  ],
  [
    15, "Python", "Logical Operators", "python,operators,logical", "SINGLECORRECT",
    "If has_ticket = True and has_id = False, what does (has_ticket and has_id) evaluate to?",
    "True", "False", "None", "TypeError",
    "", "", "", "", "", "",
    "2", "Since one condition (has_id) is False, the 'and' condition evaluates to False.",
    "1.00", "0.00", "Easy"
  ],
  [
    16, "Python", "Logical Operators", "python,operators,logical", "SINGLECORRECT",
    "If is_holiday = False and is_weekend = True, what does (is_holiday or is_weekend) evaluate to?",
    "True", "False", "None", "TypeError",
    "", "", "", "", "", "",
    "1", "Since at least one condition (is_weekend) is True, the 'or' condition evaluates to True.",
    "1.00", "0.00", "Easy"
  ],
  [
    17, "Python", "Logical Operators", "python,operators,not", "SINGLECORRECT",
    "What will be the output of: print(not not True)?",
    "False", "True", "SyntaxError", "TypeError",
    "", "", "", "", "", "",
    "2", "'not True' becomes False, and then 'not False' flips back to True.",
    "1.00", "0.00", "Medium"
  ],
  [
    18, "Python", "Logical Operators", "python,operators,rules", "SINGLECORRECT",
    "What does the 'or' operator return if ALL given conditions are False?",
    "True", "False", "None", "SyntaxError",
    "", "", "", "", "", "",
    "2", "The 'or' operator returns False only when every condition evaluated is False.",
    "1.00", "0.00", "Easy"
  ],
  [
    19, "Python", "Logical Operators", "python,operators,rules", "SINGLECORRECT",
    "What does the 'and' operator return if ALL given conditions are True?",
    "True", "False", "1", "None",
    "", "", "", "", "", "",
    "1", "The 'and' operator returns True when every condition evaluated is True.",
    "1.00", "0.00", "Easy"
  ],
  [
    20, "Python", "Logical Operators", "python,operators,not", "SINGLECORRECT",
    "What will be the output of: a = False; print(not a)?",
    "False", "True", "not a", "NameError",
    "", "", "", "", "", "",
    "2", "Since 'a' is False, 'not a' flips it to True.",
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
XLSX.utils.book_append_sheet(wb, ws, "Logical_Operators_Quiz");

const excelPath = path.join(desktopDir, "Logical_Operators_Quiz_Graphy.xlsx");
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

const csvPath = path.join(desktopDir, "Logical_Operators_Quiz_Graphy.csv");
fs.writeFileSync(csvPath, csvContent, 'utf8');
console.log(`Graphy Format CSV generated: ${csvPath}`);
