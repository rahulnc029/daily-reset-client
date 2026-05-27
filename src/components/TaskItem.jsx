import api from "../services/api";

function TaskItem({
    task,
    fetchTasks,
}) {
    const toggleTask = async () => {
        await api.patch(
            `/tasks/${task._id}/toggle`
        );

        fetchTasks();
    };

    const deleteTask = async () => {
        await api.delete(
            `/tasks/${task._id}`
        );

        fetchTasks();
    };

    return (
        <div className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={toggleTask}
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
                className="text-sm text-red-500 hover:text-red-700"
            >
                Delete
            </button>
        </div>
    );
}

export default TaskItem;