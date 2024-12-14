import type { LitRendererResult } from '../LitRenderer'
import type { MarkViewFactory } from './markViewContext'
import { LitMarkView } from './LitMarkView'

export function useLitMarkViewCreator(renderLitRenderer: LitRendererResult['renderLitRenderer'], removeLitRenderer: LitRendererResult['removeLitRenderer']) {
  const createLitMarkView: MarkViewFactory = options => (mark, view, inline) => {
    const markView = new LitMarkView({
      mark,
      view,
      inline,
      options: {
        ...options,
        destroy() {
          options.destroy?.()
          removeLitRenderer(markView)
        },
      },
    })
    renderLitRenderer(markView)

    return markView
  }

  return createLitMarkView
}
