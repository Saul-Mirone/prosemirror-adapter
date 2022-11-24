/* Copyright 2021, Prosemirror Adapter by Mirone. */
import './Editor.css'

import { useNodeViewFactory, usePluginViewFactory, useWidgetViewFactory } from '@prosemirror-adapter/react'
import type { EditorView } from 'prosemirror-view'
import { DecorationSet } from 'prosemirror-view'
import type { FC } from 'react'
import { useCallback, useRef } from 'react'

import { Plugin } from 'prosemirror-state'
import { createEditorView } from '../../createEditorView'
import { Heading } from './Heading'
import { Paragraph } from './Paragraph'
import { Size } from './Size'
import { Hashes } from './Hashes'

export const Editor: FC = () => {
  const viewRef = useRef<EditorView>()
  const nodeViewFactory = useNodeViewFactory()
  const pluginViewFactory = usePluginViewFactory()
  const widgetViewFactory = useWidgetViewFactory()

  const editorRef = useCallback(
    (element: HTMLDivElement) => {
      if (!element)
        return

      if (element.firstChild)
        return

      const getHashWidget = widgetViewFactory({
        as: 'i',
        component: Hashes,
      })

      viewRef.current = createEditorView(element, {
        paragraph: nodeViewFactory({
          component: Paragraph,
          as: 'div',
          contentAs: 'p',
        }),
        heading: nodeViewFactory({
          component: Heading,
        }),
      }, [
        new Plugin({
          view: pluginViewFactory({
            component: Size,
          }),
        }),
        new Plugin({
          props: {
            decorations(state) {
              const { $from } = state.selection
              const node = $from.node()
              if (node.type.name !== 'heading')
                return DecorationSet.empty

              const widget = getHashWidget($from.before() + 1, {
                side: -1,
                level: node.attrs.level,
              })

              return DecorationSet.create(state.doc, [widget])
            },
          },
        }),
      ])
    },
    [nodeViewFactory, pluginViewFactory, widgetViewFactory],
  )

  return <div className="editor" ref={editorRef} />
}
