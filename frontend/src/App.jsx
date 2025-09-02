import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import RMDashboard from "./RMDashboard.jsx"; 
import Register from "./register.jsx"
import ForgotPassword from "./ForgotPassword.jsx";
import Candidates from "./Candidates.jsx";
import Tasks from "./Tasks.jsx";
import Calendar from "./Calendar.jsx";

import Settings from "./Settings.jsx";
function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/rmdashboard" element={<RMDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/calendar" element={<Calendar />} />
    <Route path="/settings" element={<Settings />} />
      </Routes>

  );
}

export default App;
