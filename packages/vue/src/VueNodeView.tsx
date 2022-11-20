/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { CoreNodeView } from '@prosemirror-adapter/core'
import { nanoid } from 'nanoid'
import { Teleport, defineComponent, markRaw, provide, shallowRef } from 'vue'

import type { NodeViewContext } from './nodeViewContext'
import { nodeViewContext } from './nodeViewContext'
import type { VueNodeViewComponent, VueNodeViewSpec } from './VueNodeViewOptions'

export function vueNodeViewFactory(spec: VueNodeViewSpec) {
  const vueNodeView = new VueNodeView(spec)
  const { setSelection, stopEvent } = spec.options
  const overrideOptions = {
    setSelection,
    stopEvent,
  }

  Object.assign(vueNodeView, overrideOptions)

  return vueNodeView
}

export class VueNodeView extends CoreNodeView<VueNodeViewComponent> {
  key: string = nanoid()

  context: NodeViewContext = {
    contentRef: (element) => {
      if (
        element
                && element instanceof HTMLElement
                && this.contentDOM
                && element.firstChild !== this.contentDOM
      )
        element.appendChild(this.contentDOM)
    },
    view: this.view,
    getPos: this.getPos,
    setAttrs: this.setAttrs,

    node: shallowRef(this.node),
    selected: shallowRef(this.selected),
    decorations: shallowRef(this.decorations),
    innerDecorations: shallowRef(this.innerDecorations),
  }

  updateContext = () => {
    Object.entries({
      node: this.node,
      selected: this.selected,
      decorations: this.decorations,
      innerDecorations: this.innerDecorations,
    }).forEach(([key, value]) => {
      const prev = this.context[key as 'node' | 'selected' | 'decorations' | 'innerDecorations']
      if (prev.value !== value)
        prev.value = value
    })
  }

  render = () => {
    const UserComponent = this.component

    return markRaw(
      defineComponent({
        name: 'ProsemirrorNodeView',
        setup: () => {
          provide(nodeViewContext, this.context)
          return () => (
            <Teleport key={this.key} to={this.dom}>
                <UserComponent />
            </Teleport>
          )
        },
      }),
    ) as VueNodeViewComponent
  }
}
