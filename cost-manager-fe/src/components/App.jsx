import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AddCostForm from "./AddCostForm";
import ReportsForm from "./ReportsForm";
import SignupPage from "./SignUpPage/SignUpPage";
import LoginPage from "./Log-in page/LoginPage";
import HomePage from "./HomePage";
import Header from "./Header/Header";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  return (
    <>
    <Header />
    <Router>
      <div className="App">
        
        <Routes>
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
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
