import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function AudioVisualizer({ audioRef, isPlaying }) {
  const canvasRef = useRef();
  const animationRef = useRef();
  const audioContextRef = useRef(null);
  const analyserRef = useRef();
  const sourceRef = useRef();

  useEffect(() => {
    if (!isPlaying || !audioRef.current || !canvasRef.current) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!sourceRef.current) {
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
    }

    const analyser = audioContextRef.current.createAnalyser();
    analyser.fftSize = 256;
    sourceRef.current.connect(analyser);
    analyser.connect(audioContextRef.current.destination);
    analyserRef.current = analyser;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 1.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i];
        ctx.fillStyle = "#bbb";
        ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
        x += barWidth + 1;
      }
    };

    draw();
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, audioRef]);

  const canvasStyle = {
    position: "fixed",
    bottom: "60px",
    left: 0,
    width: "100%",
    height: "80px",
    background: "transparent",
    zIndex: 1000,
    pointerEvents: "none",
    opacity: isPlaying ? 1 : 0,
    transition: "opacity 0.6s ease-in-out",
  };

  return createPortal(
    <canvas ref={canvasRef} width={window.innerWidth} height={80} style={canvasStyle} />,
    document.getElementById("visualizer-root")
  );
}

export default AudioVisualizer;