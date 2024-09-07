import type { NodeViewConstructor } from "prosemirror-view";
import type { SolidRendererResult } from "../SolidRenderer";
import { SolidNodeView } from "./SolidNodeView";
import type { SolidNodeViewUserOptions } from "./SolidNodeViewOptions";

export function useSolidNodeViewCreator(
  renderSolidRenderer: SolidRendererResult["renderSolidRenderer"],
  removeSolidRenderer: SolidRendererResult["removeSolidRenderer"]
) {
  const createSolidNodeView =
    (options: SolidNodeViewUserOptions): NodeViewConstructor =>
    (node, view, getPos, decorations, innerDecorations) => {
      const nodeView = new SolidNodeView({
        node,
        view,
        getPos,
        decorations,
        innerDecorations,
        options: {
          ...options,
          onUpdate() {
            options.onUpdate?.();
            renderSolidRenderer(nodeView);
          },
          selectNode() {
            options.selectNode?.();
            renderSolidRenderer(nodeView);
          },
          deselectNode() {
            options.deselectNode?.();
            renderSolidRenderer(nodeView);
          },
          destroy() {
            options.destroy?.();
            removeSolidRenderer(nodeView);
          },
        },
      });

      renderSolidRenderer(nodeView, false);

      return nodeView;
    };

  return createSolidNodeView;
}
