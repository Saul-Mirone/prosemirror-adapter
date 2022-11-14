/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { Node } from 'prosemirror-model'
import type { Decoration, DecorationSource, EditorView } from 'prosemirror-view'

export type DOMSpec = string | HTMLElement | ((node: Node) => HTMLElement)

export interface CoreNodeViewUserOptions<Component> {
  // DOM
  as?: DOMSpec
  contentAs?: DOMSpec

  // Component
  component: Component

  // Overrides
  update?: (node: Node, decorations: readonly Decoration[], innerDecorations: DecorationSource) => boolean | void
  ignoreMutation?: (mutation: MutationRecord) => boolean | void
  selectNode?: () => void
  deselectNode?: () => void
  setSelection?: (anchor: number, head: number, root: Document | ShadowRoot) => void
  stopEvent?: (event: Event) => boolean
  destroy?: () => void

  // Additional
  onUpdate?: () => void
}

export interface CoreNodeViewSpec<Component> {
  node: Node
  view: EditorView
  getPos: () => number
  decorations: readonly Decoration[]
  innerDecorations: DecorationSource

  options: CoreNodeViewUserOptions<Component>
}
