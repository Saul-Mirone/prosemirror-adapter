/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { Attrs, Node } from 'prosemirror-model'
import type { Decoration, DecorationSource, EditorView, NodeViewConstructor } from 'prosemirror-view'
import { getContext } from 'svelte'
import type { Writable } from 'svelte/store'
import type { SvelteNodeViewUserOptions } from './SvelteNodeViewOptions'

export interface NodeViewContext {
  // won't change
  contentRef: (node: HTMLElement | null) => void
  view: EditorView
  getPos: () => number
  setAttrs: (attrs: Attrs) => void

  // changes between updates
  node: Writable<Node>
  selected: Writable<boolean>
  decorations: Writable<readonly Decoration[]>
  innerDecorations: Writable<DecorationSource>
}

export type NodeViewContextMap = Map<keyof NodeViewContext, NodeViewContext[keyof NodeViewContext]>

export const useNodeViewContext = <Key extends keyof NodeViewContext>(key: Key): NodeViewContext[Key] => getContext(key)

export const nodeViewFactoryKey = '[PMA]nodeViewFactory'

export type NodeViewFactory = (options: SvelteNodeViewUserOptions) => NodeViewConstructor
export const useNodeViewFactory = () => getContext<NodeViewFactory>(nodeViewFactoryKey)
