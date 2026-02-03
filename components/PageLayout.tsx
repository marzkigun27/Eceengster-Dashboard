'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface PageLayoutProps {
    children: React.ReactNode;
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
}

export const PageLayout = ({ children, isDarkMode, setIsDarkMode }: PageLayoutProps) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
    const pathname = usePathname();

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

    return (
        <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#0A0F0D]' : 'bg-[#F7F4E9]'}`}>
            <Sidebar
                isDarkMode={isDarkMode}
                isCollapsed={isSidebarCollapsed}
                onToggle={toggleSidebar}
                currentPath={pathname}
            />

            <main className="flex-1 flex flex-col overflow-hidden relative transition-all duration-300">
                <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

                <div className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
};
