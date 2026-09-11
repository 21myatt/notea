import type { JSONContent } from "@tiptap/core";
import type { ExportInput } from "./exportTypes";

function inlineMarkdown(node: JSONContent): string {
  if (node.type === "hardBreak") return "\n";
  if (node.type !== "text") return "";

  let value = node.text ?? "";
  for (const mark of node.marks ?? []) {
    if (mark.type === "bold") value = `**${value}**`;
    if (mark.type === "italic") value = `*${value}*`;
    if (mark.type === "code") value = `\`${value}\``;
    if (mark.type === "link") value = `[${value}](${String(mark.attrs?.href ?? "")})`;
  }
  return value;
}

function inlineContent(nodes: JSONContent[] = []) {
  return nodes.map(inlineMarkdown).join("");
}

function blocks(nodes: JSONContent[] = [], depth = 0): string[] {
  const output: string[] = [];
  const indent = "  ".repeat(depth);

  for (const node of nodes) {
    switch (node.type) {
      case "paragraph":
        output.push(`${indent}${inlineContent(node.content)}`);
        break;
      case "heading":
        output.push(`${"#".repeat(Number(node.attrs?.level ?? 1))} ${inlineContent(node.content)}`);
        break;
      case "blockquote":
        output.push(...blocks(node.content, depth).map((line) => `${indent}> ${line.trimStart()}`));
        break;
      case "bulletList":
        for (const item of node.content ?? []) {
          const first = item.content?.[0];
          output.push(`${indent}- ${inlineContent(first?.content)}`);
          if ((item.content?.length ?? 0) > 1) output.push(...blocks(item.content?.slice(1), depth + 1));
        }
        break;
      case "orderedList":
        (node.content ?? []).forEach((item, index) => {
          const first = item.content?.[0];
          output.push(`${indent}${index + 1}. ${inlineContent(first?.content)}`);
          if ((item.content?.length ?? 0) > 1) output.push(...blocks(item.content?.slice(1), depth + 1));
        });
        break;
      case "taskList":
        for (const item of node.content ?? []) {
          const first = item.content?.[0];
          const checked = item.attrs?.checked ? "x" : " ";
          output.push(`${indent}- [${checked}] ${inlineContent(first?.content)}`);
        }
        break;
      case "codeBlock":
        output.push(`${indent}\`\`\`${String(node.attrs?.language ?? "")}`);
        output.push(`${indent}${node.content?.map((child) => child.text ?? "").join("") ?? ""}`);
        output.push(`${indent}\`\`\``);
        break;
      case "horizontalRule":
        output.push(`${indent}---`);
        break;
      default:
        if (node.content) output.push(...blocks(node.content, depth));
    }
  }

  return output;
}

export function exportMarkdown({ title, content }: ExportInput) {
  return `# ${title.trim() || "Untitled notebook"}\n\n${blocks(content.content).join("\n\n").trim()}\n`;
}
