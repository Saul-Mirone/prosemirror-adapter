/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { EditorView } from 'prosemirror-view'
import type { CoreWidgetViewSpec, CoreWidgetViewUserOptions } from './CoreWidgetViewOptions'

export class CoreWidgetView<Component> {
  dom: HTMLElement
  view: EditorView
  getPos: () => number
  options: CoreWidgetViewUserOptions<Component>

  #createElement(as: string | HTMLElement) {
    return as instanceof HTMLElement
      ? as
      : document.createElement(as)
  }

  constructor({ view, getPos, options }: CoreWidgetViewSpec<Component>) {
    this.view = view
    this.getPos = getPos
    this.options = options

    this.dom = this.#createElement(options.as)
    this.dom.setAttribute('data-widget-view-root', 'true')
  }

  get component() {
    return this.options.component
  }
}
