import { useState } from "react";
import { Link } from "react-router-dom";
import AddTaskForm from "../components/AddTaskForm";


function PlanDay() {
    const [phase, setPhase] = useState("morning");

    return (
        <div className="min-h-screen bg-stone-50">
            <main className="mx-auto max-w-2xl px-6 py-12">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-semibold">
                        Plan Day
                    </h1>

                    <Link to="/" className="text-blue-600">
                        Dashboard
                    </Link>
                </div>

                <div className="mb-8 flex gap-3">
                    {["morning", "afternoon", "evening"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setPhase(item)}
                            className={phase === item ? "rounded-lg bg-blue-600 px-4 py-2 text-white" : "rounded-lg border px-4 py-2"}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <AddTaskForm phase={phase} fetchTasks={() => { }} />
            </main>
        </div>
    );
}


export default PlanDay;