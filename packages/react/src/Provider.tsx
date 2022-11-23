/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type {
  FC,
  ReactNode,
} from 'react'
import React, { useMemo } from 'react'
import { createNodeViewContext } from './nodeView'
import { createPluginViewContext } from './pluginView/pluginViewContext'

import { useReactNodeViewCreator } from './nodeView/useReactNodeViewCreator'
import { useReactPluginViewCreator } from './pluginView/useReactPluginViewCreator'
import { useReactRenderer } from './ReactRenderer'
import { createWidgetViewContext } from './widgetView'
import { useReactWidgetViewCreator } from './widgetView/useReactWidgetViewCreator'

export const ProsemirrorAdapterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { renderReactRenderer, removeReactRenderer, portals } = useReactRenderer()

  const createReactNodeView = useReactNodeViewCreator(renderReactRenderer, removeReactRenderer)
  const createReactPluginView = useReactPluginViewCreator(renderReactRenderer, removeReactRenderer)
  const createReactWidgetView = useReactWidgetViewCreator(renderReactRenderer, removeReactRenderer)

  const memoizedPortals = useMemo(() => Object.values(portals), [portals])

  return (
    <createNodeViewContext.Provider value={createReactNodeView}>
      <createPluginViewContext.Provider value={createReactPluginView}>
        <createWidgetViewContext.Provider value={createReactWidgetView}>
          {children}
          {memoizedPortals}
        </createWidgetViewContext.Provider>
      </createPluginViewContext.Provider>
    </createNodeViewContext.Provider>
  )
}
