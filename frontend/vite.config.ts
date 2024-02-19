import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/api',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      },
    }
  },
  // resolve: {
  //   alias: {
  //     'redux-thunk': 'redux-thunk/dist/redux-thunk.cjs.js'
  //   }
  // }
})
