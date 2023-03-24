/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { SvelteComponent } from 'svelte'
import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'

export interface SvelteRenderer<Context> {
  key: string

  context: Context

  render: () => SvelteComponent

  updateContext: () => void
}

export interface SvelteRendererResult {
  readonly portals: Writable<Record<string, SvelteComponent>>
  readonly renderSvelteRenderer: (renderer: SvelteRenderer<unknown>) => void
  readonly removeSvelteRenderer: (renderer: SvelteRenderer<unknown>) => void
}

export const useSvelteRenderer = (): SvelteRendererResult => {
  const portals: Writable<Record<string, SvelteComponent>> = writable({})

  const renderSvelteRenderer = (renderer: SvelteRenderer<unknown>) => {
    portals.update(records => ({
      ...records,
      [renderer.key]: renderer.render(),
    }))
  }

  const removeSvelteRenderer = (renderer: SvelteRenderer<unknown>) => {
    portals.update((records) => {
      const { [renderer.key]: _, ...rest } = records
      return rest
    })
  }

  return {
    portals,
    renderSvelteRenderer,
    removeSvelteRenderer,
  } as const
}
