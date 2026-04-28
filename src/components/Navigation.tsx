import { useState, useEffect } from 'react';
import { Menu, X, Terminal, Download } from 'lucide-react';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

interface Props {
  activeSection: string;
}

export default function Navigation({ activeSection }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-950/95 backdrop-blur-md border-b border-gray-800 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2 text-emerald-400 font-bold text-xl tracking-tight hover:text-emerald-300 transition-colors group"
        >
          <div className="w-5 h-5 rounded bg-emerald-400/20 group-hover:bg-emerald-400/30 transition-colors flex items-center justify-center">
            <Terminal size={12} className="text-emerald-400" />
          </div>
          <span>nityaniyam</span>
          <span className="text-gray-500">~</span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-medium transition-colors duration-200 relative group ${
                  activeSection === link.id
                    ? 'text-emerald-400'
                    : 'text-gray-400 hover:text-gray-100'
                }`}
              >
                {activeSection === link.id && (
                  <span className="text-emerald-500 mr-1">▸</span>
                )}
                {link.label}
                {activeSection !== link.id && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/cv.pdf"
            download
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
          >
            <Download size={14} />
            CV
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-400 hover:text-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-950/98 border-b border-gray-800 px-6 py-4 animate-slide-up">
          <ul className="flex flex-col gap-4 mb-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className={`text-sm font-medium w-full text-left transition-colors ${
                    activeSection === link.id ? 'text-emerald-400' : 'text-gray-400'
                  }`}
                >
                  <span className="text-gray-600 mr-2">$</span>
                  {link.label.toLowerCase()}
                </button>
              </li>
            ))}
          </ul>
          <a
            href="/cv.pdf"
            download
            className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          >
            <Download size={14} />
            CV
          </a>
        </div>
      )}
    </nav>
  );
}
