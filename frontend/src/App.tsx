
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import DashboardStudent from "./pages/DashboardStudent";
import DashboardAdvisor from "./pages/DashboardAdvisor";
import DashboardFaculty from "./pages/DashboardFaculty";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/student" element={<DashboardStudent />} />
        <Route path="/dashboard/advisor" element={<DashboardAdvisor />} />
        <Route path="/dashboard/faculty" element={<DashboardFaculty />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

