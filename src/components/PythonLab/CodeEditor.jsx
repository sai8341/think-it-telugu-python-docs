import React, { useRef, useCallback, useMemo } from 'react';
import { highlightPython } from '@site/src/utils/pythonHighlighter';

export default function CodeEditor({
  code,
  setCode,
  runCode,
  isDebugging,
  currentDebugStep,
  isRunning,
  textareaRef,
  syncScrollExternal,
  lineNumbersRef,
  highlightRef
}) {
  const internalTextareaRef = useRef(null);
  const internalLineNumbersRef = useRef(null);
  const internalHighlightRef = useRef(null);
  
  // Use external ref if provided, otherwise internal
  const taRef = textareaRef || internalTextareaRef;
  const lnRef = lineNumbersRef || internalLineNumbersRef;
  const hlRef = highlightRef || internalHighlightRef;

  const highlightedCode = useMemo(() => highlightPython(code), [code]);
  const lineCount = code.split('\n').length;

  const syncScroll = useCallback(() => {
    const ta = taRef.current;
    if (!ta) return;
    if (hlRef.current) {
      hlRef.current.scrollTop = ta.scrollTop;
      hlRef.current.scrollLeft = ta.scrollLeft;
    }
    if (lnRef.current) {
      lnRef.current.scrollTop = ta.scrollTop;
    }
    if (syncScrollExternal) {
       syncScrollExternal();
    }
  }, [taRef, hlRef, lnRef, syncScrollExternal]);

  const insertText = useCallback((text) => {
    const ta = taRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const currentCode = ta.value;
    const newCode = currentCode.substring(0, start) + text + currentCode.substring(end);
    setCode(newCode);
    
    requestAnimationFrame(() => {
      ta.focus();
      ta.selectionStart = ta.selectionEnd = start + text.length;
    });
  }, [taRef, setCode]);

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
        const newCode = code.substring(0, lineStart) + code.substring(lineStart + spaces) + code.substring(end);
        setCode(newCode);
        requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start - spaces; });
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

      // Smart bracket splitting behavior
      const lastChar = before.slice(-1);
      const nextChar = after.charAt(0);
      const bracketPairs = { '{': '}', '[': ']', '(': ')' };

      if (bracketPairs[lastChar] && bracketPairs[lastChar] === nextChar) {
        const innerIndent = indent + '    ';
        const insertion = '\n' + innerIndent + '\n' + indent;
        setCode(before + insertion + after);
        requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + innerIndent.length + 1; });
        return;
      }

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

  return (
    <>
      <div className="pylab-linenum" ref={lnRef}>
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i} className={isDebugging && currentDebugStep?.line === i + 1 ? 'pylab-active-num' : ''}>{i + 1}</div>
        ))}
      </div>
      <div className="pylab-editor-inner">
        {/* Syntax-highlighted overlay */}
        <pre
          className="pylab-highlight"
          ref={hlRef}
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
          ref={taRef}
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
        
        {/* Mobile keyboard helpers (only visible on mobile via CSS) */}
        <div className="pylab-mobile-helpers">
          <button type="button" className="pylab-mobile-helper-btn" onClick={() => insertText('    ')}>Tab</button>
          <button type="button" className="pylab-mobile-helper-btn" onClick={() => insertText(':')}>:</button>
          <button type="button" className="pylab-mobile-helper-btn" onClick={() => insertText('(')}>(</button>
          <button type="button" className="pylab-mobile-helper-btn" onClick={() => insertText(')')}>)</button>
          <button type="button" className="pylab-mobile-helper-btn" onClick={() => insertText('"')}>"</button>
          <button type="button" className="pylab-mobile-helper-btn" onClick={() => insertText("'")}>'</button>
          <button type="button" className="pylab-mobile-helper-btn" onClick={() => insertText('=')}>=</button>
          <button type="button" className="pylab-mobile-helper-btn" onClick={() => insertText('+')}>+</button>
          <button type="button" className="pylab-mobile-helper-btn" onClick={() => insertText('-')}>-</button>
          <button type="button" className="pylab-mobile-helper-btn" onClick={() => insertText('*')}>*</button>
          <button type="button" className="pylab-mobile-helper-btn" onClick={() => insertText('/')}>/</button>
          <button type="button" className="pylab-mobile-helper-btn" onClick={() => insertText('_')}>_</button>
          <button type="button" className="pylab-mobile-helper-btn" onClick={() => insertText('#')}>#</button>
        </div>
      </div>
    </>
  );
}
