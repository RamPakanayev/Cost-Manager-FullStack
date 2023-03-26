import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AddCostForm from "./AddCostForm";
import ReportsForm from "./ReportsForm";
import SignupPage from "./SignUpPage/SignUpPage";
import LoginPage from "./Log-in page/LoginPage";
import HomePage from "./HomePage";

function App() {
  const [imagePath, setImagePath] = useState("./Logo.png");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setImagePath(process.env.PUBLIC_URL + "/Logo.png");
  }, []);

  return (
    <Router>
      <div className="App">
        <img src={imagePath} alt="Logo" />
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/homepage" />
              ) : (
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
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
                <HomePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
