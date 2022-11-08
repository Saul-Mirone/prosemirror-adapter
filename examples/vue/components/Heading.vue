<script setup lang="ts">
import { nodeViewContext } from '@prosemirror-adapter/vue';
import { computed, inject } from 'vue';

const { contentRef, node } = inject(nodeViewContext)!;


const tag = computed(() => {
    return `h${node.value.attrs['level']}`
});
</script>

<template>
    <component :is="tag" :ref="contentRef" />
</template>
