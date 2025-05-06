import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    name: {type: String, default: 'My Favourites' },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    songs: [
        {
            artist: { type: String, required: true},
            title: { type: String, required: true}
        }
    ]
});

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;