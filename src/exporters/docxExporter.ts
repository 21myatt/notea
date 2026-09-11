import { Document, HeadingLevel, Packer, Paragraph } from "docx";
import type { JSONContent } from "@tiptap/core";
import type { ExportInput } from "./exportTypes";

function textFromNodes(nodes: JSONContent[] = []) {
  return nodes.map((node) => node.text ?? (node.type === "hardBreak" ? "\n" : "")).join("");
}

function paragraphsFromNodes(nodes: JSONContent[] = []): Paragraph[] {
  const output: Paragraph[] = [];

  for (const node of nodes) {
    switch (node.type) {
      case "heading":
        output.push(
          new Paragraph({
            text: textFromNodes(node.content),
            heading: Number(node.attrs?.level) === 1 ? HeadingLevel.HEADING_1 : HeadingLevel.HEADING_2,
          }),
        );
        break;
      case "paragraph":
        output.push(new Paragraph({ text: textFromNodes(node.content) }));
        break;
      case "blockquote":
        output.push(
          ...paragraphsFromNodes(node.content).map((_, index) => new Paragraph({
            text: `“${textFromNodes(node.content?.[index]?.content)}”`,
            style: "IntenseQuote",
          })),
        );
        break;
      case "bulletList":
        for (const item of node.content ?? []) {
          output.push(new Paragraph({ text: textFromNodes(item.content?.[0]?.content), bullet: { level: 0 } }));
        }
        break;
      case "orderedList":
        for (const item of node.content ?? []) {
          output.push(new Paragraph({ text: textFromNodes(item.content?.[0]?.content), numbering: { reference: "notea-numbered", level: 0 } }));
        }
        break;
      case "taskList":
        for (const item of node.content ?? []) {
          output.push(new Paragraph({ text: `${item.attrs?.checked ? "☑" : "☐"} ${textFromNodes(item.content?.[0]?.content)}` }));
        }
        break;
      case "codeBlock":
        output.push(new Paragraph({ text: textFromNodes(node.content) }));
        break;
      case "horizontalRule":
        output.push(new Paragraph({ text: "────────────────────────" }));
        break;
      default:
        output.push(...paragraphsFromNodes(node.content));
    }
  }

  return output;
}

export async function exportDocx({ title, content }: ExportInput) {
  const document = new Document({
    title,
    numbering: {
      config: [{ reference: "notea-numbered", levels: [{ level: 0, format: "decimal", text: "%1.", alignment: "left" }] }],
    },
    sections: [{ children: [new Paragraph({ text: title.trim() || "Untitled notebook", heading: HeadingLevel.TITLE }), ...paragraphsFromNodes(content.content)] }],
  });

  return Packer.toBlob(document);
}
