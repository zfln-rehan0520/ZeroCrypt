/**
 * storage.js - LocalStorage Management
 * General Purpose Edition
 */

const VaultStorage = {
    // We use a neutral key for general public use
    KEY: 'vlt_encrypted_vault', 
    
    get() {
        try {
            const data = localStorage.getItem(this.KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Vault Error: Could not parse storage.", e);
            return [];
        }
    },
    
    save(data) {
        localStorage.setItem(this.KEY, JSON.stringify(data));
    },
    
    add(entry) {
        const db = this.get();
        db.push(entry);
        this.save(db);
    },

    deleteEntry(id) {
        const db = this.get();
        const filteredDb = db.filter(item => item.id != id);
        this.save(filteredDb);
    }
};
