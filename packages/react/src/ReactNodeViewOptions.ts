/* Copyright 2021, Prosemirror Adapter by Mirone. */

import { CoreNodeViewSpec } from '@prosemirror-adapter/core';
import { ComponentType } from 'react';

export type ReactNodeViewComponent = ComponentType<Record<string, never>>;

export type ReactNodeViewSpec<T> = CoreNodeViewSpec<T, ReactNodeViewComponent>;
