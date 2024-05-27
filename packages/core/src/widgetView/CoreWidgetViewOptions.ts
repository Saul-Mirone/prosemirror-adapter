import type { Decoration } from 'prosemirror-view'

export type WidgetDecoration = typeof Decoration.widget
export type WidgetDecorationSpec = NonNullable<Parameters<WidgetDecoration>[2]>

export type WidgetDecorationFactory = (pos: number, spec?: WidgetDecorationSpec) => Decoration

export interface CoreWidgetViewUserOptions<Component> {
  as: string | HTMLElement
  component: Component
}

export interface CoreWidgetViewSpec<Component> {
  pos: number
  spec?: WidgetDecorationSpec

  options: CoreWidgetViewUserOptions<Component>
}
