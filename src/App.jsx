import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Releases from "./pages/Releases";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./assets/styles/main.scss";

function App() {
  const vantaRef = useRef(null);

  useEffect(() => {
    if (window.VANTA && window.VANTA.WAVES && window.THREE) {
      const effect = window.VANTA.WAVES({
        el: vantaRef.current,
        THREE: window.THREE,
        color: 0x111111,
        shininess: 50,
        waveHeight: 15,
        waveSpeed: 0.9,
        zoom: 1.0,
        backgroundColor: 0x000000,
      });

      return () => {
        if (effect) effect.destroy();
      };
    }
  }, []);

  return (
    <div ref={vantaRef} className="vanta-wrapper">
      <div className="layout">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/releases" element={<Releases />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
