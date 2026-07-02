import { useState, useEffect } from 'react';

export default function Footer() {
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString('en-GB'));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="statusbar">
      <span className="live">connection secure</span>
      <span>lat: 27.7°N</span>
      <span>build: v2.0.0</span>
      <span className="spacer"></span>
      <span id="clock">{time}</span>
    </div>
  );
}