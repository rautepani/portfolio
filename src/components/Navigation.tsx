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
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2 text-emerald-400 font-bold text-2xl tracking-tighter hover:text-emerald-300 transition-colors group"
        >
          <div className="w-6 h-6 rounded bg-emerald-400/20 group-hover:bg-emerald-400/30 transition-colors flex items-center justify-center">
            <Terminal size={14} className="text-emerald-400" />
          </div>
          <span>nityaniyam</span>
        </button>

        {/* Desktop Navigation - Bigger Font */}
        <ul className="hidden md:flex items-center gap-10 text-base font-medium">   {/* Increased size + gap */}
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className={`transition-all duration-200 relative group py-1 ${
                  activeSection === link.id
                    ? 'text-emerald-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {activeSection === link.id && (
                  <span className="text-emerald-500 mr-1">▸</span>
                )}
                {link.label}
                
                {/* Underline Effect */}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-400 group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/cv.pdf"
            download
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
          >
            <Download size={16} />
            Download CV
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-950/98 border-b border-gray-800 px-6 py-6">
          <ul className="flex flex-col gap-6 text-lg">   {/* Bigger font on mobile too */}
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className={`w-full text-left transition-colors ${
                    activeSection === link.id ? 'text-emerald-400' : 'text-gray-400'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          
          <a
            href="/cv.pdf"
            download
            className="mt-6 flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-medium"
          >
            <Download size={18} />
            Download CV
          </a>
        </div>
      )}
    </nav>
  );
}