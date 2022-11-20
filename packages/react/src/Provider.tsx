/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type { PluginViewSpec } from '@prosemirror-adapter/core'
import type { NodeViewConstructor } from 'prosemirror-view'
import type {
  FC,
  ReactNode,
} from 'react'
import React, {
  useCallback, useMemo,
} from 'react'
import { createNodeViewContext } from './nodeViewContext'
import { createPluginViewContext } from './pluginViewContext'

import { ReactNodeView } from './ReactNodeView'
import type { ReactNodeViewUserOptions } from './ReactNodeViewOptions'
import { ReactPluginView } from './ReactPluginView'
import type { ReactPluginViewUserOptions } from './ReactPluginViewOptions'
import { useReactRenderer } from './ReactRenderer'

export const ProsemirrorAdapterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { renderReactRenderer, removeReactRenderer, portals } = useReactRenderer()

  const createReactNodeView = useCallback(
    (options: ReactNodeViewUserOptions): NodeViewConstructor =>
      (node, view, getPos, decorations, innerDecorations) => {
        const nodeView = new ReactNodeView({
          node,
          view,
          getPos,
          decorations,
          innerDecorations,
          options: {
            ...options,
            onUpdate() {
              options.onUpdate?.()
              renderReactRenderer(nodeView)
            },
            selectNode() {
              options.selectNode?.()
              renderReactRenderer(nodeView)
            },
            deselectNode() {
              options.deselectNode?.()
              renderReactRenderer(nodeView)
            },
            destroy() {
              options.destroy?.()
              removeReactRenderer(nodeView)
            },
          },
        })

        renderReactRenderer(nodeView, false)

        return nodeView
      },
    [removeReactRenderer, renderReactRenderer],
  )

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

  const memoizedPortals = useMemo(() => Object.values(portals), [portals])

  return (
    <createNodeViewContext.Provider value={createReactNodeView}>
      <createPluginViewContext.Provider value={createReactPluginView}>
        <>
          {children}
          {memoizedPortals}
        </>
      </createPluginViewContext.Provider>
    </createNodeViewContext.Provider>
  )
}
