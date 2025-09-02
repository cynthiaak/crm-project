import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import dashboardIcon from "./Dashboard-icon.svg";
import jobsIcon from "./job-icon.svg";
import candidatesIcon from "./people-icon.svg";
import tasksIcon from "./tasks-icon.svg";
import calendarIcon from "./calendar-icon.svg";
import settingsIcon from "./settings-icon.svg";
import profileIcons from "./profile-icon.svg";
import profilePic from "./profilePic.svg";
import emailIcon from "./email.svg";
import employmentIcon from "./job.svg";
import locationIcon from "./location.svg";
import "./Applicant.css";
function Applicant() {
  const navigate = useNavigate();
  const location = useLocation();
  const candidate = location.state?.candidate;
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
  const goBack = () => navigate("/candidates");

  if (!candidate) {
    return <div className="main-applicant">No candidate selected.</div>;
  }

  return (
    <div className="candidates-container">
      <div className="main-applicant">
        <button className="back-btn" onClick={goBack}>
          ← Back to Candidates
        </button>
        <h1>Applicant Details</h1>
        <img src={candidate.photo || profilePic} alt={`${candidate.name} photo`} className="candidate-photo" />
        <h2 className="applicant-name">{candidate.name}</h2>
        <div className="applicant-role">
          <span>{candidate.role}</span>
        </div>
        <div className="applicant-info-card">
          <div className="info-item">
            <img src={emailIcon} alt="Email" className="info-icon" />
            <span>{candidate.email}</span>
          </div>
            <div className="info-item">
        <img src={employmentIcon} alt="Type" className="info-icon" />
        <span>{candidate.employmentType || "Full-time"}</span>
      </div>
         <div className="info-item">
        <img src={profileIcons} alt="Location" className="info-icon" />
        <span>{candidate.location || "Beirut, Lebanon"}</span>
      </div>
        </div>
      </div>
    </div>
  );
}

export default Applicant;
