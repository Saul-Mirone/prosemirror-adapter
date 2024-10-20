import * as svelte from 'svelte'
import type {
  SvelteClassComponentConstructor,
  SvelteComponentConstructor,
} from './types'

/**
 * Mounts a Svelte component to a DOM element.
 *
 * Returns a function that unmounts the component.
 */
export function mount(
  UserComponent: SvelteComponentConstructor,
  options: {
    target: HTMLElement
    context: Map<string, unknown>
  },
): VoidFunction {
  if (svelte.mount && svelte.unmount) {
    // Using Svelte v5, where components are functions
    const component = svelte.mount(UserComponent, { ...options }) as svelte.SvelteComponent
    return () => svelte.unmount(component)
  }
  else {
    // Using Svelte v4, where components are classes
    const component = new (UserComponent as SvelteClassComponentConstructor)(options)
    return () => component.$destroy()
  }
}
