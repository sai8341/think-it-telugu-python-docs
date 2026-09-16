import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useHistory } from '@docusaurus/router';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {
  POPULAR_SEARCH_EXAMPLES,
  QUICK_NAVIGATION_LINKS,
  DOCS_SEARCH_INDEX,
} from '@site/src/data/searchIndexData';

function SearchModalInner() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMac, setIsMac] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    setIsMac(typeof navigator !== 'undefined' && /Mac|iPhone|iPod|iPad/.test(navigator.platform));
  }, []);

  // Open / Close helper
  const openModal = useCallback(() => {
    setIsOpen(true);
    setSelectedIndex(0);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  // Global keyboard shortcuts (Ctrl+K, Cmd+K, /)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) closeModal();
        else openModal();
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        openModal();
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, openModal, closeModal]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Filter search results
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const terms = q.split(/\s+/).filter(Boolean);

    return DOCS_SEARCH_INDEX.map((item) => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const descLower = item.description.toLowerCase();
      const catLower = item.category.toLowerCase();
      const keywordsLower = (item.keywords || []).map((k) => k.toLowerCase());

      // Exact title match gets huge bonus
      if (titleLower.includes(q)) score += 100;
      if (keywordsLower.some((k) => k.includes(q))) score += 50;
      if (descLower.includes(q)) score += 25;
      if (catLower.includes(q)) score += 15;

      // Partial terms
      for (const term of terms) {
        if (titleLower.includes(term)) score += 20;
        if (keywordsLower.some((k) => k.includes(term))) score += 15;
        if (descLower.includes(term)) score += 10;
      }

      return { ...item, score };
    })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [query]);

  // Handle keyboard navigation inside results
  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (searchResults.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % searchResults.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (searchResults.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults.length > 0 && searchResults[selectedIndex]) {
        navigateTo(searchResults[selectedIndex].url);
      }
    }
  };

  const navigateTo = (url) => {
    closeModal();
    if (url.startsWith('http')) {
      window.open(url, '_blank');
    } else {
      history.push(url);
    }
  };

  const handleChipClick = (chipQuery) => {
    setQuery(chipQuery);
    setSelectedIndex(0);
    inputRef.current?.focus();
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('.search-result-card--active');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <>
      {/* --- Desktop Trigger Button --- */}
      <button
        type="button"
        className="search-trigger-btn search-trigger-desktop"
        onClick={openModal}
        aria-label="Search Python documentation"
      >
        <span className="search-trigger-left">
          <svg
            className="search-trigger-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="search-trigger-placeholder">Search docs, syntax, interview Q&A...</span>
        </span>
        <span className="search-trigger-kbd">
          <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
          <kbd>K</kbd>
        </span>
      </button>

      {/* --- Mobile Trigger Button (Compact Icon) --- */}
      <button
        type="button"
        className="search-trigger-btn search-trigger-mobile"
        onClick={openModal}
        aria-label="Open search dialog"
      >
        <svg
          className="search-trigger-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      {/* --- Search Modal Popup Dialog --- */}
      {isOpen && (
        <div className="search-modal-backdrop" onClick={closeModal}>
          <div
            className="search-modal-window"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Search documentation"
          >
            {/* Header: Search Input */}
            <div className="search-modal-header">
              <svg
                className="search-modal-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                className="search-modal-input"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Search Python topics, syntax, interview questions..."
                spellCheck={false}
                autoComplete="off"
              />
              {query && (
                <button
                  type="button"
                  className="search-modal-clear-btn"
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  title="Clear search"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
              <button
                type="button"
                className="search-modal-close-btn"
                onClick={closeModal}
                title="Close search (Esc)"
              >
                Esc
              </button>
            </div>

            {/* Content Area */}
            <div className="search-modal-body" ref={listRef}>
              {/* If query is empty, show Quick Examples & Navigation */}
              {!query.trim() ? (
                <div className="search-modal-suggestions">
                  {/* Popular Topics / Example Chips */}
                  <div className="search-section">
                    <div className="search-section-header">
                      <span className="search-section-title">🔥 Popular Searches (Tap to search)</span>
                    </div>
                    <div className="search-chips-grid">
                      {POPULAR_SEARCH_EXAMPLES.map((chip, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="search-chip"
                          onClick={() => handleChipClick(chip.query)}
                        >
                          <span className="search-chip-label">{chip.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Navigation Links */}
                  <div className="search-section">
                    <div className="search-section-header">
                      <span className="search-section-title">Quick Jump</span>
                    </div>
                    <div className="search-quick-links">
                      {QUICK_NAVIGATION_LINKS.map((link, idx) => (
                        <div
                          key={idx}
                          className="search-quick-card"
                          onClick={() => navigateTo(link.url)}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="search-quick-card-left">
                            <div>
                              <div className="search-quick-card-title">
                                {link.title}
                                <span className="search-quick-card-badge">{link.badge}</span>
                              </div>
                              <div className="search-quick-card-desc">{link.description}</div>
                            </div>
                          </div>
                          <svg
                            className="search-quick-card-arrow"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Live Results List */
                <div className="search-results-list">
                  {searchResults.length > 0 ? (
                    searchResults.map((item, idx) => {
                      const isActive = idx === selectedIndex;
                      return (
                        <div
                          key={idx}
                          className={`search-result-card ${isActive ? 'search-result-card--active' : ''}`}
                          onClick={() => navigateTo(item.url)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="search-result-main">
                            <div className="search-result-header">
                              <span className="search-result-badge">{item.badge || item.category}</span>
                              <span className="search-result-title">{item.title}</span>
                            </div>
                            <p className="search-result-desc">{item.description}</p>
                            <span className="search-result-url">{item.url}</span>
                          </div>
                          <div className="search-result-arrow">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="search-no-results">
                      <div className="search-no-results-icon">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ color: 'var(--brand-primary, #0d9488)' }}
                        >
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                      </div>
                      <h4>No matching topics found for "{query}"</h4>
                      <p>Try searching for keywords like <code>variables</code>, <code>loops</code>, <code>lists</code>, or <code>oop</code>.</p>
                      <div className="search-no-results-chips">
                        <button type="button" className="search-chip" onClick={() => handleChipClick('variables')}>Variables</button>
                        <button type="button" className="search-chip" onClick={() => handleChipClick('loops')}>Loops</button>
                        <button type="button" className="search-chip" onClick={() => handleChipClick('functions')}>Functions</button>
                        <button type="button" className="search-chip" onClick={() => handleChipClick('interview questions')}>Interview Prep</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Bar */}
            <div className="search-modal-footer">
              <div className="search-footer-left">
                <span className="search-footer-hint">
                  <kbd className="search-footer-kbd">↑</kbd>
                  <kbd className="search-footer-kbd">↓</kbd>
                  <span>to navigate</span>
                </span>
                <span className="search-footer-hint">
                  <kbd className="search-footer-kbd">↵</kbd>
                  <span>to select</span>
                </span>
                <span className="search-footer-hint">
                  <kbd className="search-footer-kbd">esc</kbd>
                  <span>to close</span>
                </span>
              </div>
              <div className="search-footer-right">
                <span>Think IT Telugu Docs</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function SearchBar() {
  return (
    <BrowserOnly fallback={<div className="search-trigger-placeholder-skeleton" />}>
      {() => <SearchModalInner />}
    </BrowserOnly>
  );
}
