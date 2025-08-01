"use client";
import { useState, useEffect } from "react";
import { Quote as QuoteIcon, RefreshCw } from "lucide-react";

const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
];

export default function Quote() {
    const [currentQuote, setCurrentQuote] = useState(quotes[0]);

    useEffect(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setCurrentQuote(randomQuote);
    }, []);

    const getNewQuote = () => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setCurrentQuote(randomQuote);
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <QuoteIcon className="w-5 h-5 text-purple-500" />
                    <h3 className="text-lg font-light text-gray-700 dark:text-gray-200">Daily Quote</h3>
                </div>
                <button
                    onClick={getNewQuote}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <RefreshCw className="w-4 h-4 text-gray-500" />
                </button>
            </div>
            <blockquote className="text-center">
                <p className="text-gray-600 dark:text-gray-300 italic mb-3 leading-relaxed">
                    "{currentQuote.text}"
                </p>
                <footer className="text-sm text-gray-500 dark:text-gray-400">
                    — {currentQuote.author}
                </footer>
            </blockquote>
        </div>
    );
}