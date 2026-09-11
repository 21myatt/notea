# Notea

Notea is a local-first notebook editor for writing on a quiet, paper-like canvas. It supports ruled, dotted, and blank paper modes, Notion-style blocks, `@`/`/` commands, and portable Markdown, HTML, and DOCX exports.

## Run locally

```bash
pnpm install
pnpm dev
```

Then open the local Vite URL shown in the terminal.

## Build for production

```bash
pnpm lint
pnpm build
pnpm preview
```

## Deploy to Vercel

Import the repository into Vercel. Vercel detects the Vite app automatically:

- Build command: `pnpm build`
- Output directory: `dist`
- Environment variables: none required

Notea does not use a database, API, login, or cloud sync. Notebook data is stored in the current browser under a versioned localStorage key. Use the Export menu to create a Markdown, HTML, or Word copy that can be moved to another device.

## Editor commands

Type `@` or `/` in an empty block to open the command menu. Available blocks include headings, text, todos, bullets, quotes, and code blocks. The formatting toolbar provides the same common actions for mouse and keyboard users.

## Project structure

The UI is split into notebook and editor components. Hooks own stateful behavior, while the storage adapter, command registry, serializers, and browser download helper remain independent of the visual layer.

```text
src/
├── components/    # notebook shell, paper controls, editor, menus
├── hooks/         # notebook state, autosave, commands, exports
├── editor/        # Tiptap extensions and command registry
├── storage/       # versioned localStorage adapter
├── exporters/     # Markdown, HTML, and DOCX serializers
├── types/         # shared notebook and command contracts
└── utils/         # filename and browser download helpers
```
