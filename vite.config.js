import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

import ViteComponents, {
  AntDesignVueResolver,
} from 'vite-plugin-components';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteComponents({
      customComponentResolvers: [
        AntDesignVueResolver(),
      ]
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },
  build: {
    chunkSizeWarningLimit: 1500,
    cssCodeSplit: true,
    manifest: true
  }
})
