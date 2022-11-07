/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type { NodeViewConstructor } from 'prosemirror-view';
import React, {
    createContext,
    FC,
    ReactNode,
    ReactPortal,
    useCallback,
    useContext,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { flushSync } from 'react-dom';

import { ReactNodeView, reactNodeViewFactory } from './ReactNodeView';
import { ReactNodeViewUserOptions } from './ReactNodeViewOptions';

export const createNodeViewContext = createContext<(options: ReactNodeViewUserOptions) => NodeViewConstructor>(() => {
    throw new Error('out of scope');
});
export const useNodeViewFactory = () => useContext(createNodeViewContext);

export const ProsemirrorAdapterProvider: FC<{ children: ReactNode }> = ({ children }) => {
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

    const createReactNodeView = useCallback(
        (options: ReactNodeViewUserOptions): NodeViewConstructor =>
            (node, view, getPos, decorations, innerDecorations) => {
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

    const memoizedPortals = useMemo(() => Object.values(portals), [portals]);

    return (
        <createNodeViewContext.Provider value={createReactNodeView}>
            <>
                {children}
                {memoizedPortals}
            </>
        </createNodeViewContext.Provider>
    );
};
