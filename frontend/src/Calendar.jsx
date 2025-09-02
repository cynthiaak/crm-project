import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Calendar.css";

import dashboardIcon from "./Dashboard-icon.svg";
import candidatesIcon from "./people-icon.svg";
import tasksIcon from "./tasks-icon.svg";
import calendarIcon from "./calendar-icon.svg";
import analyticsIcon from "./analytics-icon.svg";
import settingsIcon from "./settings-icon.svg";
import profileIcons from "./profile-icon.svg";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
const STORAGE_KEY = "crm_calendar_events_v1"; // localStorage fallback

function startOfMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function endOfMonth(d)   { return new Date(d.getFullYear(), d.getMonth() + 1, 0); }
function pad(n){ return n < 10 ? `0${n}` : `${n}`; }
function ymd(d){ return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }

function addMonths(d, n){
  const x = new Date(d); x.setMonth(x.getMonth() + n); x.setDate(1); return x;
}
function buildGrid(current){
  // Sun..Sat calendar, 6 weeks (42 cells)
  const first   = startOfMonth(current);
  const last    = endOfMonth(current);
  const start   = new Date(first);
  start.setDate(first.getDate() - first.getDay()); // back to Sunday

  const days = [];
  for (let i = 0; i < 42; i++){
    const dt = new Date(start); dt.setDate(start.getDate() + i);
    days.push(dt);
  }
  return { days, first, last };
}

function useLocalEvents(){
  const [events, setEvents] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch { return []; }
  });
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);
  return [events, setEvents];
}

export default function Calendar(){
  const navigate = useNavigate();

  // ----- sidebar nav -----
  const candidatePage = () => navigate("/candidates");
  const tasksPage     = () => navigate("/tasks");
  const calendarPage  = () => navigate("/calendar");
  const analyticsPage = () => navigate("/analytics");
  const settingsPage  = () => navigate("/settings");
  const dashboardPage = () => navigate("/rmdashboard");
  const handleLogout  = () => navigate("/login");

  // ----- calendar state -----
  const [cursor, setCursor] = useState(() => new Date()); // month being viewed
  const [events, setEvents] = useLocalEvents(); // {id, title, date, startTime, endTime, location, notes}
  const [modal, setModal] = useState(null);     // {mode: 'new'|'edit', data: {..}}
  const grid = useMemo(() => buildGrid(cursor), [cursor]);

  // map date -> events[]
  const byDate = useMemo(() => {
    const m = new Map();
    for (const ev of events){
      if (!m.has(ev.date)) m.set(ev.date, []);
      m.get(ev.date).push(ev);
    }
    // sort per day by startTime then title
    for (const [k, arr] of m){
      arr.sort((a,b) => (a.startTime||"") < (b.startTime||"") ? -1 : (a.startTime||"") > (b.startTime||"") ? 1 : a.title.localeCompare(b.title));
      m.set(k, arr);
    }
    return m;
  }, [events]);

  function openNew(dateStr){
    setModal({
      mode: "new",
      data: { title: "", date: dateStr, startTime: "", endTime: "", location: "", notes: "" }
    });
  }
  function openEdit(ev){
    setModal({ mode:"edit", data: {...ev} });
  }
  function closeModal(){ setModal(null); }

  function saveEvent(data){
    if (!data.title?.trim()) return;
    if (modal?.mode === "edit"){
      setEvents(prev => prev.map(e => e.id === data.id ? data : e));
    } else {
      const id = Date.now().toString(); // simple client id
      setEvents(prev => [...prev, { ...data, id }]);
    }
    setModal(null);
  }
  function deleteEvent(id){
    setEvents(prev => prev.filter(e => e.id !== id));
    setModal(null);
  }

  const monthLabel = cursor.toLocaleString(undefined, { month: "long", year: "numeric" });

  return (
    <div className="container">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2><img src={profileIcons} alt="Profile" className="nav-icon" /> John Doe</h2>
        <ul>
          <li><button className="nav-button" onClick={dashboardPage}>
            <img src={dashboardIcon} alt="Dashboard" className="nav-icon" /> Dashboard
          </button></li>
          <li><button className="nav-button" onClick={candidatePage}>
            <img src={candidatesIcon} alt="Candidates" className="nav-icon" /> Candidates
          </button></li>
          <li><button className="nav-button" onClick={tasksPage}>
            <img src={tasksIcon} alt="Tasks" className="nav-icon" /> Tasks
          </button></li>
          <li><button className="nav-button" onClick={calendarPage}>
            <img src={calendarIcon} alt="Calendar" className="nav-icon" /> Calendar
          </button></li>
          <li><button className="nav-button" onClick={analyticsPage}>
            <img src={analyticsIcon} alt="Analytics" className="nav-icon" /> Analytics
          </button></li>
          <li><button className="nav-button" onClick={settingsPage}>
            <img src={settingsIcon} alt="Settings" className="nav-icon" /> Settings
          </button></li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* MAIN */}
      <div className="main">
        <header className="header">
          <h1>Calendar</h1>
          <div className="cal-controls">
            <button className="btn" onClick={() => setCursor(new Date())}>Today</button>
            <button className="btn" onClick={() => setCursor(prev => addMonths(prev, -1))}>◀</button>
            <span className="cal-month">{monthLabel}</span>
            <button className="btn" onClick={() => setCursor(prev => addMonths(prev, +1))}>▶</button>
          </div>
        </header>

        <div className="card">
          <div className="cal-grid">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
              <div key={d} className="cal-dow">{d}</div>
            ))}

            {grid.days.map((d, idx) => {
              const dStr = ymd(d);
              const inMonth = d.getMonth() === cursor.getMonth();
              const list = byDate.get(dStr) || [];

              return (
                <div
                  key={idx}
                  className={`cal-cell ${inMonth ? "" : "muted"}`}
                  onDoubleClick={() => openNew(dStr)}
                >
                  <div className="cal-cell-head">
                    <span className={`cal-daynum ${ymd(new Date())===dStr ? "today":""}`}>
                      {d.getDate()}
                    </span>
                    <button className="tiny-btn" title="New event" onClick={(e)=>{e.stopPropagation(); openNew(dStr);}}>＋</button>
                  </div>

                  <div className="cal-events">
                    {list.slice(0,3).map(ev => (
                      <div key={ev.id} className="cal-event" title={`${ev.title}${ev.startTime?` • ${ev.startTime}`:""}`}
                           onClick={(e)=>{e.stopPropagation(); openEdit(ev);}}>
                        <span className="cal-event-dot" />
                        <span className="cal-event-text">
                          {ev.startTime ? `${ev.startTime} ` : ""}{ev.title}
                        </span>
                      </div>
                    ))}
                    {list.length > 3 && (
                      <div className="cal-more" onClick={(e)=>{e.stopPropagation(); /* could open a day view */}}>
                        +{list.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {modal && (
        <EventModal
          data={modal.data}
          mode={modal.mode}
          onClose={closeModal}
          onSave={saveEvent}
          onDelete={deleteEvent}
        />
      )}
    </div>
  );
}

function EventModal({ data, mode, onClose, onSave, onDelete }){
  const [form, setForm] = useState(data);
  const onChange = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <h3>{mode === "edit" ? "Edit event" : "New event"}</h3>

        <label className="lbl">Title *</label>
        <input className="inp" value={form.title} onChange={onChange("title")} placeholder="Interview with Jane" />

        <div className="row">
          <div className="col">
            <label className="lbl">Date *</label>
            <input className="inp" type="date" value={form.date} onChange={onChange("date")} />
          </div>
          <div className="col">
            <label className="lbl">Start</label>
            <input className="inp" type="time" value={form.startTime||""} onChange={onChange("startTime")} />
          </div>
          <div className="col">
            <label className="lbl">End</label>
            <input className="inp" type="time" value={form.endTime||""} onChange={onChange("endTime")} />
          </div>
        </div>

        <label className="lbl">Location</label>
        <input className="inp" value={form.location||""} onChange={onChange("location")} placeholder="Google Meet / Office" />

        <label className="lbl">Notes</label>
        <textarea className="inp" rows={3} value={form.notes||""} onChange={onChange("notes")} placeholder="Anything important..." />

        <div className="modal-actions">
          {mode === "edit" && (
            <button className="btn danger" onClick={()=>onDelete(form.id)}>Delete</button>
          )}
          <div style={{ flex: 1 }} />
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={()=>onSave(form)}>Save</button>
        </div>
      </div>
    </div>
  );
}
