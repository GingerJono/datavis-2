import React from 'react';

export function PartiesTable({ rows = [] }) {
  return (
    <div className="table-shell">
      <div className="table-head">
        <span>Role</span>
        <span>Name</span>
        <span>Programmes</span>
        <span>Premium (m)</span>
      </div>
      <div className="table-body">
        {rows.map((row) => (
          <div key={`${row.role}-${row.name}`} className="table-row">
            <span>{row.role}</span>
            <span className="muted">{row.name}</span>
            <span>{row.programmes}</span>
            <span>£{row.premium.toFixed(1)}</span>
          </div>
        ))}
        {rows.length === 0 && <div className="table-row muted">Awaiting parties data…</div>}
      </div>
    </div>
  );
}
