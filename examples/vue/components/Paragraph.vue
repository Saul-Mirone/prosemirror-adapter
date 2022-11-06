<script setup lang="ts">
import { nodeViewContext } from '@prosemirror-adapter/vue';
import { inject } from 'vue';

const { contentRef } = inject(nodeViewContext)!;
</script>

<template>
    <div class="paragraph" :ref="contentRef"></div>
</template>
