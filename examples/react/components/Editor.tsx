/* Copyright 2021, Prosemirror Adapter by Mirone. */
import './Editor.css';

import { ProsemirrorAdapterProvider, useNodeViewFactory } from '@prosemirror-adapter/react';
import { EditorView } from 'prosemirror-view';
import { FC, useCallback, useRef } from 'react';

import { Paragraph } from './Paragraph';
import { createEditorView } from './prosemirror';

const InnerEditor: FC = () => {
    const viewRef = useRef<EditorView>();
    const nodeViewFactory = useNodeViewFactory();

    const editorRef = useCallback(
        (element: HTMLDivElement) => {
            if (!element) return;

            if (element.firstChild) return;

            viewRef.current = createEditorView(element, {
                paragraph: nodeViewFactory({
                    component: Paragraph,
                    as: 'div',
                    contentAs: 'p',
                }),
            });
        },
        [nodeViewFactory],
    );

    return <div className="editor" ref={editorRef} />;
};

export const Editor: FC = () => (
    <ProsemirrorAdapterProvider>
        <InnerEditor />
    </ProsemirrorAdapterProvider>
);
