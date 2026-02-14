import { useState } from "react"

const songs = [
        {
            id: 1,
            title: "Keep You Away",
            artist: "EchoBR",
            url: "/songs/Keep You Away.wav",
            duration: "4:32",
        },
        {
            id: 2,
            title: "Breaching",
            artist: "EchoBR",
            url: "/songs/Breaching.wav",
            duration: "3:45",
        },
        {
            id: 3,
            title: "Forgotten Memories",
            artist: "EchoBR",
            url: "/songs/Forgotten Memories.wav",
            duration: "3:12",
        },
        {
            id: 4,
            title: "Nothing You Really Want",
            artist: "EchoBR",
            url: "/songs/nothing you really want.wav",
            duration: "2:58",
        },
        {
            id: 5,
            title: "Glacier Blue",
            artist: "EchoBR",
            url: "/songs/Glacier Blue.wav",
            duration: "3:28",
        },
        {
            id: 6,
            title: "In Love",
            artist: "EchoBR",
            url: "/songs/In Love.wav",
            duration: "3:15",
        },
        {
            id: 7,
            title: "Lemon Balm",
            artist: "EchoBR",
            url: "/songs/Lemon Balm.wav",
            duration: "3:42",
        },
        {
            id: 8,
            title: "Momentary Bliss",
            artist: "EchoBR",
            url: "/songs/Momentary Bliss.wav",
            duration: "2:45",
        },
];

const useMusic = () => {
  const [allSongs, setAllSongs] = useState(songs);
  // Current Track State
  const [currentTrack, setCurrentTrack] = useState(songs[0]);
  // Current Track Index
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  // Current Time State
  const [currentTime, setCurrentTime] = useState(0);
  // Current Duration State
  const [duration, setDuration] = useState(0);
  // Current Playing State
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to format time

  
  const handlePlaySong = (song, index) => {
        setCurrentTrack(song);
        setCurrentTrackIndex(index);
  }

  const nextTrack = () => {
        setCurrentTrackIndex((prev) => {
            /*

            The Simple Version:
            This code moves to the next song. When you reach the last song and press "next," it loops back to the first song instead of breaking.
            The "Wrap Around" Magic:
            Think of your songs like a circle of chairs:

            Song 0 → Song 1 → Song 2 → Song 3 → Song 4 → back to Song 0

            Here's what (prev + 1) % allSongs.length does:
            prev + 1 = "Go to the next song"
            % allSongs.length = "If you go past the last song, start over at the beginning"
            5 Songs:
            Currently at song 3 → (3 + 1) % 5 = 4 ✅ 
            Currently at song 4 → (4 + 1) % 5 = 0 ✅ 

            */
            const nextIndex = (prev + 1) % allSongs.length
            setCurrentTrack(allSongs[nextIndex]);
            return nextIndex;
        })
        
  }

  const prevTrack = () => {
    
        setCurrentTrackIndex((prev) => {
            const prevIndex = prev === 0 ? allSongs.length - 1 : prev - 1;
            setCurrentTrack(allSongs[prevIndex]);
            return prevIndex;
        })

  }

  const formatTime = (time) => {
    // Get Current Time of Song
    if(isNaN(time) || time === undefined) return "0:00"

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`

  }

  const play = () => {
    setIsPlaying(true);
  }

  const pause = () => {
    setIsPlaying(false);
  }

  return {
        allSongs, 
        handlePlaySong, 
        currentTrackIndex, 
        currentTrack, 
        currentTime, 
        setCurrentTime,
        formatTime,
        duration,
        setDuration,
        nextTrack,
        prevTrack,
        play,
        pause,
        isPlaying
    };
}

export default useMusic