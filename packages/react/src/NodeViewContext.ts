/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { Node } from 'prosemirror-model';
import { createContext } from 'react';

export type NodeViewContentRef = (node: HTMLElement | null) => void;

export type NodeViewContext = {
    node: Node;
    contentRef: NodeViewContentRef;
};

export const nodeViewContext = createContext<NodeViewContext>({
    node: null as never,
    contentRef: () => {
        // nothing to do
    },
});
