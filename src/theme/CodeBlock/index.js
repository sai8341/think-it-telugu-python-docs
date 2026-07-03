import React from 'react';
import CodeBlock from '@theme-original/CodeBlock';

export default function CodeBlockWrapper(props) {
  // Check if it is a python code block
  const isPython = props.className?.includes('language-python') || props.language === 'python';
  
  // Extract code text from children
  let codeText = '';
  if (typeof props.children === 'string') {
    codeText = props.children;
  } else if (props.children?.props?.children) {
    codeText = props.children.props.children;
  } else if (props.value) {
    codeText = props.value;
  }

  // Handle click: copy code and open /python-lab in a new tab
  const handleTryInPythonLab = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('pylab_preloaded_code', codeText.trim());
      window.open('/python-lab', '_blank');
    }
  };

  return (
    <div className="custom-code-block-wrapper" style={{ position: 'relative' }}>
      {isPython && codeText.trim() && (
        <button
          onClick={handleTryInPythonLab}
          className="try-in-python-lab-btn"
          title="Try this code in PythonLab compiler"
        >
          <svg viewBox="0 0 24 24" className="try-in-pylab-icon">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Try in PythonLab
        </button>
      )}
      <CodeBlock {...props} />
    </div>
  );
}
