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
    <div className="min-h-screen bg-stone-50 text-slate-800">
      <main className="mx-auto max-w-3xl px-6 py-12">

        <header className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tight">
            Daily Reset
          </h1>

          <p className="mt-2 text-slate-500">
            {dayName} · {dateText}
          </p>

          <div className="mt-6">
            <ProgressBar tasks={tasks} />
          </div>
        </header>

        <div className="space-y-12">
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
      </main>
    </div>
  );
}

export default App;