/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type { WidgetDecorationFactory, WidgetDecorationSpec } from '@prosemirror-adapter/core'
import type { EditorView } from 'prosemirror-view'
import { getContext } from 'svelte'
import type { Writable } from 'svelte/store'
import type { Obj2Map } from '../types'
import type { SvelteWidgetViewUserOptions } from './SvelteWidgetViewOptions'

export interface WidgetViewContext {
  view: Writable<EditorView>
  getPos: Writable<() => number | undefined>
  spec?: Writable<WidgetDecorationSpec>
}

export type WidgetViewContextMap = Obj2Map<WidgetViewContext>

export const useWidgetViewContext = <Key extends keyof WidgetViewContext>(key: Key): WidgetViewContext[Key] => getContext(key)

export type WidgetViewFactory = (options: SvelteWidgetViewUserOptions) => WidgetDecorationFactory
export const widgetViewFactoryKey = '[ProsemirrorAdapter]useWidgetViewFactory'
export const useWidgetViewFactory = () => getContext<WidgetViewFactory>(widgetViewFactoryKey)
