/* Copyright 2021, Prosemirror Adapter by Mirone. */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Editor } from './Editor';

const root$ = document.getElementById('app');
if (!root$) {
    throw new Error('No root element found');
}

const root = createRoot(root$);

root.render(
    <StrictMode>
        <Editor />
    </StrictMode>,
);
