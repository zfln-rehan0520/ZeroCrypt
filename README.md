<div align="center">

# 🔐 Password Generator & Manager

**A secure, browser-based password tool — no server, no signup, no tracking.**

![Version](https://img.shields.io/badge/version-1.0.0-7c3aed)
![License](https://img.shields.io/badge/license-MIT-a78bfa)
![Security](https://img.shields.io/badge/encryption-AES--256--GCM-4ade80)
![Platform](https://img.shields.io/badge/platform-browser-60a5fa)

</div>

---

## 📖 Overview

**Password Generator & Manager** is a fully client-side web application that lets you generate cryptographically secure passwords and store them safely in your browser — all without any backend, database, or internet connection required.

Every password is encrypted using **AES-256-GCM** (industry-standard encryption) derived from your personal master password via **PBKDF2 + SHA-256** with 310,000 iterations. Your data never leaves your device.

---

## ✨ Features

### 🔑 Password Generation
- Custom password **length** (6–64 characters)
- Toggle **Uppercase**, **Lowercase**, **Numbers**, **Symbols**
- Powered by `crypto.getRandomValues()` — cryptographically secure, not Math.random()
- One-click **copy to clipboard**

### 🔒 Encryption & Security
- **AES-256-GCM** encryption for all saved passwords
- **PBKDF2 + SHA-256** key derivation (310,000 rounds — OWASP recommended)
- Unique **random salt + IV** per password — no two encryptions are alike
- **SHA-256 fingerprinting** — identify passwords without exposing them
- Master password **never stored** — only held in memory during session

### 🗄️ Password Vault
- Save unlimited passwords to your **local vault**
- Passwords stored as **encrypted blobs** in localStorage
- **Reveal on demand** — decrypts temporarily for 5 seconds, then hides again
- Delete individual entries anytime

### 🎨 UI / UX
- Clean **dark theme** interface
- Fully **responsive** — works on desktop and mobile
- **No dependencies** — pure HTML, CSS, and Vanilla JS
- **No build step** — just open `index.html` and go

---

## Getting Started

```bash
git clone https://github.com/zfln-rehan0520/password-generator-manager.git
cd password-generator-manager
# Open index.html in any modern browser
```

No installation or build step needed.

---

## Security

| Layer | Algorithm |
|-------|-----------|
| Randomness | `crypto.getRandomValues()` |
| Hashing | SHA-256 |
| Key Derivation | PBKDF2 + SHA-256 (310,000 rounds) |
| Encryption | AES-256-GCM |

---

## ⚠️ Note

Never forget your Master Password — it cannot be recovered. Clearing browser storage will delete your vault permanently.

---

## License

MIT © [zfln-rehan0520](https://github.com/zfln-rehan0520)

