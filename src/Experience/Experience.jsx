import React from 'react';
import stephenLewisLogo from '../assets/Stephen Lewis Foundation.png';
import aquazenLogo from '../assets/Aquazen Services.png';
import equitableLogo from '../assets/Equitable Bank.png';
import muiaLogo from '../assets/Muia.png';
import walmartLogo from '../assets/walmart.png';

const experiences = [
  {
    role: 'Software Developer (Contract)',
    company: 'SGMC Canada',
    location: 'Toronto, ON',
    date: 'Jan 2026 - Present',
    logo: null,
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Express.js', 'PostgreSQL', 'AWS S3'],
    bullets: [
      "Led development of Connect2Talents' initial web application using Next.js, React, TypeScript, and Tailwind CSS, delivering core onboarding, dashboard, and document review workflows.",
      'Built secure Express.js and PostgreSQL backend services with authentication APIs, role-based access control, protected routes, and AWS S3 uploads, enabling secure onboarding and document handling.',
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
      'Built a FastAPI backend using Google Gemini 2.0 Flash and Google Document AI to convert unstructured tax documents into structured SR&ED claim data, automating a key step in claim preparation.',
      'Designed an OCR + Gemini document pipeline with normalized JSON/CSV outputs, reducing SR&ED workflow time by 50%.',
      'Developed Python services to process financial records, automate ITC eligibility checks, and enforce validation logic for accurate outputs.',
    ],
  },
  {
    role: 'Program Officer (Data and Analytics)',
    company: 'Stephen Lewis Foundation',
    location: 'Toronto, ON',
    date: 'Oct 2024 - Dec 2025',
    logo: stephenLewisLogo,
    stack: ['Power BI', 'DAX', 'SQL', 'Power Query'],
    bullets: [
      'Delivered a Power BI dashboard and automated intake workflow that cut manual reporting time by 50% across 5 teams in a 100+ employee organization.',
      'Built SQL-based data pipelines with validation and transformation logic, replacing a days-long reporting process with instant access to decision-ready insights.',
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
    role: 'Cloud and DevOps Engineer Intern',
    company: 'Equitable Bank',
    location: 'Toronto, ON',
    date: 'May 2022 - Dec 2022',
    logo: equitableLogo,
    stack: ['Jenkins', 'Kibana', 'CI/CD', 'Confluence'],
    bullets: [
      'Designed CI/CD pipelines to automate build, test, and deployment workflows, supporting 25+ production deployments for a digital banking card project.',
      'Built an API dependency map to identify downstream service impacts faster and reduce downtime risk during weekly and monthly releases.',
    ],
  },
  {
    role: 'Sales Floor Team Lead',
    company: 'Walmart',
    location: 'Toronto, ON',
    date: 'Jun 2020 - Oct 2024',
    logo: walmartLogo,
    stack: ['Team Leadership', 'Customer Service', 'Store Operations', 'Issue Resolution', 'Electronics Sales'],
    bullets: [
      'Led and coached 30+ sales floor associates, ensuring daily priorities were completed on time, performance was monitored, and complex customer issues were resolved through clear root-cause problem solving.',
      'Delivered an exceptional in-store customer experience by maintaining department readiness, visual standards, and overall store conditions in line with company expectations.',
      'Supported the Electronics department by advising customers on suitable devices, accessories, and software options based on needs, budget, and product compatibility.',
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
                {exp.logo ? (
                  <img src={exp.logo} alt={`${exp.company} logo`} />
                ) : (
                  <span aria-hidden="true">{exp.company.slice(0, 2).toUpperCase()}</span>
                )}
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
