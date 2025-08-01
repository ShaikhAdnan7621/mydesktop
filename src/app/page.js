"use client";
import { useEffect, useRef, useState } from "react";
import Search from "@/components/Search";
import Clock from "@/components/Clock";
import Bookmark from "@/components/Bookmark";
import WeatherForecast from "@/components/WeatherComponent";
import QuickNotes from "@/components/QuickNotes";
import QuickLinks from "@/components/QuickLinks";
import Quote from "@/components/Quote";
import DarkModeToggle from "@/components/Darkmodetoggle";

export default function Home() {
    const bgRef = useRef(null);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        let ticking = false;
        const handleMouseMove = (e) => {
            if (!ticking && bgRef.current) {
                requestAnimationFrame(() => {
                    const { clientX, clientY } = e;
                    const { innerWidth, innerHeight } = window;
                    const x = (clientX / innerWidth - 0.5) * 10;
                    const y = (clientY / innerHeight - 0.5) * 10;
                    bgRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-black transition-colors duration-75 flex flex-col relative overflow-hidden">
            {/* Interactive Background */}
            <div 
                ref={bgRef}
                className="absolute inset-0 pointer-events-none will-change-transform"
                style={{ transform: 'translate3d(0,0,0)' }}
            >
                <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400/5 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-400/5 rounded-full blur-2xl"></div>
            </div>
            {/* Dark Mode Toggle */}
            <div className="absolute top-6 right-6 z-10">
                <DarkModeToggle />
            </div>

            {/* Main Content - Centered */}
            <div className={`flex-1 flex flex-col items-center justify-center px-6 py-8 transition-opacity duration-500 ${
                showContent ? 'opacity-100' : 'opacity-0'
            }`}>
                {showContent && (
                    <>
                        {/* Clock Section */}
                        <div className="mb-12 animate-bounce-in" style={{animationDuration: '0.15s'}}>
                            <Clock />
                        </div>

                        {/* Search Section */}
                        <div className="w-full max-w-2xl mb-12 animate-fade-in" style={{animationDelay: '0.2s'}}>
                            <Search />
                        </div>

                        {/* Main Widgets Grid */}
                        <div className="w-full max-w-7xl space-y-8">
                            {/* Top Row - Bookmarks */}
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/30 dark:border-gray-700/30 animate-fade-in" style={{animationDelay: '0.4s'}}>
                                <Bookmark />
                            </div>
                            
                            {/* Bottom Row - Widgets */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Weather Widget */}
                                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 animate-fade-in" style={{animationDelay: '0.6s'}}>
                                    <WeatherForecast />
                                </div>
                                
                                {/* Quick Notes */}
                                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 animate-fade-in" style={{animationDelay: '0.8s'}}>
                                    <QuickNotes />
                                </div>
                                
                                {/* Quick Links */}
                                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 animate-fade-in" style={{animationDelay: '1s'}}>
                                    <QuickLinks />
                                </div>
                                
                                {/* Daily Quote */}
                                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 animate-fade-in" style={{animationDelay: '1.2s'}}>
                                    <Quote />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Footer */}
            <div className="text-center pb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Ctrl+L</kbd> to focus address bar
                </p>
            </div>
        </main>
    );
}
