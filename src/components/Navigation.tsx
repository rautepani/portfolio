import { useState } from 'react';
import { ExternalLink, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  theme: 'dark' | 'light' | 'amber';
  onThemeToggle: () => void;
}

const navLinks = [
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
  { id: 'blogs', label: 'blogs' },
];

const themeIcons = { dark: '◐', light: '◑', amber: '⚡' };
const themeTitles = {
  dark: 'Dark mode — click for light',
  light: 'Light mode — click for amber CRT',
  amber: 'Amber CRT — click for dark',
};

export default function Navigation({
  activeSection,
  theme,
  onThemeToggle,
}: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScrollTo = (id: string) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <header className="titlebar font-spaceGrotesk">
        <nav className="pill-tabs">
          {navLinks.map((link, idx) => {
             const isActive = activeSection === link.id;
             return (
               <span key={link.id}>
                 <button
                   onClick={() => handleScrollTo(link.id)}
                   className={isActive ? 'active' : ''}
                 >
                   {link.label}
                 </button>
                 {idx < navLinks.length - 1 && <span className="sep"> · </span>}
               </span>
             );
           })}
         </nav>
 
          <a className="cv-btn" href="/Biswash_Devkota_CV.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
             <ExternalLink size={14} /> resume
           </a>

          <button
            className="mobile-menu-btn"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
       </header>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <>
          <div className="mobile-menu-scrim" onClick={() => setMobileOpen(false)} />
          <div className="mobile-menu-panel font-spaceGrotesk">
            {navLinks.map((link) => (
              <button
                key={link.id}
                className={activeSection === link.id ? 'active' : ''}
                onClick={() => handleScrollTo(link.id)}
              >
                {link.label}
              </button>
            ))}
            <a
              href="/Biswash_Devkota_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
            >
              <ExternalLink size={14} /> resume
            </a>
          </div>
        </>
      )}

      {/* Theme Toggler */}
      <button
        className="theme-toggle"
        id="themeToggle"
        aria-label="Cycle theme"
        title={themeTitles[theme]}
        onClick={onThemeToggle}
      >
        {themeIcons[theme]}
      </button>
    </>
  );
}