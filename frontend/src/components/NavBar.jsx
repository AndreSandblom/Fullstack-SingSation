import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar () {
    return (
        <nav style={{
            display: 'flex',
            gap: '1rem',
            padding: '1rem',
            borderBottom: '1px solid #ccc'
          }}>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/profile">Profile</Link>
          </nav>
        );
}
