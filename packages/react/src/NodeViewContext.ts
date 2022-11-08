/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { Node } from 'prosemirror-model';
import { createContext } from 'react';

export type NodeViewContentRef = (node: HTMLElement | null) => void;

export type NodeViewContext = {
    contentRef: NodeViewContentRef;
    node: Node;
    selected: boolean;
};

export const nodeViewContext = createContext<NodeViewContext>({
    contentRef: () => {
        // nothing to do
    },
    node: null as never,
    selected: false,
});
