import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import dashboardIcon from './Dashboard-icon.svg';
import jobsIcon from './job-icon.svg';
import candidatesIcon from './people-icon.svg';
import tasksIcon from './tasks-icon.svg'; 
import calendarIcon from './calendar-icon.svg'; 
 
import settingsIcon from './settings-icon.svg'; 
import profileIcons from "./profile-icon.svg";
import './Candidates.css';
function Candidates(){
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
  const [sortKey, setSortKey] = useState('name');
  const handleSortChange = (e) => {
    setSortKey(e.target.value);
  }
  const candidates = [
 { name: "Nour Khoury", email: "nourkhoury@gmail.com", role: "Frontend Developer", date: "12-8-2025", editor: "Sandra", status: "Shortlisted" },
  { name: "John Smith", email: "johnsmith@gmail.com", role: "Frontend Developer", date: "25-6-2025", editor: "Elie", status: "Shortlisted" },
  { name: "John Smith", email: "johnsmith@gmail.com", role: "Frontend Developer", date: "25-6-2025", editor: "Mohamad", status: "Shortlisted" },
   { name: "Mohamed Ali", email: "mohamed.ali@gmail.com", role: "Backend Developer", date: "15-7-2025", editor: "Lara", status: "Pending" },
  { name: "Aya Hassan", email: "tala.hassan@gmail.com", role: "UI/UX Designer", date: "20-5-2025", editor: "Cynthia", status: "Reviewed" },
  { name: "Samir Khoury", email: "samir.k@gmail.com", role: "Data Analyst", date: "10-8-2025", editor: "Joe", status: "Shortlisted" },
  { name: "Maya Nasser", email: "maya.nasser@gmail.com", role: "Frontend Developer", date: "1-6-2025", editor: "Sandra", status: "Rejected" },
  { name: "Rami Saad", email: "rami.saad@gmail.com", role: "Backend Developer", date: "5-7-2025", editor: "Elie", status: "Pending" },
  { name: "Lina Farah", email: "lina.farah@gmail.com", role: "Project Manager", date: "18-4-2024", editor: "Mohamad", status: "Reviewed" },
  { name: "Ziad Jabbour", email: "ziad.j@gmail.com", role: "DevOps Engineer", date: "23-3-2025", editor: "Lara", status: "Shortlisted" },
  { name: "Rania Moukaddem", email: "rania.m@gmail.com", role: "QA Engineer", date: "12-2-2025", editor: "Joe", status: "Rejected" },
  { name: "Omar Fadel", email: "omar.fadel@gmail.com", role: "Fullstack Developer", date: "30-1-2025", editor: "Cynthia", status: "Pending" },
  { name: "Samar Kanaan", email: "samar.kanaan@gmail.com", role: "Frontend Developer", date: "17-6-2025", editor: "Sandra", status: "Shortlisted" },
  { name: "Samir Khoury", email: "samir.k@gmail.com", role: "Data Analyst", date: "10-8-2025", editor: "Joe", status: "Shortlisted" },
  { name: "Maya Nasser", email: "maya.nasser@gmail.com", role: "Frontend Developer", date: "1-6-2025", editor: "Sandra", status: "Rejected" },
];
  const sortedCandidates = [...candidates].sort((a, b) => {
  if (sortKey === "date") {

    const dateA = new Date(a.date.split('-').reverse().join('-'));
    const dateB = new Date(b.date.split('-').reverse().join('-'));
    return dateA - dateB;
  } else {
    return a[sortKey].localeCompare(b[sortKey]);
  }
});

    return(
         <div className="candidates-container">
             
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
              <div className="main-candidates">
                <div className="candidates-top-section">
                  <h1>Candidates</h1>
                  <div className="main-sort-section">
                   <h6>Sort by</h6>
                <div className="main-sort-dropdown-section">
                  <select className="main-sort-dropdown"  value={sortKey}
      onChange={handleSortChange}>
                    <option value="name">Name</option>
                    <option value="role">Role</option>
                    <option value="date">Date</option>
                    <option value="status">Status</option>
                  </select>
                </div>
                </div>
              </div>
             <div className="candidates-header-row">
    <span className="header-name">Name</span>
    <span className="header-role">Role</span>
    <span className="header-date">Date</span>
    <span className="header-editor">Editor</span>
    <span className="header-status">Status</span>
  </div>

  <div className="main-candidates-box">
   
{sortedCandidates.map((c, index) => (
  <div key={index} className="main-candidates-list">
    <div className="candidate-info">
      <span className="candidate-name">{c.name}</span>
      <span className="email">{c.email}</span>
    </div>
    <span className="candidate-role">{c.role}</span>
    <span className="candidate-date">{c.date}</span>
    <span className="editor">{c.editor}</span>
    <span className="status">
        <span className={`status-dot ${c.status.toLowerCase()}`}></span>
      {c.status}
      </span>
  </div>
))}
  </div>
</div>
</div>
            
          
    )
}

export default Candidates;