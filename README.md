# 🔐 Password Generator Manager (CSPRNG)

A security-focused web utility designed for generating and managing cryptographically secure passwords. Unlike standard generators, this tool utilizes the **Web Crypto API** for high-entropy randomness.

## 🚀 Features
- **CSPRNG Implementation**: Uses `window.crypto.getRandomValues()` instead of `Math.random()` to prevent predictability.
- **Local Vault**: Persistent storage using `localStorage` for quick access to generated credentials.
- **Customizable Entropy**: Adjustable length (8-50 chars) and character set toggles.
- **Dark Mode UI**: Professional cybersecurity-themed interface.

## 🛠️ Tech Stack
- **Frontend**: HTML5, CSS3 (Modern Flexbox/Grid)
- **Security**: Vanilla JavaScript with Web Crypto API
- **Persistence**: Browser Storage API

## 📋 Roadmap
- [ ] **Phase 3**: Implement AES-GCM encryption for the local vault.
- [ ] **Phase 4**: Add a Master Password authentication system.
- [ ] **Phase 5**: Export vault to encrypted CSV/JSON.

---
*Created as part of the LYBERNET portfolio – 2026*
