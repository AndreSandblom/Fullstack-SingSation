const SALT_WORK_FACTOR = 10;
import bcrypt from "bcrypt";
import { Router } from "express";
const router = Router();
import User from "../models/User.js";

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(409).json({ message: "Username or email already taken" });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
});

export default router;
