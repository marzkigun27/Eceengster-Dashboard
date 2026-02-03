'use client';

import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { ParameterChart } from '../../components/Charts';
import { SemiGauge, CircularGauge } from '../../components/Gauges';
import { COLORS, CONFIG } from '../../constants';
import { Wifi, WifiOff, Activity } from 'lucide-react';
import { useSensorData } from '../../hooks/useSensorData';

export default function RealtimePage() {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const {
        currentData,
        dataHistory,
        isConnected,
    } = useSensorData();

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const safeCurrentData = currentData || {
        temperature: 0,
        humidity: 0,
        ph: 0,
        methane: 0,
        timestamp: new Date()
    };

    const isDeviceOffline = safeCurrentData.temperature === 0 &&
        safeCurrentData.humidity === 0 &&
        safeCurrentData.ph === 0 &&
        safeCurrentData.methane === 0;
    const isOnline = isConnected && !isDeviceOffline;

    const methaneConfig = () => {
        if (safeCurrentData.methane >= 86) return { color: COLORS.danger, status: "Critical Level" };
        if (safeCurrentData.methane >= 71) return { color: COLORS.warning, status: "High Concentration" };
        if (safeCurrentData.methane >= 55) return { color: isDarkMode ? '#10B981' : COLORS.accent_energy, status: "Optimal Production" };
        return { color: COLORS.secondary, status: "Low Production" };
    };

    const methInfo = methaneConfig();

    return (
        <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#0A0F0D]' : 'bg-[#F7F4E9]'}`}>
            <Sidebar
                isDarkMode={isDarkMode}
                isCollapsed={isSidebarCollapsed}
                onToggle={toggleSidebar}
                currentPath="/realtime"
                isMobileOpen={isMobileMenuOpen}
                onMobileClose={() => setIsMobileMenuOpen(false)}
            />

            <main className="flex-1 flex flex-col overflow-hidden relative transition-all duration-300">
                <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} onMenuToggle={toggleMobileMenu} />

                {/* Connection status indicator */}
                <div className={`absolute top-20 md:top-24 right-4 md:right-10 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${isOnline
                    ? (isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#1F6F5C]/10 text-[#1F6F5C]')
                    : (isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600')
                    }`}>
                    {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                    {isOnline ? 'Live' : 'Offline'}
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar relative z-10">
                    {/* Page Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-emerald-400/10 text-emerald-400' : 'bg-[#1F6F5C]/10 text-[#1F6F5C]'}`}>
                                <Activity className="w-6 h-6" />
                            </div>
                            <h1 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>Real-time Stats</h1>
                        </div>
                        <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-[#1E2A32]/50'}`}>Live sensor readings updated in real-time</p>
                    </div>

                    {/* Large Gauges Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Temperature */}
                        <div className={`backdrop-blur-md p-4 md:p-8 rounded-2xl md:rounded-[2rem] border shadow-xl ${isDarkMode ? 'bg-[#1C2C28]/60 border-white/5' : 'bg-white/70 border-white/60'}`}>
                            <div className="flex items-center gap-3 mb-4 md:mb-6">
                                <div className={`p-2 md:p-2.5 rounded-xl ${isDarkMode ? 'bg-emerald-400/10 text-emerald-400' : 'bg-[#1F6F5C]/10 text-[#1F6F5C]'}`}>
                                    {CONFIG.temperature.icon}
                                </div>
                                <div>
                                    <h3 className={`font-black text-lg ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>Temperature</h3>
                                    <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-[#1E2A32]/40'}`}>Optimal: 30-38°C</p>
                                </div>
                            </div>
                            <div className="text-center mb-4 md:mb-6">
                                <span className={`text-4xl md:text-6xl font-black ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>{safeCurrentData.temperature.toFixed(1)}</span>
                                <span className={`text-xl md:text-2xl ml-2 ${isDarkMode ? 'text-white/40' : 'text-[#1E2A32]/40'}`}>°C</span>
                            </div>
                            <div className="h-32">
                                <ParameterChart data={dataHistory} type="line-chart" dataKey="temperature" color={isDarkMode ? '#10B981' : COLORS.primary} isDarkMode={isDarkMode} />
                            </div>
                        </div>

                        {/* Humidity */}
                        <div className={`backdrop-blur-md p-4 md:p-8 rounded-2xl md:rounded-[2rem] border shadow-xl ${isDarkMode ? 'bg-[#1C2C28]/60 border-white/5' : 'bg-white/70 border-white/60'}`}>
                            <div className="flex items-center gap-3 mb-4 md:mb-6">
                                <div className={`p-2 md:p-2.5 rounded-xl ${isDarkMode ? 'bg-emerald-400/10 text-emerald-400' : 'bg-[#1F6F5C]/10 text-[#1F6F5C]'}`}>
                                    {CONFIG.humidity.icon}
                                </div>
                                <div>
                                    <h3 className={`font-black text-lg ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>Humidity</h3>
                                    <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-[#1E2A32]/40'}`}>Moisture level</p>
                                </div>
                            </div>
                            <div className="text-center mb-4 md:mb-6">
                                <span className={`text-4xl md:text-6xl font-black ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>{safeCurrentData.humidity.toFixed(0)}</span>
                                <span className={`text-xl md:text-2xl ml-2 ${isDarkMode ? 'text-white/40' : 'text-[#1E2A32]/40'}`}>%</span>
                            </div>
                            <div className="h-32">
                                <ParameterChart data={dataHistory} type="area-chart" dataKey="humidity" color={isDarkMode ? '#34D399' : COLORS.secondary} isDarkMode={isDarkMode} />
                            </div>
                        </div>

                        {/* pH Level */}
                        <div className={`backdrop-blur-md p-4 md:p-8 rounded-2xl md:rounded-[2rem] border shadow-xl ${isDarkMode ? 'bg-[#1C2C28]/60 border-white/5' : 'bg-white/70 border-white/60'}`}>
                            <div className="flex items-center gap-3 mb-4 md:mb-6">
                                <div className={`p-2 md:p-2.5 rounded-xl ${isDarkMode ? 'bg-emerald-400/10 text-emerald-400' : 'bg-[#1F6F5C]/10 text-[#1F6F5C]'}`}>
                                    {CONFIG.ph.icon}
                                </div>
                                <div>
                                    <h3 className={`font-black text-lg ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>pH Level</h3>
                                    <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-[#1E2A32]/40'}`}>Optimal: 6.8-7.5</p>
                                </div>
                            </div>
                            <SemiGauge value={safeCurrentData.ph} unit="pH" isDarkMode={isDarkMode} />
                        </div>

                        {/* Methane */}
                        <div className={`backdrop-blur-md p-4 md:p-8 rounded-2xl md:rounded-[2rem] border shadow-xl ${isDarkMode ? 'bg-[#1C2C28]/60 border-white/5' : 'bg-white/70 border-white/60'}`}>
                            <div className="flex items-center gap-3 mb-4 md:mb-6">
                                <div className={`p-2 md:p-2.5 rounded-xl ${isDarkMode ? 'bg-emerald-400/10 text-emerald-400' : 'bg-[#1F6F5C]/10 text-[#1F6F5C]'}`}>
                                    {CONFIG.methane.icon}
                                </div>
                                <div>
                                    <h3 className={`font-black text-lg ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>Methane</h3>
                                    <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-[#1E2A32]/40'}`}>Gas quality</p>
                                </div>
                            </div>
                            <CircularGauge
                                value={safeCurrentData.methane}
                                status={methInfo.status}
                                color={methInfo.color}
                                isDarkMode={isDarkMode}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
