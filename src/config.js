let config;

if (import.meta.env.MODE === 'development') {
    config = await import('./config.development.js');
} else {
    config = await import('./config.production.js');
}

export default config.default;
