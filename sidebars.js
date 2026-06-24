/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  part1Sidebar: [
    {
      type: 'html',
      value: '<a href="https://youtube.com/@ThinkIT-Telugu" target="_blank" class="sidebar-youtube-btn"><svg viewBox="0 0 24 24" class="sidebar-yt-icon"><path fill="currentColor" d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.86-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/></svg> Watch on YouTube</a>',
      defaultStyle: true,
    },
    {
      type: 'doc',
      id: 'intro',
      label: 'Welcome Cover',
      className: 'icon-home',
    },
    {
      type: 'category',
      label: 'Part 1: Programming & Python Basics',
      collapsed: false,
      link: {type: 'generated-index'},
      items: [
        { type: 'doc', id: 'part-1/module-0-before-python', label: 'Module 0: Before Python', className: 'icon-intro' },
        { type: 'doc', id: 'part-1/module-1-getting-started', label: 'Module 1: Getting Started', className: 'icon-setup' },
        { type: 'doc', id: 'part-1/module-2-variables-datatypes', label: 'Module 2: Variables & Data Types', className: 'icon-data' },
        { type: 'doc', id: 'part-1/module-3-input-output', label: 'Module 3: Input & Output', className: 'icon-terminal' },
        { type: 'doc', id: 'part-1/module-4-operators', label: 'Module 4: Operators', className: 'icon-logic' },
        { type: 'doc', id: 'part-1/module-5-conditional-statements', label: 'Module 5: Conditional Statements', className: 'icon-check' },
        { type: 'doc', id: 'part-1/module-6-loops', label: 'Module 6: Loops', className: 'icon-loop' },
      ],
    },
  ],
  part2Sidebar: [
    {
      type: 'html',
      value: '<a href="https://youtube.com/@ThinkIT-Telugu" target="_blank" class="sidebar-youtube-btn"><svg viewBox="0 0 24 24" class="sidebar-yt-icon"><path fill="currentColor" d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.86-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/></svg> Watch on YouTube</a>',
      defaultStyle: true,
    },
    {
      type: 'category',
      label: 'Part 2: Data Structures & Functions',
      collapsed: false,
      link: {type: 'generated-index'},
      items: [
        { type: 'doc', id: 'part-2/module-7-strings', label: 'Module 7: Strings', className: 'icon-code' },
        { type: 'doc', id: 'part-2/module-8-lists', label: 'Module 8: Lists', className: 'icon-list' },
        { type: 'doc', id: 'part-2/module-9-tuples', label: 'Module 9: Tuples', className: 'icon-list' },
        { type: 'doc', id: 'part-2/module-10-sets', label: 'Module 10: Sets', className: 'icon-list' },
        { type: 'doc', id: 'part-2/module-11-dictionaries', label: 'Module 11: Dictionaries', className: 'icon-data' },
        { type: 'doc', id: 'part-2/module-12-functions', label: 'Module 12: Functions', className: 'icon-func' },
      ],
    },
  ],
  part3Sidebar: [
    {
      type: 'html',
      value: '<a href="https://youtube.com/@ThinkIT-Telugu" target="_blank" class="sidebar-youtube-btn"><svg viewBox="0 0 24 24" class="sidebar-yt-icon"><path fill="currentColor" d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.86-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/></svg> Watch on YouTube</a>',
      defaultStyle: true,
    },
    {
      type: 'category',
      label: 'Part 3: Advanced Basics & AI Foundation',
      collapsed: false,
      link: {type: 'generated-index'},
      items: [
        { type: 'doc', id: 'part-3/module-13-error-handling', label: 'Module 13: Error Handling', className: 'icon-edit' },
        { type: 'doc', id: 'part-3/module-14-file-handling', label: 'Module 14: File Handling', className: 'icon-file' },
        { type: 'doc', id: 'part-3/module-15-json', label: 'Module 15: JSON', className: 'icon-code' },
        { type: 'doc', id: 'part-3/module-16-modules-packages', label: 'Module 16: Modules & Packages', className: 'icon-book' },
        { type: 'doc', id: 'part-3/module-17-oop-basics', label: 'Module 17: OOP Basics', className: 'icon-box' },
        { type: 'doc', id: 'part-3/module-18-python-for-ai', label: 'Module 18: Python for AI', className: 'icon-star' },
      ],
    },
  ],
};

export default sidebars;
