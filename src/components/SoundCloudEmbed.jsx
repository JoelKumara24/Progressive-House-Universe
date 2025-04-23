// src/components/SoundCloudEmbed.jsx
import './SoundCloudEmbed.scss';

function SoundCloudEmbed({ title, artist, trackUrl, embedUrl }) {
  return (
    <div className="sc-embed-card">
      <h2 className="sc-title">🎧 {title}</h2>
      <div className="sc-iframe-wrapper">
        <iframe
          width="100%"
          height="200"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          title={title}
          src={embedUrl}
        ></iframe>
      </div>
      <div className="sc-caption">
        <a href={`https://soundcloud.com/${artist}`} target="_blank" rel="noreferrer">
          {artist}
        </a>
        {' · '}
        <a href={trackUrl} target="_blank" rel="noreferrer">
          {title}
        </a>
      </div>
    </div>
  );
}

export default SoundCloudEmbed;
