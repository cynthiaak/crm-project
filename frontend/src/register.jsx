import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './register.css'

function App() {
 return(
    <div className="container">
        <div className='register-box'>
            <h2>Register</h2>
            <h5>Full Name</h5>
            <input type="text" placeholder='Your Name'/>
            <h5>Email</h5>
            <input type="text" placeholder="username@gmail.com"/>
            <h5>Password</h5>
            <input type="text" placeholder="Password"/>
            <h5>Confirm Password</h5>
            <input type="text" placeholder="Confirm Password"/>
            <button style={{padding: '10px', width: '100%', marginTop:'10px'}}>Sign up</button>
        </div>
    </div>
 )
    
}

export default App