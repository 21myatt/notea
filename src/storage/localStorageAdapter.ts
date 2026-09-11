import { defaultContent } from "../editor/defaultContent";
import type { NotebookState } from "../types/notebook";
import { notebookStorageKey, type StorageAdapter } from "./storageAdapter";
import { migrateNotebookState } from "./storageMigrations";

export function createDefaultNotebook(): NotebookState {
  return {
    version: 1,
    title: "Untitled notebook",
    content: defaultContent,
    paper: "lined",
    updatedAt: new Date().toISOString(),
  };
}

export const localStorageAdapter: StorageAdapter = {
  load() {
    if (typeof window === "undefined") return null;

    try {
      const rawValue = window.localStorage.getItem(notebookStorageKey);
      return rawValue ? migrateNotebookState(JSON.parse(rawValue)) : null;
    } catch {
      return null;
    }
  },
  save(state) {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(notebookStorageKey, JSON.stringify(state));
    } catch {
      // Private browsing and full storage are allowed to fail silently.
    }
  },
  clear() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(notebookStorageKey);
  },
};
