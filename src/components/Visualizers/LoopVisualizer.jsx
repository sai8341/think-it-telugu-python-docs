import React, { useState, useEffect } from 'react';

export default function LoopVisualizer() {
  const [activeTab, setActiveTab] = useState('for'); // 'for' | 'while' | 'break' | 'continue'
  const [stepIndex, setStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Define code lines for each type
  const codes = {
    for: [
      { code: 'for i in range(1, 6):', isIndent: false },
      { code: '    print(f"Number is {i}")', isIndent: true }
    ],
    while: [
      { code: 'count = 1', isIndent: false },
      { code: 'while count <= 3:', isIndent: false },
      { code: '    print(f"Count is {count}")', isIndent: true },
      { code: '    count += 1', isIndent: true }
    ],
    break: [
      { code: 'for i in range(1, 6):', isIndent: false },
      { code: '    if i == 3:', isIndent: true },
      { code: '        break', isIndent: true },
      { code: '    print(i)', isIndent: true }
    ],
    continue: [
      { code: 'for i in range(1, 6):', isIndent: false },
      { code: '    if i == 3:', isIndent: true },
      { code: '        continue', isIndent: true },
      { code: '    print(i)', isIndent: true }
    ]
  };

  // Define steps for each type
  const steps = {
    for: [
      { line: 0, vars: { i: 1 }, logs: [], desc: 'The for loop starts. range(1, 6) initializes i with a starting value of 1.' },
      { line: 1, vars: { i: 1 }, logs: ['Number is 1'], desc: 'Enters the loop body. Executes the print statement, displaying "Number is 1" on the console.' },
      { line: 0, vars: { i: 2 }, logs: ['Number is 1'], desc: 'Returns to the loop header. Assigns the next value 2 from the range sequence to i.' },
      { line: 1, vars: { i: 2 }, logs: ['Number is 1', 'Number is 2'], desc: '"Number is 2" is printed to the console.' },
      { line: 0, vars: { i: 3 }, logs: ['Number is 1', 'Number is 2'], desc: 'Assigns the next value 3 from the range sequence to i.' },
      { line: 1, vars: { i: 3 }, logs: ['Number is 1', 'Number is 2', 'Number is 3'], desc: '"Number is 3" is printed to the console.' },
      { line: 0, vars: { i: 4 }, logs: ['Number is 1', 'Number is 2', 'Number is 3'], desc: 'Assigns the next value 4 from the range sequence to i.' },
      { line: 1, vars: { i: 4 }, logs: ['Number is 1', 'Number is 2', 'Number is 3', 'Number is 4'], desc: '"Number is 4" is printed to the console.' },
      { line: 0, vars: { i: 5 }, logs: ['Number is 1', 'Number is 2', 'Number is 3', 'Number is 4'], desc: 'Assigns the last value 5 from the range sequence to i (the stop value 6 is exclusive).' },
      { line: 1, vars: { i: 5 }, logs: ['Number is 1', 'Number is 2', 'Number is 3', 'Number is 4', 'Number is 5'], desc: '"Number is 5" is printed to the console.' },
      { line: 0, vars: { i: 'Finished' }, logs: ['Number is 1', 'Number is 2', 'Number is 3', 'Number is 4', 'Number is 5'], desc: 'All numbers in range have been processed. Loop terminates successfully!' }
    ],
    while: [
      { line: 0, vars: { count: 1 }, logs: [], desc: 'Variable count is initialized to 1.' },
      { line: 1, vars: { count: 1 }, logs: [], desc: 'Evaluates condition: count <= 3 (1 <= 3) is True. Loop body executes.' },
      { line: 2, vars: { count: 1 }, logs: ['Count is 1'], desc: 'Prints "Count is 1" on the console.' },
      { line: 3, vars: { count: 2 }, logs: ['Count is 1'], desc: 'Increments count by 1 (count += 1). count is now 2.' },
      { line: 1, vars: { count: 2 }, logs: ['Count is 1'], desc: 'Evaluates condition: count <= 3 (2 <= 3) is True.' },
      { line: 2, vars: { count: 2 }, logs: ['Count is 1', 'Count is 2'], desc: 'Prints "Count is 2" on the console.' },
      { line: 3, vars: { count: 3 }, logs: ['Count is 1', 'Count is 2'], desc: 'Increments count. count is now 3.' },
      { line: 1, vars: { count: 3 }, logs: ['Count is 1', 'Count is 2'], desc: 'Evaluates condition: count <= 3 (3 <= 3) is True.' },
      { line: 2, vars: { count: 3 }, logs: ['Count is 1', 'Count is 2', 'Count is 3'], desc: 'Prints "Count is 3" on the console.' },
      { line: 3, vars: { count: 4 }, logs: ['Count is 1', 'Count is 2', 'Count is 3'], desc: 'Increments count. count is now 4.' },
      { line: 1, vars: { count: 4 }, logs: ['Count is 1', 'Count is 2', 'Count is 3'], desc: 'Evaluates condition: count <= 3 (4 <= 3) is False. Loop terminates.' }
    ],
    break: [
      { line: 0, vars: { i: 1 }, logs: [], desc: 'The loop starts. i is initialized to 1.' },
      { line: 1, vars: { i: 1 }, logs: [], desc: 'Checks condition: i == 3 (1 == 3) is False.' },
      { line: 3, vars: { i: 1 }, logs: ['1'], desc: 'Executes print(i). Prints 1.' },
      { line: 0, vars: { i: 2 }, logs: ['1'], desc: 'Assigns the next value 2 to i.' },
      { line: 1, vars: { i: 2 }, logs: ['1'], desc: 'Checks condition: i == 3 (2 == 3) is False.' },
      { line: 3, vars: { i: 2 }, logs: ['1', '2'], desc: 'Executes print(i). Prints 2.' },
      { line: 0, vars: { i: 3 }, logs: ['1', '2'], desc: 'Assigns the next value 3 to i.' },
      { line: 1, vars: { i: 3 }, logs: ['1', '2'], desc: 'Checks condition: i == 3 (3 == 3) is True!' },
      { line: 2, vars: { i: 3 }, logs: ['1', '2'], desc: '⚠️ break statement is triggered! It immediately exits the entire loop.' },
      { line: -1, vars: { i: 3 }, logs: ['1', '2'], desc: 'Loop terminated. Note that values 4 and 5 were never reached.' }
    ],
    continue: [
      { line: 0, vars: { i: 1 }, logs: [], desc: 'The loop starts. i is initialized to 1.' },
      { line: 1, vars: { i: 1 }, logs: [], desc: 'Checks condition: i == 3 (1 == 3) is False.' },
      { line: 3, vars: { i: 1 }, logs: ['1'], desc: 'Executes print(i). Prints 1.' },
      { line: 0, vars: { i: 2 }, logs: ['1'], desc: 'Assigns the next value 2 to i.' },
      { line: 1, vars: { i: 2 }, logs: ['1'], desc: 'Checks condition: i == 3 (2 == 3) is False.' },
      { line: 3, vars: { i: 2 }, logs: ['1', '2'], desc: 'Executes print(i). Prints 2.' },
      { line: 0, vars: { i: 3 }, logs: ['1', '2'], desc: 'Assigns the next value 3 to i.' },
      { line: 1, vars: { i: 3 }, logs: ['1', '2'], desc: 'Checks condition: i == 3 (3 == 3) is True!' },
      { line: 2, vars: { i: 3 }, logs: ['1', '2'], desc: '🔄 continue statement is triggered! It skips the rest of the current iteration (skipping printing 3) and jumps directly to the next loop cycle.' },
      { line: 0, vars: { i: 4 }, logs: ['1', '2'], desc: 'Assigns the next value 4 to i (Notice that 3 was skipped!).' },
      { line: 1, vars: { i: 4 }, logs: ['1', '2'], desc: 'Checks condition: i == 3 (4 == 3) is False.' },
      { line: 3, vars: { i: 4 }, logs: ['1', '2', '4'], desc: 'Executes print(i). Prints 4.' },
      { line: 0, vars: { i: 5 }, logs: ['1', '2', '4'], desc: 'Assigns the next value 5 to i.' },
      { line: 1, vars: { i: 5 }, logs: ['1', '2', '4'], desc: 'Checks condition: i == 3 (5 == 3) is False.' },
      { line: 3, vars: { i: 5 }, logs: ['1', '2', '4', '5'], desc: 'Executes print(i). Prints 5.' },
      { line: 0, vars: { i: 'Finished' }, logs: ['1', '2', '4', '5'], desc: 'All numbers processed. Loop terminates successfully.' }
    ]
  };

  const currentSteps = steps[activeTab];
  const currentCode = codes[activeTab];

  // Auto-play timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      if (stepIndex < currentSteps.length - 1) {
        timer = setTimeout(() => {
          setStepIndex(prev => prev + 1);
        }, 2000);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, stepIndex, activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setStepIndex(-1);
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (stepIndex < currentSteps.length - 1) {
      setStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
      setStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setStepIndex(-1);
    setIsPlaying(false);
  };

  const currentStep = stepIndex >= 0 ? currentSteps[stepIndex] : null;

  return (
    <div className="compiler-visualizer">
      {/* Tab selection */}
      <div className="visualizer-header">
        <div className="visualizer-tabs">
          {[
            { id: 'for', label: '🔁 for Loop' },
            { id: 'while', label: '🔄 while Loop' },
            { id: 'break', label: '🚫 break' },
            { id: 'continue', label: '⏭️ continue' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`visualizer-tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="visualizer-grid">
        {/* Left Side: Code Editor & Actions */}
        <div className="visualizer-panel">
          <div className="code-window">
            <div className="code-window-filename">loop_demo.py</div>
            <pre style={{ margin: 0, padding: 0, background: 'transparent', border: 'none' }}>
              <code style={{ background: 'transparent', border: 'none', padding: 0, display: 'block' }}>
                {currentCode.map((line, idx) => {
                  const isActive = currentStep && currentStep.line === idx;
                  return (
                    <div key={idx} className={`code-line ${isActive ? 'active' : ''}`}>
                      <span className="code-line-num">{idx + 1}</span>
                      <span style={{
                        color: line.code.includes('break') || line.code.includes('continue')
                          ? '#F59E0B'
                          : line.code.includes('range') || line.code.includes('while') || line.code.includes('for ') || line.code.includes('if ')
                            ? '#60A5FA'
                            : '#ECEFF1'
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
            <button
              className="vis-btn vis-btn-secondary"
              onClick={handlePrev}
              disabled={stepIndex <= 0}
            >
              ◀️ Prev
            </button>
            <button
              className="vis-btn vis-btn-primary"
              onClick={handleNext}
              disabled={stepIndex >= currentSteps.length - 1 || isPlaying}
            >
              ⏭️ Next
            </button>
            <button
              className={`vis-btn ${isPlaying ? 'vis-btn-danger' : 'vis-btn-success'}`}
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={stepIndex >= currentSteps.length - 1}
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Auto Play'}
            </button>
            <button
              className="vis-btn vis-btn-secondary"
              onClick={handleReset}
            >
              🔄 Reset
            </button>
          </div>
        </div>

        {/* Right Side: Variable State & Explanations */}
        <div className="visualizer-panel">
          {/* Variables State Watcher */}
          <div className="vars-card">
            <div style={{ fontWeight: 'bold', color: '#60A5FA', marginBottom: '0.6rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              📊 Variables Watcher
            </div>
            {currentStep ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontFamily: 'monospace', fontSize: '1rem' }}>
                {Object.entries(currentStep.vars).map(([name, value]) => (
                  <div key={name} style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#aaa' }}>{name} =</span>
                    <span style={{ color: '#10B981', fontWeight: 'bold' }}>{value}</span>
                  </div>
                ))}
                {activeTab === 'while' && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#aaa' }}>Condition (count &lt;= 3) =</span>
                    <span style={{
                      color: currentStep.vars.count <= 3 ? '#10B981' : '#EF4444',
                      fontWeight: 'bold'
                    }}>
                      {currentStep.vars.count <= 3 ? 'True' : 'False'}
                    </span>
                  </div>
                )}
                {(activeTab === 'break' || activeTab === 'continue') && currentStep.vars.i !== 'Finished' && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#aaa' }}>Condition (i == 3) =</span>
                    <span style={{
                      color: currentStep.vars.i === 3 ? '#10B981' : '#EF4444',
                      fontWeight: 'bold'
                    }}>
                      {currentStep.vars.i === 3 ? 'True' : 'False'}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <span style={{ color: '#555', fontStyle: 'italic' }}>Loop not started yet. Click Next Step or Auto Play.</span>
            )}
          </div>

          {/* Explanation Box */}
          <div className="info-card">
            <div style={{ fontWeight: 'bold', color: '#F59E0B', marginBottom: '0.6rem', fontSize: '1rem' }}>
              💡 What is happening in the background?
            </div>
            {currentStep ? (
              <span>{currentStep.desc}</span>
            ) : (
              <span>Click <b>"Next Step"</b> or <b>"Auto Play"</b> to step through the execution.</span>
            )}
          </div>

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
            <div className="terminal-body">
              {(!currentStep || currentStep.logs.length === 0) ? (
                <span style={{ color: '#555', fontStyle: 'italic' }}>Console output is empty.</span>
              ) : (
                currentStep.logs.map((log, idx) => (
                  <div key={idx} style={{ margin: '2px 0' }}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
