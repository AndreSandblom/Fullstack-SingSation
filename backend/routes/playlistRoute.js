import express from "express";
import { requireAuth } from "../middleware/authenticateSession";
import { addSong, deleteSong, getUserPlaylist }  from "../controllers/playlistController";

const router = express.Router();

router.use(requireAuth);

router.post('/playlists/add', addSong) // adding songs
router.delete('/playlists/delete', deleteSong) //removing songs
router.get('/playlists/', getUserPlaylist) // fetching the playlist

export default router;