"use client";

import { useState, useEffect } from "react";

const Clock = () => {
    const [date, setDate] = useState(null);

    useEffect(() => {
        setDate(new Date());
        const timer = setInterval(() => setDate(new Date()), 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    if (date === null) {
        return null;
    }

    return (
        <div className="text-black dark:text-white w-full">
            <div className="border-l-4 border-red-500 pl-8  py-12">
                <h2 className="text-3xl drop-shadow-lg ">
                    {date.toLocaleDateString("en-IN", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </h2>
                <h1 className="text-7xl drop-shadow-lg mt-2">
                    {date.toLocaleTimeString("en-US", { hour12: false })}
                </h1>
            </div>
        </div>
    );
};

export default Clock;
