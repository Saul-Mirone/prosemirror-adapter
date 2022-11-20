/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type { EditorState, PluginSpec } from 'prosemirror-state'
import type { EditorView } from 'prosemirror-view'

export interface CorePluginViewSpec<Component> {
  view: EditorView

  options: CorePluginViewUserOptions<Component>
}

export interface CorePluginViewUserOptions<Component> {
  component: Component
  root?: (viewDOM: HTMLElement) => HTMLElement
  update?: (view: EditorView, prevState: EditorState) => void
  destroy?: () => void
}

export type PluginViewSpec = Required<PluginSpec<unknown>>['view']
