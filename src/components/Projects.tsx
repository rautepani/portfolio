import { useState } from 'react';
import { Github, ExternalLink, BookOpen } from 'lucide-react';

interface Project {
  name: string;
  category?: 'core' | 'security' | 'tool';
  desc: string;
  stack: string[];
  sourceUrl?: string;
  liveUrl?: string;
  writeupUrl?: string;
}

const projects: Project[] = [
  {
    name: 'phishing-url-detector',
    desc: 'Machine learning model that classifies URLs as phishing or legitimate using feature extraction and a trained classifier. Flags suspicious domains, redirects, and HTTPS anomalies.',
    stack: ['python', 'scikit-learn', 'pandas', 'flask'],
    sourceUrl: 'https://biswashdevkota.com.np',
  },
  {
    name: 'hospital-appointment-system',
    category: 'core',
    desc: 'Full-stack web app for managing patient appointments, doctor schedules, and availability. Includes role-based access for admin, doctor, and patient views.',
    stack: ['react', 'fastapi', 'postgresql', 'docker'],
    sourceUrl: 'https://biswashdevkota.com.np',
    liveUrl: 'https://biswashdevkota.com.np',
  },
  {
    name: 'password-generator',
    category: 'tool',
    desc: 'Cryptographically secure password generator with configurable length, character sets, entropy estimation, and a copy-to-clipboard UI.',
    stack: ['rust'],
    sourceUrl: 'https://biswashdevkota.com.np',
    liveUrl: 'https://biswashdevkota.com.np',
  },
  {
    name: 'cryptopals',
    category: 'security',
    desc: 'Solutions to the Cryptopals crypto challenges — implementing AES, CBC/ECB modes, padding oracle attacks, SHA-1 length extension, and more from scratch.',
    stack: ['python', 'cryptography', 'bash'],
    sourceUrl: 'https://biswashdevkota.com.np',
    writeupUrl: 'https://biswashdevkota.com.np',
  },
];

export default function Projects() {
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});

  const toggleRow = (name: string) => {
    setOpenRows((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <section id="projects">
      <div className="sec-label">ls -la ~/projects</div>
      <h2 className="sec-title">03. Projects</h2>

      <div className="proj-list reveal">
        {projects.map((proj) => {
          const isOpen = !!openRows[proj.name];
          return (
            <div
              key={proj.name}
              className={`proj-row ${isOpen ? 'open' : ''}`}
              onClick={() => toggleRow(proj.name)}
            >
              <div className="proj-top">
                <div className="proj-name">
                  <span className="path-pre">~/</span>
                  {proj.name}
                </div>
              </div>
              <p className="proj-desc">{proj.desc}</p>
              <div className="proj-stack">
                {proj.stack.map((s) => (
                  <span key={s} className="stack-pill">
                    {s}
                  </span>
                ))}
              </div>
              <div className="proj-links" onClick={(e) => e.stopPropagation()}>
                {proj.sourceUrl && (
                  <a href={proj.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Github size={13} /> source
                  </a>
                )}
                {proj.liveUrl && (
                  <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <ExternalLink size={13} /> live
                  </a>
                )}
                {proj.writeupUrl && (
                  <a href={proj.writeupUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <BookOpen size={13} /> write-up
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}