import React, { useEffect } from 'react';

export default function Root({ children }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ignore key events from input fields to prevent accidental triggers while typing
      const isInput = event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA';
      if (isInput) return;

      // Toggle presentation mode with Shift + P
      if (event.shiftKey && event.key.toLowerCase() === 'p') {
        event.preventDefault();
        document.body.classList.toggle('presentation-mode');
      }
      
      // Allow Esc to easily exit presentation mode if active
      if (event.key === 'Escape') {
        if (document.body.classList.contains('presentation-mode')) {
          document.body.classList.remove('presentation-mode');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <>{children}</>;
}
