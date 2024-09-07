import type {
  CorePluginViewSpec,
  CorePluginViewUserOptions,
} from "@prosemirror-adapter/core";
import type { Component } from "solid-js";

export type SolidPluginViewComponent = Component<Record<string, never>>;

export type SolidPluginViewSpec = CorePluginViewSpec<SolidPluginViewComponent>;

export type SolidPluginViewUserOptions =
  CorePluginViewUserOptions<SolidPluginViewComponent>;
