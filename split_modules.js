const fs = require('fs');
const path = require('path');

const part3Path = path.join(__dirname, 'docs', 'part-3');

const modulesToSplit = [
  {
    file: 'module-13-error-handling.md',
    dir: 'module-13-error-handling',
    splits: [
      { prefix: '## 13.1', out: '1-what-are-errors.mdx', title: 'What are Errors?' },
      { prefix: '## 13.2', out: '2-syntax-errors.mdx', title: 'Syntax Errors' },
      { prefix: '## 13.3', out: '3-runtime-errors.mdx', title: 'Runtime Errors (Exceptions)' },
      { prefix: '## 13.4', out: '4-try-except.mdx', title: 'Using try and except' },
      { prefix: '## 13.5', out: '5-finally-block.mdx', title: 'The finally Block' },
      { prefix: '## 13.6', out: '6-raising-exceptions.mdx', title: 'Raising Exceptions' },
      { prefix: '## 13.7', out: '7-exercises-qa.mdx', title: 'Exercises & QA' },
      { prefix: '## 13.8', out: null }, // Combine with 7
      { prefix: '## 13.9', out: null }  // Combine with 7
    ]
  },
  {
    file: 'module-14-file-handling.md',
    dir: 'module-14-file-handling',
    splits: [
      { prefix: '## 14.1', out: '1-what-is-a-file.mdx', title: 'What is a File?' },
      { prefix: '## 14.2', out: '2-reading-files.mdx', title: 'Reading Files' },
      { prefix: '## 14.3', out: '3-writing-appending.mdx', title: 'Writing & Appending' },
      { prefix: '## 14.4', out: null },
      { prefix: '## 14.5', out: null }
    ]
  },
  {
    file: 'module-15-json.md',
    dir: 'module-15-json',
    splits: [
      { prefix: '## 15.1', out: '1-what-is-json.mdx', title: 'What is JSON?' },
      { prefix: '## 15.2', out: '2-json-structure.mdx', title: 'JSON Structure' },
      { prefix: '## 15.3', out: '3-reading-writing.mdx', title: 'Reading & Writing JSON' },
      { prefix: '## 15.4', out: null },
      { prefix: '## 15.5', out: '4-ai-uses-json.mdx', title: 'Why AI Uses JSON' }
    ]
  }
];

modulesToSplit.forEach(mod => {
  const filePath = path.join(part3Path, mod.file);
  const dirPath = path.join(part3Path, mod.dir);
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const sections = content.split(/\n(?=## \d+\.\d+ )/);
  
  let currentOutFile = null;
  let currentContent = '';
  let currentTitle = '';
  
  sections.forEach((sec, index) => {
    // The very first section is the intro, we can put it in the first file or create an intro file.
    // Let's create an intro file for the intro part.
    if (index === 0) {
      const introMatch = sec.match(/# (.*)/);
      const title = introMatch ? introMatch[1] : 'Introduction';
      const introContent = `---\ntitle: "${title}"\nsidebar_label: "Introduction"\n---\n\n` + sec.replace(/---[\s\S]*?---/, '').trim();
      fs.writeFileSync(path.join(dirPath, '0-intro.mdx'), introContent);
      return;
    }
    
    // Find matching prefix
    let matchedSplit = null;
    for (const split of mod.splits) {
      if (sec.startsWith(split.prefix)) {
        matchedSplit = split;
        break;
      }
    }
    
    if (matchedSplit && matchedSplit.out) {
      // Save previous if exists
      if (currentOutFile) {
        fs.writeFileSync(path.join(dirPath, currentOutFile), `---\ntitle: "${currentTitle}"\nsidebar_label: "${currentTitle}"\n---\n\n` + currentContent.trim());
      }
      currentOutFile = matchedSplit.out;
      currentTitle = matchedSplit.title;
      currentContent = sec;
    } else if (currentOutFile) {
      // Append to current
      currentContent += '\n\n' + sec;
    }
  });
  
  // Save the last one
  if (currentOutFile) {
    fs.writeFileSync(path.join(dirPath, currentOutFile), `---\ntitle: "${currentTitle}"\nsidebar_label: "${currentTitle}"\n---\n\n` + currentContent.trim());
  }
  
  // Delete original file
  fs.unlinkSync(filePath);
  console.log(`Processed and deleted: ${mod.file}`);
});
