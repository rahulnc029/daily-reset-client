import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function WorkoutPlan() {
    const [exercises, setExercises] = useState([]);

    const [name, setName] = useState("");
    const [sets, setSets] = useState(3);
    const [reps, setReps] = useState([0, 0, 0]);

    const [editingId, setEditingId] = useState(null);

    const fetchExercises = async () => {
        const res = await api.get("/workout/exercises");
        setExercises(res.data);
    };

    useEffect(() => {
        fetchExercises();
    }, []);

    const updateRep = (index, value) => {
        setReps((prev) =>
            prev.map((rep, i) =>
                i === index ? Number(value) : rep
            )
        );
    };

    const resetForm = () => {
        setName("");
        setSets(3);
        setReps([0, 0, 0]);
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            sets,
            reps,
        };

        if (editingId) {
            await api.patch(
                `/workout/exercises/${editingId}`,
                payload
            );
        } else {
            await api.post(
                "/workout/exercises",
                payload
            );
        }

        resetForm();
        fetchExercises();
    };

    const editExercise = (exercise) => {
        setEditingId(exercise._id);
        setName(exercise.name);
        setSets(exercise.sets);
        setReps(exercise.reps);
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
                onSubmit={handleSubmit}
                className="space-y-4 rounded-xl bg-white p-6"
            >

                <input
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    placeholder="Exercise Name"
                    className="w-full border rounded px-4 py-2"
                />

                <input
                    type="number"
                    value={sets}
                    min="1"
                    max="10"
                    onChange={(e) => {
                        const value = Number(
                            e.target.value
                        );

                        setSets(value);

                        setReps(
                            Array(value).fill(0)
                        );
                    }}
                    className="w-full border rounded px-4 py-2"
                />

                <div className="grid grid-cols-3 gap-3">
                    {reps.map((rep, index) => (
                        <input
                            key={index}
                            type="number"
                            value={rep}
                            placeholder={`Set ${index + 1}`}
                            onChange={(e) =>
                                updateRep(
                                    index,
                                    e.target.value
                                )
                            }
                            className="border rounded px-3 py-2"
                        />
                    ))}
                </div>

                <button className="rounded bg-blue-600 px-6 py-2 text-white">
                    {editingId
                        ? "Update Exercise"
                        : "Add Exercise"}
                </button>

            </form>

            <div className="mt-8 space-y-4">
                {exercises.map((exercise) => (
                    <div
                        key={exercise._id}
                        className="rounded-xl bg-white p-5 shadow-sm"
                    >
                        <div className="flex justify-between">

                            <div>
                                <h2 className="font-semibold">
                                    {exercise.name}
                                </h2>

                                <p className="text-sm text-slate-500">
                                    {exercise.sets} sets
                                </p>
                            </div>

                            <div className="flex gap-2">

                                <button
                                    onClick={() =>
                                        editExercise(
                                            exercise
                                        )
                                    }
                                    className="text-blue-600 text-sm"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        deleteExercise(
                                            exercise._id
                                        )
                                    }
                                    className="text-red-500 text-sm"
                                >
                                    Delete
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WorkoutPlan;