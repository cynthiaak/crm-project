import { useRef, useState } from "react";
import "./CVupload.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function jsonFetch(path, options = {}) {
  const url = path.startsWith("http") ? path : `${API}${path}`;
  const res = await fetch(url, options);
  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {}
  if (!res.ok) throw new Error(data.error || data.message || `HTTP ${res.status}`);
  return data;
}

export default function CVUpload({ onUploaded }) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const dz = useRef(null);

  function acceptFile(f) {
    if (!f) return;
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
      setErr("Please upload a PDF file.");
      return;
    }
    if (f.size > 8 * 1024 * 1024) {
      setErr("Max file size is 8MB.");
      return;
    }
    setErr("");
    setMsg("");
    setFile(f);
  }

  function onDrop(e) {
    e.preventDefault();
    dz.current?.classList.remove("is-dragging");
    acceptFile(e.dataTransfer.files?.[0]);
  }

  function onDragOver(e) {
    e.preventDefault();
    dz.current?.classList.add("is-dragging");
  }

  function onDragLeave() {
    dz.current?.classList.remove("is-dragging");
  }

  async function handleUpload(e) {
    e.preventDefault();
    setMsg("");
    setErr("");

    if (!email) {
      setErr("Email is required.");
      return;
    }
    if (!file) {
      setErr("Attach a PDF first.");
      return;
    }

    try {
      setBusy(true);

      // 1) Create candidate (or find existing)
      let candidateId;
      try {
        const c = await jsonFetch("/api/candidates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, fullName }),
        });
        candidateId = c.id;
      } catch (e) {
        // if exists, search by email and take the first match
        const list = await jsonFetch(`/api/candidates?q=${encodeURIComponent(email)}&limit=1`);
        const found = list.data?.[0];
        if (!found) throw e;
        candidateId = found.id;
      }

      // 2) Upload CV
      const form = new FormData();
      form.append("file", file);
      await jsonFetch(`/api/cv/upload?candidateId=${candidateId}`, { method: "POST", body: form });

      setMsg("CV uploaded successfully.");
      setFile(null);
      setEmail("");
      setFullName("");
      onUploaded?.(); // let parent refresh list/metrics
    } catch (e) {
      setErr(e.message || "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card upload-card">
      <h2 className="upload-title">Upload CV</h2>

      <form onSubmit={handleUpload}>
        <label className="lbl">Candidate Email *</label>
        <input
          className="input"
          type="email"
          placeholder="jane.doe@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="lbl">Full Name (optional)</label>
        <input
          className="input"
          type="text"
          placeholder="Jane Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <div
          ref={dz}
          className={`dropzone ${file ? "has-file" : ""}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <p className="dz-title">Drag & drop PDF here</p>
          <p className="dz-sub">or</p>
          <label className="btn btn-light">
            Browse…
            <input
              type="file"
              accept="application/pdf,.pdf"
              className="hidden-input"
              onChange={(e) => acceptFile(e.target.files?.[0])}
            />
          </label>

          {file && (
            <p className="dz-file">
              Selected: <b>{file.name}</b> ({Math.round(file.size / 1024)} KB)
              <button type="button" className="btn-link" onClick={() => setFile(null)}>
                Remove
              </button>
            </p>
          )}
        </div>

        {err && <div className="msg error">{err}</div>}
        {msg && <div className="msg ok">{msg}</div>}

        <div className="actions">
          <button className="btn btn-primary" disabled={busy}>
            {busy ? "Uploading…" : "Upload CV"}
          </button>
        </div>
      </form>
    </div>
  );
}
