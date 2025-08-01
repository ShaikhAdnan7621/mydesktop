"use client";
import { useState, useEffect } from "react";
import { StickyNote, Save } from "lucide-react";

export default function QuickNotes() {
    const [note, setNote] = useState("");
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const savedNote = localStorage.getItem("quickNote") || "";
        setNote(savedNote);
    }, []);

    const saveNote = () => {
        localStorage.setItem("quickNote", note);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <StickyNote className="w-5 h-5 text-yellow-500" />
                    <h3 className="text-lg font-light text-gray-700 dark:text-gray-200">Quick Notes</h3>
                </div>
                <button
                    onClick={saveNote}
                    className={`p-2 rounded-full transition-colors ${
                        saved ? 'bg-green-100 dark:bg-green-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                    <Save className={`w-4 h-4 ${saved ? 'text-green-600' : 'text-gray-500'}`} />
                </button>
            </div>
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Jot down quick thoughts..."
                className="w-full h-32 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl border-0 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-gray-800 dark:text-white placeholder-gray-400"
            />
        </div>
    );
}