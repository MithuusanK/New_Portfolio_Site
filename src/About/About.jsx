import React from 'react';
import profilePic from '../assets/profile.jpg';

const summaryRows = [
  { label: 'Operator', value: 'Mithuusan Kirupananthan' },
  { label: 'Role', value: 'Full Stack Software Engineer' },
  { label: 'Location', value: 'Toronto, Ontario, Canada' },
  { label: 'Status', value: 'Currently Employed' },
];

const quickStats = [
  { label: 'Years Building', value: '4+' },
  { label: 'Projects Shipped', value: '20+' },
  { label: 'Core Domains', value: 'Web, Data, AI' },
];

const About = () => (
  <section id="about" className="section">
    <h2 className="section-title"># about.system</h2>

    <div className="about-grid">
      <article className="panel profile-panel">
        <div className="profile-ring">
          <img src={profilePic} alt="Mithuusan portrait" className="about-avatar" />
        </div>

        <div className="profile-table">
          {summaryRows.map((row) => (
            <div key={row.label} className="profile-row">
              <span>{row.label}</span>
              <strong>{row.value}</strong>
            </div>
          ))}
        </div>
      </article>

      <article className="panel terminal-panel">
        <div className="terminal-title">user_profile.log</div>
        <p>
          <span className="prompt">&gt; whoami</span>
          I am a computer science graduate focused on engineering high-quality software
          products with clean architecture, reliable backend services, and thoughtful UI.
        </p>
        <p>
          <span className="prompt">&gt; mission.txt</span>
          I translate complex business requirements into practical technical solutions,
          backed by strong fundamentals and a continuous-growth mindset.
        </p>
      </article>
    </div>

    <div className="stat-grid">
      {quickStats.map((stat) => (
        <article key={stat.label} className="panel stat-card">
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </article>
      ))}
    </div>
  </section>
);

export default About;
