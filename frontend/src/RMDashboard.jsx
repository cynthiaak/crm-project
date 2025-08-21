import React from 'react';
import './RMDashboard.css';

function RMDashboard() {
  return (
    <div className="container">
      <div className="sidebar">
        <ul>
          <li>Dashboard</li>
          <li>Candidates</li>
          <li>Vacancies</li>
          <li>Reports</li>
        </ul>
      </div>

      <div className="main">
        <header className="header">
          <h1>Dashboard</h1>
          <input
            type="text"
            name="query"
            placeholder="Search candidate, vacancy, etc.." />
        </header>
      </div>
    </div>
  );
}

export default RMDashboard;
