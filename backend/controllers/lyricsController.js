import axios from 'axios';

export const getLyrics = async (req, res) => {
  const { artist, title } = req.params;
  try {
    const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    res.json({ lyrics: response.data.lyrics });
  } catch (error) {
    console.error('Error fetching lyrics:', error.message);
    res.status(404).json({ error: 'Lyrics not found' });
  }
};