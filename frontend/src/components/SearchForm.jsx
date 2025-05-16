import { useState } from 'react';
import styles from './SearchForm.module.css';

export default function SearchForm({ onSearch }) {
    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if(!artist.trim() || !title.trim()) return;
        onSearch({ artist: artist.trim(), title: title.trim()});
    };

    return (
      <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={e => setArtist(e.target.value)}
        required
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Song Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Search Lyrics
      </button>
    </form>
  );
}