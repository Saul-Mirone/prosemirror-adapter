/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { Node } from 'prosemirror-model';
import type { Decoration, DecorationSource, EditorView, NodeView } from 'prosemirror-view';

import type { CoreNodeViewSpec, CoreNodeViewUserOptions } from './CoreNodeViewOptions';

export function coreNodeViewFactory<ComponentType>(spec: CoreNodeViewSpec<CoreNodeView<ComponentType>, ComponentType>) {
    const coreNodeView = new CoreNodeView(spec);
    const userOptions = spec.options;
    const overrideOptions = {
        setSelection: userOptions.setSelection?.bind(coreNodeView),
        stopEvent: userOptions.stopEvent?.bind(coreNodeView),
        selectNode: userOptions.selectNode?.bind(coreNodeView),
        deselectNode: userOptions.deselectNode?.bind(coreNodeView),
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
    options: CoreNodeViewUserOptions<CoreNodeView<ComponentType>, ComponentType>;

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

    constructor({
        node,
        view,
        getPos,
        decorations,
        innerDecorations,
        options,
    }: CoreNodeViewSpec<never, ComponentType>) {
        this.node = node;
        this.view = view;
        this.getPos = getPos;
        this.decorations = decorations;
        this.innerDecorations = innerDecorations;
        this.options = options as CoreNodeViewUserOptions<CoreNodeView<ComponentType>, ComponentType>;

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

    shouldUpdate: (node: Node) => boolean = (node) => {
        if (node.type !== this.node.type) {
            return false;
        }

        if (!this.contentDOM && !node.isLeaf) {
            return false;
        }

        if (!node.sameMarkup(this.node)) {
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
            result = userUpdate.call(this, node, decorations, innerDecorations);
        }

        if (typeof result !== 'boolean') {
            result = this.shouldUpdate(node);
        }

        this.node = node;
        this.decorations = decorations;
        this.innerDecorations = innerDecorations;

        return result;
    };

    destroy: () => void = () => {
        this.options.destroy?.call(this);
        this.dom.remove();
        this.contentDOM?.remove();
    };

    ignoreMutation: (mutation: MutationRecord) => boolean = (mutation) => {
        if (!this.dom || !this.contentDOM) {
            return true;
        }

        const userIgnoreMutation = this.options.ignoreMutation;

        if (userIgnoreMutation) {
            return userIgnoreMutation.call(this, mutation);
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
}
