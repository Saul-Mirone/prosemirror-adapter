import type { CoreWidgetViewSpec, CoreWidgetViewUserOptions } from '@prosemirror-adapter/core'
import type { DefineComponent } from 'vue'

export type VueWidgetViewComponent = DefineComponent<any, any, any>

export type VueWidgetViewSpec = CoreWidgetViewSpec<VueWidgetViewComponent>

export type VueWidgetViewUserOptions = CoreWidgetViewUserOptions<VueWidgetViewComponent>
