import React, { useState } from 'react';
import Details from '@theme/Details';

export function AccordionGroup({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
      {children}
    </div>
  );
}

export function Accordion({ title, children, defaultOpen = false }) {
  return (
    <Details
      summary={<summary style={{ fontWeight: 600, cursor: 'pointer' }}>{title}</summary>}
      style={{
        border: '1px solid var(--ifm-color-emphasis-200)',
        borderRadius: '8px',
        padding: '0.5rem 1rem',
        backgroundColor: 'var(--ifm-card-background-color)',
      }}
    >
      <div style={{ paddingTop: '0.75rem' }}>
        {children}
      </div>
    </Details>
  );
}
