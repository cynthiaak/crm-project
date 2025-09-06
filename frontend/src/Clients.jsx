import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import dashboardIcon from './Dashboard-icon.svg';
import jobsIcon from './job-icon.svg';
import candidatesIcon from './people-icon.svg';
import tasksIcon from './tasks-icon.svg';
import calendarIcon from './calendar-icon.svg';
import clientsIcon from "./clients.svg";
import settingsIcon from './settings-icon.svg';
import profileIcons from "./profile-icon.svg";
import './Clients.css';
function Clients(){
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
    navigate("/rmdashboard")
  }
  const handleLogout = () => {
    navigate("/login")
  }
  const clientsPage = () => {
    navigate("/clients");
  }
    return (
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
                              <button className="nav-button" onClick={clientsPage}>
                                <img src={clientsIcon} alt="Clients" className="nav-icon" />{" "}
                                Clients
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
                    <button className="nav-button" onClick={settingsPage}>
                      <img src={settingsIcon} alt="Settings" className="nav-icon" /> Settings
                    </button>
                  </li>
                </ul>
                <button className="logout-btn" onClick={handleLogout}>Logout </button>
              </div>
   
)
}
export default Clients;