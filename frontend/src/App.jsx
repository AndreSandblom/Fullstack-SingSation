import React from 'react';
import { Routes, Route } from 'react-router-dom';

//pages
import HomePage from './pages/HomePage';
import LyricsPage from './pages/LyricsPage';

//user pages
import ProfilePage from './users/Profile';
import LoginForm  from './users/Login';
import RegisterForm from './users/Register';

export default function App() {
  return (
    <Routes>
      <Route path="/"         element={<HomePage />} />
      <Route path="/lyrics/:artist/:title" element={<LyricsPage />} />
      <Route path="/profile"  element={<ProfilePage />} />
      <Route path="/login"    element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  );
}
