import type {
  CoreWidgetViewSpec,
  CoreWidgetViewUserOptions,
} from "@prosemirror-adapter/core";
import type { Component } from "solid-js";

export type SolidWidgetViewComponent = Component<Record<string, never>>;

export type SolidWidgetViewSpec = CoreWidgetViewSpec<SolidWidgetViewComponent>;

export type SolidWidgetViewUserOptions =
  CoreWidgetViewUserOptions<SolidWidgetViewComponent>;
