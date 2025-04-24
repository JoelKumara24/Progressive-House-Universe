import './Home.scss';
import SoundCloudEmbed from '../components/SoundCloudEmbed';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Progressive House Universe</h1>
      <p>Your source for deep, melodic house music.</p>

      <SoundCloudEmbed
  title="3POLAR - CARIÑITO (DnB Edit)"
  artist="3polar"
  trackUrl="https://soundcloud.com/3polar/3polar-carinito-dnb-edit"
  embedUrl="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2079525054&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=false"
/>
      
    </div>
  );
}

export default Home;
