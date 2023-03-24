<script lang="ts">
  import {useNodeViewFactory, usePluginViewFactory, useProsemirrorAdapterProvider} from "@prosemirror-adapter/svelte";
  import { Plugin } from 'prosemirror-state'
  import {SvelteComponent} from "svelte";
  import {createEditorView} from "../createEditorView";
  import Paragraph from "./components/Paragraph.svelte";
  import Heading from "./components/Heading.svelte";
  import Size from "./components/Size.svelte";

  let components: SvelteComponent[]

  useProsemirrorAdapterProvider()
  const nodeViewFactory = useNodeViewFactory()
  const pluginViewFactory = usePluginViewFactory()

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
    }, [
      new Plugin({
        view: pluginViewFactory({
          component: Size
        })
      })
    ])
  }

</script>

<div use:editor/>
