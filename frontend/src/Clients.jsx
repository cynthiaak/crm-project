import { useState } from "react";
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

function Clients() {
  const navigate = useNavigate();
  const [selectedClient, setSelectedClient] = useState(null);

  const dashboardPage = () => navigate("/rmdashboard");
  const candidatePage = () => navigate("/candidates");
  const tasksPage = () => navigate("/tasks");
  const calendarPage = () => navigate("/calendar");
  const settingsPage = () => navigate("/settings");
  const clientsPage = () => navigate("/clients");
  const handleLogout = () => navigate("/login");

const clients = [
  {
    id: 1,
    name: "VSN",
    managers: ["John Smith", "Maria Lopez"],
    emails: ["john.smith@vsn.com", "maria.lopez@vsn.com"],
    totalEmployees: 3,
    employees: [
      { id: 1, name: "Alice Brown", role: "Software Engineer", department: "IT", salary: "$70,000" },
      { id: 2, name: "David Green", role: "HR Specialist", department: "HR", salary: "$55,000" },
      { id: 3, name: "Karen White", role: "Marketing Analyst", department: "Marketing", salary: "$60,000" },
    ],
  },
  {
    id: 2,
    name: "ABC Corp",
    managers: ["Emily Johnson"],
    emails: ["emily.johnson@abccorp.com"],
    totalEmployees: 2,
    employees: [
      { id: 1, name: "Michael Lee", role: "Data Analyst", department: "IT", salary: "$65,000" },
      { id: 2, name: "Sara Kim", role: "Finance Manager", department: "Finance", salary: "$75,000" },
    ],
  },
  {
    id: 3,
    name: "TechNova",
    managers: ["Robert Brown", "Sophia Wang"],
    emails: ["robert.brown@technova.com", "sophia.wang@technova.com"],
    totalEmployees: 4,
    employees: [
      { id: 1, name: "Tom Harris", role: "DevOps Engineer", department: "IT", salary: "$72,000" },
      { id: 2, name: "Lucy Adams", role: "UX Designer", department: "Design", salary: "$58,000" },
      { id: 3, name: "James Parker", role: "Marketing Specialist", department: "Marketing", salary: "$60,000" },
      { id: 4, name: "Nina Patel", role: "HR Coordinator", department: "HR", salary: "$52,000" },
    ],
  },
  {
    id: 4,
    name: "GlobalTech",
    managers: ["Anna White"],
    emails: ["anna.white@globaltech.com"],
    totalEmployees: 3,
    employees: [
      { id: 1, name: "Liam Scott", role: "Project Manager", department: "IT", salary: "$80,000" },
      { id: 2, name: "Mia Clark", role: "Marketing Manager", department: "Marketing", salary: "$70,000" },
      { id: 3, name: "Ethan Hall", role: "HR Specialist", department: "HR", salary: "$55,000" },
    ],
  },
  {
    id: 5,
    name: "NextGen",
    managers: ["Olivia Turner", "Lucas Evans"],
    emails: ["olivia.turner@nextgen.com", "lucas.evans@nextgen.com"],
    totalEmployees: 5,
    employees: [
      { id: 1, name: "Emma Wilson", role: "Software Engineer", department: "IT", salary: "$68,000" },
      { id: 2, name: "Noah Davis", role: "QA Engineer", department: "IT", salary: "$60,000" },
      { id: 3, name: "Sophia Moore", role: "UI Designer", department: "Design", salary: "$57,000" },
      { id: 4, name: "James Taylor", role: "HR Specialist", department: "HR", salary: "$54,000" },
      { id: 5, name: "Mia Anderson", role: "Marketing Analyst", department: "Marketing", salary: "$62,000" },
    ],
  },
  {
    id: 6,
    name: "Innovatech",
    managers: ["Henry Wilson"],
    emails: ["henry.wilson@innovatech.com"],
    totalEmployees: 2,
    employees: [
      { id: 1, name: "Lily Johnson", role: "Data Scientist", department: "IT", salary: "$72,000" },
      { id: 2, name: "Jack Lee", role: "Marketing Specialist", department: "Marketing", salary: "$60,000" },
    ],
  },
  {
    id: 7,
    name: "Alpha Solutions",
    managers: ["Grace Kim", "Ethan Clark"],
    emails: ["grace.kim@alphasolutions.com", "ethan.clark@alphasolutions.com"],
    totalEmployees: 3,
    employees: [
      { id: 1, name: "Chloe Scott", role: "Software Engineer", department: "IT", salary: "$70,000" },
      { id: 2, name: "Aiden Brown", role: "HR Coordinator", department: "HR", salary: "$55,000" },
      { id: 3, name: "Ella Martinez", role: "Marketing Analyst", department: "Marketing", salary: "$60,000" },
    ],
  },
  {
    id: 8,
    name: "BrightFuture Inc.",
    managers: ["Sophia Lopez"],
    emails: ["sophia.lopez@brightfuture.com"],
    totalEmployees: 4,
    employees: [
      { id: 1, name: "Liam Harris", role: "Project Manager", department: "IT", salary: "$82,000" },
      { id: 2, name: "Emma Lewis", role: "UX Designer", department: "Design", salary: "$58,000" },
      { id: 3, name: "Noah Walker", role: "Marketing Specialist", department: "Marketing", salary: "$61,000" },
      { id: 4, name: "Ava Young", role: "HR Specialist", department: "HR", salary: "$55,000" },
    ],
  },
  {
    id: 9,
    name: "DigitalWave",
    managers: ["Liam Adams"],
    emails: ["liam.adams@digitalwave.com"],
    totalEmployees: 3,
    employees: [
      { id: 1, name: "Olivia Hall", role: "Software Engineer", department: "IT", salary: "$69,000" },
      { id: 2, name: "Lucas Allen", role: "QA Engineer", department: "IT", salary: "$61,000" },
      { id: 3, name: "Mia Parker", role: "Marketing Analyst", department: "Marketing", salary: "$60,000" },
    ],
  },
  {
    id: 10,
    name: "CyberWorks",
    managers: ["Ethan Green", "Sophia Turner"],
    emails: ["ethan.green@cyberworks.com", "sophia.turner@cyberworks.com"],
    totalEmployees: 4,
    employees: [
      { id: 1, name: "Emma White", role: "DevOps Engineer", department: "IT", salary: "$72,000" },
      { id: 2, name: "James Brown", role: "UX Designer", department: "Design", salary: "$58,000" },
      { id: 3, name: "Liam Scott", role: "Marketing Specialist", department: "Marketing", salary: "$60,000" },
      { id: 4, name: "Sophia Lee", role: "HR Coordinator", department: "HR", salary: "$52,000" },
    ],
  },
];


  return (
    <div className="main-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2><img src={profileIcons} alt="Profile" className="nav-icon" /> John Doe</h2>
        <ul>
          <li><button className="nav-button" onClick={dashboardPage}><img src={dashboardIcon} alt="Dashboard" className="nav-icon" /> Dashboard</button></li>
          <li><button className="nav-button" onClick={candidatePage}><img src={candidatesIcon} alt="Candidates" className="nav-icon" /> Candidates</button></li>
          <li><button className="nav-button" onClick={clientsPage}><img src={clientsIcon} alt="Clients" className="nav-icon" /> Clients</button></li>
          <li><button className="nav-button" onClick={tasksPage}><img src={tasksIcon} alt="Tasks" className="nav-icon" /> Tasks</button></li>
          <li><button className="nav-button" onClick={calendarPage}><img src={calendarIcon} alt="Calendar" className="nav-icon" /> Calendar</button></li>
          <li><button className="nav-button" onClick={settingsPage}><img src={settingsIcon} alt="Settings" className="nav-icon" /> Settings</button></li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Main Content */}
      <div className="clients-container">
        <h1>Clients</h1>

        {/* Client list */}
      <div>
      {!selectedClient ? (
        <ul className="clients-grid">
          {clients.map(client => (
            <li 
              key={client.id} 
              style={{ cursor: "pointer", margin: "8px 0" }}
              className="client-item"
              onClick={() => setSelectedClient(client)}
            >
              {client.name}
            </li>
          ))}
        </ul>
      ) : (
        <div className="client-details">
          <button className="back-button" onClick={() => setSelectedClient(null)}> ← Back to clients</button>
          {/* Here you can add more info like employees later */}
        </div>
      )}
    </div>
  

        {/* Selected client details */}
        {selectedClient && (
          <div className="client-details">
            <h2>{selectedClient.name}</h2>
            <p><strong>Hiring Managers:</strong> {selectedClient.managers.join(", ")}</p>
            <p><strong>Emails:</strong> {selectedClient.emails.join(", ")}</p>
            <p><strong>Total Employees:</strong> {selectedClient.totalEmployees}</p>

            <table className="employee-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                {selectedClient.employees.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.role}</td>
                    <td>{emp.department}</td>
                    <td>{emp.salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Clients;
