import { NavLink } from "react-router-dom";
import './RMDashboard.css';

import dashboardIcon from './Dashboard-icon.svg';
import jobsIcon from './job-icon.svg';
import candidatesIcon from './people-icon.svg';
import tasksIcon from './tasks-icon.svg'; 
import calendarIcon from './calendar-icon.svg'; 
import analyticsIcon from './analytics-icon.svg'; 
import settingsIcon from './settings-icon.svg'; 
import profileIcons from "./profile-icon.svg";


function RMDashboard() {
  return (
    <div className="container">
     
      <div className="sidebar">
        <h2><img src={profileIcons} alt="Profile" className="nav-icon" /> John Doe</h2>
    <ul>
  <li>
    <button className="nav-button">
      <img src={dashboardIcon} alt="Dashboard" className="nav-icon" /> Dashboard
    </button>
  </li>
  <li>
    <button className="nav-button">
      <img src={jobsIcon} alt="Jobs" className="nav-icon" /> Jobs
    </button>
  </li>
  <li>
    <button className="nav-button">
      <img src={candidatesIcon} alt="Candidates" className="nav-icon" /> Candidates
    </button>
  </li>
  <li>
    <button className="nav-button">
      <img src={tasksIcon} alt="Tasks" className="nav-icon" /> Tasks
    </button>
  </li>
  <li>
    <button className="nav-button">
      <img src={calendarIcon} alt="Calendar" className="nav-icon" /> Calendar
    </button>
  </li>
  <li>
    <button className="nav-button">
      <img src={analyticsIcon} alt="Analytics" className="nav-icon" /> Analytics
    </button>
  </li>
  <li>
    <button className="nav-button">
      <img src={settingsIcon} alt="Settings" className="nav-icon" /> Settings
    </button>
  </li>
</ul>

         <button className="logout-btn">Logout </button>
      </div>

    
      <div className="main">
        <header className="header">
          <h1>Dashboard</h1>
          <input type="text" name="query" placeholder="Search candidate, vacancy, etc.." />
        </header>

        <h2 className="greeting">Hello, John! 👋</h2>

       
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
        </div>

        <div className="candidates-box">
          <h2>Candidates</h2>

          <div className="candidates-list">
            <span className="candidate-name">John Smith</span>
            <span className="candidate-role">Frontend Developer</span>
            <span className="candidate-date">25-6-2025</span>
            <span className="editor">Joe</span>
            <span className="status">Shortlisted</span>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>

  );
}

export default RMDashboard;

