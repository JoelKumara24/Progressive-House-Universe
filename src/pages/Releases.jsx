import React, { useRef, useState, useEffect } from "react";
import AudioVisualizer from "../components/AudioVisualizer";
import "./Releases.scss";
import { FaPlay, FaPause } from "react-icons/fa";
import axios from 'axios';


// Updated tracks array with unique URLs (placeholders for now)
// Updated tracks array with artist and releaseDate


function Releases() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const [tracks, setTracks] = useState([]);
useEffect(() => {
  const fetchTracks = async () => {
    try {
      const res = await axios.get('https://phu-backend.onrender.com/api/tracks'); // or '/api/tracks' if using Vite proxy
      setTracks(res.data);
    } catch (err) {
      console.error("Error fetching tracks:", err);
    }
  };

  fetchTracks();
}, []);


  const handlePlayPause = async (track) => {
    const audio = audioRef.current;
    if (!audio) return;
  
    if (currentTrack?.title === track.title && isPlaying) {
      // Pause current track
      audio.pause();
      setIsPlaying(false);
      // Keep player visible
    } else {
      // If another track is playing, stop it
      if (isPlaying && currentTrack?.title !== track.title) {
        audio.pause();
        setIsPlaying(false);
      }
  
      // Only assign new src if switching tracks
      if (currentTrack?.title !== track.title) {
        audio.src = track.audioUrl; // not track.url

        setCurrentTrack(track);
      }
  
      try {
        await audio.play();
        setIsPlaying(true);
        setIsPlayerVisible(true);
      } catch (err) {
        console.error("Autoplay failed:", err);
        setIsPlaying(false);
        setCurrentTrack(null);
      }
    }
  };
  

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = (e.target.value / 100) * duration;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", () => {
        console.log("Track ended:", currentTrack?.title);
        setIsPlaying(false);
setCurrentTrack(null);
setIsPlayerVisible(false); // ✅ hide when track ends

      });
      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", () => {});
      };
    }
  }, []);

  useEffect(() => {
    console.log("State updated - isPlaying:", isPlaying, "currentTrack:", currentTrack?.title);
  }, [isPlaying, currentTrack]);

  return (
    <div className="releases">
      <h1>Releases</h1>
      <p>Discover our latest tracks and curated melodic house drops.</p>

      <div className="track-list">
        {tracks.map((track) => (
          <div key={track.title} className="track-item">
            <button onClick={() => handlePlayPause(track)} className="track-play-btn">
              {isPlaying && currentTrack?.title === track.title ? <FaPause /> : <FaPlay />}
            </button>
            <div className="track-info">
  <span className="track-title">{track.title}</span>
  <span className="track-meta">
    {track.artist} • {track.releaseDate}
  </span>
</div>


          </div>
        ))}
      </div>

      <audio ref={audioRef} controls={false} crossOrigin="anonymous" />

      {isPlayerVisible && (
  <div className="custom-controls visible">

          <button onClick={() => handlePlayPause(currentTrack)} className="custom-play-btn">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            className="custom-progress-bar"
          />

          <span className="current-time">{formatTime(currentTime)}</span> /{" "}
          <span className="duration">{formatTime(duration)}</span>
        </div>
      )}

      <AudioVisualizer audioRef={audioRef} isPlaying={isPlaying} />
    </div>
  );
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default Releases;