/* Copyright 2021, Prosemirror Adapter by Mirone. */
import {
  defineComponent, h, provide,
} from 'vue'
import type { NodeViewFactory } from './nodeViewContext'
import { nodeViewFactoryKey } from './nodeViewContext'
import type { PluginViewFactory } from './pluginViewContext'
import { pluginViewFactoryKey } from './pluginViewContext'
import { VueNodeView } from './VueNodeView'

import { VuePluginView } from './VuePluginView'
import { useVueRenderer } from './VueRenderer'

export const ProsemirrorAdapterProvider = defineComponent({
  name: 'ProsemirrorAdapterProvider',
  setup: (_, { slots }) => {
    const { portals, renderVueRenderer, removeVueRenderer } = useVueRenderer()

    const createVueNodeView: NodeViewFactory = options => (node, view, getPos, decorations, innerDecorations) => {
      const nodeView = new VueNodeView({
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
            removeVueRenderer(nodeView)
          },
        },
      })

      renderVueRenderer(nodeView)

      return nodeView
    }

    const createVuePluginView: PluginViewFactory = options => (view) => {
      const pluginView = new VuePluginView({
        view,
        options: {
          ...options,
          update: (view, prevState) => {
            options.update?.(view, prevState)
            pluginView.updateContext()
          },
          destroy: () => {
            options.destroy?.()
            removeVueRenderer(pluginView)
          },
        },
      })

      renderVueRenderer(pluginView)

      return pluginView
    }

    provide(nodeViewFactoryKey, createVueNodeView)
    provide(pluginViewFactoryKey, createVuePluginView)

    return () => {
      return (
        <>
          {slots.default?.()}
          {Object.values(portals.value).map(x => h(x))}
        </>
      )
    }
  },
})
