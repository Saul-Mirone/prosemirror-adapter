/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { CoreNodeView } from '@prosemirror-adapter/core';
import { nanoid } from 'nanoid';
import React from 'react';
import { createPortal } from 'react-dom';

import { NodeViewContext, nodeViewContext } from './nodeViewContext';
import { ReactNodeViewComponent, ReactNodeViewSpec } from './ReactNodeViewOptions';

export function reactNodeViewFactory(spec: ReactNodeViewSpec) {
    const reactNodeView = new ReactNodeView(spec);
    const { setSelection, stopEvent } = spec.options;
    const overrideOptions = {
        setSelection,
        stopEvent,
    };

    Object.assign(reactNodeView, overrideOptions);

    return reactNodeView;
}

export class ReactNodeView extends CoreNodeView<ReactNodeViewComponent> {
    key: string = nanoid();

    context: NodeViewContext = {
        contentRef: (element) => {
            if (element && this.contentDOM && element.firstChild !== this.contentDOM) {
                element.appendChild(this.contentDOM);
            }
        },
        node: this.node,
        selected: this.selected,
    };

    updateContext = () => {
        Object.assign(this.context, {
            node: this.node,
            selected: this.selected,
        });
    };

    render = () => {
        const UserComponent = this.component;

        return createPortal(
            <nodeViewContext.Provider value={this.context}>
                <UserComponent />
            </nodeViewContext.Provider>,
            this.dom,
            this.key,
        );
    };
}
