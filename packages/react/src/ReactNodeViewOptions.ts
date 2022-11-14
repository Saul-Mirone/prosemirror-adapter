/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type { CoreNodeViewSpec, CoreNodeViewUserOptions } from '@prosemirror-adapter/core'
import type { ComponentType } from 'react'

export type ReactNodeViewComponent = ComponentType<Record<string, never>>

export type ReactNodeViewSpec = CoreNodeViewSpec<ReactNodeViewComponent>

export type ReactNodeViewUserOptions = CoreNodeViewUserOptions<ReactNodeViewComponent>
