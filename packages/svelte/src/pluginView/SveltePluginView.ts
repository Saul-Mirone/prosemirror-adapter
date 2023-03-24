/* Copyright 2021, Prosemirror Adapter by Mirone. */

import { CorePluginView } from '@prosemirror-adapter/core'
import { nanoid } from 'nanoid'
import type { SvelteComponent } from 'svelte'
import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'
import type { SvelteRenderer } from '../SvelteRenderer'
import type { PluginViewContext, PluginViewContextMap } from './pluginViewContext'
import type { SveltePluginViewComponent } from './SveltePluginViewOptions'

export class SveltePluginView extends CorePluginView<SveltePluginViewComponent> implements SvelteRenderer<PluginViewContextMap> {
  key: string = nanoid()

  _context: PluginViewContext = {
    view: writable(this.view),
    prevState: writable(this.prevState),
  }

  _component?: SvelteComponent

  context: PluginViewContextMap = new Map(Object.entries(this._context)) as PluginViewContextMap

  updateContext = () => {
    const original = {
      view: this.view,
      prevState: this.prevState,
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
      target: this.root,
      context: this.context,
    })

    this._component = rendered

    return rendered
  }
}
