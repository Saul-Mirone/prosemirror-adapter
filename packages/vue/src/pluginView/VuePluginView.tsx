import type { VueRenderer, VueRendererComponent } from '../VueRenderer'
import type { PluginViewContext } from './pluginViewContext'
import type { VuePluginViewComponent } from './VuePluginViewOptions'
import { CorePluginView } from '@prosemirror-adapter/core'
import { nanoid } from 'nanoid'
import { defineComponent, markRaw, provide, shallowRef, Teleport } from 'vue'
import { pluginViewContext } from './pluginViewContext'

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
