import React, { useRef, useState } from "react";
import AudioVisualizer from "../components/AudioVisualizer";

function Home() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioUrl =
    "https://progressivehouseuniverse.s3.us-east-1.amazonaws.com/Khen_-_Sunflakes_Bronzed_Re-Edit_microCastle_Free_Download.mp3";

  return (
    <div className="home">
      <h1>Welcome to Progressive House Universe</h1>
      <p>Your source for deep, melodic house music.</p>

      <audio
        ref={audioRef}
        src={audioUrl}
        controls
        crossOrigin="anonymous"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => {
          console.error("Audio error", e);
          alert("❌ Failed to load audio. Check console.");
        }}
      />

      

      <AudioVisualizer audioRef={audioRef} isPlaying={isPlaying} />
    </div>
  );
}

export default Home;
