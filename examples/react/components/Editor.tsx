/* Copyright 2021, Prosemirror Adapter by Mirone. */
import './Editor.css'

import { useNodeViewFactory, usePluginViewFactory } from '@prosemirror-adapter/react'
import type { EditorView } from 'prosemirror-view'
import type { FC } from 'react'
import { useCallback, useRef } from 'react'

import { Plugin } from 'prosemirror-state'
import { createEditorView } from '../createEditorView'
import { Heading } from './Heading'
import { Paragraph } from './Paragraph'
import { Size } from './Size'

export const Editor: FC = () => {
  const viewRef = useRef<EditorView>()
  const nodeViewFactory = useNodeViewFactory()
  const pluginViewFactory = usePluginViewFactory()

  const editorRef = useCallback(
    (element: HTMLDivElement) => {
      if (!element)
        return

      if (element.firstChild)
        return

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
      ])
    },
    [nodeViewFactory, pluginViewFactory],
  )

  return <div className="editor" ref={editorRef} />
}
