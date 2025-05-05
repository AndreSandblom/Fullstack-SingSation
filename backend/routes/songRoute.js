import express from 'express';
import { getSongList } from '../controllers/songController.js';

const songRouter = express.Router();

//GET /api/songs
songRouter.get('/', getSongList);

export default songRouter;