import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import AudioVisualizer from "../components/AudioVisualizer";
import "./Home.scss";
import { FaPlay, FaPause } from "react-icons/fa";

function Home() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [latestTrack, setLatestTrack] = useState(null);

  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setTimeout(() => {
        setIsPlayerVisible(false);
      }, 500);
    } else {
      setIsPlayerVisible(true);
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Autoplay failed:", err);
      }
    }
  };

  const handlePlayPauseCustom = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setIsPlayerVisible(true);
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

  // 👉 Fetch and sort tracks on load
  useEffect(() => {
    const fetchLatestTrack = async () => {
      try {
        const res = await axios.get("https://phu-backend.onrender.com/api/tracks"); // or /api/tracks if proxied
        const sorted = res.data.sort(
          (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
        );
        setLatestTrack(sorted[0]);
      } catch (err) {
        console.error("Failed to fetch tracks:", err);
      }
    };

    fetchLatestTrack();
  }, []);

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

      <div className="audio-header">
        <button className="play-toggle-btn" onClick={handlePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <h2>Latest Release</h2>
        {latestTrack && (
          <p className="track-meta">
            {latestTrack.title} — {latestTrack.artist}
          </p>
        )}
      </div>

      <audio
        ref={audioRef}
        src={latestTrack?.audioUrl || ""}
        crossOrigin="anonymous"
        controls={false}
      />

      {isPlayerVisible && (
        <div className="custom-controls visible">
          <button onClick={handlePlayPauseCustom} className="custom-play-btn">
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

// ⏱ Format time into mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default Home;
