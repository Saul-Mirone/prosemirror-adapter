<script setup lang="ts">
import { nodeViewContext } from '@prosemirror-adapter/vue';
import { inject } from 'vue';

const { contentRef, selected } = inject(nodeViewContext)!;
</script>

<template>
    <div role="presentation" :class="{ selected: selected }" :ref="contentRef"></div>
</template>

<style scoped>
.selected {
    outline: blue solid 1px;
}
</style>
