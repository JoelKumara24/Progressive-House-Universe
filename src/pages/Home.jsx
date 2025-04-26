import React, { useRef, useState, useEffect } from "react";
import AudioVisualizer from "../components/AudioVisualizer";
import "./Home.scss";
import { FaPlay, FaPause } from "react-icons/fa";


function Home() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const audioUrl = "https://progressivehouseuniverse.s3.us-east-1.amazonaws.com/Khen_-_Sunflakes_Bronzed_Re-Edit_microCastle_Free_Download.mp3";

  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);

      // Fade out smoothly
      setTimeout(() => {
        setIsPlayerVisible(false);
      }, 500); // match CSS fade-out duration
    } else {
      setIsPlayerVisible(true); // show player first
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Autoplay failed:", err);
      }
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = (e.target.value / 100) * duration;
    audio.currentTime = seekTime;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  return (
    <div className="home">

<div className="hero">
  <h1>Progressive House Universe</h1>
  <p>Deep. Melodic. Timeless.</p>
</div>

      {/* Top Header */}
      <div className="audio-header">
        <button className="play-toggle-btn" onClick={handlePlayPause}>
        {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <h2>Latest Release</h2>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        crossOrigin="anonymous"
        controls={false} // Hide ugly browser controls
      />

      {/* Custom Controls */}
      {isPlayerVisible && (
        <div className={`custom-controls ${isPlaying ? "visible" : "hidden"}`}>
          <button onClick={handlePlayPause} className="custom-play-btn">
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

          <span className="current-time">{formatTime(currentTime)}</span> / <span className="duration">{formatTime(duration)}</span>
        </div>
      )}

      {/* Visualizer */}
      <AudioVisualizer audioRef={audioRef} isPlaying={isPlaying} />
    </div>
  );
}

// Helper to format time
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default Home;
