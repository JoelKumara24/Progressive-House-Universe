import { useState } from "react";
import "./About.scss";

function About() {
  const [showHeritage, setShowHeritage] = useState(false);

  const toggleHeritage = () => {
    setShowHeritage((prev) => !prev);
  };

  return (
    <div className="about">
      
      

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          At Progressive House Universe we curate the genre’s roots while spotlighting the future. From exclusive mixtapes to emerging talents and updates on the genre’s global journey. This is your space to explore and discover the timless spirit of Progressive House
        </p>
      </section>

      {/* --- Heritage Section --- */}
      <section className="heritage">
        <div className="heritage-header" onClick={toggleHeritage}>
          <h2>Heritage {showHeritage ? "▲" : "▼"}</h2>
        </div>
        {showHeritage && (
          <p className="heritage-content">
            The story of Progressive House begins in the early 1990s in the UK. As electronic music was booming in clubs across Europe, artists and DJs began experimenting with deeper, more layered sounds. This new style didn’t rely on fast-paced energy alone; it told stories, evolved slowly, and created a more immersive experience for listeners. The term “Progressive” was coined to describe its constantly unfolding nature. Unlike traditional house music, it wasn’t just about dancing, it was about feeling something deeper.

            The pioneers who shaped Progressive House were Leftfield, Sasha & John Digweed. The legendary duo Sasha & John Digweed are often credited as the godfathers of the genre. Their legendary “Northern Exposure” mixes showcased a blend of dreamy melodies, atmospheric pads, and seamless transitions. Around the same time, Hernan Cattáneo brought a warm, melodic touch to the scene, especially in South America. Other notable names like Nick Warren, Dave Seaman, and Danny Howells helped expand and define the sound globally.

            As the years rolled on, new generations of producers, including Eric Prydz, Guy J, Jeremy Olander, Yotto, and Subandrio, infused the genre with modern energy, keeping it relevant and evolving without losing its emotional core.

            What sets Progressive House apart from other electronic music is that it’s about mood and progression rather than quick climaxes. The layered soundscapes, emotional resonance, and smooth transitions are key elements that give Progressive House a vast uplift compared to other genres.

            Progressive House isn’t just a music genre — it’s a journey. It’s the subtle build-up, the evolving melodies, the emotional highs, and the hypnotic lows that pull listeners into a different state of mind.
          </p>
        )}
      </section>
      {/* --- End Heritage Section --- */}

      <section className="team">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <h3>Vinith</h3>
            <p className="role">Founder & Curator</p>
            <p>
              Vinith is a lifelong fan of progressive house, with a passion for discovering new talent and organizing unforgettable events.
            </p>
          </div>
          <div className="team-member">
            <h3>Jova</h3>
            <p className="role">Professor</p>
            <p>
              Jova writes engaging stories about artists and events, bringing the PHU community closer through his words.
            </p>
          </div>
          <div className="team-member">
            <h3>Joel</h3>
            <p className="role">Techie</p>
            <p>
              Michael ensures that every PHU website and webapps runs smoothly, creating magical digital experiences for fans and artists alike.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
