import type { CoreMarkViewSpec, CoreMarkViewUserOptions } from '@prosemirror-adapter/core'
import type { LitElement } from 'lit'

export type LitMarkViewComponent = typeof LitElement
export type LitMarkViewSpec = CoreMarkViewSpec<LitMarkViewComponent>
export type LitMarkViewUserOptions = CoreMarkViewUserOptions<LitMarkViewComponent>
