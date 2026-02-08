'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Activity, Database, Settings, HelpCircle, Leaf, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import logo from '../public/assets/logo-tim-internal.png';

interface SidebarItemProps {
  icon: any;
  label: string;
  href: string;
  active?: boolean;
  isDarkMode: boolean;
  isCollapsed: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, active = false, isDarkMode, isCollapsed }: SidebarItemProps) => (
  <Link href={href}>
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all ${active
      ? (isDarkMode ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-[#1F6F5C] text-white shadow-lg shadow-[#1F6F5C]/20')
      : (isDarkMode ? 'text-white/50 hover:bg-white/5' : 'text-[#1E2A32]/70 hover:bg-white/60')
      } ${isCollapsed ? 'justify-center px-0 w-10 mx-auto' : ''}`}>
      <Icon className="w-4 h-4 shrink-0" />
      {!isCollapsed && <span className="font-bold text-sm tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300">{label}</span>}
    </div>
  </Link>
);

interface SidebarProps {
  isDarkMode: boolean;
  isCollapsed: boolean;
  onToggle: () => void;
  currentPath: string;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Activity, label: 'Real-time Stats', href: '/realtime' },
  { icon: Database, label: 'Historical Data', href: '/history' },
  { icon: Settings, label: 'System Config', href: '/settings' },
];

export const Sidebar = ({ isDarkMode, isCollapsed, onToggle, currentPath, isMobileOpen = false, onMobileClose }: SidebarProps) => {
  const sidebarContent = (
    <aside className={`h-full border-r flex flex-col z-50 transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-[#0F1714] border-white/5' : 'bg-[#F7F4E9] border-[#1F6F5C]/05'} ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64`}>
      {/* Toggle Button - only visible on desktop */}
      <button
        onClick={onToggle}
        className={`hidden lg:flex absolute -right-3 top-24 w-6 h-6 rounded-full border items-center justify-center transition-all z-40 ${isDarkMode ? 'bg-[#131D1A] border-white/10 text-emerald-400 hover:bg-emerald-400 hover:text-black' : 'bg-white border-[#1F6F5C]/10 text-[#1F6F5C] hover:bg-[#1F6F5C] hover:text-white shadow-md'}`}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className={`flex items-center gap-3 mb-12  mt-6 transition-all ${isCollapsed ? 'lg:justify-center' : 'px-6'}`}>
        <div className={`overflow-hidden ${isCollapsed ? 'lg:hidden' : ''}`}>
          <Image src={logo} alt="Logo" width={180} height={180} />
        </div>
      </div>

      <nav className={`flex-1 space-y-1.5 ${isCollapsed ? 'lg:px-0' : 'px-6'}`}>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={currentPath === item.href}
            isDarkMode={isDarkMode}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      <div className={`mt-auto space-y-6 pb-6 ${isCollapsed ? 'lg:px-0' : 'px-6'}`}>
        <div className={`pt-6 border-t ${isDarkMode ? 'border-white/5' : 'border-[#1F6F5C]/05'}`}>
          <SidebarItem
            icon={HelpCircle}
            label="Help & Support"
            href="/help"
            active={currentPath === '/help'}
            isDarkMode={isDarkMode}
            isCollapsed={isCollapsed}
          />
        </div>

        <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isDarkMode ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-[#7ED6C1]/15 border-[#7ED6C1]/20'} ${isCollapsed ? 'lg:p-2 lg:w-10 lg:mx-auto' : 'p-4'}`}>
          <p className={`text-[10px] font-black uppercase tracking-[0.15em] mb-2 opacity-60 transition-colors whitespace-nowrap ${isCollapsed ? 'lg:hidden' : ''} ${isDarkMode ? 'text-emerald-400' : 'text-[#1F6F5C]'}`}>System Status</p>
          <div className={`flex items-center gap-2 ${isCollapsed ? 'lg:justify-center' : ''}`}>
            <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)] transition-colors shrink-0 ${isDarkMode ? 'bg-emerald-400' : 'bg-[#1F6F5C]'}`} />
            <span className={`text-[11px] font-black uppercase tracking-wide transition-colors whitespace-nowrap ${isCollapsed ? 'lg:hidden' : ''} ${isDarkMode ? 'text-emerald-400' : 'text-[#1F6F5C]'}`}>All Systems Go</span>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar - in normal document flow */}
      <div className="hidden lg:block relative">
        {sidebarContent}
      </div>

      {/* Mobile sidebar - fixed overlay, doesn't affect layout */}
      <div className={`lg:hidden fixed inset-0 z-50 ${isMobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isMobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={onMobileClose}
        />
        {/* Sidebar */}
        <div className={`absolute left-0 top-0 h-full transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {sidebarContent}
        </div>
      </div>
    </>
  );
};
