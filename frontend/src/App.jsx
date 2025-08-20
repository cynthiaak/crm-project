import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import RMDashboard from "./RMDashboard.jsx"; 

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/rmdashboard" element={<RMDashboard />} />
      </Routes>

  );
}

export default App;
