/* Copyright 2021, Prosemirror Adapter by Mirone. */

import './Editor.css';

import { ProsemirrorAdapterProvider, useNodeViewFactory } from '@prosemirror-adapter/vue';
import { defineComponent, onMounted, ref } from 'vue';

import Paragraph from './Paragraph.vue';
import { createEditorView } from './prosemirror';

const InnerEditor = defineComponent({
    setup: () => {
        const divRef = ref<HTMLDivElement>();
        const nodeViewFactory = useNodeViewFactory();

        onMounted(() => {
            if (!divRef.value) return;
            createEditorView(divRef.value, {
                paragraph: nodeViewFactory({
                    component: Paragraph,
                    as: 'div',
                    contentAs: 'p',
                }),
            });
        });

        return () => <div class="editor" ref={divRef} />;
    },
});

export const Editor = defineComponent({
    name: 'Editor',
    setup: () => () => <ProsemirrorAdapterProvider>{{ default: () => <InnerEditor /> }}</ProsemirrorAdapterProvider>,
});
