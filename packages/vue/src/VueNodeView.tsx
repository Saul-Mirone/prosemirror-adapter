/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { CoreNodeView, CoreNodeViewSpec } from '@prosemirror-adapter/core';
import { nanoid } from 'nanoid';
import { DefineComponent, defineComponent, InjectionKey, markRaw, provide, Teleport, VNodeRef } from 'vue';

export const nodeViewContext: InjectionKey<{
    contentRef: VNodeRef;
}> = Symbol();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyVueComponent = DefineComponent<any, any, any>;

type NodeViewComponent = AnyVueComponent;

type VueNodeViewSpec<T> = CoreNodeViewSpec<T> & {
    component: NodeViewComponent;
};

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

        return markRaw(
            defineComponent({
                name: 'ProsemirrorNodeView',
                setup: () => {
                    provide(nodeViewContext, {
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
                    });
                    return () => (
                        <Teleport key={this.key} to={this.dom}>
                            <UserComponent />
                        </Teleport>
                    );
                },
            }),
        ) as AnyVueComponent;
    }
}
