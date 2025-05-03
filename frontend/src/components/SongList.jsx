import { useState, useEffect } from "react";
import axios from 'axios';

function SongList({ onSongSelect }) {
    const [songs, setSongs] = useState([]);
    //pagination
    const [ page, setPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const res = await axios.get(`/api/songs?page=${page}&limit=5`);
                setSongs(res.data.results);
                setTotalPages(Math.ceil(res.data.total / res.data.limit));
            } catch (error) {
                console.error('Error fetching song list', error);
            }
        };
        fetchSongs();
    }, [page])

    return (
        <div>
        <h2>Song List</h2>
        <ul>
          {songs.map((song, index) => (
            <li key={index}>
              <strong>{song.title}</strong> by {song.artist}{' '}
              <button onClick={() => onSongSelect(song)}>Load Lyrics</button>
            </li>
          ))}
        </ul>
  
        {/* Pagination Controls */}
        <div style={{ marginTop: '1rem' }}>
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>⬅ Prev</button>
          <span style={{ margin: '0 10px' }}>Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next ➡</button>
        </div>
      </div>
    );
}

export default SongList;