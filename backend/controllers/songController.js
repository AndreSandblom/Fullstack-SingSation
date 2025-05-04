const axios = require('axios');
const Song = require('../models/Song');

const getSongList = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    try {
    const total = await Song.countDocuments();
    const results = await Song.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.json({
      page,
      limit,
      total,
      results
    });
  } catch (error) {
    console.error('Error fetching songs from DB:', error);
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
};

  module.exports = { getSongList };
  