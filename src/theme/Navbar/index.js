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
  const pathname = location.pathname;

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
          >
            Introduction
          </Link>
          <Link
            to="/part-1/module-0-before-python/computer-basics"
            className={clsx('sub-navbar-item', activePart === 'part1' && 'sub-navbar-item--active')}
          >
            Part 1: Programming & Python Basics
          </Link>
          <Link
            to="/part-2/module-7-strings/string-basics"
            className={clsx('sub-navbar-item', activePart === 'part2' && 'sub-navbar-item--active')}
          >
            Part 2: Data Structures & Functions
          </Link>
          <Link
            to="/part-3/module-13-error-handling"
            className={clsx('sub-navbar-item', activePart === 'part3' && 'sub-navbar-item--active')}
          >
            Part 3: Advanced Python & AI Foundation
          </Link>
        </div>
      </div>
    </>
  );
}
