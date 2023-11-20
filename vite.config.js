import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import million from 'million/compiler';

export default defineConfig({
  plugins: [million.vite(), react()],
});
