import type { NodeViewConstructor } from 'prosemirror-view'
import type { ReactRendererResult } from '../ReactRenderer'
import type { ReactNodeViewUserOptions } from './ReactNodeViewOptions'
import { useCallback } from 'react'
import { ReactNodeView } from './ReactNodeView'

export function useReactNodeViewCreator(renderReactRenderer: ReactRendererResult['renderReactRenderer'], removeReactRenderer: ReactRendererResult['removeReactRenderer']) {
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

  return createReactNodeView
}
