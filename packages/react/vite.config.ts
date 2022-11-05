/* Copyright 2021, Prosemirror Adapter by Mirone. */

import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import autoExternal from 'rollup-plugin-auto-external';
import { defineConfig } from 'vite';

const resolvePath = (str: string) => resolve(__dirname, str);

export default defineConfig({
    build: {
        sourcemap: true,
        emptyOutDir: false,
        lib: {
            entry: resolvePath('src/index.ts'),
            name: 'prosemirror-adapter_react',
            fileName: (format: string) => `index.${format}.js`,
            formats: ['es'],
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'prosemirror-state', 'prosemirror-view'],
            output: {
                dir: resolvePath('lib'),
            },
            plugins: [autoExternal()],
        },
    },
    plugins: [react()],
});
