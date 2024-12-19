import type { CoreMarkViewSpec, CoreMarkViewUserOptions } from '@prosemirror-adapter/core'
import type { DefineComponent } from 'vue'

export type VueMarkViewComponent = DefineComponent<any, any, any>

export type VueMarkViewSpec = CoreMarkViewSpec<VueMarkViewComponent>

export type VueMarkViewUserOptions = CoreMarkViewUserOptions<VueMarkViewComponent>
