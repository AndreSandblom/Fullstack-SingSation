import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css"; // Reuse the minimalistic styles

export default function ProfilePage() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    const [updateError, setUpdateError] = useState("");
    const [message, setMessage] = useState("");
    const [usernameEmailData, setUsernameEmailData] = useState({
      username: "",
      email: "",
    });
    const [passwordData, setPasswordData] = useState({
      currentPassword: "",
      newPassword: "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get("/api/users/profile", {
                    withCredentials: true,
                });
                setProfile(res.data);
                setUsernameEmailData({
                    username: res.data.username,
                    email: res.data.email,
                  });
            } catch (err) {
                setError(err.response?.data?.message || "Error loading profile");
            }
        };
        fetchProfile();
    }, []);

    const handleUsernameEmailChange = (e) => {
        setUsernameEmailData({
          ...usernameEmailData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handlePasswordChange = (e) => {
        setPasswordData({
          ...passwordData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleUsernameEmailSubmit = async (e) => {
        e.preventDefault();
        setUpdateError("");
        setMessage("");
        try {
          const res = await axios.put("/api/users/profile", usernameEmailData, {
            withCredentials: true,
          });
          setMessage(res.data.message);
        } catch (err) {
          setUpdateError(err.response?.data?.message || "Error updating profile");
        }
      };
    
      const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setUpdateError("");
        setMessage("");
        try {
          const res = await axios.put("/api/users/profile/password", passwordData, {
            withCredentials: true,
          });
          setMessage(res.data.message);
        } catch (err) {
          setUpdateError(err.response?.data?.message || "Error updating password");
        }
      };

    const handleLogout = async () => {
        try {
            await axios.post("/api/users/logout", {}, { withCredentials: true });
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Error logging out");
        }
    };

    if (error) return <p>{error}</p>;
    if (!profile) return <p>Loading...</p>;

    return (
        <div class="form-container">
          <h2>Welcome, {profile.username}!</h2>
          <p>Email: {profile.email}</p>
    
          <button onClick={handleLogout} className="danger-button">
            Logout
          </button>
    
          <form onSubmit={handleUsernameEmailSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={usernameEmailData.username}
              onChange={handleUsernameEmailChange}
            />
    
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={usernameEmailData.email}
              onChange={handleUsernameEmailChange}
            />
    
            <button type="submit">Update Username/Email</button>
          </form>
    
          <form onSubmit={handlePasswordSubmit}>
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
    
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
    
            <button type="submit">Update Password</button>
          </form>
    
          {message && <p className="message success">{message}</p>}
          {updateError && <p className="message error">{updateError}</p>}
        </div>
      );
}
