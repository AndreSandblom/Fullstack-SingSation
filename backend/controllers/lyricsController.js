const axios = require('axios');
const songs = require('../data/songsData');

const getLyrics = async (req, res) => {
    const { artist, title } = req.params;
    console.log(`HIT: ${artist} - ${title}`);

    try {
        const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        console.log('Lyrics response:', response.data);
        res.json({ lyrics: response.data.lyrics});
    } catch (error) {
        console.error('Error:', error.message);
        res.status(404).json({ error: 'Lyrics not found' });
    }
} 

const getSongList = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const start = (page - 1) * limit;
    const end = page * limit;
    const paginated = songs.slice(start, end);
  
    res.json({
      page,
      limit,
      total: songs.length,
      results: paginated
    });
  };
  
  module.exports = { getLyrics, getSongList };