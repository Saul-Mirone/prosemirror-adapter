import { useNodeViewContext } from '@prosemirror-adapter/react'

export function Heading() {
  const { contentRef, node } = useNodeViewContext()
  const Tag = `h${node.attrs.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  return <Tag ref={contentRef} />
}
