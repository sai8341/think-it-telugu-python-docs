#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { curriculum } from './curriculum.js';
import {
  buildReelScript,
  buildExcalidrawBlueprint,
  buildYouTubeLecturePlan,
} from './tools/scripting.js';

const server = new Server(
  {
    name: 'think-it-telugu-python-docs',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tool definitions
const TOOLS = [
  {
    name: 'list_curriculum_modules',
    description:
      'List all available Python modules in Think IT Telugu Documentation across Part 1, Part 2, and Part 3 (Part 4 status reported as locked per roadmap).',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'list_module_topics',
    description:
      'List all individual topics/lessons within a specific Python module (e.g., "module-2-variables-datatypes" or "module-8-lists").',
    inputSchema: {
      type: 'object',
      properties: {
        moduleId: {
          type: 'string',
          description:
            'The module ID, e.g. "module-2-variables-datatypes", "module-4-operators", "module-13-oop-basics".',
        },
      },
      required: ['moduleId'],
    },
  },
  {
    name: 'get_topic_content',
    description:
      'Retrieve the full lesson content, real-world analogies, code snippets, or gotchas for any Python topic.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description:
            'The topic slug (e.g., "part-1/module-4-operators/arithmetic-operators" or simply "arithmetic-operators").',
        },
        format: {
          type: 'string',
          enum: ['full_mdx', 'summary', 'analogy', 'code_snippets', 'gotchas', 'quiz'],
          description:
            'The desired extraction format. Defaults to "summary" (overview, analogy, primary code, gotcha).',
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'search_curriculum',
    description:
      'Search across all 24 Python modules in the documentation for any concept, syntax, or keyword (e.g. "floor division", "dictionary comprehension", "try except").',
    inputSchema: {
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
    },
  },
  {
    name: 'generate_reel_script',
    description:
      'Generate a viral, beginner-friendly Instagram Reel / Short script (30-60s) for a topic, with Telugu speech, English tech terms, visual hooks, on-screen text, and Excalidraw slide cues.',
    inputSchema: {
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
    },
  },
  {
    name: 'get_excalidraw_blueprint',
    description:
      'Generate a structured whiteboard presentation blueprint for a topic, formatted for Excalidraw with cards, code blocks, memory diagrams, and warning badges.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'The topic slug, e.g. "variables", "comparison-operators", "try-except".',
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'generate_youtube_lecture_plan',
    description:
      'Generate a comprehensive YouTube lecture outline with timestamps, whiteboard slide markers, live VS Code coding checkpoints, and student practice assignments.',
    inputSchema: {
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
    },
  },
];

// Handle list tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: TOOLS };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'list_curriculum_modules': {
        const modules = curriculum.listModules();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  totalModules: modules.length,
                  partsSummary: {
                    'Part 1: Fundamentals': 'Modules 0 - 6 (Active)',
                    'Part 2: Data Structures & Functions': 'Modules 7 - 12.5 (Active)',
                    'Part 3: Advanced Python': 'Modules 13 - 24 (Active)',
                    'Part 4: AI & ML Engineering': 'Locked (Future Phased Release)',
                  },
                  modules,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case 'list_module_topics': {
        const result = curriculum.listTopics(args.moduleId);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'get_topic_content': {
        const topic = curriculum.getTopic(args.slug);
        if (topic.error) {
          return {
            content: [{ type: 'text', text: JSON.stringify(topic, null, 2) }],
            isError: !topic.locked,
          };
        }

        const format = args.format || 'summary';
        let responseData;

        switch (format) {
          case 'full_mdx':
            responseData = {
              title: topic.title,
              slug: topic.slug,
              content: topic.content,
            };
            break;
          case 'analogy':
            responseData = {
              title: topic.title,
              slug: topic.slug,
              analogies: topic.analogies.length ? topic.analogies : ['Metaphor explained directly in main lesson text.'],
            };
            break;
          case 'code_snippets':
            responseData = {
              title: topic.title,
              slug: topic.slug,
              totalSnippets: topic.codeSnippets.length,
              snippets: topic.codeSnippets,
            };
            break;
          case 'gotchas':
            responseData = {
              title: topic.title,
              slug: topic.slug,
              gotchas: topic.gotchas,
            };
            break;
          case 'quiz':
            responseData = {
              title: topic.title,
              slug: topic.slug,
              quizzes: topic.quizzes,
            };
            break;
          case 'summary':
          default:
            responseData = {
              title: topic.title,
              sidebarLabel: topic.sidebarLabel,
              slug: topic.slug,
              description: topic.description,
              keywords: topic.keywords,
              primaryAnalogy: topic.analogies[0] || null,
              primaryCode: topic.codeSnippets[0] || null,
              totalCodeSnippets: topic.codeSnippets.length,
              topGotcha: topic.gotchas[0] || null,
              quizAvailable: topic.quizzes.length > 0,
            };
            break;
        }

        return {
          content: [{ type: 'text', text: JSON.stringify(responseData, null, 2) }],
        };
      }

      case 'search_curriculum': {
        const results = curriculum.search(args.query, args.limit || 8);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  query: args.query,
                  matchesFound: results.length,
                  results,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case 'generate_reel_script': {
        const topic = curriculum.getTopic(args.slug);
        if (topic.error) {
          return {
            content: [{ type: 'text', text: JSON.stringify(topic, null, 2) }],
            isError: true,
          };
        }
        const script = buildReelScript(topic, { durationSeconds: args.durationSeconds });
        return {
          content: [{ type: 'text', text: JSON.stringify(script, null, 2) }],
        };
      }

      case 'get_excalidraw_blueprint': {
        const topic = curriculum.getTopic(args.slug);
        if (topic.error) {
          return {
            content: [{ type: 'text', text: JSON.stringify(topic, null, 2) }],
            isError: true,
          };
        }
        const blueprint = buildExcalidrawBlueprint(topic);
        return {
          content: [{ type: 'text', text: JSON.stringify(blueprint, null, 2) }],
        };
      }

      case 'generate_youtube_lecture_plan': {
        if (args.isModule) {
          const mod = curriculum.listTopics(args.slugOrModuleId);
          if (mod.error) {
            return {
              content: [{ type: 'text', text: JSON.stringify(mod, null, 2) }],
              isError: true,
            };
          }
          const plan = buildYouTubeLecturePlan(mod, true);
          return {
            content: [{ type: 'text', text: JSON.stringify(plan, null, 2) }],
          };
        }

        const topic = curriculum.getTopic(args.slugOrModuleId);
        if (topic.error) {
          return {
            content: [{ type: 'text', text: JSON.stringify(topic, null, 2) }],
            isError: true,
          };
        }
        const plan = buildYouTubeLecturePlan(topic, false);
        return {
          content: [{ type: 'text', text: JSON.stringify(plan, null, 2) }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error executing ${name}: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Run server with stdio transport
async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Think IT Telugu Python Docs MCP server running on stdio');
}

run().catch((err) => {
  console.error('Fatal MCP server error:', err);
  process.exit(1);
});
