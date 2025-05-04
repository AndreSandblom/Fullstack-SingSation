const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
require('dotenv').config();
//plugin' in the lyrics and song route
const lyricsRoute = require('./routes/lyricsRoute');
const songRoute = require('./routes/songRoute');
const seedSongs = require('./data/songsData');

app.use(cors());
app.use(express.json());


// APP AND API ROUTES GOES HERE
app.use('/api/lyrics', lyricsRoute);
app.use('/api/songs', songRoute);

//one-time database seed (set to 'false' if not used and 'true' if you want to seed songs)
if (process.env.RUN_SEED === 'false') {
    //call seedSongs and exit
    seedSongs();  
  }

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connection to MongoDB Sucess.")

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => console.log(`Server is running on ${PORT}.`))
    })
    .catch((err) => {
        console.error("MongoDB Connection Problem: ", err);
    });