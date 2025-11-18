import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const palette = ['#0C325C', '#145EA8', '#3BC8E7', '#D1E9FF'];

export function StatusBarChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <XAxis type="number" hide />
        <YAxis dataKey="label" type="category" width={110} tickLine={false} axisLine={false} />
        <Tooltip formatter={(value) => `${value}%`} />
        <Bar dataKey="value" radius={[8, 8, 8, 8]}>
          {data.map((entry, index) => (
            <Cell key={entry.label} fill={palette[index % palette.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
