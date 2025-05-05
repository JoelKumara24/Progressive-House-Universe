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
          <h2>Europe, Italia & Sri Lanka </h2>
          <p>PHU Agency</p>
          
          <p>Milan</p>
          <p>Italy</p>
          <p>Telephone: +393513565584</p>
          <p>Email: progressivehouseitalia@gmail.com</p>
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
