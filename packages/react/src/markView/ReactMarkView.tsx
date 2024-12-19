import type { ReactRenderer } from '../ReactRenderer'
import type { MarkViewContext } from './markViewContext'
import type { ReactMarkViewComponent } from './ReactMarkViewOptions'
import { CoreMarkView } from '@prosemirror-adapter/core'

import { nanoid } from 'nanoid'
import React from 'react'
import { createPortal } from 'react-dom'
import { markViewContext } from './markViewContext'

export class ReactMarkView
  extends CoreMarkView<ReactMarkViewComponent>
  implements ReactRenderer<MarkViewContext> {
  key: string = nanoid()

  context: MarkViewContext = {
    contentRef: (element) => {
      if (element && this.contentDOM && element.firstChild !== this.contentDOM)
        element.appendChild(this.contentDOM)
    },
    view: this.view,

    mark: this.mark,
  }

  updateContext = () => {
    Object.assign(this.context, {
      mark: this.mark,
    })
  }

  render = () => {
    const UserComponent = this.component

    return createPortal(
      <markViewContext.Provider value={this.context}>
        <UserComponent />
      </markViewContext.Provider>,
      this.dom,
      this.key,
    )
  }
}
