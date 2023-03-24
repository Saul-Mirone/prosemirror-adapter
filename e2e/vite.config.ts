/* Copyright 2021, Prosemirror Adapter by Mirone. */

import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  plugins: [react(), vue(), svelte()],
  optimizeDeps: {
    exclude: ['svelte'],
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        react: resolve(__dirname, 'src/react/index.html'),
        vue: resolve(__dirname, 'src/vue/index.html'),
        svelte: resolve(__dirname, 'src/svelte/index.html'),
      },
    },
  },
})
