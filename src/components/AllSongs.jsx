import useMusic from "../hooks/useMusic"

const AllSongs = () => {

    const {allSongs, handlePlaySong, currentTrackIndex } = useMusic();

  return (
    <div className=''>
        <h2>All Songs ({allSongs.length})</h2>
        <div className="songs-grid">
            {
                allSongs.map((song, key) => (
                    <div key={song.id} 
                    onClick={() => handlePlaySong(song, key)}
                    className={`song-card ${currentTrackIndex === key ? "active" : ""}`} >
                        <div className="song-info">
                            <h3 className="song-title">{song.title}</h3>
                            <p className="song-artist">{song.title}</p>
                            <span className="song-duration">{song.duration}</span>
                        </div>

                        {/* Play Button */}
                        <div className="play-button">
                            {currentTrackIndex === key ? "🎶" : "▶️"}
                        </div>

                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default AllSongs