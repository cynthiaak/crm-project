
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './forgotPassword.css';
import forgotPasswordImg from './forgotPassword.png';

function ForgotPassword(){
    const [email, setEmail]=useState("");
    const [message, setMessage]= useState("");
    const navigate= useNavigate()
    const backToLogin=() =>{
        navigate("/login");
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/forgot-password',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"},
                body: JSON.stringify({email}),
            }
        );
        const data=await response.json();
        setMessage(data.message);
    };

    return(
    <div className="app-container">
        <div className="forgot-password-box">
            <img src={forgotPasswordImg} alt="Forgot Password" className="logo-img"   style={{ width: '60px', height: '60px' }}  />
            <h2>Forgot your password</h2>
            <h6>Enter your email and we'll send you a link to reset your password </h6>
            <input 
            type="email"
            placeholder="username@gmail.com"
            value={email}
            onChange={e=>setEmail(e.target.value)}/>
            <button>Send Reset Link</button>
            <h6 onClick={backToLogin} className="back-to-login">
             &lt; Back to Login
          </h6>
        </div>
    </div>
);
}
export default ForgotPassword;