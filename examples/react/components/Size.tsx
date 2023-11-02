/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { usePluginViewContext } from '@prosemirror-adapter/react'

export function Size() {
  const { view } = usePluginViewContext()
  const size = view.state.doc.nodeSize
  return (
    <div>
      Size for document:
      {size}
    </div>
  )
}
