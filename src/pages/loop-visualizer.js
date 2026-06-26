import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import ResponsiveLoopVisualizer from '@site/src/components/Visualizers/ResponsiveLoopVisualizer';

export default function LoopVisualizerPage() {
  useEffect(() => {
    document.body.classList.add('pylab-fullscreen-active', 'pylab-active');
    return () => document.body.classList.remove('pylab-fullscreen-active', 'pylab-active');
  }, []);

  return (
    <Layout
      title="Loop Visualizer"
      description="Interactive loop tracer visualizing Python loops step-by-step"
      wrapperClassName="pylab-page"
      noFooter
    >
      <main className="lab-page">
        <div className="lab-page__header">
          <span className="lab-page__eyebrow">Module 6 lab</span>
          <h1>Python Loop Visualizer</h1>
          <p>Step through loop flow, variable changes, conditions, and console output.</p>
        </div>

        <ResponsiveLoopVisualizer />
      </main>
    </Layout>
  );
}
