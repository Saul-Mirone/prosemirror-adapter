/* Copyright 2021, Prosemirror Adapter by Mirone. */

import vueJsx from '@vitejs/plugin-vue-jsx';

import { viteConfigFactory } from '../../vite.config';

export default viteConfigFactory('vue', {
    plugins: [vueJsx()],
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
    },
});
