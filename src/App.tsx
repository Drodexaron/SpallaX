// FireBase Imports
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  sendEmailVerification,
} from 'firebase/auth';
import firebaseConfig from './firebaseConfig.js';

// React & CSS imports
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import './App.css';

// Components Imports
import { AppMessageEmailVerification, AppMessageSuccessful, AppMessageError, AppMessageEmailResendVerification } from './components/AppMessage.jsx';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

// App Render
function App() {
  
  // Consts & Defines
  // Retrieve Inputs Values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // ALERT Window
  const [showAppMessage, setAppMessage] = useState(false);
  const [activeMessage, setActiveMessage] = useState(null);
  const [error, setError] = useState(null);
  
  // Cooldown 
  const [resendCooldown, setResendCooldown] = useState(null);
  
  // Check Persistence / Login auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified)
      {
        window.location.href = '/dashboard/index.html';
      }
    });
    return unsubscribe;
  }, []);
  
  // FireBase Functions
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (!user.emailVerified) {
        await sendEmailVerification(user);
        setAppMessage(true);
        setActiveMessage('EmailVerification');
      } else {
        setAppMessage(true);
        setActiveMessage('Successful');
      }
    } catch(error) {
      setError(error);
      setAppMessage(true);
      setActiveMessage('Error');
      console.error("Firebase Error:", error.code, error.message);
    }
  };
  
  // Handle Email Resend Verification
  const handleResendVerification = async () => {
    try {
      if (resendCooldown) {
        setError('Please wait 45 seconds to be able to use Resend Button.');
        return;
      }
      await sendEmailVerification(auth.currentUser);
      setAppMessage(true);
      setActiveMessage('ResendVerification');
      setResendCooldown(45);
    } catch (error) {
      setError(error.message);
      setAppMessage(true);
      setActiveMessage('Error');
      console.error("Firebase Error:", error.code, error.message);
    }
  }
  
  // Cooldown Timer Effect
  useEffect(() => {
    let interval;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        
        setResendCooldown(resendCooldown - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [resendCooldown]);
  
  // Button Trigger & Functions
  const loginSubmit = useRef(null);
  const triggerClick = () => {
    if (loginSubmit.current) {
      loginSubmit.current.click();
    }
  };
  
  // UI STRUCTURE
  return (
    <div className="App">
      <header className="App-header">
        <h4>Task<b>Forge</b></h4>
        <p>by SpallaX</p>
      </header>
      
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <input type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        required></input>
        <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        required></input>
        <div id="error-Message"></div> 
        <button type="submit">Login</button>
      </form>
      
      {showAppMessage && (
      <>
        {activeMessage === 'EmailVerification' && <AppMessageEmailVerification  onResend={handleResendVerification} cooldown={resendCooldown}/>}
        {activeMessage === 'Successful' && <AppMessageSuccessful />}
        {activeMessage === 'Error' && <AppMessageError errorMessage={error}/>}
        {activeMessage === 'ResendVerification' && <AppMessageEmailResendVerification onResend={handleResendVerification} cooldown={resendCooldown} />}
      </>
      )}
      
      <div className="footer" >
        <p>© 2024 SpallaX. All rights reserved.</p>
      </div>
      
    </div>
    
  );
}

export default App;