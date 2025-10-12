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
    name: 'OSP Eccomerce Platform',
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
    name: 'Java Ecommerce System',
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
    link: 'https://github.com/MithuusanK/Car_Safety_Evaluation',
    logo: carSafetyLogo,
  },
];

const Projects = () => (
  <section id="projects" className="section">
    <h2>Projects</h2>
    <div className="experience-card-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
      {projects.map((project, idx) => (
        <a
          key={idx}
          className="experience-card"
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#fff',
            borderRadius: '20px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            width: '340px',
            minHeight: '320px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '2rem 1.5rem 1.5rem 1.5rem',
            transition: 'transform 0.2s',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div style={{
            width: '180px',
            height: '120px',
            background: '#e3f2fd',
            borderRadius: '16px',
            marginBottom: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            color: '#0078d4',
            overflow: 'hidden',
          }}>
            {project.logo ? <img src={project.logo} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <span>{project.name[0]}</span>}
          </div>
          <h3 style={{ color: '#222', fontWeight: 700, fontSize: '1.3rem', margin: 0 }}>{project.name}</h3>
          <div style={{ color: '#444', fontSize: '1.05rem', margin: '0.5rem 0 0.2rem 0', textAlign: 'center' }}>{project.description}</div>
        </a>
      ))}
    </div>
  </section>
);

export default Projects;