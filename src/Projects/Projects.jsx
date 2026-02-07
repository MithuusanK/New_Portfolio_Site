import React from 'react';
import forgeFitLogo from '../assets/Forge Fit.png';
import gouldStreetLogo from '../assets/GSP.png';
import libraryDbLogo from '../assets/LDMS.png';
import ospEcommerceLogo from '../assets/OSP.png';
import leaveAbsenceLogo from '../assets/Leave Dash.png';
import javaEcommerceLogo from '../assets/Java Ecom.png';
import javaAtmLogo from '../assets/Java ATM System.png';
import carSafetyLogo from '../assets/Car Safety.png';

const projects = [
  {
    name: 'Forge Fit',
    description: 'A fitness app for tracking workouts and progress.',
    link: 'https://forgefit-frontend.onrender.com/home',
    logo: forgeFitLogo,
  },
  {
    name: 'Gould Street University Portal',
    description: 'A university portal for student and faculty management.',
    link: 'https://github.com/MithuusanK/CPS845-SLAP',
    logo: gouldStreetLogo,
  },
  {
    name: 'Library Database Management System',
    description: 'A system for managing library books, users, and transactions.',
    link: 'https://github.com/MithuusanK/CPS510-Library-DBMS',
    logo: libraryDbLogo,
  },
  {
    name: 'OSP E-commerce Platform',
    description: 'An ecommerce platform for online shopping and order management.',
    link: 'https://github.com/MithuusanK/OSP',
    logo: ospEcommerceLogo,
  },
  {
    name: 'Leave & Absence Dashboard',
    description: 'A dashboard for tracking employee leave and absences.',
    link: 'https://github.com/MithuusanK/Leave-Absence-Dashboard',
    logo: leaveAbsenceLogo,
  },
  {
    name: 'Java E-commerce System',
    description: 'A Java-based ecommerce system for product and order management.',
    link: 'https://github.com/MithuusanK/Java_Ecommerce_System',
    logo: javaEcommerceLogo,
  },
  {
    name: 'Java ATM System',
    description: 'A Java ATM simulation system for banking operations.',
    link: 'https://github.com/MithuusanK/Java-ATM-System',
    logo: javaAtmLogo,
  },
  {
    name: 'Car Safety Dataset Evaluation',
    description: 'A project for evaluating car safety datasets and building predictive models.',
    link: 'https://car-safety-evaluation.vercel.app/',
    logo: carSafetyLogo,
  },
];

const Projects = () => (
  <section id="projects" className="section">
    <h2>Projects</h2>
    <div className="experience-card-list">
      {projects.map((project, idx) => (
        <a
          key={idx}
          className="experience-card project-card-link"
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="exp-logo">
            {project.logo ? <img src={project.logo} alt={project.name} /> : <span>{project.name[0]}</span>}
          </div>
          <h3>{project.name}</h3>
          <div className="exp-role">{project.description}</div>
        </a>
      ))}
    </div>
  </section>
);

export default Projects;