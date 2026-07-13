import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Skills from './components/Skills.tsx';
import Projects from './components/Projects.tsx';
import Education from './components/Education.tsx';
import Certificates from './components/Certificates.tsx';
import Blogs from './components/Blogs.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import BlogPage from './pages/BlogPage.tsx';
import BlogPostPage from './pages/BlogPostPage.tsx';

type Theme = 'dark' | 'light' | 'amber';
type BootState = 'booting' | 'collapsing' | 'ready';

const commands = [
  { label: 'Hero.tsx', hint: 'home / intro', target: 'hero-top' },
  { label: 'About.tsx', hint: 'who I am', target: 'about' },
  { label: 'Skills.tsx', hint: 'stack + tools', target: 'skills' },
  { label: 'Projects.tsx', hint: 'things I built', target: 'projects' },
  { label: 'Education.tsx', hint: 'academic history', target: 'education' },
  { label: 'Certificates.tsx', hint: 'credentials', target: 'certificates' },
  { label: 'Blogs.tsx', hint: 'writing', target: 'blogs' },
  { label: 'Contact.tsx', hint: 'get in touch', target: 'contact' },
];

function App() {
  const location = useLocation();
  const isBlogRoute = location.pathname.startsWith('/blogposts');
  const [activeSection, setActiveSection] = useState('hero-top');
  const [theme, setTheme] = useState<Theme>('dark');
  const [cmdkOpen, setCmdkOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selIdx, setSelIdx] = useState(0);
  const [bootState, setBootState] = useState<BootState>('booting');

  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const cmdkInputRef = useRef<HTMLInputElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Theme Toggler
  const cycleTheme = () => {
    const themeOrder: Theme[] = ['dark', 'light', 'amber'];
    const currentIdx = themeOrder.indexOf(theme);
    const nextTheme = themeOrder[(currentIdx + 1) % themeOrder.length];
    
    // Animation trigger
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) {
      document.body.classList.add('theme-anim');
      setTimeout(() => document.body.classList.remove('theme-anim'), 550);
    }
    
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('portfolio-theme', nextTheme);
    } catch (e) {
      console.warn(e);
    }
  };

  // Theme Init
  useEffect(() => {
    let savedTheme: Theme = 'dark';
    try {
      const saved = localStorage.getItem('portfolio-theme') as Theme;
      if (saved === 'dark' || saved === 'light' || saved === 'amber') {
        savedTheme = saved;
      }
    } catch (e) {
      console.warn(e);
    }
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Intersection Observer for Active Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.15, rootMargin: '-80px 0px 0px 0px' }
    );

    const refs = sectionsRef.current;
    Object.values(refs).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [bootState]); // Re-observe when DOM elements mount/unmount after boot completes

  // Scroll Reveal Observer
  // Re-runs on bootState (first load) AND on location.pathname (e.g. navigating
  // back from /blogposts to /), since React Router unmounts/remounts the whole
  // <main> tree on route change, producing fresh .reveal elements that a
  // one-time observer would never see.
  useEffect(() => {
    if (bootState !== 'ready' || isBlogRoute) return;

    // Wait a tick so the freshly-mounted DOM (after a route change) is in place
    const raf = requestAnimationFrame(() => {
      const revealEls = document.querySelectorAll('.reveal');
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealEls.forEach((el) => io.observe(el));
      (window as unknown as { __revealIO?: IntersectionObserver }).__revealIO?.disconnect();
      (window as unknown as { __revealIO?: IntersectionObserver }).__revealIO = io;
    });

    return () => cancelAnimationFrame(raf);
  }, [bootState, location.pathname, isBlogRoute]);

  // Custom Cursor & Progress Bar
  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Progress Bar scroll listener
    const handleScroll = () => {
      const progressBar = document.getElementById('progressBar');
      if (!progressBar) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let animFrameId: number;

    // Cursor movement (only if mouse pointer matches and motion not reduced)
    if (isFinePointer && !reduced) {
      document.body.classList.add('custom-cursor');
      const dot = document.getElementById('curDot');
      const ring = document.getElementById('curRing');

      let ringX = window.innerWidth / 2;
      let ringY = window.innerHeight / 2;
      let targetX = ringX;
      let targetY = ringY;

      const handleMouseMove = (e: MouseEvent) => {
        targetX = e.clientX;
        targetY = e.clientY;
        if (dot) {
          dot.style.left = targetX + 'px';
          dot.style.top = targetY + 'px';
        }
        // Global page-wide glow follows cursor
        const glow = glowRef.current;
        if (glow) {
          glow.style.left = e.clientX + 'px';
          glow.style.top = e.clientY + 'px';
          glow.style.opacity = '1';
        }
      };

      const updateCursorLoop = () => {
        ringX += (targetX - ringX) * 0.18;
        ringY += (targetY - ringY) * 0.18;
        if (ring) {
          ring.style.left = ringX + 'px';
          ring.style.top = ringY + 'px';
        }
        animFrameId = requestAnimationFrame(updateCursorLoop);
      };

      document.addEventListener('mousemove', handleMouseMove);
      animFrameId = requestAnimationFrame(updateCursorLoop);

      // Hover styles for cursor
      const hoverables = 'a, button, input, .cv-btn, .chip, .proj-row, .pill-tabs button, .cmdk-item, .btn-primary, .btn-ghost, .commit, .pkg-row, .accent';
      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest(hoverables) && ring) {
          ring.classList.add('hover');
        }
      };
      const handleMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest(hoverables) && ring) {
          ring.classList.remove('hover');
        }
      };
      const handleMouseDown = () => ring?.classList.add('click');
      const handleMouseUp = () => ring?.classList.remove('click');
      const handleMouseLeave = () => {
        if (dot && ring) {
          dot.style.opacity = '0';
          ring.style.opacity = '0';
        }
        const glow = glowRef.current;
        if (glow) glow.style.opacity = '0';
      };
      const handleMouseEnter = () => {
        if (dot && ring) {
          dot.style.opacity = '1';
          ring.style.opacity = '1';
        }
      };

      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseout', handleMouseOut);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.addEventListener('mouseleave', handleMouseLeave);
      document.body.addEventListener('mouseenter', handleMouseEnter);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mouseout', handleMouseOut);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.removeEventListener('mouseleave', handleMouseLeave);
        document.body.removeEventListener('mouseenter', handleMouseEnter);
        document.body.classList.remove('custom-cursor');
        cancelAnimationFrame(animFrameId);
      };
    } else {
      const dot = document.getElementById('curDot');
      const ring = document.getElementById('curRing');
      dot?.remove();
      ring?.remove();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Keyboard controls for CMD-K palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdkOpen((o) => !o);
      } else if (e.key === '/' && !cmdkOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setCmdkOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [cmdkOpen]);

  // Focus CMDK Input on open
  useEffect(() => {
    if (cmdkOpen) {
      setSearchQuery('');
      setSelIdx(0);
      setTimeout(() => cmdkInputRef.current?.focus(), 10);
    }
  }, [cmdkOpen]);

  // Filter commands
  const filteredCommands = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.hint.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePaletteSelect = (target: string) => {
    setCmdkOpen(false);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(target)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  const handleCmdkKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelIdx((idx) => Math.min(idx + 1, filteredCommands.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelIdx((idx) => Math.max(idx - 1, 0));
    } else if (e.key === 'Enter') {
      if (filteredCommands[selIdx]) {
        handlePaletteSelect(filteredCommands[selIdx].target);
      }
    } else if (e.key === 'Escape') {
      setCmdkOpen(false);
    }
  };

  const registerSection = (id: string) => (el: HTMLElement | null) => {
    sectionsRef.current[id] = el;
  };

  return (
    <div className="min-h-screen relative">
      {/* Overlays */}
      <div className="progress-bar" id="progressBar" />
      <div className="cur-ring" id="curRing" />
      <div className="cur-dot" id="curDot" />
      <div className="scanlines" />
      <div className="vignette" />
      {/* Global page-wide cursor glow */}
      <div className="mouse-glow-global" ref={glowRef} />

      {/* Brand Pill */}
      {!isBlogRoute && (
        <a className="brand-pill" href="#hero-top">
          <span className="path-prefix">./</span>nityaniyam
        </a>
      )}

      {/* Floating Navigation Dock */}
      {!isBlogRoute && (
        <Navigation
          activeSection={activeSection}
          theme={theme}
          onThemeToggle={cycleTheme}
        />
      )}

      {/* Command Palette Modal */}
      {!isBlogRoute && cmdkOpen && (
        <div
          className="cmdk-overlay open"
          onClick={(e) => {
            if (e.target === e.currentTarget) setCmdkOpen(false);
          }}
        >
          <div className="cmdk-box">
            <div className="cmdk-input-row">
              <span className="p">$</span>
              <input
                ref={cmdkInputRef}
                type="text"
                placeholder="type a section name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelIdx(0);
                }}
                onKeyDown={handleCmdkKeyDown}
                autoComplete="off"
              />
            </div>
            <div className="cmdk-results">
              {filteredCommands.length === 0 ? (
                <div className="cmdk-empty">no section matches "{searchQuery}"</div>
              ) : (
                filteredCommands.map((c, i) => (
                  <div
                    key={c.target}
                    className={`cmdk-item ${i === selIdx ? 'sel' : ''}`}
                    onClick={() => handlePaletteSelect(c.target)}
                    onMouseMove={() => setSelIdx(i)}
                  >
                    <span className="l">
                      <span className="p">$</span> cd {c.label}
                    </span>
                    <span className="k">{c.hint}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Theme toggle stays available on blog routes too, since Navigation is hidden there */}
      {isBlogRoute && (
        <button
          className="theme-toggle"
          aria-label="Cycle theme"
          onClick={cycleTheme}
        >
          {theme === 'dark' ? '●' : theme === 'light' ? '○' : '◒'}
        </button>
      )}

      {/* Main Page Layout */}
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <div id="hero-top" ref={registerSection('hero-top')}>
                <Hero bootState={bootState} setBootState={setBootState} />
              </div>

              {bootState === 'ready' && (
                <>
                  <div id="about" ref={registerSection('about')}>
                    <About />
                  </div>

                  <div id="skills" ref={registerSection('skills')}>
                    <Skills />
                  </div>

                  <div id="projects" ref={registerSection('projects')}>
                    <Projects />
                  </div>

                  <div id="education" ref={registerSection('education')}>
                    <Education />
                  </div>

                  <div id="certificates" ref={registerSection('certificates')}>
                    <Certificates />
                  </div>

                  <div id="blogs" ref={registerSection('blogs')}>
                    <Blogs />
                  </div>

                  <div id="contact" ref={registerSection('contact')}>
                    <Contact />
                  </div>
                </>
              )}
            </main>
          }
        />
        <Route path="/blogposts" element={<BlogPage />} />
        <Route path="/blogposts/:slug" element={<BlogPostPage />} />
      </Routes>

      {!isBlogRoute && <Footer />}
    </div>
  );
}

export default App;
