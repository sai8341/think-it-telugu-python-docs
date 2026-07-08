/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  introSidebar: [

    {
      type: 'doc',
      id: 'intro',
      label: 'Start Here',
      className: 'icon-home',
    },
    {
      type: 'doc',
      id: 'course-welcome',
      label: 'From Confusion to Clarity',
      className: 'icon-intro',
    },
    {
      type: 'doc',
      id: 'is-this-for-you',
      label: 'Who Should Take This?',
      className: 'icon-check',
    },
  ],
  part1Sidebar: [

    {
      type: 'category',
      label: 'Part 1: Programming & Python Basics',
      collapsed: false,
      link: {type: 'generated-index'},
      items: [
        {
          type: 'category',
          label: 'Module 0: Before Python',
          className: 'icon-intro',
          collapsed: true,
          items: [
            'part-1/module-0-before-python/computer-basics',
            'part-1/module-0-before-python/how-code-runs',
            'part-1/module-0-before-python/why-python',
          ],
        },
        {
          type: 'category',
          label: 'Module 1: Getting Started',
          className: 'icon-setup',
          collapsed: true,
          items: [
            'part-1/module-1-getting-started/installing-python',
            'part-1/module-1-getting-started/vscode-setup',
            'part-1/module-1-getting-started/first-program',
          ],
        },
        {
          type: 'category',
          label: 'Module 2: Variables & Data Types',
          className: 'icon-data',
          collapsed: true,
          items: [
            'part-1/module-2-variables-datatypes/variables',
            'part-1/module-2-variables-datatypes/data-types',
            'part-1/module-2-variables-datatypes/strings',
            'part-1/module-2-variables-datatypes/numbers',
            'part-1/module-2-variables-datatypes/booleans',
            'part-1/module-2-variables-datatypes/exercises-qa',
          ],
        },
        {
          type: 'category',
          label: 'Module 3: Input & Output',
          className: 'icon-terminal',
          collapsed: true,
          items: [
            'part-1/module-3-input-output/print-output',
            'part-1/module-3-input-output/user-input',
            'part-1/module-3-input-output/string-formatting',
          ],
        },
        {
          type: 'category',
          label: 'Module 4: Operators',
          className: 'icon-logic',
          collapsed: true,
          items: [
            'part-1/module-4-operators/arithmetic-operators',
            'part-1/module-4-operators/assignment-operators',
            'part-1/module-4-operators/comparison-operators',
            'part-1/module-4-operators/logical-operators',
            'part-1/module-4-operators/membership-operators',
          ],
        },
        {
          type: 'category',
          label: 'Module 5: Conditional Statements',
          className: 'icon-check',
          collapsed: true,
          items: [
            'part-1/module-5-conditional-statements/if-else-logic',
            'part-1/module-5-conditional-statements/elif-chains',
            'part-1/module-5-conditional-statements/match-case-lab',
          ],
        },
        {
          type: 'category',
          label: 'Module 6: Loops',
          className: 'icon-loop',
          collapsed: true,
          items: [
            'part-1/module-6-loops/for-loops-range',
            'part-1/module-6-loops/while-loops',
            'part-1/module-6-loops/loop-control-lab',
          ],
        },
      ],
    },
  ],
  part2Sidebar: [

    {
      type: 'category',
      label: 'Part 2: Data Structures & Functions',
      collapsed: false,
      link: {type: 'generated-index'},
      items: [
        {
          type: 'category',
          label: 'Module 7: Strings',
          className: 'icon-code',
          collapsed: true,
          items: [
            'part-2/module-7-strings/string-basics',
            'part-2/module-7-strings/string-slicing',
            'part-2/module-7-strings/string-methods',
          ],
        },
        {
          type: 'category',
          label: 'Module 8: Lists',
          className: 'icon-list',
          collapsed: true,
          items: [
            'part-2/module-8-lists/list-basics',
            'part-2/module-8-lists/list-methods',
            'part-2/module-8-lists/list-comprehensions',
          ],
        },
        {
          type: 'category',
          label: 'Module 9: Tuples',
          className: 'icon-list',
          collapsed: true,
          items: [
            'part-2/module-9-tuples/tuple-basics',
            'part-2/module-9-tuples/packing-unpacking',
          ],
        },
        {
          type: 'category',
          label: 'Module 10: Sets',
          className: 'icon-list',
          collapsed: true,
          items: [
            'part-2/module-10-sets/set-basics',
            'part-2/module-10-sets/set-operations',
          ],
        },
        {
          type: 'category',
          label: 'Module 11: Dictionaries',
          className: 'icon-data',
          collapsed: true,
          items: [
            'part-2/module-11-dictionaries/dict-basics',
            'part-2/module-11-dictionaries/dict-methods',
            'part-2/module-11-dictionaries/nested-dicts-iteration',
          ],
        },
        {
          type: 'category',
          label: 'Module 12: Functions',
          className: 'icon-func',
          collapsed: true,
          items: [
            'part-2/module-12-functions/defining-functions',
            'part-2/module-12-functions/default-args-scope',
            'part-2/module-12-functions/args-kwargs',
            'part-2/module-12-functions/lambda-recursion',
            'part-2/module-12-functions/generators-decorators',
          ],
        },
      ],
    },
  ],
  part3Sidebar: [

    {
      type: 'category',
      label: 'Part 3: Advanced Basics & AI Foundation',
      collapsed: false,
      link: {type: 'generated-index'},
      items: [
        { type: 'doc', id: 'part-3/module-13-error-handling', label: 'Module 13: Error Handling', className: 'icon-edit' },
        { type: 'doc', id: 'part-3/module-14-file-handling', label: 'Module 14: File Handling', className: 'icon-file' },
        { type: 'doc', id: 'part-3/module-15-json', label: 'Module 15: JSON', className: 'icon-code' },
        {
          type: 'category',
          label: 'Module 16: Modules & Packages',
          className: 'icon-book',
          collapsed: true,
          items: [
            'part-3/module-16-modules-packages/modules',
            'part-3/module-16-modules-packages/virtual-environments',
            'part-3/module-16-modules-packages/packages-uv',
            'part-3/module-16-modules-packages/exercises-qa',
          ],
        },
        {
          type: 'category',
          label: 'Module 17: Object-Oriented Programming',
          className: 'icon-box',
          collapsed: true,
          items: [
            'part-3/module-17-oop-basics/why-oop',
            'part-3/module-17-oop-basics/constructors-init',
            'part-3/module-17-oop-basics/four-pillars',
            'part-3/module-17-oop-basics/dunder-methods',
            'part-3/module-17-oop-basics/exercises-qa',
          ],
        },
        {
          type: 'category',
          label: 'Module 18: Git & Version Control',
          className: 'icon-book',
          collapsed: true,
          items: [
            'part-3/module-18-git-version-control/version-control-basics',
            'part-3/module-18-git-version-control/core-git-workflow',
            'part-3/module-18-git-version-control/github-gitignore',
            'part-3/module-18-git-version-control/exercises-qa',
          ],
        },
        {
          type: 'category',
          label: 'Module 19: Python for Data Science',
          className: 'icon-data',
          collapsed: true,
          items: [
            'part-3/module-19-python-for-data-science/data-science-intro',
            'part-3/module-19-python-for-data-science/pandas-dataframes',
            'part-3/module-19-python-for-data-science/matplotlib-visualization',
            'part-3/module-19-python-for-data-science/weather-app-project',
            'part-3/module-19-python-for-data-science/exercises-qa',
          ],
        },
        {
          type: 'category',
          label: 'Module 20: Python for AI Engineering',
          className: 'icon-star',
          collapsed: true,
          items: [
            'part-3/module-20-python-for-ai-engineering/ai-engineering-apis',
            'part-3/module-20-python-for-ai-engineering/dotenv-secrets',
            'part-3/module-20-python-for-ai-engineering/chatbot-memory-project',
            'part-3/module-20-python-for-ai-engineering/rag-embeddings',
            'part-3/module-20-python-for-ai-engineering/pydantic-validation',
            'part-3/module-20-python-for-ai-engineering/exercises-qa',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
