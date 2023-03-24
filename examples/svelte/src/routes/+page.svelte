<script lang="ts">
  import {onDestroy, onMount} from "svelte";
  import {createEditorView} from "../libs/createEditorView.js";

  let paragraph: HTMLElement;
  let paragraphContent: HTMLElement

  export let target: HTMLElement | null | undefined = globalThis.document?.body;

  onMount(() => {
      target?.appendChild(paragraph);
  })

  onDestroy(() => {
    target?.removeChild(paragraph);
  })

  function editor(dom: HTMLElement) {
    createEditorView(dom, {}, [])
  }

</script>

<h1>Prosemirror Adapter Svelte</h1>
<div use:editor />
<div bind:this={paragraph}>
  <p bind:this={paragraphContent}></p>
</div>
