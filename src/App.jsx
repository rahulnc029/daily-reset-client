import { useEffect, useState } from "react";
import api from "./services/api";

import PhaseSection from "./components/PhaseSection";
import ProgressBar from "./components/ProgressBar";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const today = new Date();

  const dayName = today.toLocaleDateString("en-IN", {
    weekday: "long",
  });

  const dateText = today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-8">

        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-800">
            Daily Reset
          </h1>

          <h2 className="mt-2 text-lg font-medium text-slate-600">
            {dayName}
          </h2>

          <p className="text-sm text-slate-500">
            {dateText}
          </p>

          <div className="mt-6">
            <ProgressBar tasks={tasks} />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <PhaseSection
            title="Morning"
            phase="morning"
            tasks={tasks.filter(
              (t) => t.phase === "morning"
            )}
            fetchTasks={fetchTasks}
          />

          <PhaseSection
            title="Afternoon"
            phase="afternoon"
            tasks={tasks.filter(
              (t) => t.phase === "afternoon"
            )}
            fetchTasks={fetchTasks}
          />

          <PhaseSection
            title="Evening"
            phase="evening"
            tasks={tasks.filter(
              (t) => t.phase === "evening"
            )}
            fetchTasks={fetchTasks}
          />
        </div>
      </div>
    </div>
  );
}

export default App;