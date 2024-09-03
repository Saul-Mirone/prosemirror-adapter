import { useWidgetViewContext } from '@prosemirror-adapter/react'

export function Hashes() {
  const { spec } = useWidgetViewContext()
  const level = spec?.level
  const hashes = new Array(level || 0).fill('#').join('')

  return <span style={{ color: 'blue', marginRight: 6 }}>{hashes}</span>
}
