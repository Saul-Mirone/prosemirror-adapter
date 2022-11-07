/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { Node } from 'prosemirror-model';
import { InjectionKey, Ref, VNodeRef } from 'vue';

export type NodeViewContext = {
    contentRef: VNodeRef;
    node: Ref<Node>;
};

export type UnRefedContext = {
    [P in keyof NodeViewContext]: NodeViewContext[P] extends Ref<infer T> ? T : NodeViewContext[P];
};

export const nodeViewContext: InjectionKey<Readonly<NodeViewContext>> = Symbol();
