import { Router } from "express";
import { getLyrics } from "../controllers/lyricsController.js";

const lyricsRouter = Router();

lyricsRouter.get('/:artist/:title', getLyrics);

export default lyricsRouter;