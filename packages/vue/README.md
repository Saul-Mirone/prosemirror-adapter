# @prosemirror-adapter/vue

[Vue](https://vuejs.org/) adapter for [ProseMirror](https://prosemirror.net/).

## Example

You can view the example in [prosemirror-adapter/examples/vue](../../examples/vue/).

## Getting Started

### Install the package

```bash
npm install @prosemirror-adapter/vue
```

### Wrap your component with provider

```vue
<script setup lang="ts">
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue';
</script>

<template>
    <ProsemirrorAdapterProvider>
        <YourAwesomeEditor />
    </ProsemirrorAdapterProvider>
</template>
```

### Build component for [node view](https://prosemirror.net/docs/ref/#view.NodeView)

```vue
<script setup lang="ts">
import { useNodeViewContext } from '@prosemirror-adapter/vue';
const { contentRef, selected } = useNodeViewContext();
</script>

<template>
    <div role="presentation" :class="{ selected: selected }" :ref="contentRef"></div>
</template>

<style scoped>
.selected {
    outline: blue solid 1px;
}
</style>
```

### Bind node view components with prosemirror

```vue
<script setup lang="ts">
import { VNodeRef } from 'vue';
import { useNodeViewFactory } from '@prosemirror-adapter/vue';
import Paragraph from './Paragraph.vue';

const editorRef: VNodeRef = (element) => {
    const el = element as HTMLElement;
    if (!el || el.firstChild) return;

    new EditorView(el, {
        state: YourProsemirrorEditorState,
        nodeViews: {
            paragraph: nodeViewFactory({
                component: Paragraph,
                // Optional: add some options
                as: 'div',
                contentAs: 'p',
            }),
        },
    });
};
</script>

<template>
    <div class="editor" :ref="editorRef" />
</template>
```

🚀 Congratulations! You have built your first vue node view with prosemirror-adapter.

## API

### useNodeViewFactory: () => (options: NodeViewFactoryOptions) => NodeView

```ts
type DOMSpec = string | HTMLElement | ((node: Node) => HTMLElement);

type NodeViewFactoryOptions = {
    // Component
    component: VueComponent

    // The DOM element to use as the root node of the node view.
    as?: DOMSpec;
    // The DOM element that contains the content of the node.
    contentAs?: DOMSpec;

    // Overrides: this part is equal to properties of [NodeView](https://prosemirror.net/docs/ref/#view.NodeView)
    update?: (node: Node, decorations: readonly Decoration[], innerDecorations: DecorationSource) => boolean | void;
    ignoreMutation?: (mutation: MutationRecord) => boolean | void;
    selectNode?: () => void;
    deselectNode?: () => void;
    setSelection?: (anchor: number, head: number, root: Document | ShadowRoot) => void;
    stopEvent?: (event: Event) => boolean;
    destroy?: () => void;

    // Called when the node view is updated.
    onUpdate?: () => void;
}
```

### useNodeViewContext: () => NodeViewContext

```ts
type NodeViewContext = {
    // The DOM element that contains the content of the node.
    contentRef: NodeViewContentRef;

    // The prosemirror editor view.
    view: EditorView;

    // Get prosemirror position of current node view.
    getPos: () => number;

    // Set node.attrs of current node.
    setAttrs: (attrs: Attrs) => void;

    // The prosemirror node for current node.
    node: Node;

    // The prosemirror decorations for current node. 
    decorations: readonly Decoration[];

    // The prosemirror inner decorations for current node. 
    innerDecorations: DecorationSource;

    // Whether the node is selected.
    selected: boolean;
}
```

## Contributing

Follow our [contribution guide](../../CONTRIBUTING.md) to learn how to contribute to prosemirror-adapter.

## License

[MIT](../../LICENSE)
