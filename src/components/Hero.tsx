import { useEffect, useState, useRef } from 'react';
import { SOCIAL_LINKS } from '../constants';
import { Github, Linkedin, Mail } from 'lucide-react';
import profileImg from '../assets/profile.png';

const DiscordIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 127.14 96.36" fill="currentColor">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
  </svg>
);

type BootState = 'booting' | 'collapsing' | 'ready';

interface HeroProps {
  bootState: BootState;
  setBootState: (state: BootState) => void;
}

const bootLines = [
  "[    0.001] initializing kernel: nityaniyam-os v2.0.0",
  "[    0.084] mounting /dev/skills ... <span class='ok'>OK</span>",
  "[    0.212] loading modules: swe, security, devops ... <span class='ok'>OK</span>",
  "[    0.340] running self-scan on candidate: biswash_devkota ... <span class='ok'>PASS</span>",
  "[    0.412] 0 critical vulnerabilities found in this portfolio.",
  "[    0.500] ready."
];

const greetings = [
  "hello, world!",
  "you found /nityaniyam",
  "console.log('welcome back');",
];

export default function Hero({ bootState, setBootState }: HeroProps) {
  const [heroContentIn, setHeroContentIn] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');

  const bootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Boot sequence logic
  useEffect(() => {
    // If we're remounting after the boot animation already completed once
    // this session (e.g. navigating back from /blogposts to /), skip the
    // typing animation entirely and show the content immediately — there's
    // no "booting" DOM node to attach to at this point anyway.
    if (bootState === 'ready') {
      setHeroContentIn(true);
      setTypewriterText(greetings[0]);
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setBootState('ready');
      setHeroContentIn(true);
      setTypewriterText(greetings[0]);
      return;
    }

    const bootEl = bootRef.current;
    if (!bootEl) return;

    let currentLineIdx = 0;
    let typeInterval: ReturnType<typeof setInterval>;

    const typeNextLine = () => {
      if (currentLineIdx >= bootLines.length) {
        // Hold finished log for ~1.5s, then collapse
        setTimeout(() => {
          setBootState('collapsing');
          setTimeout(() => {
            setBootState('ready');
            setHeroContentIn(true);
          }, 650); // collapse duration
        }, 1500);
        return;
      }

      const fullLineHtml = bootLines[currentLineIdx];
      // strip html for sequential typing
      const plainText = fullLineHtml.replace(/<[^>]+>/g, '');
      let charIdx = 0;
      const speed = 8;

      typeInterval = setInterval(() => {
        charIdx++;
        if (bootEl) {
          bootEl.innerHTML =
            bootLines.slice(0, currentLineIdx).join('\n') +
            (currentLineIdx > 0 ? '\n' : '') +
            plainText.slice(0, charIdx);
        }

        if (charIdx >= plainText.length) {
          clearInterval(typeInterval);
          if (bootEl) {
            bootEl.innerHTML = bootLines.slice(0, currentLineIdx + 1).join('\n');
          }
          currentLineIdx++;
          setTimeout(typeNextLine, 90);
        }
      }, speed);
    };

    typeNextLine();

    return () => {
      clearInterval(typeInterval);
    };
  }, [setBootState]);

  // Typewriter greeting animation
  useEffect(() => {
    if (heroContentIn === false) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setTypewriterText(greetings[0]);
      return;
    }

    let gi = 0;
    let ci = 0;
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const line = greetings[gi];
      if (!deleting) {
        ci++;
        setTypewriterText(line.slice(0, ci));
        if (ci === line.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 2000);
        } else {
          timeoutId = setTimeout(tick, 55 + Math.random() * 45);
        }
      } else {
        ci--;
        setTypewriterText(line.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          gi = (gi + 1) % greetings.length;
          timeoutId = setTimeout(tick, 400);
        } else {
          timeoutId = setTimeout(tick, 30);
        }
      }
    };

    tick();
    return () => clearTimeout(timeoutId);
  }, [heroContentIn]);

  return (
    <section className="hero" id="hero-top" ref={heroRef}>

      {/* Boot Logs */}
      {bootState === 'booting' && (
        <div className="boot mono" ref={bootRef} />
      )}
      {bootState === 'collapsing' && (
        <div className="boot mono boot--collapsing">
          {bootLines.join('\n')}
        </div>
      )}
      {bootState === 'ready' && (
        <div className="boot mono boot--collapsed boot--in">
          [    0.500] ready. <span className="ok">✓</span>
        </div>
      )}

      {/* Main Intro content */}
      <div className={`hero-content ${heroContentIn ? 'in' : ''} font-spaceGrotesk`} id="heroContent">
        <div className="hero-grid">
          <div className="hero-text">
            <h1 className="font-fraunces font-black">
              Biswash <span className="accent">Devkota</span>
            </h1>
            <div className="prompt-line font-jetbrainsMono">
              <span className="p">$</span>
              <span>{typewriterText}</span>
              <span className="cursor" />
            </div>

            <p className="hero-desc font-jetbrainsMono">
              What you lose will eventually be lost, and what you miss will eventually meet
            </p>

            <div className="social-row font-jetbrainsMono">
              <a className="chip" href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Github size={14} /> github
              </a>
              <a className="chip" href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Linkedin size={14} /> linkedin
              </a>
              <a className="chip" href={SOCIAL_LINKS.discord} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <DiscordIcon size={14} /> discord
              </a>
              <a className="chip" href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} /> contact
              </a>
            </div>
          </div>

          <div className="hero-avatar-container">
            <div className="hero-avatar-frame">
              {/* CCTV HUD */}
              <div className="cctv-hud">
                <div className="cctv-top-row">
                  <div className="cctv-rec">
                    <span className="rec-dot" />
                    <span>REC</span>
                  </div>
                  <div className="cctv-cam">CAM_01</div>
                </div>

              </div>
              <div className="avatar-img-wrap">
                <img src={profileImg} alt="Biswash Devkota" className="hero-avatar-img" />
                <div className="avatar-crt-overlay" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}