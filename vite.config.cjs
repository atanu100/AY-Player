const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react')

module.exports = defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
}) 