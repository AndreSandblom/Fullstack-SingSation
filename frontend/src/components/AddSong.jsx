import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddToPlaylist = ({ songName, artist }) => {
    const [ loading, setLoading] = useState(false);

    const handleAddToPlaylist = async () => {
        try {
            setLoading(true);
            await axios.post('/api/playlists/add', { songName, artist });
            toast.success(`"${songName}" was added to your Favourites.`);
        } catch (error) {
            console.error('Add song failed', error);
            toast.error('Could not add song.')
        }finally{
            setLoading(false);
        }
    };

    return (
        <button
        onClick={handleAddToPlaylist}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded transition disabled:opacity-50"
        >
            {loading ? 'Adding ...' : 'Add to Favourites'}
        </button>
    );
};

export default AddToPlaylist;