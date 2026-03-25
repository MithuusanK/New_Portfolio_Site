import './App.css';
import Navbar from './Navbar';
import Home from './Home/Home';
import About from './About/About';
import Skills from './Skills/Skills';
import Experience from './Experience/Experience';
import Projects from './Projects/Projects';
import GitHubActivity from './GitHubActivity/GitHubActivity';
import AIAssistant from './AIAssistant/AIAssistant';
import Contact from './Contact/Contact';

function App() {
  const year = new Date().getFullYear();

  return (
    <div className="App">
      <div className="ambient-glow ambient-glow-left" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-right" aria-hidden="true" />

      <Navbar />

      <main className="main-layout">
        <Home />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHubActivity />
        <AIAssistant />
        <Contact />
      </main>

      <footer className="footer-section">
        <span className="footer-mark">{'</>'}</span>
        <span className="footer-text">
          Copyright {year} Mithuusan Kirupananthan. Built with care and craft.
        </span>
      </footer>
    </div>
  );
}

export default App;
