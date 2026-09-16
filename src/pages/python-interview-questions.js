import React, { useState, useEffect, useMemo, useRef } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import { INTERVIEW_CATEGORIES, INTERVIEW_SECTIONS, INTERVIEW_QUESTIONS } from '../data/interviewQuestionsData';

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function AlertTriangleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function ChevronDownIcon({ isOpen }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease',
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function formatInlineCode(text) {
  if (!text) return null;
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="ib-inline-code">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export default function PythonInterviewQuestionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeQuestionId, setActiveQuestionId] = useState('');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Question counts by category
  const categoryCounts = useMemo(() => {
    const counts = { all: INTERVIEW_QUESTIONS.length };
    INTERVIEW_CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = INTERVIEW_QUESTIONS.filter((q) => q.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Filtered questions based on selected category & search query
  const filteredQuestions = useMemo(() => {
    let list = INTERVIEW_QUESTIONS;

    if (selectedCategory !== 'all') {
      list = list.filter((q) => q.category === selectedCategory);
    }

    if (!searchQuery.trim()) {
      return list;
    }

    const q = searchQuery.toLowerCase().trim();
    return list.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q);
      const matchPitch = item.interviewPitch?.toLowerCase().includes(q);
      const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q));
      const matchPoints = item.points?.some((p) => p.toLowerCase().includes(q));
      const matchCode = item.code?.toLowerCase().includes(q);
      return matchTitle || matchSummary || matchPitch || matchTags || matchPoints || matchCode;
    });
  }, [selectedCategory, searchQuery]);

  // Global question numbering map
  const questionNumberMap = useMemo(() => {
    const map = {};
    INTERVIEW_QUESTIONS.forEach((q, index) => {
      map[q.id] = index + 1;
    });
    return map;
  }, []);

  // Active sections based on category
  const visibleSections = useMemo(() => {
    if (selectedCategory === 'all') {
      return INTERVIEW_SECTIONS;
    }
    return INTERVIEW_SECTIONS.filter((sec) => sec.category === selectedCategory);
  }, [selectedCategory]);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for active TOC highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveQuestionId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    );

    const questionElements = document.querySelectorAll('.ib-question-article');
    questionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredQuestions]);

  const scrollToQuestion = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveQuestionId(id);
      setIsMobileDrawerOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <Layout
      title="Python Interview Questions & Coding Preparation Guide | Think IT Telugu"
      description="Deep, beginner-friendly Python interview preparation guide with 35 master questions, spoken interview answers, step-by-step dry runs, algorithms, and star patterns by Think IT Telugu."
      wrapperClassName="interview-guide-layout"
    >
      <div className="ib-page-container">
        {/* ========================================================
            1. BREADCRUMBS & COMPACT HEADER
            ======================================================== */}
        <header className="ib-header">
          <nav className="ib-breadcrumbs" aria-label="Breadcrumbs">
            <Link to="/" className="ib-breadcrumb-link">
              <HomeIcon />
              <span>Home</span>
            </Link>
            <span className="ib-breadcrumb-sep">/</span>
            <span className="ib-breadcrumb-current">Python Interview Questions</span>
          </nav>

          <div className="ib-header-main">
            <div className="ib-header-left">
              <div className="ib-title-badge-row">
                <h1 className="ib-main-title">Python Interview Questions</h1>
                <span className="ib-meta-count">35 Master Questions</span>
              </div>
              <div className="ib-header-meta">
                <span>By Think IT Telugu</span>
                <span className="ib-meta-dot">•</span>
                <span>Theory, Classic Logic & Debugging</span>
              </div>
            </div>

            <div className="ib-header-actions">
              <Link to="/online-python-compiler" className="ib-action-btn ib-action-btn--primary">
                <PlayIcon />
                <span>Open Python Lab</span>
              </Link>
              <button onClick={handlePrintPdf} className="ib-action-btn ib-action-btn--secondary" title="Print / Save PDF">
                <DownloadIcon />
                <span>Save as PDF</span>
              </button>
            </div>
          </div>
        </header>

        {/* ========================================================
            2. ULTRA-COMPACT HORIZONTAL CATEGORY FILTER CHIPS
            ======================================================== */}
        <div className="ib-category-bar">
          <div className="ib-category-pills">
            {INTERVIEW_CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id] || 0;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  className={`ib-category-pill ${isActive ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  title={cat.desc}
                >
                  <span className="ib-category-name">{cat.name}</span>
                  <span className="ib-category-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            3. MOBILE SLIM TOC ACTION BAR
            ======================================================== */}
        <div className="ib-mobile-toc-bar">
          <button
            className="ib-mobile-toc-trigger"
            onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
            aria-expanded={isMobileDrawerOpen}
          >
            <div className="ib-mobile-toc-trigger-left">
              <ListIcon />
              <span>
                Jump to Question ({filteredQuestions.length}
                {selectedCategory !== 'all' ? ` in ${INTERVIEW_CATEGORIES.find(c => c.id === selectedCategory)?.name || ''}` : ''})
              </span>
            </div>
            <ChevronDownIcon isOpen={isMobileDrawerOpen} />
          </button>

          {isMobileDrawerOpen && (
            <div className="ib-mobile-toc-dropdown">
              <div className="ib-sidebar-search">
                <span className="ib-search-icon">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  className="ib-search-input"
                  placeholder="Filter questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="ib-search-clear" onClick={() => setSearchQuery('')}>
                    <ClearIcon />
                  </button>
                )}
              </div>

              <div className="ib-mobile-toc-scroll">
                {visibleSections.map((sec) => {
                  const questionsInSec = filteredQuestions.filter((q) => q.sectionId === sec.id);

                  if (questionsInSec.length === 0) return null;

                  return (
                    <div key={sec.id} className="ib-toc-section">
                      <div className="ib-toc-section-title">{sec.title}</div>
                      <ul className="ib-toc-list">
                        {questionsInSec.map((q) => {
                          const qNum = questionNumberMap[q.id];
                          const isActive = activeQuestionId === q.id;

                          return (
                            <li key={q.id} className="ib-toc-item">
                              <a
                                href={`#${q.id}`}
                                className={`ib-toc-link ${isActive ? 'is-active' : ''}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  scrollToQuestion(q.id);
                                }}
                              >
                                <span className="ib-toc-qnum">{qNum}.</span>
                                <span className="ib-toc-qtext">{q.title}</span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            4. 2-COLUMN DESKTOP / 1-COLUMN MOBILE LAYOUT
            ======================================================== */}
        <div className="ib-layout-grid">
          {/* ---- LEFT COLUMN: DESKTOP STICKY QUESTION INDEX ---- */}
          <aside className="ib-sidebar">
            <div className="ib-sidebar-inner">
              <div className="ib-sidebar-search">
                <span className="ib-search-icon">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  className="ib-search-input"
                  placeholder="Search questions (e.g. prime, fib, pdb)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="ib-search-clear" onClick={() => setSearchQuery('')}>
                    <ClearIcon />
                  </button>
                )}
              </div>

              <nav className="ib-toc-nav" aria-label="Question Index">
                {visibleSections.map((sec) => {
                  const questionsInSec = filteredQuestions.filter((q) => q.sectionId === sec.id);

                  if (questionsInSec.length === 0) return null;

                  return (
                    <div key={sec.id} className="ib-toc-section">
                      <div className="ib-toc-section-title">{sec.title}</div>
                      <ul className="ib-toc-list">
                        {questionsInSec.map((q) => {
                          const qNum = questionNumberMap[q.id];
                          const isActive = activeQuestionId === q.id;

                          return (
                            <li key={q.id} className="ib-toc-item">
                              <a
                                href={`#${q.id}`}
                                className={`ib-toc-link ${isActive ? 'is-active' : ''}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  scrollToQuestion(q.id);
                                }}
                              >
                                <span className="ib-toc-qnum">{qNum}.</span>
                                <span className="ib-toc-qtext">{q.title}</span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ---- RIGHT COLUMN: DEEP PEDAGOGICAL QUESTION STREAM ---- */}
          <main className="ib-main-content">
            {/* Quick Introduction Card */}
            <div className="ib-intro-card">
              <h2 className="ib-intro-title">Python Technical Interview & Coding Master Guide</h2>
              <p className="ib-intro-desc">
                Designed with line-by-line pedagogical clarity for college freshers, self-taught developers, and career switchers. Covers core theory, algorithmic problem solving, star patterns, and beginner code debugging diagnostics.
              </p>
            </div>

            {/* Questions by Section */}
            {visibleSections.map((sec) => {
              const secQuestions = filteredQuestions.filter((q) => q.sectionId === sec.id);

              if (secQuestions.length === 0) return null;

              return (
                <section key={sec.id} id={sec.id} className="ib-content-section">
                  <div className="ib-section-header-block">
                    <h2 className="ib-section-title">{sec.title}</h2>
                    {sec.desc && <p className="ib-section-subtitle">{sec.desc}</p>}
                  </div>

                  <div className="ib-questions-list">
                    {secQuestions.map((q) => {
                      const qNum = questionNumberMap[q.id];

                      return (
                        <article key={q.id} id={q.id} className="ib-question-article">
                          {/* Top Badges & Level */}
                          <div className="ib-q-meta-top">
                            <span className={`ib-q-level ib-q-level--${q.category}`}>
                              {q.level || 'Standard'}
                            </span>
                            {q.tags && q.tags.length > 0 && (
                              <div className="ib-q-tags">
                                {q.tags.map((tag, tIdx) => (
                                  <span key={tIdx} className="ib-q-tag">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Question Title */}
                          <h3 className="ib-q-title">
                            <span className="ib-q-number">{qNum}.</span>
                            <span>{q.title}</span>
                          </h3>

                          {/* 1. Why Interviewers Ask This (Concept Demystification) */}
                          {q.whyAsked && (
                            <div className="ib-why-box">
                              <div className="ib-why-header">
                                <TargetIcon />
                                <span>Why Interviewers Ask This</span>
                              </div>
                              <p className="ib-why-text">{formatInlineCode(q.whyAsked)}</p>
                            </div>
                          )}

                          {/* 2. Spoken Interview Pitch (How to articulate in an interview) */}
                          {q.interviewPitch && (
                            <div className="ib-pitch-box">
                              <div className="ib-pitch-header">
                                <MicIcon />
                                <span>How to Explain to Interviewer (Your Spoken Answer)</span>
                              </div>
                              <p className="ib-pitch-text">{formatInlineCode(q.interviewPitch)}</p>
                            </div>
                          )}

                          {/* 3. Core Summary & Key Bullet Points */}
                          <div className="ib-summary-block">
                            <p className="ib-summary-text">{formatInlineCode(q.summary)}</p>
                            {q.points && q.points.length > 0 && (
                              <ul className="ib-points-list">
                                {q.points.map((point, pIdx) => (
                                  <li key={pIdx}>{formatInlineCode(point)}</li>
                                ))}
                              </ul>
                            )}
                          </div>

                          {/* 4. Complete Syntax-Highlighted Python Code Snippet */}
                          {q.code && (
                            <div className="ib-code-wrapper">
                              <CodeBlock language="python">
                                {q.code}
                              </CodeBlock>
                            </div>
                          )}

                          {/* 5. Line-by-Line Code Breakdown & Dry Run */}
                          {q.dryRun && q.dryRun.length > 0 && (
                            <div className="ib-dryrun-box">
                              <div className="ib-dryrun-title">
                                <span>🔍 Line-by-Line Breakdown & Dry Run</span>
                              </div>
                              <div className="ib-dryrun-list">
                                {q.dryRun.map((step, sIdx) => (
                                  <div key={sIdx} className="ib-dryrun-item">
                                    <span className="ib-dryrun-badge">{formatInlineCode(step.step)}</span>
                                    <span className="ib-dryrun-desc">{formatInlineCode(step.desc)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 6. Complexity & Traps Box */}
                          <div className="ib-footer-meta-grid">
                            {q.complexity && (
                              <div className="ib-complexity-card">
                                <div className="ib-meta-card-title">⚡ Complexity</div>
                                <div className="ib-complexity-row">
                                  <strong>Time:</strong> {q.complexity.time}
                                </div>
                                <div className="ib-complexity-row">
                                  <strong>Space:</strong> {q.complexity.space}
                                </div>
                              </div>
                            )}

                            {q.trap && (
                              <div className="ib-trap-card">
                                <div className="ib-meta-card-title ib-meta-card-title--trap">
                                  <AlertTriangleIcon />
                                  <span>Common Trap / Counter-Question</span>
                                </div>
                                <p className="ib-trap-text">{formatInlineCode(q.trap)}</p>
                              </div>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}

            {/* Bottom Practice CTA */}
            <div className="ib-bottom-cta">
              <h3 className="ib-bottom-cta-title">Want to Practice Live Python Code?</h3>
              <p className="ib-bottom-cta-desc">
                Execute and test all these interview questions live in our interactive Python Lab compiler with real-time feedback.
              </p>
              <div className="ib-bottom-cta-buttons">
                <Link className="ib-cta-btn ib-cta-btn--primary" to="/online-python-compiler" target="_blank">
                  Open Python Lab
                </Link>
                <Link className="ib-cta-btn ib-cta-btn--secondary" to="/">
                  Explore Course Docs
                </Link>
              </div>
            </div>
          </main>
        </div>

        {/* Floating Back to Top Button */}
        {showBackToTop && (
          <button
            className="ib-back-to-top"
            onClick={scrollToTop}
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUpIcon />
          </button>
        )}
      </div>
    </Layout>
  );
}
