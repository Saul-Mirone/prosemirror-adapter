<script setup lang="ts">
import { useWidgetViewContext } from '@prosemirror-adapter/vue'

const { view } = useWidgetViewContext()
const $from = view.state.selection.$from
const node = $from.node()
const level = node.attrs.level
const hashes = Array(level || 0)
  .fill(0)
  .map(_ => '#')
  .join('')
</script>

<template>
  <span class="hash">{{ hashes }} </span>
</template>

<style scoped>
.hash {
  color: blue;
}
</style>
