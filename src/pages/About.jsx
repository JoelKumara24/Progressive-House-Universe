
import "./About.scss";
function About() {
  return (
    <div className="about">
      <h1>About Us</h1>
      <p className="intro">
        Progressive House Universe is a brand focused on melodic house culture — from artist stories to event vibes.
      </p>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          At Progressive House Universe (PHU), we aim to celebrate and promote the melodic house genre by connecting artists, fans, and events. We curate the best tracks, share inspiring stories, and bring the community together through immersive experiences. Our goal is to create a space where the beats of progressive house resonate with everyone.
        </p>
      </section>

      <section className="team">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <h3>Alex Carter</h3>
            <p className="role">Founder & Curator</p>
            <p>
              Alex is a lifelong fan of progressive house, with a passion for discovering new talent and organizing unforgettable events.
            </p>
          </div>
          <div className="team-member">
            <h3>Sophia Evans</h3>
            <p className="role">Content Creator</p>
            <p>
              Sophia writes engaging stories about artists and events, bringing the PHU community closer through her words.
            </p>
          </div>
          <div className="team-member">
            <h3>Michael Reed</h3>
            <p className="role">Event Coordinator</p>
            <p>
              Michael ensures that every PHU event runs smoothly, creating magical experiences for fans and artists alike.
            </p>
          </div>
        </div>
      </section>

      <section className="contact">
        <h2>Get in Touch</h2>
        <p>
          Have questions or want to collaborate? Reach out to us at{" "}
          <a href="mailto:contact@progressivehouseuniverse.com">contact@progressivehouseuniverse.com</a>.
        </p>
        <p>
          Follow us on social media for the latest updates:
          <div className="social-links">
            <a href="https://instagram.com/phu_official" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://twitter.com/phu_official" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://facebook.com/phu.official" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </p>
      </section>
    </div>
  );
}

export default About;