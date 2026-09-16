import React, { useEffect } from 'react';
import Navbar from '@theme-original/Navbar';
import { useLocation } from '@docusaurus/router';
import { getActivePart } from '@site/src/utils/navigation';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { initGlobalPyodidePreloader } from '@site/src/utils/pyodidePreloader';

function LockIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="sub-navbar-lock-icon"
      aria-hidden="true"
    >
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </svg>
  );
}

export default function NavbarWrapper(props) {
  useEffect(() => {
    initGlobalPyodidePreloader();
  }, []);

  const location = useLocation();
  // Check if current page is a standalone page (Interview Prep, Lab, Visualizers)
  const isStandalonePage =
    location.pathname.includes('/interview-preparation') ||
    location.pathname.includes('/interview-questions') ||
    location.pathname.includes('/python-interview-questions') ||
    location.pathname.includes('/python-lab') ||
    location.pathname.includes('/online-python-compiler') ||
    location.pathname.includes('/compiler-vs-interpreter') ||
    location.pathname.includes('/loop-visualizer');

  // Determine active part based on the current URL path
  const activePart = getActivePart(location.pathname);

  return (
    <>
      <Navbar {...props} />
      {!isStandalonePage && (
        <div className="sub-navbar">
        <div className="sub-navbar-container">
          <Link
            to="/"
            className={clsx('sub-navbar-item', activePart === 'intro' && 'sub-navbar-item--active')}
            aria-current={activePart === 'intro' ? 'page' : undefined}
          >
            <span className="sub-navbar-title">Start</span>
          </Link>
          <Link
            to="/part-1/module-0-before-python/computer-basics"
            className={clsx('sub-navbar-item', activePart === 'part1' && 'sub-navbar-item--active')}
            aria-current={activePart === 'part1' ? 'page' : undefined}
          >
            <span className="sub-navbar-kicker">Part 1</span>
            <span className="sub-navbar-title">Basics</span>
          </Link>
          <Link
            to="/part-2/module-7-strings/string-basics"
            className={clsx('sub-navbar-item', activePart === 'part2' && 'sub-navbar-item--active')}
            aria-current={activePart === 'part2' ? 'page' : undefined}
          >
            <span className="sub-navbar-kicker">Part 2</span>
            <span className="sub-navbar-title">Data Structures</span>
          </Link>
          <Link
            to="/part-3/module-13-oop-basics/1-why-oop-classes-objects"
            className={clsx('sub-navbar-item', activePart === 'part3' && 'sub-navbar-item--active')}
            aria-current={activePart === 'part3' ? 'page' : undefined}
          >
            <span className="sub-navbar-kicker">Part 3</span>
            <span className="sub-navbar-title">Advanced Python</span>
          </Link>
          <Link
            to="/part-4/module-18-google-colab/what-is-colab"
            className={clsx('sub-navbar-item', activePart === 'part4' && 'sub-navbar-item--active')}
            aria-current={activePart === 'part4' ? 'page' : undefined}
          >
            <span className="sub-navbar-kicker">Part 4</span>
            <span className="sub-navbar-title">
              AI & ML <LockIcon />
            </span>
          </Link>
        </div>
      </div>
      )}
    </>
  );
}
