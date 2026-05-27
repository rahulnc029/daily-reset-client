import api from "../services/api";
import Loader from "./Loader";
import { useState } from "react";

function TaskItem({
    task,
    fetchTasks,
}) {

    const [loading, setLoading] = useState(false);

    const toggleTask = async () => {
        try {
            setLoading(true);
            await api.patch(`/tasks/${task._id}/toggle`);

            fetchTasks();
        } catch (error) {
            console.log(`Error in toggle: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async () => {
        try {
            setLoading(true);
            await api.delete(`/tasks/${task._id}`);

            fetchTasks();
        } catch (error) {
            console.log(`Error while deleting: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={toggleTask}
                    disabled={loading}
                    className="h-4 w-4 accent-blue-600"
                />

                <span
                    className={
                        task.completed
                            ? "text-slate-400 line-through"
                            : "text-slate-700"
                    }
                >
                    {task.title}
                </span>
            </div>

            <button
                onClick={deleteTask}
                disabled={loading}
                className="text-sm text-red-500 disabled:opacity-50"
            >
                {loading ? <Loader size="sm" /> : "Delete"}
            </button>
        </div>
    );
}

export default TaskItem;