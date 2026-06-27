import React from 'react';
import Layout from '@theme/Layout';
import PythonLab from '@site/src/components/PythonLab/PythonLab';

export default function PythonLabPage() {
  return (
    <Layout
      title="Python Lab — Online Python Compiler"
      description="Write and run Python code instantly in your browser. No installation needed."
      wrapperClassName="pylab-page"
      noFooter
    >
      {/* 
        The pylab-page class hides the docs sub-navbar (Part 1/2/3 tabs)
        and makes the playground take the full viewport height.
      */}
      <main className="pylab-page">
        <PythonLab />
      </main>
    </Layout>
  );
}
