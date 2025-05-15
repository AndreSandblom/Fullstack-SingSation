import User from "../models/User.js";
import Permission from "../models/Permission.js";

const getPermissionsByUsername = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { username } = req.params;

  if (!username) {
    return res
      .status(400)
      .json({ message: "Username query parameter is required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const permissions = await Permission.findOne({ user: user._id });
    if (!permissions) {
      return res
        .status(404)
        .json({ message: "Permissions not found for user" });
    }

    res.status(200).json(permissions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getPermissionsByUserId = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const permissions = await Permission.findOne({ user: user._id });
    if (!permissions) {
      return res
        .status(404)
        .json({ message: "Permissions not found for user" });
    }

    res.status(200).json(permissions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updatePermissions = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const {
    username,
    canSearchSongs,
    canAddSongsToPlaylist,
    canDeleteSongsFromPlaylist,
  } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const permission = await Permission.findOne({ user: user._id });
    if (!permission) {
      return res
        .status(404)
        .json({ message: "Permissions not found for user" });
    }

    if (canSearchSongs !== undefined)
      permission.canSearchSongs = canSearchSongs;
    if (canAddSongsToPlaylist !== undefined)
      permission.canAddSongsToPlaylist = canAddSongsToPlaylist;
    if (canDeleteSongsFromPlaylist !== undefined)
      permission.canDeleteSongsFromPlaylist = canDeleteSongsFromPlaylist;

    await permission.save();
    res.status(200).json({ message: "Permissions updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export { getPermissionsByUsername, getPermissionsByUserId, updatePermissions };