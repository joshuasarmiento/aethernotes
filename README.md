# Aether Notes

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4fc08d.svg)](https://vuejs.org/)
[![Tiptap](https://img.shields.io/badge/Editor-Tiptap-black.svg)](https://tiptap.dev/)
[![Dexie](https://img.shields.io/badge/Database-Dexie.js-blue.svg)](https://dexie.org/)

A minimal, secure, local-first note-taking web application. Designed around Notion's visual layout principles and Obsidian's privacy-focused monochrome aesthetic. Built with **Vue 3** (Composition API), **Tiptap**, **Pinia**, and **Dexie.js** (IndexedDB).

---

## Documentation

| Document | Description |
|---|---|
| [docs/architecture.md](docs/architecture.md) | System design, cryptosystem workflow, storage decisions, PWA setup, and accessibility notes |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Commit conventions, PR templates, branch strategy, and coding standards |

---

## Features

### Markdown-First Editor

- **Title Autogeneration** — Note titles derive from the first H1 heading. Manually typed titles lock to prevent overwriting.
- **Slash Commands** — Type `/` to trigger the formatting menu (Paragraph, H1, H2, H3). Selecting a format removes the slash character.
- **Bubble Menu** — Context-aware floating toolbar for bold, italic, strikethrough, highlight, inline code, and links.
- **Live Outline** — Collapsible right-hand Table of Contents that indexes H1–H3 headings with smooth scroll-to navigation.
- **Inline Tag Highlighting** — Regex-based parsing and highlight rendering for `@tags` inline. Sidebar tag click scrolls to first occurrence.

### Encryption and Security

- **AES-256-GCM** — Client-side encryption via the native Web Crypto API. Key derivation uses PBKDF2 (100,000 iterations) from a user passphrase.
- **Zero-Knowledge** — The decryption key lives only in memory and is never written to disk. Forgotten passphrases cannot be recovered.
- **Passphrase Rotation** — Re-encrypts all notes in a single batch transaction when the passphrase changes.
- **Local-Only Storage** — All data persists in IndexedDB via Dexie.js. No network requests. No servers.

### Progressive Web App

- **Offline-First** — Pre-caches HTML, styles, scripts, and fonts on install via Workbox.
- **Auto-Update** — Service Worker configured with `registerType: 'autoUpdate'` for seamless background updates.
- **Installable** — Meets Chrome and Safari PWA criteria: standalone display mode, custom manifest, offline asset fetching.

### Accessibility

- **Focus Trapping** — Keyboard focus is contained within active dialogs (Settings, Command Palette) and restored to the editor on close.
- **ARIA Tree** — The sidebar folder tree uses `role="tree"` / `role="treeitem"` with `aria-expanded` and `aria-label` attributes.
- **Keyboard Shortcuts** — `Cmd/Ctrl+K` for Command Palette, `Escape` to dismiss, arrow keys for palette and tree navigation.

### Typography and Customization

- **Font Families** — System Sans-Serif, Editorial Serif, or Monospace, switchable from Settings.
- **Font Size** — Adjustable from 14px to 24px via a range slider.
- **Editor Options** — Line wrapping, line numbers (CSS counter-based), and native spellcheck toggles.

### Search and Navigation

- **Command Palette** — Fuzzy search powered by Fuse.js over note titles, bodies, and tags. Includes instant commands: create note, toggle theme, delete note.

### Organization

- **Nested Folders** — Drag-and-drop hierarchy with custom label accent colors synchronized across light and dark themes.
- **Trash and Purge** — Soft-deleted notes are held for a configurable window (7 days, 30 days, or never) before permanent removal.

---

## Project Structure

```text
aether-notes/
├── .github/                 # GitHub workflows and PR templates
├── docs/
│   └── architecture.md      # System design and architectural decisions
├── public/                  # Static assets and PWA manifest icons
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── tokens.css       # Light/dark color tokens
│   │       ├── global.css       # Resets, scrollbars, noise overlay
│   │       ├── editor.css       # Tiptap styling overrides
│   │       └── transitions.css  # Vue transition timing
│   ├── components/
│   │   ├── editor/          # Tiptap wrapper and BubbleMenu
│   │   ├── layout/          # AppShell, TopBar, StatusBar
│   │   ├── note-list/       # Note items and filtering
│   │   ├── search/          # Command Palette
│   │   ├── settings/        # Preferences panel and encryption
│   │   └── sidebar/         # Folder tree, tag list, footer
│   ├── composables/         # useTheme, useKeyboard
│   ├── extensions/          # Custom Tiptap/ProseMirror extensions
│   ├── lib/                 # Crypto, DB, and utility helpers
│   ├── stores/              # Pinia stores: notes, folders, settings
│   ├── types/               # TypeScript interfaces
│   ├── views/               # LandingPage and route-level components
│   ├── App.vue
│   └── main.ts
├── index.html
├── vite.config.ts
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js v18 or later
- [Bun](https://bun.sh/) (recommended) or npm

### Install

```bash
git clone https://github.com/joshuasarmiento/aethernotes.git
cd aethernotes
bun install
```

### Development

```bash
bun run dev
```

### Production Build

```bash
bun run build
```

---

## Testing

| Layer | Tool | Scope |
|---|---|---|
| Unit | Vitest | `crypto.ts` key derivation, `db.ts` transactions |
| Component | Vitest + Vue Test Utils | Pinia state sync, Tiptap extensions, UI wrappers |
| End-to-End | Playwright | PWA install flow, drag-and-drop, offline persistence |

```bash
bun run test
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide — commit conventions, branch naming, PR checklist, and code standards.

---

## License

[MIT](LICENSE) — Copyright (c) 2026 Joshua Sarmiento.
