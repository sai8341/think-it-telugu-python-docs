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
            'part-1/module-1-getting-started/how-code-runs',
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
          ],
        },
        {
          type: 'category',
          label: 'Module 12.5: Comprehensions & Pythonic Patterns',
          className: 'icon-code',
          collapsed: true,
          items: [
            'part-2/module-12.5-comprehensions/1-list-comprehensions',
            'part-2/module-12.5-comprehensions/2-dict-set-comprehensions',
            'part-2/module-12.5-comprehensions/3-pythonic-patterns',
            'part-2/module-12.5-comprehensions/4-exercises-qa',
          ],
        },
      ],
    },
  ],
  part3Sidebar: [

    {
      type: 'category',
      label: 'Part 3: AI & ML Engineering',
      collapsed: false,
      link: {type: 'generated-index'},
      items: [
        {
          type: 'category',
          label: 'Module 13: OOP Basics',
          className: 'icon-box',
          collapsed: true,
          items: [
            'part-3/module-13-oop-basics/1-why-oop-classes-objects',
            'part-3/module-13-oop-basics/2-memory-references-dot',
            'part-3/module-13-oop-basics/3-constructors-init-self',
            'part-3/module-13-oop-basics/4-methods-variables-scope',
            'part-3/module-13-oop-basics/5-class-static-methods',
            'part-3/module-13-oop-basics/6-magic-dunder-methods',
            'part-3/module-13-oop-basics/7-inheritance',
            'part-3/module-13-oop-basics/8-polymorphism',
            'part-3/module-13-oop-basics/9-encapsulation',
            'part-3/module-13-oop-basics/10-abstraction',
            'part-3/module-13-oop-basics/11-generators-decorators',
            'part-3/module-13-oop-basics/12-exercises-placement-qa',
          ],
        },
        {
          type: 'category',
          label: 'Module 14: Error Handling',
          className: 'icon-edit',
          collapsed: true,
          items: [
            'part-3/module-14-error-handling/0-intro',
            'part-3/module-14-error-handling/1-what-are-errors',
            'part-3/module-14-error-handling/2-syntax-errors',
            'part-3/module-14-error-handling/3-runtime-errors',
            'part-3/module-14-error-handling/4-try-except',
            'part-3/module-14-error-handling/5-finally-block',
            'part-3/module-14-error-handling/6-raising-exceptions',
            'part-3/module-14-error-handling/7-exercises-qa',
          ],
        },
        {
          type: 'category',
          label: 'Module 15: File Handling',
          className: 'icon-file',
          collapsed: true,
          items: [
            'part-3/module-15-file-handling/0-intro',
            'part-3/module-15-file-handling/1-what-is-a-file',
            'part-3/module-15-file-handling/2-reading-files',
            'part-3/module-15-file-handling/3-writing-appending',
          ],
        },
        {
          type: 'category',
          label: 'Module 15b: JSON',
          className: 'icon-code',
          collapsed: true,
          items: [
            'part-3/module-15-json/0-intro',
            'part-3/module-15-json/1-what-is-json',
            'part-3/module-15-json/2-json-structure',
            'part-3/module-15-json/3-reading-writing',
            'part-3/module-15-json/4-ai-uses-json',
          ],
        },
        {
          type: 'category',
          label: 'Module 16: Modules & Packages',
          className: 'icon-book',
          collapsed: true,
          items: [
            'part-3/module-16-modules-packages/1-modules',
            'part-3/module-16-modules-packages/2-virtual-environments',
            'part-3/module-16-modules-packages/3-packages-uv',
            'part-3/module-16-modules-packages/4-exercises-qa',
          ],
        },
        {
          type: 'category',
          label: 'Module 17: Git & Version Control',
          className: 'icon-book',
          collapsed: true,
          items: [
            'part-3/module-17-git-version-control/1-version-control-basics',
            'part-3/module-17-git-version-control/2-core-git-workflow',
            'part-3/module-17-git-version-control/3-github-gitignore',
            'part-3/module-17-git-version-control/4-exercises-qa',
          ],
        },
        {
          type: 'category',
          label: 'Module 18: Google Colab',
          className: 'icon-star',
          collapsed: true,
          items: [
            'part-3/module-18-google-colab/1-what-is-colab',
          ],
        },
        {
          type: 'category',
          label: 'Module 19: NumPy & Data Math',
          className: 'icon-data',
          collapsed: true,
          items: [
            'part-3/module-19-numpy-data-math/1-why-numpy',
            'part-3/module-19-numpy-data-math/2-basic-statistics',
          ],
        },
        {
          type: 'category',
          label: 'Module 20: Pandas & Data Cleaning',
          className: 'icon-data',
          collapsed: true,
          items: [
            'part-3/module-20-pandas-data-cleaning/1-dataframes-intro',
            'part-3/module-20-pandas-data-cleaning/2-cleaning-messy-data',
          ],
        },
        {
          type: 'category',
          label: 'Module 21: Matplotlib & Visualization',
          className: 'icon-data',
          collapsed: true,
          items: [
            'part-3/module-21-matplotlib-visualization/1-charts-and-plots',
          ],
        },
        {
          type: 'category',
          label: 'Module 22: ML Foundations',
          className: 'icon-star',
          collapsed: true,
          items: [
            'part-3/module-22-ml-foundations/1-what-is-ml',
            'part-3/module-22-ml-foundations/2-train-test-linear-regression',
          ],
        },
        {
          type: 'category',
          label: 'Module 23: Classification',
          className: 'icon-star',
          collapsed: true,
          items: [
            'part-3/module-23-classification/1-classification-basics',
          ],
        },
        {
          type: 'category',
          label: 'Module 24: REST APIs & AI',
          className: 'icon-star',
          collapsed: true,
          items: [
            'part-3/module-24-rest-apis-ai/1-apis-and-ai',
          ],
        },
        {
          type: 'category',
          label: 'Module 25: Prompt Engineering',
          className: 'icon-star',
          collapsed: true,
          items: [
            'part-3/module-25-prompt-engineering/1-prompt-engineering',
          ],
        },
        {
          type: 'category',
          label: 'Module 26: RAG & Vector Databases',
          className: 'icon-star',
          collapsed: true,
          items: [
            'part-3/module-26-rag-vector-databases/1-rag-basics',
          ],
        },
        {
          type: 'category',
          label: 'Module 27: Pydantic & Production',
          className: 'icon-star',
          collapsed: true,
          items: [
            'part-3/module-27-pydantic-production/1-pydantic-validation',
          ],
        },
        {
          type: 'category',
          label: 'Module 28: Capstone Project',
          className: 'icon-star',
          collapsed: true,
          items: [
            'part-3/module-28-capstone-project/1-capstone-project',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
