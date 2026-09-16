import fs from 'fs';
import path from 'path';

const MCP_NAME = 'think-it-telugu-python-docs';
const SERVER_PATH = 'd:/AI Engine/think-it-telugu-python-docs/mcp-server/src/index.js';

const TOOLS = [
  {
    name: 'list_curriculum_modules',
    description: 'List all available Python modules in Think IT Telugu Documentation across Part 1, Part 2, and Part 3 (Part 4 status reported as locked per roadmap).',
    parameters: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: 'list_module_topics',
    description: 'List all individual topics/lessons within a specific Python module (e.g., "module-2-variables-datatypes" or "module-4-operators").',
    parameters: {
      type: 'object',
      properties: {
        moduleId: {
          type: 'string',
          description: 'The module ID, e.g. "module-2-variables-datatypes", "module-4-operators", "module-13-oop-basics".',
        },
      },
      required: ['moduleId'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_topic_content',
    description: 'Retrieve the full lesson content, real-world analogies, code snippets, or gotchas for any Python topic.',
    parameters: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'The topic slug (e.g., "part-1/module-4-operators/arithmetic-operators" or simply "arithmetic-operators").',
        },
        format: {
          type: 'string',
          enum: ['full_mdx', 'summary', 'analogy', 'code_snippets', 'gotchas', 'quiz'],
          description: 'The desired extraction format. Defaults to "summary" (overview, analogy, primary code, gotcha).',
        },
      },
      required: ['slug'],
      additionalProperties: false,
    },
  },
  {
    name: 'search_curriculum',
    description: 'Search across all 24 Python modules in the documentation for any concept, syntax, or keyword (e.g. "floor division", "dictionary comprehension", "try except").',
    parameters: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search keyword, operator, concept, or Python function name.',
        },
        limit: {
          type: 'number',
          description: 'Max number of results to return (default: 8).',
        },
      },
      required: ['query'],
      additionalProperties: false,
    },
  },
  {
    name: 'generate_reel_script',
    description: 'Generate a viral, beginner-friendly Instagram Reel / Short script (30-60s) for a topic, with Telugu speech, English tech terms, visual hooks, on-screen text, and Excalidraw slide cues.',
    parameters: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'The topic slug, e.g. "arithmetic-operators", "if-else-logic", "list-mutability".',
        },
        durationSeconds: {
          type: 'number',
          description: 'Target reel duration in seconds (30, 45, or 60). Default: 45.',
        },
      },
      required: ['slug'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_excalidraw_blueprint',
    description: 'Generate a structured whiteboard presentation blueprint for a topic, formatted for Excalidraw with cards, code blocks, memory diagrams, and warning badges.',
    parameters: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'The topic slug, e.g. "variables", "comparison-operators", "try-except".',
        },
      },
      required: ['slug'],
      additionalProperties: false,
    },
  },
  {
    name: 'generate_youtube_lecture_plan',
    description: 'Generate a comprehensive YouTube lecture outline with timestamps, whiteboard slide markers, live VS Code coding checkpoints, and student practice assignments.',
    parameters: {
      type: 'object',
      properties: {
        slugOrModuleId: {
          type: 'string',
          description: 'The topic slug or module ID to plan.',
        },
        isModule: {
          type: 'boolean',
          description: 'True if planning a full module lecture, False for a single topic deep dive.',
        },
      },
      required: ['slugOrModuleId'],
      additionalProperties: false,
    },
  },
];

// 1. Create Schema Directory in Antigravity
const schemaDir = path.resolve(process.env.USERPROFILE, '.gemini/antigravity-ide/mcp', MCP_NAME);
if (!fs.existsSync(schemaDir)) {
  fs.mkdirSync(schemaDir, { recursive: true });
}

for (const tool of TOOLS) {
  const schemaFile = path.join(schemaDir, `${tool.name}.json`);
  fs.writeFileSync(schemaFile, JSON.stringify(tool, null, 2), 'utf-8');
}
console.log(`Registered ${TOOLS.length} tool schemas in ${schemaDir}`);

// 2. Update config files
const configPaths = [
  path.resolve(process.env.USERPROFILE, '.gemini/antigravity-ide/mcp_config.json'),
  path.resolve(process.env.USERPROFILE, '.gemini/config/mcp_config.json'),
];

for (const cfgPath of configPaths) {
  if (fs.existsSync(cfgPath)) {
    try {
      const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf-8'));
      cfg.mcpServers = cfg.mcpServers || {};
      cfg.mcpServers[MCP_NAME] = {
        command: 'node',
        args: [SERVER_PATH],
        env: {},
      };
      fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2), 'utf-8');
      console.log(`Updated configuration in ${cfgPath}`);
    } catch (err) {
      console.error(`Failed to update ${cfgPath}:`, err.message);
    }
  }
}
console.log('\nRegistration complete!');
