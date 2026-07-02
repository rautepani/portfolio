import { useState, useEffect, useRef } from 'react';
import { SOCIAL_LINKS } from '../constants';
import { Mail, Download } from 'lucide-react';

export default function Contact() {
  const [sshLines, setSshLines] = useState<string[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const targetLines = [
    'Connecting to <span class="addr">biswash@nityaniyam.dev</span> ...',
    'Handshake: ECDHE-RSA-AES256-GCM-SHA384',
    'Authenticating ... <span class="ok">accepted</span>',
    'Connection established. <span class="ok">Go ahead, type your message.</span>',
  ];

  useEffect(() => {
    const runSSH = () => {
      setSshLines([]);
      setFormVisible(false);
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        setSshLines(targetLines);
        setFormVisible(true);
        return;
      }

      targetLines.forEach((line, i) => {
        setTimeout(() => {
          setSshLines((prev) => [...prev, line]);
          if (i === targetLines.length - 1) {
            setTimeout(() => setFormVisible(true), 300);
          }
        }, i * 500);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          runSSH();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleReset = () => {
      setHasStarted(true); // ensure observer won't re-trigger it
      runSSH();
    };

    window.addEventListener('resetContact', handleReset);

    return () => {
      observer.disconnect();
      window.removeEventListener('resetContact', handleReset);
    };
  }, [hasStarted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${SOCIAL_LINKS.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact">
      <div className="sec-label">ssh contact@nityaniyam</div>
      <h2 className="sec-title">07. Contact</h2>

      <div className="contact-wrap reveal" ref={containerRef} id="contactWrap">
        {/* SSH Handshake Output */}
        <div className={`ssh-log mono${formVisible ? ' collapsed' : ''}`} id="sshLog">
          {sshLines.map((line, idx) => (
            <div key={idx} dangerouslySetInnerHTML={{ __html: line }} />
          ))}
        </div>

        {/* Dynamic form sliding in */}
        <form
          className={`contact-panel${formVisible ? ' in' : ''}`}
          id="contactPanel"
          onSubmit={handleSubmit}
        >
          <div className="contact-field">
            <label htmlFor="cName">name</label>
            <input
              type="text"
              id="cName"
              placeholder="your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="contact-field">
            <label htmlFor="cEmail">email</label>
            <input
              type="email"
              id="cEmail"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="contact-field">
            <label htmlFor="cMessage">message</label>
            <textarea
              id="cMessage"
              placeholder="what's up?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div className="contact-submit-row">
            <button type="submit" className="btn-primary">./send.sh →</button>
            <span className="contact-note">opens your email client with this filled in</span>
          </div>
        </form>

        <div className={`contact-actions${formVisible ? ' in' : ''}`}>
          <a
            className="btn-ghost"
            href={`mailto:${SOCIAL_LINKS.email}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Mail size={16} /> email directly
          </a>
          <a
            className="btn-ghost"
            href="/Biswash_Devkota_CV.pdf"
            download="Biswash_Devkota_CV.pdf"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Download size={16} /> Download resume
          </a>
        </div>
      </div>
    </section>
  );
}