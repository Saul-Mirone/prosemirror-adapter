<script setup lang="ts">
import { useNodeViewFactory, usePluginViewFactory, useWidgetViewFactory } from '@prosemirror-adapter/vue'
import { Plugin } from 'prosemirror-state'
import type { VNodeRef } from 'vue'
import { DecorationSet } from 'prosemirror-view'
import { createEditorView } from '../../createEditorView'
import Paragraph from './Paragraph.vue'
import Heading from './Heading.vue'
import Tooltip from './Tooltip.vue'
import Hashes from './Hashes.vue'

const nodeViewFactory = useNodeViewFactory()
const pluginViewFactory = usePluginViewFactory()
const widgetViewFactory = useWidgetViewFactory()

const hashWidgetFactory = widgetViewFactory({
  as: 'span',
  component: Hashes,
})

const editorRef: VNodeRef = (element) => {
  const el = element as HTMLElement
  if (!el || el.firstChild)
    return

  createEditorView(el, {
    paragraph: nodeViewFactory({
      component: Paragraph,
      as: 'div',
      contentAs: 'p',
    }),
    heading: nodeViewFactory({
      component: Heading,
    }),
  }, [
    new Plugin({
      view: pluginViewFactory({
        component: Tooltip,
      }),
    }),
    new Plugin<DecorationSet>({
      state: {
        init() { return DecorationSet.empty },
        apply(tr) {
          const { $from } = tr.selection
          const node = $from.node()
          if (node.type.name !== 'heading')
            return DecorationSet.empty

          const widget = hashWidgetFactory($from.before() + 1, {
            side: -1,
          })

          return DecorationSet.create(tr.doc, [widget])
        },
      },
      props: {
        decorations(state) {
          return this.getState(state)
        },
      },
    }),
  ])
}
</script>

<template>
  <div :ref="editorRef" class="editor" />
</template>

<style>
.editor {
    background: white;
    color: black;
    background-clip: padding-box;
    border-radius: 4px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    padding: 5px 0;
    margin-bottom: 23px;
    position: relative;
}

.ProseMirror p:first-child,
.ProseMirror h1:first-child,
.ProseMirror h2:first-child,
.ProseMirror h3:first-child,
.ProseMirror h4:first-child,
.ProseMirror h5:first-child,
.ProseMirror h6:first-child {
    margin-top: 10px;
}

.ProseMirror {
    padding: 4px 8px 4px 14px;
    line-height: 1.2;
    outline: none;
}

.ProseMirror p { margin-bottom: 1em }
</style>
