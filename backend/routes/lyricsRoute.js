const express = require('express');
const { getLyrics, getSongList } = require('../controllers/lyricsController');
const router = express.Router();

router.get('/:artist/:title', getLyrics);

module.exports = router;