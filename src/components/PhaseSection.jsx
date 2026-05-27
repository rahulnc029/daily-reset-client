import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";

function PhaseSection({
    title,
    phase,
    tasks,
    fetchTasks,
}) {
    return (
        <section>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-medium">
                    {title}
                </h2>

                <div className="h-px flex-1 bg-slate-200 ml-4" />
            </div>

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