import { Github, ExternalLink, Lock, Globe, Shield, Terminal } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { SOCIAL_LINKS } from '../constants';

const projects = [
  {
    title: 'Phishing URL Detector',
    description:
      'A machine learning project that classifies URLs as phishing or legitimate. Built a REST API with Flask to serve the model, trained on real-world URL datasets using Python and scikit-learn.',
    tags: ['Python', 'Machine Learning', 'Flask', 'REST API', 'scikit-learn'],
    icon: <Shield size={18} className="text-red-400" />,
    github: SOCIAL_LINKS.github,
    live: null,
    status: 'Learning Project',
    highlights: ['ML classification', 'Flask API'],
  },
  {
    title: 'Hospital Appointment System',
    description:
      'A web application for managing patient appointments and workflows. Built with Django and PostgreSQL for the backend, with a Bootstrap frontend. Leverages Django\'s built-in security features.',
    tags: ['Django', 'PostgreSQL', 'Bootstrap', 'JavaScript', 'jQuery'],
    icon: <Globe size={18} className="text-blue-400" />,
    github: SOCIAL_LINKS.github,
    live: null,
    status: 'Learning Project',
    highlights: ['Appointment management', 'Django security'],
  },
  {
    title: 'Password Generator (Rust)',
    description:
      'A CLI tool built in Rust for generating strong, customizable passwords. A hands-on project to learn Rust\'s memory safety model and systems programming.',
    tags: ['Rust', 'CLI', 'Security'],
    icon: <Lock size={18} className="text-red-400" />,
    github: SOCIAL_LINKS.github,
    live: null,
    status: 'Learning Project',
    highlights: ['Rust systems programming', 'Custom rules'],
  },
  {
    title: 'Bandit OTW Writeups',
    description:
      'My documented solutions and notes for the OverTheWire Bandit wargame — covering Linux fundamentals, shell navigation, file permissions, SSH, and basic privilege escalation.',
    tags: ['Linux', 'CTF', 'Shell', 'Security'],
    icon: <Terminal size={18} className="text-emerald-400" />,
    github: SOCIAL_LINKS.github,
    live: null,
    status: 'Ongoing',
    highlights: ['Linux fundamentals', 'CTF writeups'],
  },
  {
    title: 'Food Ordering Web App',
    description:
      'A full-stack food delivery platform exploring microservices architecture with Java Spring Boot backend and React frontend. Integrated Docker for containerization.',
    tags: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Docker'],
    icon: <Globe size={18} className="text-emerald-400" />,
    github: SOCIAL_LINKS.github,
    live: null,
    status: 'Learning Project',
    highlights: ['Microservices', 'Containerization'],
  },
  {
    title: 'Payment Scheduling System',
    description:
      'A React + TypeScript project for managing and scheduling recurring payments with reminders and centralized tracking. Built to explore frontend state management and automation flows.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Automation'],
    icon: <Globe size={18} className="text-cyan-400" />,
    github: SOCIAL_LINKS.github,
    live: null,
    status: 'Learning Project',
    highlights: ['Recurring payments', 'Smart reminders'],
  },
];

const statusColors: Record<string, string> = {
  'Learning Project': 'text-sky-400 border-sky-500/30 bg-sky-500/10',
  Ongoing: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
  Completed: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
};

export default function Projects() {
  return (
    <div className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="04"
          title="Projects"
          subtitle="Things I've built while learning — honest work in progress."
        />

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative bg-gray-900 border border-gray-800 hover:border-emerald-500/30 rounded-xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/5"
            >
              {/* hover glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 transition-all duration-300 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">

                {/* header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                    {project.icon}
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-mono border ${statusColors[project.status]}`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* title */}
                <h3 className="text-white font-semibold text-base group-hover:text-emerald-400 transition-colors line-clamp-1 mb-1">
                  {project.title}
                </h3>

                {/* description */}
                <p className="text-gray-400 text-sm leading-relaxed mt-1 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* highlights */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.highlights.slice(0, 2).map((h) => (
                    <span
                      key={h}
                      className="text-xs text-emerald-300/80 bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-1 rounded"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-800 text-gray-400 px-2.5 py-1 rounded font-mono group-hover:bg-gray-700 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* footer */}
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-800">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                    >
                      <Github size={14} />
                      Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-gray-400 hover:text-emerald-400 transition-colors text-sm ml-auto"
                    >
                      Live
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Honest note */}
        <p className="text-center text-gray-600 text-sm mt-10 font-mono">
          // these are learning projects — building in public, growing every day
        </p>
      </div>
    </div>
  );
}