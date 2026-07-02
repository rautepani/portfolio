export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: 'getting-started-with-ctf',
    title: 'Getting Started with CTF: A Beginners Roadmap',
    date: '2026-06-28',
    tags: ['ctf', 'security', 'beginner'],
    excerpt:
      'CTFs can feel overwhelming at first. Here is the roadmap I wish I had when I started — covering categories, tools, and the mindset that actually matters.',
    content: `# Getting Started with CTF: A Beginner's Roadmap

Capture The Flag competitions are one of the best ways to sharpen your offensive security skills. But if you've never done one, the landscape can feel overwhelming.

## What Even Is a CTF?

A CTF (Capture The Flag) is a cybersecurity competition where you solve challenges to find hidden strings called "flags" — usually in the format \`flag{...}\`. There are two main formats:

- **Jeopardy-style** — Independent challenges across categories (web, crypto, pwn, forensics, misc). Most beginner-friendly.
- **Attack/Defense** — Teams attack each other's services while defending their own. More advanced.

## Core Categories

| Category | What You're Doing |
|---|---|
| Web | Exploiting HTTP, XSS, SQLi, SSRF, auth bugs |
| Cryptography | Breaking ciphers, RSA, hashes |
| Pwn / Binary Exploit | Buffer overflows, ret2libc, shellcode |
| Forensics | Analyzing files, memory dumps, network captures |
| Reverse Engineering | Disassembling binaries to understand logic |
| OSINT | Finding information from public sources |
| Misc | Steganography, programming puzzles, anything else |

## Tools to Get Started

\`\`\`bash
# Web
burpsuite, ffuf, sqlmap, curl, browser devtools

# Crypto
CyberChef, pycryptodome, openssl

# Forensics
binwalk, exiftool, wireshark, volatility

# Pwn
gdb-peda, pwntools, ghidra, radare2

# General
python3, netcat, nmap, hashcat, john
\`\`\`

## Where to Practice

1. **PicoCTF** — Best for absolute beginners. Free, always online.
2. **HackTheBox** — Labs + CTF events. Intermediate to advanced.
3. **TryHackMe** — Guided learning paths. Very beginner-friendly.
4. **CTFtime.org** — Calendar of upcoming competitions worldwide.

## The Mindset

The most important skill in CTF isn't knowing every tool. It's **not giving up when stuck**. When a challenge feels impossible:

1. Re-read the challenge description — the hint is often there
2. Google the exact error or technique name
3. Try the simplest thing you haven't tried yet
4. Take a break and come back with fresh eyes

CTF is a skill built over time. Every challenge teaches you something, even the ones you don't solve.

---

*This is the first in a series of posts on CTF and offensive security. Next up: Web exploitation basics.*
`,
  },
  {
    slug: 'phishing-url-detection-ml',
    title: 'Building a Phishing URL Detector with Machine Learning',
    date: '2026-07-01',
    tags: ['machine-learning', 'security', 'python'],
    excerpt:
      'How I built a phishing URL classifier using Python and scikit-learn — from feature engineering to a working model with 96% accuracy.',
    content: `# Building a Phishing URL Detector with Machine Learning

Phishing URLs are one of the most common attack vectors in the wild. I built a classifier that flags malicious URLs with ~96% accuracy using traditional ML techniques — no deep learning required.

## The Problem

A phishing URL looks legitimate at first glance:
- \`https://paypa1-secure.login.com/auth\`
- \`https://amazon-account-update.xyz/signin\`

Humans miss these. A model can catch the patterns.

## Dataset

I used the **PhiUSIIL Phishing URL Dataset** from the UCI Machine Learning Repository — 235,795 URLs labeled as phishing or legitimate.

## Feature Engineering

Raw URLs aren't directly usable by ML models. I extracted 30+ features:

\`\`\`python
def extract_features(url):
    parsed = urlparse(url)
    return {
        'url_length': len(url),
        'num_dots': url.count('.'),
        'num_hyphens': url.count('-'),
        'num_at': url.count('@'),
        'num_digits': sum(c.isdigit() for c in url),
        'has_ip': bool(re.match(r'\\d+\\.\\d+\\.\\d+\\.\\d+', parsed.netloc)),
        'has_https': int(parsed.scheme == 'https'),
        'subdomain_depth': len(parsed.netloc.split('.')) - 2,
        'path_depth': parsed.path.count('/'),
        'has_suspicious_words': int(any(w in url.lower() 
            for w in ['login', 'secure', 'update', 'verify', 'bank'])),
        # ... 20+ more features
    }
\`\`\`

## Model Selection

I tested several models:

| Model | Accuracy | F1 Score |
|---|---|---|
| Logistic Regression | 91.2% | 0.91 |
| Random Forest | 96.1% | 0.96 |
| XGBoost | 96.8% | 0.97 |
| SVM | 93.4% | 0.93 |

**Random Forest** won on the accuracy/explainability tradeoff.

## Results

- **Accuracy**: 96.1%
- **Precision**: 95.8%
- **Recall**: 96.4%
- **False Positive Rate**: 3.6% (legitimate URLs flagged as phishing)

The false positive rate is the most important metric in practice — you don't want to block legitimate sites.

## What I Learned

Feature engineering matters more than model choice for this problem. The difference between a 91% and 96% model was in the features, not the algorithm.

The full project is on [GitHub](https://github.com/rautepani/phishing-url-detector).
`,
  },
];

export function getLatestPosts(n = 3): Post[] {
  return [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, n);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
