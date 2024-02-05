"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function Search() {
    const defaultSearchEngine = "https://www.google.com/search";

    const [searchEngine, setSearchEngine] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("searchEngine") || defaultSearchEngine;
        } else {
            return defaultSearchEngine;
        }
    });

    const [bookmarkList, setBookmarkList] = useState(() => {
        if (typeof window !== "undefined") {
            const storedBookmarks = localStorage.getItem("bookmarks");
            return !storedBookmarks === "undefined" ? JSON.parse(storedBookmarks) : [];
        } else {
            return [];
        }
    });
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("searchEngine", searchEngine);
        }
    }, [searchEngine]);

    const searchEngineImages = {
        "https://www.google.com/search": "/search_engines/google.png",
        "https://www.bing.com/search": "/search_engines/bing.png",
        "https://search.yahoo.com/search": "/search_engines/yahoo.png",
        "https://duckduckgo.com/": "/search_engines/duckduckgo.png",
        "https://www.ask.com/web": "/search_engines/ask.png",
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const bookmark = bookmarkList.find((b) => b.name === searchQuery);
        if (bookmark) {
            window.location.href = bookmark.url;
        } else {
            window.location.href = `${searchEngine}?q=${searchQuery}`;
        }
    };

    return (
        <div>
            <div className="flex justify-center dark:text-white">
                <div className="relative h-44 w-44">
                    <Image
                        src={searchEngineImages[searchEngine]}
                        width={700}
                        height={700}
                        alt="Search engine logo"
                    />
                </div>
            </div>
            <div className="flex justify-center my-5">
                <div className="flex border dark:border-gray-100 border-gray-800 px-6 py-2 rounded-full">
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            name="q"
                            placeholder={`Search in ${
                                searchEngine.split("/")[2]
                            }...`}
                            className="focus:outline-none w-72 dark:bg-black dark:text-white text-black bg-white"
                            list="bookmark-suggestions"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <datalist id="bookmark-suggestions">
                            {bookmarkList?.lenth > 0 &&
                                bookmarkList.map((bookmark, index) => (
                                    <option key={index} value={bookmark.name}>
                                        {bookmark.name}
                                    </option>
                                ))}
                        </datalist>
                        <select
                            onChange={(event) => {
                                setSearchEngine(event.target.value);
                            }}
                            value={searchEngine}
                            className="focus:outline-none mx-3 dark:bg-black dark:text-white text-black bg-white"
                        >
                            <option value="https://www.google.com/search">
                                Google
                            </option>
                            <option value="https://www.bing.com/search">
                                Bing
                            </option>
                            <option value="https://search.yahoo.com/search">
                                Yahoo
                            </option>
                            <option value="https://duckduckgo.com/">
                                DuckDuckGo
                            </option>
                            <option value="https://www.ask.com/web">Ask</option>
                        </select>
                        <button type="submit" className="focus:outline-none">
                            🔍
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Search;
