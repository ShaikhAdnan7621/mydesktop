"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus, X } from 'lucide-react';

export default function Bookmark() {
    const [isAddingBookmark, setIsAddingBookmark] = useState(false);
    const [bookmarkName, setBookmarkName] = useState("");
    const [bookmarkURL, setBookmarkURL] = useState("");
    const [bookmarkList, setBookmarkList] = useState([]);

    useEffect(() => {
        const bookmarklist = JSON.parse(localStorage.getItem("bookmarks")) || [
            { name: "YouTube", url: "https://youtube.com" },
            { name: "GitHub", url: "https://github.com" },
            { name: "Gmail", url: "https://gmail.com" },
            { name: "Twitter", url: "https://twitter.com" },
            { name: "Reddit", url: "https://reddit.com" },
            { name: "Netflix", url: "https://netflix.com" }
        ];
        setBookmarkList(bookmarklist);
    }, []);

    const addBookmark = () => {
        if (!bookmarkName || !bookmarkURL) return;
        const updated = [...bookmarkList, { name: bookmarkName, url: bookmarkURL }];
        localStorage.setItem("bookmarks", JSON.stringify(updated));
        setBookmarkList(updated);
        setBookmarkName("");
        setBookmarkURL("");
        setIsAddingBookmark(false);
    };

    const deleteBookmark = (index) => {
        const updated = [...bookmarkList];
        updated.splice(index, 1);
        localStorage.setItem("bookmarks", JSON.stringify(updated));
        setBookmarkList(updated);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-light text-gray-700 dark:text-gray-200">Quick Access</h2>
                <button
                    onClick={() => setIsAddingBookmark(!isAddingBookmark)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
                >
                    <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
            </div>

            {isAddingBookmark && (
                <div className="mb-8 p-6 bg-gray-50/80 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Site name"
                            value={bookmarkName}
                            onChange={(e) => setBookmarkName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-gray-800 dark:text-white placeholder-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="https://example.com"
                            value={bookmarkURL}
                            onChange={(e) => setBookmarkURL(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-gray-800 dark:text-white placeholder-gray-400"
                        />
                        <div className="flex gap-3">
                            <button 
                                onClick={addBookmark} 
                                className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 font-medium"
                            >
                                Add
                            </button>
                            <button 
                                onClick={() => setIsAddingBookmark(false)} 
                                className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
                {bookmarkList.map((bookmark, index) => (
                    <div key={index} className="group relative">
                        <button
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center hover:bg-red-600 z-10"
                            onClick={() => deleteBookmark(index)}
                        >
                            <X className="w-3 h-3" />
                        </button>
                        <Link 
                            href={bookmark.url} 
                            target="_blank" 
                            className="flex flex-col items-center p-4 rounded-2xl hover:bg-gray-100/50 dark:hover:bg-gray-700/30 transition-all duration-200 hover:scale-105"
                        >
                            <div className="w-12 h-12 mb-3 rounded-xl bg-white dark:bg-gray-700 shadow-md flex items-center justify-center overflow-hidden">
                                <img
                                    src={`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=32`}
                                    alt={bookmark.name}
                                    className="w-8 h-8"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }}
                                />
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg hidden items-center justify-center text-white font-bold text-sm">
                                    {bookmark.name.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium truncate w-full text-center">
                                {bookmark.name}
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
