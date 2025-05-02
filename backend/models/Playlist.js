const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    name: {type: String, default: 'My Playlist' },
    user: { type: Schema.Types.ObjectId, ref: "INSERT DARIO USER MODEL NAME HERE", required: true},
    songs: [
        {
            artist: { type: String, required: true},
            title: { type: String, required: true}
        }
    ]
});

module.exports = mongoose.model('Playlist', playlistSchema);