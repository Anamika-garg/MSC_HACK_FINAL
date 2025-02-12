import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base : '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      
      external: ['react-pdftotext'],
      output: {
        manualChunks(id) {
          if (id.includes('pdfjs-dist/build/pdf.worker.min.js')) {
            return 'pdf-worker';
          }
        },
      },
    },
    commonjsOptions: { // Add this if you still have CommonJS-related issues
        transformMixedEsModules: true,
      },
  },
  optimizeDeps: {  // Add this to exclude pdfjs-dist from optimization
    exclude: ['pdfjs-dist'],
    include: ['react-pdftotext'] // Force Vite to pre-bundle this dependency
  },
});
