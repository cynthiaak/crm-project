import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        navigate("/rmdashboard");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong!");
    }
  }

  const forgotPassword = () => {
    navigate("/forgot-password"); 
  };
  const register = () => {
    navigate("/register");
  };

  return(
    <div className="app-container">
      <div className="login-box">
        <h2>Login</h2>
        <h5>Email</h5>
        <input 
          type="text" 
          placeholder="username@gmail.com" 
          value={email} 
          onChange={e=> setEmail(e.target.value)}
        />
        <h5>Password</h5>
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e=> setPassword(e.target.value))}
        />
        <h6 onClick={forgotPassword} className="forgot-password">
          Forgot Password?
        </h6>
        <button 
          style={{padding: '10px', width: '100%', marginTop:'10px'}}
          onClick={handleLogin}
        >
          Sign in
        </button>
        <h6 className="register">
          Don't have an account? Register <span className="bold-word clickable" onClick={register}>here</span>!
        </h6>
      </div>
    </div>
  )
}

export default Login;
