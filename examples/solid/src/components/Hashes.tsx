import { useWidgetViewContext } from "@prosemirror-adapter/solid";

export function Hashes() {
  const { spec } = useWidgetViewContext();
  const level = spec?.level;
  const hashes = new Array(level || 0).fill("#").join("");

  return <span style={{ color: "blue", "margin-right": "6px" }}>{hashes}</span>;
}
