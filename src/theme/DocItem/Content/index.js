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

        {/* Lock Overlay */}
        <div style={{
          position: 'absolute',
          top: '150px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          backgroundColor: 'var(--ifm-background-surface-color)',
          padding: '2.5rem',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          border: '1px solid var(--ifm-color-emphasis-200)',
          zIndex: 10,
          width: '100%',
          maxWidth: '450px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '1rem', lineHeight: 1 }}>🔒</div>
          <h2 style={{ marginBottom: '1rem', fontSize: '24px' }}>Premium Content</h2>
          <p style={{ color: 'var(--ifm-color-emphasis-700)', marginBottom: '1.5rem', fontSize: '15px', lineHeight: '1.5' }}>
            This AI & ML module is part of the advanced premium curriculum. Unlock the full course to continue your journey!
          </p>
          <a href="#" style={{
            display: 'inline-block',
            backgroundColor: 'var(--ifm-color-primary)',
            color: '#fff',
            textDecoration: 'none',
            padding: '12px 28px',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px',
            transition: 'opacity 0.2s'
          }}>
            Unlock Course
          </a>
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
