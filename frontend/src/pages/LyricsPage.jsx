import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function LyricsPage() {
  const { artist, title } = useParams();
  const [lyrics, setLyrics]   = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/api/lyrics/${artist}/${title}`);
        setLyrics(res.data.lyrics);
      } catch {
        setLyrics('Lyrics not found :(');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [artist, title]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>🎶 {decodeURIComponent(title)} by {decodeURIComponent(artist)}</h2>
      {loading ? <p>Loading lyrics…</p>
               : <pre style={{ whiteSpace: 'pre-wrap' }}>{lyrics}</pre>}
    </div>
  );
}