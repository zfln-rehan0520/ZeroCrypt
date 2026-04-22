const CryptoEngine = {
    // ... keep ITERATIONS and deriveKey as they are

    generateRaw(length, options) {
        const charSets = {
            upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lower: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        };

        let pool = '';
        if (options.upper) pool += charSets.upper;
        if (options.lower) pool += charSets.lower;
        if (options.numbers) pool += charSets.numbers;
        if (options.symbols) pool += charSets.symbols;

        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);
        
        return Array.from(array)
            .map(x => pool[x % pool.length])
            .join('');
    },
    
    // ... keep encrypt and decrypt as they are
};
