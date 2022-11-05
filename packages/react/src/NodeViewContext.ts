/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { createContext } from 'react';

export type NodeViewContentRef = (node: HTMLElement | null) => void;

export type NodeViewContext = {
    contentRef: NodeViewContentRef;
};

export const nodeViewContext = createContext<NodeViewContext>({
    contentRef: () => {
        // nothing to do
    },
});
