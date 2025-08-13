import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import updateVersion from './scripts/versionUpdater.mjs';
import path from 'path'; // Importar path usando ES modules

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {

    const version = await updateVersion(mode);

    return {
        base: '/react-cv/', // Set the base path for GitHub Pages
        resolve: {
            alias: {
                '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
            }
        },
        plugins: [react(),
        {
            name: 'version-display',
            transformIndexHtml(html) {
                return html.replace(
                    '<title>',
                    `<title>v${version} | `
                );
            }
        },
        ],
    }
})
