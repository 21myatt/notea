import { useEffect, useRef } from "react";
import type { StorageAdapter } from "../storage/storageAdapter";
import type { NotebookState, SaveStatus } from "../types/notebook";

export function useAutosave(
  state: NotebookState,
  storage: StorageAdapter,
  setStatus: (status: SaveStatus) => void,
  delay = 400,
) {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      setStatus("saved");
      return;
    }

    setStatus("saving");
    const timeoutId = window.setTimeout(() => {
      storage.save(state);
      setStatus("saved");
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [delay, setStatus, state, storage]);
}
