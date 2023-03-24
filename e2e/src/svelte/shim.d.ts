/// <reference types="svelte">
/// <reference types="vite/client">

declare module '*.svelte' {
  import type { SvelteComponent } from 'svelte'
  const pma_svelte_component: SvelteComponent;
  // @ts-ignore
  export default pma_svelte_component;
}
