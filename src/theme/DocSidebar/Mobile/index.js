import React from 'react';
import clsx from 'clsx';
import {
  NavbarSecondaryMenuFiller,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import DocSidebarItems from '@theme/DocSidebarItems';
import { useLocation, useHistory } from '@docusaurus/router';

// The custom secondary menu filler component that renders inside the mobile drawer
const DocSidebarMobileSecondaryMenu = ({sidebar, path}) => {
  const mobileSidebar = useNavbarMobileSidebar();
  const location = useLocation();
  const history = useHistory();
  const pathname = location.pathname;

  // Determine active part based on current URL path
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

  const handleChange = (e) => {
    const val = e.target.value;
    // Hide mobile sidebar when changing part so it transitions cleanly
    if (mobileSidebar.shown) {
      mobileSidebar.toggle();
    }
    if (val === 'intro') {
      history.push('/');
    } else if (val === 'part1') {
      history.push('/part-1/module-0-before-python/computer-basics');
    } else if (val === 'part2') {
      history.push('/part-2/module-7-strings/string-basics');
    } else if (val === 'part3') {
      history.push('/part-3/module-13-error-handling');
    }
  };

  return (
    <>
      <div className="mobile-sidebar-dropdown-wrapper">
        <select 
          value={activePart} 
          onChange={handleChange}
          className="mobile-sidebar-select"
        >
          <option value="intro">Introduction</option>
          <option value="part1">Part 1: Programming & Basics</option>
          <option value="part2">Part 2: Data Structures & Funcs</option>
          <option value="part3">Part 3: Advanced & AI Foundation</option>
        </select>
        <div className="mobile-sidebar-select-icon">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
          </svg>
        </div>
      </div>
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems
          items={sidebar}
          activePath={path}
          onItemClick={(item) => {
            // Mobile sidebar should only be closed if the category has a link
            if (item.type === 'category' && item.href) {
              mobileSidebar.toggle();
            }
            if (item.type === 'link') {
              mobileSidebar.toggle();
            }
          }}
          level={1}
        />
      </ul>
    </>
  );
};

function DocSidebarMobile(props) {
  return (
    <NavbarSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}

export default React.memo(DocSidebarMobile);
