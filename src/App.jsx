import './App.css';
import Navbar from './Navbar';
import Home from './Home/Home';
import About from './About/About';
import Experience from './Experience/Experience';
import Projects from './Projects/Projects';
import Contact from './Contact/Contact';
import { ThemeProvider, useTheme } from './ThemeContext';

function AppContent() {
  const { darkMode } = useTheme();
  
  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <div className="animated-bg" />
      <Navbar />
      <main>
        <Home />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="footer-section">
        <span className="footer-text">
          Copyright © 2025 Mithuusan Kirupananthan. All Rights Reserved.
        </span>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
