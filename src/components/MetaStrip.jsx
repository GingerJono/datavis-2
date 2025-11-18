import React from 'react';

export function MetaStrip({ programmeRef, lastUpdated }) {
  return (
    <div className="meta-strip">
      <div>
        <span className="meta-label">Programme Reference</span>
        <strong>{programmeRef || '—'}</strong>
      </div>
      <div>
        <span className="meta-label">Last Updated</span>
        <strong>{lastUpdated || '—'}</strong>
      </div>
      <div className="meta-link">
        <a
          href={`https://dalewebapps/ViewProgram?ProgramRef=${programmeRef ?? ''}`}
          target="_blank"
          rel="noreferrer"
        >
          Sandbox view
        </a>
      </div>
    </div>
  );
}
