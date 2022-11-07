/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { Node } from 'prosemirror-model';
import { createContext } from 'react';

export type NodeViewContentRef = (node: HTMLElement | null) => void;

export type NodeViewContext = {
    node: Node;
    contentRef: NodeViewContentRef;
};

export const nodeViewContext = createContext<NodeViewContext>({
    node: new Node(),
    contentRef: () => {
        // nothing to do
    },
});
