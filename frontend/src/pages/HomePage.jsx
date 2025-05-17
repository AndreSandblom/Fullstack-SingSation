import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import SearchForm from '../components/SearchForm';
import SongList   from '../components/SongList';

export default function HomePage() {
  const navigate = useNavigate();
  //const [canSearchSongs, setCanSearchSongs] = useState(null); // null = unknown, true/false = known
  const [canSearchSongs, setCanSearchSongs] = useState(true);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get('/api/permissions/', {
          withCredentials: true,
        });
        if (response.data?.canSearchSongs === false) {
          //disable if admin revoked access
          setCanSearchSongs(false); 
        }
        //setCanSearchSongs(response.data.canSearchSongs === true);
      } catch (err) {
        //don't block access if user is not logged in or request fails
        console.warn('Permission check skipped or failed. Search still allowed.');
        //setCanSearchSongs(false); // assume no access on failure
      }
    };

    fetchPermissions();
  }, []);

  const goToLyrics = ({ artist, title }) => {
    navigate(`/lyrics/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
  };

  return (
    <div className="container">
    <div className="overlay">
      <h1 className="appLogo">SingSation</h1>
      {canSearchSongs && <SearchForm onSearch={goToLyrics} />}
      <SongList onSongSelect={goToLyrics} />
    </div>
  </div>
);
}
