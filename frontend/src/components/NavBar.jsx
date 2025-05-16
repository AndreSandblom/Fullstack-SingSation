import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';
import styles from './NavBar.module.css';
import axios from 'axios';

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); 
  const [error, setError] = useState(null);
  const location = useLocation(); 

  const handleLogout = async () => {
    try {
      await axios.post('/api/users/logout', {}, { withCredentials: true });
      setIsLoggedIn(false); 
      navigate('/');        
    } catch (err) {
      setError(err.response?.data?.message || 'Error logging out');
    }
  };

  useEffect(() => {
    axios
      .get('/api/users/profile', { withCredentials: true })
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false));
  }, [location]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.link}>Home</Link>

        {!isLoggedIn && (
          <>
            <Link to="/login" className={styles.link}>Login</Link>
            <Link to="/register" className={styles.link}>Register</Link>
          </>
        )}

        {isLoggedIn && (
          <Link to="/profile" className={styles.link}>Profile</Link>
        )}
        
        <Link to="/about" className={styles.link}>About</Link>
      </div>

      {isLoggedIn && (
        <button onClick={handleLogout} className={`${styles.link} ${styles.logoutButton}`}>
          Logout
        </button>
      )}
    </nav>
  );
}
