/**
 * app.js - Managed by Mohammed Rehan
 * GitHub: zfln-rehan0520
 */

// 1. SECURE CONTEXT CHECK
// This is mandatory for Web Crypto API to function
if (!window.isSecureContext) {
    console.warn("Web Crypto API requires a secure context (HTTPS or localhost).");
    // We don't alert here to avoid annoying the user if they're just looking at the UI,
    // but we will catch errors during actual encryption/decryption.
}

const UI = {
    render() {
        const root = document.getElementById('app');
        if (!root) return;

        root.innerHTML = `
            <h1>🔐 VAULT v1.0</h1>
            <p style="font-size: 0.8rem; opacity: 0.6; margin-bottom: 20px;">Private Zero-Knowledge Manager</p>
            
            <input type="password" id="master-input" placeholder="Set Master Password" autocomplete="new-password">
            
            <div class="tool-box" style="margin-top: 20px; border-top: 1px solid #333; padding-top: 20px;">
                <h3 style="color: var(--accent); font-size: 0.9rem;">+ ADD NEW KEY</h3>
                <input type="text" id="label-input" placeholder="Service Name (e.g. Gmail, GitHub)">
                <button id="gen-btn">GENERATE & ENCRYPT</button>
            </div>

            <div id="vault-display" style="margin-top: 30px;">
                </div>
            
            <div style="display: flex; gap: 10px; margin-top: 40px;">
                <button id="export-btn" style="background:#333; color:#eee; font-size: 0.7rem;">EXPORT JSON</button>
                <button id="clear-btn" style="background:#800; color:white; font-size: 0.7rem;">WIPE LOCAL VAULT</button>
            </div>
        `;
        this.bindEvents();
        this.refreshVault();
    },

    async handleSave() {
        const master = document.getElementById('master-input').value;
        const label = document.getElementById('label-input').value;

        if (!master) return alert("Security Error: You must set a Master Password first.");
        if (!label) return alert("Input Error: Please provide a label (e.g., 'Instagram').");

        try {
            // Generate 16-char secure string
            const rawPass = CryptoEngine.generateRaw(16, { numbers: true, symbols: true });
            
            // Encrypt using our crypto.js engine
            const encrypted = await CryptoEngine.encrypt(rawPass, master);
            
            // Save to localStorage via storage.js
            VaultStorage.add({ 
                label: label.toUpperCase(), 
                ...encrypted, 
                id: Date.now() 
            });

            // Clear input and refresh
            document.getElementById('label-input').value = '';
            this.refreshVault();
            
            console.log("Entry encrypted and stored successfully.");
        } catch (err) {
            alert("Encryption Failed: Ensure you are using a Secure Context (HTTPS/Localhost).");
            console.error(err);
        }
    },

    refreshVault() {
        const list = document.getElementById('vault-display');
        const data = VaultStorage.get();
        
        if (data.length === 0) {
            list.innerHTML = '<p style="opacity:0.4; font-size:0.8rem;">Vault is empty.</p>';
            return;
        }

        list.innerHTML = '<h3 style="font-size: 0.9rem; border-bottom: 1px solid #333;">ENCRYPTED KEYS</h3>';
        
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'vault-card';
            div.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong>${item.label}</strong>
                    <button onclick="UI.deleteItem('${item.id}')" style="width:auto; padding:2px 8px; background:transparent; color:#ff4444; border:none;">[x]</button>
                </div>
                <small style="display:block; opacity:0.5; font-size:0.6rem; margin-bottom:10px;">ID: ${item.ct.substring(0, 12)}...</small>
                
                <div style="display:flex; gap:10px;">
                    <button onclick="UI.reveal('${item.id}')" style="font-size:0.7rem; padding:5px;">REVEAL</button>
                    <div id="p-${item.id}" class="hidden" style="color:var(--accent); font-family:monospace; align-self:center; letter-spacing:1px;"></div>
                </div>
            `;
            list.appendChild(div);
        });
    },

    async reveal(id) {
        const master = document.getElementById('master-input').value;
        if (!master) return alert("Master Password required to decrypt.");
        
        const entry = VaultStorage.get().find(e => e.id == id);
        const pass = await CryptoEngine.decrypt(entry, master);
        
        const display = document.getElementById(`p-${id}`);
        display.innerText = pass;
        display.classList.remove('hidden');
        
        // Auto-hide after 5 seconds for security
        setTimeout(() => {
            display.innerText = '';
            display.classList.add('hidden');
        }, 5000);
    },

    deleteItem(id) {
        if (confirm("Delete this entry permanently?")) {
            VaultStorage.deleteEntry(id); // Ensure storage.js has deleteEntry
            this.refreshVault();
        }
    },

    bindEvents() {
        document.getElementById('gen-btn').onclick = () => this.handleSave();
        
        document.getElementById('export-btn').onclick = () => {
            const data = localStorage.getItem(VaultStorage.KEY);
            if (!data || data === '[]') return alert("Vault is empty.");
            
            const blob = new Blob([data], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `vault_backup_${new Date().toISOString().slice(0,10)}.json`;
            a.click();
        };

        document.getElementById('clear-btn').onclick = () => {
            if (confirm("WARNING: This will delete ALL saved passwords. Continue?")) {
                localStorage.removeItem(VaultStorage.KEY);
                this.refreshVault();
            }
        };
    }
};

// Initialize the UI
document.addEventListener('DOMContentLoaded', () => UI.render());
