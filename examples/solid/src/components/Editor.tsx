import { DecorationSet, EditorView } from "prosemirror-view";
import { createEditorView } from "../createEditorView";
import { Paragraph } from "./Paragraph";
import {
  useNodeViewFactory,
  usePluginViewFactory,
  useWidgetViewFactory,
} from "@prosemirror-adapter/solid";
import { Hashes } from "./Hashes";
import { Plugin } from "prosemirror-state";
import { Heading } from "./Heading";
import { Size } from "./Size";

export const Editor = () => {
  let viewRef: EditorView;
  const nodeViewFactory = useNodeViewFactory();
  const widgetViewFactory = useWidgetViewFactory();
  const pluginViewFactory = usePluginViewFactory();

  const editorRef = (element: HTMLDivElement) => {
    if (element.firstChild) return;

    const getHashWidget = widgetViewFactory({
      as: "i",
      component: Hashes,
    });

    viewRef = createEditorView(
      element,
      {
        paragraph: nodeViewFactory({
          component: Paragraph,
          as: "div",
          contentAs: "p",
        }),
        // heading: nodeViewFactory({
        //   component: Heading,
        // }),
      },
      [
        new Plugin({
          view: pluginViewFactory({
            component: Size,
          }),
        }),
        new Plugin({
          props: {
            decorations(state) {
              const { $from } = state.selection;
              const node = $from.node();
              if (node.type.name !== "heading") return DecorationSet.empty;

              const widget = getHashWidget($from.before() + 1, {
                side: -1,
                level: node.attrs.level,
              });

              return DecorationSet.create(state.doc, [widget]);
            },
          },
        }),
      ]
    );
  };

  return <div class="editor" ref={editorRef}></div>;
};
