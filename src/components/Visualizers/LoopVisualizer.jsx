import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const codeSamples = {
  for: [
    { text: 'for i in range(1, 6):', indent: 0 },
    { text: '    print(f"Number is {i}")', indent: 4 }
  ],
  while: [
    { text: 'count = 1', indent: 0 },
    { text: 'while count <= 3:', indent: 0 },
    { text: '    print(f"Count is {count}")', indent: 4 },
    { text: '    count += 1', indent: 4 }
  ],
  break: [
    { text: 'for i in range(1, 6):', indent: 0 },
    { text: '    if i == 3:', indent: 4 },
    { text: '        break', indent: 8 },
    { text: '    print(i)', indent: 4 }
  ],
  continue: [
    { text: 'for i in range(1, 6):', indent: 0 },
    { text: '    if i == 3:', indent: 4 },
    { text: '        continue', indent: 8 },
    { text: '    print(i)', indent: 4 }
  ]
};

const stepData = {
  for: [
    { line: 0, vars: { i: 1 }, logs: [], desc: 'Loop starts. range(1, 6) generates sequence [1, 2, 3, 4, 5]. First iteration sets i = 1.', activeVal: 1, sequence: [1, 2, 3, 4, 5] },
    { line: 1, vars: { i: 1 }, logs: ['Number is 1'], desc: 'Executing indented block: print(f"Number is {i}") outputs "Number is 1".', activeVal: 1, sequence: [1, 2, 3, 4, 5] },
    { line: 0, vars: { i: 2 }, logs: ['Number is 1'], desc: 'Loop advances to next iteration. i is updated to 2.', activeVal: 2, sequence: [1, 2, 3, 4, 5] },
    { line: 1, vars: { i: 2 }, logs: ['Number is 1', 'Number is 2'], desc: 'Executing indented block: outputs "Number is 2".', activeVal: 2, sequence: [1, 2, 3, 4, 5] },
    { line: 0, vars: { i: 3 }, logs: ['Number is 1', 'Number is 2'], desc: 'Loop advances to next iteration. i is updated to 3.', activeVal: 3, sequence: [1, 2, 3, 4, 5] },
    { line: 1, vars: { i: 3 }, logs: ['Number is 1', 'Number is 2', 'Number is 3'], desc: 'Executing indented block: outputs "Number is 3".', activeVal: 3, sequence: [1, 2, 3, 4, 5] },
    { line: 0, vars: { i: 4 }, logs: ['Number is 1', 'Number is 2', 'Number is 3'], desc: 'Loop advances to next iteration. i is updated to 4.', activeVal: 4, sequence: [1, 2, 3, 4, 5] },
    { line: 1, vars: { i: 4 }, logs: ['Number is 1', 'Number is 2', 'Number is 3', 'Number is 4'], desc: 'Executing indented block: outputs "Number is 4".', activeVal: 4, sequence: [1, 2, 3, 4, 5] },
    { line: 0, vars: { i: 5 }, logs: ['Number is 1', 'Number is 2', 'Number is 3', 'Number is 4'], desc: 'Loop advances to final value in range. i is updated to 5.', activeVal: 5, sequence: [1, 2, 3, 4, 5] },
    { line: 1, vars: { i: 5 }, logs: ['Number is 1', 'Number is 2', 'Number is 3', 'Number is 4', 'Number is 5'], desc: 'Executing indented block: outputs "Number is 5".', activeVal: 5, sequence: [1, 2, 3, 4, 5] },
    { line: -1, vars: { i: 'Finished' }, logs: ['Number is 1', 'Number is 2', 'Number is 3', 'Number is 4', 'Number is 5'], desc: 'Sequence range(1, 6) completed. Loop ends.', activeVal: null, sequence: [1, 2, 3, 4, 5] }
  ],
  while: [
    { line: 0, vars: { count: 1 }, logs: [], desc: 'Variable count is initialized to 1.', activeVal: 1 },
    { line: 1, vars: { count: 1 }, logs: [], desc: 'Evaluating condition: count <= 3 (1 <= 3) -> True. Loop body runs.', activeVal: 1, condition: true },
    { line: 2, vars: { count: 1 }, logs: ['Count is 1'], desc: 'Executing line 2: prints "Count is 1".', activeVal: 1 },
    { line: 3, vars: { count: 2 }, logs: ['Count is 1'], desc: 'Executing line 3: count += 1 updates count to 2.', activeVal: 2 },
    { line: 1, vars: { count: 2 }, logs: ['Count is 1'], desc: 'Re-evaluating condition: count <= 3 (2 <= 3) -> True.', activeVal: 2, condition: true },
    { line: 2, vars: { count: 2 }, logs: ['Count is 1', 'Count is 2'], desc: 'Prints "Count is 2".', activeVal: 2 },
    { line: 3, vars: { count: 3 }, logs: ['Count is 1', 'Count is 2'], desc: 'count += 1 updates count to 3.', activeVal: 3 },
    { line: 1, vars: { count: 3 }, logs: ['Count is 1', 'Count is 2'], desc: 'Re-evaluating condition: count <= 3 (3 <= 3) -> True.', activeVal: 3, condition: true },
    { line: 2, vars: { count: 3 }, logs: ['Count is 1', 'Count is 2', 'Count is 3'], desc: 'Prints "Count is 3".', activeVal: 3 },
    { line: 3, vars: { count: 4 }, logs: ['Count is 1', 'Count is 2', 'Count is 3'], desc: 'count += 1 updates count to 4.', activeVal: 4 },
    { line: 1, vars: { count: 4 }, logs: ['Count is 1', 'Count is 2', 'Count is 3'], desc: 'Re-evaluating condition: count <= 3 (4 <= 3) -> False. Loop stops.', activeVal: 4, condition: false }
  ],
  break: [
    { line: 0, vars: { i: 1 }, logs: [], desc: 'Iteration 1: i = 1.', activeVal: 1, sequence: [1, 2, 3, 4, 5] },
    { line: 1, vars: { i: 1 }, logs: [], desc: 'Check condition: if i == 3 (1 == 3) -> False. Skip break.', activeVal: 1, sequence: [1, 2, 3, 4, 5] },
    { line: 3, vars: { i: 1 }, logs: ['1'], desc: 'Executing print(i): outputs 1.', activeVal: 1, sequence: [1, 2, 3, 4, 5] },
    { line: 0, vars: { i: 2 }, logs: ['1'], desc: 'Iteration 2: i = 2.', activeVal: 2, sequence: [1, 2, 3, 4, 5] },
    { line: 1, vars: { i: 2 }, logs: ['1'], desc: 'Check condition: if i == 3 (2 == 3) -> False. Skip break.', activeVal: 2, sequence: [1, 2, 3, 4, 5] },
    { line: 3, vars: { i: 2 }, logs: ['1', '2'], desc: 'Executing print(i): outputs 2.', activeVal: 2, sequence: [1, 2, 3, 4, 5] },
    { line: 0, vars: { i: 3 }, logs: ['1', '2'], desc: 'Iteration 3: i = 3.', activeVal: 3, sequence: [1, 2, 3, 4, 5] },
    { line: 1, vars: { i: 3 }, logs: ['1', '2'], desc: 'Check condition: if i == 3 (3 == 3) -> True.', activeVal: 3, sequence: [1, 2, 3, 4, 5] },
    { line: 2, vars: { i: 3 }, logs: ['1', '2'], desc: 'Executing break statement: terminates loop immediately.', activeVal: 3, event: 'BREAK', sequence: [1, 2, 3, 4, 5] },
    { line: -1, vars: { i: 'Terminated' }, logs: ['1', '2'], desc: 'Loop exited early at i = 3. Remaining values 3, 4, 5 were skipped.', activeVal: null, sequence: [1, 2, 3, 4, 5] }
  ],
  continue: [
    { line: 0, vars: { i: 1 }, logs: [], desc: 'Iteration 1: i = 1.', activeVal: 1, sequence: [1, 2, 3, 4, 5] },
    { line: 1, vars: { i: 1 }, logs: [], desc: 'Check condition: if i == 3 (1 == 3) -> False.', activeVal: 1, sequence: [1, 2, 3, 4, 5] },
    { line: 3, vars: { i: 1 }, logs: ['1'], desc: 'Executing print(i): outputs 1.', activeVal: 1, sequence: [1, 2, 3, 4, 5] },
    { line: 0, vars: { i: 2 }, logs: ['1'], desc: 'Iteration 2: i = 2.', activeVal: 2, sequence: [1, 2, 3, 4, 5] },
    { line: 1, vars: { i: 2 }, logs: ['1'], desc: 'Check condition: if i == 3 (2 == 3) -> False.', activeVal: 2, sequence: [1, 2, 3, 4, 5] },
    { line: 3, vars: { i: 2 }, logs: ['1', '2'], desc: 'Executing print(i): outputs 2.', activeVal: 2, sequence: [1, 2, 3, 4, 5] },
    { line: 0, vars: { i: 3 }, logs: ['1', '2'], desc: 'Iteration 3: i = 3.', activeVal: 3, sequence: [1, 2, 3, 4, 5] },
    { line: 1, vars: { i: 3 }, logs: ['1', '2'], desc: 'Check condition: if i == 3 (3 == 3) -> True.', activeVal: 3, sequence: [1, 2, 3, 4, 5] },
    { line: 2, vars: { i: 3 }, logs: ['1', '2'], desc: 'Executing continue statement: skips print(i) for i = 3 and moves to next round.', activeVal: 3, event: 'SKIP', sequence: [1, 2, 3, 4, 5] },
    { line: 0, vars: { i: 4 }, logs: ['1', '2'], desc: 'Iteration 4: i = 4.', activeVal: 4, sequence: [1, 2, 3, 4, 5] },
    { line: 1, vars: { i: 4 }, logs: ['1', '2'], desc: 'Check condition: if i == 3 (4 == 3) -> False.', activeVal: 4, sequence: [1, 2, 3, 4, 5] },
    { line: 3, vars: { i: 4 }, logs: ['1', '2', '4'], desc: 'Executing print(i): outputs 4.', activeVal: 4, sequence: [1, 2, 3, 4, 5] },
    { line: 0, vars: { i: 5 }, logs: ['1', '2', '4'], desc: 'Iteration 5: i = 5.', activeVal: 5, sequence: [1, 2, 3, 4, 5] },
    { line: 1, vars: { i: 5 }, logs: ['1', '2', '4'], desc: 'Check condition: if i == 3 (5 == 3) -> False.', activeVal: 5, sequence: [1, 2, 3, 4, 5] },
    { line: 3, vars: { i: 5 }, logs: ['1', '2', '4', '5'], desc: 'Executing print(i): outputs 5.', activeVal: 5, sequence: [1, 2, 3, 4, 5] },
    { line: -1, vars: { i: 'Finished' }, logs: ['1', '2', '4', '5'], desc: 'Loop completed. Notice that 3 was skipped.', activeVal: null, sequence: [1, 2, 3, 4, 5] }
  ]
};

const tabItems = [
  { id: 'for', label: 'For Loop' },
  { id: 'while', label: 'While Loop' },
  { id: 'break', label: 'Break Keyword' },
  { id: 'continue', label: 'Continue Keyword' }
];

function renderHighlightedPython(text) {
  const parts = [];
  const tokenRegex = /(for|while|in|range|if|break|continue|print|count|i|\d+|"[^"]*")/g;
  let lastIdx = 0;
  let match;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push({ text: text.substring(lastIdx, match.index), type: 'plain' });
    }
    const val = match[0];
    let type = 'plain';
    if (['for', 'while', 'in', 'if', 'break', 'continue'].includes(val)) type = 'keyword';
    else if (['range', 'print'].includes(val)) type = 'builtin';
    else if (/^\d+$/.test(val)) type = 'number';
    else if (/^"[^"]*"$/.test(val)) type = 'string';
    else if (['i', 'count'].includes(val)) type = 'variable';

    parts.push({ text: val, type });
    lastIdx = tokenRegex.lastIndex;
  }
  if (lastIdx < text.length) {
    parts.push({ text: text.substring(lastIdx), type: 'plain' });
  }

  return parts.map((p, i) => {
    let color = '#e2e8f0';
    let fontWeight = '400';
    if (p.type === 'keyword') { color = '#38bdf8'; fontWeight = '700'; }
    else if (p.type === 'builtin') { color = '#fbbf24'; fontWeight = '600'; }
    else if (p.type === 'string') { color = '#4ade80'; }
    else if (p.type === 'number') { color = '#f472b6'; fontWeight = '600'; }
    else if (p.type === 'variable') { color = '#a78bfa'; fontWeight = '600'; }

    return <span key={i} style={{ color, fontWeight }}>{p.text}</span>;
  });
}

export default function LoopVisualizer({ defaultTab = 'for' }) {
  const [tab, setTab] = useState(defaultTab);
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  const code = codeSamples[tab];
  const steps = useMemo(() => stepData[tab], [tab]);
  const current = step >= 0 ? steps[step] : null;
  const done = step >= steps.length - 1;
  const progress = step >= 0 ? ((step + 1) / steps.length) * 100 : 0;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      setStep(p => {
        if (p >= steps.length - 1) { setPlaying(false); return p; }
        return p + 1;
      });
    }, speed);
    return () => clearTimeout(t);
  }, [playing, step, steps, speed]);

  const switchTab = (id) => { setTab(id); setStep(-1); setPlaying(false); };
  const next = () => setStep(p => Math.min(p + 1, steps.length - 1));
  const prev = () => { setStep(p => Math.max(p - 1, -1)); setPlaying(false); };
  const reset = () => { setStep(-1); setPlaying(false); };

  return (
    <div className="lv-wrapper">
      <div className="lv-container">
        
        {/* TOP TAB CONTROL HEADER (Clean, No AI Emojis, No Duplicate Title) */}
        <div className="lv-header">
          <div className="lv-tab-selector">
            {tabItems.map(t => (
              <button 
                key={t.id} 
                onClick={() => switchTab(t.id)} 
                className={`lv-tab-btn ${tab === t.id ? 'active' : ''}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="lv-progress-info">
            <span className="lv-step-text">Step <strong>{Math.max(step + 1, 0)}</strong> of <strong>{steps.length}</strong></span>
            <div className="lv-progress-track">
              <div className="lv-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {/* SEQUENCE & CONDITION STATUS BANNER */}
        {(current && (current.sequence || current.condition !== undefined || current.event)) && (
          <div className="lv-status-bar">
            {current.sequence && (
              <div className="lv-status-group">
                <span className="lv-status-label">Sequence Values:</span>
                <div className="lv-sequence-pills">
                  {current.sequence.map(v => (
                    <motion.div
                      key={v}
                      className={`lv-seq-pill ${current.activeVal === v ? 'active' : ''}`}
                      animate={current.activeVal === v ? { scale: [1, 1.15, 1.05], backgroundColor: '#0ea5e9' } : { scale: 1, backgroundColor: '#1e293b' }}
                      transition={{ duration: 0.15 }}
                    >
                      {v}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'while' && current.condition !== undefined && (
              <div className="lv-status-group">
                <span className="lv-status-label">Condition:</span>
                <motion.span
                  key={`${current.condition}-${step}`}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`lv-condition-badge ${current.condition ? 'true' : 'false'}`}
                >
                  count {'<='} 3 → {current.condition ? 'True (Loop Body Runs)' : 'False (Loop Stops)'}
                </motion.span>
              </div>
            )}

            {current.event && (
              <motion.span
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`lv-event-tag ${current.event === 'BREAK' ? 'break' : 'skip'}`}
              >
                {current.event === 'BREAK' ? 'Break Triggered: Loop Exited' : 'Continue Triggered: Round Skipped'}
              </motion.span>
            )}
          </div>
        )}

        {/* MAIN VISUALIZER GRID */}
        <div className="lv-grid">
          
          {/* LEFT PANEL: CODE EDITOR */}
          <div className="lv-panel lv-panel-editor">
            <div className="lv-panel-header">
              <div className="lv-panel-title">
                <span className="lv-dot red"></span>
                <span className="lv-dot yellow"></span>
                <span className="lv-dot green"></span>
                <span className="lv-filename">main.py</span>
              </div>
              <span className="lv-lang-tag">Python 3</span>
            </div>

            <div className="lv-editor-body">
              {code.map((lineObj, idx) => {
                const active = current && current.line === idx;
                return (
                  <motion.div
                    key={`${tab}-${idx}`}
                    className={`lv-code-row ${active ? 'active' : ''}`}
                    animate={active ? { backgroundColor: 'rgba(14, 165, 233, 0.18)' } : { backgroundColor: 'transparent' }}
                  >
                    <span className="lv-line-number">{idx + 1}</span>
                    <div className="lv-line-content">
                      {renderHighlightedPython(lineObj.text)}
                    </div>
                    {active && (
                      <motion.span 
                        className="lv-executing-indicator"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        Executing Line
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT PANEL: MEMORY + EXPLANATION + CONSOLE */}
          <div className="lv-panel lv-panel-state">
            
            {/* MEMORY / VARIABLES STATE */}
            <div className="lv-state-box">
              <div className="lv-box-header">
                <span className="lv-box-title">Variables in Memory</span>
              </div>
              <div className="lv-box-body">
                {current ? (
                  <div className="lv-variables-container">
                    <AnimatePresence mode="popLayout">
                      {Object.entries(current.vars).map(([k, v]) => (
                        <motion.div
                          key={`${k}-${v}`}
                          className="lv-variable-card"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.9, opacity: 0 }}
                        >
                          <span className="lv-var-key">{k}</span>
                          <span className="lv-var-assign">=</span>
                          <span className="lv-var-value">{String(v)}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <span className="lv-placeholder">Click 'Start Loop' to track variable state.</span>
                )}
              </div>
            </div>

            {/* STEP EXPLANATION */}
            <div className="lv-state-box lv-explanation-box">
              <div className="lv-box-header">
                <span className="lv-box-title">Step Explanation</span>
              </div>
              <div className="lv-box-body">
                <p className="lv-explanation-text">
                  {current ? current.desc : 'Click Start or Next to trace Python loop execution line-by-line.'}
                </p>
              </div>
            </div>

            {/* CONSOLE STDOUT OUTPUT */}
            <div className="lv-state-box lv-console-box">
              <div className="lv-box-header">
                <span className="lv-box-title">Console Output</span>
              </div>
              <div className="lv-console-display">
                {(!current || current.logs.length === 0) ? (
                  <span className="lv-console-idle">No printed output yet.</span>
                ) : (
                  <div className="lv-console-lines">
                    {current.logs.map((log, i) => (
                      <motion.div
                        key={`${log}-${i}`}
                        className="lv-console-row"
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <span className="lv-prompt-symbol">&gt;</span>
                        <span className="lv-log-text">{log}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM ACTION TOOLBAR */}
        <div className="lv-toolbar">
          <div className="lv-btn-group">
            <button className="lv-btn lv-btn-secondary" onClick={prev} disabled={step < 0}>
              Prev Step
            </button>
            <button className="lv-btn lv-btn-primary" onClick={next} disabled={done || playing}>
              {step < 0 ? 'Start Loop' : 'Next Step'}
            </button>
            {playing ? (
              <button className="lv-btn lv-btn-pause" onClick={() => setPlaying(false)}>
                Pause
              </button>
            ) : (
              <button className="lv-btn lv-btn-autoplay" onClick={() => setPlaying(true)} disabled={done}>
                Auto Play
              </button>
            )}
            <button className="lv-btn lv-btn-reset" onClick={reset}>
              Reset
            </button>
          </div>

          <div className="lv-speed-selector">
            <span className="lv-speed-label">Speed:</span>
            <button 
              className={`lv-speed-btn ${speed === 1200 ? 'active' : ''}`} 
              onClick={() => setSpeed(1200)}
            >
              0.75x
            </button>
            <button 
              className={`lv-speed-btn ${speed === 800 ? 'active' : ''}`} 
              onClick={() => setSpeed(800)}
            >
              1x
            </button>
            <button 
              className={`lv-speed-btn ${speed === 400 ? 'active' : ''}`} 
              onClick={() => setSpeed(400)}
            >
              2x
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
