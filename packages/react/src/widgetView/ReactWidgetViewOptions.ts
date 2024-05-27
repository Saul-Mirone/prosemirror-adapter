import type { CoreWidgetViewSpec, CoreWidgetViewUserOptions } from '@prosemirror-adapter/core'
import type { ComponentType } from 'react'

export type ReactWidgetViewComponent = ComponentType<Record<string, never>>

export type ReactWidgetViewSpec = CoreWidgetViewSpec<ReactWidgetViewComponent>

export type ReactWidgetViewUserOptions = CoreWidgetViewUserOptions<ReactWidgetViewComponent>
