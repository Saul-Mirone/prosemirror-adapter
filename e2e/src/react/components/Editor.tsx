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
import { Tooltip } from './Tooltip'
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

      const hashWidgetFactory = widgetViewFactory({
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
            component: Tooltip,
          }),
        }),
        new Plugin<DecorationSet>({
          state: {
            init() { return DecorationSet.empty },
            apply(tr) {
              const { $from } = tr.selection
              const node = $from.node()
              if (node.type.name !== 'heading')
                return DecorationSet.empty

              const widget = hashWidgetFactory($from.before() + 1, {
                side: -1,
              })

              return DecorationSet.create(tr.doc, [widget])
            },
          },
          props: {
            decorations(state) {
              return this.getState(state)
            },
          },
        }),
      ])
    },
    [nodeViewFactory, pluginViewFactory, widgetViewFactory],
  )

  return <div className="editor" ref={editorRef} />
}
