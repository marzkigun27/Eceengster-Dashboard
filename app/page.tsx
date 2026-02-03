'use client';

import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { ParameterChart } from '../components/Charts';
import { SemiGauge, CircularGauge } from '../components/Gauges';
import { COLORS, CONFIG } from '../constants';
import { CheckCircle2, TriangleAlert, Wifi, WifiOff } from 'lucide-react';
import { useSensorData } from '../hooks/useSensorData';

const CardHeader = ({ icon, label, value, unit, color, isDarkMode }: any) => (
    <div className="flex justify-between items-start mb-6">
        <div className={`p-2.5 rounded-xl transition-colors ${isDarkMode ? 'text-emerald-400 bg-emerald-400/10' : 'text-[#1F6F5C] bg-[#1F6F5C]/10'}`}>
            {icon}
        </div>
        <div className="text-right">
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isDarkMode ? 'text-white/30' : 'text-[#1F6F5C]/30'}`}>{label}</span>
            <div className="flex items-baseline justify-end gap-1">
                <span className={`text-3xl font-black tracking-tighter transition-colors ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>{value}</span>
                <span className={`text-xs font-bold transition-colors ${isDarkMode ? 'text-white/40' : 'text-[#1F6F5C]/60'}`}>{unit}</span>
            </div>
        </div>
    </div>
);

export default function Dashboard() {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const {
        currentData,
        dataHistory,
        alerts,
        isLoading,
        error,
        isConnected,
        selectedRange,
        setSelectedRange,
    } = useSensorData();

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    // Use default values when data is not available
    const safeCurrentData = currentData || {
        temperature: 0,
        humidity: 0,
        ph: 0,
        methane: 0,
        timestamp: new Date()
    };

    const methaneConfig = () => {
        if (safeCurrentData.methane >= 86) return { color: COLORS.danger, status: "Critical Level", animation: 'blink' };
        if (safeCurrentData.methane >= 71) return { color: COLORS.warning, status: "High Concentration", animation: 'pulse' };
        if (safeCurrentData.methane >= 55) return { color: isDarkMode ? '#10B981' : COLORS.accent_energy, status: "Optimal Production", animation: 'soft-glow' };
        return { color: COLORS.secondary, status: "Low Production", animation: '' };
    };

    const methInfo = methaneConfig();

    // Calculate stats from history
    const avgPh = dataHistory.length > 0
        ? (dataHistory.reduce((sum, d) => sum + d.ph, 0) / dataHistory.length).toFixed(1)
        : '0.0';
    const peakMethane = dataHistory.length > 0
        ? Math.max(...dataHistory.map(d => d.methane)).toFixed(0)
        : '0';
    const efficiency = dataHistory.length > 0
        ? ((dataHistory.filter(d => d.methane >= 55 && d.methane <= 85).length / dataHistory.length) * 100).toFixed(1)
        : '0';

    return (
        <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#0A0F0D]' : 'bg-[#F7F4E9]'}`}>
            <Sidebar
                isDarkMode={isDarkMode}
                isCollapsed={isSidebarCollapsed}
                onToggle={toggleSidebar}
                currentPath="/"
                isMobileOpen={isMobileMenuOpen}
                onMobileClose={() => setIsMobileMenuOpen(false)}
            />

            <main className="flex-1 flex flex-col overflow-hidden relative transition-all duration-300">
                <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} onMenuToggle={toggleMobileMenu} />

                {/* Connection status indicator */}
                {(() => {
                    const isDeviceOffline = safeCurrentData.temperature === 0 &&
                        safeCurrentData.humidity === 0 &&
                        safeCurrentData.ph === 0 &&
                        safeCurrentData.methane === 0;
                    const isOnline = isConnected && !isDeviceOffline;

                    return (
                        <div className={`absolute top-20 md:top-24 right-4 md:right-10 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${isOnline
                            ? (isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#1F6F5C]/10 text-[#1F6F5C]')
                            : (isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600')
                            }`}>
                            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                            {isOnline ? 'Live' : 'Offline'}
                        </div>
                    );
                })()}

                <div className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar relative z-10">
                    <div className={`border-[1.5px] rounded-2xl md:rounded-[2.5rem] p-4 md:p-8 mb-6 md:mb-8 transition-all duration-500 ${isDarkMode ? 'border-emerald-500/10 bg-[#131D1A]/40' : 'border-blue-400/20 bg-[#F7F4E9]/40'} backdrop-blur-sm`}>
                        <div className="grid grid-cols-2 gap-3 md:gap-8">
                            {/* Temperature */}
                            <div className={`fade-slide-up backdrop-blur-md p-4 md:p-8 rounded-2xl md:rounded-[2rem] border shadow-xl transition-all duration-300 ${isDarkMode ? 'bg-[#1C2C28]/60 border-white/5 shadow-black/20' : 'bg-white/70 border-white/60 shadow-[#1F6F5C]/05 hover:-translate-y-1'}`}>
                                <CardHeader
                                    icon={CONFIG.temperature.icon}
                                    label="Temp"
                                    value={safeCurrentData.temperature.toFixed(1)}
                                    unit={CONFIG.temperature.unit}
                                    color={isDarkMode ? '#10B981' : COLORS.primary}
                                    isDarkMode={isDarkMode}
                                />
                                <div className="hidden md:block h-40 mb-6">
                                    <ParameterChart
                                        data={dataHistory}
                                        type="line-chart"
                                        dataKey="temperature"
                                        color={isDarkMode ? '#10B981' : COLORS.primary}
                                        threshold={CONFIG.temperature.normal}
                                        isDarkMode={isDarkMode}
                                    />
                                </div>
                                <div className="hidden md:flex items-center gap-2 mt-auto">
                                    <div className={`w-2 h-2 rounded-full ${safeCurrentData.temperature >= 30 && safeCurrentData.temperature <= 38 ? (isDarkMode ? 'bg-emerald-400' : 'bg-[#1F6F5C]') : 'bg-[#F4A261] pulse'}`} />
                                    <p className={`text-[10px] font-black uppercase tracking-[0.15em] opacity-60 transition-colors ${isDarkMode ? 'text-emerald-400' : 'text-[#1F6F5C]'}`}>Optimal Fermentation</p>
                                </div>
                            </div>

                            {/* Humidity */}
                            <div className={`fade-slide-up backdrop-blur-md p-4 md:p-8 rounded-2xl md:rounded-[2rem] border shadow-xl transition-all duration-300 ${isDarkMode ? 'bg-[#1C2C28]/60 border-white/5 shadow-black/20' : 'bg-white/70 border-white/60 shadow-[#1F6F5C]/05 hover:-translate-y-1'}`} style={{ animationDelay: '100ms' }}>
                                <CardHeader
                                    icon={CONFIG.humidity.icon}
                                    label="Humidity"
                                    value={safeCurrentData.humidity.toFixed(0)}
                                    unit={CONFIG.humidity.unit}
                                    color={isDarkMode ? '#34D399' : COLORS.secondary}
                                    isDarkMode={isDarkMode}
                                />
                                <div className="hidden md:block h-40 mb-6">
                                    <ParameterChart
                                        data={dataHistory}
                                        type="area-chart"
                                        dataKey="humidity"
                                        color={isDarkMode ? '#34D399' : COLORS.secondary}
                                        isDarkMode={isDarkMode}
                                    />
                                </div>
                                <div className="hidden md:flex items-center gap-2 mt-auto">
                                    <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-emerald-400' : 'bg-[#7ED6C1]'}`} />
                                    <p className={`text-[10px] font-black uppercase tracking-[0.15em] opacity-60 transition-colors ${isDarkMode ? 'text-emerald-400' : 'text-[#1F6F5C]'}`}>Moisture Levels Stable</p>
                                </div>
                            </div>

                            {/* pH Level */}
                            <div className={`fade-slide-up backdrop-blur-md p-4 md:p-8 rounded-2xl md:rounded-[2rem] border shadow-xl transition-all duration-300 ${isDarkMode ? 'bg-[#1C2C28]/60 border-white/5 shadow-black/20' : 'bg-white/70 border-white/60 shadow-[#1F6F5C]/05 hover:-translate-y-1'}`} style={{ animationDelay: '200ms' }}>
                                <div className="flex justify-between items-start mb-2">
                                    <div className={`p-2.5 rounded-xl transition-colors ${isDarkMode ? 'bg-emerald-400/10 text-emerald-400' : 'bg-[#1F6F5C15] text-[#1F6F5C]'}`}>
                                        {CONFIG.ph.icon}
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isDarkMode ? 'text-white/30' : 'text-[#1F6F5C]/30'}`}>pH Level</span>
                                </div>
                                <SemiGauge value={safeCurrentData.ph} unit="pH" isDarkMode={isDarkMode} />
                                <div className="hidden md:flex items-center gap-2 justify-center mt-6">
                                    <div className={`w-2 h-2 rounded-full ${safeCurrentData.ph >= 6.8 && safeCurrentData.ph <= 7.5 ? (isDarkMode ? 'bg-emerald-400' : 'bg-[#1F6F5C]') : 'bg-[#E63946] blink'}`} />
                                    <p className={`text-[10px] font-black uppercase tracking-[0.15em] opacity-60 transition-colors ${isDarkMode ? 'text-emerald-400' : 'text-[#1F6F5C]'}`}>Optimal Acid Balance</p>
                                </div>
                            </div>

                            {/* Methane */}
                            <div className={`fade-slide-up backdrop-blur-md p-4 md:p-8 rounded-2xl md:rounded-[2rem] border shadow-xl transition-all duration-300 ${isDarkMode ? 'bg-[#1C2C28]/60 border-white/5 shadow-black/20' : 'bg-white/70 border-white/60 shadow-[#1F6F5C]/05 hover:-translate-y-1'}`} style={{ animationDelay: '300ms' }}>
                                <div className="flex justify-between items-start mb-2">
                                    <div className={`p-2.5 rounded-xl transition-colors ${isDarkMode ? 'bg-emerald-400/10 text-emerald-400' : 'bg-[#F2C94C15] text-[#1F6F5C]'}`}>
                                        {CONFIG.methane.icon}
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isDarkMode ? 'text-white/30' : 'text-[#1F6F5C]/30'}`}>Gas Quality</span>
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

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
                        <div className={`lg:col-span-2 backdrop-blur-md rounded-2xl md:rounded-[2.5rem] border shadow-xl p-4 md:p-10 relative overflow-hidden transition-all duration-500 ${isDarkMode ? 'bg-[#1C2C28]/60 border-white/5 shadow-black/20' : 'bg-white/80 border-white/60 shadow-[#1F6F5C]/05'}`}>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-10">
                                <div>
                                    <h3 className={`text-lg md:text-xl font-black tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>System Overview</h3>
                                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] mt-2 opacity-50 transition-colors ${isDarkMode ? 'text-emerald-400' : 'text-[#1F6F5C]'}`}>Comprehensive Digester Performance</p>
                                </div>
                                <div className={`flex p-1.5 rounded-2xl gap-1 overflow-x-auto transition-colors ${isDarkMode ? 'bg-[#0A0F0D]' : 'bg-[#F7F4E9]'}`}>
                                    {['1h', '24h', '7d', '30d'].map((view) => (
                                        <button
                                            key={view}
                                            onClick={() => setSelectedRange(view)}
                                            className={`px-3 md:px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${view === selectedRange
                                                ? (isDarkMode ? 'bg-emerald-500 text-black shadow-md' : 'bg-[#1F6F5C] text-white shadow-md')
                                                : (isDarkMode ? 'text-white/40 hover:text-white' : 'text-[#1F6F5C]/40 hover:text-[#1F6F5C]')
                                                }`}
                                        >
                                            {view}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-6 md:mb-10">
                                <div>
                                    <h4 className={`text-xs font-black mb-6 uppercase tracking-[0.15em] opacity-60 transition-colors ${isDarkMode ? 'text-emerald-400' : 'text-[#1F6F5C]'}`}>Temperature Stability</h4>
                                    <div className="h-44 overflow-hidden"><ParameterChart data={dataHistory} type="line-chart" dataKey="temperature" color={isDarkMode ? '#10B981' : COLORS.primary} isDarkMode={isDarkMode} /></div>
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-[#F4A261] mb-6 uppercase tracking-[0.15em] opacity-60">Methane Production Flow</h4>
                                    <div className="h-44 overflow-hidden"><ParameterChart data={dataHistory} type="area-chart" dataKey="methane" color={isDarkMode ? '#34D399' : COLORS.accent_energy} isDarkMode={isDarkMode} /></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 md:gap-6">
                                {[
                                    { label: 'Avg pH', val: avgPh },
                                    { label: 'Peak Methane', val: `${peakMethane}%` },
                                    { label: 'Efficiency', val: `${efficiency}%` }
                                ].map(stat => (
                                    <div key={stat.label} className={`p-3 md:p-6 border rounded-xl md:rounded-[1.5rem] shadow-sm transition-all hover:scale-[1.02] ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-white border-[#1F6F5C]/05'}`}>
                                        <p className={`text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] mb-1 transition-colors ${isDarkMode ? 'text-white/30' : 'text-[#1F6F5C]/40'}`}>{stat.label}</p>
                                        <p className={`text-lg md:text-2xl font-black tracking-tighter transition-colors ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>{stat.val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`backdrop-blur-md rounded-2xl md:rounded-[2.5rem] border shadow-xl p-4 md:p-10 flex flex-col transition-all duration-500 ${isDarkMode ? 'bg-[#1C2C28]/60 border-white/5 shadow-black/20' : 'bg-white/80 border-white/60 shadow-[#1F6F5C]/05'}`}>
                            <div className="flex items-center justify-between mb-6 md:mb-10">
                                <h3 className={`text-lg md:text-xl font-black tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>System Alerts</h3>
                                <span className="bg-[#E63946] text-white text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-lg shadow-[#E63946]/20">Live</span>
                            </div>

                            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                                {alerts.length === 0 ? (
                                    <div className="space-y-4">
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-transform hover:scale-110 ${isDarkMode ? 'bg-emerald-400/10' : 'bg-[#7ED6C1]/20'}`}>
                                            <CheckCircle2 className={`w-8 h-8 ${isDarkMode ? 'text-emerald-400' : 'text-[#1F6F5C]'}`} />
                                        </div>
                                        <p className={`font-black uppercase tracking-[0.25em] text-[10px] opacity-40 transition-colors ${isDarkMode ? 'text-emerald-400' : 'text-[#1F6F5C]'}`}>No active threats</p>
                                    </div>
                                ) : (
                                    <div className="w-full space-y-4">
                                        {alerts.map(alert => (
                                            <div key={alert.id} className={`p-4 border rounded-2xl flex items-center gap-4 text-left ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-white/50 border-[#1F6F5C]/05'}`}>
                                                <div className={`p-2 rounded-xl text-white ${alert.type === 'critical' ? 'bg-[#E63946]' : 'bg-[#F4A261]'}`}>
                                                    <TriangleAlert size={16} />
                                                </div>
                                                <div>
                                                    <p className={`text-xs font-black tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>{alert.message}</p>
                                                    <p className={`text-[9px] font-bold uppercase mt-1 opacity-40 transition-colors ${isDarkMode ? 'text-emerald-400' : 'text-[#1F6F5C]'}`}>{alert.timestamp.toLocaleTimeString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
