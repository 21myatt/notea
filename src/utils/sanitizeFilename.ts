export function sanitizeFilename(value: string) {
  const cleanValue = value
    .split("")
    .filter((character) => character.charCodeAt(0) >= 32)
    .join("")
    .trim()
    .replace(/[<>:"/\\|?*]/g, "")
    .replace(/\s+/g, " ");

  return (cleanValue || "untitled-notebook").slice(0, 80);
}
