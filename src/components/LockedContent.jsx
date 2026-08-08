import React from 'react';
import Link from '@docusaurus/Link';

export default function LockedContent({ moduleName }) {
  return (
    <div className="locked-content-container">
      <div className="locked-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      </div>
      <h2 className="locked-title">Premium Module Locked</h2>
      <p className="locked-desc">
        The <strong>{moduleName || "AI & ML"}</strong> module is exclusively available to students of our Premium Python Masterclass. 
        Get full access to all advanced topics, Python Lab, and video tutorials.
      </p>
      <Link href="https://thinkittelugu.graphy.com" className="locked-button">
        Unlock Full Course
      </Link>
    </div>
  );
}
