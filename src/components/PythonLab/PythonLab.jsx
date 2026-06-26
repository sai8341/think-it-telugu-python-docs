import React, { useState, useRef, useEffect, useCallback } from 'react';
import examples from './examples';

/**
 * PythonLab — Programiz-style Python playground with syntax highlighting.
 * Full-screen, side-by-side, distraction-free.
 */

const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/';

// Python syntax highlighting tokens
const PYTHON_KEYWORDS = new Set([
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await',
  'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
  'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is',
  'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try',
  'while', 'with', 'yield',
]);

const PYTHON_BUILTINS = new Set([
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
function highlightPython(code) {
  const lines = code.split('\n');
  return lines.map(line => highlightLine(line)).join('\n');
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function highlightLine(line) {
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

export default function PythonLab() {
  const [code, setCode] = useState(examples[0].code);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState('Loading Python...');
  const [selectedExample, setSelectedExample] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  
  // Terminal UI State
  const [terminalInput, setTerminalInput] = useState('');
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const resolveInputRef = useRef(null);
  const terminalInputRef = useRef(null);

  const textareaRef = useRef(null);
  const highlightRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const pyodideRef = useRef(null);
  const outputRef = useRef(null);

  // Hide sub-navbar on mount, restore on unmount
  useEffect(() => {
    document.body.classList.add('pylab-active');
    return () => document.body.classList.remove('pylab-active');
  }, []);

  // Set up interactive terminal handlers
  useEffect(() => {
    window.__request_terminal_input = async (promptText) => {
      setOutput(prev => prev + promptText);
      setIsWaitingForInput(true);
      return new Promise((resolve) => {
        resolveInputRef.current = resolve;
        setTimeout(() => {
          if (terminalInputRef.current) {
            terminalInputRef.current.focus();
          }
        }, 50);
      });
    };

    window.__append_output = (text) => {
      setOutput(prev => prev + text);
    };

    return () => {
      delete window.__request_terminal_input;
      delete window.__append_output;
    };
  }, []);

  const handleTerminalInputSubmit = (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput;
      setOutput(prev => prev + val + '\n');
      setTerminalInput('');
      setIsWaitingForInput(false);
      if (resolveInputRef.current) {
        resolveInputRef.current(val);
        resolveInputRef.current = null;
      }
    }
  };

  // Load Pyodide
  useEffect(() => {
    let cancelled = false;
    async function loadPyodide() {
      try {
        setLoadingProgress('Downloading Python runtime...');
        if (!window.loadPyodide) {
          const script = document.createElement('script');
          script.src = `${PYODIDE_CDN}pyodide.js`;
          script.async = true;
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }
        if (cancelled) return;
        setLoadingProgress('Initializing Python 3.11...');
        const pyodide = await window.loadPyodide({ indexURL: PYODIDE_CDN });
        if (cancelled) return;
        pyodideRef.current = pyodide;
        setPyodideReady(true);
      } catch (err) {
        setLoadingProgress('Failed to load Python. Please refresh.');
      }
    }
    loadPyodide();
    return () => { cancelled = true; };
  }, []);

  // Sync scroll between textarea, highlight overlay, and line numbers
  const syncScroll = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    if (highlightRef.current) {
      highlightRef.current.scrollTop = ta.scrollTop;
      highlightRef.current.scrollLeft = ta.scrollLeft;
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = ta.scrollTop;
    }
  }, []);

  // Run code
  const runCode = useCallback(async () => {
    if (!pyodideRef.current || isRunning) return;
    setIsRunning(true);
    setOutput('');
    setActiveTab('output');

    try {
      const pyodide = pyodideRef.current;
      pyodide.runPython(`
import sys
import builtins
import js
from io import StringIO

sys.stdout = StringIO()
sys.stderr = StringIO()

async def __custom_input(prompt=""):
    # Flush stdout first
    js.window.__append_output(sys.stdout.getvalue())
    sys.stdout.truncate(0)
    sys.stdout.seek(0)
    
    res = await js.window.__request_terminal_input(prompt)
    if res is None:
        raise EOFError("EOF")
    return res

def fallback_input(prompt=""):
    js.window.__append_output(sys.stdout.getvalue())
    sys.stdout.truncate(0)
    sys.stdout.seek(0)
    
    res = js.prompt(prompt)
    if res is None:
        raise EOFError("EOF when reading a line")
    js.window.__append_output(prompt + res + "\\n")
    return res

builtins.input = fallback_input
      `);

      try {
        const asyncCode = code.replace(/(^|[^a-zA-Z0-9_.])input\s*\(/g, '$1await __custom_input(');
        await pyodide.runPythonAsync(asyncCode);
      } catch (pyErr) {
        const stderr = pyodide.runPython('sys.stderr.getvalue()');
        const stdout = pyodide.runPython('sys.stdout.getvalue()');
        let err = (stdout || '') + (stderr || pyErr.message || 'An error occurred.');
        setOutput(prev => prev + err);
        setIsRunning(false);
        pyodide.runPython('sys.stdout = sys.__stdout__\nsys.stderr = sys.__stderr__');
        return;
      }

      const stdout = pyodide.runPython('sys.stdout.getvalue()');
      const stderr = pyodide.runPython('sys.stderr.getvalue()');
      pyodide.runPython('sys.stdout = sys.__stdout__\nsys.stderr = sys.__stderr__');

      let finalOutput = (stdout || '') + (stderr || '');
      setOutput(prev => {
        let result = prev + finalOutput;
        if (!result.trim()) result = '(No output — add a print() statement)\n';
        return result + '\n=== Code Execution Successful ===';
      });
    } catch (err) {
      setOutput(prev => prev + `\nError: ${err.message}`);
    }
    setIsRunning(false);
  }, [code, isRunning]);

  // Keyboard handling with proper indentation and auto-closing brackets
  const handleKeyDown = (e) => {
    const ta = e.target;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;

    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
      return;
    }

    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + 4; });
      return;
    }

    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      const lineStart = code.lastIndexOf('\n', start - 1) + 1;
      const linePrefix = code.substring(lineStart, start);
      const spaces = Math.min(4, linePrefix.length - linePrefix.trimStart().length);
      if (spaces > 0) {
        const newCode = code.substring(0, lineStart) + code.substring(lineStart + spaces);
        setCode(newCode);
        requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = Math.max(lineStart, start - spaces); });
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const before = code.substring(0, start);
      const after = code.substring(end);
      const lineStart = before.lastIndexOf('\n') + 1;
      const currentLine = before.substring(lineStart);
      const indent = currentLine.match(/^(\s*)/)[1];
      const trimmed = currentLine.trimEnd();
      let newIndent = indent;
      if (trimmed.endsWith(':')) newIndent = indent + '    ';
      const insertion = '\n' + newIndent;
      setCode(before + insertion + after);
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + insertion.length; });
      return;
    }

    const pairs = { '(': ')', '[': ']', '{': '}', "'": "'", '"': '"' };

    // Step over if typing a closing character that is already right after cursor
    if (Object.values(pairs).includes(e.key) && code[start] === e.key) {
      e.preventDefault();
      ta.selectionStart = ta.selectionEnd = start + 1;
      return;
    }

    // Auto-insert pair
    if (pairs[e.key]) {
      e.preventDefault();
      const before = code.substring(0, start);
      const after = code.substring(end);
      const insertion = e.key + pairs[e.key];
      setCode(before + insertion + after);
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + 1; });
      return;
    }

    if (e.key === 'Backspace' && start === end && start > 0) {
      // Delete empty pairs
      const prevChar = code[start - 1];
      const nextChar = code[start];
      if (pairs[prevChar] && pairs[prevChar] === nextChar) {
        e.preventDefault();
        setCode(code.substring(0, start - 1) + code.substring(end + 1));
        requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start - 1; });
        return;
      }

      // Existing backspace logic for unindenting
      const lineStart = code.lastIndexOf('\n', start - 1) + 1;
      const beforeCursor = code.substring(lineStart, start);
      if (beforeCursor.length > 0 && beforeCursor.trim() === '' && beforeCursor.length % 4 === 0) {
        e.preventDefault();
        setCode(code.substring(0, start - 4) + code.substring(end));
        requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start - 4; });
        return;
      }
    }
  };

  const handleExampleChange = (e) => {
    const idx = parseInt(e.target.value, 10);
    setSelectedExample(idx);
    setCode(examples[idx].code);
    setOutput('');
    setActiveTab('editor');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
    document.body.classList.toggle('pylab-fullscreen-active');
  };

  const lineCount = code.split('\n').length;
  const highlightedCode = highlightPython(code);

  return (
    <div className={`pylab-root ${isFullscreen ? 'pylab-fs' : ''}`}>
      {/* Toolbar Row */}
      <div className="pylab-toolbar2">
        {/* Editor Toolbar */}
        <div className="pylab-toolbar-editor">
          <div className="pylab-toolbar-editor-left">
            <span className="pylab-file-tab2">main.py</span>
            <select
              value={selectedExample}
              onChange={handleExampleChange}
              className="pylab-example-sel"
              title="Load example"
            >
              {examples.map((ex, i) => (
                <option key={i} value={i}>{ex.label}</option>
              ))}
            </select>
          </div>
          <div className="pylab-toolbar-editor-right">
            <button
              className="pylab-fs-btn2"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit full screen' : 'Full screen'}
            >
              {isFullscreen ? '⊡' : '⛶'}
            </button>
            <button
              className="pylab-run-btn2"
              onClick={runCode}
              disabled={!pyodideReady || isRunning}
            >
              {isRunning ? '⏳ Running...' : '▶ Run'}
            </button>
          </div>
        </div>

        {/* Output Toolbar */}
        <div className="pylab-toolbar-output">
          <span className="pylab-output-tab">Output</span>
          <button className="pylab-clear-btn2" onClick={() => setOutput('')}>Clear</button>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="pylab-mobtabs">
        <button className={`pylab-mobtab ${activeTab === 'editor' ? 'active' : ''}`} onClick={() => setActiveTab('editor')}>
          main.py
        </button>
        <button className={`pylab-mobtab pylab-mobrun`} onClick={runCode} disabled={!pyodideReady || isRunning}>
          {isRunning ? '⏳' : '▶ Run'}
        </button>
        <button className={`pylab-mobtab ${activeTab === 'output' ? 'active' : ''}`} onClick={() => setActiveTab('output')}>
          Output
        </button>
      </div>

      {/* Split Workspace */}
      <div className="pylab-workspace2">
        {/* Editor */}
        <div className={`pylab-editor2 ${activeTab === 'editor' ? 'pylab-vis' : ''}`}>
          <div className="pylab-linenum" ref={lineNumbersRef}>
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <div className="pylab-editor-inner">
            {/* Syntax-highlighted overlay */}
            <pre
              className="pylab-highlight"
              ref={highlightRef}
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: highlightedCode + '\n' }}
            />
            {/* Invisible textarea for input */}
            <textarea
              ref={textareaRef}
              className="pylab-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              onScroll={syncScroll}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              wrap="off"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="pylab-divider2"></div>

        {/* Output */}
        <div className={`pylab-output2 ${activeTab === 'output' ? 'pylab-vis' : ''}`} ref={outputRef}>
          {!pyodideReady && (
            <div className="pylab-loader">
              <div className="pylab-spin"></div>
              <span>{loadingProgress}</span>
            </div>
          )}
          {pyodideReady && !output && !isRunning && (
            <div className="pylab-loader pylab-idle">
              Click <strong>▶ Run</strong> or press <strong>Ctrl+Enter</strong>
            </div>
          )}
          {isRunning && (
            <div className="pylab-loader">
              <div className="pylab-spin"></div>
              <span>Executing...</span>
            </div>
          )}
          {output && (
            <pre className="pylab-out-text" onClick={() => terminalInputRef.current?.focus()}>
              {output}
              {isWaitingForInput && (
                <input
                  ref={terminalInputRef}
                  type="text"
                  className="pylab-term-input"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={handleTerminalInputSubmit}
                  autoFocus
                  spellCheck={false}
                  autoCapitalize="off"
                  autoComplete="off"
                />
              )}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
