/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { createContext } from 'react';

export type NodeViewContext = {
    contentRef: (element: HTMLElement) => void;
};

export const nodeViewContext = createContext<NodeViewContext>({
    contentRef: () => {
        // do nothing
    },
});
