/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type { CorePluginViewSpec, CorePluginViewUserOptions } from '@prosemirror-adapter/core'
import type { ComponentType } from 'react'

export type ReactPluginViewComponent = ComponentType<Record<string, never>>

export type ReactPluginViewSpec = CorePluginViewSpec<ReactPluginViewComponent>

export type ReactPluginViewUserOptions = CorePluginViewUserOptions<ReactPluginViewComponent>
