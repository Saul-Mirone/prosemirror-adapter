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
