import SectionHeader from './SectionHeader';

const skillCategories = [
  {
    category: 'Languages',
    label: '01',
    accentColor: '#34d399',
    accentBg: 'rgba(52,211,153,0.07)',
    accentBorder: 'rgba(52,211,153,0.15)',
    accentText: '#34d399',
    skills: [
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Rust', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg' },
      { name: 'Bash / Shell', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    label: '02',
    accentColor: '#67e8f9',
    accentBg: 'rgba(103,232,249,0.07)',
    accentBorder: 'rgba(103,232,249,0.15)',
    accentText: '#67e8f9',
    skills: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
      { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
    ],
  },
  {
    category: 'Infrastructure & Cloud',
    label: '03',
    accentColor: '#818cf8',
    accentBg: 'rgba(129,140,248,0.07)',
    accentBorder: 'rgba(129,140,248,0.15)',
    accentText: '#818cf8',
    skills: [
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
      { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' },
      { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    ],
  },
];

const securityTools = [
  'Burp Suite', 'Nmap', 'Wireshark', 'Metasploit',
  'CTF Challenges', 'Web App Pentesting', 'Network Analysis', 'OWASP Top 10',
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(103,232,249,0.06) 0%, transparent 70%)' }}
      />

      {/* Top border */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(103,232,249,0.2), transparent)' }}
      />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeader label="02" title="Skills" subtitle="Technologies and tools I work with regularly." />

        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {skillCategories.map((cat, catIdx) => (
            <div
              key={cat.category}
              className="relative rounded-2xl p-6 overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #111215 0%, #0d0e10 100%)',
                border: '1px solid rgba(255,255,255,0.055)',
                boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
                animation: 'slideUp 0.5s ease forwards',
                opacity: 0,
                animationDelay: `${0.1 + catIdx * 0.1}s`,
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-6 right-6 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${cat.accentColor}40, transparent)` }}
              />

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: cat.accentText, fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {cat.category}
                </h3>
                <span
                  className="text-[10px] tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.1)', fontFamily: 'monospace' }}
                >
                  {cat.label}
                </span>
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, skillIdx) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-default"
                    style={{
                      background: cat.accentBg,
                      border: `1px solid ${cat.accentBorder}`,
                      animation: 'fadeIn 0.4s ease forwards',
                      opacity: 0,
                      animationDelay: `${0.3 + catIdx * 0.1 + skillIdx * 0.06}s`,
                      transition: 'background 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = cat.accentBg.replace('0.07', '0.14');
                      e.currentTarget.style.borderColor = cat.accentColor + '55';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = cat.accentBg;
                      e.currentTarget.style.borderColor = cat.accentBorder;
                    }}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-4 h-4 object-contain flex-shrink-0"
                    />
                    <span
                      className="text-xs font-medium whitespace-nowrap"
                      style={{ color: 'rgba(255,255,255,0.7)', fontFamily: '"DM Sans", system-ui, sans-serif' }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Security tools */}
        <div
          className="mt-5 rounded-2xl p-6"
          style={{
            background: 'linear-gradient(160deg, #111215 0%, #0d0e10 100%)',
            border: '1px solid rgba(255,255,255,0.055)',
            boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
            animation: 'slideUp 0.5s ease forwards',
            opacity: 0,
            animationDelay: '0.45s',
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-1.5 h-4 rounded-full"
              style={{ background: 'linear-gradient(to bottom, #34d399, #067a52)' }}
            />
            <h3
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: '"JetBrains Mono", monospace' }}
            >
              Security Tools &amp; Interests
            </h3>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {securityTools.map((tool, i) => (
              <span
                key={tool}
                className="text-xs px-3.5 py-1.5 rounded-full cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: 'rgba(255,255,255,0.45)',
                  fontFamily: '"JetBrains Mono", monospace',
                  transition: 'border-color 0.2s, color 0.2s, background 0.2s',
                  animation: 'fadeIn 0.3s ease forwards',
                  opacity: 0,
                  animationDelay: `${0.55 + i * 0.04}s`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(52,211,153,0.35)';
                  e.currentTarget.style.color = '#34d399';
                  e.currentTarget.style.background = 'rgba(52,211,153,0.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)' }}
      />

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </section>
  );
}