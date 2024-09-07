import type {
  CoreNodeViewSpec,
  CoreNodeViewUserOptions,
} from "@prosemirror-adapter/core";
import type { Component } from "solid-js";

export type SolidNodeViewComponent = Component;

export type SolidNodeViewSpec = CoreNodeViewSpec<SolidNodeViewComponent>;

export type SolidNodeViewUserOptions =
  CoreNodeViewUserOptions<SolidNodeViewComponent>;
