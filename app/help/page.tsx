'use client';

import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { HelpCircle, Book, MessageCircle, Mail, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

export default function HelpPage() {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
    const [openFaq, setOpenFaq] = React.useState<number | null>(0);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

    const faqs = [
        {
            question: "What is the optimal temperature range for biodigestion?",
            answer: "The optimal temperature range for mesophilic biodigestion is between 30-38°C. Maintaining temperatures within this range ensures maximum microbial activity and methane production efficiency."
        },
        {
            question: "What pH level should I maintain?",
            answer: "The ideal pH range for biogas production is 6.8-7.5. If pH drops below 6.5, it may indicate acidification, which can inhibit methanogenic bacteria. Consider adding alkaline materials to buffer the system."
        },
        {
            question: "What does the methane percentage indicate?",
            answer: "The methane percentage indicates the quality of biogas produced. Optimal biogas contains 55-70% methane. Values above 70% are excellent, while values below 50% may indicate process issues."
        },
        {
            question: "Why is my device showing as offline?",
            answer: "The device shows offline when: 1) The IoT sensor is not powered on, 2) Network connectivity issues exist, 3) The backend server is not running, or 4) All sensor readings are returning 0."
        },
        {
            question: "How often is sensor data updated?",
            answer: "Sensor data is updated in real-time via WebSocket connection. The default polling interval is 5 seconds, but this can be configured in System Config settings."
        },
        {
            question: "How do I export historical data?",
            answer: "Navigate to the Historical Data page and click the 'Export CSV' button. You can select a date range before exporting to limit the data scope."
        }
    ];

    return (
        <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#0A0F0D]' : 'bg-[#F7F4E9]'}`}>
            <Sidebar isDarkMode={isDarkMode} isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} currentPath="/help" />

            <main className="flex-1 flex flex-col overflow-hidden relative transition-all duration-300">
                <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar relative z-10">
                    {/* Page Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-emerald-400/10 text-emerald-400' : 'bg-[#1F6F5C]/10 text-[#1F6F5C]'}`}>
                                <HelpCircle className="w-6 h-6" />
                            </div>
                            <h1 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>Help & Support</h1>
                        </div>
                        <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-[#1E2A32]/50'}`}>Get help with your Smart Biodigester Dashboard</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* FAQ Section */}
                        <div className="lg:col-span-2">
                            <div className={`backdrop-blur-md p-6 rounded-[2rem] border shadow-xl ${isDarkMode ? 'bg-[#1C2C28]/60 border-white/5' : 'bg-white/70 border-white/60'}`}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-emerald-400/10 text-emerald-400' : 'bg-[#1F6F5C]/10 text-[#1F6F5C]'}`}>
                                        <Book className="w-5 h-5" />
                                    </div>
                                    <h3 className={`font-black text-lg ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>Frequently Asked Questions</h3>
                                </div>

                                <div className="space-y-3">
                                    {faqs.map((faq, index) => (
                                        <div
                                            key={index}
                                            className={`border rounded-xl overflow-hidden transition-colors ${isDarkMode ? 'border-white/5' : 'border-[#1F6F5C]/10'}`}
                                        >
                                            <button
                                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                                className={`w-full flex items-center justify-between p-4 text-left transition-colors ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-[#1F6F5C]/05'}`}
                                            >
                                                <span className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>{faq.question}</span>
                                                {openFaq === index ? (
                                                    <ChevronUp className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-[#1F6F5C]'}`} />
                                                ) : (
                                                    <ChevronDown className={`w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-[#1E2A32]/40'}`} />
                                                )}
                                            </button>
                                            {openFaq === index && (
                                                <div className={`px-4 pb-4 text-sm leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-[#1E2A32]/60'}`}>
                                                    {faq.answer}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact & Resources */}
                        <div className="space-y-6">
                            {/* Contact Support */}
                            <div className={`backdrop-blur-md p-6 rounded-[2rem] border shadow-xl ${isDarkMode ? 'bg-[#1C2C28]/60 border-white/5' : 'bg-white/70 border-white/60'}`}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-emerald-400/10 text-emerald-400' : 'bg-[#1F6F5C]/10 text-[#1F6F5C]'}`}>
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <h3 className={`font-black text-lg ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>Contact Support</h3>
                                </div>

                                <div className="space-y-4">
                                    <a
                                        href="mailto:support@ecotech.com"
                                        className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${isDarkMode ? 'bg-black/20 hover:bg-black/30' : 'bg-[#1F6F5C]/05 hover:bg-[#1F6F5C]/10'}`}
                                    >
                                        <Mail className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-[#1F6F5C]'}`} />
                                        <div>
                                            <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>Email Support</p>
                                            <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-[#1E2A32]/40'}`}>support@ecotech.com</p>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Documentation Links */}
                            <div className={`backdrop-blur-md p-6 rounded-[2rem] border shadow-xl ${isDarkMode ? 'bg-[#1C2C28]/60 border-white/5' : 'bg-white/70 border-white/60'}`}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-emerald-400/10 text-emerald-400' : 'bg-[#1F6F5C]/10 text-[#1F6F5C]'}`}>
                                        <Book className="w-5 h-5" />
                                    </div>
                                    <h3 className={`font-black text-lg ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>Documentation</h3>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        { label: 'User Guide', desc: 'Getting started' },
                                        { label: 'API Reference', desc: 'For developers' },
                                        { label: 'Hardware Setup', desc: 'Sensor installation' },
                                    ].map((doc, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className={`flex items-center justify-between p-3 rounded-xl transition-colors ${isDarkMode ? 'bg-black/20 hover:bg-black/30' : 'bg-[#1F6F5C]/05 hover:bg-[#1F6F5C]/10'}`}
                                        >
                                            <div>
                                                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>{doc.label}</p>
                                                <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-[#1E2A32]/40'}`}>{doc.desc}</p>
                                            </div>
                                            <ExternalLink className={`w-4 h-4 ${isDarkMode ? 'text-white/30' : 'text-[#1E2A32]/30'}`} />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Version Info */}
                            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-[#1F6F5C]/05 border-[#1F6F5C]/10'}`}>
                                <p className={`text-xs font-bold ${isDarkMode ? 'text-white/40' : 'text-[#1E2A32]/40'}`}>Dashboard Version</p>
                                <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-[#1E2A32]'}`}>v1.0.0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
