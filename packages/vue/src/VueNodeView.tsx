/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { CoreNodeView } from '@prosemirror-adapter/core';
import { nanoid } from 'nanoid';
import { defineComponent, isRef, markRaw, provide, ref, Teleport } from 'vue';

import { NodeViewContext, nodeViewContext } from './nodeViewContext';
import { VueNodeViewComponent, VueNodeViewSpec } from './VueNodeViewOptions';

export function vueNodeViewFactory(spec: VueNodeViewSpec) {
    const vueNodeView = new VueNodeView(spec);
    const { setSelection, stopEvent } = spec.options;
    const overrideOptions = {
        setSelection,
        stopEvent,
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
        selected: ref(this.selected),
    };

    updateContext = () => {
        Object.entries({
            node: this.node,
            selected: this.selected,
        }).forEach(([key, value]) => {
            const prev = this.context[key as keyof NodeViewContext];
            if (isRef(prev) && prev.value !== value) {
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
