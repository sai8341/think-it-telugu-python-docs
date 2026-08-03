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
    1, "Python", "elif Chains", "python,conditionals,elif,basics", "SINGLECORRECT",
    "What is the full form of 'elif' in Python?",
    "else if", "element if", "error if", "execute if",
    "", "", "", "", "", "",
    "1", "'elif' in Python stands for 'else if'.",
    "1.00", "0.00", "Easy"
  ],
  [
    2, "Python", "elif Chains", "python,conditionals,elif,syntax", "SINGLECORRECT",
    "When does Python check an 'elif' condition?",
    "Only if all conditions before it are False", "Before checking the main 'if' condition", "Always, no matter what", "Only when the code stops",
    "", "", "", "", "", "",
    "1", "Python checks an 'elif' condition only when all previous conditions before it are False.",
    "1.00", "0.00", "Easy"
  ],
  [
    3, "Python", "elif Chains", "python,conditionals,elif,execution", "SINGLECORRECT",
    "What happens when Python finds a True condition in an if-elif-else chain?",
    "It runs that block and skips all remaining elif and else blocks", "It checks all other conditions too", "It shows an error", "It runs the code twice",
    "", "", "", "", "", "",
    "1", "Once Python finds a True condition, it runs that block and skips everything else in the chain.",
    "1.00", "0.00", "Easy"
  ],
  [
    4, "Python", "elif Chains", "python,conditionals,elif,syntax", "SINGLECORRECT",
    "How many 'elif' blocks can you write in one conditional statement?",
    "As many as you want (unlimited)", "Only 1", "Maximum 3", "Exactly 2",
    "", "", "", "", "", "",
    "1", "You can write any number of 'elif' blocks to check multiple choices.",
    "1.00", "0.00", "Easy"
  ],
  [
    5, "Python", "elif Chains", "python,conditionals,elif,syntax", "SINGLECORRECT",
    "Is it mandatory to put an 'else' block at the end of an 'elif' chain?",
    "No, the 'else' block is optional", "Yes, 'else' is always required", "Yes, otherwise Python gives an error", "Only when comparing numbers",
    "", "", "", "", "", "",
    "1", "The 'else' block is optional. An if-elif chain works fine without an 'else' block.",
    "1.00", "0.00", "Easy"
  ],
  [
    6, "Python", "elif Chains", "python,conditionals,elif,output", "SINGLECORRECT",
    "What will be the output of this code?\nmarks = 85\nif marks >= 90:\n    print('A')\nelif marks >= 75:\n    print('B')\nelif marks >= 50:\n    print('C')\nelse:\n    print('F')",
    "B", "A", "C", "F",
    "", "", "", "", "", "",
    "1", "85 >= 90 is False. But 85 >= 75 is True, so 'B' is printed.",
    "1.00", "0.00", "Easy"
  ],
  [
    7, "Python", "elif Chains", "python,conditionals,elif,order-matters", "SINGLECORRECT",
    "Why is the order of conditions important in an if-elif chain?",
    "Because Python checks conditions from top to bottom and stops at the first True condition", "Because Python checks conditions from bottom to top", "Because elif blocks run in random order", "Because code only runs from right to left",
    "", "", "", "", "", "",
    "1", "Order matters because Python checks from top to bottom and stops checking as soon as it finds a True condition.",
    "1.00", "0.00", "Medium"
  ],
  [
    8, "Python", "elif Chains", "python,conditionals,elif,output", "SINGLECORRECT",
    "What will be printed?\nsignal = 'green'\nif signal == 'red':\n    print('Stop')\nelif signal == 'yellow':\n    print('Wait')\nelif signal == 'green':\n    print('Go')\nelse:\n    print('Invalid')",
    "Go", "Stop", "Wait", "Invalid",
    "", "", "", "", "", "",
    "1", "signal == 'green' is True, so Python prints 'Go'.",
    "1.00", "0.00", "Easy"
  ],
  [
    9, "Python", "elif Chains", "python,conditionals,elif,output", "SINGLECORRECT",
    "What will be printed?\nval = -5\nif val > 0:\n    print('Positive')\nelif val < 0:\n    print('Negative')\nelse:\n    print('Zero')",
    "Negative", "Positive", "Zero", "None",
    "", "", "", "", "", "",
    "1", "-5 > 0 is False. But -5 < 0 is True, so Python prints 'Negative'.",
    "1.00", "0.00", "Easy"
  ],
  [
    10, "Python", "elif Chains", "python,conditionals,elif,output", "SINGLECORRECT",
    "What will be printed?\nval = 0\nif val > 0:\n    print('Positive')\nelif val < 0:\n    print('Negative')\nelse:\n    print('Zero')",
    "Zero", "Positive", "Negative", "SyntaxError",
    "", "", "", "", "", "",
    "1", "Both 0 > 0 and 0 < 0 are False. So Python runs the 'else' block and prints 'Zero'.",
    "1.00", "0.00", "Easy"
  ],
  [
    11, "Python", "elif Chains", "python,conditionals,elif,syntax", "SINGLECORRECT",
    "Which keyword cannot be written alone without an 'if' statement before it?",
    "elif", "if", "print", "def",
    "", "", "", "", "", "",
    "1", "'elif' must always come after an 'if' statement. It cannot be used alone.",
    "1.00", "0.00", "Medium"
  ],
  [
    12, "Python", "elif Chains", "python,conditionals,elif,logic", "SINGLECORRECT",
    "If x = 10, what will be printed?\nif x > 5:\n    print('One')\nelif x > 2:\n    print('Two')\nelse:\n    print('Three')",
    "One", "Two", "One Two", "Three",
    "", "", "", "", "", "",
    "1", "x > 5 is True, so Python prints 'One' and skips 'elif x > 2'.",
    "1.00", "0.00", "Medium"
  ],
  [
    13, "Python", "elif Chains", "python,conditionals,elif,logic", "SINGLECORRECT",
    "What is the problem with this code order?\nif marks >= 50:\n    print('Pass')\nelif marks >= 90:\n    print('Top')",
    "A student with 95 marks gets 'Pass' instead of 'Top' because marks >= 50 is checked first", "It gives a SyntaxError", "It gives an IndentationError", "It gives a TypeError",
    "", "", "", "", "", "",
    "1", "Top-to-bottom checking will trigger 'marks >= 50' first for 95 marks.",
    "1.00", "0.00", "Medium"
  ],
  [
    14, "Python", "elif Chains", "python,conditionals,elif,syntax", "SINGLECORRECT",
    "Which of the following is the correct syntax for an 'elif' statement in Python?",
    "elif condition:", "else if condition:", "elseif condition:", "elif (condition)",
    "", "", "", "", "", "",
    "1", "Python uses the exact keyword 'elif' followed by the condition and a colon (:).",
    "1.00", "0.00", "Easy"
  ],
  [
    15, "Python", "elif Chains", "python,conditionals,elif,output", "SINGLECORRECT",
    "What will be printed?\nnum = 15\nif num < 10:\n    print('Small')\nelif num < 20:\n    print('Medium')\nelif num < 30:\n    print('Large')",
    "Medium", "Small", "Large", "Medium Large",
    "", "", "", "", "", "",
    "1", "15 < 10 is False. But 15 < 20 is True, so 'Medium' is printed.",
    "1.00", "0.00", "Easy"
  ],
  [
    16, "Python", "elif Chains", "python,conditionals,elif,mistakes", "SINGLECORRECT",
    "What error occurs if you place an 'else' block BEFORE an 'elif' block?",
    "SyntaxError", "IndentationError", "NameError", "TypeError",
    "", "", "", "", "", "",
    "1", "Putting 'else' before 'elif' causes a SyntaxError because 'else' must always be at the very end.",
    "1.00", "0.00", "Medium"
  ],
  [
    17, "Python", "elif Chains", "python,conditionals,elif,output", "SINGLECORRECT",
    "What will be printed?\nx = 100\nif x < 50:\n    print('Low')\nelif x < 80:\n    print('Mid')\nelif x < 99:\n    print('High')",
    "Nothing (No output)", "Low", "Mid", "High",
    "", "", "", "", "", "",
    "1", "All conditions are False. Since there is no 'else' block, nothing is printed.",
    "1.00", "0.00", "Medium"
  ],
  [
    18, "Python", "elif Chains", "python,conditionals,elif,multiple-if", "SINGLECORRECT",
    "What is the main difference between multiple 'if' statements and an 'if-elif' chain?",
    "Multiple 'if' statements check every condition, but 'if-elif' stops at the first True condition", "They run in reverse order", "Multiple 'if' statements run faster", "There is no difference",
    "", "", "", "", "", "",
    "1", "Multiple 'if' statements evaluate every condition, whereas 'if-elif' stops as soon as one condition is True.",
    "1.00", "0.00", "Medium"
  ],
  [
    19, "Python", "elif Chains", "python,conditionals,elif,strings", "SINGLECORRECT",
    "What will be printed?\nrole = 'admin'\nif role == 'user':\n    print('Limited Access')\nelif role == 'admin':\n    print('Full Access')\nelse:\n    print('No Access')",
    "Full Access", "Limited Access", "No Access", "SyntaxError",
    "", "", "", "", "", "",
    "1", "role == 'admin' is True, so 'Full Access' is printed.",
    "1.00", "0.00", "Easy"
  ],
  [
    20, "Python", "elif Chains", "python,conditionals,elif,comparison", "SINGLECORRECT",
    "What will be printed?\nscore = 45\nif score >= 90:\n    print('Gold')\nelif score >= 70:\n    print('Silver')\nelif score >= 50:\n    print('Bronze')\nelse:\n    print('No Medal')",
    "No Medal", "Bronze", "Silver", "Gold",
    "", "", "", "", "", "",
    "1", "45 is less than 90, 70, and 50. So the 'else' block runs and prints 'No Medal'.",
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

const excelPath = path.join(desktopDir, 'Elif_Chains_Quiz_Graphy.xlsx');
const csvPath = path.join(desktopDir, 'Elif_Chains_Quiz_Graphy.csv');

XLSX.writeFile(wb, excelPath);
const csvContent = XLSX.utils.sheet_to_csv(ws);
fs.writeFileSync(csvPath, csvContent);

console.log("Excel saved to:", excelPath);
console.log("CSV saved to:", csvPath);
