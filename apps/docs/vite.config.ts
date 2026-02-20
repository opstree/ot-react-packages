import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import mdx from 'fumadocs-mdx/vite';
import * as MdxConfig from './source.config';
import { componentApi } from './app/docs/component-api';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mdx(MdxConfig),
    componentApi()
  ],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
})