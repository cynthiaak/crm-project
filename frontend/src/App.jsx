import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import RMDashboard from "./RMDashboard.jsx"; 
import Register from "./register.jsx"

import ForgotPassword from "./ForgotPassword.jsx";
import Register from "./register.jsx";
function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/rmdashboard" element={<RMDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>

  );
}

export default App;
