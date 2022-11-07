/* Copyright 2021, Prosemirror Adapter by Mirone. */

import './Editor.css';

import { vueNodeViewFactory } from '@prosemirror-adapter/vue';
import { DefineComponent, defineComponent, getCurrentInstance, onMounted, ref } from 'vue';

import Paragraph from './Paragraph.vue';
import { createEditorView } from './prosemirror';

export const Editor = defineComponent({
    name: 'Editor',
    setup: () => {
        const divRef = ref<HTMLDivElement>();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const portals = ref<Record<string, DefineComponent<any, any, any>>>({});
        const instance = getCurrentInstance();

        onMounted(() => {
            if (!divRef.value) return;
            createEditorView(divRef.value, {
                paragraph(node, view, getPos, decorations, innerDecorations) {
                    const nodeView = vueNodeViewFactory({
                        node,
                        view,
                        getPos,
                        decorations,
                        innerDecorations,
                        options: {
                            component: Paragraph,
                            as: 'div',
                            contentAs: 'p',
                            destroy() {
                                delete portals.value[nodeView.key];
                            },
                        },
                    });

                    const portal = nodeView.render();

                    portals.value[nodeView.key] = portal;
                    instance?.update();

                    return nodeView;
                },
            });
        });
        return () => {
            const portalElements = Object.entries(portals.value).map(([id, P]) => <P key={id} />);
            return (
                <>
                    <div class="editor" ref={divRef} />
                    {portalElements}
                </>
            );
        };
    },
});
