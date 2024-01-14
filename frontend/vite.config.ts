import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const VITE_API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/task-tracker/v1';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: VITE_API_BASE_URL,
        changeOrigin: true,
        secure:true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
