import FontFamily from "@tiptap/extension-font-family";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { TextStyle } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";

export const editorExtensions = [
  StarterKit,
  TextStyle,
  FontFamily.configure({ types: ["textStyle"] }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    linkOnPaste: true,
  }),
  TaskList,
  TaskItem.configure({ nested: true }),
  Placeholder.configure({
    placeholder: "Start writing…",
  }),
];
