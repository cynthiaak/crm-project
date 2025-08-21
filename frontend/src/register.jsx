import { useState } from 'react';
import './register.css'

//reads the backend URL
const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Register() {
const [fullName, setFullName] = useState("");
const [email, setEmail]       = useState("");
const [password, setPassword] = useState("");
const [confirm, setConfirm]   = useState("");
const [loading, setLoading]   = useState(false);
const [error, setError]       = useState("");
const [ok, setOk]             = useState("");

async function handleSubmit(e) {
  e.preventDefault();   // stops browser from reloading the page
  setError("");         // clear old errors
  setOk("");            // clear old success message

  //for validation
if (!fullName || !email || !password) {
  setError("Please fill all required fields.");
  return;
}
if (password !== confirm) {
  setError("Passwords do not match.");
  return;
}



//send request to backendd
try{
  setLoading(true);
  const res = await fetch(`${API}/auth/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ fullName, email, password }),
});

//handle the responde of backend if there is an error
const data = await res.json();

if (!res.ok) {
  setError(data.error || "Registration failed");
  return;
}
//else
setOk("Account created! You can now log in.");
setFullName("");
setEmail("");
setPassword("");
setConfirm("");
 } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  
}

 return(
    <div className="container-fullscreen">
        <form className='register-box' onSubmit={handleSubmit}>
            <h2>Register</h2>
            <h5>Full Name</h5>
            <input type="text" placeholder='Your Name' value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <h5>Email</h5>
            <input type="text" placeholder="username@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <h5>Password</h5>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <h5>Confirm Password</h5>
            <input type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            
                  
            <button type="submit" style={{padding: '10px', width: '100%', marginTop:'10px'}}>Sign up</button>
        </form>
    </div>
 );
}


