import type {
  WidgetDecorationFactory,
  WidgetDecorationSpec,
} from "@prosemirror-adapter/core";
import type { EditorView } from "prosemirror-view";
import { createContext, useContext } from "solid-js";
import type { SolidWidgetViewUserOptions } from "./SolidWidgetViewOptions";

export interface WidgetViewContext {
  view: EditorView;
  getPos: () => number | undefined;
  spec?: WidgetDecorationSpec;
}

export const widgetViewContext = createContext<WidgetViewContext>({
  view: null as never,
  getPos: () => undefined,
});

export const useWidgetViewContext = () => useContext(widgetViewContext);

export const createWidgetViewContext = createContext<
  (options: SolidWidgetViewUserOptions) => WidgetDecorationFactory
>((_options) => {
  throw new Error("out of scope");
});

export const useWidgetViewFactory = () => useContext(createWidgetViewContext);
