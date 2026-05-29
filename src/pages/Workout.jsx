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
                setSeconds(
                    (prev) => prev + 1
                );
            }, 1000);
        }

        return () =>
            clearInterval(timer);
    }, [running]);

    const fetchExercises =
        async () => {
            const res =
                await api.get(
                    "/workout/exercises"
                );

            const formatted =
                res.data.map((e) => ({
                    exerciseId: e._id,
                    name: e.name,
                    sets: [0, 0, 0],
                }));

            setExercises(formatted);
        };

    const updateSet = (
        exerciseId,
        index,
        value
    ) => {
        setExercises((prev) =>
            prev.map((e) => e.exerciseId === exerciseId ? {
                ...e,
                sets: e.sets.map((set, i) => i === index ? Number(value) : set),
            } : e
            )
        );
    };

    const saveWorkout =
        async () => {
            await api.post("/workout/today",
                {
                    exercises,
                    durationInSeconds: seconds,
                }
            );
        };

    return (
        <div className="min-h-screen bg-stone-50">
            <main className="mx-auto max-w-3xl p-6">

                <Link
                    to="/"
                    className="text-blue-600"
                >
                    ← Back to Dashboard
                </Link>

                <div className="mt-6 mb-8 flex items-center justify-between">

                    <h1 className="text-3xl font-semibold">
                        Workout Tracker
                    </h1>

                    <Link
                        to="/workout/plan"
                        className="rounded-lg border px-4 py-2"
                    >
                        Manage Exercises
                    </Link>

                </div>

                <div className="mb-10 rounded-xl bg-white p-6 shadow-sm">

                    <p className="text-3xl font-semibold mb-4">
                        {Math.floor(
                            seconds / 60
                        )}
                        m
                        {" "}
                        {seconds % 60}
                        s
                    </p>

                    <div className="flex gap-3">

                        <button
                            onClick={() =>
                                setRunning(true)
                            }
                            className="rounded bg-green-600 px-4 py-2 text-white"
                        >
                            Start
                        </button>

                        <button
                            onClick={() =>
                                setRunning(false)
                            }
                            className="rounded bg-yellow-500 px-4 py-2 text-white"
                        >
                            Pause
                        </button>

                        <button
                            onClick={() => {
                                setRunning(
                                    false
                                );

                                setSeconds(
                                    0
                                );
                            }}
                            className="rounded bg-red-500 px-4 py-2 text-white"
                        >
                            Reset
                        </button>

                    </div>
                </div>

                <div className="space-y-8">
                    {exercises.map(
                        (exercise) => (
                            <div
                                key={
                                    exercise.exerciseId
                                }
                                className="rounded-xl bg-white p-5 shadow-sm"
                            >
                                <h2 className="mb-4 text-lg font-medium">
                                    {
                                        exercise.name
                                    }
                                </h2>

                                <div className="grid grid-cols-3 gap-3">

                                    {exercise.sets.map(
                                        (
                                            reps,
                                            index
                                        ) => (
                                            <input
                                                key={
                                                    index
                                                }
                                                type="number"
                                                value={
                                                    reps
                                                }
                                                placeholder={`Set ${index + 1
                                                    }`}
                                                onChange={(
                                                    e
                                                ) =>
                                                    updateSet(
                                                        exercise.exerciseId,
                                                        index,
                                                        e.target
                                                            .value
                                                    )
                                                }
                                                className="border rounded px-3 py-2"
                                            />
                                        )
                                    )}

                                </div>
                            </div>
                        )
                    )}
                </div>

                <button
                    onClick={saveWorkout}
                    className="mt-10 w-full rounded-lg bg-blue-600 py-3 text-white"
                >
                    Save Workout
                </button>

            </main>
        </div>
    );
}

export default Workout;