import React, { useRef, useState, useEffect } from "react";
import AudioVisualizer from "../components/AudioVisualizer";
import "./Releases.scss";
import { FaPlay, FaPause } from "react-icons/fa";

// Updated tracks array with unique URLs (placeholders for now)
// Updated tracks array with artist and releaseDate
const tracks = [
  {
    title: "Sunflakes (Bronzed Re-Edit)",
    artist: "Khen",
    releaseDate: "Jan 15, 2023",
    url: "https://progressivehouseuniverse.s3.us-east-1.amazonaws.com/Khen_-_Sunflakes_Bronzed_Re-Edit_microCastle_Free_Download.mp3",
  },
  {
    title: "Live Set Sample 4",
    artist: "Hernan Cattaneo",
    releaseDate: "Mar 22, 2023",
    url: "https://progressivehouseuniverse.s3.us-east-1.amazonaws.com/T%C3%BA_Attair_Civic_Outro_Version.mp3",
  },
  {
    title: "Another Riff 4",
    artist: "Yotto",
    releaseDate: "May 10, 2023",
    url: "https://example.com/yotto-another-riff-4.mp3", // Replace with actual URL
  },
  {
    title: "Live Set Sample 3",
    artist: "Hernan Cattaneo",
    releaseDate: "Jul 18, 2022",
    url: "https://example.com/hernan-cattaneo-live-set-sample-3.mp3", // Replace with actual URL
  },
  {
    title: "Another Riff 3",
    artist: "Yotto",
    releaseDate: "Sep 25, 2022",
    url: "https://example.com/yotto-another-riff-3.mp3", // Replace with actual URL
  },
  {
    title: "Live Set Sample 2",
    artist: "Hernan Cattaneo",
    releaseDate: "Nov 30, 2021",
    url: "https://example.com/hernan-cattaneo-live-set-sample-2.mp3", // Replace with actual URL
  },
  {
    title: "Another Riff 2",
    artist: "Yotto",
    releaseDate: "Feb 14, 2021",
    url: "https://example.com/yotto-another-riff-2.mp3", // Replace with actual URL
  },
];
function Releases() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = async (track) => {
    const audio = audioRef.current;
    if (!audio) return;

    console.log(
      "handlePlayPause called for track:",
      track.title,
      "isPlaying:",
      isPlaying,
      "currentTrack:",
      currentTrack?.title
    );

    // If the clicked track is the currently playing track and it's playing, pause it
    if (currentTrack?.title === track.title && isPlaying) {
      console.log("Pausing current track:", track.title);
      audio.pause();
      setIsPlaying(false);
      setCurrentTrack(null);
    } else {
      // If another track is playing, stop it first
      if (isPlaying) {
        console.log("Stopping currently playing track:", currentTrack?.title);
        audio.pause();
        setIsPlaying(false);
      }

      // Set and play the new track
      console.log("Playing new track:", track.title);
      setCurrentTrack(track);
      audio.src = track.url;
      try {
        await audio.play();
        setIsPlaying(true);
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
            <span className="track-title">{track.title}</span>
          </div>
        ))}
      </div>

      <audio ref={audioRef} controls={false} crossOrigin="anonymous" />

      {currentTrack && (
        <div className={`custom-controls ${isPlaying ? "visible" : "hidden"}`}>
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