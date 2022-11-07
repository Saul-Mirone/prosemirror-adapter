/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { Node } from 'prosemirror-model';
import type { Decoration, DecorationSource, EditorView } from 'prosemirror-view';

export type DOMSpec = string | HTMLElement | ((node: Node) => HTMLElement);

export type CoreNodeViewUserOptions<Instance, Component> = {
    // DOM
    as?: DOMSpec;
    contentAs?: DOMSpec;

    // Component
    component: Component;

    // Overrides
    update?: (
        this: Instance,
        node: Node,
        decorations: readonly Decoration[],
        innerDecorations: DecorationSource,
    ) => boolean | void;
    selectNode?: (this: Instance) => void;
    deselectNode?: (this: Instance) => void;
    setSelection?: (this: Instance, anchor: number, head: number, root: Document | ShadowRoot) => void;
    stopEvent?: (this: Instance, event: Event) => boolean;
    ignoreMutation?: (this: Instance, mutation: MutationRecord) => boolean;
    destroy?: (this: Instance) => void;
};

export type CoreNodeViewSpec<Instance, Component> = {
    node: Node;
    view: EditorView;
    getPos: () => number;
    decorations: readonly Decoration[];
    innerDecorations: DecorationSource;

    options: CoreNodeViewUserOptions<Instance, Component>;
};
