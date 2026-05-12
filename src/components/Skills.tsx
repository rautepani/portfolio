import SectionHeader from './SectionHeader';
import { Code2, Server, Shield, Cloud } from 'lucide-react';

const skillCategories = [
  {
    category: 'Languages',
    label: '01',
    icon: Code2,
    accentColor: '#34d399',
    skills: [
      { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Rust', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg' },
      { name: 'Bash', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    label: '02',
    icon: Server,
    accentColor: '#67e8f9',
    skills: [
      { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
      { name: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
      { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
      { name: 'Flask', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
    ],
  },
  {
    category: 'Infrastructure & Tools',
    label: '03',
    icon: Cloud,
    accentColor: '#818cf8',
    skills: [
      { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
      { name: 'Jenkins', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg'},
      { name: 'GitHub Actions', logo: 'https://cdn.simpleicons.org/githubactions' },
      { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'Cloudflare', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg' },
      { name: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
      { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'Neovim', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neovim/neovim-original.svg' },
      { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'Vercel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
    ],
  },
];

const securityTools = [
  { name: 'Burp Suite', logo: 'https://www.vectorlogo.zone/logos/burpsuite/burpsuite-icon.svg' },
  { name: 'Nmap', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nmap/nmap-original.svg' },
  { name: 'Wireshark', logo: 'https://www.vectorlogo.zone/logos/wireshark/wireshark-icon.svg' },
  { name: 'Metasploit', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Metasploit_Framework_Logo.svg/512px-Metasploit_Framework_Logo.svg.png' },
  { name: 'HashCat', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'OWASP', logo: 'https://www.vectorlogo.zone/logos/owasp/owasp-icon.svg' },
  { name: 'CTF', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968349.png' },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: '#080808' }}        // ← Consistent with About section
    >
      {/* Noise Texture - Same as About */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      {/* Subtle Radial Glow */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(103,232,249,0.07) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader 
          label="02" 
          title="Skills & Expertise" 
          subtitle="Technologies I use to bring ideas to life" 
        />

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.category}
                className="group relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: 'linear-gradient(145deg, #111215, #0a0b0f)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.4)',
                }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${category.accentColor}15`, color: category.accentColor }}
                    >
                      <Icon size={22} />
                    </div>
                    <span className="text-xs uppercase tracking-[2px] font-mono text-white/40">
                      {category.label}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-6 text-white tracking-tight">
                  {category.category}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-white/5"
                      style={{
                        background: `${category.accentColor}08`,
                        border: `1px solid ${category.accentColor}20`,
                      }}
                    >
                      <img 
                        src={skill.logo} 
                        alt={skill.name}
                        className="w-5 h-5 object-contain"
                      />
                      <span className="font-medium text-gray-200">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Interests */}
        <div className="mt-8 rounded-3xl p-8"
          style={{
            background: 'linear-gradient(145deg, #111215, #0a0b0f)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-emerald-400" size={24} />
            <h3 className="uppercase text-sm tracking-[2px] font-mono text-white/50">
              Security & Interests
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {securityTools.map((tool, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-2.5 text-sm rounded-2xl transition-all hover:bg-white/5 border border-white/10 hover:border-emerald-500/30 text-gray-400 hover:text-white"
              >
                <img 
                  src={tool.logo} 
                  alt={tool.name}
                  className="w-5 h-5 object-contain"
                />
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}