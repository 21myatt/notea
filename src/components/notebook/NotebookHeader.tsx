import type { ExportFormat } from "../../exporters/exportTypes";
import type { Editor } from "@tiptap/core";
import type { PaperMode, SaveStatus as SaveStatusType } from "../../types/notebook";
import { EditorToolbar } from "../editor/EditorToolbar";
import { ExportMenu } from "./ExportMenu";
import { PaperStylePicker } from "./PaperStylePicker";
import { SaveStatus } from "./SaveStatus";
import { Save } from "lucide-react";

type NotebookHeaderProps = {
  editor: Editor | null;
  paper: PaperMode;
  saveStatus: SaveStatusType;
  onPaperChange: (value: PaperMode) => void;
  onExport: (format: ExportFormat) => Promise<void>;
  onSave: () => void;
};

export function NotebookHeader({ editor, paper, saveStatus, onPaperChange, onExport, onSave }: NotebookHeaderProps) {
  return (
    <header className="notebook-header">
      <div className="notebook-header__editor-tools">
        <EditorToolbar editor={editor} />
      </div>
      <div className="notebook-header__actions">
        <SaveStatus status={saveStatus} />
        <PaperStylePicker value={paper} onChange={onPaperChange} />
        <ExportMenu onExport={onExport} />
        <button type="button" className="icon-action icon-action--save" onClick={onSave} aria-label="Save notebook" title="Save notebook">
          <Save size={17} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
