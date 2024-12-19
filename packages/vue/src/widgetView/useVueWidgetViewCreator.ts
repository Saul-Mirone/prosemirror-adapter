import type { WidgetDecorationFactory, WidgetDecorationSpec } from '@prosemirror-adapter/core'
import type { VueRendererResult } from '../VueRenderer'
import type { VueWidgetViewUserOptions } from './VueWidgetViewOptions'
import { Decoration } from 'prosemirror-view'
import { VueWidgetView } from './VueWidgetView'

export function useVueWidgetViewCreator(renderVueRenderer: VueRendererResult['renderVueRenderer'], removeVueRenderer: VueRendererResult['removeVueRenderer']) {
  const createWidgetPluginView = (options: VueWidgetViewUserOptions): WidgetDecorationFactory => {
    return (pos, userSpec = {}) => {
      const widgetView = new VueWidgetView({
        pos,
        options,
      })
      const spec: WidgetDecorationSpec = {
        ...userSpec,
        destroy: (node) => {
          userSpec.destroy?.(node)
          removeVueRenderer(widgetView)
        },
      }
      widgetView.spec = spec

      return Decoration.widget(pos, (view, getPos) => {
        widgetView.bind(view, getPos)
        widgetView.updateContext()
        renderVueRenderer(widgetView)

        return widgetView.dom
      }, spec)
    }
  }

  return createWidgetPluginView
}
