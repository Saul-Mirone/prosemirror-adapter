/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { CoreNodeView } from '@prosemirror-adapter/core';
import { nanoid } from 'nanoid';
import { defineComponent, isRef, markRaw, provide, ref, Teleport } from 'vue';

import { NodeViewContext, nodeViewContext, UnRefedContext } from './nodeViewContext';
import { VueNodeViewComponent, VueNodeViewSpec } from './VueNodeViewOptions';

export function vueNodeViewFactory(spec: VueNodeViewSpec) {
    const vueNodeView = new VueNodeView(spec);
    const { setSelection, stopEvent, selectNode, deselectNode } = spec.options;
    const overrideOptions = {
        setSelection,
        stopEvent,
        selectNode,
        deselectNode,
    };

    Object.assign(vueNodeView, overrideOptions);

    return vueNodeView;
}

export class VueNodeView extends CoreNodeView<VueNodeViewComponent> {
    key: string = nanoid();

    context: NodeViewContext = {
        contentRef: (element) => {
            if (
                element &&
                element instanceof HTMLElement &&
                this.contentDOM &&
                element.firstChild !== this.contentDOM
            ) {
                element.appendChild(this.contentDOM);
            }
        },
        node: ref(this.node),
    };

    updateContext = (context: Partial<UnRefedContext>) => {
        Object.entries(context).forEach(([key, value]) => {
            const prev = this.context[key as keyof NodeViewContext];
            if (isRef(prev)) {
                prev.value = value;
            } else {
                this.context[key as keyof NodeViewContext] = value as never;
            }
        });
    };

    render = () => {
        const UserComponent = this.component;

        return markRaw(
            defineComponent({
                name: 'ProsemirrorNodeView',
                setup: () => {
                    provide(nodeViewContext, this.context);
                    return () => (
                        <Teleport key={this.key} to={this.dom}>
                            <UserComponent />
                        </Teleport>
                    );
                },
            }),
        ) as VueNodeViewComponent;
    };
}
