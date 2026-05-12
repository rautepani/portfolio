import { useEffect, useState } from 'react';
import { Github, Linkedin, Twitter, ChevronDown } from 'lucide-react';
import { SOCIAL_LINKS, PERSONAL_INFO } from '../constants';

const roles = [
  'Software Engineering Student',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 60);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 35);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 relative overflow-hidden bg-[#0a0a0a]">

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(52,211,153,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.25) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Glow */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full text-center">

     

        {/* NAME (no logo above anymore) */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          <span className="text-white">{PERSONAL_INFO.name.split(' ')[0]}</span>{' '}
          <span className="text-emerald-400">
            {PERSONAL_INFO.name.split(' ')[1]}
          </span>
        </h1>

        {/* typing role */}
        <div className="h-8 mb-8">
          <p className="text-xl text-gray-300 font-mono">
            <span className="text-emerald-500">$</span>{' '}
            <span>{displayed}</span>
            <span className="animate-pulse text-emerald-400">|</span>
          </p>
        </div>

        {/* bio */}
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {PERSONAL_INFO.bio}
        </p>

        {/* buttons */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-gray-800 hover:bg-emerald-600 border border-gray-700 hover:border-emerald-500 text-gray-300 hover:text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all hover:scale-105"
          >
            <Github size={16} />
            GitHub
          </a>

          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-gray-800 hover:bg-blue-600 border border-gray-700 hover:border-blue-500 text-gray-300 hover:text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all hover:scale-105"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>

          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-gray-800 hover:bg-sky-600 border border-gray-700 hover:border-sky-500 text-gray-300 hover:text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all hover:scale-105"
          >
            <Twitter size={16} />
            Twitter
          </a>
        </div>

        {/* scroll hint */}
        <button
          onClick={() =>
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          }
          className="text-gray-500 hover:text-emerald-400 transition-colors animate-bounce"
        >
          <ChevronDown size={28} />
        </button>

      </div>
    </div>
  );
}