/* Copyright 2021, Prosemirror Adapter by Mirone. */

import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react'
import { StrictMode } from 'react'

import { Editor } from './components/Editor'

export const App = () => (
    <StrictMode>
        <h1>Prosemirror Adapter React</h1>
        <ProsemirrorAdapterProvider>
            <Editor />
        </ProsemirrorAdapterProvider>
    </StrictMode>
)
