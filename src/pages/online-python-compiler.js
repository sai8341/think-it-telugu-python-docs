import React from 'react';
import Layout from '@theme/Layout';
import PythonLab from '@site/src/components/PythonLab/PythonLab';

export default function OnlinePythonCompilerPage() {
  return (
    <Layout
      title="Online Python Compiler - Run Python in Browser | Think IT Telugu"
      description="Free online Python compiler and interpreter by Think IT Telugu. Write, run, debug, and test Python 3 code instantly in your browser with zero setup."
      wrapperClassName="pylab-page"
      noFooter
    >
      <main className="pylab-page">
        <PythonLab />
      </main>
    </Layout>
  );
}
