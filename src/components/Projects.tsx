import { Github, ExternalLink, Lock, Globe } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { SOCIAL_LINKS } from '../constants';

const projects = [
  {
    title: 'Food Ordering Web Application',
    description:
      'Full-stack food delivery platform with microservices architecture, authentication, real-time tracking, payments, and ML recommendations.',
    tags: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Python'],
    icon: <Globe size={18} className="text-emerald-400" />,
    github: SOCIAL_LINKS.github,
    live: null,
    status: 'Completed',
    highlights: ['Microservices', 'ML recommendations', 'Real-time tracking'],
  },
  {
    title: 'Rust Password Generator',
    description:
      'Secure CLI tool for generating strong passwords with entropy-based scoring and customizable rules.',
    tags: ['Rust', 'CLI', 'Security'],
    icon: <Lock size={18} className="text-red-400" />,
    github: SOCIAL_LINKS.github,
    live: null,
    status: 'Completed',
    highlights: ['Entropy scoring', 'Custom rules'],
  },
  {
    title: 'Healthcare Insights Dashboard',
    description:
      'Analytics dashboard for appointment trends, no-shows, and healthcare resource optimization.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Data Viz'],
    icon: <Globe size={18} className="text-cyan-400" />,
    github: SOCIAL_LINKS.github,
    live: null,
    status: 'Completed',
    highlights: ['Trend analysis', 'No-show insights'],
  },
  {
    title: 'Payment Scheduling System',
    description:
      'Fintech system for recurring payments with scheduling, reminders, and centralized tracking.',
    tags: ['React', 'TypeScript', 'Automation'],
    icon: <Globe size={18} className="text-cyan-400" />,
    github: SOCIAL_LINKS.github,
    live: null,
    status: 'Completed',
    highlights: ['Recurring payments', 'Smart reminders'],
  },
  {
    title: 'CTF Security Research',
    description:
      'Writeups covering web exploitation, cryptography, reverse engineering, and forensics.',
    tags: ['Cybersecurity', 'CTF', 'Forensics'],
    icon: <Lock size={18} className="text-red-400" />,
    github: SOCIAL_LINKS.github,
    live: null,
    status: 'Ongoing',
    highlights: ['Web exploitation', 'Crypto attacks'],
  },
  {
    title: 'Hospital Management System',
    description:
      'System for managing patients, appointments, and staff workflows with secure backend APIs.',
    tags: ['React', 'TypeScript', 'REST API'],
    icon: <Globe size={18} className="text-blue-400" />,
    github: SOCIAL_LINKS.github,
    live: null,
    status: 'Completed',
    highlights: ['Appointments', 'Patient workflow'],
  },
];

const statusColors: Record<string, string> = {
  Completed: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  Ongoing: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
};

export default function Projects() {
  return (
    <div className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="04"
          title="Projects"
          subtitle="Things I have built and worked on."
        />

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative bg-gray-900 border border-gray-800 hover:border-emerald-500/30 rounded-xl p-4 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/5"
            >
              {/* hover glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 transition-all duration-300 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">

                {/* header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                    {project.icon}
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${statusColors[project.status]}`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* title */}
                <h3 className="text-white font-semibold text-sm group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {project.title}
                </h3>

                {/* description */}
                <p className="text-gray-400 text-xs leading-relaxed mt-1 mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* highlights */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.highlights.slice(0, 2).map((h) => (
                    <span
                      key={h}
                      className="text-[10px] text-emerald-300/80 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded font-mono group-hover:bg-gray-700 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-gray-400 hover:text-emerald-400 transition-colors text-xs"
                    >
                      <Github size={12} />
                      Code
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-gray-400 hover:text-emerald-400 transition-colors text-xs ml-auto"
                    >
                      Live
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}