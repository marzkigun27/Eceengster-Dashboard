'use client';

import React from 'react';
import { COLORS } from '../constants';

export const SemiGauge = ({ value, min = 0, max = 14, unit, isDarkMode }: any) => {
  const percentage = Math.min(Math.max((value - min) / (max - min), 0), 1);
  const rotation = percentage * 180 - 90;

  return (
    <div className="flex flex-col items-center justify-center w-full py-4">
      <div className="relative w-40 h-20">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "#1F6F5C10"}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M48,10.2 A40,40 0 0,1 56,11.2"
            fill="none"
            stroke={isDarkMode ? "#10B981" : COLORS.primary}
            strokeWidth="8"
            strokeOpacity="0.4"
          />
        </svg>
        <div
          className={`absolute bottom-0 left-1/2 w-[2px] h-16 origin-bottom -translate-x-1/2 transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${isDarkMode ? 'bg-emerald-400' : 'bg-[#1E2A32]'}`}
          style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
        >
          <div className={`w-2 h-2 rounded-full absolute -bottom-1 -left-[3px] ${isDarkMode ? 'bg-emerald-400' : 'bg-[#1E2A32]'}`} />
          <div className="w-[4px] h-[4px] bg-white rounded-full absolute -bottom-[2px] -left-[1px]" />
        </div>
      </div>
      <div className="text-center mt-2 flex items-baseline gap-1">
        <span className={`text-2xl font-black tracking-tighter transition-colors ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>{value.toFixed(1)}</span>
        <span className={`text-[10px] font-bold uppercase tracking-tighter transition-colors ${isDarkMode ? 'text-emerald-400' : 'text-[#1F6F5C]/60'}`}>{unit}</span>
      </div>
    </div>
  );
};

export const CircularGauge = ({ value, status, color, isDarkMode }: any) => {
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center py-2">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke={isDarkMode ? "rgba(255,255,255,0.03)" : "#1F6F5C08"}
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke={color}
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-3xl font-black tracking-tighter transition-colors ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>{Math.round(value)}%</span>
          <span className={`text-[8px] font-bold uppercase tracking-[0.2em] transition-colors ${isDarkMode ? 'text-white/20' : 'text-[#1F6F5C]/40'}`}>Methane</span>
        </div>
      </div>
      <div className={`mt-4 px-4 py-1.5 rounded-full border transition-colors ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-[#1F6F5C05] border-[#1F6F5C10]'}`}>
        <span className="text-[10px] font-black uppercase tracking-wider" style={{ color }}>{status}</span>
      </div>
    </div>
  );
};
