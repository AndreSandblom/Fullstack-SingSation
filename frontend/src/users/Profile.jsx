import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css"; // Reuse the minimalistic styles

export default function ProfilePage() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get("/api/users/profile", {
                    withCredentials: true,
                });
                setProfile(res.data);
            } catch (err) {
                setError(err.response?.data?.message || "Error loading profile");
            }
        };
        fetchProfile();
    }, []);

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
        </div>
    );
}
