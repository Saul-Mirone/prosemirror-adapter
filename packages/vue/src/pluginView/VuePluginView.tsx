/* Copyright 2021, Prosemirror Adapter by Mirone. */

import { CorePluginView } from '@prosemirror-adapter/core'
import { nanoid } from 'nanoid'
import { Teleport, defineComponent, markRaw, provide, shallowRef } from 'vue'
import type { VueRenderer, VueRendererComponent } from '../VueRenderer'
import type { PluginViewContext } from './pluginViewContext'
import { pluginViewContext } from './pluginViewContext'
import type { VuePluginViewComponent } from './VuePluginViewOptions'

export class VuePluginView extends CorePluginView<VuePluginViewComponent> implements VueRenderer<PluginViewContext> {
  key: string = nanoid()

  context: PluginViewContext = {
    view: shallowRef(this.view),
    prevState: shallowRef(this.prevState),
  }

  updateContext = () => {
    Object.entries({
      view: this.view,
      prevState: this.prevState,
    }).forEach(([key, value]) => {
      const prev = this.context[key as 'view' | 'prevState']
      if (key === 'view') {
        const clone = Object.assign(Object.create(Object.getPrototypeOf(value)), value)
        prev.value = clone
        return
      }

      prev.value = value
    })
  }

  render = () => {
    const UserComponent = this.component

    return markRaw(
      defineComponent({
        name: 'ProsemirrorNodeView',
        setup: () => {
          provide(pluginViewContext, this.context)
          return () => (
            <Teleport key={this.key} to={this.root}>
              <UserComponent />
            </Teleport>
          )
        },
      }),
    ) as VueRendererComponent
  }
}
