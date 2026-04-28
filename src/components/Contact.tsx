import { Github, Linkedin, Twitter, Mail, MapPin, Send, AlertCircle, CheckCircle } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { useState } from 'react';
import { SOCIAL_LINKS, PERSONAL_INFO } from '../constants';

const socials = [
  {
    icon: <Github size={18} />,
    label: 'GitHub',
    handle: '@biswashniyam',
    href: SOCIAL_LINKS.github,
    color: 'hover:border-gray-400/40 hover:text-gray-200',
  },
  {
    icon: <Linkedin size={18} />,
    label: 'LinkedIn',
    handle: 'Biswash Devkota',
    href: SOCIAL_LINKS.linkedin,
    color: 'hover:border-blue-400/40 hover:text-blue-400',
  },
  {
    icon: <Twitter size={18} />,
    label: 'Twitter / X',
    handle: '@Biswash_dev369',
    href: SOCIAL_LINKS.twitter,
    color: 'hover:border-sky-400/40 hover:text-sky-400',
  },
];

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all fields');
      setFormState('error');
      setTimeout(() => setFormState('idle'), 3000);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      setFormState('error');
      setTimeout(() => setFormState('idle'), 3000);
      return;
    }

    setFormState('loading');

    try {
      const res = await fetch('https://formsubmit.co/ajax/biswash.devkota@example.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormState('idle'), 3000);
      } else {
        throw new Error();
      }
    } catch {
      setFormState('error');
      setErrorMessage('Failed to send message. Please try again.');
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  return (
    <div className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="max-w-5xl mx-auto relative">
        <SectionHeader
          label="05"
          title="Contact"
          subtitle="Have a project or opportunity in mind? Let's talk."
        />

        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT SIDE */}
          <div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              I'm always open to discussing opportunities, projects, or tech ideas.
              Feel free to connect through any platform below or send a message directly.
            </p>

            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <MapPin size={14} className="text-emerald-400" />
              <span>{PERSONAL_INFO.location}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
              <Mail size={14} className="text-emerald-400" />
              <span>Open for internships & freelance</span>
            </div>

            <div className="space-y-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-3 bg-gray-900 border border-gray-800 ${s.color} rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/5`}
                >
                  <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center">
                    {s.icon}
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500">{s.label}</div>
                    <div className="text-sm text-gray-200">{s.handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            {formState === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-8 text-center">
                <CheckCircle size={28} className="text-emerald-400 mb-3" />
                <h3 className="text-white font-semibold text-lg">Message sent!</h3>
                <p className="text-gray-400 text-sm mt-2">
                  Thanks for reaching out — I’ll respond soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4"
              >
                {formState === 'error' && (
                  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <AlertCircle size={14} className="text-red-400" />
                    <p className="text-red-300 text-sm">{errorMessage}</p>
                  </div>
                )}

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-200 focus:border-emerald-500 outline-none"
                />

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-200 focus:border-emerald-500 outline-none"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Your message"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-200 focus:border-emerald-500 outline-none resize-none"
                />

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium py-2.5 rounded-lg transition"
                >
                  {formState === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}