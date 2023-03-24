/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { CoreNodeView } from '@prosemirror-adapter/core'
import { nanoid } from 'nanoid'
import type { SvelteComponent } from 'svelte'
import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'

import type { SvelteRenderer } from '../SvelteRenderer'
import type { NodeViewContext, NodeViewContextMap } from './nodeViewContext'
import type { SvelteNodeViewComponent } from './SvelteNodeViewOptions'

export class SvelteNodeView extends CoreNodeView<SvelteNodeViewComponent> implements SvelteRenderer<NodeViewContextMap> {
  key: string = nanoid()

  _component?: SvelteComponent

  _context: NodeViewContext = {
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

    node: writable(this.node),
    selected: writable(this.selected),
    decorations: writable(this.decorations),
    innerDecorations: writable(this.innerDecorations),
  }

  context: NodeViewContextMap = new Map(Object.entries(this._context)) as NodeViewContextMap

  updateContext = () => {
    const original = {
      node: this.node,
      selected: this.selected,
      decorations: this.decorations,
      innerDecorations: this.innerDecorations,
    }
    Object.entries(original).forEach(([key, value]) => {
      const mapKey = key as keyof typeof original
      const writable = this.context.get(mapKey) as Writable<typeof original[typeof mapKey]>
      writable.set(value)
    })
  }

  render = () => {
    const UserComponent = this.component

    const rendered = new UserComponent({
      target: this.dom,
      context: this.context,
    })

    this._component = rendered

    return rendered
  }
}
