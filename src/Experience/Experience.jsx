
import React, { useState } from 'react';
import stephenLewisLogo from '../assets/Stephen Lewis Foundation.png';
import aquazenLogo from '../assets/Aquazen Services.png';
import riipenLogo from '../assets/Riipen.png';
import equitableLogo from '../assets/Equitable Bank.png';
import muiaLogo from '../assets/Muia.png';

const experiences = [
  {
    role: "Data & Power BI Developer",
    company: "Stephen Lewis Foundation",
    location: "Toronto, ON",
    date: "Oct 2024 – Present",
    logo: stephenLewisLogo,
    bullets: [
      "Designed and deployed a Power BI dashboard automating data intake from Microsoft Forms, reducing manual reporting times.",
      "Built custom metrics with DAX and Power Query, improving reporting accuracy by 25%.",
      "Managed SQL and Excel-based data sources, ensuring data consistency and accessibility across 3+ teams.",
      "Collaborated with cross-functional teams to define data requirements, delivering insights that supported funding strategies and improved stakeholder reporting efficiency."
    ]
  },
  {
    role: "Software Engineer - AI",
    company: "Muia Consulting",
    location: "Toronto, ON",
    date: "Sep 2025 – Dec 2025",
    logo: muiaLogo,
    bullets: [
      "Developed scalable FastAPI backend services and a Vue.js (Vite) frontend to upload, validate, and process tax documents.",
      "Engineered backend validation and data-check pipelines, achieving 98% processing accuracy across supported tax documents.",
      "Integrated secure Google Drive OAuth 2.0 workflows to automatically store generated tax filings and documents."
    ]
  },
  {
    role: "Full-Stack Developer",
    company: "Aquazen Services",
    location: "Toronto, ON",
    date: "May 2025 – Sep 2025",
    logo: aquazenLogo,
    bullets: [
      "Revamped a full-stack web app by modernizing Next.js front-end components and integrating Redux, boosting scalability and enabling faster feature development.",
      "Optimized REST APIs in Node.js + PostgreSQL, cutting response latency by 20% and improving system efficiency across high-traffic endpoints.",
      "Designed and tested robust database schemas and pagination features, increasing reliability for 200+ daily transactions and minimizing downtime.",
      "Applied Agile practices and Git workflows, reducing release cycles while improving cross-team collaboration."
    ]
  },
  {
    role: "Web Developer - DJ Business Site",
    company: "Riipen",
    location: "Toronto, ON",
    date: "Jan 2025 – Apr 2025",
    logo: riipenLogo,
    bullets: [
      "Delivered a responsive DJ business website using the Scrum framework, ensuring on-time delivery.",
      "Applied SEO + Google Analytics, increasing traffic by 25% and improving site reliability with testing.",
      "Integrated the Google Business Profile API to display real-time reviews, boosting user trust and engagement."
    ]
  },
  {
    role: "Cloud & DevOps Engineer Intern",
    company: "Equitable Bank",
    location: "Toronto, ON",
    date: "May 2022 – Dec 2022",
    logo: equitableLogo,
    bullets: [
      "Automated CI/CD pipelines with Jenkins, cutting manual deployments by 30% and increasing delivery speed and consistency.",
      "Deployed monitoring dashboards with Kibana, improving system visibility and reducing incident response time by 25%.",
      "Created 20+ Confluence team pages, streamlining onboarding and reducing ramp-up time."
    ]
  }
];

const Experience = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);

  const handleCardClick = (exp) => {
    setSelectedExp(exp);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedExp(null);
  };

  return (
    <section id="experience" className="section">
      <h2>Experience</h2>
      <div className="experience-card-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="experience-card"
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
            }}
            onClick={() => handleCardClick(exp)}
          >
            {/* Logo placeholder */}
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
              {exp.logo ? <img src={exp.logo} alt={exp.company} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <span>{exp.company[0]}</span>}
            </div>
            <h3 style={{ color: '#222', fontWeight: 700, fontSize: '1.3rem', margin: 0 }}>{exp.company}</h3>
            <div style={{ color: '#444', fontSize: '1.05rem', margin: '0.5rem 0 0.2rem 0', textAlign: 'center' }}>{exp.role}</div>
            <div style={{ color: '#666', fontSize: '0.98rem', marginBottom: '0.5rem', textAlign: 'center' }}>{exp.date}</div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {modalOpen && selectedExp && (
        <div className="exp-modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.18)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} onClick={closeModal}>
          <div className="exp-modal" style={{
            background: '#fff',
            borderRadius: '18px',
            boxShadow: '0 4px 32px rgba(0,120,212,0.18)',
            padding: '2.5rem 2rem',
            minWidth: '320px',
            maxWidth: '90vw',
            textAlign: 'center',
            position: 'relative',
          }} onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              fontSize: '2rem',
              color: '#0078d4',
              cursor: 'pointer',
            }}>&times;</button>
            <h2 style={{ color: '#0078d4', fontWeight: 700, fontSize: '2rem', marginBottom: '1.2rem' }}>{selectedExp.company}</h2>
            <div style={{ color: '#222', fontSize: '1.15rem', marginBottom: '0.7rem' }}>{selectedExp.role}</div>
            <div style={{ color: '#666', fontSize: '1rem', marginBottom: '1.2rem' }}>{selectedExp.date}</div>
            {/* Experience Points line removed as requested */}
            <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: '400px', paddingLeft: '1.2rem' }}>
              {selectedExp.bullets.map((bullet, i) => (
                <li key={i} style={{ color: '#222', fontSize: '1rem', marginBottom: '0.5rem' }}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;