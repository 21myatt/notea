import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Editor } from "@tiptap/core";
import { ChevronDown, Type } from "lucide-react";
import { fontFamilies } from "../../editor/fontFamilies";

type TextSelection = { from: number; to: number };

export function FontFamilyPicker({ editor }: { editor: Editor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAllMyanmar, setShowAllMyanmar] = useState(false);
  const [fontFamily, setFontFamily] = useState(() => editor.getAttributes("textStyle").fontFamily ?? "");
  const selectionRef = useRef<TextSelection | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const hasSelection = !editor.state.selection.empty;
  const myanmarFonts = useMemo(() => fontFamilies.filter((font) => font.language === "myanmar"), []);
  const visibleFonts = useMemo(() => {
    const latinFonts = fontFamilies.filter((font) => font.language !== "myanmar");
    const featuredMyanmarFonts = myanmarFonts.filter((font) => font.featured || font.value === fontFamily);
    return [...latinFonts, ...(showAllMyanmar ? myanmarFonts : featuredMyanmarFonts)];
  }, [fontFamily, myanmarFonts, showAllMyanmar]);
  const selectedFont = fontFamilies.find((font) => font.value === fontFamily) ?? fontFamilies[0];

  const rememberSelection = useCallback(() => {
    if (!editor.state.selection.empty) {
      selectionRef.current = {
        from: editor.state.selection.from,
        to: editor.state.selection.to,
      };
    }
  }, [editor]);

  useEffect(() => {
    const updateFont = () => {
      rememberSelection();
      setFontFamily(editor.getAttributes("textStyle").fontFamily ?? "");
    };
    editor.on("selectionUpdate", updateFont);
    editor.on("transaction", updateFont);

    return () => {
      editor.off("selectionUpdate", updateFont);
      editor.off("transaction", updateFont);
    };
  }, [editor, rememberSelection]);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!pickerRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  function chooseFont(value: string) {
    setIsOpen(false);
    const selection = selectionRef.current;
    if (!selection) return;

    const chain = editor.chain().focus().setTextSelection(selection);
    if (value) chain.setFontFamily(value).run();
    else chain.unsetFontFamily().run();
    selectionRef.current = null;
  }

  return (
    <div className="editor-toolbar__font-picker" ref={pickerRef}>
      <button
        type="button"
        className="editor-toolbar__font-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={hasSelection ? "Font family for selected text" : "Select text to change its font"}
        title={hasSelection ? "Font family for selected text" : "Select text to change its font"}
        onPointerDown={rememberSelection}
        onClick={() => { rememberSelection(); setIsOpen((open) => !open); }}
      >
        <Type size={15} strokeWidth={1.8} aria-hidden="true" />
        <span>{selectedFont.label}</span>
        <ChevronDown size={13} strokeWidth={1.8} aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="editor-toolbar__font-popover" role="listbox" aria-label="Font family">
          {!hasSelection && <div className="editor-toolbar__font-hint">Select text first</div>}
          {visibleFonts.map((font, index) => {
            const startsMyanmarGroup = font.language === "myanmar" && visibleFonts[index - 1]?.language !== "myanmar";
            return (
              <Fragment key={font.value || "default"}>
                {startsMyanmarGroup && <div className="editor-toolbar__font-section">Myanmar</div>}
                <button
                  type="button"
                  role="option"
                  aria-selected={font.value === fontFamily}
                  className={`editor-toolbar__font-option ${font.value === fontFamily ? "is-active" : ""}`}
                  style={{ fontFamily: font.stack }}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => chooseFont(font.value)}
                >
                  {font.label}
                </button>
              </Fragment>
            );
          })}
          {myanmarFonts.length > visibleFonts.filter((font) => font.language === "myanmar").length && (
            <button
              type="button"
              className="editor-toolbar__font-more"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => setShowAllMyanmar((showingAll) => !showingAll)}
            >
              {showAllMyanmar ? "Show fewer fonts" : "Show All fonts"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

