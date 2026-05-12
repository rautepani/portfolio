import SectionHeader from './SectionHeader';
import { PERSONAL_INFO } from '../constants';

const terminalLines = [
  { cmd: 'whoami', out: 'biswash_devkota' },
  { cmd: 'cat bio.txt', out: `${PERSONAL_INFO.bio}` },
  { cmd: 'echo $LOCATION', out: `${PERSONAL_INFO.location} 🏔` },
  { cmd: 'echo $STATUS', out: 'Open to learning opportunities', highlight: true },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      {/* Radial glow top-left */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Top border line */}
      <div className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(52,211,153,0.3), transparent)' }}
      />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeader label="01" title="About Me" />

        <div className="mt-16 flex justify-center">

          {/* ── Terminal ── */}
          <div
            className="relative w-full max-w-2xl"
            style={{
              animation: 'slideUp 0.6s ease forwards',
              opacity: 0,
              animationDelay: '0.1s',
            }}
          >
            {/* Vertical accent line */}
            <div
              className="absolute -left-5 top-6 bottom-6 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(52,211,153,0.4), transparent)' }}
            />

            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #111215 0%, #0d0e10 100%)',
                border: '1px solid rgba(255,255,255,0.055)',
                boxShadow: '0 0 0 1px rgba(52,211,153,0.04), 0 24px 48px rgba(0,0,0,0.5)',
              }}
            >
              {/* Title bar */}
              <div
                className="flex items-center gap-2 px-5 py-3.5"
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  background: 'rgba(255,255,255,0.015)',
                }}
              >
                <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                <span
                  className="ml-auto text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.15)', fontFamily: '"JetBrains Mono", monospace' }}
                >
                  whoami.sh
                </span>
              </div>

              {/* Terminal body */}
              <div
                className="p-7 space-y-6"
                style={{ fontFamily: '"JetBrains Mono", "Fira Code", monospace', fontSize: '13px', lineHeight: '1.7' }}
              >
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      animation: 'fadeIn 0.4s ease forwards',
                      opacity: 0,
                      animationDelay: `${0.3 + i * 0.12}s`,
                    }}
                  >
                    {/* Command line */}
                    <div className="flex items-center gap-2">
                      <span style={{ color: '#34d399' }}>❯</span>
                      <span style={{ color: '#7dd3fc' }}>{line.cmd}</span>
                    </div>
                    {/* Output */}
                    <p
                      className="pl-5 mt-1 whitespace-pre-line"
                      style={{
                        color: line.highlight ? '#34d399' : 'rgba(255,255,255,0.38)',
                        textShadow: line.highlight ? '0 0 12px rgba(52,211,153,0.4)' : 'none',
                      }}
                    >
                      {line.out}
                    </p>
                  </div>
                ))}

                {/* Blinking cursor */}
                <div className="flex items-center gap-2">
                  <span style={{ color: '#34d399' }}>❯</span>
                  <span
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '15px',
                      background: 'rgba(52,211,153,0.7)',
                      animation: 'blink 1s step-end infinite',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Decorative corner tag */}
            <div
              className="absolute -bottom-3 -right-3 text-[10px] tracking-widest px-3 py-1 rounded-full"
              style={{
                background: 'rgba(43, 87, 71, 0.08)',
                border: '1px solid rgba(52,211,153,0.15)',
                color: 'rgba(52,211,153,0.5)',
                fontFamily: 'monospace',
              }}
            >
              v2.0
            </div>
          </div>

        </div>
      </div>

      {/* Bottom border line */}
      <div
        className="absolute bottom-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)' }}
      />

      {/* Keyframes injected inline */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  );
}