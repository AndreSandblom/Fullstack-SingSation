import { Router } from "express";
const router = Router();
import { getLyrics, getSongList } from "../controllers/lyricsController.js";

router.get('/lyrics/:artist/:title', getLyrics);
router.get('/songs', getSongList);

export default router;