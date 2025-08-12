import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import AutoVersion from "vite-plugin-auto-version";

// https://vite.dev/config/
export default defineConfig({
    base: '/react-cv/', // Set the base path for GitHub Pages
    plugins: [react(),
    AutoVersion({ insertCheck: true, refreshTime: 10 * 60 * 1000 }),
    ],
})
