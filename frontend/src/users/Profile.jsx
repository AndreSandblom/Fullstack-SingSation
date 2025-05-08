import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css"; // Reuse the minimalistic styles

export default function ProfilePage() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [playlist, setPlaylist] = useState([]);
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
        const fetchPlaylist = async () => {
            try {
                const res = await axios.get("/api/playlists/", {
                    withCredentials: true,
                });
                if (!res.data || !res.data.songs) {
                    console.log("Playlist is empty or not found")
                } else {
                    console.log("Got the playlist. ", res.data);
                }
                setPlaylist(res.data.songs || []);
            } catch (err) {
                console.error("Failed to load playlist from react.", err);
            }
        }
        fetchProfile();
        fetchPlaylist();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post("/api/users/logout", {}, { withCredentials: true });
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Error logging out");
        }
    };

    const handleDeleteSong = async (title, artist) => {
        try {
            await axios.delete("/api/playlists/delete", {
                data: { songName: title, artist },
                withCredentials: true,
            });

            setPlaylist((prev) => 
            prev.filter((song) => !(song.title === title && song.artist === artist))
            );
        } catch (err) {
            console.error("Failed to delete song", err);
        }
    };

    const handleAddDummy = async () => {
        try {
            await axios.post(
                "/api/playlists/add",
                { songName: "Dummy Song", artist: "The Testers" },
                { withCredentials: true }
            );
            // Re-fetch playlist after adding
            const res = await axios.get("/api/playlists/", {
                withCredentials: true,
            });
            setPlaylist(res.data.songs || []);
        } catch (err) {
            console.error("Failed to add dummy song", err);
        }
    };

    if (error) return <p>{error}</p>;
    if (!profile) return <p>Loading...</p>;

    return (
        <div className="form-container">
            <h2>Welcome, {profile.username}!</h2>
            <p>Email: {profile.email}</p>

            <button onClick={handleLogout} className="danger-button">
                Logout
            </button>

            <button onClick={handleAddDummy} className="primary-button">
                Add Dummy Song to Playlist
            </button>

            <h3>Your Favorite Songs:</h3>
            {playlist.length === 0 ? (
                <p>No favorite songs saved yet. </p>
            ): (
                <ul>
                    {playlist.map((song) => (
                        <li key={`${song.title}- ${song.artist}`} className="playlist-item">
                            <span>
                            <strong>{song.title}</strong> by {song.artist}
                            </span>
                            <button
                                onClick={() => handleDeleteSong(song.title, song.artist)}
                                className="danger-button small"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )} 
        </div>
    );
}
