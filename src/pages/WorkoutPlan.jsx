import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function WorkoutPlan() {

    const [exercises, setExercises] = useState([]);
    const [name, setName] = useState("");

    const fetchExercises = async () => {
        const res = await api.get("/workout/exercises");
        setExercises(res.data);
    };

    useEffect(() => {
        fetchExercises();
    }, []);

    const addExercise = async (e) => {
        e.preventDefault();

        if (!name.trim()) return;

        await api.post("/workout/exercise", { name });

        setName("");
        fetchExercises();
    };


    return (
        <div className="max-w-2xl mx-auto p-6">
            <Link
                to="/workout"
                className="text-blue-600"
            >
                ← Back to Workout
            </Link>
            <h1 className="text-3xl font-semibold mb-6">
                Workout Plan
            </h1>

            <form
                onSubmit={addExercise}
                className="flex gap-2 mb-6"
            >
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Add exercise"
                    className="border rounded px-3 py-2 w-full"
                />

                <button className="bg-blue-600 text-white px-4 rounded">
                    Add
                </button>
            </form>

            <div className="space-y-2">
                {exercises.map((exercise) => (
                    <div key={exercise._id} className="border rounded p-3">
                        {exercise.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WorkoutPlan;