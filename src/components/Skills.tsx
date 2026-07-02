import {
  Shield,
  Search,
  Globe,
  Database,
  Terminal,
  Layers,
  Network,
  Clock,
  Users,
  FileText,
  Edit3,
  Cloud,
} from 'lucide-react';


// Helper to construct a custom colored SVG from Simple Icons CDN
const SimpleIcon = ({ slug, color }: { slug: string; color: string }) => {
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color}`}
      alt={`${slug} icon`}
      width={14}
      height={14}
      style={{ display: 'block' }}
    />
  );
};

const groups = [
  {
    title: 'Languages & Core',
    tools: [
      { icon: <SimpleIcon slug="python" color="3776AB" />, label: 'Python' },
      { icon: <SimpleIcon slug="javascript" color="F7DF1E" />, label: 'JavaScript' },
      { icon: <SimpleIcon slug="rust" color="CE412B" />, label: 'Rust' },
      { icon: <Terminal className="text-green-500" size={14} />, label: 'Bash' },
    ],
  },
  {
    title: 'Security & Testing',
    tools: [
      { icon: <Search className="text-cyan-500" size={14} />, label: 'nmap' },
      { icon: <SimpleIcon slug="wireshark" color="1679A7" />, label: 'Wireshark' },
      { icon: <Shield className="text-red-500" size={14} />, label: 'Burp Suite' },
      { icon: <Database className="text-green-500" size={14} />, label: 'API Testing' },
    ],
  },
  {
    title: 'Cloud & Data',
    tools: [
      { icon: <Cloud className="text-orange-500" size={14} />, label: 'AWS EC2' },
      { icon: <Cloud className="text-cyan-500" size={14} />, label: 'AWS S3' },
      { icon: <SimpleIcon slug="postgresql" color="4169E1" />, label: 'PostgreSQL' },
    ],
  },
  {
    title: 'Machine Learning',
    tools: [
      { icon: <SimpleIcon slug="pandas" color="150458" />, label: 'Pandas' },
      { icon: <SimpleIcon slug="numpy" color="013243" />, label: 'NumPy' },
      { icon: <SimpleIcon slug="tensorflow" color="FF6F00" />, label: 'TensorFlow' },
      { icon: <SimpleIcon slug="scikitlearn" color="F7931E" />, label: 'Scikit-learn' },
    ],
  },
  {
    title: 'Tools & Infra',
    tools: [
      { icon: <SimpleIcon slug="linux" color="FCC624" />, label: 'Linux' },
      { icon: <SimpleIcon slug="git" color="F05032" />, label: 'Git' },
      { icon: <Layers className="text-blue-400" size={14} />, label: 'Virtualization' },
      { icon: <SimpleIcon slug="docker" color="2496ED" />, label: 'Docker' },
      { icon: <SimpleIcon slug="kubernetes" color="326CE5" />, label: 'Kubernetes' },
      { icon: <Globe className="text-green-600" size={14} />, label: 'CI/CD' },
      { icon: <Network className="text-teal-500" size={14} />, label: 'Packet Tracer' },
    ],
  },
];

const softSkillsGroup = {
  title: 'Soft Skills',
  tools: [
    { icon: <Clock className="text-pink-500" size={14} />, label: 'Time Management' },
    { icon: <Users className="text-blue-500" size={14} />, label: 'Teamwork' },
    { icon: <FileText className="text-yellow-500" size={14} />, label: 'Documentation' },
    { icon: <Edit3 className="text-green-500" size={14} />, label: 'Report Writing' },
  ],
};

export default function Skills() {
  return (
    <section id="skills">
      <div className="sec-label">ls ~/.arsenal/</div>
      <h2 className="sec-title">02. My Arsenal</h2>

      <div className="reveal skills-panels-container">
        {groups.map((group, index) => (
          <div key={group.title} className="skills-panel-card">
            <div className="skills-panel-header">
              <span className="skills-panel-num">{(index + 1).toString().padStart(2, '0')}</span>
              <span className="skills-panel-title">{group.title}</span>
            </div>
            <div className="skills-panel-body">
              <div className="skills-pills-row">
                {group.tools.map((tool) => (
                  <div key={tool.label} className="skill-pill-item">
                    <span className="skill-pill-icon">{tool.icon}</span>
                    <span className="skill-pill-label">{tool.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Full-width bar for Soft Skills */}
        <div className="skills-panel-card skills-panel-fullwidth">
          <div className="skills-panel-header">
            <div className="skills-panel-eyebrow">
              <SimpleIcon slug="trello" color="0079BF" />
              <span>{softSkillsGroup.title.toUpperCase()}</span>
            </div>
          </div>
          <div className="skills-panel-body">
            <div className="skills-pills-row">
              {softSkillsGroup.tools.map((tool) => (
                <div key={tool.label} className="skill-pill-item">
                  <span className="skill-pill-icon">{tool.icon}</span>
                  <span className="skill-pill-label">{tool.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}