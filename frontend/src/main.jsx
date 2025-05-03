import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./users/Register.jsx";
import LoginForm from "./users/Login.jsx";
import ProfilePage from "./users/Profile.jsx"; // you'll create this next

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LoginForm />
              <RegisterForm />
            </>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
