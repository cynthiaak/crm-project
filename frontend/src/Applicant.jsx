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

  const goBack = () => navigate("/candidates");

  const [allHistories, setAllHistories] = useState({
    [candidate.id]: candidate.history || [],});

  const [showNewEntry, setShowNewEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    status: "",
    date: "",
    interviewer: "",
    notes: "",
    cv: null,
  });

  const toggleNewEntry = () => setShowNewEntry(!showNewEntry);

  const handleChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const addEntry = () => {
    setAllHistories((prev) => ({
      ...prev,
      [candidate.id]: [...(prev[candidate.id] || []), newEntry],
    }));
    setNewEntry({ status: "", date: "", interviewer: "", notes: "", cv: null });
    setShowNewEntry(false);
  };

  if (!candidate) {
    return <div className="main-applicant">No candidate selected.</div>;
  }

  const history = allHistories[candidate.id] || [];

  return (
    <div className="candidates-container">
      <div className="main-applicant">
        <button className="back-btn" onClick={goBack}>
          ← Back to Candidates
        </button>

        <h1>Applicant Details</h1>
        <img
          src={candidate.photo || profilePic}
          alt={`${candidate.name} photo`}
          className="candidate-photo"
        />
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

      
        <div className="applicant-history">
          <h2>Applicant's History</h2>
          <button className="add-btn" onClick={toggleNewEntry}>
            + Add Entry
          </button>

       
          {showNewEntry && (
            <div className="new-entry">
              <input
                type="text"
                placeholder="Status (e.g., Interviewed)"
                name="status"
                value={newEntry.status}
                onChange={handleChange}
              />
              <input
                type="date"
                name="date"
                value={newEntry.date}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Interviewer"
                name="interviewer"
                value={newEntry.interviewer}
                onChange={handleChange}
              />
              <textarea
                placeholder="Notes / Feedback"
                name="notes"
                value={newEntry.notes}
                onChange={handleChange}
              />
              <button onClick={addEntry}>Add Entry</button>
            </div>
          )}

          {/* Timeline */}
          <div className="timeline">
            {history.map((event, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <strong>{event.status}</strong> - {event.date}
                  {event.interviewer && <div>Interviewer: {event.interviewer}</div>}
                  {event.notes && <div>Notes: {event.notes}</div>}
                  {event.cv && (
                    <a href={event.cv} target="_blank" rel="noopener noreferrer">
                      View CV
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

       
      </div>
        <div className="cv-box">
          <h3>Download CV</h3>
        </div>
    </div>
  );
}

export default Applicant;
