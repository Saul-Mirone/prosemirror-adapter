<script lang="ts">
  import Editor from "./components/Editor.svelte";
  let count = 0;
  function handleClick() {
    count += 1;
  }
</script>

<h1>Prosemirror Adapter Svelte</h1>
<button on:click={handleClick}>rerender</button>
{#key count}
  <Editor />
{/key}
