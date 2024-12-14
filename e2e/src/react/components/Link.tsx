import { useMarkViewContext } from '@prosemirror-adapter/react'
import { useState } from 'react'

export function Link() {
  const { contentRef, mark } = useMarkViewContext()
  const [count, setCount] = useState(0)

  const href = mark.attrs.href as string

  return (
    <span
      onPointerEnter={() => setCount(count => count + 1)}
      style={{
        // @ts-expect-error: CSS custom properties are not typed
        '--hover-count': JSON.stringify(String(count)),
      }}
      className="link-with-hover-count"
    >
      <a href={href} ref={contentRef}></a>
    </span>
  )
}
