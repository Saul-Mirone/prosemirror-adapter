import { svelte } from '@sveltejs/vite-plugin-svelte'

import { viteConfigFactory } from '../../vite.config'

export default viteConfigFactory(import.meta.url, {
  plugins: [svelte()],
})
