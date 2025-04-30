const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());


// APP AND API ROUTES GOES HERE

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connection to MongoDB Sucess.")

        const PORT = process.env.port || 5000;
        app.listen(PORT, () => console.log(`Server is running on ${PORT}.`))
    })
    .catch((err) => {
        console.error("MongoDB Connection Problem: ", err);
    });