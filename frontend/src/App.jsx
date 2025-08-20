import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import RMDashboard from "./RMDashboard.jsx"; 
import ForgotPassword from "./ForgotPassword.jsx";
function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/rmdashboard" element={<RMDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>

  );
}

export default App;
