/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { CoreNodeViewSpec, CoreNodeViewUserOptions } from '@prosemirror-adapter/core'
import type { LitElement } from 'lit'

export type LitNodeViewComponent = typeof LitElement
export type LitNodeViewSpec = CoreNodeViewSpec<LitNodeViewComponent>
export type LitNodeViewUserOptions = CoreNodeViewUserOptions<LitNodeViewComponent>
