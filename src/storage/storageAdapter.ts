import type { NotebookState } from "../types/notebook";

export const notebookStorageKey = "notea:notebook:v1";

export type StorageAdapter = {
  load: () => NotebookState | null;
  save: (state: NotebookState) => void;
  clear: () => void;
};
