const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

router.post('/playlists', playlistController.createPlaylistId) // creating the playlist

router.post('/playlists/:id/add', playlistController.addSong) // adding songs

router.delete('/playlists/:id/delete', playlistController.deleteSong) //removing songs

router.get('/playlists/:id', playlistController.getPlaylist) // fetching the playlist

module.exports = router;