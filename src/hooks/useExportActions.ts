import { useCallback } from "react";
import { exportHtml } from "../exporters/htmlExporter";
import { exportMarkdown } from "../exporters/markdownExporter";
import type { ExportFormat } from "../exporters/exportTypes";
import type { NotebookState } from "../types/notebook";
import { downloadFile } from "../utils/downloadFile";
import { sanitizeFilename } from "../utils/sanitizeFilename";

export function useExportActions(notebook: NotebookState) {
  return useCallback(
    async (format: ExportFormat) => {
      const filename = sanitizeFilename(notebook.title);

      if (format === "markdown") {
        downloadFile(new Blob([exportMarkdown(notebook)], { type: "text/markdown;charset=utf-8" }), `${filename}.md`);
      }

      if (format === "html") {
        downloadFile(new Blob([exportHtml(notebook)], { type: "text/html;charset=utf-8" }), `${filename}.html`);
      }

      if (format === "docx") {
        const { exportDocx } = await import("../exporters/docxExporter");
        downloadFile(await exportDocx(notebook), `${filename}.docx`);
      }
    },
    [notebook],
  );
}
