import { Award, ExternalLink, CheckCircle2, Cloud, ShieldCheck } from 'lucide-react';

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  status: string;
  iconType?: 'aws' | 'secops' | 'thm' | 'default';
  iconSlug?: string;
  verifyUrl?: string;
}

const certificates: Certificate[] = [
  {
    name: 'Certified Network Security Practitioner (CNSP)',
    issuer: 'The SecOps Group',
    date: 'Jan 16, 2025',
    status: 'verified',
    iconType: 'secops',
    verifyUrl: 'https://biswashdevkota.com.np',
  },
  {
    name: 'AWS Academy Graduate — Cloud Architecting',
    issuer: 'AWS Academy',
    date: 'May 06, 2026',
    status: 'verified',
    iconType: 'aws',
    verifyUrl: 'https://biswashdevkota.com.np',
  },
  {
    name: 'Jr Penetration Tester',
    issuer: 'TryHackMe',
    date: 'Nov 22, 2025',
    status: 'verified',
    iconType: 'thm',
    iconSlug: 'tryhackme',
    verifyUrl: 'https://biswashdevkota.com.np',
  },
  {
    name: 'SOC Level 1',
    issuer: 'TryHackMe',
    date: 'Dec 20, 2025',
    status: 'verified',
    iconType: 'thm',
    iconSlug: 'tryhackme',
    verifyUrl: 'https://biswashdevkota.com.np',
  },
];

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

export default function Certificates() {
  return (
    <section id="certificates">
      <div className="sec-label">ls -la ~/certificates</div>
      <h2 className="sec-title">05. Certificates</h2>

      <div className="cert-grid reveal">
        {certificates.map((cert) => (
          <div key={cert.name} className="cert-card">
            <div className="cert-card-header">
              <div className="cert-badge">
                {cert.iconType === 'thm' && cert.iconSlug ? (
                  <SimpleIcon slug={cert.iconSlug} color="43D88A" />
                ) : cert.iconType === 'aws' ? (
                  <Cloud size={20} className="cert-award-icon" />
                ) : cert.iconType === 'secops' ? (
                  <ShieldCheck size={20} className="cert-award-icon" />
                ) : (
                  <Award size={20} className="cert-award-icon" />
                )}
              </div>

              <div className="cert-status-tag">
                <CheckCircle2 size={13} />
                <span>{cert.status}</span>
              </div>
            </div>

            <div className="cert-card-body">
              <h3 className="cert-title">{cert.name}</h3>
              <div className="cert-issuer">{cert.issuer}</div>
            </div>

            <div className="cert-card-footer">
              <span className="cert-date">{cert.date}</span>
              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-verify-link"
                >
                  verify <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
