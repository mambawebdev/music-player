import { useEffect, useRef } from "react";
import useMusic from "../hooks/useMusic"
import { Pause, Play, StepBack, StepForward, Volume } from "lucide-react";

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
        play,
        volume,
        setVolume
    } = useMusic();

    const audioRef = useRef(null);


    const handleTimeChange = (e) => {
        const audio = audioRef.current;
        const newTime = parseFloat(e.target.value);
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    }

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    }



    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;
        audio.volume = volume;
    }, [volume])

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

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

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
                onChange={handleTimeChange}       
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

        {/* Volume Container */}
        <div className="volume-container">
            <div className="volume-icon">
                <Volume/>
            </div>
            <input 
            onChange={handleVolumeChange}
            value={volume}
            type="range" 
            min={0} 
            max={1} 
            step={0.1} 
            style={{"--progress": `${progressPercentage}%`}}
            className="volume-bar" />
        </div>

    </div>
  )
}

export default MusicPlayer