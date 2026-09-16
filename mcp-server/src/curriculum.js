import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DOCS_DIR = path.resolve(__dirname, '../../docs');

// Helper to extract code blocks from markdown
function extractCodeSnippets(content) {
  const regex = /```([a-zA-Z0-9_-]+)?\r?\n([\s\S]*?)```/g;
  const snippets = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    snippets.push({
      language: match[1] || 'text',
      code: match[2].trim(),
    });
  }
  return snippets;
}

// Helper to extract admonitions (:::tip, :::warning, :::note) and blockquotes
function extractGotchas(content) {
  const gotchas = [];
  
  // Docusaurus admonitions
  const admonitionRegex = /:::(tip|warning|danger|caution|note|info)[^\r\n]*\r?\n([\s\S]*?):::/g;
  let match;
  while ((match = admonitionRegex.exec(content)) !== null) {
    gotchas.push({
      type: match[1],
      text: match[2].trim(),
    });
  }

  // Markdown blockquotes with "Golden Rule" or "Important" or "Notice"
  const quoteRegex = />\s*\*\*([^*]+)\*\*:?([^\r\n]+(?:\r?\n>[^\r\n]+)*)/g;
  while ((match = quoteRegex.exec(content)) !== null) {
    gotchas.push({
      type: 'rule',
      title: match[1].trim(),
      text: match[2].replace(/>\s*/g, ' ').trim(),
    });
  }

  return gotchas;
}

// Helper to extract in-doc Quizzes (<Quiz ... />)
function extractQuizzes(content) {
  const quizRegex = /<Quiz\s+question="([^"]+)"[\s\S]*?options=\{([^}]+)\}[\s\S]*?correctIndex=\{([0-9]+)\}[\s\S]*?explanation="([^"]+)"[\s\S]*?\/>/g;
  const quizzes = [];
  let match;
  while ((match = quizRegex.exec(content)) !== null) {
    try {
      const optionsRaw = match[2].replace(/'/g, '"');
      const options = JSON.parse(optionsRaw);
      quizzes.push({
        question: match[1],
        options,
        correctIndex: parseInt(match[3], 10),
        explanation: match[4],
      });
    } catch {
      // Fallback regex if JSON parse fails
      quizzes.push({
        question: match[1],
        optionsRaw: match[2],
        correctIndex: parseInt(match[3], 10),
        explanation: match[4],
      });
    }
  }
  return quizzes;
}

// Helper to extract real-world analogies
function extractAnalogies(content) {
  const lines = content.split('\n');
  const analogies = [];
  let recording = false;
  let buffer = [];

  for (const line of lines) {
    const isAnalogyHeader = /analog|metaphor|real[\s-]world|story|think of it|like a/i.test(line);
    if (line.startsWith('#') && isAnalogyHeader) {
      recording = true;
      buffer = [line];
      continue;
    }
    if (recording) {
      if (line.startsWith('## ') && !isAnalogyHeader) {
        analogies.push(buffer.join('\n').trim());
        buffer = [];
        recording = false;
      } else {
        buffer.push(line);
      }
    }
  }
  if (buffer.length > 0) {
    analogies.push(buffer.join('\n').trim());
  }

  return analogies;
}

export class CurriculumManager {
  constructor(docsDir = DOCS_DIR) {
    this.docsDir = docsDir;
    this.modules = [];
    this.topics = new Map();
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;

    // Discover parts
    const parts = [
      { id: 'part-1', title: 'Part 1: Programming & Python Basics', status: 'available' },
      { id: 'part-2', title: 'Part 2: Data Structures & Functions', status: 'available' },
      { id: 'part-3', title: 'Part 3: Advanced Python Programming', status: 'available' },
      { 
        id: 'part-4', 
        title: 'Part 4: AI & ML Engineering', 
        status: 'locked',
        lockMessage: 'Part 4 is currently locked for the upcoming Graphy Masterclass release. Check back soon or enroll at https://thinkittelugu.in'
      },
    ];

    for (const part of parts) {
      const partPath = path.join(this.docsDir, part.id);
      if (!fs.existsSync(partPath)) continue;

      if (part.status === 'locked') {
        this.modules.push({
          partId: part.id,
          partTitle: part.title,
          moduleId: `${part.id}-locked`,
          moduleTitle: part.title,
          status: 'locked',
          lockMessage: part.lockMessage,
          topicCount: 0,
          topics: [],
        });
        continue;
      }

      // Read sub-modules
      const entries = fs.readdirSync(partPath, { withFileTypes: true });
      const moduleDirs = entries.filter((e) => e.isDirectory()).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

      for (const mDir of moduleDirs) {
        const modPath = path.join(partPath, mDir.name);
        const files = fs.readdirSync(modPath).filter((f) => f.endsWith('.md') || f.endsWith('.mdx')).sort();

        const moduleItem = {
          partId: part.id,
          partTitle: part.title,
          moduleId: mDir.name,
          moduleTitle: this.formatModuleTitle(mDir.name),
          status: 'available',
          topicCount: files.length,
          topics: [],
        };

        for (const file of files) {
          const filePath = path.join(modPath, file);
          const raw = fs.readFileSync(filePath, 'utf-8');
          const parsed = matter(raw);
          const slug = `${part.id}/${mDir.name}/${file.replace(/\.(mdx?)$/, '')}`;

          const topicData = {
            slug,
            filePath,
            partId: part.id,
            moduleId: mDir.name,
            fileName: file,
            title: parsed.data.title || this.formatTitle(file),
            sidebarLabel: parsed.data.sidebar_label || parsed.data.title || this.formatTitle(file),
            description: parsed.data.description || '',
            keywords: parsed.data.keywords || [],
            sidebarPosition: parsed.data.sidebar_position ?? 99,
            content: parsed.content,
            codeSnippets: extractCodeSnippets(parsed.content),
            gotchas: extractGotchas(parsed.content),
            quizzes: extractQuizzes(parsed.content),
            analogies: extractAnalogies(parsed.content),
          };

          this.topics.set(slug, topicData);
          moduleItem.topics.push({
            slug: topicData.slug,
            title: topicData.title,
            sidebarLabel: topicData.sidebarLabel,
            description: topicData.description,
            keywords: topicData.keywords,
            snippetsCount: topicData.codeSnippets.length,
          });
        }

        // Sort topics inside module by sidebarPosition or filename
        moduleItem.topics.sort((a, b) => {
          const tA = this.topics.get(a.slug);
          const tB = this.topics.get(b.slug);
          return (tA?.sidebarPosition ?? 99) - (tB?.sidebarPosition ?? 99);
        });

        this.modules.push(moduleItem);
      }
    }

    this.initialized = true;
  }

  formatModuleTitle(dirName) {
    return dirName
      .replace(/^module-([0-9.]+)-?/, 'Module $1: ')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }

  formatTitle(fileName) {
    return fileName
      .replace(/\.(mdx?)$/, '')
      .replace(/^[0-9.]+-?/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }

  listModules() {
    this.init();
    return this.modules.map((m) => ({
      partId: m.partId,
      partTitle: m.partTitle,
      moduleId: m.moduleId,
      moduleTitle: m.moduleTitle,
      status: m.status,
      topicCount: m.topicCount,
      lockMessage: m.lockMessage,
    }));
  }

  listTopics(moduleId) {
    this.init();
    const mod = this.modules.find((m) => m.moduleId === moduleId || m.moduleId.includes(moduleId));
    if (!mod) {
      return { error: `Module not found: ${moduleId}. Use list_curriculum_modules to see valid module IDs.` };
    }
    if (mod.status === 'locked') {
      return { status: 'locked', message: mod.lockMessage };
    }
    return {
      moduleId: mod.moduleId,
      moduleTitle: mod.moduleTitle,
      partTitle: mod.partTitle,
      topics: mod.topics,
    };
  }

  getTopic(slug) {
    this.init();

    // Exact match or partial match
    let topic = this.topics.get(slug);
    if (!topic) {
      for (const [key, val] of this.topics.entries()) {
        if (key.endsWith(slug) || key.includes(slug)) {
          topic = val;
          break;
        }
      }
    }

    if (!topic) {
      if (slug.includes('part-4')) {
        return {
          error: 'Part 4 (AI & ML Engineering) is currently locked for public release per curriculum roadmap.',
          locked: true,
        };
      }
      return {
        error: `Topic '${slug}' not found. Try searching with search_curriculum or checking list_module_topics.`,
      };
    }

    return topic;
  }

  search(query, maxResults = 10) {
    this.init();
    const q = query.toLowerCase().trim();
    const results = [];

    for (const topic of this.topics.values()) {
      let score = 0;
      const titleMatch = topic.title.toLowerCase().includes(q);
      const descMatch = topic.description.toLowerCase().includes(q);
      const labelMatch = topic.sidebarLabel.toLowerCase().includes(q);
      const keywordMatch = topic.keywords.some((k) => k.toLowerCase().includes(q));
      const contentMatch = topic.content.toLowerCase().includes(q);

      if (titleMatch) score += 10;
      if (labelMatch) score += 8;
      if (keywordMatch) score += 6;
      if (descMatch) score += 4;
      if (contentMatch) score += 2;

      if (score > 0) {
        results.push({
          slug: topic.slug,
          title: topic.title,
          moduleId: topic.moduleId,
          partId: topic.partId,
          description: topic.description,
          score,
          snippetsCount: topic.codeSnippets.length,
          preview: this.getContentSnippet(topic.content, q),
        });
      }
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, maxResults);
  }

  getContentSnippet(content, query) {
    const idx = content.toLowerCase().indexOf(query);
    if (idx === -1) return content.slice(0, 160).replace(/\n/g, ' ') + '...';
    const start = Math.max(0, idx - 60);
    const end = Math.min(content.length, idx + query.length + 100);
    return (start > 0 ? '...' : '') + content.slice(start, end).replace(/\n/g, ' ') + (end < content.length ? '...' : '');
  }
}

export const curriculum = new CurriculumManager();
