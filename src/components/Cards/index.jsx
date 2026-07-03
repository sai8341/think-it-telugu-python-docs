import React from 'react';
import Link from '@docusaurus/Link';

import { ICONS } from '../Icons';

export function Card({ title, icon, href, children }) {
  const iconElement = ICONS[icon] || ICONS['arrow-right'];
  const content = (
    <>
      <div className="doc-card-top">
        <div className="doc-card-icon">{iconElement}</div>
      </div>
      <h3 className="doc-card-title">{title}</h3>
      {children && <div className="doc-card-body">{children}</div>}
    </>
  );

  if (href) {
    if (href.startsWith('http')) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="doc-card doc-card--link">
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className="doc-card doc-card--link">
        {content}
      </Link>
    );
  }

  return <div className="doc-card">{content}</div>;
}

export function CardGroup({ cols = 2, children }) {
  return (
    <div className={`doc-card-group doc-card-group--cols-${cols}`}>
      {children}
    </div>
  );
}
