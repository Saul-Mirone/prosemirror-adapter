/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { NodeViewConstructor } from 'prosemirror-view';
import {
    defineComponent,
    getCurrentInstance,
    h,
    inject,
    InjectionKey,
    markRaw,
    onBeforeMount,
    onUnmounted,
    provide,
    ref,
} from 'vue';

import { vueNodeViewFactory } from './VueNodeView';
import { VueNodeViewComponent, VueNodeViewUserOptions } from './VueNodeViewOptions';

export type NodeViewFactory = (options: VueNodeViewUserOptions) => NodeViewConstructor;
export const nodeViewFactoryKey: InjectionKey<NodeViewFactory> = Symbol('useNodeViewFactory');
export const useNodeViewFactory = () => inject(nodeViewFactoryKey) as NodeViewFactory;

export const ProsemirrorAdapterProvider = defineComponent({
    name: 'prosemirror-adapter-provider',
    setup: (_, { slots }) => {
        const portals = ref<Record<string, VueNodeViewComponent>>({});
        const instance = getCurrentInstance();
        const update = markRaw<{ updater?: () => void }>({});

        onBeforeMount(() => {
            update.updater = () => {
                instance?.update();
            };
        });

        onUnmounted(() => {
            update.updater = void 0;
        });

        const createVueNodeView: NodeViewFactory = (options) => (node, view, getPos, decorations, innerDecorations) => {
            const nodeView = vueNodeViewFactory({
                node,
                view,
                getPos,
                decorations,
                innerDecorations,
                options: {
                    ...options,
                    onUpdate() {
                        options.onUpdate?.();
                        nodeView.updateContext();
                    },
                    selectNode() {
                        nodeView.updateContext();
                    },
                    deselectNode() {
                        nodeView.updateContext();
                    },
                    destroy() {
                        options.destroy?.();
                        delete portals.value[nodeView.key];
                    },
                },
            });

            portals.value[nodeView.key] = nodeView.render();
            update.updater?.();

            return nodeView;
        };

        provide(nodeViewFactoryKey, createVueNodeView);

        return () => {
            return (
                <>
                    {slots['default']?.()}
                    {Object.values(portals.value).map((x) => h(x))}
                </>
            );
        };
    },
});
