import React, { useState, useEffect, useCallback } from 'react';

export default function ZoomableImage({ src, alt, style, className, ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  return (
    <>
      <div 
        className="zoomable-image-wrapper"
        onClick={handleOpen}
        title="Click to expand"
        style={{
          cursor: 'zoom-in',
          display: 'inline-block',
          position: 'relative',
          maxWidth: '100%',
        }}
      >
        <img
          src={src}
          alt={alt || ''}
          loading="lazy"
          decoding="async"
          className={`zoomable-image ${className || ''}`}
          style={{
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            borderRadius: '8px',
            maxWidth: '100%',
            height: 'auto',
            ...style,
          }}
          {...props}
        />
        <div className="zoomable-image-badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <span>Click to enlarge</span>
        </div>
      </div>

      {isOpen && (
        <div
          className="zoomable-image-lightbox-backdrop"
          onClick={handleClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            cursor: 'zoom-out',
            animation: 'zoomInFade 0.25s ease-out',
          }}
        >
          <button
            className="zoomable-image-close-btn"
            onClick={handleClose}
            aria-label="Close zoomed image"
            style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '18px',
              transition: 'background 0.2s ease, transform 0.2s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            ✕
          </button>

          <div
            className="zoomable-image-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '94vw',
              maxHeight: '88vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'default',
            }}
          >
            <img
              src={src}
              alt={alt || ''}
              style={{
                maxWidth: '94vw',
                maxHeight: '82vh',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.15)',
                background: '#ffffff',
              }}
            />
            {alt && (
              <p
                style={{
                  color: '#f1f5f9',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginTop: '14px',
                  textAlign: 'center',
                  maxWidth: '800px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {alt}
              </p>
            )}
          </div>

          <span
            style={{
              position: 'absolute',
              bottom: '16px',
              fontSize: '12px',
              color: '#94a3b8',
              fontFamily: 'sans-serif',
              letterSpacing: '0.05em',
            }}
          >
            Press ESC or click anywhere to close
          </span>
        </div>
      )}
    </>
  );
}
