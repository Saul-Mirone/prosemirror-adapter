import { useMarkViewContext } from '@prosemirror-adapter/react'
import { useEffect, useState } from 'react'

const linkCounter: Record<string, number> = {}
const linkListeners: Record<string, Set<VoidFunction>> = {}

function increaseLinkCount(link: string) {
  linkCounter[link] ||= 0
  linkCounter[link] += 1
  linkListeners[link]?.forEach(fn => fn())
}

function addLinkListener(link: string, fn: VoidFunction): VoidFunction {
  linkListeners[link] ||= new Set()
  linkListeners[link].add(fn)
  return () => linkListeners[link]?.delete(fn)
}

export function Link() {
  const { contentRef, mark } = useMarkViewContext()
  const [count, setCount] = useState(0)

  const href = mark.attrs.href as string

  useEffect(() => {
    const dispose = addLinkListener(href, () => {
      setCount(linkCounter[href] || 0)
    })
    return dispose
  }, [href])

  // Simulate link count increasement
  useEffect(() => {
    const id = setInterval(() => {
      increaseLinkCount(href)
    }, Math.round(Math.random() * 2000 + 1000))
    return () => clearInterval(id)
  }, [href])

  return (
    <a
      href={href}
    >
      <span
        ref={contentRef}
      >
      </span>
      <span>
        {count}
      </span>
    </a>
  )
}
