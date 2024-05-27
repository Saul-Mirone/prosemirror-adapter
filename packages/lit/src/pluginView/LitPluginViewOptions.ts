import type { CorePluginViewSpec, CorePluginViewUserOptions } from '@prosemirror-adapter/core'
import type { LitElement } from 'lit'

export type LitPluginViewComponent = typeof LitElement

export type LitPluginViewSpec = CorePluginViewSpec<LitPluginViewComponent>

export type LitPluginViewUserOptions = CorePluginViewUserOptions<LitPluginViewComponent>
