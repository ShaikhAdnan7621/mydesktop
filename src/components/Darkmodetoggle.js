"use client";

import { useState, useEffect } from "react";

function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedDarkMode = localStorage.getItem("darkMode");
        const isSystemDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        const initialDarkMode = savedDarkMode
            ? savedDarkMode === "true"
            : isSystemDarkMode;

        setIsDarkMode(initialDarkMode);
        document.documentElement.classList.toggle("dark", initialDarkMode);
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        document.documentElement.classList.toggle("dark", newDarkMode);
        localStorage.setItem("darkMode", newDarkMode);
    };
    return [isDarkMode, toggleDarkMode];
}

export default function Darkmodetoggle() {
    const [isDarkMode, toggleDarkMode] = useDarkMode();

    return (
        <div className=" w-14 box-content border rounded-full p-0.5 duration-500 bg-white dark:bg-black border-black dark:border-white">
            <div className="flex w-7 h-7 dark:ml-auto duration-500">
                <button
                    onClick={toggleDarkMode}
                    className={`${
                        isDarkMode
                            ? "bg-transparent text-white "
                            : "bg-transparent text-black"
                    } p-0.5 rounded-full focus:outline-none border-2 border-black dark:border-white `}
                >
                    <svg
                        width="20"
                        height="20"
                        x="0"
                        y="0"
                        viewBox={isDarkMode ? "0 0 32 32" : "0 0 24 24"}
                    >
                        {isDarkMode ? (
                            <g>
                                <path
                                    d="M30.706 19.721a1 1 0 0 0-1.042-.234A13.423 13.423 0 0 1 12.513 2.335a1 1 0 0 0-1.276-1.278A15.214 15.214 0 0 0 5.51 4.68a15.422 15.422 0 0 0 21.81 21.81 15.213 15.213 0 0 0 3.623-5.728 1 1 0 0 0-.237-1.041zm-4.8 5.355A13.422 13.422 0 1 1 10.047 3.764a15.514 15.514 0 0 0 4.2 13.985 15.51 15.51 0 0 0 13.985 4.2 13.357 13.357 0 0 1-2.326 3.127z"
                                    fill="#ffffff"
                                ></path>
                            </g>
                        ) : (
                            <g transform="matrix(0.999999999999998,0,0,0.999999999999998,0,0)">
                                <g data-name="Layer 2">
                                    <path
                                        d="M12 18a6 6 0 1 1 6-6 6 6 0 0 1-6 6zm0-10a4 4 0 1 0 4 4 4 4 0 0 0-4-4z"
                                        fill="#000000"
                                    ></path>
                                    <path
                                        d="M12 15a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1 3 3 0 0 1 0 6zM12 5a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v1a1 1 0 0 1-1 1zM17.66 7.34a1 1 0 0 1-.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1-.75.29zM21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM18.36 19.36a1 1 0 0 1-.7-.29l-.66-.71A1 1 0 0 1 18.36 17l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1-.71.24zM12 22a1 1 0 0 1-1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1-1 1zM5.64 19.36a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1-.7.24zM4 13H3a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM6.34 7.34a1 1 0 0 1-.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1-.71.29z"
                                        fill="#000000"
                                    ></path>
                                </g>
                            </g>
                        )}
                    </svg>
                </button>
            </div>
        </div>
    );
}
