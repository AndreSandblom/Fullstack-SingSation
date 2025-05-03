import dotenv from "dotenv";
import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import session from "express-session";
import userRoutes from "./routes/userRoute.js";

dotenv.config();

const app = express();
require('dotenv').config();
//plugin' in the lyrics route
const lyricsRoute = require('./routes/lyricsRoute');

app.use(cors());
app.use(express.json());


// APP AND API ROUTES GOES HERE
app.use('/api', lyricsRoute);

connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connection to MongoDB Sucess.")

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => console.log(`Server is running on ${PORT}.`))
    })
    .catch((err) => {
        console.error("MongoDB Connection Problem: ", err);
    });

// Use of session. This block needs to be before defining the routes.
app.use(
    session({
      secret: process.env.SESSION_SECRET, // It can be generated with the command: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 3600000, // 1 hour
      },
    })
  );

// Routes

app.use("/api/users", userRoutes);

