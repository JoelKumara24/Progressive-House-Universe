import React, { useRef, useState, useEffect } from "react";
import "./CustomPlayer.scss";


function CustomPlayer({ url, title, artist }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds) =>
    new Date(seconds * 1000).toISOString().substr(14, 5);

  useEffect(() => {
    const audio = audioRef.current;
    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <div className="custom-player">
      <audio ref={audioRef} src={url} preload="metadata" />
      <div className="player-ui">
        <button className="play-btn" onClick={togglePlay}>
          {isPlaying ? "⏸" : "▶️"}
        </button>
        <div className="info">
          <strong>{title}</strong> <span>by {artist}</span>
          <div className="progress-bar">
            <input
              type="range"
              min={0}
              max={duration}
              value={progress}
              step="0.1"
              onChange={(e) => {
                audioRef.current.currentTime = e.target.value;
                setProgress(e.target.value);
              }}
            />
            <div className="time">
              {formatTime(progress)} / {formatTime(duration || 0)}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default CustomPlayer;
