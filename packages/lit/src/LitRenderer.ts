/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { LitElement } from 'lit'

export interface LitRenderer<Context> {
  key: string

  context: Context

  render: () => LitElement

  updateContext: () => void
}

export interface LitRendererResult {
  readonly portals: Map<string, LitElement>
  readonly renderLitRenderer: (renderer: LitRenderer<unknown>) => void
  readonly removeLitRenderer: (renderer: LitRenderer<unknown>) => void
}

export const useLitRenderer = (): LitRendererResult => {
  const portals = new Map<string, LitElement>()

  const renderLitRenderer = (renderer: LitRenderer<unknown>) => {
    const component = renderer.render()
    portals.set(renderer.key, component)
  }

  const removeLitRenderer = (renderer: LitRenderer<unknown>) => {
    portals.delete(renderer.key)
  }

  return {
    portals,
    renderLitRenderer,
    removeLitRenderer,
  } as const
}
