import * as svelte from 'svelte'
import type {
  SvelteClassComponentConstructor,
  SvelteComponentConstructor,
} from './types'

/**
 * Mount a Svelte component to a DOM element.
 */
export function mount(
  UserComponent: SvelteComponentConstructor,
  options: {
    target: HTMLElement
    context: Map<string, unknown>
  },
): svelte.SvelteComponent {
  if (svelte.mount) {
    // Using Svelte v5, where components are functions
    return svelte.mount(UserComponent, options) as svelte.SvelteComponent
  }
  else {
    // Using Svelte v4, where components are classes
    return new (UserComponent as SvelteClassComponentConstructor)(options)
  }
}
