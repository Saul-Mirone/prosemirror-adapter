/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { NodeViewConstructor } from 'prosemirror-view'
import type { InjectionKey } from 'vue'
import {
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  markRaw,
  onBeforeMount,
  onUnmounted,
  provide,
  ref,
} from 'vue'
import { VueNodeView } from './VueNodeView'

import type { VueNodeViewComponent, VueNodeViewUserOptions } from './VueNodeViewOptions'

export type NodeViewFactory = (options: VueNodeViewUserOptions) => NodeViewConstructor
export const nodeViewFactoryKey: InjectionKey<NodeViewFactory> = Symbol('[ProsemirrorAdapter]useNodeViewFactory')
export const useNodeViewFactory = () => inject(nodeViewFactoryKey) as NodeViewFactory

export const ProsemirrorAdapterProvider = defineComponent({
  name: 'prosemirror-adapter-provider',
  setup: (_, { slots }) => {
    const portals = ref<Record<string, VueNodeViewComponent>>({})
    const instance = getCurrentInstance()
    const update = markRaw<{ updater?: () => void }>({})

    onBeforeMount(() => {
      update.updater = () => {
        instance?.update()
      }
    })

    onUnmounted(() => {
      update.updater = undefined
    })

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
            delete portals.value[nodeView.key]
          },
        },
      })

      portals.value[nodeView.key] = nodeView.render()

      // Force update the vue component to render
      // Cursor won't move to new node without this
      update.updater?.()

      return nodeView
    }

    provide(nodeViewFactoryKey, createVueNodeView)

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
