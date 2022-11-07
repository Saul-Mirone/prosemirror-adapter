/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { CoreNodeView } from '@prosemirror-adapter/core';
import { nanoid } from 'nanoid';
import { defineComponent, markRaw, provide, Teleport } from 'vue';

import { NodeViewContext, nodeViewContext } from './nodeViewContext';
import { VueNodeViewComponent, VueNodeViewSpec } from './VueNodeViewOptions';

export function vueNodeViewFactory(spec: VueNodeViewSpec<VueNodeView>) {
    const vueNodeView = new VueNodeView(spec);
    const userOptions = spec.options;
    const overrideOptions = {
        setSelection: userOptions.setSelection?.bind(vueNodeView),
        stopEvent: userOptions.stopEvent?.bind(vueNodeView),
        selectNode: userOptions.selectNode?.bind(vueNodeView),
        deselectNode: userOptions.deselectNode?.bind(vueNodeView),
    };

    Object.assign(vueNodeView, overrideOptions);

    return vueNodeView;
}

export class VueNodeView extends CoreNodeView<VueNodeViewComponent> {
    key: string = nanoid();

    #context: NodeViewContext = {
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
    };

    render = () => {
        const UserComponent = this.component;

        return markRaw(
            defineComponent({
                name: 'ProsemirrorNodeView',
                setup: () => {
                    provide(nodeViewContext, this.#context);
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
