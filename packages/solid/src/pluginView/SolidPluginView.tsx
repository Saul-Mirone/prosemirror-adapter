import { CorePluginView } from "@prosemirror-adapter/core";
import { nanoid } from "nanoid";
import { JSX } from "solid-js";
import { Portal } from "solid-js/web";
import type { SolidRenderer } from "../SolidRenderer";
import type { PluginViewContext } from "./pluginViewContext";
import { pluginViewContext } from "./pluginViewContext";
import type { SolidPluginViewComponent } from "./SolidPluginViewOptions";
import { hidePortalDiv } from "../utils/hidePortalDiv";

export class SolidPluginView
  extends CorePluginView<SolidPluginViewComponent>
  implements SolidRenderer<PluginViewContext>
{
  key: string = nanoid();

  context: PluginViewContext = {
    view: this.view,
    prevState: this.prevState,
  };

  updateContext = () => {
    Object.assign(this.context, {
      view: this.view,
      prevState: this.prevState,
    });
  };

  render = (): JSX.Element => {
    const UserComponent = this.component;

    return (
      <Portal mount={this.root} ref={hidePortalDiv}>
        <pluginViewContext.Provider value={this.context}>
          <UserComponent />
        </pluginViewContext.Provider>
      </Portal>
    );
  };
}
