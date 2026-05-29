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
        <div className="min-h-screen bg-slate-100 pb-10">
            <main className="mx-auto max-w-2xl px-4 py-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Daily Reset
                    </h1>

                    <p className="mt-1 text-slate-500">
                        {dayName} • {dateText}
                    </p>
                </div>

                <div className="mb-8 grid grid-cols-2 gap-4">
                    <Link to="/plan" className="rounded-3xl bg-white p-5 shadow-sm active:scale-[0.98] transition">
                        <p className="text-3xl mb-3">+</p>
                        <h2 className="font-semibold text-lg">Plan Day</h2>
                        <p className="text-sm text-slate-500 mt-1">Add daily tasks</p>
                    </Link>

                    <Link to="/workout" className="rounded-3xl bg-white p-5 shadow-sm active:scale-[0.98] transition">
                        <p className="text-3xl mb-3">💪</p>
                        <h2 className="font-semibold text-lg">Workout</h2>
                        <p className="text-sm text-slate-500 mt-1">Start workout</p>
                    </Link>

                    <Link to="/workout/plan" className="rounded-3xl bg-white p-5 shadow-sm active:scale-[0.98] transition">
                        <p className="text-3xl mb-3">🏋️</p>
                        <h2 className="font-semibold text-lg">Workout Plan</h2>
                        <p className="text-sm text-slate-500 mt-1">Manage exercises</p>
                    </Link>

                    <Link to="/workout/calendar" className="rounded-3xl bg-white p-5 shadow-sm active:scale-[0.98] transition">
                        <p className="text-3xl mb-3">📅</p>
                        <h2 className="font-semibold text-lg">Calendar</h2>
                        <p className="text-sm text-slate-500 mt-1">Track consistency</p>
                    </Link>
                </div>

                <div className="rounded-3xl bg-white p-5 shadow-sm">
                    <ProgressBar tasks={tasks}/>
                </div>

                <div className="mt-8 space-y-8">
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