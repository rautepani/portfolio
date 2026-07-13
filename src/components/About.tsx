import { useState, useRef, useEffect } from 'react';

const HELP_HINT = "Type 'help' for a list of available commands.";

const QUICK_COMMANDS = [
  { label: 'whoami', cmd: 'whoami' },
  { label: 'ls interests/', cmd: 'ls interests/' },
  { label: 'sudo hire-me', cmd: 'sudo hire-me' },
  { label: 'help', cmd: 'help' },
];



export default function About() {
  const [termLines, setTermLines] = useState<
    Array<{ text: string; type?: 'echo' | 'err' | 'default' }>
  >([{ text: HELP_HINT, type: 'default' }]);
  const [inputValue, setInputValue] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const termBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [cursorLeft, setCursorLeft] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (measureRef.current) {
      setCursorLeft(measureRef.current.getBoundingClientRect().width);
    }
  }, [inputValue]);

  const commands: Record<string, string> = {
    help: 'Available commands: whoami, pwd, ls, ls interests/, sudo hire-me, clear',
    whoami: 'Biswash Devkota',
    pwd: '/home/biswash/about',
    ls: 'about.txt  interests/',
    'ls interests/': 'machine-learning/  cybersecurity/  automation/',
    'sudo hire-me': '[sudo] permission granted.\nredirecting to #contact ...',
  };

  useEffect(() => {
    if (termBodyRef.current) {
      termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
    }
  }, [termLines]);

  const runCommand = (cmd: string) => {
    const newCmdHistory = [...cmdHistory, cmd];
    setCmdHistory(newCmdHistory);
    setHistoryIdx(newCmdHistory.length);

    const echoLine = { text: cmd, type: 'echo' as const };

    if (cmd === 'clear') {
      setTermLines([{ text: HELP_HINT, type: 'default' }]);
      setInputValue('');
      return;
    }

    if (cmd === 'sudo hire-me') {
      setTermLines((prev) => [...prev, echoLine, { text: commands[cmd], type: 'default' }]);
      setInputValue('');
      // Dispatch custom event to trigger contact sequence reset
      window.dispatchEvent(new Event('resetContact'));
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 800);
      return;
    }

    if (commands[cmd]) {
      setTermLines((prev) => [...prev, echoLine, { text: commands[cmd], type: 'default' }]);
    } else {
      setTermLines((prev) => [
        ...prev,
        echoLine,
        { text: `bash: command not found: ${cmd}. Type "help" for a list of commands.`, type: 'err' },
      ]);
    }
    setInputValue('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputValue.trim();
    if (!cmd) return;
    runCommand(cmd);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIdx = historyIdx - 1;
      if (nextIdx >= 0) {
        setHistoryIdx(nextIdx);
        setInputValue(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = historyIdx + 1;
      if (nextIdx < cmdHistory.length) {
        setHistoryIdx(nextIdx);
        setInputValue(cmdHistory[nextIdx]);
      } else {
        setHistoryIdx(cmdHistory.length);
        setInputValue('');
      }
    }
  };

  return (
    <section id="about">
      <h2 className="sec-title">01. About</h2>

      <div className="about-grid reveal">
        {/* ── Left: Interactive Terminal ── */}
        <div className="term-card" onClick={() => inputRef.current?.focus()}>
          <div className="term-head">
            <div className="dots-mini">
              <span style={{ background: '#ef5b5b' }} />
              <span style={{ background: '#f2a93b' }} />
              <span style={{ background: '#43d88a' }} />
            </div>
            <span className="term-title mono">visitor@nityaniyam: ~/about</span>
          </div>

          <div className="term-body mono" ref={termBodyRef}>
            {/* Static bio — never cleared */}
            <div className="term-line echo">cat about.txt</div>
            <div className="term-line" style={{ textAlign: 'justify', marginBottom: '14px' }}>
              I'm Biswash Devkota, a software engineer. I like solving problems with software,
              and I've been building projects that combine machine learning and cybersecurity.
              I'm always curious about how software works under the hood and how systems can be
              broken. I dedicate my time to exploring new tools, automating workflows, and
              building software that's secure, efficient, and scalable.
            </div>
            <div className="term-line" style={{ textAlign: 'justify', marginBottom: '14px' }}>
              I'm a passionate cybersecurity enthusiast with a strong pull toward offensive security.
            </div>

            {/* Dynamic outputs */}
            {termLines.map((line, idx) => {
              if (line.type === 'echo') {
                return (
                  <div key={idx} className="term-line echo">
                    {line.text}
                  </div>
                );
              }
              return (
                <div
                  key={idx}
                  className={`term-line${line.type === 'err' ? ' term-err' : ''}`}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {line.text}
                </div>
              );
            })}
          </div>

          {/* Input row */}
          <form onSubmit={handleSubmit} className="term-input-row">
            <span className="term-prompt mono">$</span>
            <div className="term-input-wrap">
              <input
                ref={inputRef}
                id="termInput"
                className="term-input mono"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoComplete="off"
                spellCheck={false}
                placeholder="type a command"
              />
              <span ref={measureRef} className="term-measure mono">{inputValue}</span>
              <span
                className="term-block-cursor"
                style={{ left: `${cursorLeft}px` }}
              />
            </div>
          </form>

          {/* Quick-command pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            padding: '0 18px 14px',
          }}>
            {QUICK_COMMANDS.map(({ label, cmd }) => (
              <button
                key={cmd}
                type="button"
                onClick={(e) => { e.stopPropagation(); runCommand(cmd); }}
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '11px',
                  color: 'var(--green)',
                  border: '1px solid var(--green-dim)',
                  borderRadius: '3px',
                  background: 'rgba(67,216,138,0.06)',
                  padding: '3px 9px',
                  cursor: 'pointer',
                  transition: 'all .15s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(67,216,138,0.14)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(67,216,138,0.06)';
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}