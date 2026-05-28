import TaskItem from "./TaskItem";

function PhaseSection({ title, tasks, fetchTasks}) {
    return (
        <section>
            <h2 className="mb-4 text-xl font-medium">
                {title}
            </h2>

            <div className="space-y-3">
                {tasks.map((task) => (
                    <TaskItem key={task._id} task={task} fetchTasks={fetchTasks}/>
                ))}
            </div>
        </section>
    );
}

export default PhaseSection;