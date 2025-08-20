
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './forgotPassword.css';

function ForgotPassword(){
    const [email, setEmail]=useState('');
return(
    <div className="app-container">
        <div className="forgot-password-box">
            <h2>Forgot your password</h2>
            <h6>Enter your email and we'll send you a link to reset your password </h6>
            <input 
            type="email"
            placeholder="username@gmail.com"
            value={email}
            onChange={e=>setEmail(e.target.value)}/>
            <button>Send Reset Link</button>
        </div>
    </div>
);
}
export default ForgotPassword;