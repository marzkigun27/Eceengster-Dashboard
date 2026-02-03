'use client';

import React from 'react';
import { Bell, Search, Calendar, Moon, Sun, Menu } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onMenuToggle?: () => void;
}

export const Header = ({ isDarkMode, toggleDarkMode, onMenuToggle }: HeaderProps) => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className={`h-16 md:h-20 flex items-center justify-between px-4 md:px-10 border-b relative z-20 transition-colors duration-500 ${isDarkMode ? 'border-white/5 bg-[#0A0F0D]/50' : 'border-[#1F6F5C]/05 bg-[#F7F4E9]/10'}`}>
      <div className="flex items-center gap-3 md:gap-6">
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className={`lg:hidden p-2 rounded-xl transition-all ${isDarkMode ? 'text-emerald-400 hover:bg-white/10' : 'text-[#1F6F5C] hover:bg-[#1F6F5C]/10'}`}
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className={`text-lg md:text-xl font-black tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>BioDigester Control</h1>
        <div className={`hidden lg:flex items-center gap-2 px-4 py-1.5 border rounded-full font-bold text-xs shadow-sm transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-emerald-400' : 'bg-white/60 border-[#1F6F5C]/05 text-[#1F6F5C]'}`}>
          <Calendar className="w-3.5 h-3.5 opacity-60" />
          {today}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative hidden md:block">
          <Search className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-white/20' : 'text-[#1E2A32]/30'}`} />
          <input
            type="text"
            placeholder="Search sensors..."
            className={`border rounded-full py-2.5 pl-11 pr-6 text-xs font-medium focus:outline-none transition-all placeholder:opacity-40 shadow-sm w-48 lg:w-60 ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:ring-emerald-500/20' : 'bg-white border-[#1F6F5C]/05 text-[#1E2A32] focus:ring-[#1F6F5C]/05'}`}
          />
        </div>

        <div className="flex items-center gap-2 md:gap-4 border-l pl-3 md:pl-6 transition-colors border-white/10">
          <button
            onClick={toggleDarkMode}
            className={`p-2 md:p-2.5 rounded-xl transition-all shadow-sm ${isDarkMode ? 'bg-white/5 text-emerald-400 hover:bg-white/10' : 'bg-white text-[#1F6F5C] hover:bg-[#1F6F5C]/05 border border-[#1F6F5C]/05'}`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button className={`relative p-2 md:p-2.5 rounded-xl transition-all shadow-sm ${isDarkMode ? 'bg-white/5 text-emerald-400' : 'bg-white text-[#1F6F5C] border border-[#1F6F5C]/05'}`}>
            <Bell className="w-4 h-4 opacity-70" />
            <span className="absolute top-1.5 md:top-2 right-1.5 md:right-2 w-2 h-2 bg-[#E63946] border-2 border-white rounded-full shadow-sm" />
          </button>

        </div>
      </div>
    </header>
  );
};
