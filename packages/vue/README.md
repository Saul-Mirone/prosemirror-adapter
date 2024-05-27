# @prosemirror-adapter/vue

[Vue](https://vuejs.org/) adapter for [ProseMirror](https://prosemirror.net/).

## Example

You can view the example in [prosemirror-adapter/examples/vue](../../examples/vue/).

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/Saul-Mirone/prosemirror-adapter/tree/main/examples/vue)

## Getting Started

### Install the package

```bash
npm install @prosemirror-adapter/vue
```

### Wrap your component with provider

```vue
<script setup lang="ts">
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'
</script>

<template>
  <ProsemirrorAdapterProvider>
    <YourAwesomeEditor />
  </ProsemirrorAdapterProvider>
</template>
```

<details>

<summary>

### Play with node view

</summary>

In this section we will implement a node view for paragraph node.

#### Build component for [node view](https://prosemirror.net/docs/ref/#view.NodeView)

```vue
<script setup lang="ts">
import { useNodeViewContext } from '@prosemirror-adapter/vue'

const { contentRef, selected } = useNodeViewContext()
</script>

<template>
  <div :ref="contentRef" role="presentation" :class="{ selected }" />
</template>

<style scoped>
.selected {
    outline: blue solid 1px;
}
</style>
```

#### Bind node view components with prosemirror

```vue
<script setup lang="ts">
import type { VNodeRef } from 'vue'
import { useNodeViewFactory } from '@prosemirror-adapter/vue'
import Paragraph from './Paragraph.vue'

const nodeViewFactory = useNodeViewFactory()

const editorRef: VNodeRef = (element) => {
  const el = element as HTMLElement
  if (!el || el.firstChild)
    return

  const editorView = new EditorView(el, {
    state: YourProsemirrorEditorState,
    nodeViews: {
      paragraph: nodeViewFactory({
        component: Paragraph,
        // Optional: add some options
        as: 'div',
        contentAs: 'p',
      }),
    },
  })
}
</script>

<template>
  <div :ref="editorRef" class="editor" />
</template>
```

🚀 Congratulations! You have built your first vue node view with prosemirror-adapter.

</details>

<details>

<summary>

### Play with plugin view

</summary>

In this section we will implement a plugin view that will display the size of the document.

#### Build component for [plugin view](https://prosemirror.net/docs/ref/#state.PluginView)

```vue
<script setup lang="ts">
import { usePluginViewContext } from '@prosemirror-adapter/vue'

const { view } = usePluginViewContext()
const size = computed(() => {
  return view.value.state.doc.nodeSize
})
</script>

<template>
  <div>Size for document: {{ size }}</div>
</template>
```

#### Bind plugin view components with prosemirror

```vue
<script setup lang="ts">
import type { VNodeRef } from 'vue'
import { usePluginViewFactory } from '@prosemirror-adapter/vue'
import { Plugin } from 'prosemirror-state'
import Size from './Size.vue'

const pluginViewFactory = usePluginViewFactory()

const editorRef: VNodeRef = (element) => {
  const el = element as HTMLElement
  if (!el || el.firstChild)
    return

  const editorView = new EditorView(el, {
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
}
</script>

<template>
  <div :ref="editorRef" class="editor" />
</template>
```

🚀 Congratulations! You have built your first vue plugin view with prosemirror-adapter.

</details>

<details>

<summary>

### Play with widget view

</summary>

In this section we will implement a widget view that will add hashes for heading when selected.

#### Build component for [widget decoration view](https://prosemirror.net/docs/ref/#view.Decoration%5Ewidget)

```vue
<script setup lang="ts">
import { useWidgetViewContext } from '@prosemirror-adapter/vue'

const { spec } = useWidgetViewContext()
const level = spec?.level
const hashes = Array(level || 0).fill('#').join('')
</script>

<template>
  <span class="hash">{{ hashes }}</span>
</template>

<style scoped>
.hash {
  color: blue;
  margin-right: 6px;
}
</style>
```

#### Bind widget view components with prosemirror

```vue
<script setup lang="ts">
import type { VNodeRef } from 'vue'
import { useWidgetViewFactory } from '@prosemirror-adapter/vue'
import { Plugin } from 'prosemirror-state'
import Hashes from './Hashes.vue'

const widgetViewFactory = useWidgetViewFactory()

const editorRef: VNodeRef = (element) => {
  const el = element as HTMLElement
  if (!el || el.firstChild)
    return

  const getHashWidget = widgetViewFactory({
    as: 'i',
    component: Hashes,
  })

  const editorView = new EditorView(el, {
    state: EditorState.create({
      schema: YourProsemirrorSchema,
      plugins: [
        new Plugin({
          props: {
            decorations(state) {
              const { $from } = state.selection
              const node = $from.node()
              if (node.type.name !== 'heading')
                return DecorationSet.empty

              const widget = getHashWidget($from.before() + 1, {
                side: -1,
                level: node.attrs.level,
              })

              return DecorationSet.create(state.doc, [widget])
            },
          },
        }),
      ]
    })
  })
}
</script>

<template>
  <div :ref="editorRef" class="editor" />
</template>
```

🚀 Congratulations! You have built your first vue widget view with prosemirror-adapter.

</details>

## API

<details>

<summary>

### Node view API

</summary>

#### useNodeViewFactory: () => (options: NodeViewFactoryOptions) => NodeView

```ts

type DOMSpec = string | HTMLElement | ((node: Node) => HTMLElement)

interface NodeViewFactoryOptions {
  // Component
  component: VueComponent

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

#### useNodeViewContext: () => NodeViewContext

```ts

interface NodeViewContext {
  // The DOM element that contains the content of the node.
  contentRef: NodeViewContentRef

  // The prosemirror editor view.
  view: EditorView

  // Get prosemirror position of current node view.
  getPos: () => number | undefined

  // Set node.attrs of current node.
  setAttrs: (attrs: Attrs) => void

  // The prosemirror node for current node.
  node: ShallowRef<Node>

  // The prosemirror decorations for current node.
  decorations: ShallowRef<readonly Decoration[]>

  // The prosemirror inner decorations for current node.
  innerDecorations: ShallowRef<DecorationSource>

  // Whether the node is selected.
  selected: ShallowRef<boolean>
}
```

</details>

<details>

<summary>

### Plugin view API

</summary>

#### usePluginViewFactory: () => (options: PluginViewFactoryOptions) => PluginView

```ts

interface PluginViewFactoryOptions {
  // Component
  component: VueComponent

  // The DOM element to use as the root node of the plugin view.
  // The `viewDOM` here means `EditorState.view.dom`.
  // By default, it will be `EditorState.view.dom.parentElement`.
  root?: (viewDOM: HTMLElement) => HTMLElement

  // Overrides: this part is equal to properties of [PluginView](https://prosemirror.net/docs/ref/#state.PluginView)
  update?: (view: EditorView, prevState: EditorState) => void
  destroy?: () => void
}
```

#### usePluginViewContext: () => PluginViewContext

```ts

interface PluginViewContext {
  // The prosemirror editor view.
  view: ShallowRef<EditorView>

  // The previously prosemirror editor state.
  // Will be `undefined` when the plugin view is created.
  prevState: ShallowRef<EditorState | undefined>
}
```

</details>

<details>

<summary>

### Widget view API

</summary>

#### useWidgetViewFactory: () => (options: WidgetViewFactoryOptions) => WidgetDecorationFactory

```ts

type WidgetDecorationFactory = (pos: number, spec?: WidgetDecorationSpec) => Decoration

interface WidgetViewFactoryOptions {
  // Component
  component: VueComponent

  // The DOM element to use as the root node of the widget view.
  as: string | HTMLElement
}
```


#### useWidgetViewContext: () => WidgetViewContext

```ts

interface WidgetViewContext {
  // The prosemirror editor view.
  view: EditorView

  // Get the position of the widget.
  getPos: () => number | undefined

  // Get the [spec](https://prosemirror.net/docs/ref/#view.Decoration^widget^spec) of the widget.
  spec?: WidgetDecorationSpec
}
```

</details>

## Contributing

Follow our [contribution guide](../../CONTRIBUTING.md) to learn how to contribute to prosemirror-adapter.

## License

[MIT](../../LICENSE)
