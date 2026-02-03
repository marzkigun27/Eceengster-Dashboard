'use client';

import React from 'react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceArea
} from 'recharts';
import { COLORS } from '../constants';

export const ParameterChart = ({ data, type, dataKey, color, threshold, isDarkMode }: any) => {
  const strokeColor = isDarkMode ? "rgba(255,255,255,0.05)" : "#1F6F5C10";
  const axisColor = isDarkMode ? "rgba(255,255,255,0.3)" : "#1F6F5C";

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        {type === 'line-chart' ? (
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={strokeColor} />
            <XAxis dataKey="timestamp" hide />
            <YAxis stroke={axisColor} fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? '#1C2C28' : '#fff',
                borderRadius: '12px',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                color: isDarkMode ? '#fff' : '#1E2A32'
              }}
            />
            {threshold && (
              <ReferenceArea y1={threshold[0]} y2={threshold[1]} fill={color} fillOpacity={0.05} />
            )}
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        ) : (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={strokeColor} />
            <XAxis dataKey="timestamp" hide />
            <YAxis stroke={axisColor} fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? '#1C2C28' : '#fff',
                borderRadius: '12px',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                color: isDarkMode ? '#fff' : '#1E2A32'
              }}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#gradient-${dataKey})`}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};
