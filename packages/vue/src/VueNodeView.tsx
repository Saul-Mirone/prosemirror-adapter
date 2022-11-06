/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { CoreNodeView, CoreNodeViewSpec } from '@prosemirror-adapter/core';
import { nanoid } from 'nanoid';
import { DefineComponent, defineComponent, h, InjectionKey, provide, Teleport } from 'vue';

export const nodeViewContext: InjectionKey<{
    contentRef: (element: HTMLElement | null) => void;
}> = Symbol();

type NodeViewComponent = DefineComponent;

type VueNodeViewSpec<T> = CoreNodeViewSpec<T> & {
    component: NodeViewComponent;
};

export class VueNodeView extends CoreNodeView {
    key: string = nanoid();
    component: NodeViewComponent;

    constructor(spec: VueNodeViewSpec<VueNodeView>) {
        const { component, ...rest } = spec;

        super(rest as CoreNodeViewSpec<CoreNodeView>);

        this.component = component;
    }

    render() {
        const UserComponent = this.component;

        return defineComponent({
            name: 'ProsemirrorNodeView',
            setup: () => {
                provide(nodeViewContext, {
                    contentRef: (element: HTMLElement | null) => {
                        if (element && this.contentDOM && element.firstChild !== this.contentDOM) {
                            element.appendChild(this.contentDOM);
                        }
                    },
                });
                return () => (
                    <Teleport key={this.key} to={this.dom}>
                        <UserComponent />
                    </Teleport>
                );
            },
        });
    }
}
