import type { JSONContent } from "@tiptap/core";

export type ExportFormat = "markdown" | "html" | "docx";

export type ExportInput = {
  title: string;
  content: JSONContent;
};
