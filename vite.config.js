import fs from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const root = import.meta.dirname;
// Set VITE_PORT to run the dev server on another port; the hot file tells PHP where it is.
const port = Number(process.env.VITE_PORT ?? 5173);
const devServerUrl = `http://localhost:${port}`;

/**
 * Writes public/hot while the dev server runs. The Inertia root view uses the dev server whenever the file exists.
 */
function hotFile(path) {
  return {
    name: 'hot-file',
    apply: 'serve',
    configureServer(server) {
      server.httpServer?.once('listening', () => fs.writeFileSync(path, devServerUrl));

      const remove = () => fs.rmSync(path, { force: true });
      process.on('exit', remove);
      for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
        process.on(signal, () => process.exit());
      }
    },
  };
}

export default defineConfig(({ command }) => ({
  root,
  // Built assets are served from /dist; the dev server serves from its own root.
  base: command === 'build' ? '/dist/' : '/',
  publicDir: false,

  plugins: [
    react(),
    tailwindcss(),
    hotFile(resolve(root, 'public/hot')),
  ],

  resolve: {
    alias: {
      '@': resolve(root, 'assets/react/src'),
    },
  },

  server: {
    host: 'localhost',
    port,
    strictPort: true,
    origin: devServerUrl,
    cors: true,
  },

  build: {
    outDir: resolve(root, 'public/dist'),
    manifest: 'manifest.json',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(root, 'assets/react/src/main.jsx'),
    },
  },
}));
