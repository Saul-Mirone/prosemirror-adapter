/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type { CorePluginViewSpec, CorePluginViewUserOptions } from '@prosemirror-adapter/core'
import type { DefineComponent } from 'vue'

export type VuePluginViewComponent = DefineComponent<any, any, any>

export type VuePluginViewSpec = CorePluginViewSpec<VuePluginViewComponent>

export type VuePluginViewUserOptions = CorePluginViewUserOptions<VuePluginViewComponent>
