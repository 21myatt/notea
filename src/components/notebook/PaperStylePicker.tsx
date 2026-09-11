import { useState } from "react";
import type { PaperMode } from "../../types/notebook";
import { AlignJustify, Grid3X3, Square } from "lucide-react";

const modes: Array<{ value: PaperMode; label: string; Icon: typeof AlignJustify }> = [
  { value: "lined", label: "Lined", Icon: AlignJustify },
  { value: "dotted", label: "Dotted", Icon: Grid3X3 },
  { value: "blank", label: "Blank", Icon: Square },
];

export function PaperStylePicker({ value, onChange }: { value: PaperMode; onChange: (value: PaperMode) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const SelectedIcon = modes.find((mode) => mode.value === value)?.Icon ?? AlignJustify;

  return (
    <div className="paper-picker">
      <button
        type="button"
        className="icon-button paper-picker__trigger"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`Paper style: ${value}`}
        title={`Paper style: ${value}`}
      >
        <span className="paper-picker__glyph" aria-hidden="true"><SelectedIcon size={17} strokeWidth={1.8} /></span>
      </button>
      {isOpen && (
        <div className="paper-picker__popover" role="menu">
          {modes.map((mode) => (
            <button
              type="button"
              role="menuitemradio"
              key={mode.value}
              className={`paper-picker__option ${value === mode.value ? "is-active" : ""}`}
              onClick={() => { onChange(mode.value); setIsOpen(false); }}
              aria-checked={value === mode.value}
            >
              <mode.Icon size={15} strokeWidth={1.8} aria-hidden="true" />
              {mode.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
