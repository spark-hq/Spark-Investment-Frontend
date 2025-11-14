import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Use root base path for development, GitHub Pages path for production
  const base = command === 'serve' ? '/' : '/Spark-Investment-Frontend/';

  return {
    plugins: [
      react(),
      // Bundle visualizer - generates stats.html after build
      visualizer({
        filename: './dist/stats.html',
        open: true, // Automatically open in browser after build
        gzipSize: true,
        brotliSize: true,
        template: 'treemap', // sunburst, treemap, network
      }),
    ],
    base: base,
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
        '/socket.io': {
          target: 'ws://localhost:5000',
          ws: true,
        },
      },
    },
    build: {
      sourcemap: true,
      // Optimize chunk size warnings
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // Enhanced code splitting configuration
          manualChunks: {
            // Core React libraries
            'react-vendor': ['react', 'react-dom'],
            // Routing
            'react-router': ['react-router-dom'],
            // State management and data fetching
            'data-vendor': ['@tanstack/react-query'],
            // Charting library
            'charts': ['recharts'],
            // Icons
            'icons': ['lucide-react'],
          },
        },
      },
    },
  };
});
