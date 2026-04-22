// storage.js — Encrypted storage using crypto.js functions

const STORAGE_KEY = 'saved_passwords';

// Save encrypted password with SHA-256 fingerprint
async function savePassword(password, masterPassword) {
  const passwords = getPasswords();
  const encrypted = await encryptPassword(password, masterPassword);
  const fingerprint = await getFingerprint(password);
  passwords.push({ encrypted, fingerprint });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(passwords));
}

// Returns raw array from localStorage
function getPasswords() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Decrypt a single entry
async function decryptEntry(index, masterPassword) {
  const passwords = getPasswords();
  if (!passwords[index]) return null;
  return await decryptPassword(passwords[index].encrypted, masterPassword);
}

// Delete by index
function deletePassword(index) {
  const passwords = getPasswords();
  passwords.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(passwords));
}
