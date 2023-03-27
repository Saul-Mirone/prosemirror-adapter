/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type { LitRendererResult } from '../LitRenderer'
import type { NodeViewFactory } from './nodeViewContext'
import { LitNodeView } from './LitNodeView'

export const useLitNodeViewCreator = (
  renderLitRenderer: LitRendererResult['renderLitRenderer'],
  removeLitRenderer: LitRendererResult['removeLitRenderer'],
) => {
  const createLitNodeView: NodeViewFactory = options => (node, view, getPos, decorations, innerDecorations) => {
    const nodeView = new LitNodeView({
      node,
      view,
      getPos,
      decorations,
      innerDecorations,
      options: {
        ...options,
        onUpdate() {
          options.onUpdate?.()
          nodeView.updateContext()
        },
        selectNode() {
          options.selectNode?.()
          nodeView.updateContext()
        },
        deselectNode() {
          options.deselectNode?.()
          nodeView.updateContext()
        },
        destroy() {
          options.destroy?.()
          removeLitRenderer(nodeView)
        },
      },
    })
    renderLitRenderer(nodeView)

    return nodeView
  }

  return createLitNodeView
}
