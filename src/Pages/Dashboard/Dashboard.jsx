// Imports React, CSS & Etc
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

// Imports Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../Features/firebaseConfig.js';

const Dashboard = () => {
  
  // Check if User is logged in or not
  useEffect(()=>{
    onAuthStateChanged = (auth, (user) => {
      if (user) {
        
        // User is logged In & Debugging
        const uid = user.uid;
        console.log("uid", uid);
        
      } else {
        
        // User is signed out
        console.log("User is logged out")
      }
      
    });
    
  }, [])
  
  return (
    <section>
      <div>
        <p>Donee</p>
      </div>
    </section>
  )
}

export default Dashboard