import type { Mark } from 'prosemirror-model'
import type { EditorView, MarkViewConstructor } from 'prosemirror-view'
import { getContext } from 'svelte'
import type { Writable } from 'svelte/store'
import type { Obj2Map } from '../types'
import type { SvelteMarkViewUserOptions } from './SvelteMarkViewOptions'

export interface MarkViewContext {
  // won't change
  contentRef: (element: HTMLElement | null) => void
  view: EditorView
  mark: Writable<Mark>
}

export type MarkViewContextMap = Obj2Map<MarkViewContext>

export const useMarkViewContext = <Key extends keyof MarkViewContext>(key: Key): MarkViewContext[Key] => getContext(key)

export const markViewFactoryKey = '[ProsemirrorAdapter]useMarkViewFactory'
export type MarkViewFactory = (options: SvelteMarkViewUserOptions) => MarkViewConstructor
export const useMarkViewFactory = () => getContext<MarkViewFactory>(markViewFactoryKey)
