import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";

function PhaseSection({
    title,
    phase,
    tasks,
    fetchTasks,
}) {
    return (
        <section className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-slate-800">
                {title}
            </h2>

            <div className="space-y-3">
                {tasks.map((task) => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        fetchTasks={fetchTasks}
                    />
                ))}
            </div>

            <div className="mt-4">
                <AddTaskForm
                    phase={phase}
                    fetchTasks={fetchTasks}
                />
            </div>
        </section>
    );
}

export default PhaseSection;