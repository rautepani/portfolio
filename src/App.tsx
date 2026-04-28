import { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Skills from './components/Skills.tsx';
import Education from './components/Education.tsx';
import Projects from './components/Projects.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    Object.values(sectionsRef.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const registerSection = (id: string) => (el: HTMLElement | null) => {
    sectionsRef.current[id] = el;
  };

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">
      <Navigation activeSection={activeSection} />
      <main>
        <section id="home" ref={registerSection('home')}>
          <Hero />
        </section>
        <section id="about" ref={registerSection('about')}>
          <About />
        </section>
        <section id="skills" ref={registerSection('skills')}>
          <Skills />
        </section>
        <section id="education" ref={registerSection('education')}>
          <Education />
        </section>
        <section id="projects" ref={registerSection('projects')}>
          <Projects />
        </section>
        <section id="contact" ref={registerSection('contact')}>
          <Contact />
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
