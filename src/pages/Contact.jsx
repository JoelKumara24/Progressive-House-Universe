import React from "react";
import "./Contact.scss";
import { FaInstagram, FaSoundcloud, FaSpotify, FaYoutube } from "react-icons/fa";

function Contact() {
  return (
    <div className="contact">
      <h1>Contact</h1>
      <hr />

      <div className="contact-sections">
        {/* Left */}
        <div className="contact-group">
          <h2>Europe, Africa, Asia & Australia</h2>
          <p>Creative Artists Agency</p>
          <p>5th Floor, 3 Shortlands</p>
          <p>Hammersmith, London W6 8DA</p>
          <p>United Kingdom</p>
          <p>Telephone: +44 20 8846-3000</p>
          <p>Fax: +44 20 8846-3090</p>
          <p>Email: jennifer.hammel@caa.com</p>
        </div>

        {/* Right */}
        <div className="contact-group">
          <h2>North America</h2>
          <p>Wright Bookings</p>
          <p>Hamilton Wright</p>
          <p>Online: WrightBookings.com</p>

          <h2>Central and South America</h2>
          <p>Bookings: Cruz Pereyra Lucena</p>
        </div>
      </div>

      {/* Social Icons */}
      <div className="social-icons">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://soundcloud.com" target="_blank" rel="noopener noreferrer"><FaSoundcloud /></a>
        <a href="https://spotify.com" target="_blank" rel="noopener noreferrer"><FaSpotify /></a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
      </div>

     
    </div>
  );
}

export default Contact;
