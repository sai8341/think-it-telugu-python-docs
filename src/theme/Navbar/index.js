import React, { useEffect } from 'react';
import Navbar from '@theme-original/Navbar';
import { useLocation } from '@docusaurus/router';
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
  let activePart = 'part1';
  if (pathname === '/' || pathname === '/course-welcome' || pathname === '/is-this-for-you') {
    activePart = 'intro';
  } else if (pathname.includes('/part-2/')) {
    activePart = 'part2';
  } else if (pathname.includes('/part-3/')) {
    activePart = 'part3';
  } else if (pathname.includes('/part-1/')) {
    activePart = 'part1';
  }

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
            to="/part-1/module-0-before-python"
            className={clsx('sub-navbar-item', activePart === 'part1' && 'sub-navbar-item--active')}
          >
            Part 1: Programming & Python Basics
          </Link>
          <Link
            to="/part-2/module-7-strings"
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
