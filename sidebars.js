/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  courseSidebar: [
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
      label: 'Python Foundation',
      collapsed: false,
      link: {type: 'generated-index'},
      items: [
        { type: 'doc', id: 'module-1/introduction-to-python', label: 'Introduction to Python', className: 'icon-intro' },
        { type: 'doc', id: 'module-1/why-python-popular', label: 'Why Python is Popular', className: 'icon-book' },
        { type: 'doc', id: 'module-1/coding-environment-setup', label: 'Coding Setup Guide', className: 'icon-setup' },
        { type: 'doc', id: 'module-1/first-python-program', label: 'First Python Program', className: 'icon-code' },
      ],
    },
    {
      type: 'category',
      label: 'Core Coding Basics',
      collapsed: false,
      link: {type: 'generated-index'},
      items: [
        { type: 'doc', id: 'module-2/variables-identifiers', label: 'Variables & Identifiers', className: 'icon-data' },
        { type: 'doc', id: 'module-2/data-types', label: 'Primitive Data Types', className: 'icon-data' },
        { type: 'doc', id: 'module-2/input-output', label: 'Console Input & Output', className: 'icon-terminal' },
        { type: 'doc', id: 'module-2/operators-type-conversion', label: 'Operators & Type Conversion', className: 'icon-logic' },
      ],
    },
    {
      type: 'category',
      label: 'Logic & Control Flow',
      collapsed: false,
      link: {type: 'generated-index'},
      items: [
        { type: 'doc', id: 'module-3/conditional-structures', label: 'Conditional Statements', className: 'icon-logic' },
        { type: 'doc', id: 'module-3/loops', label: 'Iterative Control Loops', className: 'icon-loop' },
        { type: 'doc', id: 'module-3/logic-practice', label: 'Hands-on Logic Practice', className: 'icon-code' },
      ],
    },
    {
      type: 'category',
      label: 'Functions & Reusability',
      collapsed: false,
      link: {type: 'generated-index'},
      items: [
        { type: 'doc', id: 'module-4/intro-to-functions', label: 'Introduction to Functions', className: 'icon-func' },
        { type: 'doc', id: 'module-4/parameters-arguments-scope', label: 'Parameters & Scope', className: 'icon-func' },
        { type: 'doc', id: 'module-4/return-values', label: 'Return Values & Reusability', className: 'icon-check' },
      ],
    },
    {
      type: 'category',
      label: 'Data Structures',
      collapsed: false,
      link: {type: 'generated-index'},
      items: [
        { type: 'doc', id: 'module-5/lists-and-tuples', label: 'Lists & Tuples', className: 'icon-list' },
        { type: 'doc', id: 'module-5/dictionaries-and-sets', label: 'Dictionaries & Sets', className: 'icon-list' },
        { type: 'doc', id: 'module-5/list-vs-tuple-performance', label: 'Performance & Use Cases', className: 'icon-chart' },
      ],
    },
    {
      type: 'category',
      label: 'Real-World Python',
      collapsed: false,
      link: {type: 'generated-index'},
      items: [
        { type: 'doc', id: 'module-6/oop-classes-objects', label: 'OOP Classes & Objects', className: 'icon-box' },
        { type: 'doc', id: 'module-6/file-io-operations', label: 'File I/O Operations', className: 'icon-file' },
        { type: 'doc', id: 'module-6/python-modules', label: 'Modules & Standard Library', className: 'icon-book' },
      ],
    },
    {
      type: 'category',
      label: 'Assignments & Challenges',
      collapsed: false,
      link: {type: 'generated-index'},
      items: [
        { type: 'doc', id: 'module-7/logic-building-exercises', label: 'Logic Building Exercises', className: 'icon-edit' },
        { type: 'doc', id: 'module-7/mini-assignments', label: 'Mini-Assignments', className: 'icon-edit' },
        { type: 'doc', id: 'module-7/timed-challenges', label: 'Time-Bound Coding Challenges', className: 'icon-time' },
      ],
    },
    {
      type: 'category',
      label: 'Capstone Projects',
      collapsed: false,
      link: {type: 'generated-index'},
      items: [
        { type: 'doc', id: 'module-8/cli-calculator', label: 'Project 1: CLI Calculator', className: 'icon-star' },
        { type: 'doc', id: 'module-8/student-management-system', label: 'Project 2: Student SMS', className: 'icon-star' },
        { type: 'doc', id: 'module-8/todo-list-app', label: 'Project 3: To-Do App', className: 'icon-star' },
        { type: 'doc', id: 'module-8/mini-automation-script', label: 'Project 4: Automation Script', className: 'icon-star' },
      ],
    },
  ],
};

export default sidebars;
