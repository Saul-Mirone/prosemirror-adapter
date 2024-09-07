import type { PluginViewSpec } from "@prosemirror-adapter/core";
import type { EditorState } from "prosemirror-state";
import type { EditorView } from "prosemirror-view";
import { createContext, useContext } from "solid-js";
import type { SolidPluginViewUserOptions } from "./SolidPluginViewOptions";

export type PluginViewContentRef = (node: HTMLElement | null) => void;

export interface PluginViewContext {
  view: EditorView;
  prevState?: EditorState;
}

export const pluginViewContext = createContext<PluginViewContext>({
  view: null as never,
});

export const usePluginViewContext = () => useContext(pluginViewContext);

export const createPluginViewContext = createContext<
  (options: SolidPluginViewUserOptions) => PluginViewSpec
>((_options) => {
  throw new Error("out of scope");
});

export const usePluginViewFactory = () => useContext(createPluginViewContext);
