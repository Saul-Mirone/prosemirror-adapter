/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { CoreNodeViewSpec, CoreNodeViewUserOptions } from '@prosemirror-adapter/core'
import type { SvelteComponentConstructor } from '../types'

interface EmptyProps {}
export type SvelteNodeViewComponent = SvelteComponentConstructor<EmptyProps>

export type SvelteNodeViewSpec = CoreNodeViewSpec<SvelteNodeViewComponent>

export type SvelteNodeViewUserOptions = CoreNodeViewUserOptions<SvelteNodeViewComponent>
