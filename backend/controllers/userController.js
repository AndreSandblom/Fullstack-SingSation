import User from "../models/User.js";
import Playlist from "../models/Playlist.js";
const SALT_WORK_FACTOR = 10;
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
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

  // Creating the playlist when the user is created. Making sure 1 to 1.
  const newPlaylist = new Playlist({
    user: newUser._id,
    songs: []
  })

  
  await newUser.save();
  await newPlaylist.save();
  res.status(201).json({ message: "User registered successfully" });
}

const getUserProfile = async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ username: user.username, email: user.email });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
}

const updateEmailUsername = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { username, email } = req.body;

  if (!username && !email) {
    return res.status(400).json({ message: "No data to update" });
  }

  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the new username or email is already taken
    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }
      user.username = username;
    }

    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already taken" });
      }
      user.email = email;
    }

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

const updatePassword = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Both current and new passwords are required" });
  }

  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, SALT_WORK_FACTOR);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.session.userId = user._id;
  res.status(200).json({ message: "Login successful" });
}

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to log out" });
      }
      res.status(200).json({ message: "Logout successful" });
    });
}

export { registerUser, getUserProfile, updateEmailUsername, updatePassword, loginUser, logoutUser };