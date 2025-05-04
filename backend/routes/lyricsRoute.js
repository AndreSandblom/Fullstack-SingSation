import { Router } from "express";
const router = Router();
import { getLyrics, getSongList } from "../controllers/lyricsController.js";

router.get('/:artist/:title', getLyrics);

export default router;