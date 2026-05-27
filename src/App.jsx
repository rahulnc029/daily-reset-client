import { useEffect, useState } from "react";
import api from "./services/api";

import PhaseSection from "./components/PhaseSection";
import ProgressBar from "./components/ProgressBar";
import Loader from "./components/Loader";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(`Error fetching tasks: ${error}`);
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader />
      </div>
    )
  }

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
          {["morning", "afternoon", "evening"].map((phase) => (
            <PhaseSection
              key={phase}
              title={phase.charAt(0).toUpperCase() + phase.slice(1)}
              phase={phase}
              tasks={tasks.filter((t) => t.phase === phase)}
              fetchTasks={fetchTasks}
            />
          ))
          }
        </div>
      </main>
    </div>
  );
}

export default App;