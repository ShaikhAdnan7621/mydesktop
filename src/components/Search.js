"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function Search() {
    const [searchEngine, setSearchEngine] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const storeddefaultSearchEngine = localStorage.getItem("searchEngine");
        console.log(storeddefaultSearchEngine);
        if (storeddefaultSearchEngine === null && !searchEngine) {
            setSearchEngine("https://www.google.com/search");
            return;
        }
        if (storeddefaultSearchEngine) {
            setSearchEngine(storeddefaultSearchEngine);
        }
    }, []);

    const [bookmarkList, setBookmarkList] = useState(() => {
        if (typeof window !== "undefined") {
            const storedBookmarks = localStorage.getItem("bookmarks");
            return !storedBookmarks === "undefined"
                ? JSON.parse(storedBookmarks)
                : [];
        } else {
            return [];
        }
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("searchEngine", searchEngine);
        }
    }, [searchEngine]);

    const searchEngineImages = {
        "https://www.google.com/search": "/search_engines/Google.png",
        "https://www.bing.com/search": "/search_engines/Bing.png",
        "https://search.yahoo.com/search": "/search_engines/Yahoo.png",
        "https://duckduckgo.com/": "/search_engines/DuckDuckGo.png",
        "https://www.ask.com/web": "/search_engines/Ask.png",
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const bookmark = bookmarkList.find((b) => b.name === searchQuery);
        if (bookmark) {
            window.open(bookmark.url, "_blank");
        } else {
            window.open(`${searchEngine}?q=${searchQuery}`, "_blank");
        }
    };

    return (
        <div>
            <div>
                <div className="flex justify-center dark:text-white">
                    {searchEngine && (
                        <div className="relative h-44 w-44">
                            <Image
                                src={searchEngineImages[searchEngine]}
                                width={700}
                                height={700}
                                alt="Search engine logo"
                            />
                        </div>
                    )}
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
                            <datalist
                                id="bookmark-suggestions"
                                className=" bg-white dark:bg-black text-black dark:text-white"
                            >
                                {bookmarkList?.lenth > 0 &&
                                    bookmarkList.map((bookmark, index) => (
                                        <option
                                            className=" bg-white dark:bg-black text-black dark:text-white"
                                            key={index}
                                            value={bookmark.name}
                                        >
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
                                <option value="https://www.ask.com/web">
                                    Ask
                                </option>
                            </select>
                            <button
                                type="submit"
                                className="focus:outline-none"
                            >
                                🔍
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
