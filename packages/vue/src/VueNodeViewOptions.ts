/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { CoreNodeViewSpec, CoreNodeViewUserOptions } from '@prosemirror-adapter/core';
import { DefineComponent } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VueNodeViewComponent = DefineComponent<any, any, any>;

export type VueNodeViewSpec = CoreNodeViewSpec<VueNodeViewComponent>;

export type VueNodeViewUserOptions = CoreNodeViewUserOptions<VueNodeViewComponent>;
