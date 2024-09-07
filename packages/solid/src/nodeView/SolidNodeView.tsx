import { CoreNodeView } from "@prosemirror-adapter/core";
import { nanoid } from "nanoid";
import { Portal } from "solid-js/web";

import type { SolidRenderer } from "../SolidRenderer";
import type { NodeViewContext } from "./nodeViewContext";
import { nodeViewContext } from "./nodeViewContext";
import type { SolidNodeViewComponent } from "./SolidNodeViewOptions";
import { hidePortalDiv } from "../utils/hidePortalDiv";

export class SolidNodeView
  extends CoreNodeView<SolidNodeViewComponent>
  implements SolidRenderer<NodeViewContext>
{
  key: string = nanoid();
  context: NodeViewContext = {
    contentRef: (element) => {
      if (element && this.contentDOM && element.firstChild !== this.contentDOM)
        element.appendChild(this.contentDOM);
    },
    view: this.view,
    getPos: this.getPos,
    setAttrs: this.setAttrs,
    node: this.node,
    selected: this.selected,
    decorations: this.decorations,
    innerDecorations: this.innerDecorations,
  };

  updateContext = () => {
    Object.assign(this.context, {
      node: this.node,
      selected: this.selected,
      decorations: this.decorations,
      innerDecorations: this.innerDecorations,
    });
  };

  render = () => {
    const UserComponent = this.component;

    return (
      <Portal mount={this.dom} ref={hidePortalDiv}>
        <nodeViewContext.Provider value={this.context}>
          <UserComponent />
        </nodeViewContext.Provider>
      </Portal>
    );
  };
}
