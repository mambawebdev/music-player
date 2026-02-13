import { useEffect, useRef } from "react";
import useMusic from "../hooks/useMusic"

const MusicPlayer = () => {
    // What states will we have for the player? Play, Pause, CurrentIndexOfTrack, NextSong, PreviousSong
    const {currentTrack, formatTime, currentTime, setCurrentTime, duration, setDuration} = useMusic();
    const audioRef = useRef(null);


    useEffect(() => {
        const audio = audioRef.current;
        console.log("audioRef.current.duration", Number(audioRef.current?.duration))
        if(!audio) return;
        // Run logic, whenever the metadata is loaded
        // To ensure the audio ref has a duration
        const handleLoadedMetaData = () => {
            setDuration(audio.duration);
        }

        const handleTimeUpdate = () => {

        }

        const handleEnd = () => {

        }

        // Subscribe to an event listener

        audio.addEventListener("loadedmetadata", handleLoadedMetaData);

        audio.load();

        // Clean up subscription from event listener for memory management

        return () => {
            audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
        }

    }, [setDuration, setCurrentTime, currentTrack])

    console.log(currentTrack)
  return (
    <div className='music-player'>
        <audio ref={audioRef} 
        preload="metadata"
        src={currentTrack.url}
        />
        <div className="track-info">
            <h3 className="track-title">{currentTrack.title}</h3>
            <p className="track-artist">{currentTrack.artist}</p>
        </div>
        {/* Tracking progress of song */}

        <div className="progress-container">
            <span className="time">{formatTime(currentTime)}</span>
            <input 
                type="range" 
                min={0} 
                max={duration || 0} 
                step="0.1"
                value={currentTime || 0}
                className="progress-bar"        
            />
            <span className="time">{formatTime(duration)}</span>
            
        </div>
    </div>
  )
}

export default MusicPlayer