/* Copyright 2021, Prosemirror Adapter by Mirone. */

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [vue(), vueJsx()],
});
