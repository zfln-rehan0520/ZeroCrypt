const CryptoEngine = {
    ITERATIONS: 310000,

    // Generate a random string using browser's crypto
    generateRaw(length, options) {
        const charSets = {
            l: 'abcdefghijklmnopqrstuvwxyz',
            u: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            n: '0123456789',
            s: '!@#$%^&*()_+'
        };
        let pool = charSets.l + charSets.u;
        if (options.numbers) pool += charSets.n;
        if (options.symbols) pool += charSets.s;

        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);
        return Array.from(array).map(x => pool[x % pool.length]).join('');
    },

    // Convert Master Password to a usable Key
    async deriveKey(password, salt) {
        const enc = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            'raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']
        );
        return crypto.subtle.deriveKey(
            { name: 'PBKDF2', salt, iterations: this.ITERATIONS, hash: 'SHA-256' },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
    },

    async encrypt(text, master) {
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await this.deriveKey(master, salt);
        const encoded = new TextEncoder().encode(text);
        
        const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
        
        return {
            ct: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
            iv: btoa(String.fromCharCode(...iv)),
            salt: btoa(String.fromCharCode(...salt))
        };
    },

    async decrypt(data, master) {
        try {
            const salt = new Uint8Array(atob(data.salt).split('').map(c => c.charCodeAt(0)));
            const iv = new Uint8Array(atob(data.iv).split('').map(c => c.charCodeAt(0)));
            const ct = new Uint8Array(atob(data.ct).split('').map(c => c.charCodeAt(0)));
            
            const key = await this.deriveKey(master, salt);
            const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
            return new TextDecoder().decode(decrypted);
        } catch (e) {
            return "!! INVALID MASTER PASSWORD !!";
        }
    }
};
