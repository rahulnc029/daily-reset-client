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

    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth();

    const daysInMonth = new Date(
        year,
        month + 1,
        0
    ).getDate();

    const firstDay = new Date(
        year,
        month,
        1
    ).getDay();

    const getStatus = (day) => {
        const date =
            `${year}-${String(
                month + 1
            ).padStart(2, "0")}-${String(
                day
            ).padStart(2, "0")}`;

        const log = logs.find(
            (l) => l.date === date
        );

        if (!log) return "bg-white";

        return log.completed
            ? "bg-green-300"
            : "bg-red-300";
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <main className="mx-auto max-w-2xl p-6">

                <Link
                    to="/workout"
                    className="text-blue-600"
                >
                    ← Back
                </Link>

                <h1 className="my-6 text-3xl font-semibold">
                    Workout Calendar
                </h1>

                <div className="grid grid-cols-7 gap-2">

                    {[...Array(firstDay)].map(
                        (_, i) => (
                            <div key={i}></div>
                        )
                    )}

                    {Array.from(
                        { length: daysInMonth },
                        (_, i) => i + 1
                    ).map((day) => (
                        <div
                            key={day}
                            className={`${getStatus(day)} aspect-square rounded-xl flex items-center justify-center text-sm shadow-sm`}
                        >
                            {day}
                        </div>
                    ))}

                </div>

                <div className="mt-6 flex gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded bg-green-300"></div>
                        Completed
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded bg-red-300"></div>
                        Incomplete
                    </div>
                </div>

            </main>
        </div>
    );
}

export default WorkoutCalendar;