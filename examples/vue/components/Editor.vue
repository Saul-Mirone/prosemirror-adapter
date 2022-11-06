<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { createEditorView } from './prosemirror';
const divRef = ref<HTMLDivElement>();

onMounted(() => {
    createEditorView(divRef.value!, {});
});
</script>

<template>
    <div class="editor" ref="divRef"></div>
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
