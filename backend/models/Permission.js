import { Schema, model, Types } from "mongoose";

const PermissionSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // One permission record per user
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  canSearchSongs: {
    type: Boolean,
    default: true,
  },
  canAddSongsToPlaylist: {
    type: Boolean,
    default: true,
  },
  canDeleteSongsFromPlaylist: {
    type: Boolean,
    default: true,
  },
});

export default model("Permission", PermissionSchema);