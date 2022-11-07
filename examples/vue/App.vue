<script setup lang="ts">
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue';
import Editor from './components/Editor.vue';
</script>

<template>
    <ProsemirrorAdapterProvider>
        <Editor />
    </ProsemirrorAdapterProvider>
</template>
