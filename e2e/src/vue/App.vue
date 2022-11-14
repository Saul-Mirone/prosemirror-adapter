<script setup lang="ts">
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue';
import Editor from './components/Editor.vue';
</script>

<template>
    <h1>Prosemirror Adapter Vue</h1>
    <ProsemirrorAdapterProvider>
        <Editor />
    </ProsemirrorAdapterProvider>
</template>
