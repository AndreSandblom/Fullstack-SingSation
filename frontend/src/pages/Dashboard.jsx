import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../users/Form.css';

import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [permissions, setPermissions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [averageSongs, setAverageSongs] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);


  useEffect(() => {
  const checkAdminAndFetchStats = async () => {
      try {
        const res = await axios.get('/api/permissions/', {
          withCredentials: true,
        });
        const isAdmin = res.data.isAdmin === true;
        setIsAdmin(isAdmin);

        if (isAdmin) {
          // Only fetch if admin
          const [avgSongsRes, userCountRes] = await Promise.all([
            axios.get('/api/playlists/average-songs'),
            axios.get('/api/users/count')
          ]);

          setAverageSongs(avgSongsRes.data.averageSongsPerPlaylist);
          setTotalUsers(userCountRes.data.totalUsers);
        }
      } catch (err) {
        setIsAdmin(false);
      }
    };

    checkAdminAndFetchStats();
  }, []);

  if (isAdmin === null) {
    // Don't render anything until admin check is done
    return null;
  }

  if (!isAdmin) {
    return <h2 className="unauthorized">401 Unauthorized</h2>;
  }

  const handleSearch = async () => {
    setLoading(true);
    setPermissions(null);
    setStatus(null);

    try {
      const response = await axios.get(`/api/permissions/${username}`, {
        withCredentials: true,
      });
      setPermissions(response.data);
    } catch (err) {
      const message =
        err.response?.data?.message || 'An error occurred while fetching data.';
      setStatus(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckbox = (field) => {
    setPermissions((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async () => {
    setStatus(null);

    try {
      const {
        canSearchSongs,
        canAddSongsToPlaylist,
        canDeleteSongsFromPlaylist,
      } = permissions;

      const response = await axios.put(
        '/api/permissions',
        {
          username,
          canSearchSongs,
          canAddSongsToPlaylist,
          canDeleteSongsFromPlaylist,
        },
        { withCredentials: true }
      );

      setStatus(response.data.message || 'Permissions updated successfully.');
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'An error occurred while updating permissions.';
      setStatus(`Error: ${message}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className="overlay">
      <h2>User Permissions Dashboard</h2>

      <div className={styles.searchSection}>
  <input
    type="text"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    placeholder="Enter username"
    className={styles.input}
  />
  <button
    onClick={handleSearch}
    disabled={loading || !username}
    className={styles.searchButton}
  >
    {loading ? 'Searching...' : 'Search'}
  </button>
</div>

  {status && <p className="message error">{status}</p>}

  {averageSongs !== null && totalUsers !== null && (
    <div className={styles.permissionsBox}>
      <p><strong>Total Number of Users:</strong> {totalUsers}</p>
      <p><strong>Average Number of Songs per Playlist:</strong> {averageSongs.toFixed(2)}</p>
    </div>
  )}
      {permissions && (
  <div className={styles.permissionsBox}>
    <h3 className={styles.permissionsTitle}>Permissions</h3>
    <form className={styles.permissionsForm}>
      <Checkbox
        label="Can Search Songs"
        value={permissions.canSearchSongs}
        onChange={() => handleCheckbox('canSearchSongs')}
      />
      <Checkbox
        label="Can Add Songs to Playlist"
        value={permissions.canAddSongsToPlaylist}
        onChange={() => handleCheckbox('canAddSongsToPlaylist')}
      />
      <Checkbox
        label="Can Delete Songs from Playlist"
        value={permissions.canDeleteSongsFromPlaylist}
        onChange={() => handleCheckbox('canDeleteSongsFromPlaylist')}
      />
    </form>
    <button onClick={handleSave} className={styles.saveButton}>
      Save Changes
    </button>
  </div>
)}
    </div>
  </div>
  );
};

const Checkbox = ({ label, value, onChange }) => (
  <div className={styles.checkboxWrapper}>
    <span className={styles.label}>{label}</span>
    <label className={styles.switch}>
      <input
        type="checkbox"
        className={styles.hiddenCheckbox}
        checked={value}
        onChange={onChange}
      />
      <span className={styles.slider}></span>
    </label>
  </div>
);

export default Dashboard;
