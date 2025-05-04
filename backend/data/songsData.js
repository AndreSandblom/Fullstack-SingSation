require('dotenv').config();
const mongoose = require('mongoose');
const Song = require('../models/Song');

const songs = [
  { artist: "Adele", title: "Hello" },
  { artist: "Coldplay", title: "Adventure of a Lifetime" },
  { artist: "The Beatles", title: "Hey Jude" },
  { artist: "Ed Sheeran", title: "Shape of You" },
  { artist: "Taylor Swift", title: "Lover" },
  { artist: "Queen", title: "Bohemian Rhapsody" },
  { artist: "Linkin Park", title: "Numb" },
  { artist: "Eminem", title: "Lose Yourself" },
  { artist: "Katy Perry", title: "Roar" },
  { artist: "Drake", title: "Hotline Bling" }
];

async function seedSongs() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    await Song.deleteMany({});
    console.log('Cleared existing songs');

    await Song.insertMany(songs);
    console.log('Seeded songs successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding songs:', error);
    process.exit(1);
  }
}

module.exports = seedSongs;
  