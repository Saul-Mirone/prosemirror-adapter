/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { CoreWidgetView } from '@prosemirror-adapter/core'
import { nanoid } from 'nanoid'
import { Teleport, defineComponent, markRaw, provide } from 'vue'
import type { VueRenderer, VueRendererComponent } from '../VueRenderer'
import type { VueWidgetViewComponent } from './VueWidgetViewOptions'
import type { WidgetViewContext } from './widgetViewContext'
import { widgetViewContext } from './widgetViewContext'

export class VueWidgetView extends CoreWidgetView<VueWidgetViewComponent> implements VueRenderer<WidgetViewContext> {
  key: string = nanoid()

  context: WidgetViewContext = {
    view: this.view!,
    getPos: this.getPos!,
  }

  updateContext = () => {
    Object.assign(this.context, {
      view: this.view,
      prevState: this.getPos,
    })
  }

  render = () => {
    const UserComponent = this.component

    return markRaw(
      defineComponent({
        name: 'ProsemirrorWidgetView',
        setup: () => {
          provide(widgetViewContext, this.context)
          return () => (
            <Teleport key={this.key} to={this.dom}>
                <UserComponent />
            </Teleport>
          )
        },
      }),
    ) as VueRendererComponent
  }
}
