import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Scatter } from 'recharts';

export function RateChangePlot({ data = [] }) {
  const prepared = data.map((row) => ({ ...row, marker: row.change }));
  return (
    <ResponsiveContainer width="100%" height={360}>
      <ComposedChart data={prepared} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
        <XAxis dataKey="segment" tick={{ fill: '#1f2937', fontWeight: 600 }} interval={0} />
        <YAxis tick={{ fill: '#1f2937', fontWeight: 600 }} tickFormatter={(v) => `${v}%`} width={64} />
        <Tooltip formatter={(value) => `${value}%`} />
        <Bar dataKey="p75" stackId="range" fill="#D1E9FF" radius={[10, 10, 10, 10]} />
        <Bar dataKey="p25" stackId="range" fill="#F0F4F8" radius={[10, 10, 10, 10]} />
        <Line type="monotone" dataKey="change" stroke="#145EA8" strokeWidth={3} dot={{ r: 0 }} />
        <Scatter dataKey="marker" fill="#0C325C" shape="circle" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
