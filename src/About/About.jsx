import React from 'react';

const skills = [
  { name: 'React JS', value: 90 },
  { name: 'HTML & CSS', value: 85 },
  { name: 'JavaScript', value: 80 },
  { name: 'Java', value: 75 },
  { name: 'Python', value: 95 },
];

const About = () => (
  <section id="about" className="section about-section">
    <div className="about-header-box">
      <h2>About Me</h2>
      <p>
        I'm a recent Computer Science graduate from Toronto Metropolitan University with a passion for software development and technology. I've made efforts to build a solid programming, full-stack development, and software engineering foundation over the course of several years, which I continue to actively build upon through projects and independent learning.
      </p>
    </div>

    
    <div className="skills-bars">
      {skills.map(skill => (
        <div key={skill.name} className="skill-bar-row">
          <span className="skill-label">{skill.name}</span>
          <div className="skill-bar-bg">
            <div
              className="skill-bar-fill"
              style={{ width: `${skill.value}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default About;