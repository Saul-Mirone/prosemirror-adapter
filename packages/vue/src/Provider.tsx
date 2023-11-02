/* Copyright 2021, Prosemirror Adapter by Mirone. */
import {
  defineComponent,
  h,
  provide,
} from 'vue'
import { nodeViewFactoryKey } from './nodeView'
import { useVueNodeViewCreator } from './nodeView/useVueNodeViewCreator'
import { pluginViewFactoryKey } from './pluginView'
import { useVuePluginViewCreator } from './pluginView/useVuePluginViewCreator'

import { useVueRenderer } from './VueRenderer'
import { useVueWidgetViewCreator } from './widgetView/useVueWidgetViewCreator'
import { widgetViewFactoryKey } from './widgetView/widgetViewContext'

export type CreateVueNodeView = ReturnType<typeof useVueNodeViewCreator>
export type CreateVuePluginView = ReturnType<typeof useVuePluginViewCreator>
export type CreateVueWidgetView = ReturnType<typeof useVueWidgetViewCreator>

export const ProsemirrorAdapterProvider = defineComponent({
  name: 'ProsemirrorAdapterProvider',
  setup: (_, { slots }) => {
    const { portals, renderVueRenderer, removeVueRenderer } = useVueRenderer()

    const createVueNodeView: CreateVueNodeView = useVueNodeViewCreator(renderVueRenderer, removeVueRenderer)
    const createVuePluginView: CreateVuePluginView = useVuePluginViewCreator(renderVueRenderer, removeVueRenderer)
    const createVueWidgetView: CreateVueWidgetView = useVueWidgetViewCreator(renderVueRenderer, removeVueRenderer)

    provide(nodeViewFactoryKey, createVueNodeView)
    provide(pluginViewFactoryKey, createVuePluginView)
    provide(widgetViewFactoryKey, createVueWidgetView)

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
