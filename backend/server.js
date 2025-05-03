const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
require('dotenv').config();
//plugin' in the lyrics route
const lyricsRoute = require('./routes/lyricsRoute');

app.use(cors());
app.use(express.json());


// APP AND API ROUTES GOES HERE
app.use('/api', lyricsRoute);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connection to MongoDB Sucess.")

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => console.log(`Server is running on ${PORT}.`))
    })
    .catch((err) => {
        console.error("MongoDB Connection Problem: ", err);
    });