import dotenv from "dotenv";
import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// APP AND API ROUTES GOES HERE

connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connection to MongoDB Sucess.")

        const PORT = process.env.port || 5000;
        app.listen(PORT, () => console.log(`Server is running on ${PORT}.`))
    })
    .catch((err) => {
        console.error("MongoDB Connection Problem: ", err);
    });

// Routes

app.use("/api/users", userRoutes);

