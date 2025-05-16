import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NavBar.module.css';

export default function NavBar () {
    return (
        <nav className={styles.navbar}>
      <Link to="/" className={styles.link}>Home</Link>
      <Link to="/login" className={styles.link}>Login</Link>
      <Link to="/register" className={styles.link}>Register</Link>
      <Link to="/profile" className={styles.link}>Profile</Link>
    </nav>
  );
}
