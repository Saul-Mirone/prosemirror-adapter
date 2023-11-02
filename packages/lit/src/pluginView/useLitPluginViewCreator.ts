/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type { LitRendererResult } from '../LitRenderer'
import type { PluginViewFactory } from './pluginViewContext'
import { LitPluginView } from './LitPluginView'

export function useLitPluginViewCreator(renderLitRenderer: LitRendererResult['renderLitRenderer'], removeLitRenderer: LitRendererResult['removeLitRenderer']) {
  const createLitPluginView: PluginViewFactory = options => (view) => {
    const pluginView = new LitPluginView({
      view,
      options: {
        ...options,
        update: (view, prevState) => {
          options.update?.(view, prevState)
          pluginView.updateContext()
        },
        destroy: () => {
          options.destroy?.()
          removeLitRenderer(pluginView)
        },
      },
    })

    renderLitRenderer(pluginView)

    return pluginView
  }

  return createLitPluginView
}
