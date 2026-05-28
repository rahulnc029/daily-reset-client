import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PlanDay from "./pages/PlanDay";
import Workout from "./pages/Workout";
import WorkoutPlan from "./pages/WorkoutPlan";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/plan" element={<PlanDay />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/workout/plan" element={<WorkoutPlan />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;