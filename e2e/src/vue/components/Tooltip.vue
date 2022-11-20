<script setup lang="ts">
import { usePluginViewContext } from '@prosemirror-adapter/vue';
import { computed, effect, ref, Ref } from 'vue';

const { view } = usePluginViewContext();
const divRef: Ref = ref()

const len = computed(() => {
  const { from, to }  = view.value.state.selection
  return to - from
})

effect(() => {
  if (divRef.value) {
    const { from, to }  = view.value.state.selection
    const start = view.value.coordsAtPos(from)
    const end = view.value.coordsAtPos(to)
    const box = divRef.value.offsetParent?.getBoundingClientRect()
    const left = Math.max((start.left + end.left) / 2, start.left + 3)

    const x = (left - (box?.left || 0))
    const y = (((box?.bottom || 0) - start.top))

    divRef.value.style.left = `${x}px`
    divRef.value.style.bottom = `${y}px`
  }
})


</script>

<template>
    <div class="tooltip" ref="divRef">{{ len }}</div>
</template>

<style scoped>
.tooltip {
  position: absolute;
  border: 1px solid;
  background: gray;
}
</style>
