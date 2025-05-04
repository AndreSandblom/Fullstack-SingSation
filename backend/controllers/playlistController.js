import Playlist from "../models/Playlist.js";

const createPlaylist = async(req,res) => {
    try {
        const  {userId, name } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "UserID missing"});
        }

        const newPlaylist = new Playlist({
            user: userId,
            name,
            songs: []
        });

        await newPlaylist.save();
        res.status(201).json(newPlaylist);

    } catch (error) {
        res.status(500).json({message: "Failed to create playlist.", error})
    }
}

const addSong = async (req,res) => {
    try {
        const { listId } = req.params;
        const { songName, artist } = req.body;

        if (!songName || !artist ) {
            return res.status(400).json({message: "Missing SongName or Artist. "});
        }

        const updatePlaylist = await Playlist.findByIdAndUpdate(
            listId,
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
        const { listId } = req.params;
        const { songName, artist } = req.body;

        if (!songName || !artist ) {
            return res.status(400).json({message: "Missing SongName or Artist. "});
        }

        const updatePlaylist = await Playlist.findByIdAndUpdate(
            listId,
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

const getUserPlaylists = async (req,res) => {
    try {
        const { userId } = req.params;

        const allPlaylist = await Playlist.find({ user: userId });

        if (allPlaylist === 0) {
            res.status(404).json({ message: "No playlists found for this user."});
        }

        res.status(200).json(allPlaylist);
        
    } catch (error){
        res.status(500).json({message: "Failed to get user playlists.", error})
    }
}

// Double check if we are getting user or playlist id?? Importtant!!
const getPlaylistId = async (req, res) => {
    try {
        const { listId } = req.params;

        const userPlaylist = await Playlist.findById(listId)
        if (!userPlaylist) {
            return res.status(404).json({ message: "Playlist not found. "});
        }

        res.status(200).json(userPlaylist);

    } catch (error) {
        res.status(500).json({ message: "Failed to get playlist", error});
    }
}

export { createPlaylist, addSong, deleteSong, getPlaylistId, getUserPlaylists };