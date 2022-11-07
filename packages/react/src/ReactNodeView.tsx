/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { CoreNodeView } from '@prosemirror-adapter/core';
import { customAlphabet } from 'nanoid';
import { createPortal } from 'react-dom';

import { NodeViewContext, nodeViewContext } from './nodeViewContext';
import { ReactNodeViewComponent, ReactNodeViewSpec } from './ReactNodeViewOptions';

const nanoid = customAlphabet('abcedfghicklmn', 10);

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

export class ReactNodeView extends CoreNodeView<ReactNodeViewComponent> {
    key: string = nanoid();

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
                <UserComponent />
            </nodeViewContext.Provider>,
            this.dom,
            this.key,
        );
    };
}
