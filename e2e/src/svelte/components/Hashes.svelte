<script lang="ts">
  import { useWidgetViewContext } from '@prosemirror-adapter/svelte'

  let hashes = '';

  const specStore = useWidgetViewContext('spec')
  specStore?.subscribe((spec) => {
    const level = spec?.level
    hashes = Array(level || 0).fill('#').join('')
  })
</script>

<span class="hash">{hashes}</span>

<style>
  .hash {
    color: blue;
    margin-right: 6px;
  }
</style>
