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
  const [hasError, setHasError] = useState(false);
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

  // Debug State
  const [isDebugging, setIsDebugging] = useState(false);
  const [debugSteps, setDebugSteps] = useState([]);
  const [debugStepIndex, setDebugStepIndex] = useState(-1);
  const [isDebugPlaying, setIsDebugPlaying] = useState(false);
  const [debugError, setDebugError] = useState('');
  const MAX_DEBUG_STEPS = 500;

  const textareaRef = useRef(null);
  const highlightRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const pyodideRef = useRef(null);
  const outputRef = useRef(null);
  const debugCodeRef = useRef(null);

  // Hide sub-navbar on mount, restore on unmount
  useEffect(() => {
    document.body.classList.add('pylab-active');
    return () => document.body.classList.remove('pylab-active');
  }, []);

  // Load from local storage on mount
  useEffect(() => {
    const savedCode = localStorage.getItem('pylab_saved_code');
    const savedExampleIdx = localStorage.getItem('pylab_selected_example_idx');
    
    if (savedCode !== null) {
      setCode(savedCode);
    }
    if (savedExampleIdx !== null) {
      setSelectedExample(parseInt(savedExampleIdx, 10));
    }
  }, []);

  // Save changes to local storage
  useEffect(() => {
    localStorage.setItem('pylab_saved_code', code);
    localStorage.setItem('pylab_selected_example_idx', selectedExample.toString());
  }, [code, selectedExample]);

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

  // Auto scroll console output to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output, isRunning]);

  // Run code
  const runCode = useCallback(async () => {
    if (!pyodideRef.current || isRunning) return;
    setIsRunning(true);
    setHasError(false);
    setOutput('');
    setActiveTab('output');

    // Track Run Code custom event in GTM / GA4
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'python_lab_run',
        category: 'PythonLab',
        action: 'Run Program',
        label: examples[selectedExample]?.label || 'Custom Code'
      });
    }

    const startTime = performance.now();

    try {
      const pyodide = pyodideRef.current;
      pyodide.runPython(`
import sys
import builtins
import js
import ast
import inspect
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

class __InputTransformer(ast.NodeTransformer):
    """Safely transforms input() calls to await __custom_input() using AST."""
    def visit_Call(self, node):
        self.generic_visit(node)
        if isinstance(node.func, ast.Name) and node.func.id == 'input':
            node.func.id = '__custom_input'
            return ast.Await(value=node)
        return node

__LOOP_LIMIT = 100000

class __LoopGuardTransformer(ast.NodeTransformer):
    """Injects iteration counter into every loop to prevent infinite loops from freezing the browser."""
    def _make_guard(self):
        return ast.parse('''
__loop_guard[0] += 1
if __loop_guard[0] > __LOOP_LIMIT:
    raise RuntimeError('Loop limit exceeded (' + str(__LOOP_LIMIT) + ' iterations). Your code may have an infinite loop. Check if your loop condition will ever become False.')
''').body
    def visit_While(self, node):
        self.generic_visit(node)
        node.body = self._make_guard() + node.body
        return node
    def visit_For(self, node):
        self.generic_visit(node)
        node.body = self._make_guard() + node.body
        return node

async def __run_with_safe_input(code_str):
    """Execute user code with safe AST-based input() and loop guard transformation."""
    tree = ast.parse(code_str)
    # Apply input transformation
    tree = __InputTransformer().visit(tree)
    # Apply loop guard injection
    tree = __LoopGuardTransformer().visit(tree)
    ast.fix_missing_locations(tree)
    # Initialize loop guard counter
    globals()['__loop_guard'] = [0]
    compiled = compile(tree, '<user>', 'exec', ast.PyCF_ALLOW_TOP_LEVEL_AWAIT)
    result = eval(compiled, globals())
    if inspect.isawaitable(result):
        await result
      `);

      try {
        await pyodide.runPythonAsync(`await __run_with_safe_input(${JSON.stringify(code)})`);
      } catch (pyErr) {
        setHasError(true);
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

      if (stderr) {
        setHasError(true);
      }

      const endTime = performance.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);

      let finalOutput = (stdout || '') + (stderr || '');
      setOutput(prev => {
        let result = prev + finalOutput;
        if (!result.trim()) result = '(No output — add a print() statement)\n';
        return result + `\n\n[Finished in ${duration}s]`;
      });
    } catch (err) {
      setHasError(true);
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
    setHasError(false);
    setActiveTab('editor');
    exitDebug();
  };

  const handleResetExample = () => {
    const originalCode = examples[selectedExample].code;
    setCode(originalCode);
    setOutput('');
    setHasError(false);
    exitDebug();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
    document.body.classList.toggle('pylab-fullscreen-active');
  };

  // ========== DEBUGGER LOGIC ==========

  const debugCode = useCallback(async () => {
    if (!pyodideRef.current || isRunning || isDebugging) return;

    setDebugError('');
    setIsRunning(true);
    setOutput('');

    // Track Debug Code custom event in GTM / GA4
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'python_lab_debug',
        category: 'PythonLab',
        action: 'Debug Program',
        label: examples[selectedExample]?.label || 'Custom Code'
      });
    }

    // Let React render the "Running..." state before heavy work
    await new Promise(r => setTimeout(r, 50));

    try {
      const pyodide = pyodideRef.current;

      // sys.settrace-based step recorder for educational debugging
      await pyodide.runPythonAsync(`
import sys, json, ast, builtins, traceback as _tb
from io import StringIO
import js

def __debug_trace_and_run(user_code, max_steps):
    steps = []
    output_stream = StringIO()
    old_stdout = sys.stdout
    old_stderr = sys.stderr
    sys.stdout = output_stream
    sys.stderr = output_stream
    step_count = [0]
    last_stdout_len = [0]
    prev_vars = [{}]
    last_line = [0]

    # Cycle detection for infinite loops
    recent_lines = []
    CYCLE_WINDOW = 20
    is_infinite_loop = [False]

    old_input = builtins.input

    def debug_sync_input(prompt_text=""):
        """Synchronous input handler for debug mode using browser prompt."""
        output_stream.flush()
        val = js.prompt(str(prompt_text) if prompt_text else "Enter input:")
        if val is None:
            raise EOFError("Input cancelled")
        result = str(val)
        output_stream.write(str(prompt_text) + result + "\\n")
        return result

    builtins.input = debug_sync_input

    class StepLimitExceeded(Exception):
        pass

    def tracer(frame, event, arg):
        if frame.f_code.co_filename != '<debug>':
            return None  # Only trace user code, not builtins

        if event == 'line':
            step_count[0] += 1
            if step_count[0] > max_steps:
                raise StepLimitExceeded()

            # Cycle detection: if same few lines repeat, likely infinite loop
            recent_lines.append(frame.f_lineno)
            if len(recent_lines) > CYCLE_WINDOW:
                recent_lines.pop(0)
            if (len(recent_lines) == CYCLE_WINDOW and
                len(set(recent_lines)) <= 3 and
                step_count[0] > 10):
                is_infinite_loop[0] = True
                raise StepLimitExceeded()

            last_line[0] = frame.f_lineno

            # Collect user variables (skip private and callable)
            user_vars = {}
            for k, v in frame.f_locals.items():
                if not k.startswith('_') and not callable(v):
                    try:
                        user_vars[k] = repr(v)
                    except:
                        user_vars[k] = '<unrepresentable>'

            # Variable change detection
            var_changes = {}
            for k, v_repr in user_vars.items():
                if k not in prev_vars[0]:
                    var_changes[k] = 'created'
                elif prev_vars[0][k] != v_repr:
                    var_changes[k] = 'changed'
            for k in prev_vars[0]:
                if k not in user_vars:
                    var_changes[k] = 'removed'
            prev_vars[0] = dict(user_vars)

            # Incremental stdout (delta only, not full copy)
            full_output = output_stream.getvalue()
            stdout_delta = full_output[last_stdout_len[0]:]
            last_stdout_len[0] = len(full_output)

            steps.append({
                'line': frame.f_lineno,
                'vars': user_vars,
                'var_changes': var_changes,
                'stdout_delta': stdout_delta,
                'event': event
            })
        return tracer

    sys.settrace(tracer)
    truncated = False

    try:
        compiled = compile(user_code, '<debug>', 'exec')
        exec_globals = {'__builtins__': __builtins__}
        exec(compiled, exec_globals)
    except StepLimitExceeded:
        truncated = True
        remaining_output = output_stream.getvalue()[last_stdout_len[0]:]
        if is_infinite_loop[0]:
            stop_reason = 'infinite_loop_suspected'
            suggestion = f'Your code appears stuck in an infinite loop around line {last_line[0]}. Check if your loop condition ever becomes False.'
        else:
            stop_reason = 'step_limit_exceeded'
            suggestion = f'Execution stopped after {step_count[0]} steps. Your program might have a very long loop near line {last_line[0]}.'
        steps.append({
            'line': last_line[0],
            'vars': prev_vars[0],
            'var_changes': {},
            'stdout_delta': remaining_output,
            'event': 'truncated',
            'error': f'Execution stopped after {step_count[0]} steps.',
            'stop_reason': stop_reason,
            'last_line': last_line[0],
            'total_steps': step_count[0],
            'suggestion': suggestion
        })
    except SyntaxError as e:
        remaining_output = output_stream.getvalue()[last_stdout_len[0]:]
        steps.append({
            'line': e.lineno or -1,
            'vars': {},
            'var_changes': {},
            'stdout_delta': remaining_output,
            'event': 'exception',
            'error': f'SyntaxError: {e.msg} (line {e.lineno})',
            'error_type': 'SyntaxError',
            'error_line': e.lineno or -1
        })
    except Exception as e:
        remaining_output = output_stream.getvalue()[last_stdout_len[0]:]
        tb = _tb.extract_tb(e.__traceback__)
        error_line = -1
        for frame_info in reversed(tb):
            if frame_info.filename == '<debug>':
                error_line = frame_info.lineno
                break
        steps.append({
            'line': error_line,
            'vars': prev_vars[0],
            'var_changes': {},
            'stdout_delta': remaining_output,
            'event': 'exception',
            'error': f'{type(e).__name__}: {e}',
            'error_type': type(e).__name__,
            'error_line': error_line
        })
    finally:
        sys.settrace(None)
        sys.stdout = old_stdout
        sys.stderr = old_stderr
        builtins.input = old_input

    # Add final completed step
    if not truncated and len(steps) > 0 and steps[-1].get('event') != 'exception':
        remaining = output_stream.getvalue()[last_stdout_len[0]:]
        steps.append({
            'line': -1,
            'vars': steps[-1]['vars'] if steps else {},
            'var_changes': {},
            'stdout_delta': remaining,
            'event': 'finished'
        })

    return json.dumps(steps)
      `);

      // Execute trace on unmodified user code (no regex replacement)
      const result = await pyodide.runPythonAsync(
        `__debug_trace_and_run(${JSON.stringify(code)}, ${MAX_DEBUG_STEPS})`
      );

      const steps = JSON.parse(result);

      // Post-process: reconstruct cumulative stdout from deltas
      let cumulativeStdout = '';
      for (const step of steps) {
        cumulativeStdout += (step.stdout_delta || '');
        step.stdout = cumulativeStdout;
        delete step.stdout_delta;
      }

      if (steps.length === 0) {
        setDebugError('No executable steps found in the code.');
        setIsRunning(false);
        return;
      }

      setDebugSteps(steps);
      setDebugStepIndex(0);
      setIsDebugging(true);
      setActiveTab('output');
    } catch (err) {
      setDebugError(`Debug failed: ${err.message}`);
    }
    setIsRunning(false);
  }, [code, isRunning, isDebugging]);

  const nextDebugStep = () => {
    setDebugStepIndex(prev => Math.min(prev + 1, debugSteps.length - 1));
  };

  const prevDebugStep = () => {
    setDebugStepIndex(prev => Math.max(prev - 1, 0));
  };

  const resetDebug = () => {
    setDebugStepIndex(0);
    setIsDebugPlaying(false);
  };

  const exitDebug = () => {
    setIsDebugging(false);
    setDebugSteps([]);
    setDebugStepIndex(-1);
    setIsDebugPlaying(false);
    setDebugError('');
  };

  // Auto-play timer for debug
  useEffect(() => {
    if (!isDebugPlaying || !isDebugging) return;
    if (debugStepIndex >= debugSteps.length - 1) {
      setIsDebugPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setDebugStepIndex(prev => {
        if (prev >= debugSteps.length - 1) {
          setIsDebugPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
    return () => clearTimeout(timer);
  }, [isDebugPlaying, debugStepIndex, debugSteps, isDebugging]);

  const currentDebugStep = isDebugging && debugStepIndex >= 0 ? debugSteps[debugStepIndex] : null;
  const debugCodeLines = code.split('\n');
  const isDebugComplete = debugStepIndex >= debugSteps.length - 1;

  // Auto-scroll left editor and right debug code box to active debug line
  useEffect(() => {
    if (isDebugging && currentDebugStep && currentDebugStep.line > 0) {
      const lineHeightPx = 22; // ~1.5em line height
      const targetScrollTop = Math.max(0, (currentDebugStep.line - 4) * lineHeightPx);
      if (textareaRef.current) {
        textareaRef.current.scrollTop = targetScrollTop;
        syncScroll();
      }
      if (debugCodeRef.current) {
        debugCodeRef.current.scrollTop = targetScrollTop;
      }
    }
  }, [currentDebugStep, isDebugging, syncScroll]);

  // ========== END DEBUGGER LOGIC ==========

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
            <button
              className="pylab-reset-btn"
              onClick={handleResetExample}
              title="Reset code to original example"
            >
              🔄 Reset Example
            </button>
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
              className="pylab-debug-btn2"
              onClick={isDebugging ? exitDebug : debugCode}
              disabled={!pyodideReady || isRunning}
              title={isDebugging ? 'Exit Debug' : 'Debug code step by step'}
            >
              {isDebugging ? '✕ Exit Debug' : 'Debug'}
            </button>
            <button
              className="pylab-run-btn2"
              onClick={() => { if (isDebugging) exitDebug(); runCode(); }}
              disabled={!pyodideReady || isRunning}
              title="Run Program (Ctrl + Enter)"
            >
              {isRunning ? (
                <>
                  <span className="pylab-btn-spinner"></span> Running...
                </>
              ) : (
                '▶ Run'
              )}
            </button>
          </div>
        </div>

        {/* Output Toolbar */}
        <div className="pylab-toolbar-output">
          <span className="pylab-output-tab">{isDebugging ? 'Debugger' : 'Output'}</span>
          {!isDebugging && (
            <button className="pylab-clear-btn2" onClick={() => { setOutput(''); setHasError(false); }}>Clear</button>
          )}
          {isDebugging && (
            <span className="pylab-debug-step-counter">Step {debugStepIndex + 1} of {debugSteps.length}</span>
          )}
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="pylab-mobtabs">
        <button className={`pylab-mobtab ${activeTab === 'editor' ? 'active' : ''}`} onClick={() => setActiveTab('editor')}>
          main.py
        </button>
        <button className={`pylab-mobtab pylab-mobrun`} onClick={runCode} disabled={!pyodideReady || isRunning} title="Run Program (Ctrl + Enter)">
          {isRunning ? (
            <>
              <span className="pylab-btn-spinner"></span> Running...
            </>
          ) : (
            '▶ Run'
          )}
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
              <div key={i} className={isDebugging && currentDebugStep?.line === i + 1 ? 'pylab-active-num' : ''}>{i + 1}</div>
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
            {/* Active Line Overlay */}
            {isDebugging && currentDebugStep && currentDebugStep.line > 0 && (
              <div 
                className="pylab-active-line-overlay"
                style={{ top: `calc(12px + ${(currentDebugStep.line - 1) * 1.5}em)` }}
              />
            )}
            {/* Invisible textarea for input */}
            <textarea
              ref={textareaRef}
              className="pylab-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              onScroll={syncScroll}
              readOnly={isDebugging || isRunning}
              style={{ pointerEvents: isDebugging ? 'none' : 'auto' }}
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

        {/* Output / Debug Panel */}
        <div className={`pylab-output2 ${activeTab === 'output' ? 'pylab-vis' : ''}`} ref={outputRef}>
          {/* Normal output mode */}
          {!isDebugging && (
            <>
              {!pyodideReady && (
                <div className="pylab-loader">
                  <div className="pylab-spin"></div>
                  <span>{loadingProgress}</span>
                </div>
              )}
              {pyodideReady && !output && !isRunning && (
                <div className="pylab-empty-console">
                  <span className="pylab-empty-icon">🐍</span>
                  <p className="pylab-empty-title">Program output will appear here.</p>
                  <span className="pylab-empty-hint">
                    Click <strong>▶ Run</strong> or press <strong>Ctrl + Enter</strong> to execute your Python program.
                  </span>
                </div>
              )}
              {isRunning && !output && !isWaitingForInput && (
                <div className="pylab-loader">
                  <div className="pylab-spin"></div>
                  <span>Running...</span>
                </div>
              )}
              {(output || isWaitingForInput) && (
                <pre className={`pylab-out-text ${hasError ? 'pylab-error-state' : ''}`} onClick={() => terminalInputRef.current?.focus()}>
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
              {debugError && (
                <div className="pylab-debug-error">{debugError}</div>
              )}
            </>
          )}

          {/* Debug Mode Panel */}
          {isDebugging && (
            <div className="pylab-debug-panel">
              {/* Debug Code View */}
              <div className="pylab-debug-code" ref={debugCodeRef} style={{ pointerEvents: 'none' }}>
                <div className="pylab-debug-section-title">📄 Code Execution</div>
                <div className="pylab-debug-code-lines">
                  {debugCodeLines.map((line, idx) => {
                    const lineNum = idx + 1;
                    const isActive = currentDebugStep && currentDebugStep.line === lineNum;
                    const isErrorLine = currentDebugStep && currentDebugStep.event === 'exception' && currentDebugStep.line === lineNum;
                    return (
                      <div
                        key={idx}
                        className={`pylab-debug-line ${isActive ? 'pylab-debug-line--active' : ''} ${isErrorLine ? 'pylab-debug-line--error' : ''}`}
                      >
                        <span className="pylab-debug-line-num">{lineNum}</span>
                        <span className="pylab-debug-line-indicator">{isActive ? '▶' : ' '}</span>
                        <span
                          className="pylab-debug-line-code"
                          dangerouslySetInnerHTML={{ __html: highlightLine(line) || ' ' }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Variables Inspector */}
              <div className="pylab-debug-vars">
                <div className="pylab-debug-section-title">📊 Variables</div>
                {currentDebugStep && Object.keys(currentDebugStep.vars).length > 0 ? (
                  <table className="pylab-debug-vars-table">
                    <thead>
                      <tr><th>Name</th><th>Value</th></tr>
                    </thead>
                    <tbody>
                      {Object.entries(currentDebugStep.vars).map(([name, value]) => (
                        <tr key={name}>
                          <td className="pylab-debug-var-name">{name}</td>
                          <td className="pylab-debug-var-value">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="pylab-debug-empty">No variables yet</div>
                )}
              </div>

              {/* Console Output */}
              <div className="pylab-debug-console">
                <div className="pylab-debug-section-title">💻 Console Output</div>
                <pre className="pylab-debug-console-text">
                  {currentDebugStep && currentDebugStep.stdout
                    ? currentDebugStep.stdout
                    : <span className="pylab-debug-empty">No output yet</span>
                  }
                </pre>
              </div>

              {/* Status / Error */}
              {currentDebugStep && currentDebugStep.event === 'exception' && (
                <div className="pylab-debug-error-msg">
                  ❌ {currentDebugStep.error}
                </div>
              )}
              {currentDebugStep && currentDebugStep.event === 'truncated' && (
                <div className="pylab-debug-warn-msg">
                  ⚠️ {currentDebugStep.error}
                </div>
              )}
              {currentDebugStep && currentDebugStep.event === 'finished' && (
                <div className="pylab-debug-success-msg">
                  ✅ Code execution completed successfully
                </div>
              )}

              {/* Debug Controls */}
              <div className="pylab-debug-controls">
                <button className="pylab-dbg-btn" onClick={prevDebugStep} disabled={debugStepIndex <= 0}>
                  ⏮ Prev
                </button>
                <button className="pylab-dbg-btn pylab-dbg-btn--primary" onClick={nextDebugStep} disabled={isDebugComplete || isDebugPlaying}>
                  ▶ Next Step
                </button>
                <button className="pylab-dbg-btn pylab-dbg-btn--play" onClick={() => setIsDebugPlaying(!isDebugPlaying)} disabled={isDebugComplete}>
                  {isDebugPlaying ? '⏸ Pause' : '⏩ Auto Play'}
                </button>
                <button className="pylab-dbg-btn" onClick={resetDebug}>
                  🔄 Reset
                </button>
                <button className="pylab-dbg-btn pylab-dbg-btn--exit" onClick={exitDebug}>
                  ✕ Exit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="pylab-statusbar">
        <div className="pylab-statusbar-left">
          <span>🐍 Python 3.11</span>
          <span className="pylab-statusbar-sep">•</span>
          <span>⚡ Pyodide Powered</span>
        </div>
        <div className="pylab-statusbar-right">
          <span>{lineCount} {lineCount === 1 ? 'line' : 'lines'}</span>
          <span className="pylab-statusbar-sep">•</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
}
