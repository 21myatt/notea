import { useExportActions } from "../../hooks/useExportActions";
import { useNotebook } from "../../hooks/useNotebook";
import { NotebookEditor } from "../editor/NotebookEditor";
import { NotebookHeader } from "./NotebookHeader";
import { PaperSurface } from "./PaperSurface";
import { useState } from "react";
import type { Editor } from "@tiptap/core";

export function NotebookShell() {
  const { notebook, saveStatus, updateContent, setPaperMode, saveNow } = useNotebook();
  const exportNotebook = useExportActions(notebook);
  const [editor, setEditor] = useState<Editor | null>(null);

  return (
    <div className="app-shell">
      <div className="notebook-frame">
        <NotebookHeader
          editor={editor}
          paper={notebook.paper}
          saveStatus={saveStatus}
          onPaperChange={setPaperMode}
          onExport={exportNotebook}
          onSave={saveNow}
        />
        <PaperSurface paper={notebook.paper}>
          <NotebookEditor content={notebook.content} onChange={updateContent} onEditorReady={setEditor} />
        </PaperSurface>
      </div>
    </div>
  );
}
