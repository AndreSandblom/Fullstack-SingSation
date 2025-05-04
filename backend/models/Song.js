import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  artist: { type: String, required: true },
  title: { type: String, required: true }
});

export default mongoose.model('Song', songSchema);


