import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000,
    },
    root: './dev', // Let's use a dev folder for the preview app
});
