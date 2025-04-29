import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/capstone-endgame/', // Set the base path for GitHub Pages
  plugins: [react()],
});