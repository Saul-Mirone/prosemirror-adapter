/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { ContextProvider } from '@lit-labs/context'
import { customElement } from 'lit/decorators.js'
import { useLitRenderer } from './LitRenderer'
import { nodeViewFactoryKey } from './nodeView'
import { useLitNodeViewCreator } from './nodeView/useLitNodeViewCreator'
import { pluginViewFactoryKey } from './pluginView'
import { useLitPluginViewCreator } from './pluginView/useLitPluginViewCreator'
import { ShallowLitElement } from './utils/ShallowLitElement'
import { widgetViewFactoryKey } from './widgetView'
import { useLitWidgetViewCreator } from './widgetView/useLitWidgetViewCreator'

@customElement('prosemirror-adapter-provider')
export class ProsemirrorAdapterProvider extends ShallowLitElement {
  createLitNodeView: ContextProvider<typeof nodeViewFactoryKey>
  createLitPluginView: ContextProvider<typeof pluginViewFactoryKey>
  createLitWidgetView: ContextProvider<typeof widgetViewFactoryKey>
  constructor() {
    super()
    const { renderLitRenderer, removeLitRenderer } = useLitRenderer()
    const createLitNodeView = useLitNodeViewCreator(renderLitRenderer, removeLitRenderer)
    const createLitPluginView = useLitPluginViewCreator(renderLitRenderer, removeLitRenderer)
    const createLitWidgetView = useLitWidgetViewCreator(renderLitRenderer, removeLitRenderer)
    this.createLitNodeView = new ContextProvider(this, nodeViewFactoryKey, createLitNodeView)
    this.createLitPluginView = new ContextProvider(this, pluginViewFactoryKey, createLitPluginView)
    this.createLitWidgetView = new ContextProvider(this, widgetViewFactoryKey, createLitWidgetView)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'prosemirror-adapter-provider': ProsemirrorAdapterProvider
  }
}
