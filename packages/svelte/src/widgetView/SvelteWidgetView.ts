/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { CoreWidgetView } from '@prosemirror-adapter/core'
import { nanoid } from 'nanoid'
import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'
import type { SvelteRenderer } from '../SvelteRenderer'
import type { SvelteWidgetViewComponent } from './SvelteWidgetViewOptions'
import type { WidgetViewContext, WidgetViewContextMap } from './widgetViewContext'

export class SvelteWidgetView extends CoreWidgetView<SvelteWidgetViewComponent> implements SvelteRenderer<WidgetViewContextMap> {
  key: string = nanoid()

  _context: WidgetViewContext = {
    view: writable(this.view!),
    getPos: writable(this.getPos!),
    spec: writable(this.spec),
  }

  context: WidgetViewContextMap = new Map(Object.entries(this._context)) as WidgetViewContextMap

  updateContext = () => {
    const original = {
      view: this.view,
      getPos: this.getPos,
      spec: this.spec,
    }
    Object.entries(original).forEach(([key, value]) => {
      const mapKey = key as keyof typeof original
      const writable = this.context.get(mapKey) as Writable<typeof original[typeof mapKey]>
      writable.set(value)
    })
  }

  render = () => {
    const UserComponent = this.component

    return new UserComponent({
      target: this.dom,
      context: this.context,
    })
  }
}
