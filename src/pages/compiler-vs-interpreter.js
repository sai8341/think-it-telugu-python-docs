import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import CompilerVisualizer from '@site/src/components/Visualizers/CompilerVisualizer';

export default function CompilerVsInterpreterPage() {
  useEffect(() => {
    document.body.classList.add('pylab-fullscreen-active', 'pylab-active');
    return () => document.body.classList.remove('pylab-fullscreen-active', 'pylab-active');
  }, []);

  return (
    <Layout
      title="Compiler vs Interpreter Visualizer"
      description="Interactive visualizer comparing C++ Compiler and Python Interpreter"
      wrapperClassName="pylab-page"
      noFooter
    >
      <main className="lab-page">
        <div className="lab-page__header">
          <span className="lab-page__eyebrow">Module 0 lab</span>
          <h1>Compiler vs Interpreter</h1>
          <p>Compare Python line-by-line execution with a C++ compile-and-run flow.</p>
        </div>

        <CompilerVisualizer />
      </main>
    </Layout>
  );
}
