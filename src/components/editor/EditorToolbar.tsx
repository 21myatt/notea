import type { Editor } from "@tiptap/core";
import type { ReactNode } from "react";
import { Bold, Code2, Heading1, Heading2, Italic, List, ListChecks, Quote } from "lucide-react";
import { FontFamilyPicker } from "./FontFamilyPicker";

function ToolbarButton({ icon, tooltip, active, onClick }: { icon: ReactNode; tooltip: string; active?: boolean; onClick: () => void }) {
  return (
    <button type="button" className={`editor-toolbar__button ${active ? "is-active" : ""}`} onClick={onClick} aria-label={tooltip} title={tooltip}>
      {icon}
    </button>
  );
}

export function EditorToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const currentBlock = editor.isActive("heading", { level: 1 })
    ? "heading-1"
    : editor.isActive("heading", { level: 2 })
      ? "heading-2"
      : "paragraph";

  function setBlock(value: string) {
    if (!editor) return;
    if (value === "heading-1") editor.chain().focus().setHeading({ level: 1 }).run();
    else if (value === "heading-2") editor.chain().focus().setHeading({ level: 2 }).run();
    else editor.chain().focus().setParagraph().run();
  }

  return (
    <div className="editor-toolbar" aria-label="Text formatting">
      <select className="editor-toolbar__select" aria-label="Text style" value={currentBlock} onChange={(event) => setBlock(event.target.value)}>
        <option value="paragraph">Paragraph</option>
        <option value="heading-1">Heading 1</option>
        <option value="heading-2">Heading 2</option>
      </select>
      <span className="editor-toolbar__rule" aria-hidden="true" />
      <FontFamilyPicker editor={editor} />
      <span className="editor-toolbar__rule" aria-hidden="true" />
      <ToolbarButton icon={<Bold size={17} strokeWidth={2.1} />} tooltip="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} />
      <ToolbarButton icon={<Italic size={17} strokeWidth={2.1} />} tooltip="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} />
      <ToolbarButton icon={<Code2 size={16} strokeWidth={1.9} />} tooltip="Inline code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()} />
      <span className="editor-toolbar__rule" aria-hidden="true" />
      <ToolbarButton icon={<Heading1 size={18} strokeWidth={1.9} />} tooltip="Heading 1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} />
      <ToolbarButton icon={<Heading2 size={18} strokeWidth={1.9} />} tooltip="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
      <ToolbarButton icon={<List size={17} strokeWidth={1.9} />} tooltip="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} />
      <ToolbarButton icon={<ListChecks size={17} strokeWidth={1.9} />} tooltip="Todo list" active={editor.isActive("taskList")} onClick={() => editor.chain().focus().toggleTaskList().run()} />
      <ToolbarButton icon={<Quote size={17} strokeWidth={1.9} />} tooltip="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
    </div>
  );
}
