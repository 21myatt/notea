import { useMemo } from "react";
import { createDefaultNotebook, localStorageAdapter } from "../storage/localStorageAdapter";
import type { StorageAdapter } from "../storage/storageAdapter";
import type { NotebookState } from "../types/notebook";

export function useNotebookStorage(): { initialState: NotebookState; storage: StorageAdapter } {
  return useMemo(
    () => ({
      initialState: localStorageAdapter.load() ?? createDefaultNotebook(),
      storage: localStorageAdapter,
    }),
    [],
  );
}
