import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AddCostForm from "./AddCost/AddCostForm";
import ReportsForm from "./ReportsForm";
import SignupPage from "./SignUpPage/SignUpPage";
import LoginPage from "./Log-in page/LoginPage";
import HomePage from "./HomePage";
import Header from "./Header/Header";
import jwt_decode from 'jwt-decode';
import Footer from "./Footer/Footer";
import Profile from "./Profile/Profile";
import UserSettings from "./UserSettings/UserSettings";
import About from "../About/About";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token); // You need to install jwt-decode library: `npm install jwt-decode`
      if (decodedToken.exp * 1000 > Date.now()) {
        setIsLoggedIn(true);
        setUserId(decodedToken._id);
      } else {
        localStorage.removeItem('token');
      }
    }
  }, []);

    // Inside App component
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserId(null);
  };




  return (
    <Router>
    <Header handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
    
      <div className="App">
        
        <Routes>
          
        <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/homepage" />
              ) : (
                <LoginPage setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />
              )
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/homepage" />
              ) : (
                <LoginPage setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/homepage" />
              ) : (
                <SignupPage />
              )
            }
          />
          <Route
            path="/homepage"
            element={
              isLoggedIn ? (
                <HomePage userId={userId} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />} />
        
          <Route path="/profile" element={<Profile token={localStorage.getItem('token')} />} />

          <Route path="/about" element={<About />} />

          <Route
            path="/settings"
            element={
              isLoggedIn ? (
                <UserSettings userId={userId} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
