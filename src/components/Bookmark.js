"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Bookmark() {
    const [isAddingBookmark, setIsAddingBookmark] = useState(false);
    const [bookmarkName, setBookmarkName] = useState("");
    const [bookmarkURL, setBookmarkURL] = useState("");
    const [bookmarkList, setBookmarkList] = useState([]);

    useEffect(() => {
        const bookmarklist =
            JSON.parse(localStorage.getItem("bookmarks")) || [];
        if (bookmarklist.length === 0) {
            setIsAddingBookmark(true);
        }
        setBookmarkList(bookmarklist);
    }, []);

    const addBookmark = () => {
        if (bookmarkName === "") {
            alert("Please Enter bookmark Name");
            return;
        }
        if (bookmarkURL === "") {
            alert("Please Enter bookmarkURL");
            return;
        }
        const bookmarkelist =
            JSON.parse(localStorage.getItem("bookmarks")) || [];

        bookmarkelist.unshift({
            name: bookmarkName,
            url: bookmarkURL,
        });

        localStorage.setItem("bookmarks", JSON.stringify(bookmarkelist));
        setBookmarkList(bookmarkelist);
        setBookmarkName("");
        setBookmarkURL("");
    };

    return (
        <div>
            <div className="max-w-7xl mx-auto px-5 dark:text-white text-black bg-white dark:bg-black">
                <h1 className="text-2xl font-extrabold mt-5">Bookmarks</h1>
                <div className="items-center">
                    <div
                        className={`bg-gray-100 dark:bg-gray-800 shadow-lg w-full duration-500 px-3 rounded-lg ease-out ${
                            !isAddingBookmark
                                ? " h-0 overflow-hidden m-0 py-0 "
                                : "  mt-5 p-3"
                        }`}
                    >
                        <div className="flex h-9 items-center">
                            <input
                                type="text"
                                className="p-1 min-w-0 flex-grow bg-transparent focus:outline-none pr-5 "
                                placeholder="Bookmark Name"
                                value={bookmarkName}
                                onChange={(e) => {
                                    setBookmarkName(e.target.value);
                                }}
                                tabIndex={5}
                            />
                            <button
                                className="w-9 h-9 border border-gray-600 rounded-full "
                                onClick={addBookmark}
                                name="addBookmark"
                                tabIndex={7}
                            >
                                ➕
                            </button>
                        </div>
                        <hr className="shadow-sm border-gray-300 my-1" />
                        <input
                            className="resize-none w-full bg-transparent mt-2 p-1 focus:outline-none"
                            placeholder="Bookmark URL"
                            value={bookmarkURL}
                            tabIndex={6}
                            type="text"
                            onChange={(e) => {
                                setBookmarkURL(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="mt-2 flex items-center">
                    <hr className="border-gray-600 border-double flex-grow m-0" />
                    <button
                        className={`border-2 border-gray-600 rotate-0 group focus:outline-none text-2xl rounded-full h-9 w-9 relative px-2 hover:pt-1  duration-500 ease-in-out active:rotate-180 delay-100 ${
                            isAddingBookmark
                                ? " wait rotate-180 "
                                : " rotate-0 "
                        }`}
                        name="toggleBookmarkAdder"
                        onClick={() => {
                            setIsAddingBookmark(!isAddingBookmark);
                        }}
                    >
                        ⇓
                    </button>
                </div>
                <div className="mt-5 grid grid-cols-4 gap-2">
                    {bookmarkList.map((bookmark, index) => (
                        <div key={index} className=" text-center shadow-lg rounded-md border ">
                            <Link
                                href={bookmark.url}
                                target="_blank"
                                className=" relative "
                            >
                                <img
                                    src={`https://www.google.com/s2/favicons?domain=${bookmark.url}`}
                                    alt={bookmark.name}
                                    className="w-10 h-10 mx-auto mb-2 mt-4"
                                />
                                {bookmark.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
