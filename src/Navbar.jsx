import React, { useEffect, useState } from 'react';

const navItems = [
  { id: 'home', href: '#home', label: 'Home', icon: '</>' },
  { id: 'about', href: '#about', label: 'About', icon: '>_' },
  { id: 'skills', href: '#skills', label: 'Skills', icon: '{*}' },
  { id: 'experience', href: '#experience', label: 'Experience', icon: 'git' },
  { id: 'projects', href: '#projects', label: 'Projects', icon: '[]' },
  { id: 'activity', href: '#activity', label: 'Activity', icon: 'gh' },
  { id: 'contact', href: '#contact', label: 'Contact', icon: '@' },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    let ticking = false;

    const syncActiveSection = () => {
      const focusLine = window.innerHeight * 0.36;
      const containingSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= focusLine && rect.bottom >= focusLine;
      });

      let nextActive = sections[0].id;

      if (containingSection) {
        nextActive = containingSection.id;
      } else {
        const passedSections = sections.filter((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= focusLine;
        });

        if (passedSections.length > 0) {
          nextActive = passedSections[passedSections.length - 1].id;
        }
      }

      setActiveSection(nextActive);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(syncActiveSection);
    };

    syncActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handleNavClick = (event, id) => {
    event.preventDefault();
    const section = document.getElementById(id);

    if (!section) {
      return;
    }

    setActiveSection(id);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <aside className="side-nav" aria-label="Section navigation">
      <ul className="side-nav-list">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <li key={item.id} className={`side-nav-item ${isActive ? 'active' : ''}`}>
              <a
                href={item.href}
                className={`side-nav-dot ${isActive ? 'active' : ''}`}
                aria-label={item.label}
                aria-current={isActive ? 'location' : undefined}
                onClick={(event) => handleNavClick(event, item.id)}
              >
                {isActive ? <span>{item.icon}</span> : null}
              </a>

              <a
                href={item.href}
                className="side-nav-label"
                onClick={(event) => handleNavClick(event, item.id)}
              >
                {'> '}
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Navbar;
