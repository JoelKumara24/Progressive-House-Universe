import './Home.scss';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Progressive House Universe</h1>
      <p>Your source for deep, melodic house music.</p>

      <div className="blog-preview-section">
        <h2>Latest Posts</h2>
        <div className="blog-cards">
          <div className="blog-card">
            <h3>🌌 Melodic Vibes of 2025</h3>
            <p>A roundup of the most hypnotic melodic house releases this year.</p>
            <a href="/blog">Read More →</a>
          </div>

          <div className="blog-card">
            <h3>🎧 Behind the Decks: Local PHU DJs</h3>
            <p>We caught up with the underground heroes of the PHU movement.</p>
            <a href="/blog">Read More →</a>
          </div>

          <div className="blog-card">
            <h3>🔥 Top 5 Progressive House Sets</h3>
            <p>Our team’s handpicked live sets you need in your playlist.</p>
            <a href="/blog">Read More →</a>
          </div>
        </div>

      </div>
      <div className="soundcloud-section">
        <h2>🎧 Latest Drop</h2>
        <iframe
          width="100%"
          height="300"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          title="3POLAR - CARIÑITO"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2079525054&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
        ></iframe>
        <div className="soundcloud-caption">
          <a
            href="https://soundcloud.com/3polar"
            title="3POLAR"
            target="_blank"
            rel="noreferrer"
          >
            3POLAR
          </a>{' '}
          ·{' '}
          <a
            href="https://soundcloud.com/3polar/3polar-carinito-dnb-edit"
            title="3POLAR - CARIÑITO (DnB Edit)"
            target="_blank"
            rel="noreferrer"
          >
            3POLAR - CARIÑITO (DnB Edit)
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
