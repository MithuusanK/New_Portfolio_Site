
import React, { useState } from 'react';
import stephenLewisLogo from '../assets/Stephen Lewis Foundation.png';
import aquazenLogo from '../assets/Aquazen Services.png';
import riipenLogo from '../assets/Riipen.png';
import equitableLogo from '../assets/Equitable Bank.png';
import muiaLogo from '../assets/Muia.png';
import mtcLogo from '../assets/manufacturing_and_technology_centre_logo.jpg';

const experiences = [
  {
    role: "Program Officer (Data & Analytics)",
    company: "Stephen Lewis Foundation",
    location: "Toronto, ON",
    date: "Oct 2024 - Dec 2025",
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
      <div className="experience-card-list">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="experience-card"
            onClick={() => handleCardClick(exp)}
          >
            {/* Logo placeholder */}
            <div className="exp-logo">
              {exp.logo ? <img src={exp.logo} alt={exp.company} /> : <span>{exp.company[0]}</span>}
            </div>
            <h3>{exp.company}</h3>
            <div className="exp-role">{exp.role}</div>
            <div className="exp-date">{exp.date}</div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {modalOpen && selectedExp && (
        <div className="exp-modal-overlay" onClick={closeModal}>
          <div className="exp-modal" onClick={e => e.stopPropagation()}>
            <button className="exp-modal-close" onClick={closeModal}>&times;</button>
            <h2>{selectedExp.company}</h2>
            <div className="exp-role">{selectedExp.role}</div>
            <div className="exp-date">{selectedExp.date}</div>
            <ul>
              {selectedExp.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;