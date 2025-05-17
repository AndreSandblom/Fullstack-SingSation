import { useState, useEffect } from "react";
import axios from 'axios';

import styles from './SongList.module.css';

export default function SongList({ onSongSelect }) {
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
      <div className={styles.container}>
      <h2 className={styles.title}>Song List</h2>
      <ul>
        {songs?.map((song, index) => (
          <li key={index} className={styles.songItem}>
            <span>
              <strong>{song.title}</strong> by {song.artist}
            </span>
            <button onClick={() => onSongSelect(song)} className={styles.button}>
              Load Lyrics
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.pagination}>
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>⬅ Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next ➡</button>
      </div>
    </div>
  );
}