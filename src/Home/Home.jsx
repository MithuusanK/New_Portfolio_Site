import React from 'react';

const techStack = ['React', 'TypeScript', 'Node.js', 'SQL', 'Cloud'];

const Home = () => (
  <section id="home" className="section hero-section">
    <div className="section-command">$ system.init --portfolio</div>

    <div className="hero-layout">
      <article className="hero-copy panel">
        <p className="hero-kicker">SYSTEM.KERNEL v3.0.0</p>
        <h1 className="hero-title">
          Hello, I'm <span>Mithuusan Kirupananthan</span>
        </h1>
        <p className="hero-role">{'<Software Engineer />'}</p>
        <p className="hero-description">
          I build reliable software experiences with strong foundations in full-stack
          development, data-driven systems, and thoughtful product execution.
        </p>

        <div className="hero-actions">
          <a
            href="https://github.com/MithuusanK"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Open GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mithuusan-kirupananthan-9b92261a5/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            LinkedIn
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            Resume
          </a>
        </div>

        <div className="chip-row" aria-label="Core technologies">
          {techStack.map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
        </div>
      </article>

      <article className="code-window panel">
        <header className="window-header">
          <div className="window-dots">
            <span />
            <span />
            <span />
          </div>
          <span>portfolio.tsx</span>
        </header>

        <div className="window-content">
          <pre>
            <code>
{`import { Engineer } from './core';

const profile = () => {
  const stack = ['Full Stack', 'Cloud', 'Data'];
  const strengths = [
    'Performance',
    'Scalability',
    'Reliability',
  ];

  return (
    <Engineer
      name="Mithuusan Kirupananthan"
      role="Full Stack Software Engineer"
      focus={strengths.join(', ')}
      stack={stack}
      mission="Build software that is fast, robust, and user-centered."
    />
  );
};`}
            </code>
          </pre>
        </div>
      </article>
    </div>
  </section>
);

export default Home;
