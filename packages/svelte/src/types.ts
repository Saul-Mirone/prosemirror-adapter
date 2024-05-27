import type { ComponentConstructorOptions, SvelteComponent } from 'svelte'

export type AnyRecord = Record<string, any>
export type SvelteComponentConstructor<T extends AnyRecord = AnyRecord> = new (options: ComponentConstructorOptions<T>) => SvelteComponent

export type Obj2Map<T extends AnyRecord> = Map<keyof T, T[keyof T]>
