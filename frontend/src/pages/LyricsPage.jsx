import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import styles from './LyricsPage.module.css';


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
    <div className={styles.container}>
      <div className={styles.overlay}>
        <h2 className={styles.title}>
          {decodeURIComponent(title)} by {decodeURIComponent(artist)}
        </h2>
        {loading ? (
          <p className={styles.lyrics}>Loading lyrics…</p>
        ) : (
          <pre className={styles.lyrics}>{lyrics}</pre>
        )}
      </div>
    </div>
  );
}