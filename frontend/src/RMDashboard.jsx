import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./RMDashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Legend,
  Bar,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";

import dashboardIcon from "./Dashboard-icon.svg";
import jobsIcon from "./job-icon.svg";
import candidatesIcon from "./people-icon.svg";
import tasksIcon from "./tasks-icon.svg";
import calendarIcon from "./calendar-icon.svg";
import analyticsIcon from "./analytics-icon.svg";
import settingsIcon from "./settings-icon.svg";
import profileIcons from "./profile-icon.svg";

function RMDashboard() {
  const navigate = useNavigate();
  const candidatePage = () => {
    navigate("/candidates");
  };
  const tasksPage = () => {
    navigate("/tasks");
  };
  const calendarPage = () => {
    navigate("/calendar");
  };
  const analyticsPage = () => {
    navigate("/analytics");
  };
  const settingsPage = () => {
    navigate("/settings");
  };
  const dashboardPage = () => {
    navigate("/rmdashboard");
  };
  const handleLogout = () => {
    navigate("/login");
  };
  const data = [
    { date: "15 Aug", applied: 200, shortlisted: 60 },
    { date: "16 Aug", applied: 220, shortlisted: 80 },
    { date: "17 Aug", applied: 170, shortlisted: 40 },
    { date: "18 Aug", applied: 230, shortlisted: 110 },
    { date: "19 Aug", applied: 140, shortlisted: 40 },
    { date: "20 Aug", applied: 150, shortlisted: 50 },
  ];
  const sourceData = [
    { name: "Referrals", value: 120 },
    { name: "Job Board", value: 120 },
    { name: "Inbound", value: 120 },
    { name: "LinkedIn", value: 120 },
    { name: "Recruitment Agencies", value: 120 },
    { name: "Career Fairs", value: 120 },
  ];
const COLORS = [
  "rgba(251, 202, 185, 1)",  // #FBCAB9
  "rgba(156, 229, 222, 1)",  // #9CE5DE
  "rgba(156, 229, 222, 0.8)",  // #9CE5DE
  "rgba(156, 229, 222, 0.6)",  // #9CE5DE
  "rgba(251, 202, 185, 0.5)",  // #FBCAB9
  "rgba(251, 202, 185, 0.7)"   // #FBCAB9
];
const total = sourceData.reduce((acc, item) => acc + item.value, 0);

  return (
    
    <div className="container">
      
      <div className="sidebar">
        <h2>
          <img src={profileIcons} alt="Profile" className="nav-icon" /> John Doe
        </h2>
        <ul>
          <li>
            <button className="nav-button" onClick={dashboardPage}>
              <img src={dashboardIcon} alt="Dashboard" className="nav-icon" />{" "}
              Dashboard
            </button>
          </li>
          <li>
            <button className="nav-button" onClick={candidatePage}>
              <img src={candidatesIcon} alt="Candidates" className="nav-icon" />{" "}
              Candidates
            </button>
          </li>
          <li>
            <button className="nav-button" onClick={tasksPage}>
              <img src={tasksIcon} alt="Tasks" className="nav-icon" /> Tasks
            </button>
          </li>
          <li>
            <button className="nav-button" onClick={calendarPage}>
              <img src={calendarIcon} alt="Calendar" className="nav-icon" />{" "}
              Calendar
            </button>
          </li>
          <li>
            <button className="nav-button" onClick={analyticsPage}>
              <img src={analyticsIcon} alt="Analytics" className="nav-icon" />{" "}
              Analytics
            </button>
          </li>
          <li>
            <button className="nav-button" onClick={settingsPage}>
              <img src={settingsIcon} alt="Settings" className="nav-icon" />{" "}
              Settings
            </button>
          </li>
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          Logout{" "}
        </button>
      </div>
         
      <div className="main">
           <header className="header">
          <h1>Dashboard</h1>
          <input
            type="text"
            name="query"
            placeholder="Search candidate, vacancy, etc.."
          />
        </header>
       <h2 className="greeting">Hello, John! 👋</h2>
       <div className="stats-and-tasks">
        <div className="stats-container">
          <div className="stat-box">
            <h3>Applications</h3>
            <div className="stat-row">
              <p className="stat-number">524</p>
              <span className="stat-label success">+12% from last week</span>
            </div>
          </div>

          <div className="stat-box">
            <h3>Shortlisted</h3>
            <div className="stat-row">
              <p className="stat-number">325</p>
              <span className="stat-label warning">+5% from last week</span>
            </div>
          </div>

          <div className="stat-box">
            <h3>Hired</h3>
            <div className="stat-row">
              <p className="stat-number">132</p>
              <span className="stat-label success">Stable</span>
            </div>
          </div>

          <div className="stat-box">
            <h3>Rejected</h3>
            <div className="stat-row">
              <p className="stat-number">67</p>
              <span className="stat-label danger">-3% from last week</span>
            </div>
          </div>
             <div className="tasks-box">
      <h2>Tasks</h2>
    </div>
        </div>
        </div>
        <div className="dashboard-content">
          <div className="candidates-box">
            <div className="candidates-header">
              <h2>Candidates</h2>
              <div className="sort-section">
                <h6>Sort by</h6>
                <div className="sort-dropdown-section">
                  <select className="sort-dropdown">
                    <option value="name">Name</option>
                    <option value="role">Role</option>
                    <option value="date">Date</option>
                    <option value="status">Status</option>
                  </select>
                </div>
              </div>
            </div>
     
            <div className="candidates-list">
              <div className="candidate-info">
                <span className="candidate-name">Nour Khoury</span>
                <span className="email">nourkhoury@gmail.com</span>
              </div>

              <span className="candidate-role">Frontend Developer</span>
              <span className="candidate-date">12-8-2025</span>
              <span className="editor">Sandra</span>
              <span className="status">Shortlisted</span>
            </div>
            <div className="candidates-list">
              <div className="candidate-info">
                <span className="candidate-name">John Smith</span>
                <span className="email">johnsmith@gmail.com</span>
              </div>

              <span className="candidate-role">Frontend Developer</span>
              <span className="candidate-date">25-6-2025</span>
              <span className="editor">Elie</span>
              <span className="status">Shortlisted</span>
            </div>
            <div className="candidates-list">
              <div className="candidate-info">
                <span className="candidate-name">John Smith</span>
                <span className="email">johnsmith@gmail.com</span>
              </div>

              <span className="candidate-role">Frontend Developer</span>
              <span className="candidate-date">25-6-2025</span>
              <span className="editor">Mohamad</span>
              <span className="status">Shortlisted</span>
            </div>
            <div className="candidates-list">
              <div className="candidate-info">
                <span className="candidate-name">John Smith</span>
                <span className="email">johnsmith@gmail.com</span>
              </div>

              <span className="candidate-role">Frontend Developer</span>
              <span className="candidate-date">25-6-2025</span>
              <span className="editor">Lara</span>
              <span className="status">Shortlisted</span>
            </div>
            <div className="candidates-list">
              <div className="candidate-info">
                <span className="candidate-name">John Smith</span>
                <span className="email">johnsmith@gmail.com</span>
              </div>

              <span className="candidate-role">Frontend Developer</span>
              <span className="candidate-date">25-6-2025</span>
              <span className="editor">Joe</span>
              <span className="status">Shortlisted</span>
            </div>
            <div className="candidates-list">
              <div className="candidate-info">
                <span className="candidate-name">John Smith</span>
                <span className="email">johnsmith@gmail.com</span>
              </div>

              <span className="candidate-role">Frontend Developer</span>
              <span className="candidate-date">25-6-2025</span>
              <span className="editor">Cynthia</span>
              <span className="status">Shortlisted</span>
            </div>
            <div className="candidates-list">
              <div className="candidate-info">
                <span className="candidate-name">John Smith</span>
                <span className="email">johnsmith@gmail.com</span>
              </div>

              <span className="candidate-role">Frontend Developer</span>
              <span className="candidate-date">25-6-2025</span>
              <span className="editor">Tala</span>
              <span className="status">Shortlisted</span>
            </div>
          </div>
          <div className="dashboard-content-bottom">
          <div className="application-bar-box" style={{ height: 320 }}>
            <h2>Applications</h2>
            <ResponsiveContainer width="97%" height={250}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="applied"
                  stackId="a"
                  fill="#f9c4b3"
                  name="Applied"
                />
                <Bar
                  dataKey="shortlisted"
                  stackId="a"
                  fill="#93e1d8"
                  name="Shortlisted"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="source-effectiveness-box">
            <h1>Source effectiveness</h1>
              <PieChart width={400} height={250}>
        <Pie
          data={sourceData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          fill="#8884d8"
          paddingAngle={2}
        >
          {sourceData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="middle" layout="vertical" align="right" />
      </PieChart>
      <div className="total-center">
        <h3>{total}</h3>
        <span className="total-applications">Total Applications</span>
      </div>
          </div>
          </div>
        
        </div>
       
      </div>
      
      <div></div>
    </div>
  );
}

export default RMDashboard;
