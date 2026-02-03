'use client';

import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Settings, Bell, Wifi, Palette, Save } from 'lucide-react';

export default function SettingsPage() {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

    // Settings state
    const [tempMin, setTempMin] = React.useState(30);
    const [tempMax, setTempMax] = React.useState(38);
    const [phMin, setPhMin] = React.useState(6.8);
    const [phMax, setPhMax] = React.useState(7.5);
    const [methaneWarning, setMethaneWarning] = React.useState(71);
    const [methaneCritical, setMethaneCritical] = React.useState(86);
    const [enableAlerts, setEnableAlerts] = React.useState(true);
    const [refreshRate, setRefreshRate] = React.useState(5);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

    const SettingCard = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
        <div className={`backdrop-blur-md p-6 rounded-[2rem] border shadow-xl ${isDarkMode ? 'bg-[#1C2C28]/60 border-white/5' : 'bg-white/70 border-white/60'}`}>
            <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-emerald-400/10 text-emerald-400' : 'bg-[#1F6F5C]/10 text-[#1F6F5C]'}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <h3 className={`font-black text-lg ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>{title}</h3>
            </div>
            {children}
        </div>
    );

    const InputField = ({ label, value, onChange, unit, min, max, step = 1 }: any) => (
        <div className="mb-4">
            <label className={`block text-xs font-bold mb-2 ${isDarkMode ? 'text-white/60' : 'text-[#1E2A32]/60'}`}>{label}</label>
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    min={min}
                    max={max}
                    step={step}
                    className={`flex-1 px-4 py-2.5 rounded-xl border font-bold text-sm transition-colors ${isDarkMode
                        ? 'bg-black/20 border-white/10 text-white focus:border-emerald-400'
                        : 'bg-white border-[#1F6F5C]/20 text-[#1E2A32] focus:border-[#1F6F5C]'} outline-none`}
                />
                {unit && <span className={`text-sm font-bold ${isDarkMode ? 'text-white/40' : 'text-[#1E2A32]/40'}`}>{unit}</span>}
            </div>
        </div>
    );

    return (
        <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#0A0F0D]' : 'bg-[#F7F4E9]'}`}>
            <Sidebar isDarkMode={isDarkMode} isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} currentPath="/settings" />

            <main className="flex-1 flex flex-col overflow-hidden relative transition-all duration-300">
                <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar relative z-10">
                    {/* Page Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-emerald-400/10 text-emerald-400' : 'bg-[#1F6F5C]/10 text-[#1F6F5C]'}`}>
                                    <Settings className="w-6 h-6" />
                                </div>
                                <h1 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>System Config</h1>
                            </div>
                            <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-[#1E2A32]/50'}`}>Configure alert thresholds and system preferences</p>
                        </div>

                        <button className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${isDarkMode ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'bg-[#1F6F5C] text-white hover:bg-[#1a5f4e]'}`}>
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>

                    {/* Settings Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Temperature Thresholds */}
                        <SettingCard title="Temperature Thresholds" icon={Settings}>
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Minimum (°C)" value={tempMin} onChange={setTempMin} unit="°C" min={0} max={50} />
                                <InputField label="Maximum (°C)" value={tempMax} onChange={setTempMax} unit="°C" min={0} max={50} />
                            </div>
                            <p className={`text-xs mt-2 ${isDarkMode ? 'text-white/30' : 'text-[#1E2A32]/30'}`}>
                                Alerts trigger when temperature is outside this range
                            </p>
                        </SettingCard>

                        {/* pH Thresholds */}
                        <SettingCard title="pH Level Thresholds" icon={Settings}>
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Minimum pH" value={phMin} onChange={setPhMin} unit="pH" min={0} max={14} step={0.1} />
                                <InputField label="Maximum pH" value={phMax} onChange={setPhMax} unit="pH" min={0} max={14} step={0.1} />
                            </div>
                            <p className={`text-xs mt-2 ${isDarkMode ? 'text-white/30' : 'text-[#1E2A32]/30'}`}>
                                Optimal pH range for methane production
                            </p>
                        </SettingCard>

                        {/* Methane Thresholds */}
                        <SettingCard title="Methane Alert Levels" icon={Bell}>
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Warning Level (%)" value={methaneWarning} onChange={setMethaneWarning} unit="%" min={0} max={100} />
                                <InputField label="Critical Level (%)" value={methaneCritical} onChange={setMethaneCritical} unit="%" min={0} max={100} />
                            </div>
                            <p className={`text-xs mt-2 ${isDarkMode ? 'text-white/30' : 'text-[#1E2A32]/30'}`}>
                                Configure warning and critical methane concentration levels
                            </p>
                        </SettingCard>

                        {/* General Settings */}
                        <SettingCard title="General Settings" icon={Palette}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>Enable Alerts</p>
                                        <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-[#1E2A32]/40'}`}>Receive notifications for threshold breaches</p>
                                    </div>
                                    <button
                                        onClick={() => setEnableAlerts(!enableAlerts)}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${enableAlerts
                                            ? (isDarkMode ? 'bg-emerald-500' : 'bg-[#1F6F5C]')
                                            : (isDarkMode ? 'bg-white/20' : 'bg-[#1E2A32]/20')}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${enableAlerts ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>

                                <div className="pt-4 border-t border-white/5">
                                    <InputField label="Data Refresh Rate (seconds)" value={refreshRate} onChange={setRefreshRate} unit="sec" min={1} max={60} />
                                </div>
                            </div>
                        </SettingCard>

                        {/* Connection Settings */}
                        <SettingCard title="Connection Settings" icon={Wifi}>
                            <div className="space-y-4">
                                <div>
                                    <label className={`block text-xs font-bold mb-2 ${isDarkMode ? 'text-white/60' : 'text-[#1E2A32]/60'}`}>WebSocket URL</label>
                                    <input
                                        type="text"
                                        defaultValue="ws://localhost:3000"
                                        className={`w-full px-4 py-2.5 rounded-xl border font-mono text-sm transition-colors ${isDarkMode
                                            ? 'bg-black/20 border-white/10 text-white focus:border-emerald-400'
                                            : 'bg-white border-[#1F6F5C]/20 text-[#1E2A32] focus:border-[#1F6F5C]'} outline-none`}
                                    />
                                </div>
                                <div>
                                    <label className={`block text-xs font-bold mb-2 ${isDarkMode ? 'text-white/60' : 'text-[#1E2A32]/60'}`}>API Endpoint</label>
                                    <input
                                        type="text"
                                        defaultValue="http://localhost:3000/api"
                                        className={`w-full px-4 py-2.5 rounded-xl border font-mono text-sm transition-colors ${isDarkMode
                                            ? 'bg-black/20 border-white/10 text-white focus:border-emerald-400'
                                            : 'bg-white border-[#1F6F5C]/20 text-[#1E2A32] focus:border-[#1F6F5C]'} outline-none`}
                                    />
                                </div>
                            </div>
                        </SettingCard>
                    </div>
                </div>
            </main>
        </div>
    );
}
