/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { Attrs, Node } from 'prosemirror-model';
import type { Decoration, DecorationSource, EditorView } from 'prosemirror-view';
import type { InjectionKey, ShallowRef, VNodeRef } from 'vue';

export type NodeViewContext = {
    // won't change
    contentRef: VNodeRef;
    view: EditorView;
    getPos: () => number;
    setAttrs: (attrs: Attrs) => void;

    // changes between updates
    node: ShallowRef<Node>;
    selected: ShallowRef<boolean>;
    decorations: ShallowRef<readonly Decoration[]>;
    innerDecorations: ShallowRef<DecorationSource>;
};

export const nodeViewContext: InjectionKey<Readonly<NodeViewContext>> = Symbol();
