# AGENTS.md — Think IT Telugu Python Documentation & Course Architecture

This document provides definitive instructions, architectural patterns, and guardrails for AI coding agents operating on the **Think IT Telugu Python Documentation** repository (`python.thinkittelugu.in`).

---

## 1. Project Mission & Pedagogical Philosophy

- **Platform Purpose**: An open-source, ultra-clear Python & AI/ML documentation platform tailored for beginners, college freshers, and non-CS career switchers.
- **Dual-Language Learning Strategy**:
  - **Video Lectures (YouTube)**: Recorded in clear, friendly **Telugu** explaining real-life analogies, visual logic, and the "why".
  - **Documentation Website**: Written in **crystal-clear, jargon-free English** so students develop the vocabulary required for tech job interviews and corporate engineering.
- **Pedagogical Golden Rule**: **Zero cognitive overload**. Never use textbook jargon (e.g., "lexical scoping", "polymorphic dispatch") without a relatable, real-world metaphor first (e.g., sharing chocolates, bank accounts, grocery carts).

---

## 2. Technology Stack & CLI Workflow

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Core Framework** | Docusaurus v3.10.1 | Classic preset with `@docusaurus/faster` (Rspack tooling) |
| **Runtime & UI** | React 19 & MDX v3 | Full MDX support with auto-registered custom theme components |
| **Search Engine** | `@easyops-cn/docusaurus-search-local` | Offline local indexing (`docsRouteBasePath: '/'`) |
| **Styling** | Modular Vanilla CSS | Located in `src/css/` (imported by `src/css/custom.css`) |
| **LMS Exports** | Node.js + `xlsx` (SheetJS) | Generates Graphy bulk-upload spreadsheets (`.xlsx` and `.csv`) |
| **SEO Scripts** | Python 3 | Automated frontmatter, heading promotion, and keyword auditing |

### Standard Terminal Commands
```bash
# Start local development server (default port: 3000, fallback: 3001)
npm start

# Build production bundle (Strict compilation check)
npm run build

# Clear Docusaurus cache if experiencing stale builds
npm run clear

# Generate Quiz spreadsheets for Graphy LMS
node generate_arithmetic_operators_quiz.js
```

---

## 3. Repository Structure & Key Directories

```
think-it-telugu-python-docs/
├── .agents/
│   └── AGENTS.md                  # <-- Primary agent instruction handbook (This file)
├── docs/                          # All documentation MDX files
│   ├── intro.md                   # Home landing page (slug: /)
│   ├── course-welcome.md          # Origin story & beginner encouragement
│   ├── is-this-for-you.md         # Audience guidance
│   ├── part-1/                    # Modules 0 to 6 (Basics, Data Types, I/O, Operators, If-Else, Loops)
│   ├── part-2/                    # Modules 7 to 12.5 (Strings, Lists, Tuples, Sets, Dicts, Functions, Comprehensions)
│   ├── part-3/                    # Modules 13 to 24 (OOP, Errors, Files, JSON, Modules, Git, RegEx, APIs, DB, Threads)
│   └── part-4/                    # Modules 18 to 28 (Locked AI & ML engineering modules with upsell triggers)
├── src/
│   ├── components/                # React custom components
│   │   ├── Cards/                 # <CardGroup> and <Card> components
│   │   ├── Accordion/             # <AccordionGroup> and <Accordion> components
│   │   ├── Quiz/                  # Interactive in-doc quiz component
│   │   ├── LockedContent.jsx      # Visual lock container for Part 4 Upsell
│   │   ├── CourseUpsell.jsx       # Graphy masterclass promotional CTA
│   │   ├── ZoomableImage/         # Responsive image zoom wrapper
│   │   └── PythonLab/             # Embedded playground / visualizers
│   ├── css/                       # Modular CSS stylesheets
│   ├── pages/                     # Standalone custom React pages (python-lab.js, etc.)
│   └── theme/
│       └── MDXComponents/index.js # Global MDX component auto-registration
├── static/
│   ├── img/                       # Logos, social cards, and illustrations
│   ├── robots.txt                 # SEO crawler rules
│   └── .htaccess                  # Apache server routing rules
├── docusaurus.config.js           # Main Docusaurus configuration
├── sidebars.js                    # Sidebar navigation hierarchy
└── package.json                   # Dependencies and scripts
```

---

## 4. Syllabus Structure, Release Scope & Business Funnel

### Current Documentation Release Scope (Active vs. Locked Roadmap)
- **Active Public Release (Current Live Scope)**:
  - **Part 1, Part 2, and Part 3 (Modules 0 to 24)** covering pure Python fundamentals through Advanced Python programming are the **only modules being released right now** in this documentation.
  - All content in Parts 1 to 3 must be complete, beginner-friendly, and accessible to the public.
- **Part 4 (AI & ML Engineering) — Currently Locked**:
  - Part 4 is **intentionally locked** right now using `<LockedContent moduleName="..." />`.
  - It serves as a visual teaser (FOMO / curiosity builder) and upsell for the Graphy Masterclass.
  - **Future Roadmap**: Part 4 will be unlocked in phases over a period of time. AI agents must **never** remove the lock or publish unlocked lessons in Part 4 unless given explicit user confirmation for a future phased release.

---

### Curriculum Breakdown

1. **Part 1: Programming & Python Basics (Free / Active Release)**
   - Module 0: Before Python (Computer basics, CPU/RAM, why Python)
   - Module 1: Getting Started (Installation, VS Code, First script, How code runs)
   - Module 2: Variables & Data Types (Numbers, Strings, Booleans, Casting)
   - Module 3: Input & Output (`print`, `input`, f-strings)
   - Module 4: Operators (Arithmetic, Assignment, Comparison, Logical, Membership)
   - Module 5: Conditional Statements (`if`, `elif`, `else`, `match-case`)
   - Module 6: Loops (`for`, `while`, `range`, `break`, `continue`, nested loops)

2. **Part 2: Data Structures & Functions (Free / Active Release)**
   - Modules 7–11: Strings, Lists, Tuples, Sets, Dictionaries
   - Module 12: Functions (Definition, default arguments, `*args`/`**kwargs`, lambda, scope)
   - Module 12.5: Comprehensions & Pythonic Patterns (List/Dict/Set comprehensions)

3. **Part 3: Advanced Python Programming (Free / Active Release)**
   - Modules 13–24: OOP (Classes, Dunder methods, Inheritance, Polymorphism, Encapsulation, Abstraction), Error Handling (`try-except-finally`), File Handling, JSON, Modules & Packages (`uv`/`pip`), Git & GitHub, Advanced Functions (Decorators/Generators), RegEx, DateTime/Math, HTTP APIs (`requests`), SQLite3, Multithreading, Unit Testing (`unittest`/`pytest`).

4. **Part 4: AI & ML Engineering 🔒 (Locked — Future Phased Unlock)**
   - Modules 18–28: Google Colab, NumPy, Pandas, Matplotlib, ML Foundations, Classification, REST APIs & AI, Prompt Engineering, RAG & Vector DBs, Pydantic, Capstone Project.
   - **Current State**: Must remain visually locked with `<LockedContent moduleName="..." />`.


---

## 5. MDX & Content Formatting Standards

### Frontmatter Template
Every `.mdx` file in `docs/` MUST start with this complete frontmatter block:
```yaml
---
sidebar_position: 1
title: "Topic Name in Python - Simple Explanation | Think IT Telugu"
sidebar_label: "Topic Name"
description: "Learn Topic Name in Python with real-world examples and code snippets. Clear beginner-friendly guide by Think IT Telugu."
keywords: [python topic name, learn python in telugu, python beginners, python ai course]
---
```

### Headings & Structure Rules
1. **Single H1 (`#`)**: Exactly one H1 per file matching the primary topic.
2. **Logical Hierarchy**: Use `##` for major sections and `###` for sub-concepts. Never skip heading levels.
3. **No Unescaped Braces in Markdown**: In MDX, `{` and `}` are parsed as JavaScript expressions. When explaining dictionary syntax or formatting placeholders outside code blocks, escape them (e.g., `\{"key": "value"\}`) or wrap them in inline code `` `{"key": "value"}` ``.
4. **Admonition Syntax**:
   ```markdown
   :::tip Golden Rule
   Division (`/`) in Python always returns a Float (`5.0`), even if numbers divide evenly!
   :::

   :::note Remember
   Variable names cannot start with numbers.
   :::

   :::warning Common Mistake
   Do not confuse `=` (assignment) with `==` (comparison check).
   :::
   ```

---

## 6. Custom React Components Usage in MDX

The following components are globally available in all `.mdx` files via `src/theme/MDXComponents/index.js` (no import statement needed):

### 1. Card & CardGroup
Use for visual navigation, feature summaries, or concept comparisons:
```jsx
<CardGroup cols={2}>
  <Card title="Floor Division (//)" icon="code">
    Divides two numbers and rounds down to the nearest whole integer.
  </Card>
  <Card title="Modulus (%)" icon="data">
    Divides two numbers and returns only the leftover remainder.
  </Card>
</CardGroup>
```

### 2. Interactive In-Doc Quiz
Embed practice checks directly inside lessons:
```jsx
<Quiz
  question="What is the result of 10 // 3 in Python?"
  options={["3.33", "3", "1", "3.0"]}
  correctIndex={1}
  explanation="Floor division (//) removes any decimal fraction and rounds down to the nearest whole number (3)."
/>
```

### 3. Accordions
Use for FAQ sections, deep-dive explanations, or interview questions:
```jsx
<AccordionGroup>
  <Accordion title="Why does 10 / 2 return 5.0 instead of 5?">
    Python 3 designs standard division (`/`) to always produce a floating-point number to prevent accidental precision loss.
  </Accordion>
</AccordionGroup>
```

### 4. Locked Content (Part 4 Only)
```jsx
import LockedContent from '@site/src/components/LockedContent';

<LockedContent moduleName="NumPy & Data Math" />
```

---

## 7. Python Code Example Standards

1. **Clear Output Comments**: Always show exact output as a comment directly beneath `print()` calls:
   ```python
   # Correct
   score = 95
   print(f"Your score is: {score}")  # Output: Your score is: 95
   ```
2. **Beginner-Friendly Variable Names**: Use descriptive words (`student_name`, `cart_total`, `is_logged_in`) instead of single letters (`x`, `y`, `temp`, `foo`).
3. **No Unexplained Syntax Spoilers**: Do not introduce advanced syntax (e.g., list comprehensions, lambda, decorators) inside beginner modules (Part 1).
4. **Copy-Paste Runnable**: Every code snippet must execute without missing variable definitions or imports.

---

## 8. Graphy LMS & NxtWave Style Content Generation

For every video topic in the curriculum, the Graphy LMS module requires this exact sequence:

1. **Video Lecture**: High-definition Telugu tutorial recorded using docs at `python.thinkittelugu.in`.
2. **Cheat Sheet**: High-detail summary markdown scanned directly from the documentation.
3. **MCQs (20 Questions)**: 20 single-correct questions exported via Node.js script into Graphy bulk upload `.xlsx` format in `C:/Users/saikumar/Desktop/Graphy_Python_Quizzes/`.
4. **Tutorial: [Topic Name]**: NxtWave-style step-by-step tutorial explaining how to think, approach, and code 3 coding problems.
5. **Coding Practice 1 (Basic)**: Real-world/doc-based practice problem 1.
6. **Coding Practice 2 (Intermediate)**: Real-world/doc-based practice problem 2.
7. **Coding Practice 3 (Advanced)**: Scenario-based practice problem 3.
8. **Assignment [N]**: Unassisted comprehensive coding test with 4 test cases.

### Graphy Quiz Excel Schema (21 Columns)
```javascript
const headers = [
  "S No.", "SUBJECT", "TOPIC", "TAGS", "QUESTION TYPE", "QUESTION TEXT",
  "OPTION1", "OPTION2", "OPTION3", "OPTION4", "OPTION5", "OPTION6",
  "OPTION7", "OPTION8", "OPTION9", "OPTION10", "RIGHT ANSWER", "EXPLANATION",
  "CORRECT MARKS", "NEGATIVE MARKS", "DIFFICULTY"
];
```
- **Language**: Use **super simple, clear English** (e.g., `"is False"` instead of `"evaluated to False"`, `"before it"` instead of `"preceding"`) so Telugu beginners understand without ambiguity.
- **Marks**: Standard is `1.00` correct, `0.00` negative.
- **Difficulty Spread**: 8 Easy, 8 Medium, 4 Hard.

---

## 9. SEO & Static Asset Guidelines

- **Image Formats**: Use SVG for vector diagrams and WebP/PNG for screenshots.
- **Image Directory**: Store all static images in `static/img/` or `static/img/illustrations/`.
- **Image Markup**: Use standard markdown image tags `![Alt description](/img/your-image.png)`. The custom `ZoomableImage` component automatically handles zoom interactions.
- **Descriptive Alt Text**: Every image MUST include descriptive alt text for accessibility and search indexing.
- **Sitemap & Meta**: Defined automatically by `@docusaurus/preset-classic` using baseUrl `https://python.thinkittelugu.in`.

---

## 10. Quality Assurance & Build Verification

Before finishing any documentation or code modification turn, agents must verify:

1. **Broken Link Check**: Ensure all internal links (e.g., `/part-1/module-2-variables-datatypes/variables`) exist in `docs/` and are registered in `sidebars.js`.
2. **MDX Syntax Validation**: Verify all JSX tags are properly closed and special characters like `{`, `}` or `<` inside plain markdown are safely escaped or enclosed in code spans.
3. **Build Check**: Run `npm run build` whenever structural changes to `docusaurus.config.js`, `sidebars.js`, or custom React components are made.

---

## 11. Strict Guardrails & AI Anti-Patterns (What NEVER to Do)

- ❌ **DO NOT re-enable the top announcement banner** in `docusaurus.config.js` without explicit human instruction. The banner is hidden by default during the documentation release and only enabled during official course launch campaigns.
- ❌ **DO NOT use complex academic jargon** in Part 1 and Part 2 without immediate real-world analogies.
- ❌ **DO NOT break MDX compilation** with unescaped curly braces in regular paragraph text.
- ❌ **DO NOT modify or unlock Part 4 content** without explicit user instruction (Part 4 must maintain its locked upsell state).
- ❌ **DO NOT use inline styling** (`style={{...}}`) inside markdown when existing CSS classes in `src/css/` can be used.
- ❌ **DO NOT create orphaned docs**: Every new `.mdx` file added to `docs/` MUST be registered in `sidebars.js`.
- ❌ **DO NOT delete or rewrite working tutorials** into generic AI summaries; preserve the enthusiastic, empathetic Think IT Telugu voice.

