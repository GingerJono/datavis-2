import React from 'react';

export function ContextToggle({ label, options, value, onChange, visible = true }) {
  if (!visible) return null;

  return (
    <div className="toggle-group">
      <span className="context-label">{label}</span>
      {options.map((option) => (
        <label key={option.value} className="toggle-option">
          <input
            type="radio"
            name={label}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}
