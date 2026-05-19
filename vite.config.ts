import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const VENDOR_CHUNKS: Record<string, string[]> = {
  'vendor-react': ['react', 'react-dom', 'react-router-dom'],
  'vendor-three': ['three'],
  'vendor-r3f': ['@react-three/fiber', '@react-three/drei'],
}

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          for (const [chunk, pkgs] of Object.entries(VENDOR_CHUNKS)) {
            if (pkgs.some((pkg) => id.includes(`/node_modules/${pkg}/`))) {
              return chunk
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'three'],
  },
  server: {
    hmr: { overlay: true },
  },
})
