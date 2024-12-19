import type { Writable } from 'svelte/store'
import type { SvelteRenderer } from '../SvelteRenderer'
import type { PluginViewContext, PluginViewContextMap } from './pluginViewContext'
import type { SveltePluginViewComponent } from './SveltePluginViewOptions'
import { CorePluginView } from '@prosemirror-adapter/core'
import { nanoid } from 'nanoid'
import { writable } from 'svelte/store'
import { mount } from '../mount'

export class SveltePluginView extends CorePluginView<SveltePluginViewComponent> implements SvelteRenderer<PluginViewContextMap> {
  key: string = nanoid()

  _context: PluginViewContext = {
    view: writable(this.view),
    prevState: writable(this.prevState),
  }

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

    return mount(UserComponent, {
      target: this.root,
      context: this.context,
    })
  }
}
