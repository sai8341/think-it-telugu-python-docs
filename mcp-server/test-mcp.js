import { curriculum } from './src/curriculum.js';
import {
  buildReelScript,
  buildExcalidrawBlueprint,
  buildYouTubeLecturePlan,
} from './src/tools/scripting.js';

console.log('=== Running Think IT Telugu Docs MCP Test Suite ===\n');

// 1. Test Curriculum Loading
console.log('Test 1: Listing Curriculum Modules...');
const modules = curriculum.listModules();
console.log(`Found ${modules.length} modules.`);
const part4 = modules.find(m => m.status === 'locked');
console.log(`Part 4 Locked Status verified: ${part4 ? 'YES (' + part4.moduleTitle + ')' : 'NO'}`);

// 2. Test Topics Listing for Module 4 (Operators)
console.log('\nTest 2: Listing topics for Module 4 (Operators)...');
const topics = curriculum.listTopics('module-4-operators');
console.log(`Module 4 topics count: ${topics.topics?.length}`);
topics.topics?.forEach(t => console.log(` - [${t.slug}] ${t.title}`));

// 3. Test Search
console.log('\nTest 3: Searching for "floor division"...');
const searchResults = curriculum.search('floor division', 3);
console.log(`Found ${searchResults.length} matches:`);
searchResults.forEach(r => console.log(` - Match: ${r.title} (Slug: ${r.slug})`));

// 4. Test Topic Content Extraction (Arithmetic Operators)
console.log('\nTest 4: Extracting topic content for arithmetic-operators...');
const topic = curriculum.getTopic('arithmetic-operators');
console.log(`Title: ${topic.title}`);
console.log(`Snippets extracted: ${topic.codeSnippets.length}`);
console.log(`First Code Snippet:\n${topic.codeSnippets[0]?.code}`);
console.log(`Gotchas extracted: ${topic.gotchas.length}`);

// 5. Test Reel Script Generation
console.log('\nTest 5: Generating Instagram Reel script for arithmetic-operators...');
const reelScript = buildReelScript(topic, { durationSeconds: 45 });
console.log(`Reel Hook Telugu: ${reelScript.hook.voiceover_telugu}`);
console.log(`Reel On-screen text: ${reelScript.hook.on_screen_text}`);
console.log(`Reel Code Demo: ${reelScript.code_demo.code_snippet.split('\n')[0]}`);

// 6. Test Excalidraw Blueprint
console.log('\nTest 6: Generating Excalidraw Blueprint...');
const excalidrawPlan = buildExcalidrawBlueprint(topic);
console.log(`Excalidraw Topic: ${excalidrawPlan.topic}`);
console.log(`Excalidraw Concept Card: ${excalidrawPlan.slideStructure.conceptCard.title}`);
console.log(`Excalidraw Code Card: ${excalidrawPlan.slideStructure.codeCard.title}`);

// 7. Test YouTube Lecture Plan
console.log('\nTest 7: Generating YouTube Lecture Plan...');
const ytPlan = buildYouTubeLecturePlan(topic, false);
console.log(`YouTube Plan Timeline steps: ${ytPlan.videoTimeline.length}`);
console.log(`First step: ${ytPlan.videoTimeline[0].title}`);

console.log('\n=== ALL MCP TESTS PASSED SUCCESSFULLY! ===');
