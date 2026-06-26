import React, { useEffect, useMemo, useState } from 'react';

const codeSamples = {
  for: [
    'for i in range(1, 6):',
    '    print(f"Number is {i}")'
  ],
  while: [
    'count = 1',
    'while count <= 3:',
    '    print(f"Count is {count}")',
    '    count += 1'
  ],
  break: [
    'for i in range(1, 6):',
    '    if i == 3:',
    '        break',
    '    print(i)'
  ],
  continue: [
    'for i in range(1, 6):',
    '    if i == 3:',
    '        continue',
    '    print(i)'
  ]
};

const stepData = {
  for: [
    { line: 0, vars: { i: 1 }, logs: [], desc: 'The loop starts. range(1, 6) gives the first value, 1.' },
    { line: 1, vars: { i: 1 }, logs: ['Number is 1'], desc: 'The print line runs for i = 1.' },
    { line: 0, vars: { i: 2 }, logs: ['Number is 1'], desc: 'Python goes back to the loop header and takes the next value, 2.' },
    { line: 1, vars: { i: 2 }, logs: ['Number is 1', 'Number is 2'], desc: 'The print line runs for i = 2.' },
    { line: 0, vars: { i: 3 }, logs: ['Number is 1', 'Number is 2'], desc: 'Python takes the next value, 3.' },
    { line: 1, vars: { i: 3 }, logs: ['Number is 1', 'Number is 2', 'Number is 3'], desc: 'The print line runs for i = 3.' },
    { line: 0, vars: { i: 4 }, logs: ['Number is 1', 'Number is 2', 'Number is 3'], desc: 'Python takes the next value, 4.' },
    { line: 1, vars: { i: 4 }, logs: ['Number is 1', 'Number is 2', 'Number is 3', 'Number is 4'], desc: 'The print line runs for i = 4.' },
    { line: 0, vars: { i: 5 }, logs: ['Number is 1', 'Number is 2', 'Number is 3', 'Number is 4'], desc: 'Python takes the final value, 5.' },
    { line: 1, vars: { i: 5 }, logs: ['Number is 1', 'Number is 2', 'Number is 3', 'Number is 4', 'Number is 5'], desc: 'The print line runs for i = 5.' },
    { line: -1, vars: { i: 'finished' }, logs: ['Number is 1', 'Number is 2', 'Number is 3', 'Number is 4', 'Number is 5'], desc: 'No values are left in the range. The loop stops.' }
  ],
  while: [
    { line: 0, vars: { count: 1 }, logs: [], desc: 'count starts with value 1.' },
    { line: 1, vars: { count: 1 }, logs: [], desc: 'Python checks count <= 3. It is True, so the loop body runs.' },
    { line: 2, vars: { count: 1 }, logs: ['Count is 1'], desc: 'The print line displays the current count.' },
    { line: 3, vars: { count: 2 }, logs: ['Count is 1'], desc: 'count increases by 1. It becomes 2.' },
    { line: 1, vars: { count: 2 }, logs: ['Count is 1'], desc: 'The condition is checked again. 2 <= 3 is True.' },
    { line: 2, vars: { count: 2 }, logs: ['Count is 1', 'Count is 2'], desc: 'The print line runs for count = 2.' },
    { line: 3, vars: { count: 3 }, logs: ['Count is 1', 'Count is 2'], desc: 'count increases to 3.' },
    { line: 1, vars: { count: 3 }, logs: ['Count is 1', 'Count is 2'], desc: 'The condition is still True because 3 <= 3.' },
    { line: 2, vars: { count: 3 }, logs: ['Count is 1', 'Count is 2', 'Count is 3'], desc: 'The print line runs for count = 3.' },
    { line: 3, vars: { count: 4 }, logs: ['Count is 1', 'Count is 2', 'Count is 3'], desc: 'count increases to 4.' },
    { line: 1, vars: { count: 4 }, logs: ['Count is 1', 'Count is 2', 'Count is 3'], desc: '4 <= 3 is False. The loop stops.' }
  ],
  break: [
    { line: 0, vars: { i: 1 }, logs: [], desc: 'The loop starts with i = 1.' },
    { line: 1, vars: { i: 1 }, logs: [], desc: 'The condition i == 3 is False.' },
    { line: 3, vars: { i: 1 }, logs: ['1'], desc: 'Python prints 1.' },
    { line: 0, vars: { i: 2 }, logs: ['1'], desc: 'The loop moves to i = 2.' },
    { line: 1, vars: { i: 2 }, logs: ['1'], desc: 'The condition i == 3 is still False.' },
    { line: 3, vars: { i: 2 }, logs: ['1', '2'], desc: 'Python prints 2.' },
    { line: 0, vars: { i: 3 }, logs: ['1', '2'], desc: 'The loop moves to i = 3.' },
    { line: 1, vars: { i: 3 }, logs: ['1', '2'], desc: 'The condition i == 3 is True.' },
    { line: 2, vars: { i: 3 }, logs: ['1', '2'], desc: 'break runs. Python exits the whole loop immediately.' },
    { line: -1, vars: { i: 'stopped' }, logs: ['1', '2'], desc: 'The loop stopped early, so 3, 4, and 5 were not printed.' }
  ],
  continue: [
    { line: 0, vars: { i: 1 }, logs: [], desc: 'The loop starts with i = 1.' },
    { line: 1, vars: { i: 1 }, logs: [], desc: 'The condition i == 3 is False.' },
    { line: 3, vars: { i: 1 }, logs: ['1'], desc: 'Python prints 1.' },
    { line: 0, vars: { i: 2 }, logs: ['1'], desc: 'The loop moves to i = 2.' },
    { line: 1, vars: { i: 2 }, logs: ['1'], desc: 'The condition i == 3 is False.' },
    { line: 3, vars: { i: 2 }, logs: ['1', '2'], desc: 'Python prints 2.' },
    { line: 0, vars: { i: 3 }, logs: ['1', '2'], desc: 'The loop moves to i = 3.' },
    { line: 1, vars: { i: 3 }, logs: ['1', '2'], desc: 'The condition i == 3 is True.' },
    { line: 2, vars: { i: 3 }, logs: ['1', '2'], desc: 'continue runs. Python skips print(i) for this cycle.' },
    { line: 0, vars: { i: 4 }, logs: ['1', '2'], desc: 'The loop jumps to the next value, 4.' },
    { line: 1, vars: { i: 4 }, logs: ['1', '2'], desc: 'The condition i == 3 is False.' },
    { line: 3, vars: { i: 4 }, logs: ['1', '2', '4'], desc: 'Python prints 4.' },
    { line: 0, vars: { i: 5 }, logs: ['1', '2', '4'], desc: 'The loop moves to i = 5.' },
    { line: 1, vars: { i: 5 }, logs: ['1', '2', '4'], desc: 'The condition i == 3 is False.' },
    { line: 3, vars: { i: 5 }, logs: ['1', '2', '4', '5'], desc: 'Python prints 5.' },
    { line: -1, vars: { i: 'finished' }, logs: ['1', '2', '4', '5'], desc: 'The loop is complete. Only 3 was skipped.' }
  ]
};

const tabs = [
  { id: 'for', label: 'for loop' },
  { id: 'while', label: 'while loop' },
  { id: 'break', label: 'break' },
  { id: 'continue', label: 'continue' }
];

function getLineClassName(line) {
  if (line.includes('break') || line.includes('continue')) return 'code-token-warning';
  if (line.includes('for ') || line.includes('while') || line.includes('if ') || line.includes('range')) return 'code-token-keyword';
  return '';
}

export default function ResponsiveLoopVisualizer() {
  const [activeTab, setActiveTab] = useState('for');
  const [stepIndex, setStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentCode = codeSamples[activeTab];
  const currentSteps = useMemo(() => stepData[activeTab], [activeTab]);
  const currentStep = stepIndex >= 0 ? currentSteps[stepIndex] : null;
  const isComplete = stepIndex >= currentSteps.length - 1;

  useEffect(() => {
    if (!isPlaying) return undefined;

    const timer = setTimeout(() => {
      setStepIndex(prev => {
        if (prev >= currentSteps.length - 1) {
          setIsPlaying(false);
          return prev;
        }

        return prev + 1;
      });
    }, 900);

    return () => clearTimeout(timer);
  }, [isPlaying, stepIndex, currentSteps]);

  function changeTab(tab) {
    setActiveTab(tab);
    setStepIndex(-1);
    setIsPlaying(false);
  }

  function nextStep() {
    setStepIndex(prev => Math.min(prev + 1, currentSteps.length - 1));
  }

  function previousStep() {
    setStepIndex(prev => Math.max(prev - 1, -1));
    setIsPlaying(false);
  }

  function reset() {
    setStepIndex(-1);
    setIsPlaying(false);
  }

  return (
    <div className="responsive-visualizer">
      <div className="visualizer-header">
        <div className="visualizer-control-group">
          <span className="visualizer-label">Loop type</span>
          <div className="visualizer-tabs" role="tablist" aria-label="Loop type">
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => changeTab(tab.id)}
                className={`visualizer-tab ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="step-counter">
          Step {Math.max(stepIndex + 1, 0)} of {currentSteps.length}
        </div>
      </div>

      <div className="visualizer-grid">
        <section className="visualizer-panel visualizer-panel--code">
          <div className="panel-heading">
            <span>Code</span>
            <span className="panel-heading__meta">loop_demo.py</span>
          </div>

          <div className="code-window">
            <pre>
              <code>
                {currentCode.map((line, idx) => {
                  const isActive = currentStep && currentStep.line === idx;

                  return (
                    <div key={`${activeTab}-${line}`} className={`code-line ${isActive ? 'active' : ''}`}>
                      <span className="code-line-num">{idx + 1}</span>
                      <span className={getLineClassName(line)}>{line}</span>
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>

          <div className="visualizer-actions">
            <button type="button" className="vis-btn vis-btn-secondary" onClick={previousStep} disabled={stepIndex < 0}>
              Prev
            </button>
            <button type="button" className="vis-btn vis-btn-primary" onClick={nextStep} disabled={isComplete || isPlaying}>
              {stepIndex < 0 ? 'Start Step' : 'Next Step'}
            </button>
            <button type="button" className="vis-btn vis-btn-success" onClick={() => setIsPlaying(true)} disabled={isPlaying || isComplete}>
              Auto Play
            </button>
            <button type="button" className="vis-btn vis-btn-secondary" onClick={reset}>
              Reset
            </button>
          </div>
        </section>

        <section className="visualizer-panel visualizer-panel--output">
          <div className="vars-card">
            <span className="info-card__title">Variables</span>
            {currentStep ? (
              <div className="vars-list">
                {Object.entries(currentStep.vars).map(([name, value]) => (
                  <span key={name} className="var-pill">
                    {name} = <strong>{value}</strong>
                  </span>
                ))}
                {activeTab === 'while' && typeof currentStep.vars.count === 'number' && (
                  <span className="var-pill">
                    count &lt;= 3 = <strong>{currentStep.vars.count <= 3 ? 'True' : 'False'}</strong>
                  </span>
                )}
                {(activeTab === 'break' || activeTab === 'continue') && typeof currentStep.vars.i === 'number' && (
                  <span className="var-pill">
                    i == 3 = <strong>{currentStep.vars.i === 3 ? 'True' : 'False'}</strong>
                  </span>
                )}
              </div>
            ) : (
              <p className="muted-text">Variables appear after you start the first step.</p>
            )}
          </div>

          <div className="info-card">
            <span className="info-card__title">Execution explanation</span>
            <p>{currentStep ? currentStep.desc : 'Press Start Step to trace the loop one line at a time.'}</p>
          </div>

          <div className="terminal-wrapper">
            <div className="terminal-header">
              <span className="terminal-title">Console Output</span>
            </div>
            <div className="terminal-body">
              {(!currentStep || currentStep.logs.length === 0) ? (
                <span className="terminal-empty">No printed output yet.</span>
              ) : (
                currentStep.logs.map((log, idx) => (
                  <div key={`${log}-${idx}`} className="terminal-line">
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
