/* Copyright 2021, Prosemirror Adapter by Mirone. */
import {
  defineComponent, h, provide,
} from 'vue'
import { nodeViewFactoryKey } from './nodeView'
import { useVueNodeViewCreator } from './nodeView/useVueNodeViewCreator'
import { pluginViewFactoryKey } from './pluginView'
import { useVuePluginViewCreator } from './pluginView/useVuePluginViewCreator'

import { useVueRenderer } from './VueRenderer'

export const ProsemirrorAdapterProvider = defineComponent({
  name: 'ProsemirrorAdapterProvider',
  setup: (_, { slots }) => {
    const { portals, renderVueRenderer, removeVueRenderer } = useVueRenderer()

    const createVueNodeView = useVueNodeViewCreator(renderVueRenderer, removeVueRenderer)
    const createVuePluginView = useVuePluginViewCreator(renderVueRenderer, removeVueRenderer)

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
