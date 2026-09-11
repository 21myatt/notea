import type { Editor } from "@tiptap/core";
import type { CommandDefinition } from "../types/commands";

export const commandRegistry: CommandDefinition[] = [
  {
    id: "heading-1",
    label: "Heading 1",
    aliases: ["heading1", "h1", "title"],
    description: "Start a large section heading",
    icon: "H1",
    execute: (editor: Editor) => editor.chain().focus().setHeading({ level: 1 }).run(),
  },
  {
    id: "heading-2",
    label: "Heading 2",
    aliases: ["heading2", "h2", "section"],
    description: "Start a smaller section heading",
    icon: "H2",
    execute: (editor: Editor) => editor.chain().focus().setHeading({ level: 2 }).run(),
  },
  {
    id: "paragraph",
    label: "Text",
    aliases: ["text", "paragraph", "p"],
    description: "Write a regular paragraph",
    icon: "T",
    execute: (editor: Editor) => editor.chain().focus().setParagraph().run(),
  },
  {
    id: "task-list",
    label: "Todo",
    aliases: ["todo", "task", "checklist"],
    description: "Make a checklist item",
    icon: "✓",
    execute: (editor: Editor) => editor.chain().focus().toggleTaskList().run(),
  },
  {
    id: "bullet-list",
    label: "Bullet",
    aliases: ["bullet", "list", "ul"],
    description: "Make a bulleted list",
    icon: "•",
    execute: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    id: "blockquote",
    label: "Quote",
    aliases: ["quote", "blockquote"],
    description: "Set apart a thoughtful quote",
    icon: "“",
    execute: (editor: Editor) => editor.chain().focus().toggleBlockquote().run(),
  },
  {
    id: "code-block",
    label: "Code",
    aliases: ["code", "codeblock", "snippet"],
    description: "Add a monospaced code block",
    icon: "</>",
    execute: (editor: Editor) => editor.chain().focus().toggleCodeBlock().run(),
  },
];

export function filterCommands(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return commandRegistry;

  return commandRegistry.filter((command) => {
    const searchable = [command.label, command.id, ...command.aliases].join(" ").toLowerCase();
    return searchable.includes(normalizedQuery);
  });
}
