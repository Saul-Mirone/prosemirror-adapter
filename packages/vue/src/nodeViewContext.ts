/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { Node } from 'prosemirror-model';
import type { Decoration, DecorationSource, EditorView } from 'prosemirror-view';
import type { InjectionKey, Ref, ShallowRef, VNodeRef } from 'vue';

export type NodeViewContext = {
    // won't change
    contentRef: VNodeRef;
    view: EditorView;
    getPos: () => number;

    // changes between updates
    node: ShallowRef<Node>;
    selected: Ref<boolean>;
    decorations: ShallowRef<readonly Decoration[]>;
    innerDecorations: ShallowRef<DecorationSource>;
};

export type UnRefedContext = {
    [P in keyof NodeViewContext]: NodeViewContext[P] extends Ref<infer T> ? T : NodeViewContext[P];
};

export const nodeViewContext: InjectionKey<Readonly<NodeViewContext>> = Symbol();
