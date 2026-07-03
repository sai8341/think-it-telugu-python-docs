import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import BrowserOnly from '@docusaurus/BrowserOnly';

function FullscreenToggleComponent() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const nativeFs = !!document.fullscreenElement;
      setIsFullscreen(nativeFs || document.body.classList.contains('docs-fullscreen-active'));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    // Escape key listener for layout-based focus mode exit
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        exitFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Initial check
    setIsFullscreen(!!document.fullscreenElement || document.body.classList.contains('docs-fullscreen-active'));

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const exitFullscreen = () => {
    document.body.classList.remove('docs-fullscreen-active');
    setIsFullscreen(false);
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const enterFullscreen = () => {
    document.body.classList.add('docs-fullscreen-active');
    setIsFullscreen(true);
    document.documentElement.requestFullscreen().catch((err) => {
      // Ignore error if browser blocks request (e.g. in iframe / preview)
      console.warn('Native fullscreen request blocked. Using layout focus fallback.', err);
    });
  };

  const toggleFullscreen = () => {
    const isCurrentlyActive = document.body.classList.contains('docs-fullscreen-active') || !!document.fullscreenElement;
    if (isCurrentlyActive) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  return (
    <button
      className="navbar-fullscreen-btn"
      onClick={toggleFullscreen}
      title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
    >
      {isFullscreen ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 14h6v6m10-6h-6v6M4 10h6V4m10 6h-6V4"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
        </svg>
      )}
    </button>
  );
}

export default function FullscreenToggle() {
  return (
    <BrowserOnly>
      {() => <FullscreenToggleComponent />}
    </BrowserOnly>
  );
}
