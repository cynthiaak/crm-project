import { useState, useEffect } from 'react';
import './Settings.css'
import { useNavigate } from "react-router-dom";
import dashboardIcon from './Dashboard-icon.svg';
import jobsIcon from './job-icon.svg';
import candidatesIcon from './people-icon.svg';
import tasksIcon from './tasks-icon.svg'; 
import calendarIcon from './calendar-icon.svg'; 
import settingsIcon from './settings-icon.svg'; 
import profileIcons from "./profile-icon.svg";
function Settings(){
    const [sidebarCollapsed, setSidebarCollapsed] = useState(
      () => localStorage.getItem("sidebarCollapsed") === "1"
    );
    useEffect(() => {
      localStorage.setItem("sidebarCollapsed", sidebarCollapsed ? "1" : "0");
    }, [sidebarCollapsed]);

  const navigate= useNavigate();
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
    navigate("/rmdashboard")
  }
  const handleLogout = () => {
     navigate("/login")
  }
    return(
          <div className={`container ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      {/* Toggle button */}
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarCollapsed(v => !v)}
        title={sidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
        aria-label="Toggle sidebar"
      >
        {sidebarCollapsed ? "☰" : "☰"}
      </button>
             
              <div className="sidebar">
                <h2><img src={profileIcons} alt="Profile" className="nav-icon" /> John Doe</h2>
            <ul>
          <li>
            <button className="nav-button" onClick={dashboardPage}>
              <img src={dashboardIcon} alt="Dashboard" className="nav-icon" /> Dashboard
            </button>
          </li>
          <li>
            <button className="nav-button" onClick={candidatePage}>
              <img src={candidatesIcon} alt="Candidates" className="nav-icon" /> Candidates
            </button>
          </li>
          <li>
            <button className="nav-button" onClick={tasksPage}>
              <img src={tasksIcon} alt="Tasks" className="nav-icon" /> Tasks
            </button>
          </li>
          <li>
            <button className="nav-button" onClick={calendarPage}>
              <img src={calendarIcon} alt="Calendar" className="nav-icon" /> Calendar
            </button>
          </li>
       
          <li>
            <button className="nav-button" onClick ={settingsPage}>
              <img src={settingsIcon} alt="Settings" className="nav-icon" /> Settings
            </button>
          </li>
        </ul>
        
                 <button className="logout-btn" onClick={handleLogout}>Logout </button>
              </div>
             <div className="main-settings-content">
         <h1 className="settings-title">Settings</h1>


  <div className="settings-section">
    <h2>Profile</h2>
    <div className="settings-item">
      <label>Name</label>
      <input type="text" placeholder="John Doe" className="settings-input" />
    </div>
    <div className="settings-item">
      <label>Email</label>
      <input type="email" placeholder="johndoe@email.com" className="settings-input" />
    </div>
    <button className="save-btn">Save Changes</button>
  </div>


  <div className="settings-section">
    <h2>Preferences</h2>
    <div className="settings-item">
      <label>Theme</label>
      <select className="settings-input">
        <option>Light</option>
        <option>Dark</option>
        <option>System</option>
      </select>
    </div>
    <div className="settings-item">
      <label>Language</label>
      <select className="settings-input">
        <option>English</option>
        <option>French</option>
        <option>Arabic</option>
      </select>
    </div>
  </div>

  <div className="settings-section">
    <h2>Security</h2>
    <div className="settings-item">
      <label>Change Password</label>
       <p className="settings-note">
    To change your password, click the button below. A link will be sent to your email.
  </p>
    </div>
    <button className="save-btn">Change Password</button>
  </div>
</div>
        </div>
     

    
    )
}

export default Settings;