/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type { NodeViewConstructor } from 'prosemirror-view'
import type {
  FC,
  ReactNode,
  ReactPortal,
} from 'react'
import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { flushSync } from 'react-dom'

import type { ReactNodeView } from './ReactNodeView'
import { reactNodeViewFactory } from './ReactNodeView'
import type { ReactNodeViewUserOptions } from './ReactNodeViewOptions'

export const createNodeViewContext = createContext<(options: ReactNodeViewUserOptions) => NodeViewConstructor>(
  (_options) => {
    throw new Error('out of scope')
  },
)
export const useNodeViewFactory = () => useContext(createNodeViewContext)

export const ProsemirrorAdapterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [portals, setPortals] = useState<Record<string, ReactPortal>>({})
  const mountedRef = useRef(false)

  useLayoutEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const maybeFlushSync = useCallback((fn: () => void) => {
    if (mountedRef.current)
      flushSync(fn)
    else
      fn()
  }, [])

  const renderNodeView = useCallback(
    (nodeView: ReactNodeView, update = true) => {
      maybeFlushSync(() => {
        if (update)
          nodeView.updateContext()

        setPortals(prev => ({
          ...prev,
          [nodeView.key]: nodeView.render(),
        }))
      })
    },
    [maybeFlushSync],
  )

  const removeNodeView = useCallback(
    (nodeView: ReactNodeView) => {
      maybeFlushSync(() => {
        setPortals((prev) => {
          const { [nodeView.key]: _, ...rest } = prev

          return rest
        })
      })
    },
    [maybeFlushSync],
  )

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
            onUpdate() {
              options.onUpdate?.()
              renderNodeView(nodeView)
            },
            selectNode() {
              renderNodeView(nodeView)
            },
            deselectNode() {
              renderNodeView(nodeView)
            },
            destroy() {
              options.destroy?.()
              removeNodeView(nodeView)
            },
          },
        })

        renderNodeView(nodeView, false)

        return nodeView
      },
    [removeNodeView, renderNodeView],
  )

  const memoizedPortals = useMemo(() => Object.values(portals), [portals])

  return (
        <createNodeViewContext.Provider value={createReactNodeView}>
            <>
                {children}
                {memoizedPortals}
            </>
        </createNodeViewContext.Provider>
  )
}
