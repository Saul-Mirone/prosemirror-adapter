import type { WidgetDecorationFactory, WidgetDecorationSpec } from '@prosemirror-adapter/core'
import type { ReactRendererResult } from '../ReactRenderer'
import type { ReactWidgetViewUserOptions } from './ReactWidgetViewOptions'
import { Decoration } from 'prosemirror-view'
import { useCallback } from 'react'
import { ReactWidgetView } from './ReactWidgetView'

export function useReactWidgetViewCreator(renderReactRenderer: ReactRendererResult['renderReactRenderer'], removeReactRenderer: ReactRendererResult['removeReactRenderer']) {
  const createWidgetPluginView = useCallback((options: ReactWidgetViewUserOptions): WidgetDecorationFactory => {
    return (pos, userSpec = {}) => {
      const widgetView = new ReactWidgetView({
        pos,
        options,
      })
      const spec: WidgetDecorationSpec = {
        ...userSpec,
        destroy: (node) => {
          userSpec.destroy?.(node)
          removeReactRenderer(widgetView)
        },
      }
      widgetView.spec = spec

      return Decoration.widget(pos, (view, getPos) => {
        widgetView.bind(view, getPos)
        renderReactRenderer(widgetView)

        return widgetView.dom
      }, spec)
    }
  }, [removeReactRenderer, renderReactRenderer])

  return createWidgetPluginView
}
