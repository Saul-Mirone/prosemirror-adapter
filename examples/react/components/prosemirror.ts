/* Copyright 2021, Prosemirror Adapter by Mirone. */
import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-example-setup/style/style.css';
import 'prosemirror-menu/style/menu.css';

import { exampleSetup } from 'prosemirror-example-setup';
import { DOMParser } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { EditorState } from 'prosemirror-state';
import { EditorView, NodeViewConstructor } from 'prosemirror-view';

export const createEditorView = (element: HTMLElement, nodeViews: Record<string, NodeViewConstructor>) =>
    new EditorView(element, {
        state: EditorState.create({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            doc: DOMParser.fromSchema(schema).parse(document.querySelector('#content')!),
            schema,
            plugins: exampleSetup({ schema }),
        }),
        nodeViews,
    });
