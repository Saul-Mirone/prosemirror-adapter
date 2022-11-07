/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { Node } from 'prosemirror-model';
import { InjectionKey, VNodeRef } from 'vue';

export type NodeViewContext = {
    contentRef: VNodeRef;
    node: Node;
};

export const nodeViewContext: InjectionKey<NodeViewContext> = Symbol();
