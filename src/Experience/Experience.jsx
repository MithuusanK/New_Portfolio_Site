import React from 'react';
import stephenLewisLogo from '../assets/Stephen Lewis Foundation.png';
import aquazenLogo from '../assets/Aquazen Services.png';
import riipenLogo from '../assets/Riipen.png';
import equitableLogo from '../assets/Equitable Bank.png';
import muiaLogo from '../assets/Muia.png';

const experiences = [
  {
    role: 'Program Officer (Data and Analytics)',
    company: 'Stephen Lewis Foundation',
    location: 'Toronto, ON',
    date: 'Oct 2024 - Dec 2025',
    logo: stephenLewisLogo,
    stack: ['Power BI', 'DAX', 'SQL', 'Power Query'],
    bullets: [
      'Designed and deployed a Power BI dashboard automating Microsoft Forms data intake and reducing manual reporting time.',
      'Built custom metrics with DAX and Power Query, improving reporting accuracy by 25 percent.',
      'Coordinated SQL and Excel data sources across 3+ teams to improve consistency and reporting velocity.',
    ],
  },
  {
    role: 'Software Engineer - AI',
    company: 'Muia Consulting',
    location: 'Toronto, ON',
    date: 'Sep 2025 - Dec 2025',
    logo: muiaLogo,
    stack: ['FastAPI', 'Vue', 'OAuth 2.0', 'Data Validation'],
    bullets: [
      'Built scalable FastAPI services and a Vue frontend for uploading, validating, and processing tax documents.',
      'Engineered validation pipelines that reached 98 percent processing accuracy.',
      'Integrated secure Google Drive OAuth 2.0 workflows to automate document delivery.',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Aquazen Services',
    location: 'Toronto, ON',
    date: 'May 2025 - Sep 2025',
    logo: aquazenLogo,
    stack: ['Next.js', 'Redux', 'Node.js', 'PostgreSQL'],
    bullets: [
      'Revamped a full-stack web app with modern Next.js components and Redux state architecture.',
      'Optimized REST APIs in Node.js and PostgreSQL, cutting response latency by 20 percent.',
      'Designed pagination and schema updates to support 200+ daily transactions reliably.',
    ],
  },
  {
    role: 'Web Developer - DJ Business Site',
    company: 'Riipen',
    location: 'Toronto, ON',
    date: 'Jan 2025 - Apr 2025',
    logo: riipenLogo,
    stack: ['SEO', 'Google Analytics', 'Scrum', 'Frontend QA'],
    bullets: [
      'Delivered a responsive client site under Scrum timelines with production-ready reliability.',
      'Applied SEO and analytics improvements that increased traffic by 25 percent.',
      'Integrated Google Business Profile API data to boost trust and engagement.',
    ],
  },
  {
    role: 'Cloud and DevOps Engineer Intern',
    company: 'Equitable Bank',
    location: 'Toronto, ON',
    date: 'May 2022 - Dec 2022',
    logo: equitableLogo,
    stack: ['Jenkins', 'Kibana', 'CI/CD', 'Confluence'],
    bullets: [
      'Automated CI/CD pipelines with Jenkins and reduced manual deployment effort by 30 percent.',
      'Built monitoring dashboards with Kibana to improve response time by 25 percent.',
      'Documented onboarding guides and team pages that shortened new-hire ramp-up.',
    ],
  },
];

const Experience = () => (
  <section id="experience" className="section">
    <h2 className="section-title">$ git log --experience --timeline</h2>

    <div className="timeline">
      {experiences.map((exp, index) => (
        <article key={exp.company} className={`timeline-item ${index % 2 ? 'right' : 'left'}`}>
          <span className="timeline-node" aria-hidden="true" />

          <div className="panel timeline-card">
            <div className="timeline-header">
              <span className="commit-tag">exp-{String(index + 1).padStart(2, '0')}</span>
              <span className="date-tag">{exp.date}</span>
            </div>

            <div className="timeline-company-row">
              <div className="timeline-logo">
                <img src={exp.logo} alt={`${exp.company} logo`} />
              </div>
              <div>
                <h3>{exp.role}</h3>
                <p>{exp.company} - {exp.location}</p>
              </div>
            </div>

            <ul>
              {exp.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            <div className="chip-row">
              {exp.stack.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default Experience;
