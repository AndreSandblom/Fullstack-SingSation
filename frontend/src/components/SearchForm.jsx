import { useState } from 'react';

export default function SearchForm({ onSearch }) {
    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if(!artist.trim() || !title.trim()) return;
        onSearch({ artist: artist.trim(), title: title.trim()});
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={e => setArtist(e.target.value)}
          required
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Song Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{ marginRight: '0.5rem' }}
        />
        {/* temporary styling for the search button */}
        <button
        type="submit"
        style={{
          width: '10rem',
          padding: '0.5rem 0.5rem',
        }}
      >
        Search Lyrics
      </button>
      </form>
    );
}