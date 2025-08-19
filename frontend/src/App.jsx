import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
 return(
  <div className="app-container">
    <div className="login-box">
      <h2>Login</h2>
      <h5>Email</h5>
      <input type="text" placeholder="username@gmail.com"/>
      <h5>Password</h5>
      <input type="text" placeholder="Password"/>
      <h6 onClick="forgotPassword()">Forgot Password?</h6>
      <button style={{padding: '10px', width: '100%', marginTop:'10px'}}>Sign in</button>
    </div>
  </div>
 )
    
}

export default App
