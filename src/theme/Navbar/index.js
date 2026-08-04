import React, { useEffect } from 'react';
import Navbar from '@theme-original/Navbar';
import { useLocation } from '@docusaurus/router';
import { getActivePart } from '@site/src/utils/navigation';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { initGlobalPyodidePreloader } from '@site/src/utils/pyodidePreloader';

export default function NavbarWrapper(props) {
  useEffect(() => {
    initGlobalPyodidePreloader();
  }, []);

  const location = useLocation();
  // Determine active part based on the current URL path
  const activePart = getActivePart(location.pathname);

  return (
    <>
      <Navbar {...props} />
      <div className="sub-navbar">
        <div className="sub-navbar-container">
          <Link
            to="/"
            className={clsx('sub-navbar-item', activePart === 'intro' && 'sub-navbar-item--active')}
            aria-current={activePart === 'intro' ? 'page' : undefined}
          >
            <span className="sub-navbar-kicker">Start</span>
            <span className="sub-navbar-title">Introduction</span>
          </Link>
          <Link
            to="/part-1/module-0-before-python/computer-basics"
            className={clsx('sub-navbar-item', activePart === 'part1' && 'sub-navbar-item--active')}
            aria-current={activePart === 'part1' ? 'page' : undefined}
          >
            <span className="sub-navbar-kicker">Part 1</span>
            <span className="sub-navbar-title">Programming basics</span>
          </Link>
          <Link
            to="/part-2/module-7-strings/string-basics"
            className={clsx('sub-navbar-item', activePart === 'part2' && 'sub-navbar-item--active')}
            aria-current={activePart === 'part2' ? 'page' : undefined}
          >
            <span className="sub-navbar-kicker">Part 2</span>
            <span className="sub-navbar-title">Data structures</span>
          </Link>
          <Link
            to="/part-3/module-13-oop-basics/1-why-oop-classes-objects"
            className={clsx('sub-navbar-item', activePart === 'part3' && 'sub-navbar-item--active')}
            aria-current={activePart === 'part3' ? 'page' : undefined}
          >
            <span className="sub-navbar-kicker">Part 3</span>
            <span className="sub-navbar-title">Applied Python</span>
          </Link>
          <Link
            to="/part-4/module-18-google-colab/what-is-colab"
            className={clsx('sub-navbar-item', activePart === 'part4' && 'sub-navbar-item--active')}
            aria-current={activePart === 'part4' ? 'page' : undefined}
          >
            <span className="sub-navbar-kicker">Part 4 🔒</span>
            <span className="sub-navbar-title">AI & ML</span>
          </Link>
        </div>
      </div>
    </>
  );
}
