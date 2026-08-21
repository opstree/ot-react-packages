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
      "@workspace/ui/global.css": path.resolve(__dirname, "../../packages/ui/src/styles/global.css"),
      "@workspace/ui/lib/utils": path.resolve(__dirname, "../../packages/ui/src/lib/utils.ts"),
      "@workspace/ui/components/ui/accordion": path.resolve(__dirname, "../../packages/ui/src/components/ui/accordion.tsx"),
      "@workspace/ui/components/ui/alert": path.resolve(__dirname, "../../packages/ui/src/components/ui/alert.tsx"),
      "@workspace/ui/components/ui/aspect-ratio": path.resolve(__dirname, "../../packages/ui/src/components/ui/aspect-ratio.tsx"),
      "@workspace/ui/components/ui/badge": path.resolve(__dirname, "../../packages/ui/src/components/ui/badge.tsx"),
      "@workspace/ui/components/ui/button": path.resolve(__dirname, "../../packages/ui/src/components/ui/button.tsx"),
      "@workspace/ui/components/ui/collapsible": path.resolve(__dirname, "../../packages/ui/src/components/ui/collapsible.tsx"),
      "@workspace/ui/components/ui/dropdown": path.resolve(__dirname, "../../packages/ui/src/components/ui/dropdown.tsx"),
      "@workspace/ui/components/ui/icons": path.resolve(__dirname, "../../packages/ui/src/components/ui/icons.tsx"),
      "@workspace/ui/components/ui/popover": path.resolve(__dirname, "../../packages/ui/src/components/ui/popover.tsx"),
      "@workspace/ui/components/ui/scroll-area": path.resolve(__dirname, "../../packages/ui/src/components/ui/scroll-area.tsx"),
      "@workspace/ui/components/ui/separator": path.resolve(__dirname, "../../packages/ui/src/components/ui/separator.tsx"),
      "@workspace/ui/components/ui/tabs": path.resolve(__dirname, "../../packages/ui/src/components/ui/tabs.tsx"),
      "@workspace/ui/components/ui/tooltip": path.resolve(__dirname, "../../packages/ui/src/components/ui/tooltip.tsx"),
      "@workspace/ui/components/mui-components/ts/Table": path.resolve(__dirname, "../../packages/ui/src/components/mui-components/ts/Table.tsx"),
      "@workspace/ui/components/mui-components/Sidebar": path.resolve(__dirname, "../../packages/ui/src/components/mui-components/Sidebar.tsx"),
      "@workspace/ui": path.resolve(__dirname, "../../packages/ui/src"),
    },
    dedupe: ["react", "react-dom"],
  },
})