import type { Editor } from "@tiptap/core";

export type CommandDefinition = {
  id: string;
  label: string;
  aliases: string[];
  description: string;
  icon: string;
  execute: (editor: Editor) => void;
};
