# Think IT Telugu Python Docs MCP Server

Official Model Context Protocol (MCP) Server for the Think IT Telugu Python Documentation platform ([python.thinkittelugu.in](https://python.thinkittelugu.in)).

## Features

1. **Complete Curriculum Exploration**:
   - Lists all 24 modules across Part 1 (Fundamentals), Part 2 (Data Structures), and Part 3 (Advanced Python).
   - Part 4 (AI & ML Engineering) is guarded in locked state per course roadmap.
2. **Precision Topic Chunking**:
   - Extract real-world metaphors/analogies, runnable Python code snippets, golden rule gotchas, and practice quizzes.
3. **Instagram Reels Script Generator**:
   - Generates 30-60 second viral tech reel scripts with Telugu voiceover, English tech vocabulary, on-screen text cues, and Excalidraw slide recommendations.
4. **Excalidraw Blueprint Generator**:
   - Formats visual whiteboard layouts (concept cards, memory diagrams, comparison tables) ready to render with Antigravity's `excalidraw` MCP tool.
5. **YouTube Lecture Plan Generator**:
   - Detailed timeline timestamps, slide progression, and VS Code live coding demos for full video tutorials.

## Available Tools

- `list_curriculum_modules`: List all modules and parts.
- `list_module_topics`: List topics inside a specific module (e.g. `module-4-operators`).
- `get_topic_content`: Extract content by format (`summary`, `analogy`, `code_snippets`, `gotchas`, `quiz`, `full_mdx`).
- `search_curriculum`: Full-text search across all lessons.
- `generate_reel_script`: 30-60s vertical video script tailored for Think IT Telugu.
- `get_excalidraw_blueprint`: Structured visual elements for Excalidraw hand-drawn presentation.
- `generate_youtube_lecture_plan`: Full YouTube tutorial timeline and presentation structure.

## Running & Testing

```bash
# Run standalone test suite
node test-mcp.js

# Start MCP server manually via stdio
node src/index.js
```
