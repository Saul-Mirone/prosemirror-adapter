/* Copyright 2021, Prosemirror Adapter by Mirone. */
import './Editor.css';

import { ReactNodeView, reactNodeViewFactory, ReactNodeViewUserOptions } from '@prosemirror-adapter/react';
import { EditorView, NodeViewConstructor } from 'prosemirror-view';
import { FC, ReactPortal, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { Paragraph } from './Paragraph';
import { createEditorView } from './prosemirror';

export const Editor: FC = () => {
    const viewRef = useRef<EditorView>();
    const [portals, setPortals] = useState<Record<string, ReactPortal>>({});

    const mountedRef = useRef(false);

    useLayoutEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const maybeFlushSync = useCallback((fn: () => void) => {
        if (mountedRef.current) {
            flushSync(fn);
        } else {
            fn();
        }
    }, []);

    const renderNodeView = useCallback(
        (nodeView: ReactNodeView) => {
            maybeFlushSync(() => {
                setPortals((prev) => ({
                    ...prev,
                    [nodeView.key]: nodeView.render(),
                }));
            });
        },
        [maybeFlushSync],
    );

    const removeNodeView = useCallback(
        (nodeView: ReactNodeView) => {
            maybeFlushSync(() => {
                setPortals((prev) => {
                    const { [nodeView.key]: _, ...rest } = prev;

                    return rest;
                });
            });
        },
        [maybeFlushSync],
    );

    const createReactNodeView: (options: ReactNodeViewUserOptions) => NodeViewConstructor = useCallback(
        (options) => (node, view, getPos, decorations, innerDecorations) => {
            const nodeView = reactNodeViewFactory({
                node,
                view,
                getPos,
                decorations,
                innerDecorations,
                options: {
                    ...options,
                    update(node, ...args) {
                        let shouldUpdate = options.update?.(node, ...args);

                        if (typeof shouldUpdate === 'boolean') {
                            shouldUpdate = nodeView.shouldUpdate(node);
                        }

                        if (shouldUpdate) {
                            renderNodeView(nodeView);
                        }
                        return shouldUpdate;
                    },
                    destroy() {
                        options.destroy?.();
                        removeNodeView(nodeView);
                    },
                },
            });

            renderNodeView(nodeView);

            return nodeView;
        },
        [removeNodeView, renderNodeView],
    );

    const editorRef = useCallback(
        (element: HTMLDivElement) => {
            if (!element) return;

            if (element.firstChild) return;

            viewRef.current = createEditorView(element, {
                paragraph: createReactNodeView({
                    component: Paragraph,
                    as: 'div',
                    contentAs: 'p',
                }),
            });
        },
        [createReactNodeView],
    );

    return (
        <>
            <div className="editor" ref={editorRef} />
            {Object.values(portals)}
        </>
    );
};
