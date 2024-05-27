import type { CoreWidgetViewSpec, CoreWidgetViewUserOptions } from '@prosemirror-adapter/core'
import type { LitElement } from 'lit'

export type LitWidgetViewComponent = typeof LitElement

export type LitWidgetViewSpec = CoreWidgetViewSpec<LitWidgetViewComponent>

export type LitWidgetViewUserOptions = CoreWidgetViewUserOptions<LitWidgetViewComponent>
