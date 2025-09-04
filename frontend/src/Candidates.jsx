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
  const stages = [
  { key: "fresh", label: "Fresh Lead" },
  { key: "contacted", label: "Contacted" },
  { key: "followup", label: "Follow-up Funnel" },
  { key: "reconnect", label: "Reconnect" }
];

const [selectedStage, setSelectedStage] = useState("all"); 
 const handleApplicant=()=>{
  navigate("/applicant")
 }
  const candidates = [
 { name: "Nour Khoury", email: "nourkhoury@gmail.com", role: "Frontend Developer", date: "12-8-2025", editor: "Sandra", status: "Fresh lead" },
  { name: "John Smith", email: "johnsmith@gmail.com", role: "Frontend Developer", date: "25-6-2025", editor: "Elie", status: "Contacted" },
  { name: "John Smith", email: "johnsmith@gmail.com", role: "Frontend Developer", date: "25-6-2025", editor: "Mohamad", status: "Follow-up Funnel" },
   { name: "Mohamed Ali", email: "mohamed.ali@gmail.com", role: "Backend Developer", date: "15-7-2025", editor: "Lara", status: "Reconnect" },
  { name: "Aya Hassan", email: "tala.hassan@gmail.com", role: "UI/UX Designer", date: "20-5-2025", editor: "Cynthia", status: "Fresh Lead" },
  { name: "Samir Khoury", email: "samir.k@gmail.com", role: "Data Analyst", date: "10-8-2025", editor: "Joe", status: "Reconnect" },
  { name: "Maya Nasser", email: "maya.nasser@gmail.com", role: "Frontend Developer", date: "1-6-2025", editor: "Sandra", status: "Follow-up Funnel" },
  { name: "Rami Saad", email: "rami.saad@gmail.com", role: "Backend Developer", date: "5-7-2025", editor: "Elie", status: "Contacted" },
  { name: "Lina Farah", email: "lina.farah@gmail.com", role: "Project Manager", date: "18-4-2024", editor: "Mohamad", status: "Contacted" },
  { name: "Ziad Jabbour", email: "ziad.j@gmail.com", role: "DevOps Engineer", date: "23-3-2025", editor: "Lara", status: "Fresh Lead" },
  { name: "Rania Moukaddem", email: "rania.m@gmail.com", role: "QA Engineer", date: "12-2-2025", editor: "Joe", status: "Contacted" },
  { name: "Omar Fadel", email: "omar.fadel@gmail.com", role: "Fullstack Developer", date: "30-1-2025", editor: "Cynthia", status: "Reconnect" },
  { name: "Samar Kanaan", email: "samar.kanaan@gmail.com", role: "Frontend Developer", date: "17-6-2025", editor: "Sandra", status: "Reconnect" },
  { name: "Samir Khoury", email: "samir.k@gmail.com", role: "Data Analyst", date: "10-8-2025", editor: "Joe", status: "Fresh Lead" },
  { name: "Maya Nasser", email: "maya.nasser@gmail.com", role: "Frontend Developer", date: "1-6-2025", editor: "Sandra", status: "Follow-Up Funnel" },
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
const filteredCandidates = sortedCandidates.filter(c => {
  if (selectedStage === "all") return true;

  if (selectedStage === "fresh") return c.status === "Fresh Lead";
  if (selectedStage === "contacted") return c.status === "Contacted";
  if (selectedStage === "followup") return c.status === "Follow-up Funnel";
  if (selectedStage === "reconnect") return c.status === "Reconnect";

  return true;
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
                
               
              </div>
               <div className="stage-filters">
               {stages.map((stage) => (
                
              <button
             key={stage.key}
             className={`stage-button ${selectedStage === stage.key ? "active" : ""}`}
              onClick={() => setSelectedStage(stage.key)}
               >
               {stage.label}
               </button>
              ))}
             <button
             className={`stage-button ${selectedStage === "all" ? "active" : ""}`}
             onClick={() => setSelectedStage("all")}
             >
             All
            </button>
             </div>
             <div className="candidates-header-row">
    <span className="header-name">Name</span>
    <span className="header-role">Role</span>
    <span className="header-date">Date</span>
    <span className="header-editor">Editor</span>
    <span className="header-status">Status</span>
  </div>

  <div className="main-candidates-box">
   
{filteredCandidates.map((c, index) => (
  <div
    key={index}
    className="main-candidates-list"
    onClick={() =>
      navigate("/applicant", { state: { candidate: { ...c, phone: "123456", cv: "/path/to/cv.pdf" } } })
    }
    style={{ cursor: "pointer" }}
  >
    <div className="candidate-info">
      <span className="candidate-name">{c.name}</span>
      <span className="email">{c.email}</span>
    </div>
    <span className="candidate-role">{c.role}</span>
    <span className="candidate-date">{c.date}</span>
    <span className="editor">{c.editor}</span>
    <span className="status">
     
  <span className={`status-dot ${
    c.status.toLowerCase().replace(/\s/g,'') 
  }`}></span>
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