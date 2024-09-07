import { CoreWidgetView } from "@prosemirror-adapter/core";
import { nanoid } from "nanoid";
import { Portal } from "solid-js/web";
import type { JSX } from "solid-js";

import type { SolidRenderer } from "../SolidRenderer";
import type { SolidWidgetViewComponent } from "./SolidWidgetViewOptions";
import type { WidgetViewContext } from "./widgetViewContext";
import { widgetViewContext } from "./widgetViewContext";
import { hidePortalDiv } from "../utils/hidePortalDiv";
export class SolidWidgetView
  extends CoreWidgetView<SolidWidgetViewComponent>
  implements SolidRenderer<WidgetViewContext>
{
  key: string = nanoid();

  context: WidgetViewContext = {
    view: this.view!,
    getPos: this.getPos!,
    spec: this.spec,
  };

  updateContext = () => {
    Object.assign(this.context, {
      view: this.view,
      getPos: this.getPos,
      spec: this.spec,
    });
  };

  render = (): JSX.Element => {
    const UserComponent = this.component;

    return (
      <Portal mount={this.dom} ref={hidePortalDiv}>
        <widgetViewContext.Provider value={this.context}>
          <UserComponent />
        </widgetViewContext.Provider>
      </Portal>
    );
  };
}
