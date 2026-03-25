import React, { useEffect, useState } from 'react';
import forgeFitLogo from '../assets/Forge Fit.png';
import ospEcommerceLogo from '../assets/OSP.png';
import leaveAbsenceLogo from '../assets/Leave Dash.png';
import javaAtmLogo from '../assets/Java ATM System.png';
import carSafetyLogo from '../assets/Car Safety.png';
import reactLogo from '../assets/nova.png';
import geminiLogo from '../assets/gemini.png';
import grafanaLogo from '../assets/grafana.png';

const FALLBACK_PROJECTS = [
  {
    name: 'Forge Fit',
    description: 'Fitness platform for tracking workouts and personal progress.',
    link: 'https://forgefit-frontend.onrender.com/home',
    repoUrl: 'https://github.com/MithuusanK',
    logo: forgeFitLogo,
    stack: ['React', 'Node.js', 'UI Engineering'],
  },
  {
    name: 'Car Safety Dataset Evaluation',
    description: 'Machine-learning evaluation project for safety classification.',
    link: 'https://car-safety-evaluation.vercel.app/',
    repoUrl: 'https://github.com/MithuusanK',
    logo: carSafetyLogo,
    stack: ['Python', 'ML', 'Data Analysis'],
  },
  {
    name: 'Java ATM System',
    description: 'ATM simulation for account operations and transaction flows.',
    link: 'https://github.com/MithuusanK/Java-ATM-System',
    repoUrl: 'https://github.com/MithuusanK/Java-ATM-System',
    logo: javaAtmLogo,
    stack: ['Java', 'System Design', 'CLI'],
  },
  {
    name: 'NovaPrep',
    description: 'Project details coming soon. I will add full information next.',
    link: '',
    repoUrl: '',
    logo: reactLogo,
    stack: ['Coming Soon'],
  },
  {
    name: 'OSP E-commerce Platform',
    description: 'Commerce application handling catalog, cart, and order lifecycle.',
    link: 'https://github.com/MithuusanK/OSP',
    repoUrl: 'https://github.com/MithuusanK/OSP',
    logo: ospEcommerceLogo,
    stack: ['E-commerce', 'REST', 'Frontend'],
  },
  {
    name: 'Leave and Absence Dashboard',
    description: 'Operations dashboard to track leave and attendance trends.',
    link: 'https://github.com/MithuusanK/Leave-Absence-Dashboard',
    repoUrl: 'https://github.com/MithuusanK/Leave-Absence-Dashboard',
    logo: leaveAbsenceLogo,
    stack: ['Dashboard', 'Analytics', 'UX'],
  },
];

const FALLBACK_REPOSITORIES = FALLBACK_PROJECTS.map((project) => ({
  name: project.name,
  repoUrl: project.repoUrl,
  primaryLanguage: project.stack[0] ? { name: project.stack[0] } : null,
  visibility: 'public',
}));

const normalizeName = (name = '') => name.toLowerCase().replace(/[^a-z0-9]/g, '');

const PROJECT_OVERRIDES = {
  novaprep: {
    description:
      'AI-powered prep platform with personalized study flows, AWS-backed services, and responsive web delivery.',
    stack: ['JavaScript', 'AWS', 'HTML', 'CSS'],
  },
  forgefit: {
    description:
      'Full-stack fitness platform for workout planning, progress tracking, and performance-focused user flows.',
    stack: ['TypeScript', 'Python', 'Jupyter Notebook', 'JavaScript'],
  },
  carsafetyevaluation: {
    description:
      'End-to-end vehicle safety classification project with data preparation, model evaluation, and reproducible analysis.',
    stack: ['TypeScript', 'Jupyter Notebook', 'PowerShell', 'Shell'],
  },
  javaatmsystem: {
    description:
      'Java Swing ATM simulator supporting account workflows, transaction logic, and desktop UI interactions.',
    stack: ['Java', 'Swing', 'OOP'],
  },
  geminiliveagentchallenge: {
    description:
      'Real-time AI agent experiment integrating Gemini for interactive prompt flows, tooling, and response orchestration.',
    stack: ['Python', 'TypeScript', 'Shell', 'CSS'],
  },
  smartincidentrootcauseanalyzer: {
    description:
      'Incident intelligence tool that analyzes signals, surfaces root-cause clues, and supports observability-driven triage.',
    stack: ['Python', 'HTML', 'Jupyter Notebook', 'CSS'],
  },
};

const getProjectOverride = (name = '') => {
  const normalized = normalizeName(name);
  const key = Object.keys(PROJECT_OVERRIDES).find((candidate) => normalized.includes(candidate));
  return key ? PROJECT_OVERRIDES[key] : null;
};

const resolveLogoByRepoName = (name) => {
  const normalized = normalizeName(name);

  if (normalized.includes('forgefit')) {
    return forgeFitLogo;
  }
  if (normalized.includes('carsafety')) {
    return carSafetyLogo;
  }
  if (normalized.includes('javaatm')) {
    return javaAtmLogo;
  }
  if (normalized.includes('osp')) {
    return ospEcommerceLogo;
  }
  if (normalized.includes('leave') || normalized.includes('absence')) {
    return leaveAbsenceLogo;
  }
  if (normalized.includes('novaprep')) {
    return reactLogo;
  }
  if (normalized.includes('gemini') || normalized.includes('google')) {
    return geminiLogo;
  }
  if (normalized.includes('smartincident') || normalized.includes('grafana')) {
    return grafanaLogo;
  }

  return null;
};

const formatRepoData = (repo) => {
  const override = getProjectOverride(repo.name);
  const languages = repo.languages?.length ? repo.languages.slice(0, 4) : [];
  const defaultStack = languages.length
    ? languages
    : [repo.primaryLanguage?.name || 'Software Project'];

  return {
    name: repo.name,
    description:
      override?.description ||
      repo.description ||
      'No description added yet for this repository.',
    link: repo.link || repo.repoUrl,
    repoUrl: repo.repoUrl || repo.link,
    logo: resolveLogoByRepoName(repo.name),
    stack: override?.stack || defaultStack,
  };
};

const Projects = () => {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [repositories, setRepositories] = useState(FALLBACK_REPOSITORIES);

  useEffect(() => {
    let isCancelled = false;

    const loadPinnedProjects = async () => {
      try {
        const response = await fetch('/.netlify/functions/github-pinned?username=MithuusanK&limit=6');
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || `Request failed with ${response.status}`);
        }

        const repos = (payload.projects || []).map(formatRepoData).slice(0, 6);
        const sidebarRepos = (payload.repositories || []).map((repo) => ({
          name: repo.name,
          repoUrl: repo.repoUrl || repo.link,
          primaryLanguage: repo.primaryLanguage,
          visibility: repo.visibility || 'public',
        }));

        if (!isCancelled && repos.length > 0) {
          setProjects(repos);
          setRepositories(sidebarRepos.length ? sidebarRepos : FALLBACK_REPOSITORIES);
        } else if (!isCancelled) {
          setProjects(FALLBACK_PROJECTS);
          setRepositories(FALLBACK_REPOSITORIES);
        }
      } catch {
        if (!isCancelled) {
          setProjects(FALLBACK_PROJECTS);
          setRepositories(FALLBACK_REPOSITORIES);
        }
      }
    };

    loadPinnedProjects();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <section id="projects" className="section">
      <h2 className="section-title">$ ls -la ~/projects</h2>

      <div className="projects-layout">
        <aside className="panel repo-panel">
          <header>
            <h3>Repositories</h3>
            <span>{repositories.length}</span>
          </header>
          <ul>
            {repositories.map((repository) => (
              <li key={repository.name}>
                {repository.repoUrl ? (
                  <a href={repository.repoUrl} target="_blank" rel="noopener noreferrer">
                    <div className="repo-title-row">
                      <strong>{repository.name}</strong>
                      <span className="repo-visibility">{repository.visibility}</span>
                    </div>
                    <div className="repo-meta">
                      <span className="repo-language">
                        <span className="repo-language-dot" />
                        {repository.primaryLanguage?.name || 'Software Project'}
                      </span>
                    </div>
                  </a>
                ) : (
                  <div>
                    <strong>{repository.name}</strong>
                    <span>{repository.description}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </aside>

        <div className="pinned-projects-panel">
          <header className="pinned-projects-header">
            <h3>Pinned Repositories</h3>
          </header>
          <div className="pinned-grid">
            {projects.map((project) => (
              <article key={project.name} className="panel project-tile">
                <div className="project-top">
                  <div className="project-logo-wrap">
                    {project.logo ? (
                      <img src={project.logo} alt={`${project.name} preview`} className="project-logo" />
                    ) : (
                      <span className="project-logo-fallback">
                        {project.name
                          .split(' ')
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join('')}
                      </span>
                    )}
                  </div>
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      Open
                    </a>
                  ) : (
                    <span className="project-link">Coming Soon</span>
                  )}
                </div>

                <h3>{project.name}</h3>
                <p>{project.description}</p>

                <div className="chip-row">
                  {project.stack.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
