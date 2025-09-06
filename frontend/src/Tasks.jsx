// src/pages/Tasks.jsx (read-only; linked with Calendar via localStorage)
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Tasks.css"; 

import tasksIcon from "./tasks-icon.svg";
import calendarIcon from "./calendar-icon.svg";
import dashboardIcon from "./Dashboard-icon.svg";
import settingsIcon from "./settings-icon.svg";
import profileIcons from "./profile-icon.svg";3
import candidatesIcon from "./people-icon.svg";
import clientsIcon from "./clients.svg";
const STORAGE_KEY = 'crm_calendar_events_v1';

function todayYMD() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function isBefore(a, b) {
  // compare YYYY-MM-DD strings
  return a < b;
}
export default function Tasks(){

   const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => localStorage.getItem("sidebarCollapsed") === "1"
  );
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", sidebarCollapsed ? "1" : "0");
  }, [sidebarCollapsed]);

  const navigate = useNavigate();
  const go = (p)=>()=>navigate(p);
  const clientsPage = () => {
    navigate("/clients")
  }
  const [events, setEvents] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch { return []; }
  });
  useEffect(()=>{ localStorage.setItem(STORAGE_KEY, JSON.stringify(events)); }, [events]);

  // mirror localStorage changes if calendar page edits elsewhere
  useEffect(()=>{
    const onStorage = (e)=>{ if(e.key===STORAGE_KEY){ try{ setEvents(JSON.parse(e.newValue||"[]")); } catch{} } };
    window.addEventListener("storage", onStorage);
    return ()=>window.removeEventListener("storage", onStorage);
  }, []);

  const today = todayYMD();
  // Only show items that have at least a title/date; treat all events as tasks
  const tasks = useMemo(() => events.map(e => ({...e})), [events]);

  // group by date
  const groups = useMemo(()=>{
    const map = new Map();
    for (const t of tasks){
      const key = t.date || "No due date";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(t);
    }
    // sort groups by date
    const arr = Array.from(map.entries()).sort((a,b)=>{
      const A = a[0] === "No due date" ? "9999-12-31" : a[0];
      const B = b[0] === "No due date" ? "9999-12-31" : b[0];
      return A.localeCompare(B);
    });
    // sort items inside each group 
    for (const [, list] of arr){
      list.sort((a,b)=>(a.startTime||"").localeCompare(b.startTime||"") || a.title.localeCompare(b.title));
    }
    return arr;
  }, [tasks]);

  function toggleDone(id){
    setEvents(prev => prev.map(t => t.id === id ? { ...t, status: t.status === "done" ? "open" : "done" } : t));
  }

  return (
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
          <li><button className="nav-button" onClick={go("/rmdashboard")}><img src={dashboardIcon} className="nav-icon" /> Dashboard</button></li>
          <li><button className="nav-button" onClick={go("/candidates")}><img src={candidatesIcon} className="nav-icon" /> Candidates</button></li>
             <li>
                      <button className="nav-button" onClick={clientsPage}>
                        <img src={clientsIcon} alt="Clients" className="nav-icon" />{" "}
                        Clients
                      </button>
                    </li>
          <li><button className="nav-button" onClick={go("/tasks")}><img src={tasksIcon} className="nav-icon" /> Tasks</button></li>
          <li><button className="nav-button" onClick={go("/calendar")}><img src={calendarIcon} className="nav-icon" /> Calendar</button></li>
          <li><button className="nav-button" onClick={go("/settings")}><img src={settingsIcon} className="nav-icon" /> Settings</button></li>
        </ul>
        <button className="logout-btn" onClick={go("/login")}>Logout</button>
      </div>

      <div className="main">
        <header className="header">
          <h1>Tasks</h1>
        </header>

        <div className="task-groups">
          {groups.map(([date, items])=>{
            const label = date === "No due date"
              ? "No due date"
              : new Date(date+"T00:00:00").toLocaleDateString(undefined, { weekday:"short", year:"numeric", month:"short", day:"numeric" });
            const badge = date==="No due date" ? null
              : date===today ? "Today"
              : isBefore(date, today) ? "Overdue" : "Upcoming";

            return (
              <div className="card" key={date} style={{ marginBottom: 12 }}>
                <div className="group-header">
                  <h3>{label}</h3>
                  {badge && <span className={`badge ${badge.toLowerCase()}`}>{badge}</span>}
                </div>

                <ul className="task-list">
                  {items.map(t => (
                    <li key={t.id} className={`task-row ${t.status==="done" ? "is-done":""}`}>
                      <label className="chk">
                        <input type="checkbox" checked={t.status==="done"} onChange={()=>toggleDone(t.id)} />
                        <span />
                      </label>
                      <div className="task-main">
                        <div className="task-title">{t.title}</div>
                        {t.notes && <div className="task-notes">{t.notes}</div>}
                      </div>
                      <div className="task-date">
                        {t.startTime ? t.startTime : "--:--"}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
