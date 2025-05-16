import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';
import "./Form.css";


export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [error, setError] = useState('');
  const [updateError, setUpdateError] = useState('');
  const [message, setMessage] = useState('');
  const [usernameEmailData, setUsernameEmailData] = useState({
    username: '',
    email: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [permissions, setPermissions] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/users/profile', {
          withCredentials: true,
        });
        setProfile(res.data);
        setUsernameEmailData({
          username: res.data.username,
          email: res.data.email,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Error loading profile');
      }
    };
    const fetchPlaylist = async () => {
      try {
        const res = await axios.get('/api/playlists/', {
          withCredentials: true,
        });
        if (!res.data || !res.data.songs) {
          console.log('Playlist is empty or not found');
        } else {
          console.log('Got the playlist. ', res.data);
        }
        setPlaylist(res.data.songs || []);
      } catch (err) {
        console.error('Failed to load playlist from react.', err);
      }
    };

    const fetchPermissions = async () => {
      try {
        const res = await axios.get('/api/permissions/', {
          withCredentials: true,
        });
        setPermissions(res.data);
      } catch (err) {
        console.error('Failed to fetch permissions', err);
      }
    };

    fetchProfile();
    fetchPlaylist();
    fetchPermissions();
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
    setUpdateError('');
    setMessage('');
    try {
      const res = await axios.put('/api/users/profile', usernameEmailData, {
        withCredentials: true,
      });
      setMessage(res.data.message);
    } catch (err) {
      setUpdateError(err.response?.data?.message || 'Error updating profile');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setUpdateError('');
    setMessage('');
    try {
      const res = await axios.put('/api/users/profile/password', passwordData, {
        withCredentials: true,
      });
      setMessage(res.data.message);
    } catch (err) {
      setUpdateError(err.response?.data?.message || 'Error updating password');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/users/logout', {}, { withCredentials: true });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error logging out');
    }
  };

  const handleDeleteSong = async (title, artist) => {
    try {
      await axios.delete('/api/playlists/delete', {
        data: { songName: title, artist },
        withCredentials: true,
      });

      setPlaylist((prev) =>
        prev.filter((song) => !(song.title === title && song.artist === artist))
      );
    } catch (err) {
      console.error('Failed to delete song', err);
    }
  };

  const handleAddDummy = async () => {
    try {
      await axios.post(
        '/api/playlists/add',
        { songName: 'Dummy Song', artist: 'The Testers' },
        { withCredentials: true }
      );
      // Re-fetch playlist after adding
      const res = await axios.get('/api/playlists/', {
        withCredentials: true,
      });
      setPlaylist(res.data.songs || []);
    } catch (err) {
      console.error('Failed to add dummy song', err);
    }
  };

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
    <div className="overlay">
      <h2>Welcome, {profile.username}!</h2>
      <p>Email: {profile.email}</p>
  
      <div className={styles.actions}>
        <button onClick={handleLogout} className="danger-button">Logout</button>
        {permissions?.canAddSongsToPlaylist && (
          <button onClick={handleAddDummy} className="primary-button">Add Dummy Song to Playlist</button>
        )}
      </div>
  
      <section className={styles.sectionBox}>
        <h3>Your Favorite Songs</h3>
        {playlist.length === 0 ? (
          <p>No favorite songs saved yet.</p>
        ) : (
          <ul>
            {playlist.map((song) => (
              <li key={`${song.title}-${song.artist}`} className="playlist-item">
                <span><strong>{song.title}</strong> by {song.artist}</span>
                {permissions?.canDeleteSongsFromPlaylist && (
                  <button
                    onClick={() => handleDeleteSong(song.title, song.artist)}
                    className="danger-button small"
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
  
      <section className={styles.sectionBox}>
        <h3>Update Username & Email</h3>
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
      </section>
  
      <section className={styles.sectionBox}>
        <h3>Change Password</h3>
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
      </section>
  
      {message && <p className="message success">{message}</p>}
      {updateError && <p className="message error">{updateError}</p>}
    </div>
  </div>
  
  );
}
