import type { SvelteRendererResult } from '../SvelteRenderer'
import type { MarkViewFactory } from './markViewContext'
import { SvelteMarkView } from './SvelteMarkView'

export function useSvelteMarkViewCreator(
  renderSvelteRenderer: SvelteRendererResult['renderSvelteRenderer'],
  removeSvelteRenderer: SvelteRendererResult['removeSvelteRenderer'],
) {
  const createSvelteMarkView: MarkViewFactory
    = options => (mark, view, inline) => {
      const markView = new SvelteMarkView({
        mark,
        view,
        inline,
        options: {
          ...options,
          destroy() {
            options.destroy?.()
            removeSvelteRenderer(markView)
          },
        },
      })
      renderSvelteRenderer(markView)

      return markView
    }

  return createSvelteMarkView
}
