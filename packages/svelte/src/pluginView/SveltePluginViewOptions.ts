/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type { CorePluginViewSpec, CorePluginViewUserOptions } from '@prosemirror-adapter/core'
import type { SvelteComponentConstructor } from '../types'

interface EmptyProps {}
export type SveltePluginViewComponent = SvelteComponentConstructor<EmptyProps>

export type SveltePluginViewSpec = CorePluginViewSpec<SveltePluginViewComponent>

export type SveltePluginViewUserOptions = CorePluginViewUserOptions<SveltePluginViewComponent>
