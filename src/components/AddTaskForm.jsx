import { useState } from "react";
import api from "../services/api";

function AddTaskForm({
    phase,
    fetchTasks,
}) {
    const [title, setTitle] =
        useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        await api.post("/tasks", {
            title,
            phase,
        });

        setTitle("");

        fetchTasks();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 sm:flex-row"
        >
            <input
                type="text"
                value={title}
                placeholder="Add task"
                onChange={(e) =>
                    setTitle(e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
            />

            <button
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 sm:w-auto"
            >
                Add
            </button>
        </form>
    );
}

export default AddTaskForm;