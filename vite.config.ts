import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import zipPack from 'vite-plugin-zip-pack'
// @ts-ignore
import { removeOldFilePlugin } from './buildPlugin'

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    removeOldFilePlugin(),
    viteStaticCopy({
      targets: [{ src: './dist/*', dest: '../git-commit-extension' }]
    }),
    zipPack({
      inDir: 'git-commit-extension',
      outDir: 'dist',
      outFileName: 'git-commit-extension.zip'
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // moveExtensionZipPlugin()
      ]
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // charset: false,
        // additionalData: '@import "./src/assets/style/global.less";',
      },
    },
  },
  base: './',
  server: {
    host: '0.0.0.0',
    port: 5174,
    open: false,
  },
})
