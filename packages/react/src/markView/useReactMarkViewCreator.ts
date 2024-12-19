import type { MarkViewConstructor } from 'prosemirror-view'
import type { ReactRendererResult } from '../ReactRenderer'
import type { ReactMarkViewUserOptions } from './ReactMarkViewOptions'
import { useCallback } from 'react'
import { ReactMarkView } from './ReactMarkView'

export function useReactMarkViewCreator(
  renderReactRenderer: ReactRendererResult['renderReactRenderer'],
  removeReactRenderer: ReactRendererResult['removeReactRenderer'],
) {
  const createReactMarkView = useCallback(
    (options: ReactMarkViewUserOptions): MarkViewConstructor =>
      (mark, view, inline) => {
        const markView = new ReactMarkView({
          mark,
          view,
          inline,
          options: {
            ...options,
            destroy() {
              options.destroy?.()
              removeReactRenderer(markView)
            },
          },
        })
        renderReactRenderer(markView, false)

        return markView
      },
    [removeReactRenderer, renderReactRenderer],
  )

  return createReactMarkView
}
