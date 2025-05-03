import React, { useState } from 'react';
import axios from 'axios';
import SongList from './components/SongList';

function App() {
  const [lyrics, setLyrics] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSongSelect = async (song) => {
    setSelectedSong(song);
    setLyrics('');
    setLoading(true);

    try {
      const res = await axios.get(`/api/lyrics/${encodeURIComponent(song.artist)}/${encodeURIComponent(song.title)}`);
      setLyrics(res.data.lyrics);
    } catch (err) {
      console.error('Lyrics not found', err);
      setLyrics('Lyrics not found :(');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>SingSation</h1>
      <SongList onSongSelect={handleSongSelect} />

      {selectedSong && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Lyrics: {selectedSong.title} by {selectedSong.artist}</h2>
          {loading ? <p>Loading lyrics...</p> : <pre style={{ whiteSpace: 'pre-wrap' }}>{lyrics}</pre>}
        </div>
      )}
    </div>
  );
}

export default App;
