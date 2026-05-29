import {
    useEffect,
    useState,
} from "react";

import { Link } from "react-router-dom";
import api from "../services/api";

function WorkoutPlan() {
    const [exercises, setExercises] = useState([]);
    const [name, setName] = useState("");
    const [sets, setSets] = useState(3);
    const [reps, setReps] = useState([0, 0, 0]);

    const fetchExercises = async () => {
        const res = await api.get("/workout/exercises");

        setExercises(res.data);
    };

    useEffect(() => {
        fetchExercises();
    }, []);

    const updateRep = (index, value) => {
        setReps((prev) => prev.map((rep, i) => i === index ? Number(value) : rep));
    };

    const addExercise = async (e) => {
        e.preventDefault();

        await api.post(
            "/workout/exercises",
            {
                name,
                sets,
                reps,
            }
        );

        setName("");
        setSets(3);
        setReps([0, 0, 0]);

        fetchExercises();
    };

    const deleteExercise = async (id) => {
        await api.delete(
            `/workout/exercises/${id}`
        );

        fetchExercises();
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <Link to="/workout">
                ← Back
            </Link>

            <h1 className="text-3xl font-semibold my-6">
                Workout Plan
            </h1>

            <form
                onSubmit={addExercise}
                className="space-y-4 rounded-xl bg-white p-6"
            >
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Exercise Name"
                    className="w-full border rounded px-4 py-2"
                />

                <input
                    type="number"
                    min="1"
                    max="10"
                    value={sets}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        if(value < 1 || value > 10) return;
                        setSets(value);
                        setReps(Array(value).fill(0));
                    }}
                    className="w-full border rounded px-4 py-2"
                />

                <div className="grid grid-cols-3 gap-3">
                    {reps.map((rep, index) => (
                        <input
                            type="number"
                            key={index}
                            value={rep}
                            placeholder={`Set ${index + 1} reps`}
                            onChange={(e) => updateRep(index, e.target.value)}
                            className="border rounded px-3 py-2"
                        />
                    ))}
                </div>

                <button className="rounded bg-blue-600 px-6 py-2 text-white">
                    Add Exercise
                </button>
            </form>

            <div className="mt-8 space-y-4">
                {exercises.map((exercise) => (
                    <div key={exercise._id} className="rounded-xl bg-white p-5 shadow-sm">
                        <div className="mb-3 flex items-start justify-between">
                            <div>
                                <h2 className="font-semibold text-lg">
                                    {exercise.name}
                                </h2>
                                <p className="text-sm text-slate-500">{exercise.sets} sets</p>
                            </div>

                            <button
                                onClick={() => deleteExercise(exercise._id)}
                                className="rounded-lg px-3 py-1 text-sm text-red-500 hover:bg-red-50"
                            >
                                Delete
                            </button>
                        </div>

                        <div className="mt-2 flex gap-2">
                            {exercise.reps.map((rep, index) => (
                                <span key={index} className="rounded bg-slate-100 px-3 py-1 text-sm">
                                    Set {index + 1}: {rep}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WorkoutPlan;