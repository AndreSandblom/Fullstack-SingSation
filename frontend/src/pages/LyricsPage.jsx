import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { buildSpotifyLink } from '../utils/spotifyUtils';
import styles from './LyricsPage.module.css';


export default function LyricsPage() {
  const { artist, title } = useParams();
  const [lyrics, setLyrics]   = useState('');
  const [loading, setLoading] = useState(true);
  const spotifyUrl = buildSpotifyLink(artist, title);

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
    <div className="container">
      <div className="overlay">
        <h2 className={styles.title}>
          {decodeURIComponent(title)} by {decodeURIComponent(artist)}
        </h2>
        <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className={styles.spotifyLink}>Listen on Spotify</a>
        {loading ? (
          <p className={styles.lyrics}>Loading lyrics…</p>
        ) : (
          <div className={styles.lyrics}>
          {lyrics.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}