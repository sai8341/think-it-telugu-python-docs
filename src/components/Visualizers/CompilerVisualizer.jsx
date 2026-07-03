import React, { useEffect, useMemo, useState } from 'react';

function buildInterpreterLogs(step, hasError) {
  if (step < 0) return [];

  const nextLogs = ['> python main.py'];

  if (step >= 0) nextLogs.push('line 1 executed: x = 5');
  if (step >= 1) nextLogs.push('line 2 executed: y = 10');

  if (step >= 2) {
    if (hasError) {
      nextLogs.push('Traceback (most recent call last):');
      nextLogs.push('  File "main.py", line 3');
      nextLogs.push('NameError: name "error_variable" is not defined');
      nextLogs.push('Program stopped before line 4.');
      return nextLogs;
    }

    nextLogs.push('line 3 executed: z = 15');
  }

  if (step >= 3) {
    nextLogs.push('Success: 15');
    nextLogs.push('Process finished with exit code 0');
  }

  return nextLogs;
}

function getLogClassName(log) {
  if (log.includes('Error') || log.includes('Traceback') || log.includes('stopped')) {
    return 'terminal-line terminal-line--error';
  }

  if (log.startsWith('>')) {
    return 'terminal-line terminal-line--command';
  }

  if (log.startsWith('line')) {
    return 'terminal-line terminal-line--trace';
  }

  return 'terminal-line';
}

export default function CompilerVisualizer() {
  const [mode, setMode] = useState('interpreter');
  const [hasError, setHasError] = useState(true);
  const [step, setStep] = useState(-1);
  const [logs, setLogs] = useState([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileProgress, setCompileProgress] = useState(0);
  const [isCompiled, setIsCompiled] = useState(false);

  const pythonLines = useMemo(() => [
    {
      code: 'x = 5',
      desc: 'Line 1 creates a variable named x and stores the value 5.'
    },
    {
      code: 'y = 10',
      desc: 'Line 2 creates a variable named y and stores the value 10.'
    },
    {
      code: hasError ? 'z = x + error_variable' : 'z = x + y',
      desc: hasError
        ? 'Line 3 fails because error_variable was never created. Python stops immediately and line 4 will not run.'
        : 'Line 3 adds x and y, then stores the result 15 in z.'
    },
    {
      code: 'print("Success:", z)',
      desc: 'Line 4 prints the final result to the terminal.'
    }
  ], [hasError]);

  const cppLines = useMemo(() => [
    { code: '#include <iostream>', desc: 'Compiler reads the full source file before running anything.' },
    { code: 'int x = 5, y = 10;', desc: 'Compiler checks variable declarations.' },
    { code: hasError ? 'int z = x + error_variable;' : 'int z = x + y;', desc: 'Compiler checks whether every name is declared.' },
    { code: 'std::cout << "Success: " << z;', desc: 'If build succeeds, this line can run later from the executable.' }
  ], [hasError]);

  const activeLines = mode === 'interpreter' ? pythonLines : cppLines;
  const isInterpreterStopped = mode === 'interpreter' && hasError && step === 2;
  const isInterpreterDone = mode === 'interpreter' && step >= pythonLines.length - 1;
  const currentDescription = mode === 'interpreter'
    ? (step >= 0 ? pythonLines[step].desc : 'Press Start Step to execute Python one line at a time.')
    : getCompilerDescription();

  useEffect(() => {
    resetSimulation();
  }, [mode, hasError]);

  useEffect(() => {
    if (!isAutoPlaying || mode !== 'interpreter') return undefined;

    const timer = setTimeout(() => {
      advanceInterpreter();
    }, 900);

    return () => clearTimeout(timer);
  }, [isAutoPlaying, step, mode, hasError]);

  function resetSimulation() {
    setStep(-1);
    setLogs([]);
    setIsAutoPlaying(false);
    setIsCompiling(false);
    setCompileProgress(0);
    setIsCompiled(false);
  }

  function getCompilerDescription() {
    if (compileProgress === 0) {
      return 'Press Compile & Build to make the compiler scan the whole C++ file.';
    }

    if (compileProgress < 100) {
      return `Compiler is checking the whole file: ${compileProgress}% complete.`;
    }

    if (hasError) {
      return 'Build failed. The compiler found an undeclared name, so no executable file was created.';
    }

    return 'Build successful. The compiler created main.exe, so the program can now run.';
  }

  function advanceInterpreter() {
    const nextStep = Math.min(step + 1, pythonLines.length - 1);
    setStep(nextStep);
    setLogs(buildInterpreterLogs(nextStep, hasError));

    if ((hasError && nextStep === 2) || nextStep === pythonLines.length - 1) {
      setIsAutoPlaying(false);
    }
  }

  function startAutoPlay() {
    setStep(-1);
    setLogs([]);
    setIsAutoPlaying(true);
  }

  function startCompilation() {
    setIsCompiling(true);
    setCompileProgress(0);
    setIsCompiled(false);
    setLogs(['> g++ main.cpp -o main.exe', 'Compiler started: scanning the full source file...']);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setCompileProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setIsCompiling(false);

        if (hasError) {
          setLogs(prev => [
            ...prev,
            'main.cpp:3:13: error: "error_variable" was not declared',
            'Build failed. main.exe was not created.'
          ]);
          setIsCompiled(false);
        } else {
          setLogs(prev => [
            ...prev,
            'Compilation successful.',
            'Generated executable: main.exe'
          ]);
          setIsCompiled(true);
        }
      }
    }, 260);
  }

  function runExecutable() {
    setLogs(prev => [...prev, '', '> ./main.exe', 'Success: 15']);
  }

  return (
    <div className="responsive-visualizer">
      <div className="visualizer-header">
        <div className="visualizer-control-group">
          <span className="visualizer-label">Mode</span>
          <div className="visualizer-tabs" role="tablist" aria-label="Translation mode">
            <button
              type="button"
              onClick={() => setMode('interpreter')}
              className={`visualizer-tab ${mode === 'interpreter' ? 'active' : ''}`}
            >
              Interpreter
            </button>
            <button
              type="button"
              onClick={() => setMode('compiler')}
              className={`visualizer-tab ${mode === 'compiler' ? 'active' : ''}`}
            >
              Compiler
            </button>
          </div>
        </div>

        <div className="visualizer-control-group visualizer-control-group--state">
          <span className="visualizer-label">Code state</span>
          <button
            type="button"
            onClick={() => setHasError(!hasError)}
            className={`vis-btn ${hasError ? 'vis-btn-danger' : 'vis-btn-success'}`}
          >
            {hasError ? 'With Error' : 'Fixed Code'}
          </button>
        </div>
      </div>

      <div className="visualizer-grid">
        <section className="visualizer-panel visualizer-panel--code">
          <div className="panel-heading">
            <span>Code</span>
            <span className="panel-heading__meta">{mode === 'interpreter' ? 'main.py' : 'main.cpp'}</span>
          </div>

          <div className="code-window">
            <pre>
              <code>
                {activeLines.map((line, idx) => {
                  const isActive = mode === 'interpreter' && step === idx;
                  const isErrorLine = line.code.includes('error_variable');

                  return (
                    <div key={idx} className={`code-line ${isActive ? 'active' : ''}`}>
                      <span className="code-line-num">{idx + 1}</span>
                      <span className={isErrorLine ? 'code-token-error' : ''}>{line.code}</span>
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>

          <div className="visualizer-actions">
            {mode === 'interpreter' ? (
              <>
                <button
                  type="button"
                  className="vis-btn vis-btn-primary"
                  onClick={advanceInterpreter}
                  disabled={isAutoPlaying || isInterpreterStopped || isInterpreterDone}
                >
                  {step < 0 ? 'Start Step' : 'Next Step'}
                </button>
                <button
                  type="button"
                  className="vis-btn vis-btn-success"
                  onClick={startAutoPlay}
                  disabled={isAutoPlaying}
                >
                  Auto Play
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="vis-btn vis-btn-success"
                  onClick={startCompilation}
                  disabled={isCompiling}
                >
                  Compile & Build
                </button>
                <button
                  type="button"
                  className="vis-btn vis-btn-primary"
                  onClick={runExecutable}
                  disabled={!isCompiled}
                >
                  Run main.exe
                </button>
              </>
            )}
            <button type="button" className="vis-btn vis-btn-secondary" onClick={resetSimulation}>
              Reset
            </button>
          </div>
        </section>

        <section className="visualizer-panel visualizer-panel--output">
          <div className="info-card">
            <span className="info-card__title">Execution explanation</span>
            <p>{currentDescription}</p>
          </div>

          {mode === 'compiler' && compileProgress > 0 && (
            <div className="progress-card">
              <div className="progress-card__label">
                <span>Compilation progress</span>
                <strong>{compileProgress}%</strong>
              </div>
              <div className="progress-card__track">
                <div className="progress-card__bar" style={{ width: `${compileProgress}%` }} />
              </div>
            </div>
          )}

          <div className="terminal-wrapper">
            <div className="terminal-header">
              <span className="terminal-title">Execution Trace & Output</span>
            </div>
            <div className="terminal-body">
              {logs.length === 0 ? (
                <span className="terminal-empty">Output appears here after you run a step.</span>
              ) : (
                logs.map((log, idx) => (
                  <div key={`${log}-${idx}`} className={getLogClassName(log)}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
