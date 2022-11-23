/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { useWidgetViewContext } from '@prosemirror-adapter/react'

export const Hashes = () => {
  const { view } = useWidgetViewContext()
  const $from = view.state.selection.$from
  const node = $from.node()
  const level = node.attrs.level
  const hashes = Array(level || 0)
    .fill(0)
    .map(_ => '#')
    .join('')

  return <span style={{ color: 'blue' }}>{hashes}  </span>
}
