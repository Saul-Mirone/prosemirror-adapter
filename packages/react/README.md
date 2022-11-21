# @prosemirror-adapter/react

[React](https://reactjs.org/) adapter for [ProseMirror](https://prosemirror.net/).

## Example

You can view the example in [prosemirror-adapter/examples/react](../../examples/react/).

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/Saul-Mirone/prosemirror-adapter/tree/main/examples/react)

## Getting Started

### Install the package

```bash
npm install @prosemirror-adapter/react
```

### Wrap your component with provider

```tsx
/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react'
import { YourAwesomeEditor } from 'somewhere'

export const Component = () => {
  return (
        <ProsemirrorAdapterProvider>
            <YourAwesomeEditor />
        </ProsemirrorAdapterProvider>
  )
}
```

### Build component for [node view](https://prosemirror.net/docs/ref/#view.NodeView)

```tsx
/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { useNodeViewContext } from '@prosemirror-adapter/react'

const Paragraph = () => {
  const { contentRef, selected } = useNodeViewContext()
  return <div style={{ outline: selected ? 'blue solid 1px' : 'none' }} role="presentation" ref={contentRef} />
}
```

### Bind node view components with prosemirror

```tsx
/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { useNodeViewFactory } from '@prosemirror-adapter/react'
import type { FC } from 'react'
import { useCallback, useRef } from 'react'

import { Paragraph } from './Paragraph'

export const YourAwesomeEditor: FC = () => {
  const nodeViewFactory = useNodeViewFactory()

  const editorRef = useCallback(
    (element: HTMLDivElement) => {
      if (!element || element.firstChild)
        return

      const editorView = new EditorView(element, {
        state: YourProsemirrorEditorState,
        nodeViews: {
          paragraph: nodeViewFactory({
            component: Paragraph,
            // Optional: add some options
            as: 'div',
            contentAs: 'p',
          }),
        }
      })
    },
    [nodeViewFactory],
  )

  return <div className="editor" ref={editorRef} />
}
```

🚀 Congratulations! You have built your first react node view with prosemirror-adapter.

### Build component for [plugin view](https://prosemirror.net/docs/ref/#state.PluginView)

```tsx
/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { usePluginViewContext } from '@prosemirror-adapter/react'

const Size = () => {
  const { view } = usePluginViewContext()
  const size = view.state.doc.nodeSize
  return <div>Size for document: {size}</div>
}
```

### Bind plugin view components with prosemirror

```tsx
/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { usePluginViewFactory } from '@prosemirror-adapter/react'
import type { FC } from 'react'
import { useCallback, useRef } from 'react'
import { Plugin } from 'prosemirror-state'

import { Paragraph } from './Paragraph'

export const YourAwesomeEditor: FC = () => {
  const pluginViewFactory = usePluginViewFactory()

  const editorRef = useCallback(
    (element: HTMLDivElement) => {
      if (!element || element.firstChild)
        return

      const editorView = new EditorView(element, {
        state: EditorState.create({
          schema: YourProsemirrorSchema,
          plugins: [
            new Plugin({
              view: pluginViewFactory({
                component: Size,
              }),
            }),
          ]
        })
      })
    },
    [pluginViewFactory],
  )

  return <div className="editor" ref={editorRef} />
}
```

🚀 Congratulations! You have built your first react plugin view with prosemirror-adapter.

## API

### useNodeViewFactory: () => (options: NodeViewFactoryOptions) => NodeView

```ts
/* Copyright 2021, Prosemirror Adapter by Mirone. */
type DOMSpec = string | HTMLElement | ((node: Node) => HTMLElement)

interface NodeViewFactoryOptions {
  // Component
  component: ReactComponent

  // The DOM element to use as the root node of the node view.
  as?: DOMSpec
  // The DOM element that contains the content of the node.
  contentAs?: DOMSpec

  // Overrides: this part is equal to properties of [NodeView](https://prosemirror.net/docs/ref/#view.NodeView)
  update?: (node: Node, decorations: readonly Decoration[], innerDecorations: DecorationSource) => boolean | void
  ignoreMutation?: (mutation: MutationRecord) => boolean | void
  selectNode?: () => void
  deselectNode?: () => void
  setSelection?: (anchor: number, head: number, root: Document | ShadowRoot) => void
  stopEvent?: (event: Event) => boolean
  destroy?: () => void

  // Called when the node view is updated.
  onUpdate?: () => void
}
```

### useNodeViewContext: () => NodeViewContext

```ts
/* Copyright 2021, Prosemirror Adapter by Mirone. */
interface NodeViewContext {
  // The DOM element that contains the content of the node.
  contentRef: NodeViewContentRef

  // The prosemirror editor view.
  view: EditorView

  // Get prosemirror position of current node view.
  getPos: () => number

  // Set node.attrs of current node.
  setAttrs: (attrs: Attrs) => void

  // The prosemirror node for current node.
  node: Node

  // The prosemirror decorations for current node.
  decorations: readonly Decoration[]

  // The prosemirror inner decorations for current node.
  innerDecorations: DecorationSource

  // Whether the node is selected.
  selected: boolean
}
```

### usePluginViewFactory: () => (options: PluginViewFactoryOptions) => PluginView

```ts
/* Copyright 2021, Prosemirror Adapter by Mirone. */
interface PluginViewFactoryOptions {
  // Component
  component: Component

  // The DOM element to use as the root node of the plugin view.
  // The `viewDOM` here means `EditorState.view.dom`.
  // By default, it will be `EditorState.view.dom.parentElement`.
  root?: (viewDOM: HTMLElement) => HTMLElement

  // Overrides: this part is equal to properties of [PluginView](https://prosemirror.net/docs/ref/#state.PluginView)
  update?: (view: EditorView, prevState: EditorState) => void
  destroy?: () => void
}
```

### usePluginViewContext: () => PluginViewContext

```ts
/* Copyright 2021, Prosemirror Adapter by Mirone. */
interface PluginViewContext {
  // The prosemirror editor view.
  view: EditorView

  // The previously prosemirror editor state.
  // Will be `undefined` when the plugin view is created.
  prevState?: EditorState
}
```

## Contributing

Follow our [contribution guide](../../CONTRIBUTING.md) to learn how to contribute to prosemirror-adapter.

## License

[MIT](../../LICENSE)
