/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type { EditorView } from 'prosemirror-view'

export interface CoreWidgetViewUserOptions<Component> {
  as: string | HTMLElement
  component: Component
}

export interface CoreWidgetViewSpec<Component> {
  view: EditorView
  getPos: () => number

  options: CoreWidgetViewUserOptions<Component>
}
