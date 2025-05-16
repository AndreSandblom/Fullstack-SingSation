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

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get('/api/permissions/', {
          withCredentials: true,
        });
        setIsAdmin(res.data.isAdmin === true);
      } catch (err) {
        setIsAdmin(false);
      }
    };

    checkAdmin();
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
    <div className={styles.dashboardContainer}>
      <h2>User Permissions Dashboard</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="flex-1"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !username}
          className="button"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {status && <p className="message error">{status}</p>}

      {permissions && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">Permissions</h3>
          <form className="space-y-3">
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
          <button onClick={handleSave} className="button">
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

const Checkbox = ({ label, value, onChange }) => (
  <div className="flex items-center space-x-2">
    <span className={styles.label}>{label}</span>
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={value}
        onChange={onChange}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-all" />
    </label>
  </div>
);

export default Dashboard;
