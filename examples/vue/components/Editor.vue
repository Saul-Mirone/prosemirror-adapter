<script setup lang="ts">
import { useNodeViewFactory } from '@prosemirror-adapter/vue';
import { VNodeRef } from 'vue';
import { createEditorView } from '../createEditorView';
import Paragraph from './Paragraph.vue';
import Heading from './Heading.vue';

const nodeViewFactory = useNodeViewFactory();

const editorRef: VNodeRef = (element) => {
    const el = element as HTMLElement;
    if (!el || el.firstChild) return;

    createEditorView(el, {
        paragraph: nodeViewFactory({
            component: Paragraph,
            as: 'div',
            contentAs: 'p',
        }),
        heading: nodeViewFactory({
            component: Heading,
        })
    });
};
</script>

<template>
    <div class="editor" :ref="editorRef" />
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
