import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import PhaseSection from "../components/PhaseSection";
import ProgressBar from "../components/ProgressBar";
import Loader from "../components/Loader";



function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const res = await api.get("/tasks");
            setTasks(res.data);
        } catch (error) {
            console.log(`Error fetching tasks in Dashboard: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);


    const today = new Date();

    const dayName = today.toLocaleDateString("en-IN", { weekday: "long" });

    const dateText = today.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-stone-50">
            <main className="mx-auto max-w-3xl px-6 py-12">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-semibold">
                            Daily Reset
                        </h1>

                        <p className="mt-2 text-slate-500">
                            {dayName} . {dateText}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/plan"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                        >
                            Plan Day
                        </Link>

                        <Link
                            to="/workout"
                            className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 transition"
                        >
                            Workout
                        </Link>

                        <Link
                            to="/workout/plan"
                            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-100 transition"
                        >
                            Workout Plan
                        </Link>
                    </div>
                </div>

                <ProgressBar tasks={tasks} />

                <div className="mt-10 space-y-10">
                    <PhaseSection
                        title="Morning"
                        tasks={tasks.filter((t) => t.phase === "morning")}
                        fetchTasks={fetchTasks}
                    />
                    <PhaseSection
                        title="Afternoon"
                        tasks={tasks.filter((t) => t.phase === "afternoon")}
                        fetchTasks={fetchTasks}
                    />
                    <PhaseSection
                        title="Evening"
                        tasks={tasks.filter((t) => t.phase === "evening")}
                        fetchTasks={fetchTasks}
                    />
                </div>
            </main>
        </div>
    );
}

export default Dashboard;