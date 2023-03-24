/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { setContext } from 'svelte'
import { nodeViewFactoryKey } from './nodeView'
import { useSvelteNodeViewCreator } from './nodeView/useSvelteNodeViewCreator'
import { pluginViewFactoryKey } from './pluginView'
import { useSveltePluginViewCreator } from './pluginView/useSveltePluginViewCreator'

import { useSvelteRenderer } from './SvelteRenderer'

export const useProsemirrorAdapterProvider = () => {
  const { renderSvelteRenderer, removeSvelteRenderer } = useSvelteRenderer()
  const createSvelteNodeView = useSvelteNodeViewCreator(renderSvelteRenderer, removeSvelteRenderer)
  const createSveltePluginView = useSveltePluginViewCreator(renderSvelteRenderer, removeSvelteRenderer)

  setContext(nodeViewFactoryKey, createSvelteNodeView)
  setContext(pluginViewFactoryKey, createSveltePluginView)
}
