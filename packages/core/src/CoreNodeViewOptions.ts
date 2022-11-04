/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { Node } from 'prosemirror-model';
import type { Decoration, DecorationSource, EditorView } from 'prosemirror-view';

export type DOMSpec = string | HTMLElement | ((node: Node) => HTMLElement);

export type CoreNodeViewUserOptions<T> = {
    // DOM
    as?: DOMSpec;
    contentAs?: DOMSpec;

    // Events
    update?: (this: T, node: Node, decorations: readonly Decoration[], innerDecorations: DecorationSource) => boolean;
    selectNode?: (this: T) => void;
    deselectNode?: (this: T) => void;
    setSelection?: (this: T, anchor: number, head: number, root: Document | ShadowRoot) => void;
    stopEvent?: (this: T, event: Event) => boolean;
    ignoreMutation?: (this: T, mutation: MutationRecord) => boolean;
    destroy?: (this: T) => void;
};

export type CoreNodeViewSpec<T> = {
    node: Node;
    view: EditorView;
    getPos: () => number;
    decorations: readonly Decoration[];
    innerDecorations: DecorationSource;

    options: CoreNodeViewUserOptions<T>;
};
