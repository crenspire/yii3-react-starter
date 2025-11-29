import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  // Vite project root = root directory
  root: __dirname,
  base: 'http://localhost:5173/',

  plugins: [
    react({
      jsxRuntime: 'classic',
      // Enable Fast Refresh - preamble is properly injected in inertia.php
      fastRefresh: true,
    }),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'assets/react/src'),
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', '@inertiajs/react'],
  },

  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    hmr: { host: 'localhost' },
    origin: 'http://localhost:5173',
    // Ensure Vite serves files from the correct root
    fs: {
      allow: ['..'],
    },
  },

  build: {
    outDir: resolve(__dirname, 'public/dist'),
    manifest: 'manifest.json',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'assets/react/src/main.jsx'),
    },
  },
});




