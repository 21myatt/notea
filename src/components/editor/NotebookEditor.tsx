import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect, useRef } from "react";
import type { Editor, JSONContent } from "@tiptap/core";
import { editorExtensions } from "../../editor/editorExtensions";
import { useEditorCommands } from "../../hooks/useEditorCommands";
import { CommandMenu } from "./CommandMenu";

type NotebookEditorProps = {
  content: JSONContent;
  onChange: (content: JSONContent) => void;
  onEditorReady?: (editor: Editor | null) => void;
};

export function NotebookEditor({ content, onChange, onEditorReady }: NotebookEditorProps) {
  const editorFrameRef = useRef<HTMLDivElement>(null);
  const editor = useEditor({
    extensions: editorExtensions,
    content,
    autofocus: "end",
    onUpdate: ({ editor: currentEditor }) => onChange(currentEditor.getJSON()),
    editorProps: {
      attributes: {
        class: "notebook-editor__content",
        spellcheck: "true",
      },
    },
  });
  const commandMenu = useEditorCommands(editor, editorFrameRef);

  useEffect(() => {
    onEditorReady?.(editor);
  }, [editor, onEditorReady]);

  return (
    <div className="notebook-editor" ref={editorFrameRef}>
      <div className="notebook-editor__body">
        <EditorContent editor={editor} onKeyDown={(event) => commandMenu.handleKeyDown(event) && event.preventDefault()} />
        <CommandMenu
          items={commandMenu.items}
          selectedIndex={commandMenu.selectedIndex}
          position={commandMenu.position}
          onSelect={commandMenu.execute}
        />
      </div>
    </div>
  );
}
