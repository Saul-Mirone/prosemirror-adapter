import type { PluginViewSpec } from '@prosemirror-adapter/core'
import type { ReactRendererResult } from '../ReactRenderer'
import type { ReactPluginViewUserOptions } from './ReactPluginViewOptions'
import { useCallback } from 'react'
import { ReactPluginView } from './ReactPluginView'

export function useReactPluginViewCreator(renderReactRenderer: ReactRendererResult['renderReactRenderer'], removeReactRenderer: ReactRendererResult['removeReactRenderer']) {
  const createReactPluginView = useCallback((options: ReactPluginViewUserOptions): PluginViewSpec => {
    return (view) => {
      const pluginView = new ReactPluginView({
        view,
        options: {
          ...options,
          update: (view, prevState) => {
            options.update?.(view, prevState)
            renderReactRenderer(pluginView)
          },
          destroy: () => {
            options.destroy?.()
            removeReactRenderer(pluginView)
          },
        },
      })

      renderReactRenderer(pluginView, false)

      return pluginView
    }
  }, [removeReactRenderer, renderReactRenderer])

  return createReactPluginView
}
