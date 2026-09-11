import { useCallback, useState } from "react";
import type { JSONContent } from "@tiptap/core";
import { createDefaultNotebook } from "../storage/localStorageAdapter";
import type { NotebookState, PaperMode, SaveStatus } from "../types/notebook";
import { useAutosave } from "./useAutosave";
import { useNotebookStorage } from "./useNotebookStorage";

export function useNotebook() {
  const { initialState, storage } = useNotebookStorage();
  const [notebook, setNotebook] = useState<NotebookState>(initialState);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  useAutosave(notebook, storage, setSaveStatus);

  const update = useCallback((changes: Partial<NotebookState>) => {
    setNotebook((current) => ({
      ...current,
      ...changes,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateTitle = useCallback((title: string) => update({ title }), [update]);
  const updateContent = useCallback((content: JSONContent) => update({ content }), [update]);
  const setPaperMode = useCallback((paper: PaperMode) => update({ paper }), [update]);

  const resetNotebook = useCallback(() => {
    storage.clear();
    setNotebook(createDefaultNotebook());
  }, [storage]);

  const saveNow = useCallback(() => {
    storage.save(notebook);
    setSaveStatus("saved");
  }, [notebook, storage]);

  return {
    notebook,
    saveStatus,
    updateTitle,
    updateContent,
    setPaperMode,
    resetNotebook,
    saveNow,
  };
}
