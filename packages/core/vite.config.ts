/* Copyright 2021, Prosemirror Adapter by Mirone. */

import { resolve } from 'path';
import autoExternal from 'rollup-plugin-auto-external';
import { defineConfig } from 'vite';

const resolvePath = (str: string) => resolve(__dirname, str);

export default defineConfig({
    build: {
        sourcemap: true,
        lib: {
            entry: resolvePath('src/index.ts'),
            name: 'prosemirror-adapter_core',
            fileName: (format: string) => `index.${format}.js`,
            formats: ['es'],
        },
        rollupOptions: {
            external: ['prosemirror-state', 'prosemirror-view', 'prosemirror-model'],
            output: {
                dir: resolvePath('lib'),
            },
            plugins: [autoExternal()],
        },
    },
});
