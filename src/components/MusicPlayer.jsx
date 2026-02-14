import { useEffect, useRef } from "react";
import useMusic from "../hooks/useMusic"
import { Pause, Play, StepBack, StepForward } from "lucide-react";

const MusicPlayer = () => {
    // What states will we have for the player? Play, Pause, CurrentIndexOfTrack, NextSong, PreviousSong
    const {
        currentTrack, 
        formatTime, 
        currentTime, 
        setCurrentTime, 
        duration, 
        setDuration,
        nextTrack,
        prevTrack,
        isPlaying,
        pause,
        play
    } = useMusic();
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;
        if(isPlaying){
            audio.play().catch((err) => console.error(err));
        }else{
            audio.pause();
        }
    }, [isPlaying])


    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;
        // Run logic, whenever the metadata is loaded
        // To ensure the audio ref has a duration
        const handleLoadedMetaData = () => {
            setDuration(audio.duration);
        }

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        }

        const handleEnded = () => {
            nextTrack()
        }

        // Subscribe to an event listener

        audio.addEventListener("loadedmetadata", handleLoadedMetaData);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", handleEnded);

        audio.load();

        // Clean up subscription from event listener for memory management

        return () => {
            audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("ended", handleEnded);
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
        <div className="controls">


            <button onClick={prevTrack} className="control-btn">
                <StepBack />
            </button>
            <button 
            onClick={() => (isPlaying ? pause() : play())}
            className="control-btn play-btn">
                {
                    isPlaying ? <Pause/> : <Play />
                }
            </button>
            <button onClick={nextTrack} className="control-btn">
                <StepForward />
            </button>
        </div>


    </div>
  )
}

export default MusicPlayer