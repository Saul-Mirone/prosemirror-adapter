/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { Node } from 'prosemirror-model';
import type { Decoration, DecorationSource, EditorView, NodeView } from 'prosemirror-view';

import type { CoreNodeViewSpec, CoreNodeViewUserOptions } from './CoreNodeViewOptions';

export function coreNodeViewFactory<ComponentType = unknown>(spec: CoreNodeViewSpec<ComponentType>) {
    const coreNodeView = new CoreNodeView(spec);
    const { setSelection, stopEvent } = spec.options;
    const overrideOptions = {
        setSelection,
        stopEvent,
    };

    Object.assign(coreNodeView, overrideOptions);

    return coreNodeView;
}

export class CoreNodeView<ComponentType> implements NodeView {
    dom: HTMLElement;
    contentDOM: HTMLElement | null;
    node: Node;
    view: EditorView;
    getPos: () => number;
    decorations: readonly Decoration[];
    innerDecorations: DecorationSource;
    options: CoreNodeViewUserOptions<ComponentType>;
    selected = false;

    #createElement(as?: string | HTMLElement | ((node: Node) => HTMLElement)) {
        const { node } = this;
        return as == null
            ? document.createElement(node.isInline ? 'span' : 'div')
            : as instanceof HTMLElement
            ? as
            : as instanceof Function
            ? as(node)
            : document.createElement(as);
    }

    constructor({ node, view, getPos, decorations, innerDecorations, options }: CoreNodeViewSpec<ComponentType>) {
        this.node = node;
        this.view = view;
        this.getPos = getPos;
        this.decorations = decorations;
        this.innerDecorations = innerDecorations;
        this.options = options;

        this.dom = this.#createElement(options.as);
        this.contentDOM = node.isLeaf ? null : this.#createElement(options.contentAs);
        this.dom.setAttribute('data-node-view-root', 'true');
        if (this.contentDOM) {
            this.contentDOM.setAttribute('data-node-view-content', 'true');
            this.contentDOM.style.whiteSpace = 'inherit';
        }
    }

    get component() {
        return this.options.component;
    }

    selectNode = () => {
        this.selected = true;
        this.options.selectNode?.();
    };

    deselectNode = () => {
        this.selected = false;
        this.options.deselectNode?.();
    };

    shouldUpdate: (node: Node) => boolean = (node) => {
        if (node.type !== this.node.type) {
            return false;
        }

        if (node.sameMarkup(this.node)) {
            return false;
        }

        return true;
    };

    update: (node: Node, decorations: readonly Decoration[], innerDecorations: DecorationSource) => boolean = (
        node,
        decorations,
        innerDecorations,
    ) => {
        const userUpdate = this.options.update;
        let result;
        if (userUpdate) {
            result = userUpdate(node, decorations, innerDecorations);
        }

        if (typeof result !== 'boolean') {
            result = this.shouldUpdate(node);
        }

        this.node = node;
        this.decorations = decorations;
        this.innerDecorations = innerDecorations;

        if (result) {
            this.options.onUpdate?.();
        }

        return result;
    };

    shouldIgnoreMutation: (mutation: MutationRecord) => boolean = (mutation) => {
        if (!this.dom || !this.contentDOM) {
            return true;
        }

        if (this.node.isLeaf || this.node.isAtom) {
            return true;
        }

        if ((mutation.type as unknown) === 'selection') {
            return false;
        }

        if (this.contentDOM === mutation.target && mutation.type === 'attributes') {
            return true;
        }

        if (this.contentDOM.contains(mutation.target)) {
            return false;
        }

        return true;
    };

    ignoreMutation: (mutation: MutationRecord) => boolean = (mutation) => {
        if (!this.dom || !this.contentDOM) {
            return true;
        }

        let result;

        const userIgnoreMutation = this.options.ignoreMutation;

        if (userIgnoreMutation) {
            result = userIgnoreMutation(mutation);
        }

        if (typeof result !== 'boolean') {
            result = this.shouldIgnoreMutation(mutation);
        }

        return result;
    };

    destroy: () => void = () => {
        this.options.destroy?.();
        this.dom.remove();
        this.contentDOM?.remove();
    };
}
