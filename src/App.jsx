import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PlanDay from "./pages/PlanDay";
import Workout from "./pages/Workout";
import WorkoutPlan from "./pages/WorkoutPlan";
import WorkoutCalendar from "./pages/WorkoutCalendar";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/plan" element={<PlanDay />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/workout/plan" element={<WorkoutPlan />} />
        <Route path="/workout/calendar" element={<WorkoutCalendar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;