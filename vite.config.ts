import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    
    // Environment variables
    define: {
      // Make some env variables available to the client
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    
    // Optimize dependencies
    optimizeDeps: {
      exclude: ['lucide-react'],
      include: ['react', 'react-dom']
    },
    
    // Build configuration
    build: {
      // Output directory
      outDir: 'dist',
      
      // Generate sourcemaps for production debugging
      sourcemap: mode === 'production' ? false : true,
      
      // Minimize output
      minify: 'terser',
      
      // Chunk size warnings
      chunkSizeWarningLimit: 1000,
      
      // Rollup options
      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['lucide-react'],
          },
          
          // Naming patterns for chunks
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        }
      },
      
      // Terser options for better minification
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        },
      },
    },
    
    // Server configuration
    server: {
      port: 5173,
      host: true, // Expose to network
      
      // Proxy API requests to backend during development
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        }
      }
    },
    
    // Preview server configuration (for production testing)
    preview: {
      port: 4173,
      host: true,
    },
    
    // Base path for deployment
    base: '/',
    
    // CSS configuration
    css: {
      devSourcemap: mode !== 'production',
    }
  };
});
