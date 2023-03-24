/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type { SvelteRendererResult } from '../SvelteRenderer'
import type { PluginViewFactory } from './pluginViewContext'
import { SveltePluginView } from './SveltePluginView'

export const useSveltePluginViewCreator = (
  renderSvelteRenderer: SvelteRendererResult['renderSvelteRenderer'],
  removeSvelteRenderer: SvelteRendererResult['removeSvelteRenderer'],
) => {
  const createSveltePluginView: PluginViewFactory = options => (view) => {
    const pluginView = new SveltePluginView({
      view,
      options: {
        ...options,
        update: (view, prevState) => {
          options.update?.(view, prevState)
          pluginView.updateContext()
        },
        destroy: () => {
          options.destroy?.()
          removeSvelteRenderer(pluginView)
        },
      },
    })

    renderSvelteRenderer(pluginView)

    return pluginView
  }

  return createSveltePluginView
}
