"use client";

import React, { useEffect, useState } from "react";
import Todostrip from "./Todostrip";
import Image from "next/image";

function Todo() {
    const [Addingtodo, setAddingtodo] = useState(false);
    const [TodoTitle, SetTodoTitle] = useState("");
    const [TodoDescription, SetTodoDescription] = useState("");
    const [firstloading, setfirstloading] = useState(true);
    const [todoarr, settodoarr] = useState([]);
    const status = ["⌚Pending", "🏃Inprogress", "✔️Completed", "✖️Cancelled"];

    useEffect(() => {
        setfirstloading(true);
        const todoarr = JSON.parse(localStorage.getItem("todoarr")) || [];
        if (todoarr.length === 0) {
            setAddingtodo(true);
        }
        settodoarr(todoarr);
        setfirstloading(false);
    }, []);

    const appendtodoarr = () => {
        if (TodoTitle === "") {
            alert("Please Enter Task Title");
            return;
        }
        if (TodoDescription === "") {
            alert("Please Enter Task Description");
            return;
        }
        const todoarr = JSON.parse(localStorage.getItem("todoarr")) || [];

        todoarr.unshift({
            title: TodoTitle,
            description: TodoDescription,
            status: status[0],
            created_at: new Date(),
            updated_at: new Date(),
        });

        localStorage.setItem("todoarr", JSON.stringify(todoarr));
        settodoarr(todoarr);
        SetTodoTitle("");
        SetTodoDescription("");
        console.log(todoarr);
    };

    const updatestatus = (index, statuss) => {
        const todoarr = JSON.parse(localStorage.getItem("todoarr")) || [];
        todoarr[index].status = statuss;
        todoarr[index].updated_at = new Date();
        localStorage.setItem("todoarr", JSON.stringify(todoarr));
        settodoarr(todoarr);
    };

    //deletetask
    const deletetask = (index) => {
        if (confirm("Are you sure you want to delete this task?")) {
            const todoarr = JSON.parse(localStorage.getItem("todoarr")) || [];
            todoarr.splice(index, 1);
            localStorage.setItem("todoarr", JSON.stringify(todoarr));
            settodoarr(todoarr);
        }
    };
    const onDrop = (e, index) => {
        const draggedIndex = Number(e.dataTransfer.getData("index"));
        const newTodos = [...todoarr];
        const draggedItem = newTodos[draggedIndex];
        newTodos.splice(draggedIndex, 1); // remove the dragged item from its original position
        newTodos.splice(index, 0, draggedItem); // insert the dragged item at the new position
        settodoarr(newTodos);
        localStorage.setItem("todoarr", JSON.stringify(newTodos));
    };

    const onDragStart = (e, index) => {
        e.dataTransfer.setData("index", index);
    };
    return (
        <div className="max-w-7xl px-5  dark:text-white text-black mb-2 rounded-lg ">
            <h1 className={`text-2xl font-extrabold mt-5 `}>To Dos</h1>
            <div className="items-center">
                <div
                    className={`bg-gray-100 dark:bg-gray-800 shadow-lg w-full duration-500 px-3 rounded-lg ease-out ${
                        !Addingtodo
                            ? " h-0 overflow-hidden m-0 py-0 "
                            : " h-28 mt-5 p-3"
                    }`}
                >
                    <div className="flex h-9 items-center">
                        <input
                            type="text"
                            className="p-1 min-w-0 flex-grow bg-transparent focus:outline-none pr-5 "
                            placeholder="Todo Tittle"
                            value={TodoTitle}
                            onChange={(e) => {
                                SetTodoTitle(e.target.value);
                            }}
                            tabIndex={5}
                        />
                        <button
                            className="w-9 h-9 border border-gray-600 rounded-full "
                            onClick={() => appendtodoarr()}
                            name="addtodo"
                            tabIndex={7}
                        >
                            ➕
                        </button>
                    </div>
                    <hr className="shadow-sm border-gray-300 my-1" />
                    <input
                        className="resize-none w-full bg-transparent mt-2 p-1 focus:outline-none"
                        placeholder="Todo description"
                        value={TodoDescription}
                        tabIndex={6}
                        type="text"
                        onChange={(e) => {
                            SetTodoDescription(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="mt-2 flex items-center">
                <hr className="border-gray-600 border-double flex-grow m-0" />
                <button
                    className={`border-2 border-gray-600 rotate-0 group focus:outline-none text-2xl rounded-full h-9 w-9 relative px-2 hover:pt-1  duration-500 ease-in-out active:rotate-180 delay-100 ${
                        Addingtodo ? " wait rotate-180 " : " rotate-0 "
                    }`}
                    name="Addingtododroer"
                    onClick={() => {
                        Addingtodo ? setAddingtodo(false) : setAddingtodo(true);
                    }}
                >
                    ⇓
                </button>
            </div>

            <div className="mb-2">
                {firstloading ? (
                    <h1 className=" text-center">Loading...</h1>
                ) : (
                    <div className="" onDragOver={(e) => e.preventDefault()}>
                        {todoarr.length > 0 ? (
                            <>
                                <div className="flex items-center my-2 ">
                                    <hr className="border-gray-400 border-2 rounded-full flex-grow " />
                                    <h1 className="text-xl font-bold mx-3">
                                        Task
                                    </h1>
                                    <hr className="border-gray-400 border-2 rounded-full flex-grow " />
                                </div>
                                <div>
                                    {todoarr.map((item, index) => (
                                        <div
                                            className="mt-4 flex w-full p-3 border  rounded-lg shadow-lg"
                                            key={index}
                                            draggable
                                            onDragStart={(e) =>
                                                onDragStart(e, index)
                                            }
                                            onDrop={(e) => onDrop(e, index)}
                                            onDragOver={(e) =>
                                                e.preventDefault()
                                            }
                                        >
                                            {todoarr.length > 1 && (
                                                <div className="w-8 ">
                                                    <Image
                                                        src={
                                                            index === 0
                                                                ? "/downarrow.svg"
                                                                : index ===
                                                                  todoarr.length -
                                                                      1
                                                                ? "/uparrow.svg"
                                                                : "/updownarrow.svg"
                                                        }
                                                        alt="updownarrow"
                                                        width={30}
                                                        height={30}
                                                    />
                                                </div>
                                            )}
                                            <div className="flex-grow">
                                                <Todostrip
                                                    Task={item}
                                                    index={index}
                                                    status={status}
                                                    updatestatus={updatestatus}
                                                    deletetask={deletetask}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p className=" text-center text-xl">
                                All Task Dsone
                            </p>
                        )}
                    </div>
                )}
            </div>
            <hr className="border-gray-600 border-double flex-grow m-0" />
        </div>
    );
}

export default Todo;
