import React from 'react';
import Content from '@theme-original/DocItem/Content';
import { useLocation } from '@docusaurus/router';
import { getActivePart } from '@site/src/utils/navigation';

export default function ContentWrapper(props) {
  const location = useLocation();
  const activePart = getActivePart(location.pathname);

  if (activePart === 'part4') {
    return (
      <div style={{ position: 'relative' }}>
        {/* Blurred background content */}
        <div style={{ 
          filter: 'blur(6px)', 
          opacity: 0.4, 
          userSelect: 'none', 
          pointerEvents: 'none' 
        }}>
          <Content {...props} />
        </div>

        {/* Overlay container that covers the entire blurred content */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          {/* Sticky Lock Card */}
          <div style={{
            position: 'sticky',
            top: '30vh',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            backgroundColor: 'var(--ifm-background-surface-color)',
            padding: '2.5rem',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            border: '1px solid var(--ifm-color-emphasis-200)',
            width: '100%',
            maxWidth: '450px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'auto'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '1rem', lineHeight: 1 }}>⏳</div>
            <h2 style={{ marginBottom: '1rem', fontSize: '24px' }}>Coming Soon</h2>
            <p style={{ color: 'var(--ifm-color-emphasis-700)', marginBottom: '1.5rem', fontSize: '15px', lineHeight: '1.5' }}>
              This AI & ML module is currently under development. Stay tuned for the advanced premium curriculum!
            </p>
            <button disabled style={{
              display: 'inline-block',
              backgroundColor: 'var(--ifm-color-emphasis-400)',
              color: '#fff',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'not-allowed'
            }}>
              Locked
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Content {...props} />
    </>
  );
}
