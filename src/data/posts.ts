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
  {
    slug: 'htb-cap-writeup',
    title: 'HackTheBox Cap: Writeup',
    date: '2026-07-10',
    tags: ['htb', 'ctf', 'walkthrough', 'linux'],
    excerpt:
      'A walkthrough of HTB\'s Cap machine — from an IDOR in a packet-capture dashboard to a Linux capability misconfiguration for root.',
    content: `# HackTheBox Cap: Writeup

Cap is a beginner-friendly Linux box on HackTheBox that chains a classic web IDOR with a Linux capability misconfiguration to get root. It's a great box for learning how file permissions aren't the only privilege boundary on Linux — capabilities matter too.

## Recon

Start with a full port scan:

\`\`\`bash
nmap -sC -sV -p- <target-ip>
\`\`\`

This turns up the usual suspects for a Linux web box:

| Port | Service |
|---|---|
| 21 | FTP |
| 22 | SSH |
| 80 | HTTP |

The web server hosts a small dashboard-style application that lets you trigger and download network packet captures — a nice hint about where the vulnerability lives.

## Finding the IDOR

The app exposes an endpoint that serves a capture file by an incrementing numeric ID, something like:

\`\`\`
/data/1
/data/2
/data/0
\`\`\`

Each ID returns a different \`.pcap\` file. Since there's no access control tying the requesting session to the ID, you can simply walk the IDs backward and pull captures that belong to other actions taken on the box — including ones triggered by an admin session. This is a textbook **Insecure Direct Object Reference (IDOR)**: the app trusts a client-supplied identifier without checking whether the current user is allowed to see that resource.

## Extracting Credentials from the Capture

Once you have a promising \`.pcap\`, open it in Wireshark or filter it on the command line:

\`\`\`bash
tshark -r 0.pcap -Y ftp
\`\`\`

Buried in the FTP control-channel traffic is a plaintext username and password — FTP doesn't encrypt credentials by default, so anything captured on that channel is trivially readable. These same credentials turn out to be reused for SSH, which is the actual way onto the box.

## Initial Foothold

\`\`\`bash
ssh <recovered-user>@<target-ip>
\`\`\`

That's the user flag secured. From here the interesting part starts: privilege escalation.

## Privilege Escalation: Linux Capabilities

Most people check SUID binaries first:

\`\`\`bash
find / -perm -4000 -type f 2>/dev/null
\`\`\`

But on Cap, the escalation path isn't a SUID bit — it's a **Linux capability** granted directly to a binary. Capabilities let a program get one specific piece of root's power (like binding to low ports, or raw socket access) without being fully setuid-root. Check for them with:

\`\`\`bash
getcap -r / 2>/dev/null
\`\`\`

A Python interpreter shows up with a capability that effectively lets it set its own UID. That's enough. From inside Python:

\`\`\`python
import os
os.setuid(0)
os.system('/bin/bash')
\`\`\`

Because the interpreter itself was granted the capability, calling \`setuid(0)\` from within it succeeds even though you're not root yet — and you land in a root shell.

## Root Flag

\`\`\`bash
cat /root/root.txt
\`\`\`

## Key Takeaways

- **IDORs aren't just a web-app footnote.** Any endpoint that takes a numeric or predictable ID needs an authorization check, not just an authentication check.
- **Unencrypted protocols leak credentials to anyone who can capture traffic**, even on boxes that otherwise look hardened.
- **\`find -perm -4000\` isn't a complete privesc checklist.** Always check \`getcap -r /\` too — capabilities are a separate, easy-to-forget privilege model on modern Linux.

---

*Part of an ongoing series working through HackTheBox machines. Writeups like this are as much about the "why it works" as the exact commands — understanding the underlying primitive (IDOR, capability misuse) is what transfers to the next box.*
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
