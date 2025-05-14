import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import SearchForm from '../components/SearchForm';
import SongList   from '../components/SongList';

export default function HomePage() {
  const navigate = useNavigate();
  const [canSearchSongs, setCanSearchSongs] = useState(null); // null = unknown, true/false = known

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get('/api/permissions/', {
          withCredentials: true,
        });
        setCanSearchSongs(response.data.canSearchSongs === true);
      } catch (err) {
        setCanSearchSongs(false); // assume no access on failure
      }
    };

    fetchPermissions();
  }, []);

  const goToLyrics = ({ artist, title }) => {
    navigate(`/lyrics/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div style={{ padding: '2rem' }}></div>
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>SingSation</h1>
      {canSearchSongs && <SearchForm onSearch={goToLyrics} />}
      <SongList   onSongSelect={goToLyrics} />
      </div>
    </div>
  );
}
