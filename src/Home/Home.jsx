import React from 'react';
import profilePic from '../assets/profile.jpg';

const Home = () => (
  <section id="home" className="section home-section">
    <div className="home-content">
      <img
        src={profilePic}
        alt="Profile"
        className="home-profile"
      />
      <h1 className="home-title">Hello, I'm Mithuusan Kirupananthan</h1>
      <h2 className="home-subtitle">Aspiring Software Engineer</h2>
      <p className="home-desc">
        Welcome! I’m passionate about building web applications, solving problems, and learning new technologies. Explore my portfolio to see my experience and projects.
      </p>
      <div className="home-buttons">
        <a
          href="https://github.com/MithuusanK"
          target="_blank"
          rel="noopener noreferrer"
          className="home-btn"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/mithuusan-kirupananthan-9b92261a5/"
          target="_blank"
          rel="noopener noreferrer"
          className="home-btn"
        >
          LinkedIn
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="home-btn"
        >
          Resume
        </a>
      </div>
    </div>
  </section>
);

export default Home;