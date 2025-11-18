import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export function PremiumHistoryChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorWritten" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#145EA8" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#145EA8" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorSigned" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3BC8E7" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#3BC8E7" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="year" tick={{ fill: '#4a5568', fontWeight: 600 }} />
        <YAxis tick={{ fill: '#4a5568', fontWeight: 600 }} tickFormatter={(v) => `${v}m`} />
        <Tooltip formatter={(value) => `${value}m`} />
        <Area type="monotone" dataKey="written" stroke="#145EA8" fill="url(#colorWritten)" strokeWidth={2.4} />
        <Area type="monotone" dataKey="signed" stroke="#3BC8E7" fill="url(#colorSigned)" strokeWidth={2.4} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
