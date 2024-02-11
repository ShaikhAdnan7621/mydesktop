"use client";

import React from "react";
import { useState } from "react";

function Todostrip(props) {
    const [statusIs, setStatusIs] = useState(props.Task.status);
    const statusColors = {
        "⌚Pending": "bg-yellow-300 ",
        "🏃Inprogress": "bg-blue-300",
        "✔️Completed": "bg-green-300",
        "✖️Cancelled": "bg-red-300",
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} \n ${date.toLocaleTimeString()}`;
    };

    return (
        <div className="text-black  dark:text-white  ">
            <div className=" relative ">
                <button
                    className="absolute top-0 right-0 p-0.5 w-9 h-9 border  rounded-full border-gray-800  dark:border-gray-100 text-xl bg-gray-100 dark:bg-gray-800"
                    onClick={() => props.deletetask(props.index)}
                    name="deleteTodoButton"
                >
                    🗑️
                </button>
                <div className="p-0.5 sm:pr-12">
                    <h1 className="font-bold px-2 pr-12  sm:pr-2">
                        {props.Task.title}
                    </h1>
                    <p className="px-2 text-gray-700 mt-2">
                        {props.Task.description}
                    </p>
                </div>
                <hr className="shadow-sm border-gray-300 mt-3 mb-4" />

                <div className=" flex items-center justify-between mt-5 sm:mt-0 mb-2">
                    <label htmlFor="status" className="ml-4">
                        Status
                    </label>
                    <select
                        className={`px-2 py-1 rounded-lg text-black focus:outline-none border border-gray-800 dark:border-gray-300 shadow-sm text-sm ${
                            statusColors[props.Task.status]
                        }`}
                        name="status"
                        id="status"
                        value={statusIs}
                        onChange={(e) => {
                            props.updatestatus(props.index, e.target.value);
                            setStatusIs(e.target.value);
                        }}
                    >
                        {props.status.length &&
                            props.status.map((item, index) => (
                                <option
                                    key={`${index}`}
                                    className={`  ${statusColors[item]}`}
                                    value={item}
                                >
                                    {item}
                                </option>
                            ))}
                    </select>
                </div>

                <div className=" px-2 text-gray-700 text-xs mt-3 flex justify-between gap-3">
                    <p className="text-left underline">
                        Assign: <span>{formatDate(props.Task.created_at)}</span>
                    </p>
                    <p className="text-right underline">
                        Updated:{" "}
                        <span className="">
                            {formatDate(props.Task.updated_at)}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Todostrip;
