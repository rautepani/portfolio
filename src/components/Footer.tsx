import { Terminal, ExternalLink } from 'lucide-react';

export default function Footer() {
  

  return (
    <footer className="border-t border-gray-800 bg-[#0a0a0a] py-14 px-6">
      <div className="max-w-5xl mx-auto">

        {/* TOP SECTION */}
        <div className="grid md:grid-cols-3 gap-10 mb-10">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm mb-3">
              <Terminal size={16} />
              <span className="font-bold tracking-wide">biswash.dev</span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Software engineer building modern web applications and exploring cybersecurity,
              with a focus on clean systems and practical engineering.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>

            <ul className="space-y-2 text-sm">
              {['About', 'Projects', 'Skills', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-2"
                  >
                    <span className="text-emerald-500">→</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Connect</h4>

            <ul className="space-y-2 text-sm">
              {[
                { name: 'GitHub', url: 'https://github.com/biswashniyam' },
                { name: 'LinkedIn', url: 'https://linkedin.com/in/biswash-devkota-31814026a/' },
                { name: 'Twitter', url: 'https://x.com/Biswash_dev369' },
              ].map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-2"
                  >
                    <ExternalLink size={12} />
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-8" />

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">

        

          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span>Available for internships & opportunities</span>
          </div>

        </div>
      </div>
    </footer>
  );
}