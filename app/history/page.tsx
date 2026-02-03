'use client';

import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Database, Calendar, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSensorData } from '../../hooks/useSensorData';

export default function HistoryPage() {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [dateRange, setDateRange] = React.useState('7d');

    const { dataHistory } = useSensorData();

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#0A0F0D]' : 'bg-[#F7F4E9]'}`}>
            <Sidebar
                isDarkMode={isDarkMode}
                isCollapsed={isSidebarCollapsed}
                onToggle={toggleSidebar}
                currentPath="/history"
                isMobileOpen={isMobileMenuOpen}
                onMobileClose={() => setIsMobileMenuOpen(false)}
            />

            <main className="flex-1 flex flex-col overflow-hidden relative transition-all duration-300">
                <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} onMenuToggle={toggleMobileMenu} />

                <div className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar relative z-10">
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 md:mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-emerald-400/10 text-emerald-400' : 'bg-[#1F6F5C]/10 text-[#1F6F5C]'}`}>
                                    <Database className="w-6 h-6" />
                                </div>
                                <h1 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>Historical Data</h1>
                            </div>
                            <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-[#1E2A32]/50'}`}>View and export past sensor readings</p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 w-full md:w-auto">
                            {/* Date Range Selector */}
                            <div className={`flex p-1.5 rounded-2xl gap-1 overflow-x-auto ${isDarkMode ? 'bg-[#0A0F0D]' : 'bg-white/60'}`}>
                                {['24h', '7d', '30d', '90d'].map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setDateRange(range)}
                                        className={`px-3 md:px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${range === dateRange
                                            ? (isDarkMode ? 'bg-emerald-500 text-black' : 'bg-[#1F6F5C] text-white')
                                            : (isDarkMode ? 'text-white/40 hover:text-white' : 'text-[#1F6F5C]/40 hover:text-[#1F6F5C]')
                                            }`}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>

                            {/* Export Button */}
                            <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${isDarkMode ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'bg-[#1F6F5C] text-white hover:bg-[#1a5f4e]'}`}>
                                <Download className="w-4 h-4" />
                                Export CSV
                            </button>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className={`backdrop-blur-md rounded-2xl md:rounded-[2rem] border shadow-xl overflow-hidden ${isDarkMode ? 'bg-[#1C2C28]/60 border-white/5' : 'bg-white/70 border-white/60'}`}>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-[#1F6F5C]/10'}`}>
                                        <th className={`px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-white/40' : 'text-[#1F6F5C]/60'}`}>Timestamp</th>
                                        <th className={`px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-white/40' : 'text-[#1F6F5C]/60'}`}>Temperature</th>
                                        <th className={`px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-white/40' : 'text-[#1F6F5C]/60'}`}>Humidity</th>
                                        <th className={`px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-white/40' : 'text-[#1F6F5C]/60'}`}>pH Level</th>
                                        <th className={`px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-white/40' : 'text-[#1F6F5C]/60'}`}>Methane %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataHistory.length > 0 ? (
                                        dataHistory.slice(-20).reverse().map((reading, index) => (
                                            <tr key={index} className={`border-b transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-[#1F6F5C]/05 hover:bg-[#1F6F5C]/05'}`}>
                                                <td className={`px-6 py-4 text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-[#1E2A32]/70'}`}>
                                                    {new Date(reading.timestamp).toLocaleString()}
                                                </td>
                                                <td className={`px-6 py-4 text-sm font-bold ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>
                                                    {reading.temperature.toFixed(1)}°C
                                                </td>
                                                <td className={`px-6 py-4 text-sm font-bold ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>
                                                    {reading.humidity.toFixed(0)}%
                                                </td>
                                                <td className={`px-6 py-4 text-sm font-bold ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>
                                                    {reading.ph.toFixed(2)}
                                                </td>
                                                <td className={`px-6 py-4 text-sm font-bold ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>
                                                    {reading.methane.toFixed(1)}%
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className={`px-6 py-12 text-center text-sm ${isDarkMode ? 'text-white/40' : 'text-[#1E2A32]/40'}`}>
                                                No historical data available. Data will appear once the device is online.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {dataHistory.length > 0 && (
                            <div className={`flex items-center justify-between px-6 py-4 border-t ${isDarkMode ? 'border-white/5' : 'border-[#1F6F5C]/10'}`}>
                                <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-[#1E2A32]/40'}`}>
                                    Showing {Math.min(20, dataHistory.length)} of {dataHistory.length} records
                                </p>
                                <div className="flex items-center gap-2">
                                    <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/40' : 'hover:bg-[#1F6F5C]/10 text-[#1E2A32]/40'}`}>
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/40' : 'hover:bg-[#1F6F5C]/10 text-[#1E2A32]/40'}`}>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
