import { Github, ExternalLink, BookOpen, Folder } from 'lucide-react';

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
  return (
    <section id="projects">
      <div className="sec-label">ls -la ~/projects</div>
      <h2 className="sec-title">03. Projects</h2>

      <div className="proj-grid reveal">
        {projects.map((proj) => (
          <div key={proj.name} className="proj-card">
            <div className="proj-card-header">
              <div className="proj-card-folder">
                <Folder size={18} />
                <span className="proj-name">
                  <span className="path-pre">~/</span>
                  {proj.name}
                </span>
              </div>

              <div className="proj-card-links">
                {proj.sourceUrl && (
                  <a href={proj.sourceUrl} target="_blank" rel="noopener noreferrer" title="View Source">
                    <Github size={16} />
                  </a>
                )}
                {proj.liveUrl && (
                  <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" title="Live Preview">
                    <ExternalLink size={16} />
                  </a>
                )}
                {proj.writeupUrl && (
                  <a href={proj.writeupUrl} target="_blank" rel="noopener noreferrer" title="Read Writeup">
                    <BookOpen size={16} />
                  </a>
                )}
              </div>
            </div>

            <p className="proj-card-desc">{proj.desc}</p>

            <div className="proj-card-stack">
              {proj.stack.map((s) => (
                <span key={s} className="stack-pill">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}