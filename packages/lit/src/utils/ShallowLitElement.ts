import { LitElement } from 'lit'

export class ShallowLitElement extends LitElement {
  override connectedCallback() {
    const result = super.connectedCallback()
    this.performUpdate()
    return result
  }

  override createRenderRoot(): HTMLElement {
    return this
  }
}
