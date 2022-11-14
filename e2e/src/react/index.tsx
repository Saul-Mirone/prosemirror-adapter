/* Copyright 2021, Prosemirror Adapter by Mirone. */

import { createRoot } from 'react-dom/client'

import { App } from './App'

const root$ = document.getElementById('app')
if (!root$)
  throw new Error('No root element found')

const root = createRoot(root$)

root.render(<App />)
