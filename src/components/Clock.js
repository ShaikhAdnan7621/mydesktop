"use client";
import { useEffect, useState } from "react";

export default function Clock() {
    const [time, setTime] = useState(null);
    const [prevTime, setPrevTime] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const now = new Date();
        setTime(now);
        setPrevTime(now);
        
        const interval = setInterval(() => {
            setPrevTime(prev => prev || new Date());
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted || !time) return null;

    const formatTime = (date) => {
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }).split(':');
    };

    const [hours, minutes, seconds] = formatTime(time);
    const [prevHours, prevMinutes, prevSeconds] = prevTime ? formatTime(prevTime) : ['--', '--', '--'];

    const dateString = time.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    const greeting = () => {
        const hour = time.getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    const DigitBox = ({ digit, prevDigit, isChanging }) => (
        <span className={`inline-block transition-all duration-300 ${
            isChanging ? 'animate-pulse scale-110' : ''
        }`}>
            {digit}
        </span>
    );

    return (
        <div className="text-center">
            <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-light text-gray-600 dark:text-gray-300 mb-2 transition-opacity duration-500" suppressHydrationWarning>
                    {greeting()}
                </h2>
                <div className="text-6xl md:text-8xl font-extralight text-gray-800 dark:text-white tracking-tight font-mono">
                    <DigitBox digit={hours} prevDigit={prevHours} isChanging={hours !== prevHours} />
                    <span className="animate-pulse">:</span>
                    <DigitBox digit={minutes} prevDigit={prevMinutes} isChanging={minutes !== prevMinutes} />
                    <span className="animate-pulse">:</span>
                    <DigitBox digit={seconds} prevDigit={prevSeconds} isChanging={seconds !== prevSeconds} />
                </div>
            </div>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-light transition-opacity duration-500" suppressHydrationWarning>
                {dateString}
            </p>
        </div>
    );
}
