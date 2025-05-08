import React from 'react';
import { useNavigate } from 'react-router-dom';

import SearchForm from '../components/SearchForm';
import SongList   from '../components/SongList';

export default function HomePage() {
  const navigate = useNavigate();

  const goToLyrics = ({ artist, title }) => {
    navigate(`/lyrics/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div style={{ padding: '2rem' }}></div>
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>SingSation</h1>
      <SearchForm onSearch={goToLyrics} />
      <SongList   onSongSelect={goToLyrics} />
      </div>
    </div>
  );
}
