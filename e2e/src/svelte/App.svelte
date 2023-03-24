<script lang="ts">
  import {useNodeViewFactory, useProsemirrorAdapterProvider} from "@prosemirror-adapter/svelte";
  import {SvelteComponent} from "svelte";
  import {createEditorView} from "../createEditorView";
  import Paragraph from "./components/Paragraph.svelte";
  import Heading from "./components/Heading.svelte";

  let components: SvelteComponent[]

  useProsemirrorAdapterProvider()
  const nodeViewFactory = useNodeViewFactory()

  function editor(element: HTMLElement) {
    createEditorView(element, {
      paragraph: nodeViewFactory({
        component: Paragraph,
        as: 'div',
        contentAs: 'p'
      }),
      heading: nodeViewFactory({
        component: Heading
      })
    }, [])
  }

</script>

<div use:editor/>
