import { usePluginViewContext } from '@prosemirror-adapter/react'

export function Size() {
  const { view } = usePluginViewContext()
  const size = view.state.doc.nodeSize
  console.log('render')
  return (
    <div>
      Size for document:
      {size}
    </div>
  )
}
