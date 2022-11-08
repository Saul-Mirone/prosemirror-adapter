/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { Attrs, Node } from 'prosemirror-model';
import type { Decoration, DecorationSource, EditorView } from 'prosemirror-view';
import { createContext } from 'react';

export type NodeViewContentRef = (node: HTMLElement | null) => void;

export type NodeViewContext = {
    // won't change
    contentRef: NodeViewContentRef;
    view: EditorView;
    getPos: () => number;
    setAttrs: (attrs: Attrs) => void;

    // changes between updates
    node: Node;
    selected: boolean;
    decorations: readonly Decoration[];
    innerDecorations: DecorationSource;
};

export const nodeViewContext = createContext<NodeViewContext>({
    contentRef: () => {
        // nothing to do
    },
    view: null as never,
    getPos: () => 0,
    setAttrs: () => {
        // nothing to do
    },

    node: null as never,
    selected: false,
    decorations: [],
    innerDecorations: null as never,
});
