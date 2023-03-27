/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { ShallowLitElement, useNodeViewContext } from '@prosemirror-adapter/lit'
import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ref } from 'lit/directives/ref.js'

@customElement('my-paragraph')
export class Paragraph extends ShallowLitElement {
  nodeViewContext = useNodeViewContext(this)

  override render() {
    const contentRef = this.nodeViewContext.value?.contentRef
    if (!contentRef)
      return
    return html`<div ${ref(contentRef)}></div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-paragraph': Paragraph
  }
}
