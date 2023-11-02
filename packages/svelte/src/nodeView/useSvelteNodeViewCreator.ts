/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type { SvelteRendererResult } from '../SvelteRenderer'
import type { NodeViewFactory } from './nodeViewContext'
import { SvelteNodeView } from './SvelteNodeView'

export function useSvelteNodeViewCreator(renderSvelteRenderer: SvelteRendererResult['renderSvelteRenderer'], removeSvelteRenderer: SvelteRendererResult['removeSvelteRenderer']) {
  const createSvelteNodeView: NodeViewFactory = options => (node, view, getPos, decorations, innerDecorations) => {
    const nodeView = new SvelteNodeView({
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
          removeSvelteRenderer(nodeView)
        },
      },
    })
    renderSvelteRenderer(nodeView)

    return nodeView
  }

  return createSvelteNodeView
}
