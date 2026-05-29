import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";


function WorkoutCalendar() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        const res = await api.get("/workout/logs");
        setLogs(res.data);
    };

    return (
        <div className="min-h-screen bg-stone-50">
            <main className="mx-auto max-w-4xl p-6">
                <Link to="/workout" className="text-blue-600">
                    ← Back to Workout
                </Link>

                <h1 className="my-6 text-3xl font-semibold">
                    Workout Calendar
                </h1>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {logs.map((log) => (
                        <div
                            key={log._id}
                            className={`rounded-xl p-4 ${log.completed ? "bg-green-100" : "bg-red-100"}`}
                        >
                            <p className="font-medium">{log.date}</p>

                            <p>{log.completed ? "Completed" : "Incomplete"}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default WorkoutCalendar;