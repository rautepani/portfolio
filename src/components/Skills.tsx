import {
  Terminal,
  Clock,
  Users,
  FileText,
  Edit3,
} from 'lucide-react';

// Helper to construct a custom colored SVG from Simple Icons CDN
const SimpleIcon = ({ slug, color }: { slug: string; color: string }) => {
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color}`}
      alt={`${slug} icon`}
      width={18}
      height={18}
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
      { icon: <Terminal className="text-green-500" size={18} />, label: 'Bash' },
      { icon: <SimpleIcon slug="scikitlearn" color="F7931E" />, label: 'Scikit-learn' },
      { icon: <SimpleIcon slug="pandas" color="150458" />, label: 'Pandas' },
    ],
  },
  {
    title: 'Cloud & Infra',
    tools: [
      { icon: <SimpleIcon slug="linux" color="FCC624" />, label: 'Linux' },
      { icon: <SimpleIcon slug="docker" color="2496ED" />, label: 'Docker' },
      { icon: <SimpleIcon slug="git" color="F05032" />, label: 'Git' },
      { icon: <SimpleIcon slug="postgresql" color="4169E1" />, label: 'PostgreSQL' },
    ],
  },
];

const softSkillsGroup = {
  title: 'Soft Skills',
  tools: [
    { icon: <Clock className="text-pink-500" size={18} />, label: 'Time Management' },
    { icon: <Users className="text-blue-500" size={18} />, label: 'Teamwork' },
    { icon: <FileText className="text-yellow-500" size={18} />, label: 'Documentation' },
    { icon: <Edit3 className="text-green-500" size={18} />, label: 'Report Writing' },
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