/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { CoreNodeView, CoreNodeViewSpec } from '@prosemirror-adapter/core';
import { customAlphabet } from 'nanoid';
import { Node } from 'prosemirror-model';
import { ComponentType } from 'react';
import { createPortal } from 'react-dom';

import { NodeViewContext, nodeViewContext } from './nodeViewContext';

const nanoid = customAlphabet('abcedfghicklmn', 10);

type NodeViewComponent = ComponentType<{ node: Node }>;

type ReactNodeViewSpec<T> = CoreNodeViewSpec<T> & {
    component: NodeViewComponent;
};

export function reactNodeViewFactory(spec: ReactNodeViewSpec<ReactNodeView>) {
    const reactNodeView = new ReactNodeView(spec);
    const userOptions = spec.options;
    const overrideOptions = {
        setSelection: userOptions.setSelection?.bind(reactNodeView),
        stopEvent: userOptions.stopEvent?.bind(reactNodeView),
        selectNode: userOptions.selectNode?.bind(reactNodeView),
        deselectNode: userOptions.deselectNode?.bind(reactNodeView),
    };

    Object.assign(reactNodeView, overrideOptions);

    return reactNodeView;
}

export class ReactNodeView extends CoreNodeView {
    key: string = nanoid();
    component: NodeViewComponent;

    constructor(spec: ReactNodeViewSpec<ReactNodeView>) {
        const { component, ...rest } = spec;

        super(rest as CoreNodeViewSpec<CoreNodeView>);

        this.component = component;
    }

    #context: NodeViewContext = {
        contentRef: (element) => {
            if (element && this.contentDOM && element.firstChild !== this.contentDOM) {
                element.appendChild(this.contentDOM);
            }
        },
    };

    render = () => {
        const UserComponent = this.component;

        UserComponent.displayName = 'ProsemirrorNodeView';

        return createPortal(
            <nodeViewContext.Provider value={this.#context}>
                <UserComponent node={this.node} />
            </nodeViewContext.Provider>,
            this.dom,
            this.key,
        );
    };
}
