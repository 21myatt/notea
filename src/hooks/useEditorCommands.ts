import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import type { Editor } from "@tiptap/core";
import { filterCommands } from "../editor/commandRegistry";
import type { CommandDefinition } from "../types/commands";

type MenuPosition = { top: number; left: number };

function getTriggerRange(editor: Editor) {
  const { $from } = editor.state.selection;
  const textBefore = $from.parent.textContent.slice(0, $from.parentOffset);
  const match = textBefore.match(/(^|\s)([@/])([\w-]*)$/);
  if (!match) return null;

  const trigger = match[2];
  const query = match[3];
  const start = $from.pos - query.length - 1;
  return { from: start, to: $from.pos, trigger, query };
}

export function useEditorCommands(editor: Editor | null, containerRef: RefObject<HTMLDivElement | null>) {
  const [items, setItems] = useState<CommandDefinition[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [position, setPosition] = useState<MenuPosition>({ top: 0, left: 0 });
  const [range, setRange] = useState<{ from: number; to: number } | null>(null);
  const rangeRef = useRef(range);

  const refresh = useCallback(() => {
    if (!editor) return;
    const triggerRange = getTriggerRange(editor);
    rangeRef.current = triggerRange;
    setRange(triggerRange);

    if (!triggerRange) {
      setItems([]);
      return;
    }

    setItems(filterCommands(triggerRange.query));
    setSelectedIndex(0);

    const coords = editor.view.coordsAtPos(triggerRange.to);
    const bounds = containerRef.current?.getBoundingClientRect();
    setPosition({
      top: coords.bottom - (bounds?.top ?? 0) + 10,
      left: coords.left - (bounds?.left ?? 0),
    });
  }, [containerRef, editor]);

  useEffect(() => {
    if (!editor) return;
    editor.on("update", refresh);
    editor.on("selectionUpdate", refresh);
    return () => {
      editor.off("update", refresh);
      editor.off("selectionUpdate", refresh);
    };
  }, [editor, refresh]);

  const execute = useCallback(
    (command: CommandDefinition) => {
      if (!editor || !rangeRef.current) return;
      editor.chain().focus().deleteRange(rangeRef.current).run();
      command.execute(editor);
      setItems([]);
      setRange(null);
      rangeRef.current = null;
    },
    [editor],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!rangeRef.current || items.length === 0) return false;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((current) => (current + 1) % items.length);
        return true;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((current) => (current - 1 + items.length) % items.length);
        return true;
      }
      if (event.key === "Enter" || event.key === "Tab") {
        event.preventDefault();
        execute(items[selectedIndex]);
        return true;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setItems([]);
        setRange(null);
        rangeRef.current = null;
        return true;
      }
      return false;
    },
    [execute, items, selectedIndex],
  );

  return {
    isOpen: Boolean(range && items.length),
    items,
    selectedIndex,
    position,
    execute,
    handleKeyDown,
  };
}
