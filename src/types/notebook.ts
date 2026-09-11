import type { JSONContent } from "@tiptap/core";

export type PaperMode = "lined" | "dotted" | "blank";

export type NotebookState = {
  version: 1;
  title: string;
  content: JSONContent;
  paper: PaperMode;
  updatedAt: string;
};

export type SaveStatus = "idle" | "saving" | "saved";
