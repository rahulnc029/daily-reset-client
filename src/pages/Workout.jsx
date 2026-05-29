import {
    useEffect,
    useState,
} from "react";

import { Link } from "react-router-dom";
import api from "../services/api";

function Workout() {
    const [exercises, setExercises] = useState([]);
    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        fetchExercises();
    }, []);

    useEffect(() => {
        let timer;

        if (running) {
            timer = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [running]);

    const fetchExercises = async () => {
        const res = await api.get("/workout/exercises");

        const formatted =
            res.data.map((e) => ({
                exerciseId: e._id,
                name: e.name,
                sets: e.reps.map((rep) => ({
                    reps: rep,
                    completed: false,
                })),
            }));

        setExercises(formatted);
    };

    const updateSet = (
        exerciseId,
        index,
        value
    ) => {
        setExercises((prev) =>
            prev.map((e) =>
                e.exerciseId === exerciseId
                    ? {
                        ...e,
                        sets: e.sets.map((set, i) =>
                            i === index
                                ? Number(value)
                                : set
                        ),
                    }
                    : e
            )
        );
    };

    const saveWorkout = async () => {
        await api.post("/workout/today", {
            exercises,
            durationInSeconds: seconds,
        });
    };

    return (
        <div className="min-h-screen bg-slate-100 pb-28">
            <main className="mx-auto max-w-2xl px-4 py-6">

                <div className="mb-8 flex items-center justify-between">

                    <Link
                        to="/"
                        className="text-slate-600"
                    >
                        ← Dashboard
                    </Link>

                    <Link
                        to="/workout/plan"
                        className="rounded-xl bg-white px-4 py-2 shadow-sm"
                    >
                        Manage
                    </Link>

                    <Link
                        to="/workout/calendar"
                        className="rounded-xl bg-white px-4 py-2 shadow-sm"
                    >
                        Calendar
                    </Link>

                </div>

                <div className="mb-8 rounded-3xl bg-slate-900 p-8 text-white shadow-lg">

                    <p className="text-sm uppercase tracking-wider text-slate-400">
                        Workout Timer
                    </p>

                    <h1 className="mt-3 text-5xl font-bold">
                        {Math.floor(seconds / 60)}
                        :
                        {String(
                            seconds % 60
                        ).padStart(2, "0")}
                    </h1>

                    <div className="mt-6 flex gap-3">

                        <button
                            onClick={() =>
                                setRunning(true)
                            }
                            className="rounded-xl bg-green-500 px-5 py-2 font-medium"
                        >
                            Start
                        </button>

                        <button
                            onClick={() =>
                                setRunning(false)
                            }
                            className="rounded-xl bg-yellow-500 px-5 py-2 font-medium"
                        >
                            Pause
                        </button>

                        <button
                            onClick={() => {
                                setRunning(false);
                                setSeconds(0);
                            }}
                            className="rounded-xl bg-red-500 px-5 py-2 font-medium"
                        >
                            Reset
                        </button>

                    </div>
                </div>

                <div className="space-y-5">

                    {exercises.map((exercise) => (
                        <div
                            key={exercise.exerciseId}
                            className="rounded-3xl bg-white p-6 shadow-sm"
                        >

                            <h2 className="mb-5 text-xl font-semibold">
                                {exercise.name}
                            </h2>

                            <div className="space-y-3">

                                {exercise.sets.map((set, index) => (
                                    <div key={index} className="flex items-center justify-between border rounded px-4 py-3">
                                        <span>
                                            Set {index + 1}
                                        </span>

                                        <span>
                                            {set.reps} reps
                                        </span>

                                        <input
                                            type="checkbox"
                                            checked={set.completed}
                                            onChange={() => setExercises((prev) => prev.map((e) => e.exerciseId === exercise.exerciseId ? {
                                                ...e,
                                                sets: e.sets.map((s, i) => i === index ? {
                                                    ...s,
                                                    completed: !s.completed,
                                                } : s),
                                            } : e
                                            ))}
                                        />
                                    </div>
                                )

                                )}

                            </div>
                        </div>
                    ))}

                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
                <button
                    onClick={saveWorkout}
                    className="mx-auto block w-full max-w-2xl rounded-2xl bg-blue-600 py-4 text-lg font-medium text-white"
                >
                    Save Workout
                </button>
            </div>
        </div>
    );
}

export default Workout;