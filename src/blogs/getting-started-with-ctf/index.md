---
slug: getting-started-with-ctf
title: "Getting Started with CTF: A Beginners Roadmap"
date: "2026-06-28"
tags: ["ctf", "security", "beginner"]
excerpt: "CTFs can feel overwhelming at first. Here is the roadmap I wish I had when I started — covering categories, tools, and the mindset that actually matters."
---

# Getting Started with CTF: A Beginner's Roadmap

Capture The Flag competitions are one of the best ways to sharpen your offensive security skills. But if you've never done one, the landscape can feel overwhelming.

## What Even Is a CTF?

A CTF (Capture The Flag) is a cybersecurity competition where you solve challenges to find hidden strings called "flags" — usually in the format `flag{...}`. There are two main formats:

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

```bash
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
```

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
