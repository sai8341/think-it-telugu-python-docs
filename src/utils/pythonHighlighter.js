// Python syntax highlighting tokens
export const PYTHON_KEYWORDS = new Set([
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await',
  'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
  'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is',
  'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try',
  'while', 'with', 'yield',
]);

export const PYTHON_BUILTINS = new Set([
  'print', 'range', 'len', 'type', 'int', 'float', 'str', 'bool',
  'list', 'dict', 'set', 'tuple', 'input', 'abs', 'max', 'min',
  'sum', 'sorted', 'enumerate', 'zip', 'map', 'filter', 'open',
  'super', 'isinstance', 'issubclass', 'hasattr', 'getattr', 'setattr',
  'round', 'format', 'repr', 'hex', 'oct', 'bin', 'ord', 'chr',
]);

/**
 * Simple Python syntax highlighter.
 * Returns HTML string with <span> tags for colored tokens.
 */
export function highlightPython(code) {
  const lines = code.split('\n');
  return lines.map(line => highlightLine(line)).join('\n');
}

export function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function findInputsInCode(sourceCode) {
  const regex = /input\s*\(\s*(?:(['"])(.*?)\1)?\s*\)/g;
  const prompts = [];
  let match;
  while ((match = regex.exec(sourceCode)) !== null) {
    const promptText = match[2] || "Input";
    prompts.push(promptText);
  }
  return prompts;
}

export function highlightLine(line) {
  let result = '';
  let i = 0;

  while (i < line.length) {
    // Comments
    if (line[i] === '#') {
      result += `<span class="pyhl-comment">${escapeHtml(line.slice(i))}</span>`;
      break;
    }

    // Strings (double or single quotes, including triple quotes)
    if (line[i] === '"' || line[i] === "'") {
      const quote = line[i];
      let end = i + 1;
      // Check for triple quotes
      if (line.slice(i, i + 3) === quote.repeat(3)) {
        end = i + 3;
        while (end < line.length && line.slice(end, end + 3) !== quote.repeat(3)) {
          if (line[end] === '\\') end++;
          end++;
        }
        end = Math.min(end + 3, line.length);
      } else {
        while (end < line.length && line[end] !== quote) {
          if (line[end] === '\\') end++;
          end++;
        }
        if (end < line.length) end++;
      }
      result += `<span class="pyhl-string">${escapeHtml(line.slice(i, end))}</span>`;
      i = end;
      continue;
    }

    // f-strings
    if ((line[i] === 'f' || line[i] === 'F') && i + 1 < line.length && (line[i + 1] === '"' || line[i + 1] === "'")) {
      const quote = line[i + 1];
      let end = i + 2;
      while (end < line.length && line[end] !== quote) {
        if (line[end] === '\\') end++;
        end++;
      }
      if (end < line.length) end++;
      result += `<span class="pyhl-string">${escapeHtml(line.slice(i, end))}</span>`;
      i = end;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(line[i]) && (i === 0 || /[\s(,=+\-*/%<>:[\]!&|^~]/.test(line[i - 1]))) {
      let end = i;
      while (end < line.length && /[0-9.xXoObBeE_]/.test(line[end])) end++;
      result += `<span class="pyhl-number">${escapeHtml(line.slice(i, end))}</span>`;
      i = end;
      continue;
    }

    // Words (identifiers, keywords, builtins)
    if (/[a-zA-Z_]/.test(line[i])) {
      let end = i;
      while (end < line.length && /[a-zA-Z0-9_]/.test(line[end])) end++;
      const word = line.slice(i, end);

      if (PYTHON_KEYWORDS.has(word)) {
        result += `<span class="pyhl-keyword">${escapeHtml(word)}</span>`;
      } else if (PYTHON_BUILTINS.has(word)) {
        result += `<span class="pyhl-builtin">${escapeHtml(word)}</span>`;
      } else if (end < line.length && line[end] === '(') {
        result += `<span class="pyhl-func">${escapeHtml(word)}</span>`;
      } else if (word === 'self') {
        result += `<span class="pyhl-self">${escapeHtml(word)}</span>`;
      } else {
        result += escapeHtml(word);
      }
      i = end;
      continue;
    }

    // Decorators
    if (line[i] === '@') {
      let end = i + 1;
      while (end < line.length && /[a-zA-Z0-9_.]/.test(line[end])) end++;
      result += `<span class="pyhl-decorator">${escapeHtml(line.slice(i, end))}</span>`;
      i = end;
      continue;
    }

    // Operators
    if ('=+-*/<>!&|^~%'.includes(line[i])) {
      result += `<span class="pyhl-operator">${escapeHtml(line[i])}</span>`;
      i++;
      continue;
    }

    // Everything else
    result += escapeHtml(line[i]);
    i++;
  }

  // Ensure empty lines still have height
  return result || ' ';
}

