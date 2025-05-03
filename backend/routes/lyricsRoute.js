const express = require('express');
const { getLyrcis } = require('../controllers/lyricsController');

const router = express.Router();

router.get('/lyrics/:artist/:title', getLyrics);

module.exports = router;