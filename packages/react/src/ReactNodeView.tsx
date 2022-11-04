/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { CoreNodeView, CoreNodeViewSpec } from '@prosemirror-adapter/core';
import { customAlphabet } from 'nanoid';
import { Node } from 'prosemirror-model';
import { ComponentType } from 'react';
import { createPortal } from 'react-dom';

import { NodeViewContext, nodeViewContext } from './NodeViewContext';

const nanoid = customAlphabet('abcedfghicklmn', 10);

type NodeViewComponent = ComponentType<{ node: Node }>;

type ReactNodeViewSpec<T> = CoreNodeViewSpec<T> & {
    component: NodeViewComponent;
};

export class ReactNodeView extends CoreNodeView {
    key: string = nanoid();
    component: NodeViewComponent;

    protected constructor(spec: ReactNodeViewSpec<ReactNodeView>) {
        const { component, ...rest } = spec;

        super(rest as CoreNodeViewSpec<CoreNodeView>);

        this.component = component;
    }

    #contentRef = (element: HTMLElement) => {
        if (element && this.contentDOM && element.firstChild !== this.contentDOM) {
            element.appendChild(this.contentDOM);
        }
    };

    #context: NodeViewContext = {
        contentRef: this.#contentRef,
    };

    render() {
        const UserComponent = this.component;

        UserComponent.displayName = 'ProsemirrorNodeView';

        const portal = createPortal(
            <nodeViewContext.Provider value={this.#context}>
                <UserComponent node={this.node} />
            </nodeViewContext.Provider>,
            this.dom,
            this.key,
        );

        return portal;
    }
}
