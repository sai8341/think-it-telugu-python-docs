/**
 * Scripting & Visuals Generator for Think IT Telugu Python Content
 * Supports Instagram Reels, Excalidraw hand-drawn slides, and YouTube lecture plans.
 */

export function buildReelScript(topic, options = {}) {
  const duration = options.durationSeconds || 45;
  const title = topic.title;
  const description = topic.description;
  const snippets = topic.codeSnippets || [];
  const gotchas = topic.gotchas || [];
  const analogies = topic.analogies || [];

  // Primary code snippet
  const primaryCode = snippets[0]?.code || 'print("Hello, Python!")';
  const primaryGotcha = gotchas[0]?.text || gotchas[0]?.title || 'Division in Python always returns a float!';
  const primaryAnalogy = analogies[0] || `Think of this like a real-life analogy from daily life.`;

  const script = {
    metadata: {
      topic: title,
      slug: topic.slug,
      targetDuration: `${duration}s`,
      format: 'Vertical (9:16) Instagram Reel / YouTube Short',
      tone: 'Energetic, beginner-friendly Telugu with standard English tech terms',
    },
    hook: {
      timing: '00:00 - 00:05',
      visual: 'Excalidraw whiteboard drawing or VS Code split screen with big red text',
      voiceover_telugu: `Python లో ${title} గురించి 90% మంది బిగినర్స్ ఈ చిన్న మిస్టేక్ చేస్తారు!`,
      on_screen_text: `${title} - Common Mistake! ⚠️`,
    },
    concept_breakdown: {
      timing: `00:05 - 00:25`,
      visual: 'Excalidraw hand-drawn diagram illustrating the mental model',
      voiceover_telugu: `అసలు ఇది ఎందుకు వాడతాం అంటే: ${description || 'చాలా సింపుల్ గా అర్థం చేసుకుందాం'}. ఉదాహరణకు, ${primaryAnalogy.slice(0, 140)}...`,
      on_screen_text: `Mental Model: Real-Life Analogy 💡`,
    },
    code_demo: {
      timing: `00:25 - 00:45`,
      visual: 'Clean high-contrast VS Code editor showing the exact snippet running',
      code_snippet: primaryCode,
      voiceover_telugu: `చూడండి, ఇక్కడ ఈ కోడ్ రన్ చేస్తే ఏం జరుగుతుందో... ${primaryGotcha.slice(0, 120)}`,
      on_screen_text: `Pro Tip: Watch the Output! 👇`,
    },
    call_to_action: {
      timing: `00:45 - 00:50`,
      visual: 'Think IT Telugu logo card with link to docs',
      voiceover_telugu: `ఇలాంటి మరిన్ని ప్రాక్టికల్ పైథాన్ కాన్సెప్ట్స్ కోసం Think IT Telugu ని ఇప్పుడే ఫాలో అవ్వండి. పూర్తి నోట్స్ కోసం బయో లోని లింక్ చెక్ చేయండి!`,
      on_screen_text: `Follow @thinkittelugu | Link in Bio 🚀`,
    },
    excalidraw_recommendation: {
      recommendedLayout: '2-Box Comparison or Split Memory View',
      keyElementsToDraw: [
        `Header: "${title}"`,
        `Left Box: "The Concept / Syntax"`,
        `Right Box: "Output / Result"`,
        `Bottom Alert: "${primaryGotcha.slice(0, 80)}"`,
      ],
    },
    hashtags: [
      '#PythonTelugu',
      '#ThinkITTelugu',
      '#LearnPython',
      '#PythonBeginners',
      '#CodingTelugu',
      '#TechInTelugu',
      '#PythonReels',
    ],
  };

  return script;
}

export function buildExcalidrawBlueprint(topic) {
  const title = topic.title;
  const snippets = topic.codeSnippets || [];
  const primaryCode = snippets[0]?.code || '# Sample Python code';

  return {
    topic: title,
    slug: topic.slug,
    canvasConfig: {
      theme: 'dark',
      roughness: 1, // Hand-drawn sketchy look
      fontSize: 20,
      fontFamily: 1, // Hand-drawn font (Virgil)
    },
    slideStructure: {
      title: {
        text: `🐍 Python: ${title}`,
        position: { x: 100, y: 50 },
        color: '#38bdf8', // Neon Cyan
      },
      conceptCard: {
        title: 'Core Concept & Logic',
        content: topic.description || 'Step-by-step logic breakdown',
        position: { x: 100, y: 140, width: 450, height: 260 },
        strokeColor: '#818cf8',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
      },
      codeCard: {
        title: 'Python Code Snippet',
        code: primaryCode,
        position: { x: 600, y: 140, width: 480, height: 260 },
        strokeColor: '#34d399',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
      },
      memoryDiagram: {
        title: 'Visual Analogy / Memory Box',
        elements: [
          { label: 'Variable / Input', position: { x: 150, y: 450 } },
          { arrow: '-->', label: 'Processing' },
          { label: 'Result / Output', position: { x: 500, y: 450 } },
        ],
        strokeColor: '#f59e0b',
      },
      proTipCard: {
        title: '⚠️ Watch Out (Golden Rule)',
        text: topic.gotchas[0]?.text || 'Be careful with data types and syntax indentation!',
        position: { x: 100, y: 560, width: 980, height: 120 },
        strokeColor: '#f43f5e',
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
      },
    },
    antigravityAction: 'Pass this structured data directly to the Excalidraw MCP tool to generate the interactive whiteboard.',
  };
}

export function buildYouTubeLecturePlan(topicOrModule, isModule = false) {
  if (isModule) {
    return {
      type: 'module_overview',
      moduleTitle: topicOrModule.moduleTitle,
      partTitle: topicOrModule.partTitle,
      topicCount: topicOrModule.topics?.length || 0,
      lectureStructure: [
        { phase: '1. Introduction & Motivation', duration: '5 mins', notes: 'Why this module matters in real-world software engineering' },
        { phase: '2. Deep Dive Lessons', duration: '35 mins', topics: topicOrModule.topics?.map(t => t.title) },
        { phase: '3. Live Hands-on Project / Mini-Lab', duration: '20 mins', notes: 'Build an end-to-end runnable script in VS Code' },
        { phase: '4. Summary, Quiz & Assignment', duration: '10 mins', notes: 'Review top 3 interview questions and assign practice problems' },
      ],
      videoDescriptionTemplate: `In this lecture from Think IT Telugu, we master ${topicOrModule.moduleTitle}.\n\n📖 Read Full Documentation: https://python.thinkittelugu.in\n💬 Join Community Telegram: https://t.me/thinkittelugu\n🔔 Subscribe: @ThinkIT-Telugu`,
    };
  }

  // Single topic lecture plan
  return {
    type: 'topic_deep_dive',
    title: topicOrModule.title,
    slug: topicOrModule.slug,
    description: topicOrModule.description,
    videoTimeline: [
      { timestamp: '00:00', title: 'Hook & Real-life Analogy', focus: 'Relatable Telugu story' },
      { timestamp: '02:30', title: 'Syntax & Theory on Documentation', focus: 'Navigating python.thinkittelugu.in' },
      { timestamp: '06:00', title: 'Live Coding in VS Code', focus: 'Code execution and edge cases' },
      { timestamp: '12:00', title: 'Common Mistakes & Debugging', focus: 'How to fix error messages' },
      { timestamp: '15:30', title: 'Interactive Quiz & Homework Challenge', focus: 'Audience retention and comments' },
    ],
    presentationSlides: [
      { slide: 1, type: 'Title & Origin Story', content: topicOrModule.title },
      { slide: 2, type: 'Mental Model / Diagram', content: topicOrModule.analogies[0] || topicOrModule.description },
      { slide: 3, type: 'Code Walkthrough', code: topicOrModule.codeSnippets[0]?.code || '' },
      { slide: 4, type: 'Golden Rules & Warnings', notes: topicOrModule.gotchas.map(g => g.text || g.title).join('\n') },
    ],
  };
}
