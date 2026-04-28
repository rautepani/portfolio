import { GraduationCap, Calendar } from 'lucide-react';
import SectionHeader from './SectionHeader';

const education = [
  {
    degree: 'Bachelor of Engineering — Software Engineering',
    institution: 'School of Engineering, Pokhara University',
    period: '2022 — Present',
    status: 'ongoing',
    details: ['Full-stack web development', 'Data Structures & Algorithms', 'Database Management', 'Networking & Security fundamentals'],
  },
  {
    degree: 'Higher Secondary (Science)',
    institution: 'Shree Amarsingh Secondary School (AHS)',
    period: '2020 — 2022',
    status: 'completed',
    details: ['Science specialization', 'Math, Physics, Chemistry'],
  },
  {
    degree: 'Secondary Education (SEE)',
    institution: 'Shree Amarsingh Secondary School',
    period: '2013 — 2020',
    status: 'completed',
    details: [],
  },
];

export default function Education() {
  return (
    <div className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Horizontal rule accent top */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="max-w-5xl mx-auto relative">
        <SectionHeader label="03" title="Education" subtitle="My academic background and qualifications." />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 to-emerald-500/0 hidden md:block" />

          <div className="space-y-8">
            {education.map((edu, idx) => (
              <div 
                key={idx} 
                className="md:pl-16 relative animate-slide-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-0 top-5 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 border-2 border-emerald-500/50 items-center justify-center group hover:scale-110 transition-transform">
                  <GraduationCap size={16} className="text-emerald-400" />
                </div>

                <div className="bg-gray-900 border border-gray-800 hover:border-emerald-500/20 rounded-xl p-6 transition-all duration-300 group hover:shadow-lg hover:shadow-emerald-500/5">
                  <div className="flex flex-wrap items-start gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-base leading-snug mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-emerald-400/80 text-sm">{edu.institution}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-mono border transition-all ${
                          edu.status === 'ongoing'
                            ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                            : 'text-gray-500 border-gray-700 bg-gray-800/50'
                        }`}
                      >
                        {edu.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                    <Calendar size={12} />
                    <span>{edu.period}</span>
                  </div>

                  {edu.details.length > 0 && (
                    <ul className="flex flex-wrap gap-2 mt-3">
                      {edu.details.map((d) => (
                        <li
                          key={d}
                          className="text-xs bg-emerald-500/5 border border-emerald-500/10 text-gray-400 px-2.5 py-1 rounded-md"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom edge line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}
