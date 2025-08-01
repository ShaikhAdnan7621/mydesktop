"use client";
import React, { useState, useEffect } from "react";
import { Plus, CheckCircle2, Clock, Play, X } from 'lucide-react';
import Todostrip from "./Todostrip";

function Todo() {
    const [adding, setAdding] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    const statusOptions = [
        { label: "Pending", value: "⌚Pending", icon: Clock, color: "text-yellow-500" },
        { label: "In Progress", value: "🏃Inprogress", icon: Play, color: "text-blue-500" },
        { label: "Completed", value: "✔️Completed", icon: CheckCircle2, color: "text-green-500" },
        { label: "Cancelled", value: "✖️Cancelled", icon: X, color: "text-red-500" }
    ];

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("todoarr")) || [];
        if (stored.length === 0) setAdding(true);
        setTodos(stored);
        setLoading(false);
    }, []);

    const saveTodos = (newTodos) => {
        localStorage.setItem("todoarr", JSON.stringify(newTodos));
        setTodos(newTodos);
    };

    const addTodo = () => {
        if (!title || !description) return alert("Enter title and description");
        const newTodos = [
            {
                title,
                description,
                status: statusOptions[0].value,
                created_at: new Date(),
                updated_at: new Date(),
            },
            ...todos,
        ];
        saveTodos(newTodos);
        setTitle("");
        setDescription("");
        setAdding(false);
    };

    const updateStatus = (index, newStatus) => {
        const updated = [...todos];
        updated[index].status = newStatus;
        updated[index].updated_at = new Date();
        saveTodos(updated);
    };

    const deleteTask = (index) => {
        if (!confirm("Delete this task?")) return;
        const updated = [...todos];
        updated.splice(index, 1);
        saveTodos(updated);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Tasks</h2>
                </div>
                <button
                    onClick={() => setAdding(!adding)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                    <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
            </div>

            {adding && (
                <div className="space-y-3 mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <input
                        type="text"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-800 dark:text-white"
                    />
                    <textarea
                        placeholder="Task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-800 dark:text-white resize-none"
                    />
                    <div className="flex space-x-2">
                        <button 
                            onClick={addTodo} 
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm font-medium"
                        >
                            Add Task
                        </button>
                        <button 
                            onClick={() => setAdding(false)} 
                            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200 text-sm font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            ) : todos.length === 0 ? (
                <div className="text-center py-8">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">All tasks completed! ✨</p>
                </div>
            ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {todos.map((task, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-all duration-200"
                        >
                            <Todostrip
                                Task={task}
                                index={index}
                                status={statusOptions}
                                updatestatus={updateStatus}
                                deletetask={deleteTask}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Todo;
