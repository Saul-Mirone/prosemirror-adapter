import 'prosemirror-view/style/prosemirror.css'
import 'prosemirror-example-setup/style/style.css'
import 'prosemirror-menu/style/menu.css'

import { exampleSetup } from 'prosemirror-example-setup'
import { keymap } from 'prosemirror-keymap'
import { DOMParser, Schema } from 'prosemirror-model'
import { schema as schema_base } from 'prosemirror-schema-basic'
import type { Plugin } from 'prosemirror-state'
import { EditorState } from 'prosemirror-state'
import type {
  MarkViewConstructor,
  NodeViewConstructor,
} from 'prosemirror-view'
import { EditorView } from 'prosemirror-view'

const spec = schema_base.spec
const emSpec = spec.marks.get('em')

if (emSpec) {
  emSpec.toDOM = () => {
    return [
      'em',
      ['span', { class: 'em_before token' }, 'em_before'],
      ['span', { class: 'em_text token' }, 0],
      ['span', { class: 'em_after token' }, 'em_after'],
    ]
  }
}
else {
  throw new Error('unable to find em in the schema')
}

const schema = new Schema(spec)

export function createEditorView(
  element: HTMLElement | ShadowRoot,
  nodeViews: Record<string, NodeViewConstructor>,
  markViews: Record<string, MarkViewConstructor>,
  plugins: Plugin[],
) {
  const content = document.querySelector('#content')
  if (!content)
    throw new Error('Content element not found')

  return new EditorView(element, {
    state: EditorState.create({
      doc: DOMParser.fromSchema(schema).parse(content),
      schema,
      plugins: [
        ...exampleSetup({ schema }),
        keymap({
          'Mod-[': (state, dispatch) => {
            const { selection } = state
            const node = selection.$from.node()
            if (node.type.name !== 'heading')
              return false

            let level = node.attrs.level
            if (level >= 6)
              level = 1
            else
              level += 1

            dispatch?.(
              state.tr.setNodeMarkup(selection.$from.before(), null, {
                ...node.attrs,
                level,
              }),
            )
            return true
          },
        }),
        ...plugins,
      ],
    }),
    nodeViews,
    markViews,
  })
}
