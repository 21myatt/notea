import { useState } from "react";
import { Download } from "lucide-react";
import type { ExportFormat } from "../../exporters/exportTypes";

type ExportMenuProps = {
  onExport: (format: ExportFormat) => Promise<void>;
};

const exportOptions: Array<{ format: ExportFormat; label: string; extension: string }> = [
  { format: "markdown", label: "Markdown", extension: ".md" },
  { format: "html", label: "HTML document", extension: ".html" },
  { format: "docx", label: "Word document", extension: ".docx" },
];

export function ExportMenu({ onExport }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  async function handleExport(format: ExportFormat) {
    setIsExporting(true);
    try {
      await onExport(format);
      setIsOpen(false);
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="export-menu">
      <button
        type="button"
        className="icon-action export-menu__trigger"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Export notebook"
        title="Export notebook"
        onClick={() => setIsOpen((open) => !open)}
      >
        <Download size={17} strokeWidth={1.8} aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="export-menu__popover" role="menu">
          <div className="export-menu__heading">Download a copy</div>
          {exportOptions.map((option) => (
            <button
              type="button"
              role="menuitem"
              className="export-menu__item"
              key={option.format}
              onClick={() => void handleExport(option.format)}
              disabled={isExporting}
            >
              <span>{option.label}</span>
              <small>{option.extension}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
