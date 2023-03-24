/* Copyright 2021, Prosemirror Adapter by Mirone. */
import type { ComponentConstructorOptions, SvelteComponent } from 'svelte'

export type AnyRecord = Record<string, any>
export type SvelteComponentConstructor<T extends AnyRecord = AnyRecord> = new (options: ComponentConstructorOptions<T>) => SvelteComponent
