const VaultStorage = {
    KEY: 'vlt_local_storage',
    get() { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); },
    save(data) { localStorage.setItem(this.KEY, JSON.stringify(data)); },
    add(entry) { const d = this.get(); d.push(entry); this.save(d); },
    delete(id) { const d = this.get().filter(i => i.id != id); this.save(d); }
};
