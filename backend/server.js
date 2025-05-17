import dotenv from 'dotenv';
import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import userRoutes from './routes/userRoute.js';
import lyricsRouter from './routes/lyricsRoute.js';
import songRouter from './routes/songRoute.js';
import seedSongs from './data/songsData.js';
import playlistRoutes from './routes/playlistRoute.js';
import permissionRoutes from './routes/permissionRoute.js';

dotenv.config();

const app = express();

// Allow CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Session middleware.  This block needs to be before defining the routes.
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultsecret', //  It can be generated with the command: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    },
  })
);

// API ROUTES
app.use('/api/lyrics', lyricsRouter);
app.use('/api/songs', songRouter);
app.use('/api/users', userRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/permissions', permissionRoutes);

// SEED DATABASE IF NEEDED  (set to 'false' if not used and 'true' if you want to seed songs)
if (process.env.RUN_SEED === 'false') {
  seedSongs();
}

// SETUP FOR SERVING FRONTEND 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from frontend/dist
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Fallback route for SPA (serves index.html for unmatched routes)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// CONNECT TO DB AND START SERVER
connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connection to MongoDB Sucess.');

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server is running on ${PORT}.`));
  })
  .catch((err) => {
    console.error('MongoDB Connection Problem: ', err);
  });
