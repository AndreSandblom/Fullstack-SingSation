const express = require('express');
const { getLyrics, getSongList } = require('../controllers/lyricsController');
const router = express.Router();

router.get('/lyrics/:artist/:title', getLyrics);
router.get('/songs', getSongList);

module.exports = router;