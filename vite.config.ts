import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // Animation — only needed on landing page
          "vendor-motion": ["framer-motion"],
          // Charts — only used in simulator results
          "vendor-charts": ["recharts"],
          // PDF/canvas — only used in simulator results
          "vendor-pdf": ["jspdf", "html2canvas"],
          // UI primitives
          "vendor-radix": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-select",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-label",
            "@radix-ui/react-tooltip",
          ],
        },
      },
    },
    // Raise the warning limit to 600kB — we've split the big chunks
    chunkSizeWarningLimit: 600,
  },
}));
