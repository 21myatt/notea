import type { JSONContent } from "@tiptap/core";
import type { ExportInput } from "./exportTypes";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function inlineHtml(nodes: JSONContent[] = []) {
  return nodes
    .map((node) => {
      if (node.type === "hardBreak") return "<br />";
      let value = escapeHtml(node.text ?? "");
      for (const mark of node.marks ?? []) {
        if (mark.type === "bold") value = `<strong>${value}</strong>`;
        if (mark.type === "italic") value = `<em>${value}</em>`;
        if (mark.type === "code") value = `<code>${value}</code>`;
        if (mark.type === "link") value = `<a href="${escapeHtml(String(mark.attrs?.href ?? ""))}">${value}</a>`;
      }
      return value;
    })
    .join("");
}

function renderBlocks(nodes: JSONContent[] = []): string {
  return nodes
    .map((node) => {
      const content = inlineHtml(node.content);
      switch (node.type) {
        case "paragraph":
          return `<p>${content}</p>`;
        case "heading":
          return `<h${Number(node.attrs?.level ?? 1)}>${content}</h${Number(node.attrs?.level ?? 1)}>`;
        case "blockquote":
          return `<blockquote>${renderBlocks(node.content)}</blockquote>`;
        case "bulletList":
          return `<ul>${(node.content ?? []).map((item) => `<li>${renderBlocks(item.content)}</li>`).join("")}</ul>`;
        case "orderedList":
          return `<ol>${(node.content ?? []).map((item) => `<li>${renderBlocks(item.content)}</li>`).join("")}</ol>`;
        case "taskList":
          return `<ul class="task-list">${(node.content ?? [])
            .map((item) => `<li><label><input type="checkbox" ${item.attrs?.checked ? "checked" : ""} disabled /> ${renderBlocks(item.content)}</label></li>`)
            .join("")}</ul>`;
        case "codeBlock":
          return `<pre><code>${escapeHtml(node.content?.map((child) => child.text ?? "").join("") ?? "")}</code></pre>`;
        case "horizontalRule":
          return "<hr />";
        default:
          return node.content ? renderBlocks(node.content) : "";
      }
    })
    .join("\n");
}

export function exportHtml({ title, content }: ExportInput) {
  const safeTitle = escapeHtml(title.trim() || "Untitled notebook");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitle}</title>
    <style>
      body { max-width: 760px; margin: 64px auto; padding: 0 24px; color: #25313a; font: 18px/1.75 system-ui, sans-serif; }
      h1, h2 { font-family: Georgia, serif; line-height: 1.15; }
      blockquote { margin-left: 0; padding-left: 20px; border-left: 3px solid #4567d9; color: #53616a; }
      code, pre { font-family: ui-monospace, monospace; }
      pre { padding: 16px; overflow: auto; background: #edf1f0; }
    </style>
  </head>
  <body><h1>${safeTitle}</h1>${renderBlocks(content.content)}</body>
</html>`;
}
