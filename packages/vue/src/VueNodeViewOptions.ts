/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { CoreNodeViewSpec } from '@prosemirror-adapter/core';
import { DefineComponent } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VueNodeViewComponent = DefineComponent<any, any, any>;

export type VueNodeViewSpec<T> = CoreNodeViewSpec<T, VueNodeViewComponent>;
