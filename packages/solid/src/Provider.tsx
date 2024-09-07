import { createNodeViewContext } from "./nodeView";
import { Component, ParentProps, createMemo } from "solid-js";
import { useSolidNodeViewCreator } from "./nodeView/useSolidNodeViewCreator";
import { useSolidRenderer } from "./SolidRenderer";
import { useSolidWidgetViewCreator } from "./widgetView/useSolidWidgetViewCreator";
import { createWidgetViewContext } from "./widgetView";
import { createPluginViewContext } from "./pluginView";
import { useSolidPluginViewCreator } from "./pluginView/useSolidPluginViewCreator";

export const ProsemirrorAdapterProvider: Component<ParentProps> = (props) => {
  const { renderSolidRenderer, removeSolidRenderer, portals } =
    useSolidRenderer();

  const createSolidNodeView = useSolidNodeViewCreator(
    renderSolidRenderer,
    removeSolidRenderer
  );

  const createSolidWidgetView = useSolidWidgetViewCreator(
    renderSolidRenderer,
    removeSolidRenderer
  );

  const createSolidPluginView = useSolidPluginViewCreator(
    renderSolidRenderer,
    removeSolidRenderer
  );

  const memoizedPortals = createMemo(() => Object.values(portals));

  return (
    <createNodeViewContext.Provider value={createSolidNodeView}>
      <createWidgetViewContext.Provider value={createSolidWidgetView}>
        <createPluginViewContext.Provider value={createSolidPluginView}>
        {props.children}
        {memoizedPortals()}
        </createPluginViewContext.Provider>
      </createWidgetViewContext.Provider>
    </createNodeViewContext.Provider>
  );
};
