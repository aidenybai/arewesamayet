import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import million from 'million/compiler';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [million.vite(), react(), viteSingleFile()],
});
