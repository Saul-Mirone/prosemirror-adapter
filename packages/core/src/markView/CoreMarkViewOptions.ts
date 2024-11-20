import type { Mark } from 'prosemirror-model'
import type { EditorView } from 'prosemirror-view'

export type MarkViewDOMSpec = string | HTMLElement | ((mark: Mark) => HTMLElement)

export interface CoreMarkViewUserOptions<Component> {
  // DOM
  as?: MarkViewDOMSpec
  contentAs?: MarkViewDOMSpec

  // Component
  component: Component

  // Overrides
  ignoreMutation?: (mutation: MutationRecord) => boolean | void
  destroy?: () => void
}

export interface CoreMarkViewSpec<Component> {
  mark: Mark
  view: EditorView
  inline: boolean

  options: CoreMarkViewUserOptions<Component>
}
