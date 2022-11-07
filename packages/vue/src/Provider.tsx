/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { NodeViewConstructor } from 'prosemirror-view';
import {
    defineComponent,
    getCurrentInstance,
    h,
    inject,
    InjectionKey,
    onMounted,
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
        const isMounted = ref(false);

        onMounted(() => {
            isMounted.value = true;
        });

        onUnmounted(() => {
            isMounted.value = false;
        });

        const forceUpdate = () => {
            if (isMounted.value) {
                instance?.update();
            }
        };

        const createVueNodeView: NodeViewFactory = (options) => (node, view, getPos, decorations, innerDecorations) => {
            const nodeView = vueNodeViewFactory({
                node,
                view,
                getPos,
                decorations,
                innerDecorations,
                options: {
                    ...options,
                    update(node, ...args) {
                        let shouldUpdate = options.update?.(node, ...args);

                        if (typeof shouldUpdate !== 'boolean') {
                            shouldUpdate = nodeView.shouldUpdate(node);
                        }

                        if (shouldUpdate) {
                            nodeView.updateContext({
                                node,
                            });
                        }
                        return shouldUpdate;
                    },
                    destroy() {
                        options.destroy?.();
                        delete portals.value[nodeView.key];
                        forceUpdate();
                    },
                },
            });

            portals.value[nodeView.key] = nodeView.render();
            forceUpdate();

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
