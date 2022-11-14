/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { CoreNodeViewSpec, CoreNodeViewUserOptions } from '@prosemirror-adapter/core'
import type { DefineComponent } from 'vue'

export type VueNodeViewComponent = DefineComponent<any, any, any>

export type VueNodeViewSpec = CoreNodeViewSpec<VueNodeViewComponent>

export type VueNodeViewUserOptions = CoreNodeViewUserOptions<VueNodeViewComponent>
