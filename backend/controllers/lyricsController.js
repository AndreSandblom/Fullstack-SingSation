const axios = require('axios');

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

module.exports = { getLyrics };