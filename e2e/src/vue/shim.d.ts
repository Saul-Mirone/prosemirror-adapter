/* Copyright 2021, Prosemirror Adapter by Mirone. */

/* eslint-disable @typescript-eslint/ban-types */

/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}
