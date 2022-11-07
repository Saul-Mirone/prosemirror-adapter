/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { InjectionKey, VNodeRef } from 'vue';

export type NodeViewContext = {
    contentRef: VNodeRef;
};

export const nodeViewContext: InjectionKey<NodeViewContext> = Symbol();
