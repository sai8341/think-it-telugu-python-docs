import React from 'react';
import clsx from 'clsx';
import {
  NavbarSecondaryMenuFiller,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import DocSidebarItems from '@theme/DocSidebarItems';
import { useLocation, useHistory } from '@docusaurus/router';
import { getActivePart } from '@site/src/utils/navigation';

// The custom secondary menu filler component that renders inside the mobile drawer.
// In Docusaurus 3, we avoid using useNavbarMobileSidebar here as it may return undefined
// outside of the Navbar context, and we let Docusaurus automatically handle closing
// the mobile drawer on page navigation.
const DocSidebarMobileSecondaryMenu = ({sidebar, path}) => {
  const location = useLocation();
  const history = useHistory();
  const pathname = location.pathname;

  // Determine active part based on current URL path
  const activePart = getActivePart(pathname);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val === 'intro') {
      history.push('/');
    } else if (val === 'part1') {
      history.push('/part-1/module-0-before-python/computer-basics');
    } else if (val === 'part2') {
      history.push('/part-2/module-7-strings/string-basics');
    } else if (val === 'part3') {
      history.push('/part-3/module-13-oop-basics/1-why-oop-classes-objects');
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
          <option value="intro">Start</option>
          <option value="part1">Part 1: Basics</option>
          <option value="part2">Part 2: Data Structures</option>
          <option value="part3">Part 3: Advanced Python</option>
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
            // Let Docusaurus's router handle closing the sidebar drawer
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
