declare module '*.svelte' {
  import type { SvelteComponent } from 'svelte'

  const pma_svelte_component: SvelteComponent
  // @ts-expect-error re-export type
  export default pma_svelte_component
}
