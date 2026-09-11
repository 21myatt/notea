import type { JSONContent } from "@tiptap/core";
import type { NotebookState, PaperMode } from "../types/notebook";

function isPaperMode(value: unknown): value is PaperMode {
  return value === "lined" || value === "dotted" || value === "blank";
}

function isJSONContent(value: unknown): value is JSONContent {
  return Boolean(value && typeof value === "object" && (value as JSONContent).type === "doc");
}

export function validateNotebookState(value: unknown): value is NotebookState {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<NotebookState>;
  return (
    candidate.version === 1 &&
    typeof candidate.title === "string" &&
    isJSONContent(candidate.content) &&
    isPaperMode(candidate.paper) &&
    typeof candidate.updatedAt === "string"
  );
}

export function migrateNotebookState(value: unknown): NotebookState | null {
  return validateNotebookState(value) ? value : null;
}
