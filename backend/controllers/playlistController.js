import Playlist from "../models/Playlist.js";

const addSong = async (req,res) => {
    try {
        const { songName, artist } = req.body;
        const userId = req.session.userId;

        if (!songName || !artist ) {
            return res.status(400).json({message: "Missing SongName or Artist. "});
        }

        const updatePlaylist = await Playlist.findOneAndUpdate(
            { user: userId}, 
            {$push: {songs: { title: songName, artist } } },
            { new: true }
        );

        if (!updatePlaylist) {
            return res.status(404).json({ message: "Playlist not found." });
        }

        res.status(200).json(updatePlaylist);
    } catch (error) {
        res.status(500).json({ message: "Failed to add song", error});
    }
};


const deleteSong = async (req,res) => {
    try {
        const { songName, artist } = req.body;
        const userId = req.session.userId; 

        if (!songName || !artist ) {
            return res.status(400).json({message: "Missing SongName or Artist. "});
        }

        const updatePlaylist = await Playlist.findOneAndUpdate(
            { user: userId },
            {$pull: {songs: { title: songName, artist } } },
            { new: true }
        );

        if (!updatePlaylist) {
            return res.status(404).json({ message: "Playlist not found." });
        }

        res.status(200).json(updatePlaylist);
    } catch (error) {
        res.status(500).json({ message: "Failed to delete song", error});
    }
}

const getUserPlaylist = async (req,res) => {
    try {
        const userId = req.session.userId;

        const userPlaylist = await Playlist.findOne({ user: userId });

        if (!userPlaylist) {
            return res.status(404).json({ message: "Playlists not found."});
        }

        res.status(200).json(userPlaylist);
        
    } catch (error){
        res.status(500).json({message: "Failed to get user playlist.", error})
    }
}

const getAverageSongsPerPlaylist = async (req, res) => {
  try {
    const result = await Playlist.aggregate([
      {
        $project: {
          songCount: { $size: "$songs" } // count number of songs in each playlist
        }
      },
      {
        $group: {
          _id: null,
          averageSongs: { $avg: "$songCount" }
        }
      }
    ]);

    const average = result[0]?.averageSongs ?? 0;

    res.status(200).json({ averageSongsPerPlaylist: average });
  } catch (err) {
    res.status(500).json({ message: 'Failed to calculate average songs per playlist' });
  }
};


export { addSong, deleteSong, getUserPlaylist, getAverageSongsPerPlaylist };