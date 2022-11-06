/* Copyright 2021, Prosemirror Adapter by Mirone. */

import './Editor.css';

import { vueNodeViewFactory } from '@prosemirror-adapter/vue';
import {
    ComponentInternalInstance,
    DefineComponent,
    defineComponent,
    getCurrentInstance,
    onBeforeMount,
    onMounted,
    onUnmounted,
    ref,
} from 'vue';

import Paragraph from './Paragraph.vue';
import { createEditorView } from './prosemirror';

export const Editor = defineComponent({
    name: 'Editor',
    setup: () => {
        const divRef = ref<HTMLDivElement>();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const portals = ref<Record<string, DefineComponent<any, any, any>>>({});
        const instance = getCurrentInstance();

        const rootInstance = ref<null | ComponentInternalInstance>(null);

        onBeforeMount(() => {
            rootInstance.value = (instance as ComponentInternalInstance & { ctx: { _: ComponentInternalInstance } }).ctx
                ._ as ComponentInternalInstance;
        });

        onUnmounted(() => {
            rootInstance.value = null;
        });

        onMounted(() => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            createEditorView(divRef.value!, {
                paragraph(node, view, getPos, decorations, innerDecorations) {
                    const nodeView = vueNodeViewFactory({
                        component: Paragraph,
                        node,
                        view,
                        getPos,
                        decorations,
                        innerDecorations,
                        options: {
                            as: 'div',
                            contentAs: 'p',
                            destroy() {
                                delete portals.value[this.key];
                                rootInstance.value?.update();
                            },
                        },
                    });

                    const portal = nodeView.render();

                    portals.value[nodeView.key] = portal;
                    rootInstance.value?.update();

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
