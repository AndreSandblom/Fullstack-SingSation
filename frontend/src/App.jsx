import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { Toaster } from 'react-hot-toast';

//pages
import HomePage from './pages/HomePage';
import LyricsPage from './pages/LyricsPage';
import Dashboard from './pages/Dashboard';
import AboutPage from './pages/AboutPage';

//user pages
import ProfilePage from './users/Profile';
import LoginForm from './users/Login';
import RegisterForm from './users/Register';

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lyrics/:artist/:title" element={<LyricsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}
