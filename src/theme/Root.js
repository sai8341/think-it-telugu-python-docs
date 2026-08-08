import React, { useState, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import PresentationWhiteboard from '@site/src/components/PresentationWhiteboard';

export default function Root({ children }) {
  const [isPresentation, setIsPresentation] = useState(false);

  useEffect(() => {
    // 1. Listen for browser native fullscreen exit (Single Esc press)
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
        if (document.body.classList.contains('presentation-mode')) {
          document.body.classList.remove('presentation-mode');
          setIsPresentation(false);
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    // 2. Keyboard shortcuts
    const handleKeyDown = (event) => {
      // Ignore key events from input fields
      const isInput = event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable;
      if (isInput) return;

      // Secret Instructor Shortcuts: Shift + P OR Alt + P
      const isShiftP = event.shiftKey && event.key.toLowerCase() === 'p';
      const isAltP = event.altKey && event.key.toLowerCase() === 'p';

      if (isShiftP || isAltP) {
        event.preventDefault();
        togglePresentation();
        return;
      }

      // Fallback Exit on Escape key
      if (event.key === 'Escape' && document.body.classList.contains('presentation-mode')) {
        exitPresentation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const enterPresentation = () => {
    document.body.classList.add('presentation-mode');
    setIsPresentation(true);
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  const exitPresentation = () => {
    document.body.classList.remove('presentation-mode');
    setIsPresentation(false);
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  };

  const togglePresentation = () => {
    const active = document.body.classList.contains('presentation-mode');
    if (active) {
      exitPresentation();
    } else {
      enterPresentation();
    }
  };

  return (
    <>
      {children}
      
      {/* Secret Presentation Neon Pen Whiteboard (Only mounted during presentation mode) */}
      <BrowserOnly>
        {() => (
          isPresentation ? <PresentationWhiteboard onExit={exitPresentation} /> : null
        )}
      </BrowserOnly>
    </>
  );
}
