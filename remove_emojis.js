const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (filePath.endsWith('.md') || filePath.endsWith('.mdx') || filePath.endsWith('.js')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const dirsToProcess = [
  path.join(__dirname, 'docs'),
  path.join(__dirname, 'src')
];

let files = [];
dirsToProcess.forEach(dir => {
  if (fs.existsSync(dir)) {
    files = getFiles(dir, files);
  }
});

// Adding sidebars.js just in case
files.push(path.join(__dirname, 'sidebars.js'));
files.push(path.join(__dirname, 'docusaurus.config.js'));

const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content.replace(emojiRegex, '');
    if (content !== newContent) {
      fs.writeFileSync(file, newContent, 'utf8');
      console.log('Cleaned emojis from:', file);
    }
  }
});
