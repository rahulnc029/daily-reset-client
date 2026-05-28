import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PlanDay from "./pages/PlanDay";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/plan" element={<PlanDay />} />
      </Routes>
    </BrowserRouter>
  )
}