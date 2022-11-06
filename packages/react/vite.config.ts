/* Copyright 2021, Prosemirror Adapter by Mirone. */

import react from '@vitejs/plugin-react';

import { viteConfigFactory } from '../../vite.config';

export default viteConfigFactory('react', {
    plugins: [react()],
});
