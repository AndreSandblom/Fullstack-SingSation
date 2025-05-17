import express from "express";
import { requireAuth } from "../middleware/authenticateSession.js";
import { addSong, deleteSong, getUserPlaylist, getAverageSongsPerPlaylist }  from "../controllers/playlistController.js";

const router = express.Router();

router.use(requireAuth);

router.post('/add', addSong) // adding songs
router.delete('/delete', deleteSong) //removing songs
router.get('/', getUserPlaylist) // fetching the playlist
router.get('/average-songs', getAverageSongsPerPlaylist); //average of songs per playlist among all users

export default router;  