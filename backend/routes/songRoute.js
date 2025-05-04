const express = require('express');
const { getSongList } = require('../controllers/songController');
const router = express.Router();

router.get('/', getSongList);

module.exports = router;