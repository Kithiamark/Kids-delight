// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LessonView from './components/LessonView';
import QuizView from './components/QuizView';
import ProfileSetup from './components/ProfileSetup';

function App() {
  const [user, setUser] = useState(null);
  const [profileComplete, setProfileComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Fetch profile from Flask backend
        try {
          const res = await fetch(`http://localhost:5000/api/users/${user.uid}`, {
            headers: {
              Authorization: `Bearer ${await user.getIdToken()}`,
            },
          });
          const data = await res.json();
          if (data.error || !data.ageGroup) {
            setProfileComplete(false);
          } else {
            setProfileComplete(true);
          }
        } catch (err) {
          console.error('Error fetching profile:', err);
          setProfileComplete(false);
        }
      } else {
        setUser(null);
        setProfileComplete(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="loading-screen">Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/setup" element={user && !profileComplete ? <ProfileSetup user={user} /> : <Navigate to="/" />} />
        <Route path="/" element={user && profileComplete ? <Dashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/lessons/:lessonId" element={user && profileComplete ? <LessonView user={user} /> : <Navigate to="/login" />} />
        <Route path="/quiz/:lessonId" element={user && profileComplete ? <QuizView user={user} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

