"use client";

import { useState, useEffect } from "react";
import { Search as SearchIcon, ChevronDown } from "lucide-react";

const searchEngines = [
    { name: "Google", url: "https://www.google.com/search?q=", icon: "/search_engines/Google.png" },
    { name: "DuckDuckGo", url: "https://duckduckgo.com/?q=", icon: "/search_engines/DuckDuckGo.png" },
    { name: "Bing", url: "https://www.bing.com/search?q=", icon: "/search_engines/Bing.png" },
    { name: "Yahoo", url: "https://search.yahoo.com/search?p=", icon: "/search_engines/Yahoo.png" },
    { name: "Ask", url: "https://www.ask.com/web?q=", icon: "/search_engines/Ask.png" }
];

export default function Search() {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [selectedEngine, setSelectedEngine] = useState(0);
    const [showEngines, setShowEngines] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("selectedSearchEngine");
        if (saved) setSelectedEngine(parseInt(saved));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        window.open(`${searchEngines[selectedEngine].url}${encodeURIComponent(query)}`, "_blank");
        setQuery("");
    };

    const selectEngine = (index) => {
        setSelectedEngine(index);
        localStorage.setItem("selectedSearchEngine", index.toString());
        setShowEngines(false);
    };

    return (
        <form onSubmit={handleSearch} className="w-full">
            <div className={`relative transition-all duration-300 ${
                isFocused ? 'transform scale-105' : ''
            }`}>
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <SearchIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                </div>
                
                <input
                    type="text"
                    placeholder={`Search with ${searchEngines[selectedEngine].name}...`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full pl-16 pr-20 py-5 text-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-transparent rounded-full shadow-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:shadow-xl transition-all duration-300 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    autoComplete="off"
                />
                
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowEngines(!showEngines)}
                            className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <img src={searchEngines[selectedEngine].icon} alt={searchEngines[selectedEngine].name} className="w-5 h-5" />
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        </button>
                        
                        {showEngines && (
                            <div className="absolute top-full w-52 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                                {searchEngines.map((engine, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => selectEngine(index)}
                                        className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                            index === selectedEngine ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                                        }`}
                                    >
                                        <img src={engine.icon} alt={engine.name} className="w-5 h-5" />
                                        <span className="text-gray-700 dark:text-gray-200">{engine.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}
