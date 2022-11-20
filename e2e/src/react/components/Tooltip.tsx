/* Copyright 2021, Prosemirror Adapter by Mirone. */

import { usePluginViewContext } from '@prosemirror-adapter/react'
import { useRef } from 'react'

export const Tooltip = () => {
  const { view } = usePluginViewContext()
  const divRef = useRef<HTMLDivElement>(null)

  const { from, to } = view.state.selection

  const start = view.coordsAtPos(from)
  const end = view.coordsAtPos(to)
  const box = divRef.current?.offsetParent?.getBoundingClientRect()
  const left = Math.max((start.left + end.left) / 2, start.left + 3)

  const x = (left - (box?.left || 0))
  const y = (((box?.bottom || 0) - start.top))

  return (
    <div style={{ position: 'absolute', left: x, bottom: y, border: '1px solid', padding: 4, background: 'grey' }} ref={divRef}>{to - from}</div>
  )
}
