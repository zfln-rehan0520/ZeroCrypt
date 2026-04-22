const VaultStorage = {
    KEY: 'rehan_vault_data',
    
    get() {
        return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    },
    
    save(data) {
        localStorage.setItem(this.KEY, JSON.stringify(data));
    },
    
    add(entry) {
        const db = this.get();
        db.push(entry);
        this.save(db);
    }
};
