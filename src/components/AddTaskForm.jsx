import { useState } from "react";
import api from "../services/api";
import Loader from "./Loader";

function AddTaskForm({
    phase,
    fetchTasks,
}) {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        try {
            setLoading(true);
            await api.post("/tasks", {
                title,
                phase,
            });

            setTitle("");

            fetchTasks();

        } catch (error) {
            console.log(`Error in Adding Tasks: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 sm:flex-row"
        >
            <input
                type="text"
                value={title}
                disabled={loading}
                placeholder="Add task"
                onChange={(e) =>
                    setTitle(e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            >
                {loading ? <Loader size="sm" /> : "Add"}
            </button>
        </form>
    );
}

export default AddTaskForm;