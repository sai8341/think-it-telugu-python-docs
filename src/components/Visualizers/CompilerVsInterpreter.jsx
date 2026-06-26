import React, { useEffect, useState } from 'react';

export default function CompilerVsInterpreter() {
  const [mode, setMode] = useState('interpreter'); // 'interpreter' | 'compiler'
  const [hasError, setHasError] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const [logs, setLogs] = useState([]);
  const [compileProgress, setCompileProgress] = useState(0);
  const [isCompiled, setIsCompiled] = useState(false);

  // Reset state when switching mode or toggling error
  useEffect(() => {
    resetSimulation();
  }, [mode, hasError]);

  const resetSimulation = () => {
    setIsRunning(false);
    setStep(-1);
    setLogs([]);
    setCompileProgress(0);
    setIsCompiled(false);
  };

  // Interpreter Code Lines
  const pythonLines = [
    { code: 'x = 5', desc: 'Interpreter reads line 1: Assigns value 5 to x, translates it to machine code, and runs it immediately.' },
    { code: 'y = 10', desc: 'Interpreter reads line 2: Assigns value 10 to y, translates it to machine code, and runs it immediately.' },
    {
      code: hasError ? 'z = x + error_variable' : 'z = x + y',
      desc: hasError
        ? 'Error on line 3: the interpreter does not know what "error_variable" is. Execution stops immediately, so line 4 is never read.'
        : 'Interpreter reads line 3: Successfully calculates x + y (5 + 10 = 15) and assigns it to z.'
    },
    { code: 'print("Success:", z)', desc: 'Interpreter reads line 4: Prints the value of z on the screen. Program execution finished successfully.' }
  ];

  // Compiler Code Lines
  const cppLines = [
    { code: '#include <iostream>', desc: 'Header file inclusion.' },
    { code: 'int x = 5, y = 10;', desc: 'Variables declaration.' },
    { code: hasError ? 'int z = x + error_variable;' : 'int z = x + y;', desc: 'Calculation.' },
    { code: 'std::cout << "Success: " << z;', desc: 'Print output.' }
  ];

  // Run Interpreter Step by Step
  const nextInterpreterStep = () => {
    if (!isRunning) setIsRunning(true);
    const nextStep = step + 1;
    if (nextStep >= pythonLines.length) return;

    setStep(nextStep);

    if (nextStep === 0) {
      setLogs(['> python main.py']);
    } else if (nextStep === 2 && hasError) {
      setLogs(prev => [...prev, 'Traceback (most recent call last):', '  File "main.py", line 3', 'NameError: name "error_variable" is not defined']);
      setIsRunning(false);
    } else if (nextStep === 3) {
      setLogs(prev => [...prev, 'Success: 15', 'Process finished with exit code 0']);
      setIsRunning(false);
    }
  };

  // Auto Run Interpreter
  useEffect(() => {
    let timer;
    if (isRunning && mode === 'interpreter') {
      if (step < pythonLines.length - 1) {
        if (step === 2 && hasError) {
          setIsRunning(false);
        } else {
          timer = setTimeout(() => {
            nextInterpreterStep();
          }, 1800);
        }
      } else {
        setIsRunning(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isRunning, step, mode, hasError]);

  // Start Compilation (Progress Simulation)
  const startCompilation = () => {
    setIsRunning(true);
    setCompileProgress(0);
    setLogs(['> g++ main.cpp -o main.exe', 'Compiling whole source file...']);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setCompileProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsRunning(false);
        if (hasError) {
          setLogs(prev => [
            ...prev,
            'main.cpp: In function \'int main()\':',
            'main.cpp:5:17: error: \'error_variable\' was not declared in this scope',
            'Compilation failed. Build output: 0 files created.'
          ]);
          setIsCompiled(false);
        } else {
          setLogs(prev => [
            ...prev,
            'Compilation successful!',
            'Generated executable binary: main.exe'
          ]);
          setIsCompiled(true);
        }
      }
    }, 200);
  };

  // Run compiled .exe file
  const runExecutable = () => {
    setLogs(prev => [...prev, '', '> ./main.exe', 'Success: 15']);
  };

  return (
    <div className="compiler-visualizer">
      {/* Top Header Controls */}
      <div className="visualizer-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem', paddingBottom: '1.5rem' }}>
        {/* Toggle Mode */}
        <div style={{ display: 'flex', gap: '0.6rem', background: 'rgba(0, 0, 0, 0.3)', padding: '6px', borderRadius: '10px' }}>
          <button
            onClick={() => setMode('interpreter')}
            className={`visualizer-tab ${mode === 'interpreter' ? 'active' : ''}`}
            style={{ margin: 0 }}
          >
            Interpreter (Python)
          </button>
          <button
            onClick={() => setMode('compiler')}
            className={`visualizer-tab ${mode === 'compiler' ? 'active' : ''}`}
            style={{ margin: 0 }}
          >
            Compiler (C++)
          </button>
        </div>

        {/* Toggle Error Switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontSize: '0.9rem', color: '#ccc', fontWeight: 600 }}>Code State:</span>
          <button
            onClick={() => setHasError(!hasError)}
            className={`vis-btn ${hasError ? 'vis-btn-danger' : 'vis-btn-success'}`}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {hasError ? 'Code with Error' : 'Fixed Code'}
          </button>
        </div>
      </div>

      <div className="visualizer-grid">
        {/* Left Side: Code Editor */}
        <div className="visualizer-panel">
          <div className="code-window">
            <div className="code-window-filename">
              {mode === 'interpreter' ? 'main.py' : 'main.cpp'}
            </div>
            
            <pre style={{ margin: 0, padding: 0, background: 'transparent', border: 'none' }}>
              <code style={{ background: 'transparent', border: 'none', padding: 0, display: 'block' }}>
                {(mode === 'interpreter' ? pythonLines : cppLines).map((line, idx) => {
                  const isActive = mode === 'interpreter' && step === idx;
                  return (
                    <div key={idx} className={`code-line ${isActive ? 'active' : ''}`}>
                      <span className="code-line-num">{idx + 1}</span>
                      <span style={{
                        color: line.code.includes('ERROR') || line.code.includes('error_variable')
                          ? '#EF4444'
                          : line.code.startsWith('#') || line.code.startsWith('//')
                          ? '#6B7280'
                          : '#ECEFF1',
                        fontWeight: line.code.includes('ERROR') || line.code.includes('error_variable') ? 'bold' : 'normal'
                      }}>
                        {line.code}
                      </span>
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>

          {/* Action Buttons */}
          <div className="visualizer-actions">
            {mode === 'interpreter' ? (
              <>
                <button
                  className="vis-btn vis-btn-primary"
                  onClick={nextInterpreterStep}
                  disabled={isRunning || step >= pythonLines.length - 1 || (step === 2 && hasError)}
                >
                  Step-by-Step
                </button>
                <button
                  className="vis-btn vis-btn-success"
                  onClick={() => {
                    resetSimulation();
                    setIsRunning(true);
                  }}
                  disabled={isRunning}
                >
                  Auto Play
                </button>
              </>
            ) : (
              <>
                <button
                  className="vis-btn vis-btn-success"
                  onClick={startCompilation}
                  disabled={isRunning}
                >
                  Compile & Build
                </button>
                <button
                  className="vis-btn"
                  onClick={runExecutable}
                  disabled={!isCompiled}
                  style={{ background: '#8B5CF6', color: '#fff', opacity: !isCompiled ? 0.5 : 1 }}
                >
                  Run main.exe
                </button>
              </>
            )}
            <button
              className="vis-btn vis-btn-secondary"
              onClick={resetSimulation}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Right Side: Visual Flow & Output Console */}
        <div className="visualizer-panel">
          {/* Detailed Info Card */}
          <div className="info-card">
            <div style={{ fontWeight: 'bold', color: '#F59E0B', marginBottom: '0.6rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              💡 What is happening in the background?
            </div>
            {mode === 'interpreter' ? (
              step === -1 ? (
                <span>Click <b>"Step-by-Step"</b> or <b>"Auto Play"</b> to start the translation simulation.</span>
              ) : (
                <span>{pythonLines[step].desc}</span>
              )
            ) : (
              compileProgress === 0 ? (
                <span>Click <b>"Compile & Build"</b> below to see how the compiler translates the entire file.</span>
              ) : compileProgress < 100 ? (
                <span>
                  Compiler is reading the entire file at once: <b>{compileProgress}% compiled</b>...
                </span>
              ) : hasError ? (
                <span>
                  <b>COMPILATION ERROR!</b> The compiler scanned the whole code and found a declaration error at Line 3. No executable binary (main.exe) was created.
                </span>
              ) : (
                <span>
                  <b>BUILD SUCCESSFUL!</b> No errors found. The compiler translated the entire code to machine language and generated <b>'main.exe'</b>. You can now run it.
                </span>
              )
            )}
          </div>

          {/* Compile Progress Bar */}
          {mode === 'compiler' && compileProgress > 0 && (
            <div style={{
              background: '#0a0a12',
              borderRadius: '8px',
              padding: '12px',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#aaa', marginBottom: '6px' }}>
                <span>Compilation Progress</span>
                <span>{compileProgress}%</span>
              </div>
              <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{
                  width: `${compileProgress}%`,
                  background: 'var(--ifm-color-primary, #00A859)',
                  height: '100%',
                  transition: 'width 0.1s linear'
                }} />
              </div>
            </div>
          )}

          {/* Terminal Console */}
          <div className="terminal-wrapper">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
              </div>
              <span>Console Output Terminal</span>
            </div>
            <div className="terminal-body" style={{ minHeight: '140px', maxHeight: '200px' }}>
              {logs.length === 0 ? (
                <span style={{ color: '#555', fontStyle: 'italic' }}>Terminal is empty. Output logs will appear here.</span>
              ) : (
                logs.map((log, idx) => {
                  const isErr = log.includes('error') || log.includes('Error') || log.includes('Traceback');
                  return (
                    <div key={idx} style={{ color: isErr ? '#EF4444' : log.startsWith('>') ? '#60A5FA' : '#34D399', margin: '2px 0' }}>
                      {log}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
